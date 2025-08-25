'use client'

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();
  
  return (
    <div className="flex justify-between h-screen overflow-hidden items-center">
      <div className="h-full flex flex-col justify-end items-start px-10 py-20">
        <div>
          <h1 className="text-2xl font-bold font-mono">Cashflow Guardian</h1>
          <p className=" mt-2">
            Cashflow Guardian is a tool that helps you manage your cashflow. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
          </p>
        </div>
        <Button size='sm' onClick={() => router.push('/assistant')} className="hover:bg-[var(--main-red)] font-semibold cursor-pointer mt-4 bg-gray-100 text-black hover:text-white text-md font-mono">Get Started</Button>
      </div>
      <div className="bg-[var(--main-red)] h-[75vh] w-[50vw] rounded-l-3xl shrink-0">
        <Image src="/vc_landing.png" alt="venture_compass" width={1000} height={100} className="w-full h-full object-contain" />
      </div>
    </div>
  );
}
