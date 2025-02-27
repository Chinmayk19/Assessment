"use client"
import React, { useEffect, useState } from 'react';
import PokemonCard from './Components/pokemonCard';

const Page = () => {
    const [pokemon, setPokemon] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");  
    const [filteredPokemon, setFilteredPokemon] = useState([]);

    useEffect(() => {
      fetchPokemons();
    }, []); 

    useEffect(() => {
      const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 100) {
          fetchMorePokemons();
        }
      };
    
      window.addEventListener('scroll', handleScroll);
    
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [page]);

    const fetchPokemons = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * 20}&limit=20`);
        const data = await response.json();
        const pokemonDetails = await Promise.all(data.results.map(async (pokemon) => {
            const detailsResponse = await fetch(pokemon.url);
            const detailsData = await detailsResponse.json();
            return {
              name: pokemon.name,
              image: detailsData.sprites.other.home.front_shiny,
              abilities: detailsData.abilities.map(ability => ability.ability.name)
            };
          }));
        setPokemon(prevPokemon => [...prevPokemon, ...pokemonDetails.filter(newPokemon => !prevPokemon.some(oldPokemon => oldPokemon.name === newPokemon.name))]);
        setPage(page + 1);
      } catch (error) {
        console.error('Error fetching pokemons:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchMorePokemons = async () => {
      if (loading) return;
      setLoading(true);
  
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * 20}&limit=20`);
        const data = await response.json();
        const pokemonDetails = await Promise.all(data.results.map(async (pokemon) => {
            const detailsResponse = await fetch(pokemon.url);
            const detailsData = await detailsResponse.json();
            return {
              name: pokemon.name,
              image: detailsData.sprites.other.home.front_shiny,
              abilities: detailsData.abilities.map(ability => ability.ability.name)
            };
          }));
        setPokemon(prevPokemon => [...prevPokemon, ...pokemonDetails.filter(newPokemon => !prevPokemon.some(oldPokemon => oldPokemon.name === newPokemon.name))]);
        setPage(page + 1);
      } catch (error) {
        console.error('Error fetching more pokemons:', error);
      } finally {
        setLoading(false);
      }
    };

    const handleSearchChange = (e) => {
      const query = e.target.value.toLowerCase();
      setSearch(query);

      if (query === "") {
        setFilteredPokemon(pokemon);
      } else {
        const filtered = pokemon.filter(poke => poke.name.toLowerCase().startsWith(query));
        setFilteredPokemon(filtered);
      }
    };

    return (
      <div>
        <h4 className="text-center my-4">Pokemons</h4>
        <div className="text-center mb-4">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={handleSearchChange}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex flex-wrap justify-center gap-4 max-w-screen-xl mx-auto">
          {filteredPokemon.length > 0 ? (
            filteredPokemon.map((poke, index) => (
              <PokemonCard key={index} name={poke.name} image={poke.image} index={index} abilities={poke.abilities} />
            ))
          ) : (
            pokemon.map((poke, index) => (
              <PokemonCard key={index} name={poke.name} image={poke.image} index={index} abilities={poke.abilities} />
            ))
          )}
        </div>

        {loading && <div className="text-center">Loading....</div>}
      </div>
    );
};

export default Page;
