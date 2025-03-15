import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { formatAge } from "@/types/pet";
import { Heart, ArrowLeft, Cake, Info } from "lucide-react";

export default function PetDetails() {
  const [, params] = useRoute("/pet/:id");
  const id = params?.id;

  const { data: pet, isLoading, error } = useQuery({
    queryKey: [`/api/pets/${id}`],
    enabled: !!id,
  });

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

  if (isLoading) {
    return (
      <div>
        <Header />
        <div className="container mx-auto px-4 py-12 min-h-screen flex items-center justify-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-48 mb-4"></div>
            <div className="h-64 bg-gray-300 rounded w-full mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-4/6"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !pet) {
    return (
      <div>
        <Header />
        <div className="container mx-auto px-4 py-12 min-h-screen flex flex-col items-center justify-center">
          <Info className="h-16 w-16 text-primary mb-4" />
          <h2 className="text-2xl font-bold mb-2">Pet Not Found</h2>
          <p className="text-gray-600 mb-6">The pet you're looking for doesn't exist or has been removed.</p>
          <Link href="/">
            <Button className="bg-primary hover:bg-[#6A0572]">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <Link href="/">
          <Button variant="ghost" className="mb-6 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Pets
          </Button>
        </Link>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img 
                src={pet.imageUrl} 
                alt={pet.name} 
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            
            <div className="md:w-1/2 p-6 md:p-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{pet.name}</h1>
                  <span className={`${getStatusClass(pet.status)} text-white text-sm font-bold py-1 px-3 rounded-full capitalize`}>
                    {pet.status}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 my-6">
                <div className="bg-gray-100 rounded-lg p-4">
                  <p className="text-gray-500 text-sm">Age</p>
                  <p className="font-semibold">{formatAge(pet.age)}</p>
                </div>
                <div className="bg-gray-100 rounded-lg p-4">
                  <p className="text-gray-500 text-sm">Gender</p>
                  <p className="font-semibold capitalize">{pet.gender}</p>
                </div>
                <div className="bg-gray-100 rounded-lg p-4">
                  <p className="text-gray-500 text-sm">Breed</p>
                  <p className="font-semibold">{pet.breed}</p>
                </div>
                <div className="bg-gray-100 rounded-lg p-4">
                  <p className="text-gray-500 text-sm">Size</p>
                  <p className="font-semibold">{pet.size}</p>
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-3">About {pet.name}</h2>
                <div className="flex items-center text-gray-600 mb-3">
                  <Cake className="mr-2 h-5 w-5" />
                  <span>{formatAge(pet.age)} old</span>
                </div>
                
                <p className="text-gray-700 leading-relaxed">
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
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
