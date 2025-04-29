import React from "react";
const PokemonCard = ({ pokemon }) => {
    const typeColorMap = {
        fire: "bg-red-200 text-red-800",
        water: "bg-blue-200 text-blue-800",
        grass: "bg-green-200 text-green-800",
        electric: "bg-yellow-200 text-yellow-800",
        bug: "bg-lime-200 text-lime-800",
        poison: "bg-purple-200 text-purple-800",
        normal: "bg-gray-200 text-gray-800",
        ground: "bg-yellow-300 text-yellow-900",
        fairy: "bg-pink-200 text-pink-800",
        psychic: "bg-pink-300 text-pink-900",
        rock: "bg-yellow-400 text-yellow-900",
        fighting: "bg-orange-300 text-orange-900",
        ghost: "bg-indigo-300 text-indigo-900",
        dragon: "bg-purple-400 text-purple-900",
        ice: "bg-blue-100 text-blue-700",
        dark: "bg-gray-700 text-gray-100",
        steel: "bg-gray-300 text-gray-900",
        flying: "bg-sky-200 text-sky-800",
      };
      
    return (
      <div className="bg-white shadow-lg rounded-xl p-4 transition-transform transform hover:scale-105">
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-28 h-28 mx-auto"
        />
        <div className="text-center mt-2">
          <h2 className="text-lg font-bold capitalize">{pokemon.name}</h2>
          <p className="text-sm text-gray-500">#{pokemon.id.toString().padStart(3, '0')}</p>
          <div className="mt-2 flex justify-center flex-wrap gap-2">
            {pokemon.types.map((type) => (
              <span
                key={type}
                className={`px-2 py-1 text-xs rounded-full bg-${type}-200 text-${type}-800 capitalize`}
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default PokemonCard;
  