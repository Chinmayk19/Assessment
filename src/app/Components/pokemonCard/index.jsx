"use client"
import React from 'react';
import Link from 'next/link';

const PokemonCard = (props) => {
  const abilities = props.abilities.slice(0, 2);

  return (
    <Link href={`/Pokemon/${props.name}`}>
      <div className="flex flex-col gap-3 p-4 shadow-md rounded-lg hover:shadow-sm hover:translate-y-1 cursor-pointer transition-all duration-300">
        <div className="flex flex-col items-center gap-3">
          <img src={props.image} alt={props.name} className="w-60 h-40"/>
          <p className="text-base">{props.name}</p>
        </div>
        <div className="flex flex-col items-center">
          <h5 className="text-base">Abilities</h5>
          <div className="flex gap-3">
            {abilities.map((ability, index) => (
              <p key={index} className="text-sm">{ability}</p>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;