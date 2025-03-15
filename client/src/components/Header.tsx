import { Link } from "wouter";

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between">
        <Link href="/">
          <div className="flex items-center mb-4 md:mb-0 cursor-pointer">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white w-6 h-6">
                <path d="M8 10a2 2 0 1 0 4 0 2 2 0 1 0-4 0M9 14a5 5 0 0 0 6 0M12 18a6 6 0 0 0 6-5 4 4 0 0 0-9-3a4 4 0 0 0-9 3 6 6 0 0 0 6 5z" />
              </svg>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold font-sans text-gray-900">
              Paws & Claws <span className="text-primary">Pet Shop</span>
            </h1>
          </div>
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li><Link href="/" className="font-sans font-semibold text-gray-900 hover:text-primary transition-colors">Home</Link></li>
            <li><a href="#pets" className="font-sans font-semibold text-gray-900 hover:text-primary transition-colors">Pets</a></li>
            <li><a href="#" className="font-sans font-semibold text-gray-900 hover:text-primary transition-colors">About</a></li>
            <li><a href="#" className="font-sans font-semibold text-gray-900 hover:text-primary transition-colors">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
