import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pet, formatAge } from "@/types/pet";
import { Heart, Cake } from "lucide-react";

interface PetCardProps {
  pet: Pet;
  onViewDetails: (pet: Pet) => void;
}

export default function PetCard({ pet, onViewDetails }: PetCardProps) {
  const getStatusClass = (status: string) => {
    switch (status) {
      case "available":
        return "bg-[#4ECDC4]";
      case "adopted":
        return "bg-[#FF6B6B]";
      case "pending":
        return "bg-[#FFD166]";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card className="overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative">
        <img 
          src={pet.imageUrl} 
          alt={`${pet.name} - ${pet.breed}`} 
          className="w-full h-48 object-cover"
        />
        <span className={`absolute top-3 right-3 ${getStatusClass(pet.status)} text-white text-sm font-bold py-1 px-3 rounded-full capitalize`}>
          {pet.status}
        </span>
      </div>
      <CardContent className="p-4">
        <h3 className="font-sans font-bold text-xl mb-1">{pet.name}</h3>
        <p className="text-gray-600 mb-3 flex items-center gap-3">
          <span className="flex items-center">
            <Cake className="mr-1 h-4 w-4" /> {formatAge(pet.age)}
          </span>
          <span className="flex items-center">
            <Heart className="mr-1 h-4 w-4" /> {pet.personality}
          </span>
        </p>
        <Button 
          onClick={() => onViewDetails(pet)}
          className="w-full bg-[#4ECDC4] hover:bg-primary text-white font-bold py-2 rounded-lg transition-colors"
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
