import { generateNumero } from "@/utils/randomNumero";
import Image from "next/image";
import Link from 'next/link'

export async function generateMetadata({ params }: { params: { doorn: number } }) {
  return {
    title: 'Door n°' + params.doorn
  }
}

async function getPokemon(numero: number) {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/"+numero);

  function searchEvolution(chain: any, name: string, preName: string){
    const tempName = chain?.species.name;
    if(tempName === name){
      return searchEvolution(chain.evolves_to[0], name, preName);
    }
    return preName === tempName ? false : chain?.species.url;
  }

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
    const preDatas = await preResponse.json();
    const preEvolutionNumero = preDatas.id;
    preEvolutionName = preDatas.name;
    pokemonDatas.preEvolution = preEvolutionNumero;
  }

  const evolution = otherDatas.evolution_chain?.url;
  if(evolution){
    const chainResponse = await fetch(evolution);
    const chainDatas = await chainResponse.json();

    const hasEvo = searchEvolution(chainDatas.chain.evolves_to[0], pokemonDatas.name, preEvolutionName);
    if(hasEvo){
      const evolutionResponse = await fetch(hasEvo);
      const evolutionDatas = await evolutionResponse.json();
      const evolutionNumero = evolutionDatas.id;
      pokemonDatas.evolution = evolutionNumero;
    }
    
  }

  const nameInFrench = otherDatas.names.find((item: { language: { name: string } }) => item.language.name === 'fr')?.name;
  pokemonDatas.name = nameInFrench || pokemonDatas.name;

  return pokemonDatas;
}

export default async function DoorNumber({ params }: { params: { doorn: number } }) {
  const pokemon = await getPokemon(params.doorn);
  // console.log(pokemon);

  return (
    <main className="flex min-h-screen flex-col items-center py-12 px-24">
      <Link className="absolute left-20 top-20 text-start self-start bg-secondary text-white py-2 px-4 rounded hover:bg-transparent hover:text-secondary" href="/door">Retour</Link>
      <Link className="absolute right-20 top-20 text-start self-start bg-sky-700 text-white py-2 px-4 rounded hover:bg-transparent hover:text-sky-700 hover:border-2 hover:border-sky-700" href={"/door/"+ generateNumero()}>Ouvrir une autre porte</Link>
      <div className="py-12 z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit md:static md:w-auto  md:rounded-xl md:border md:bg-gray-200 md:p-4 md:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">app/door/[number]/page.tsx</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black md:static md:size-auto md:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 md:pointer-events-auto md:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <p className="py-12 text-4xl font-bold text-center lg:text-6xl">This is the door n°{params.doorn}</p>

      <p className="text-xl text-center lg:text-2xl">Vous avez trouvé un <span className="text-primary font-bold capitalize">{pokemon.name}</span></p>
      { pokemon.sprites && <Image src={pokemon.sprites.front_default} alt={pokemon.name} width={120} height={120} />}
      <div className="flex gap-4">
        {pokemon.preEvolution && <Link className="text-start self-start border-red-600 bg-red-600 text-white py-2 px-4 rounded hover:bg-transparent border-2 hover:text-red-600  hover:border-red-600" href={"/door/"+pokemon.preEvolution}>Désévoluer</Link> }
        {pokemon.evolution && <Link className="text-start self-start border-green-600 bg-green-600 text-white py-2 px-4 rounded hover:bg-transparent border-2 hover:text-green-600 hover:border-green-600" href={"/door/"+pokemon.evolution}>Évoluer</Link>}
      </div>
    </main>
  );
}
