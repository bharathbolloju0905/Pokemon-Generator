import React from "react";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white py-4 shadow-md">
      <div className="container mx-auto text-center">
        <h1 className="text-3xl font-bold">Pokédex Explorer</h1>
        <p className="text-sm mt-1">Discover and search for your favorite Pokémon!</p>
      </div>
    </header>
  );
};

export default Header;
