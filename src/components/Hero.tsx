"use client";
import React, { useState } from "react";
import CardSpotlight from "./BgGradientCard";
import {
  APP_DESCRIPTION,
  APP_NAME,
  APP_TITLE,
  LANDING_CTA_TEXT,
} from "@/constants";
import { Button } from "./ui/button";
import { ArrowDown, ChevronDown, X } from "lucide-react";
import { useRouter } from "next/navigation";
function Hero() {
  const router = useRouter();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const toggleMobileNav = () => setMobileNavOpen(!mobileNavOpen);

  return (
    <>
      <section className="overflow-hidden pb-24">
        <div className="container px-4 mx-auto">
          {/* Mobile Navigation Menu */}
          <div
            className={`fixed top-0 left-0 bottom-0 w-4/6 sm:max-w-xs z-50 ${
              mobileNavOpen ? "block" : "hidden"
            }`}
          >
            <div
              className="fixed inset-0 bg-gray-800 opacity-80"
              onClick={toggleMobileNav}
            ></div>
            <nav className="relative z-10 px-9 py-8 h-full overflow-y-auto bg-white flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <a href="#">
                  <img
                    src="solstice-assets/images/logos/solstice-logo-dark.svg"
                    alt="Logo"
                  />
                </a>
                <button onClick={toggleMobileNav}>
                  <X size={24} />
                </button>
              </div>
              <ul className="flex flex-col gap-12 py-12">
                <li>
                  <a
                    className="flex items-center flex-wrap gap-2 group"
                    href="#"
                  >
                    <span className="group-hover:text-opacity-70 transition duration-200">
                      Platform
                    </span>
                    <ChevronDown
                      className="group-hover:text-opacity-70 transition duration-200"
                      size={16}
                    />
                  </a>
                </li>
                <li className="hover:text-opacity-70 transition duration-200">
                  <a href="#">Features</a>
                </li>
                <li className="hover:text-opacity-70 transition duration-200">
                  <a href="#">Community</a>
                </li>
                <li>
                  <a
                    className="flex items-center flex-wrap gap-2 group"
                    href="#"
                  >
                    <span className="group-hover:text-opacity-70 transition duration-200">
                      Resources
                    </span>
                    <ChevronDown
                      className="group-hover:text-opacity-70 transition duration-200"
                      size={16}
                    />
                  </a>
                </li>
              </ul>
              <a
                className="block text-center py-3 px-5 rounded-full bg-white border border-gray-200 shadow text-sm font-semibold hover:bg-gray-50 focus:ring focus:ring-orange-200 transition duration-200"
                href="#"
              >
                Get Started
              </a>
            </nav>
          </div>

          {/* Main Content */}
          <h1 className="mt-12 mb-6 text-center text-5xl lg:text-7xl font-bold font-heading mx-auto max-w-3xl">
            Boundless DeFi Automation
          </h1>
          <p className="text-gray-600 text-lg text-center mb-10 max-w-xl mx-auto">
            Automate cross-chain DeFi activities with limit orders, dollar-cost
            averaging, and scheduled transactions.
          </p>
          <div className="flex justify-center mb-24">
            <a
              className="w-full sm:w-auto text-center h-16 inline-flex items-center justify-center py-4 px-6 rounded-full bg-orange-500 border border-orange-600 shadow font-bold font-heading text-white hover:bg-orange-600 focus:ring focus:ring-orange-200 transition duration-200"
              href="#"
            >
              Start Breezing
            </a>
          </div>
          <div className="flex flex-wrap">
            <div className="w-full lg:w-1/3 p-4">
              <img
                className="mx-auto h-full rounded-xl rounded-3xl"
                src="https://static.shuffle.dev/uploads/files/17/174d276abc07ecc5ec0d5aaaffe6d212d50fa896/Frame-3.png"
                alt=""
              />
            </div>
            <div className="w-full lg:w-1/3 p-4">
              <img
                className="mx-auto h-full rounded-xl rounded-3xl"
                src="https://static.shuffle.dev/uploads/files/17/174d276abc07ecc5ec0d5aaaffe6d212d50fa896/Frame-1.png"
                alt=""
              />
            </div>
            <div className="w-full lg:w-1/3 p-4">
              <img
                className="mx-auto h-full rounded-xl rounded-3xl"
                src="https://static.shuffle.dev/uploads/files/17/174d276abc07ecc5ec0d5aaaffe6d212d50fa896/Frame-2.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;
const features = [
  {
    name: "Limit Order Bridges and Swaps",
    description:
      "Allows users to set specific conditions for bridging or swapping assets, automating execution at desired prices.",
  },
  {
    name: "Delayed Bridges and Swaps",
    description:
      "Enables users to schedule transactions for a future time or date, providing strategic timing and convenience.",
  },
  {
    name: "Dollar Cost Averaged Bridges and Swaps",
    description:
      "Offers a dollar-cost averaging option to spread transactions over time, reducing market volatility impact and risk.",
  },
];
const Features = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
      {features.map((feature, i) => (
        <CardSpotlight
          key={i}
          name={feature.name}
          description={feature.description}
        />
      ))}
    </div>
  );
};

function BgGradient() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-10 grid grid-cols-2 -space-x-52 opacity-20"
    >
      <div className="h-56 bg-gradient-to-br from-blue-700 to-purple-400 blur-[100px]"></div>
      <div className="h-32 bg-gradient-to-r from-[#14F195] to-[#9945FF] blur-[100px]"></div>
    </div>
  );
}
