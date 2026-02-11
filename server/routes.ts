import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  employeeCode: z.string().min(1, "Employee code is required"),
  password: z.string().min(1, "Password is required"),
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Authentication Routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const parsed = loginSchema.safeParse(req.body);

      if (!parsed.success) {
        return res.status(400).json({
          error: "Invalid request body",
          details: parsed.error.errors,
        });
      }

      const { username, employeeCode, password } = parsed.data;

      // Query employee by username and employeeCode
      const employee = await storage.getEmployee(username, employeeCode);

      if (!employee) {
        return res.status(401).json({
          error: "Invalid credentials. Employee not found.",
        });
      }

      // Verify password
      if (employee.password !== password) {
        return res.status(401).json({
          error: "Invalid credentials. Please check your password.",
        });
      }

      // Return employee data
      res.json({
        success: true,
        user: {
          id: employee.id,
          username: employee.username,
          employeeCode: employee.employeeCode,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Get all employees (for debugging/admin purposes)
  app.get("/api/employees", async (req, res) => {
    try {
      const employees = await storage.getAllEmployees();
      res.json(employees);
    } catch (error) {
      console.error("Error fetching employees:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  return httpServer;
}
