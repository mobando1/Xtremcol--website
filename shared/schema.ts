import { sql, relations } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, decimal, boolean, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Enums
export const vehicleTypeEnum = pgEnum("vehicle_type", ["cuatrimoto", "buggy_xds", "buggy_x3"]);
export const routeNameEnum = pgEnum("route_name", ["agua_clara", "salto_versalles", "alto_totumal", "pozo_encantado", "trocha_vip"]);
export const bookingStatusEnum = pgEnum("booking_status", ["pending", "confirmed", "completed", "cancelled"]);
export const trochaTypeEnum = pgEnum("trocha_type", ["1h", "medio_dia", "dia_completo"]);

// Tables
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const routes = pgTable("routes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: routeNameEnum("name").notNull(),
  displayName: text("display_name").notNull(),
  vehicleType: vehicleTypeEnum("vehicle_type").notNull(),
  duration: text("duration").notNull(),
  couplePrice: decimal("couple_price", { precision: 10, scale: 2 }),
  individualPrice: decimal("individual_price", { precision: 10, scale: 2 }),
  xdsPrice: decimal("xds_price", { precision: 10, scale: 2 }),
  x3Price: decimal("x3_price", { precision: 10, scale: 2 }),
  trochaType: trochaTypeEnum("trocha_type"),
  description: text("description"),
  includes: text("includes").array(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const bookings = pgTable("bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  customerName: text("customer_name").notNull(),
  customerPhone: text("customer_phone").notNull(),
  customerEmail: text("customer_email"),
  routeId: varchar("route_id").notNull().references(() => routes.id),
  vehicleType: vehicleTypeEnum("vehicle_type").notNull(),
  isCouple: boolean("is_couple").default(false),
  bookingDate: timestamp("booking_date").notNull(),
  totalPrice: decimal("total_price", { precision: 10, scale: 2 }).notNull(),
  depositAmount: decimal("deposit_amount", { precision: 10, scale: 2 }).notNull(),
  depositPaid: boolean("deposit_paid").default(false),
  includesVideo: boolean("includes_video").default(false),
  videoPrice: decimal("video_price", { precision: 10, scale: 2 }),
  status: bookingStatusEnum("status").default("pending"),
  notes: text("notes"),
  whatsappMessage: text("whatsapp_message"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const availability = pgTable("availability", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  date: timestamp("date").notNull(),
  maxBookings: integer("max_bookings").default(4),
  currentBookings: integer("current_bookings").default(0),
  isBlocked: boolean("is_blocked").default(false),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const testimonials = pgTable("testimonials", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email"),
  rating: integer("rating").notNull(), // 1-5 stars
  reviewText: text("review_text").notNull(),
  routeName: routeNameEnum("route_name"),
  vehicleType: vehicleTypeEnum("vehicle_type"),
  isVerified: boolean("is_verified").default(false),
  isApproved: boolean("is_approved").default(false),
  bookingId: varchar("booking_id").references(() => bookings.id),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const routesRelations = relations(routes, ({ many }) => ({
  bookings: many(bookings),
}));

export const bookingsRelations = relations(bookings, ({ one, many }) => ({
  route: one(routes, {
    fields: [bookings.routeId],
    references: [routes.id],
  }),
  testimonials: many(testimonials),
}));

export const testimonialsRelations = relations(testimonials, ({ one }) => ({
  booking: one(bookings, {
    fields: [testimonials.bookingId],
    references: [bookings.id],
  }),
}));

// Insert Schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertRouteSchema = createInsertSchema(routes).omit({
  id: true,
  createdAt: true,
});

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  bookingDate: z.string().transform((str) => new Date(str)),
});

export const insertAvailabilitySchema = createInsertSchema(availability).omit({
  id: true,
  createdAt: true,
}).extend({
  date: z.string().transform((str) => new Date(str)),
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
  createdAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Route = typeof routes.$inferSelect;
export type InsertRoute = z.infer<typeof insertRouteSchema>;
export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Availability = typeof availability.$inferSelect;
export type InsertAvailability = z.infer<typeof insertAvailabilitySchema>;
export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
