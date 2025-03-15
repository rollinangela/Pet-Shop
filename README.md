# Paws & Claws Pet Shop

A modern, responsive pet shop website where users can browse and search for adoptable pets.

![Pet Shop Website](https://i.pinimg.com/736x/3b/21/9f/3b219f7b54f526e9002bad4fdb034203.jpg)

## Features

- **Browse Pet Listings**: View a gallery of pets with name, age, and status information
- **Search Functionality**: Search for pets by name
- **Filter Options**: Filter pets by status (available, adopted, pending)
- **Sorting Options**: Sort pets by latest, name, or age
- **Responsive Design**: Fully responsive layout that works on mobile, tablet, and desktop
- **Pet Details**: View detailed information about each pet

## Technologies Used

- **Frontend**: React, TypeScript, TailwindCSS, shadcn UI components
- **Backend**: Express.js
- **State Management**: React Query
- **Routing**: wouter

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/pet-shop.git
   cd pet-shop
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5000`

## Project Structure

```
pet-shop/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── types/
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   └── index.html
├── server/
│   ├── index.ts
│   ├── routes.ts
│   ├── storage.ts
│   └── vite.ts
├── shared/
│   └── schema.ts
├── package.json
└── README.md
```

## Screenshots

- Homepage with pet gallery
- Pet search and filter functionality
- Pet details modal

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspiration from [reference design](https://i.pinimg.com/736x/3b/21/9f/3b219f7b54f526e9002bad4fdb034203.jpg)
- Pet images from Unsplash
