import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

const PokemonList = ({ pokemonList, itemsPerPageOptions = [10, 20, 50], onFavoriteToggle, favorites = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);
  const [sortOption, setSortOption] = useState("id");

  // Sorting logic
  const sortedPokemonList = useMemo(() => {
    return [...pokemonList].sort((a, b) => {
      if (sortOption === "id") return a.id - b.id;
      if (sortOption === "name") return a.name.localeCompare(b.name);
      return 0;
    });
  }, [pokemonList, sortOption]);

  // Pagination logic
  const totalPages = Math.ceil(sortedPokemonList.length / itemsPerPage);
  const paginatedPokemonList = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedPokemonList.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedPokemonList, currentPage, itemsPerPage]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen mt-10">
      {/* Sorting and Items Per Page Controls */}
      <div className="flex justify-between items-center w-full max-w-4xl mb-4">
        <div className="flex gap-4">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="id">Sort by ID</option>
            <option value="name">Sort by Name</option>
          </select>
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {itemsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option} per page
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Pokémon Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {paginatedPokemonList.map((pokemon) => (
          <div
            key={pokemon.id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center relative"
          >
            <Link to={`/pokemon/${pokemon.id}`}>
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="w-20 h-20 object-contain"
              />
              <h3 className="text-lg font-semibold mt-2 capitalize">{pokemon.name}</h3>
            </Link>
            <div className="flex gap-2 mt-2">
              {pokemon.types.map((type) => (
                <span
                  key={type}
                  className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
                >
                  {type}
                </span>
              ))}
            </div>
            <button
              onClick={() => onFavoriteToggle(pokemon)}
              className={`absolute top-2 right-2 ${
                favorites.some((fav) => fav.id === pokemon.id)
                  ? "text-red-500 hover:text-red-700"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              ❤️
            </button>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PokemonList;
