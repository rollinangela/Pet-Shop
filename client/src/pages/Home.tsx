import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import PetCard from "@/components/PetCard";
import PetModal from "@/components/PetModal";
import { Pet } from "@/types/pet";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [sortOption, setSortOption] = useState("latest");
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { data: pets = [], isLoading } = useQuery({
    queryKey: [`/api/pets?q=${searchQuery}&status=${activeTab !== "all" ? activeTab : ""}`],
  });

  const handleViewDetails = (pet: Pet) => {
    setSelectedPet(pet);
    setModalOpen(true);
  };

  const sortPets = (pets: Pet[]) => {
    switch (sortOption) {
      case "name":
        return [...pets].sort((a, b) => a.name.localeCompare(b.name));
      case "ageYoungest":
        return [...pets].sort((a, b) => a.age - b.age);
      case "ageOldest":
        return [...pets].sort((a, b) => b.age - a.age);
      case "latest":
      default:
        return pets; // Already sorted by id in descending order from the API
    }
  };

  const sortedPets = sortPets(pets);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#4ECDC4] to-primary py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-sans mb-4">
            Find Your Perfect Furry Friend
          </h2>
          <p className="text-white text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Browse our adorable pets and give them a loving forever home.
          </p>
          
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>
      </section>
      
      {/* Pet Gallery */}
      <main className="container mx-auto px-4 py-12 flex-grow" id="pets">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold font-sans text-gray-900 mb-4 md:mb-0">
            Our Adorable <span className="text-primary">Pets</span>
          </h2>
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
            <TabsList className="inline-flex p-1 bg-gray-100 rounded-full shadow-sm">
              <TabsTrigger value="all" className="rounded-full px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-white">All Pets</TabsTrigger>
              <TabsTrigger value="available" className="rounded-full px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-white">Available</TabsTrigger>
              <TabsTrigger value="adopted" className="rounded-full px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-white">Adopted</TabsTrigger>
              <TabsTrigger value="pending" className="rounded-full px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-white">Pending</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {/* Sorting Dropdown */}
        <div className="flex justify-end mb-6">
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-[180px] bg-white border border-gray-300 rounded-md">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Sort by: Latest</SelectItem>
              <SelectItem value="name">Sort by: Name (A-Z)</SelectItem>
              <SelectItem value="ageYoungest">Sort by: Age (Youngest)</SelectItem>
              <SelectItem value="ageOldest">Sort by: Age (Oldest)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Pet Cards */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md h-80 animate-pulse">
                <div className="w-full h-48 bg-gray-300"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-300 rounded mb-2 w-2/3"></div>
                  <div className="h-4 bg-gray-300 rounded mb-4 w-full"></div>
                  <div className="h-10 bg-gray-300 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : sortedPets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedPets.map((pet) => (
              <PetCard key={pet.id} pet={pet} onViewDetails={handleViewDetails} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <h3 className="text-xl font-bold text-gray-800">No pets found</h3>
            <p className="text-gray-600 mt-2">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </main>
      
      {/* Pet Modal */}
      <PetModal 
        pet={selectedPet} 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
      />
      
      <Footer />
    </div>
  );
}
