import Image from "next/image";
import Link from 'next/link'
import Pokemon from "./pokemon";
import Reroll from "@/components/reroll";
import { Suspense } from "react";
import loadingImage from '@/public/loading.gif';

export async function generateMetadata({ params }: { params: { doorn: number } }) {
  return {
    title: 'Door n°' + params.doorn
  }
}

export default async function DoorNumber({ params }: { params: { doorn: number } }) {
  return (
    <main className="flex min-h-screen flex-col items-center py-12 px-24">
      <Link className="absolute left-20 top-20 text-start self-start bg-secondary text-white py-2 px-4 rounded hover:bg-transparent hover:text-secondary" href="/door">Retour</Link>
      <Reroll additionnalClasses="absolute right-20 top-20 text-start self-start" />
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

      <Suspense fallback={
        <div className="flex flex-col justify-between">
          <Image
            src={loadingImage}
            alt="Loading"
            width={150}
            height={150}
          />
          <p className="italic text-center">Capture en cours...</p>
        </div>
      }>
        <Pokemon numero={params.doorn} />
      </Suspense>

    </main>
  );
}
