import { pets, type Pet, type InsertPet, users, type User, type InsertUser } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllPets(): Promise<Pet[]>;
  getPet(id: number): Promise<Pet | undefined>;
  searchPets(query: string, status?: string): Promise<Pet[]>;
  createPet(pet: InsertPet): Promise<Pet>;
  updatePetStatus(id: number, status: string): Promise<Pet | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private pets: Map<number, Pet>;
  private userCurrentId: number;
  private petCurrentId: number;

  constructor() {
    this.users = new Map();
    this.pets = new Map();
    this.userCurrentId = 1;
    this.petCurrentId = 1;
    
    // Seed with initial pet data
    const dogImages = [
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1",
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e",
      "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993",
      "https://images.unsplash.com/photo-1548767797-d8c844163c4c",
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb",
      "https://images.unsplash.com/photo-1517849845537-4d257902454a"
    ];
    
    const catImages = [
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba",
      "https://images.unsplash.com/photo-1592194996308-7b43878e84a6",
      "https://images.unsplash.com/photo-1574158622682-e40e69881006",
      "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13",
      "https://images.unsplash.com/photo-1533738363-b7f9aef128ce",
      "https://images.unsplash.com/photo-1618826411640-d6df44dd3f7a"
    ];
    
    const smallPetImages = [
      "https://images.unsplash.com/photo-1425082661705-1834bfd09dca", // guinea pig
      "https://images.unsplash.com/photo-1608744882201-52a7f7f3dd60", // rabbit
      "https://images.unsplash.com/photo-1609151376730-f246ec0b99e5", // hamster
      "https://images.unsplash.com/photo-1576525865848-9ce0359ed139" // parakeet
    ];
    
    const dogNames = ["Buddy", "Max", "Charlie", "Cooper", "Rocky", "Daisy"];
    const catNames = ["Whiskers", "Luna", "Oliver", "Bella", "Simba", "Cleo"];
    const smallPetNames = ["Nugget", "Thumper", "Peanut", "Sky"];
    
    const dogBreeds = ["Golden Retriever", "Husky", "Labrador", "Beagle", "Poodle", "Border Collie"];
    const catBreeds = ["Tabby", "Siamese", "Maine Coon", "Ragdoll", "Bengal", "Persian"];
    const smallPetBreeds = ["Guinea Pig", "Rabbit", "Hamster", "Parakeet"];
    
    const statuses = ["available", "adopted", "pending"];
    const personalities = ["Friendly", "Playful", "Energetic", "Calm", "Curious", "Gentle", "Shy", "Active", "Cuddly", "Majestic", "Adventurous", "Musical"];
    const sizes = ["Small", "Medium", "Large"];
    const genders = ["Male", "Female"];
    
    // Add 6 dogs
    for (let i = 0; i < 6; i++) {
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const ageInMonths = Math.floor(Math.random() * 60) + 3; // 3 months to 5 years
      this.createPet({
        name: dogNames[i],
        type: "dog",
        breed: dogBreeds[i],
        age: ageInMonths,
        gender: genders[Math.floor(Math.random() * genders.length)],
        size: sizes[Math.floor(Math.random() * sizes.length)],
        personality: personalities[Math.floor(Math.random() * personalities.length)],
        status: status,
        description: `${dogNames[i]} is a lovable ${dogBreeds[i]} who ${status === 'available' ? 'is looking for a forever home' : status === 'adopted' ? 'has found a loving family' : 'has a family interested in adoption'}. ${dogNames[i]} is ${ageInMonths < 12 ? `${ageInMonths} months` : `${Math.floor(ageInMonths/12)} years${ageInMonths%12 ? ` and ${ageInMonths%12} months` : ''}`} old and has a wonderful ${personalities[Math.floor(Math.random() * personalities.length)].toLowerCase()} personality. ${dogNames[i]} is great with ${Math.random() > 0.5 ? 'children' : 'other pets'} and loves to ${Math.random() > 0.5 ? 'play fetch' : 'go for walks'}.`,
        imageUrl: dogImages[i]
      });
    }
    
    // Add 6 cats
    for (let i = 0; i < 6; i++) {
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const ageInMonths = Math.floor(Math.random() * 60) + 3; // 3 months to 5 years
      this.createPet({
        name: catNames[i],
        type: "cat",
        breed: catBreeds[i],
        age: ageInMonths,
        gender: genders[Math.floor(Math.random() * genders.length)],
        size: sizes[Math.floor(Math.random() * sizes.length)],
        personality: personalities[Math.floor(Math.random() * personalities.length)],
        status: status,
        description: `${catNames[i]} is a charming ${catBreeds[i]} who ${status === 'available' ? 'is looking for a forever home' : status === 'adopted' ? 'has found a loving family' : 'has a family interested in adoption'}. ${catNames[i]} is ${ageInMonths < 12 ? `${ageInMonths} months` : `${Math.floor(ageInMonths/12)} years${ageInMonths%12 ? ` and ${ageInMonths%12} months` : ''}`} old and has a wonderful ${personalities[Math.floor(Math.random() * personalities.length)].toLowerCase()} personality. ${catNames[i]} is ${Math.random() > 0.5 ? 'very independent' : 'quite affectionate'} and enjoys ${Math.random() > 0.5 ? 'lounging in sunny spots' : 'chasing toys'}.`,
        imageUrl: catImages[i]
      });
    }
    
    // Add 4 small pets
    for (let i = 0; i < 4; i++) {
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const ageInMonths = Math.floor(Math.random() * 24) + 2; // 2 months to 2 years
      this.createPet({
        name: smallPetNames[i],
        type: "small",
        breed: smallPetBreeds[i],
        age: ageInMonths,
        gender: genders[Math.floor(Math.random() * genders.length)],
        size: "Small",
        personality: personalities[Math.floor(Math.random() * personalities.length)],
        status: status,
        description: `${smallPetNames[i]} is an adorable ${smallPetBreeds[i]} who ${status === 'available' ? 'is looking for a caring owner' : status === 'adopted' ? 'has found a loving home' : 'has someone interested in adoption'}. ${smallPetNames[i]} is ${ageInMonths < 12 ? `${ageInMonths} months` : `${Math.floor(ageInMonths/12)} years${ageInMonths%12 ? ` and ${ageInMonths%12} months` : ''}`} old and has a ${personalities[Math.floor(Math.random() * personalities.length)].toLowerCase()} nature. ${smallPetNames[i]} would be perfect for ${Math.random() > 0.5 ? 'a first-time pet owner' : 'someone with a quiet home'}.`,
        imageUrl: smallPetImages[i]
      });
    }
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  async getAllPets(): Promise<Pet[]> {
    return Array.from(this.pets.values());
  }
  
  async getPet(id: number): Promise<Pet | undefined> {
    return this.pets.get(id);
  }
  
  async searchPets(query: string, status?: string): Promise<Pet[]> {
    let pets = Array.from(this.pets.values());
    
    if (query) {
      const lowercaseQuery = query.toLowerCase();
      pets = pets.filter(pet => 
        pet.name.toLowerCase().includes(lowercaseQuery) ||
        pet.breed.toLowerCase().includes(lowercaseQuery) ||
        pet.type.toLowerCase().includes(lowercaseQuery)
      );
    }
    
    if (status && status !== 'all') {
      pets = pets.filter(pet => pet.status === status);
    }
    
    return pets;
  }
  
  async createPet(insertPet: InsertPet): Promise<Pet> {
    const id = this.petCurrentId++;
    const pet: Pet = { ...insertPet, id };
    this.pets.set(id, pet);
    return pet;
  }
  
  async updatePetStatus(id: number, status: string): Promise<Pet | undefined> {
    const pet = this.pets.get(id);
    
    if (!pet) {
      return undefined;
    }
    
    const updatedPet = { ...pet, status };
    this.pets.set(id, updatedPet);
    return updatedPet;
  }
}

export const storage = new MemStorage();
