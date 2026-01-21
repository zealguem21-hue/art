import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get(api.items.list.path, async (req, res) => {
    const items = await storage.getItems();
    res.json(items);
  });

  // Seed data if empty
  const existing = await storage.getItems();
  if (existing.length === 0) {
    console.log("Seeding database with initial items...");
    await storage.createItem({
      imageUrl: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=600&q=80",
      altText: "Chicago Cityscape",
      displayNumber: "#001"
    });
    await storage.createItem({
      imageUrl: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=600&q=80",
      altText: "New York City",
      displayNumber: "#002"
    });
    await storage.createItem({
      imageUrl: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=600&q=80",
      altText: "Tokyo Night",
      displayNumber: "#003"
    });
    await storage.createItem({
      imageUrl: "https://images.unsplash.com/photo-1449824913929-2b3a3e3dd45c?auto=format&fit=crop&w=600&q=80",
      altText: "San Francisco Bridge",
      displayNumber: "#004"
    });
    await storage.createItem({
      imageUrl: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=600&q=80",
      altText: "Sydney Opera House",
      displayNumber: "#005"
    });
  }

  return httpServer;
}
