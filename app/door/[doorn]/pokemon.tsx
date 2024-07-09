import Image from "next/image";
import Link from 'next/link'

function searchEvolution(chain: any, name: string, preName: string){
  const tempName = chain?.species.name;
  if(tempName === name){
    return searchEvolution(chain.evolves_to[0], name, preName);
  }
  return preName === tempName ? false : chain?.species.url;
}

async function getPokemon(numero: number) {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/"+numero);

  if(!response.ok){
    throw new Error('Failed to fetch pokemon');
  }

  const pokemonDatas = await response.json();
  const otherResponse = await fetch(pokemonDatas.species.url);

  if(!otherResponse.ok){
    throw new Error('Failed to fetch pokemon\'s datas');
  }

  const otherDatas = await otherResponse.json();

  const preEvolution = otherDatas.evolves_from_species?.url;
  let preEvolutionName = '';
  if(preEvolution){
    const preResponse = await fetch(preEvolution);

    if(!preResponse.ok){
      throw new Error('Failed to fetch pre-evo\'s datas');
    }

    const preDatas = await preResponse.json();
    const preEvolutionNumero = preDatas.id;
    preEvolutionName = preDatas.name;
    pokemonDatas.preEvolution = preEvolutionNumero;
  }

  const evolution = otherDatas.evolution_chain?.url;
  if(evolution){
    const chainResponse = await fetch(evolution);

    if(!chainResponse.ok){
      throw new Error('Failed to fetch chain\'s evolution datas');
    }

    const chainDatas = await chainResponse.json();

    const hasEvo = searchEvolution(chainDatas.chain.evolves_to[0], pokemonDatas.name, preEvolutionName);
    if(hasEvo){
      const evolutionResponse = await fetch(hasEvo);

      if(!evolutionResponse.ok){
        throw new Error('Failed to fetch evolution\'s datas');
      }

      const evolutionDatas = await evolutionResponse.json();
      const evolutionNumero = evolutionDatas.id;
      pokemonDatas.evolution = evolutionNumero;
    }
    
  }

  const nameInFrench = otherDatas.names.find((item: { language: { name: string } }) => item.language.name === 'fr')?.name;
  pokemonDatas.name = nameInFrench || pokemonDatas.name;

  return pokemonDatas;
}

export default async function Pokemon( params: { numero: number } ) {
  const pokemon = await getPokemon(params.numero);

  return (
    <>
      <p className="text-xl text-center lg:text-2xl">Vous avez trouvé un <span className="text-primary font-bold capitalize">{pokemon.name}</span></p>
      <Image src={pokemon.sprites.front_default} alt={pokemon.name} width={120} height={120} />
      <div className="flex gap-4">
          {pokemon.preEvolution && <Link className="text-start self-start border-red-600 bg-red-600 text-white py-2 px-4 rounded hover:bg-transparent border-2 hover:text-red-600  hover:border-red-600" href={"/door/"+pokemon.preEvolution}>Désévoluer</Link> }
          {pokemon.evolution && <Link className="text-start self-start border-green-600 bg-green-600 text-white py-2 px-4 rounded hover:bg-transparent border-2 hover:text-green-600 hover:border-green-600" href={"/door/"+pokemon.evolution}>Évoluer</Link>}
      </div>
    </>
  );
}
