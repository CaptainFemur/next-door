'use client'

import { useRouter } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";

export default function PepiDoor() {
  const router = useRouter();

  function openDoor(){
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    router.push(`/door/${randomNumber}`);
  }

  return (
    <main className="flex min-h-screen flex-col items-center py-12 px-24">
      <Link className="absolute left-20 top-20 text-start self-start bg-secondary text-white py-2 px-4 rounded hover:bg-transparent hover:text-secondary" href="/">Retour</Link>
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm md:flex py-12 ">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit md:static md:w-auto  md:rounded-xl md:border md:bg-gray-200 md:p-4 md:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">app/door/page.tsx</code>
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

      <p className="text-4xl font-bold text-center py-12 lg:text-6xl ">PepiDoor</p>
      <button onClick={() => openDoor()} className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded">Ouvrir une porte</button>
    </main>
  );
}
