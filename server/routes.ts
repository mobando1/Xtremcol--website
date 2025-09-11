import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertRouteSchema, insertBookingSchema, insertAvailabilitySchema, 
  insertTestimonialSchema, type Route, type Booking 
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Routes API
  app.get("/api/routes", async (req, res) => {
    try {
      const routes = await storage.getActiveRoutes();
      res.json(routes);
    } catch (error) {
      console.error("Error fetching routes:", error);
      res.status(500).json({ error: "Failed to fetch routes" });
    }
  });

  app.get("/api/routes/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const route = await storage.getRoute(id);
      if (!route) {
        return res.status(404).json({ error: "Route not found" });
      }
      res.json(route);
    } catch (error) {
      console.error("Error fetching route:", error);
      res.status(500).json({ error: "Failed to fetch route" });
    }
  });

  // Bookings API
  app.post("/api/bookings", async (req, res) => {
    try {
      const validatedData = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(validatedData);
      res.status(201).json(booking);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Validation failed", details: error.errors });
      }
      console.error("Error creating booking:", error);
      res.status(500).json({ error: "Failed to create booking" });
    }
  });

  app.get("/api/bookings", async (req, res) => {
    try {
      const { status, date } = req.query;
      let bookings: Booking[];

      if (status && typeof status === 'string') {
        bookings = await storage.getBookingsByStatus(status);
      } else if (date && typeof date === 'string') {
        bookings = await storage.getBookingsByDate(new Date(date));
      } else {
        bookings = await storage.getAllBookings();
      }

      res.json(bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({ error: "Failed to fetch bookings" });
    }
  });

  app.get("/api/bookings/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const booking = await storage.getBooking(id);
      if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
      }
      res.json(booking);
    } catch (error) {
      console.error("Error fetching booking:", error);
      res.status(500).json({ error: "Failed to fetch booking" });
    }
  });

  app.put("/api/bookings/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const booking = await storage.updateBooking(id, updateData);
      if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
      }
      res.json(booking);
    } catch (error) {
      console.error("Error updating booking:", error);
      res.status(500).json({ error: "Failed to update booking" });
    }
  });

  // Availability API
  app.get("/api/availability", async (req, res) => {
    try {
      const { startDate, endDate, date } = req.query;
      
      if (date && typeof date === 'string') {
        const availability = await storage.getAvailabilityByDate(new Date(date));
        return res.json(availability || { 
          date, 
          maxBookings: 4, 
          currentBookings: 0, 
          isBlocked: false,
          available: true 
        });
      }
      
      if (startDate && endDate && typeof startDate === 'string' && typeof endDate === 'string') {
        const availability = await storage.getAvailabilityRange(new Date(startDate), new Date(endDate));
        return res.json(availability);
      }
      
      res.status(400).json({ error: "Please provide date or startDate/endDate parameters" });
    } catch (error) {
      console.error("Error fetching availability:", error);
      res.status(500).json({ error: "Failed to fetch availability" });
    }
  });

  app.post("/api/availability", async (req, res) => {
    try {
      const validatedData = insertAvailabilitySchema.parse(req.body);
      const availability = await storage.createAvailability(validatedData);
      res.status(201).json(availability);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Validation failed", details: error.errors });
      }
      console.error("Error creating availability:", error);
      res.status(500).json({ error: "Failed to create availability" });
    }
  });

  app.put("/api/availability/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const availability = await storage.updateAvailability(id, updateData);
      if (!availability) {
        return res.status(404).json({ error: "Availability not found" });
      }
      res.json(availability);
    } catch (error) {
      console.error("Error updating availability:", error);
      res.status(500).json({ error: "Failed to update availability" });
    }
  });

  // Testimonials API
  app.get("/api/testimonials", async (req, res) => {
    try {
      const { approved } = req.query;
      const testimonials = approved === 'true' 
        ? await storage.getApprovedTestimonials()
        : await storage.getAllTestimonials();
      res.json(testimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      res.status(500).json({ error: "Failed to fetch testimonials" });
    }
  });

  app.post("/api/testimonials", async (req, res) => {
    try {
      const validatedData = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(validatedData);
      res.status(201).json(testimonial);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Validation failed", details: error.errors });
      }
      console.error("Error creating testimonial:", error);
      res.status(500).json({ error: "Failed to create testimonial" });
    }
  });

  app.put("/api/testimonials/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const testimonial = await storage.updateTestimonial(id, updateData);
      if (!testimonial) {
        return res.status(404).json({ error: "Testimonial not found" });
      }
      res.json(testimonial);
    } catch (error) {
      console.error("Error updating testimonial:", error);
      res.status(500).json({ error: "Failed to update testimonial" });
    }
  });

  // Check availability for specific date and count bookings
  app.post("/api/availability/check", async (req, res) => {
    try {
      const { date } = req.body;
      if (!date) {
        return res.status(400).json({ error: "Date is required" });
      }

      const bookingDate = new Date(date);
      const bookings = await storage.getBookingsByDate(bookingDate);
      const availability = await storage.getAvailabilityByDate(bookingDate);
      
      const maxBookings = availability?.maxBookings || 4;
      const currentBookings = bookings.filter(b => b.status !== 'cancelled').length;
      const isBlocked = availability?.isBlocked || false;
      const isAvailable = !isBlocked && currentBookings < maxBookings;

      res.json({
        date,
        maxBookings,
        currentBookings,
        isBlocked,
        isAvailable,
        spotsRemaining: Math.max(0, maxBookings - currentBookings)
      });
    } catch (error) {
      console.error("Error checking availability:", error);
      res.status(500).json({ error: "Failed to check availability" });
    }
  });

  // Seed initial routes data
  app.post("/api/seed-routes", async (req, res) => {
    try {
      const initialRoutes = [
        {
          name: "agua_clara" as const,
          displayName: "Ruta Agua Clara",
          vehicleType: "cuatrimoto" as const,
          duration: "1 hora",
          couplePrice: "200000",
          individualPrice: "170000",
          description: "Vista al Río Magdalena, plano medio, piloto y acompañante sonriendo",
          includes: ["Guía profesional", "Casco incluido", "Seguro médico"]
        },
        {
          name: "salto_versalles" as const,
          displayName: "Ruta Salto Versalles",
          vehicleType: "cuatrimoto" as const,
          duration: "1h 30m",
          couplePrice: "240000",
          individualPrice: "200000",
          description: "Cascada al fondo, moto en primer plano (no baño)",
          includes: ["Guía profesional", "Casco incluido", "Seguro médico"]
        },
        {
          name: "alto_totumal" as const,
          displayName: "Ruta Alto de Totumal",
          vehicleType: "cuatrimoto" as const,
          duration: "2 horas",
          couplePrice: "300000",
          individualPrice: "260000",
          description: "Mirador 360°, horizonte con nevados si es visible",
          includes: ["Guía profesional", "Casco incluido", "Seguro médico"]
        },
        {
          name: "pozo_encantado" as const,
          displayName: "Ruta Pozo Encantado",
          vehicleType: "cuatrimoto" as const,
          duration: "2h 30m",
          couplePrice: "340000",
          individualPrice: "290000",
          description: "Sendero natural + pozo (personas con casco fuera del agua)",
          includes: ["Guía profesional", "Casco incluido", "Seguro médico"]
        },
        {
          name: "agua_clara" as const,
          displayName: "Buggy Agua Clara",
          vehicleType: "buggy_xds" as const,
          duration: "1h - Parada mirador (10 min)",
          xdsPrice: "400000",
          x3Price: "500000",
          description: "Buggy en mirador con vista al Río Magdalena",
          includes: ["Guía profesional", "Gafas incluidas", "Seguro médico"]
        },
        {
          name: "salto_versalles" as const,
          displayName: "Buggy Salto Versalles",
          vehicleType: "buggy_xds" as const,
          duration: "1h 30m - Parada cascada (30 min)",
          xdsPrice: "550000",
          x3Price: "650000",
          description: "Cascada al fondo, close-up del frente del buggy",
          includes: ["Guía profesional", "Gafas incluidas", "Seguro médico"]
        },
        {
          name: "alto_totumal" as const,
          displayName: "Buggy Alto de Totumal",
          vehicleType: "buggy_xds" as const,
          duration: "1h 30m - 2 miradores (15 min c/u)",
          xdsPrice: "550000",
          x3Price: "650000",
          description: "Buggy en filo de montaña, cielo dramático",
          includes: ["Guía profesional", "Gafas incluidas", "Seguro médico"]
        },
        {
          name: "trocha_vip" as const,
          displayName: "Trocha VIP 1 Hora",
          vehicleType: "buggy_xds" as const,
          duration: "1 hora",
          xdsPrice: "1200000",
          trochaType: "1h" as const,
          description: "Guaduas – Lajitas – Guaduas",
          includes: ["Hidratación incluida", "Asistencia mecánica", "Guía especializado", "Seguro médico"]
        },
        {
          name: "trocha_vip" as const,
          displayName: "Trocha VIP Medio Día",
          vehicleType: "buggy_xds" as const,
          duration: "Medio día",
          xdsPrice: "4000000",
          trochaType: "medio_dia" as const,
          description: "Ruta extendida por La Magdalena – Útica – Guaduero",
          includes: ["Hidratación + Almuerzo", "Asistencia mecánica", "Guía especializado", "Seguro médico"]
        },
        {
          name: "trocha_vip" as const,
          displayName: "Trocha VIP Día Completo",
          vehicleType: "buggy_xds" as const,
          duration: "Día completo",
          xdsPrice: "7000000",
          trochaType: "dia_completo" as const,
          description: "Campeona – La Cabaña – Carbonera – Alto de la Rana",
          includes: ["Hidratación + Almuerzo", "Asistencia mecánica", "Guía especializado", "Seguro médico"]
        }
      ];

      const createdRoutes = [];
      for (const route of initialRoutes) {
        try {
          const created = await storage.createRoute(route);
          createdRoutes.push(created);
        } catch (error) {
          console.log(`Route ${route.displayName} might already exist, skipping...`);
        }
      }

      res.json({ 
        message: "Routes seeded successfully", 
        created: createdRoutes.length,
        total: initialRoutes.length 
      });
    } catch (error) {
      console.error("Error seeding routes:", error);
      res.status(500).json({ error: "Failed to seed routes" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
