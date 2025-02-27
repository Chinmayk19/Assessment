import React from 'react'

const PokemonDetails = (props) => {
  return (
    <div className="flex flex-col items-center justify-center bg-purple-100 shadow-md text-white rounded-lg gap-4 my-8 mx-auto w-80 h-100">
        <div className="flex flex-col gap-3 items-center text-black text-xl">
            <img src={props.image} alt={`${props.name}.img`} className="w-32 h-32" />
            <h5>{props.name}</h5>
        </div>
        <div className="mx-4 text-black">
            <p className="text-base mb-2">Abilities: {props.abilities}</p>
            <p className="text-sm mb-1">Weight: {props.weight}</p>
            <p className="text-sm mb-1">Height: {props.height}</p>
            <p className="text-sm mb-1">Experience: {props.experience}</p>
            <p className="text-sm mb-1">Moves: {props.moves}</p>
        </div>
    </div>
  )
}

export default PokemonDetails;