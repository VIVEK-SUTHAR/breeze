"use client";
import React from 'react'
import CardSpotlight from './BgGradientCard';
import { APP_DESCRIPTION, APP_NAME, APP_TITLE, LANDING_CTA_TEXT } from '@/constants';
import { Button } from './ui/button';
import { ArrowDown } from 'lucide-react'
import { useRouter } from 'next/navigation';
function Hero() {
  const router = useRouter();
  return (
    <>
      <div>
        <div className="flex h-[calc(95vh-88px)] items-center justify-center">
          <div className="mx-auto space-y-8 text-center ">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white md:text-6xl xl:text-7xl">
              {APP_TITLE}{" "}
            </h1>
            <p className="text-gray-700 dark:text-gray-300">{APP_DESCRIPTION}</p>
            <Button
              onClick={() => router.push("/action/dca")}
            >{LANDING_CTA_TEXT}</Button>
            <div className="mt-8 text-center">
              <h1 className=" text-2xl font-bold text-gray-900 dark:text-white md:text-4xl xl:text-5xl">
                Why {APP_NAME}?
              </h1>
              <br />
              <div className="flex justify-center">
                <ArrowDown />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8 ">
          <Features />
        </div>
      </div>
      <BgGradient />
    </>
  )
}

export default Hero
const features = [
  {
    name: "Limit Order Bridges and Swaps",
    description: "Allows users to set specific conditions for bridging or swapping assets, automating execution at desired prices.",
  },
  {
    name: "Delayed Bridges and Swaps",
    description: "Enables users to schedule transactions for a future time or date, providing strategic timing and convenience.",
  },
  {
    name: "Dollar Cost Averaged Bridges and Swaps",
    description: "Offers a dollar-cost averaging option to spread transactions over time, reducing market volatility impact and risk.",
  },
];
;


const Features = () => {
  return <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
    {features.map((feature, i) => (
      <CardSpotlight key={i} name={feature.name} description={feature.description} />
    ))}
  </div>
}

function BgGradient() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-10 grid grid-cols-2 -space-x-52 opacity-20"
    >
      <div className="h-56 bg-gradient-to-br from-blue-700 to-purple-400 blur-[100px]"></div>
      <div className="h-32 bg-gradient-to-r from-[#14F195] to-[#9945FF] blur-[100px]"></div>
    </div>
  )
}
