import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pet, formatAge } from "@/types/pet";
import { Heart, X } from "lucide-react";

interface PetModalProps {
  pet: Pet | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function PetModal({ pet, isOpen, onClose }: PetModalProps) {
  if (!pet) return null;

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl p-0 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2">
            <img 
              src={pet.imageUrl} 
              alt={pet.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 p-6">
            <DialogHeader className="flex justify-between items-start mb-4">
              <div>
                <DialogTitle className="font-sans font-bold text-2xl text-gray-900">
                  {pet.name}
                </DialogTitle>
                <DialogDescription>
                  <div className="flex mt-1">
                    <span className={`${getStatusClass(pet.status)} text-white text-sm font-bold py-1 px-3 rounded-full capitalize`}>
                      {pet.status}
                    </span>
                  </div>
                </DialogDescription>
              </div>
              <DialogClose className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </DialogClose>
            </DialogHeader>
            
            <div className="mb-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-100 rounded-lg p-3">
                  <p className="text-gray-500 text-sm">Age</p>
                  <p className="font-semibold">{formatAge(pet.age)}</p>
                </div>
                <div className="bg-gray-100 rounded-lg p-3">
                  <p className="text-gray-500 text-sm">Gender</p>
                  <p className="font-semibold capitalize">{pet.gender}</p>
                </div>
                <div className="bg-gray-100 rounded-lg p-3">
                  <p className="text-gray-500 text-sm">Breed</p>
                  <p className="font-semibold">{pet.breed}</p>
                </div>
                <div className="bg-gray-100 rounded-lg p-3">
                  <p className="text-gray-500 text-sm">Size</p>
                  <p className="font-semibold">{pet.size}</p>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="font-sans font-bold text-lg mb-2">About {pet.name}</h4>
              <p className="text-gray-600">
                {pet.description}
              </p>
            </div>
            
            <div className="flex space-x-4">
              <Button 
                className="flex-1 bg-[#4ECDC4] hover:bg-primary text-white font-bold py-3 rounded-lg transition-colors"
                disabled={pet.status !== "available"}
              >
                {pet.status === "available" ? "Adopt Me" : "Not Available"}
              </Button>
              <Button variant="outline" className="border-2 border-[#4ECDC4] hover:border-primary text-[#4ECDC4] hover:text-primary font-bold py-3 rounded-lg transition-colors">
                <Heart className="mr-1 h-5 w-5" /> Favorite
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
