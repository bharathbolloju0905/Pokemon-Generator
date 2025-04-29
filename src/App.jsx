import { useEffect, useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import PokemonList from "./components/PokemonList";
import "./index.css";
import React from "react";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [allTypes, setAllTypes] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
        const data = await res.json();

        const detailedPromises = data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          if (!res.ok) {
            throw new Error(`Failed to fetch ${pokemon.name}`);
          }
          return res.json();
        });

        const detailedPokemon = await Promise.all(detailedPromises);

        const formatted = detailedPokemon.map((p) => ({
          id: p.id,
          name: p.name,
          image: p.sprites.front_default,
          types: p.types.map((t) => t.type.name),
        }));

        setPokemonList(formatted);
        setFilteredList(formatted);
        setAllTypes([...new Set(formatted.flatMap((p) => p.types))]);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch Pokémon:", err);
        setError(true);
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  useEffect(() => {
    const filter = pokemonList.filter((pokemon) => {
      const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType ? pokemon.types.includes(selectedType) : true;
      return matchesSearch && matchesType;
    });
    setFilteredList(filter);
  }, [searchTerm, selectedType, pokemonList]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 ">  
      <Header />
      <div className="container mx-auto px-4 py-6">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          types={allTypes}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />

        {loading && (
          <p className="text-center mt-10 text-gray-600 text-lg font-medium">
            Loading Pokémon...
          </p>
        )}
        {error && (
          <p className="text-center mt-10 text-red-500 text-lg font-medium">
            Failed to load Pokémon. Try again later.
          </p>
        )}

        {!loading && !error && <PokemonList pokemonList={filteredList} />}
      </div>
      <footer className="bg-gray-800 text-white text-center py-4 mt-10">
        <p className="text-sm">
          © {new Date().getFullYear()} Pokédex Explorer. Built with React & Tailwind CSS.
        </p>
      </footer>
    </div>
  );
}

export default App;
