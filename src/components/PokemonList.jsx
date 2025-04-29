import React from "react";

const PokemonList = ({ pokemonList }) => {
  return (
    <div className="flex justify-center items-center min-h-screen mt-10">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {pokemonList.map((pokemon) => (
          <div
            key={pokemon.id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
          >
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="w-20 h-20 object-contain"
            />
            <h3 className="text-lg font-semibold mt-2 capitalize">{pokemon.name}</h3>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
