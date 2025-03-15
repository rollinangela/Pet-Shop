import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function SearchBar({ searchQuery, setSearchQuery }: SearchBarProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="max-w-xl mx-auto relative">
      <form onSubmit={handleSubmit} className="relative">
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a pet by name..."
          className="w-full pl-4 pr-10 py-6 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-[#FFD166] text-gray-900 font-sans text-lg"
        />
        <Button 
          type="submit" 
          className="absolute right-2 top-2 bg-primary hover:bg-[#6A0572] text-white p-2 rounded-full transition-colors"
        >
          <Search className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
}
