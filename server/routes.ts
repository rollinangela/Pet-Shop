import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all pets
  app.get("/api/pets", async (req, res) => {
    try {
      const query = typeof req.query.q === 'string' ? req.query.q : '';
      const status = typeof req.query.status === 'string' ? req.query.status : undefined;
      const pets = await storage.searchPets(query, status);
      res.json(pets);
    } catch (error) {
      console.error("Error fetching pets:", error);
      res.status(500).json({ message: "Failed to fetch pets" });
    }
  });

  // Get a specific pet by ID
  app.get("/api/pets/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid pet ID" });
      }
      
      const pet = await storage.getPet(id);
      if (!pet) {
        return res.status(404).json({ message: "Pet not found" });
      }
      
      res.json(pet);
    } catch (error) {
      console.error("Error fetching pet:", error);
      res.status(500).json({ message: "Failed to fetch pet" });
    }
  });

  // Update a pet's status
  app.patch("/api/pets/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid pet ID" });
      }
      
      const { status } = req.body;
      if (!status || !["available", "adopted", "pending"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
      
      const updatedPet = await storage.updatePetStatus(id, status);
      if (!updatedPet) {
        return res.status(404).json({ message: "Pet not found" });
      }
      
      res.json(updatedPet);
    } catch (error) {
      console.error("Error updating pet status:", error);
      res.status(500).json({ message: "Failed to update pet status" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
