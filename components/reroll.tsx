'use client'

import { generateNumero } from "@/utils/randomNumero";
import { useRouter } from 'next/navigation';

export default function Reroll({ phrase, additionnalClasses = '' }: { phrase?: string, additionnalClasses?: string } ) {
    const router = useRouter();
  
    function openDoor(){
      const randomNumber = generateNumero();
      router.push(`/door/${randomNumber}`);
    }
  
    return (
      <button onClick={() => openDoor()} className={additionnalClasses + " bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded"}>{ phrase || 'Ouvrir une porte'}</button>
    );
}