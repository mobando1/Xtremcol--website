import { 
  users, routes, bookings, availability as availabilityTable, testimonials,
  type User, type InsertUser, type Route, type InsertRoute,
  type Booking, type InsertBooking, type Availability, type InsertAvailability,
  type Testimonial, type InsertTestimonial
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, gte, lte, count } from "drizzle-orm";

// Updated interface with all CRUD methods needed for XTREMCOL
export interface IStorage {
  // User management
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Route management
  getAllRoutes(): Promise<Route[]>;
  getActiveRoutes(): Promise<Route[]>;
  getRoute(id: string): Promise<Route | undefined>;
  createRoute(route: InsertRoute): Promise<Route>;
  updateRoute(id: string, route: Partial<InsertRoute>): Promise<Route | undefined>;
  
  // Booking management
  getAllBookings(): Promise<Booking[]>;
  getBooking(id: string): Promise<Booking | undefined>;
  getBookingsByDate(date: Date): Promise<Booking[]>;
  getBookingsByStatus(status: string): Promise<Booking[]>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBooking(id: string, booking: Partial<InsertBooking>): Promise<Booking | undefined>;
  
  // Availability management
  getAvailabilityByDate(date: Date): Promise<Availability | undefined>;
  getAvailabilityRange(startDate: Date, endDate: Date): Promise<Availability[]>;
  createAvailability(availability: InsertAvailability): Promise<Availability>;
  updateAvailability(id: string, availability: Partial<InsertAvailability>): Promise<Availability | undefined>;
  
  // Testimonial management
  getAllTestimonials(): Promise<Testimonial[]>;
  getApprovedTestimonials(): Promise<Testimonial[]>;
  getTestimonial(id: string): Promise<Testimonial | undefined>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  updateTestimonial(id: string, testimonial: Partial<InsertTestimonial>): Promise<Testimonial | undefined>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Route methods
  async getAllRoutes(): Promise<Route[]> {
    return await db.select().from(routes).orderBy(routes.createdAt);
  }

  async getActiveRoutes(): Promise<Route[]> {
    return await db.select().from(routes).where(eq(routes.isActive, true)).orderBy(routes.createdAt);
  }

  async getRoute(id: string): Promise<Route | undefined> {
    const [route] = await db.select().from(routes).where(eq(routes.id, id));
    return route || undefined;
  }

  async createRoute(route: InsertRoute): Promise<Route> {
    const [newRoute] = await db
      .insert(routes)
      .values(route)
      .returning();
    return newRoute;
  }

  async updateRoute(id: string, route: Partial<InsertRoute>): Promise<Route | undefined> {
    const [updatedRoute] = await db
      .update(routes)
      .set(route)
      .where(eq(routes.id, id))
      .returning();
    return updatedRoute || undefined;
  }

  // Booking methods
  async getAllBookings(): Promise<Booking[]> {
    return await db.select().from(bookings).orderBy(desc(bookings.createdAt));
  }

  async getBooking(id: string): Promise<Booking | undefined> {
    const [booking] = await db.select().from(bookings).where(eq(bookings.id, id));
    return booking || undefined;
  }

  async getBookingsByDate(date: Date): Promise<Booking[]> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return await db.select()
      .from(bookings)
      .where(and(
        gte(bookings.bookingDate, startOfDay),
        lte(bookings.bookingDate, endOfDay)
      ))
      .orderBy(bookings.bookingDate);
  }

  async getBookingsByStatus(status: string): Promise<Booking[]> {
    return await db.select()
      .from(bookings)
      .where(eq(bookings.status, status as any))
      .orderBy(desc(bookings.createdAt));
  }

  async createBooking(booking: InsertBooking): Promise<Booking> {
    const [newBooking] = await db
      .insert(bookings)
      .values({
        ...booking,
        updatedAt: new Date(),
      })
      .returning();
    return newBooking;
  }

  async updateBooking(id: string, booking: Partial<InsertBooking>): Promise<Booking | undefined> {
    const [updatedBooking] = await db
      .update(bookings)
      .set({
        ...booking,
        updatedAt: new Date(),
      })
      .where(eq(bookings.id, id))
      .returning();
    return updatedBooking || undefined;
  }

  // Availability methods
  async getAvailabilityByDate(date: Date): Promise<Availability | undefined> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const [availability] = await db.select()
      .from(availabilityTable)
      .where(and(
        gte(availabilityTable.date, startOfDay),
        lte(availabilityTable.date, endOfDay)
      ));
    return availability || undefined;
  }

  async getAvailabilityRange(startDate: Date, endDate: Date): Promise<Availability[]> {
    return await db.select()
      .from(availabilityTable)
      .where(and(
        gte(availabilityTable.date, startDate),
        lte(availabilityTable.date, endDate)
      ))
      .orderBy(availabilityTable.date);
  }

  async createAvailability(availabilityData: InsertAvailability): Promise<Availability> {
    const [newAvailability] = await db
      .insert(availabilityTable)
      .values(availabilityData)
      .returning();
    return newAvailability;
  }

  async updateAvailability(id: string, availabilityData: Partial<InsertAvailability>): Promise<Availability | undefined> {
    const [updatedAvailability] = await db
      .update(availabilityTable)
      .set(availabilityData)
      .where(eq(availabilityTable.id, id))
      .returning();
    return updatedAvailability || undefined;
  }

  // Testimonial methods
  async getAllTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials).orderBy(desc(testimonials.createdAt));
  }

  async getApprovedTestimonials(): Promise<Testimonial[]> {
    return await db.select()
      .from(testimonials)
      .where(eq(testimonials.isApproved, true))
      .orderBy(desc(testimonials.createdAt));
  }

  async getTestimonial(id: string): Promise<Testimonial | undefined> {
    const [testimonial] = await db.select().from(testimonials).where(eq(testimonials.id, id));
    return testimonial || undefined;
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const [newTestimonial] = await db
      .insert(testimonials)
      .values(testimonial)
      .returning();
    return newTestimonial;
  }

  async updateTestimonial(id: string, testimonial: Partial<InsertTestimonial>): Promise<Testimonial | undefined> {
    const [updatedTestimonial] = await db
      .update(testimonials)
      .set(testimonial)
      .where(eq(testimonials.id, id))
      .returning();
    return updatedTestimonial || undefined;
  }
}

export const storage = new DatabaseStorage();
