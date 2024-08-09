"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { APP_NAME } from "@/constants";
import Container from "./Container";
import { ModeToggle } from "./theme/mode-toggle";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const toggleMobileNav = () => setMobileNavOpen(!mobileNavOpen);

  return (
    <section className="overflow-hidden">
      <div className="border-b border-gray-100">
        <div className="container px-4 mx-auto">
          <div className="flex items-center justify-between py-6">
            <a href="/">
              <img
                src="https://static.shuffle.dev/uploads/files/17/174d276abc07ecc5ec0d5aaaffe6d212d50fa896/logo-png-1723181379780.webp"
                alt="Logo"
              />
            </a>
            <ul className="hidden lg:flex items-center gap-8">
              <li>
                <a className="flex items-center flex-wrap gap-2 group" href="#">
                  <span className="group-hover:text-opacity-70 transition duration-200">
                    Features
                  </span>
                  <ChevronDown
                    className="group-hover:text-opacity-70 transition duration-200"
                    size={16}
                  />
                </a>
              </li>
             
              <li className="hover:text-opacity-70 transition duration-200">
                <a href="#">Github</a>
              </li>
             
            </ul>
            <ConnectButton
              showBalance={false}
              chainStatus="icon"
              accountStatus={{
                smallScreen: "avatar",
                largeScreen: "full",
              }}
            />
            <div className="lg:hidden">
              <button onClick={toggleMobileNav}>
                <Menu className="text-orange-500" size={51} />
              </button>
            </div>
          </div>
        </div>
      </div>
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
              <a className="flex items-center flex-wrap gap-2 group" href="#">
                <span className="group-hover:text-opacity-70 transition duration-200">
                  Features
                </span>
                <ChevronDown
                  className="group-hover:text-opacity-70 transition duration-200"
                  size={16}
                />
              </a>
            </li>
            <li className="hover:text-opacity-70 transition duration-200">
              <a href="#">Start</a>
            </li>
            <li className="hover:text-opacity-70 transition duration-200">
              <a href="#">Community</a>
            </li>
            <li>
              <a className="flex items-center flex-wrap gap-2 group" href="#">
                <span className="group-hover:text-opacity-70 transition duration-200">
                  Github
                </span>
                <ChevronDown
                  className="group-hover:text-opacity-70 transition duration-200"
                  size={16}
                />
              </a>
            </li>
          </ul>
          {/* <ConnectButton
            showBalance={false}
            chainStatus="icon"
            accountStatus={{
              smallScreen: "avatar",
              largeScreen: "full",
            }}
          /> */}
        </nav>
      </div>
    </section>
    // <Container>
    //   <div className="flex items-center justify-between rounded-full py-6">
    //     <div
    //       className="flex w-auto cursor-pointer items-center text-lg font-semibold"
    //       onClick={() => router.push("/")}
    //     >
    //       <Image
    //         src={"/logo.png"}
    //         alt="logo"
    //         height={48}
    //         width={48}
    //         className="hidden lg:block "
    //       />
    //       {APP_NAME}
    //     </div>
    //     <div className="w-auto">
    //       <div className="flex flex-wrap items-center space-x-2">
    //         <div className={`w-auto ${!true ? "hidden" : "block"} lg:block`}>
    //           <ConnectButton showBalance={false}
    //             chainStatus="icon"
    //             accountStatus={{
    //               smallScreen: 'avatar',
    //               largeScreen: 'full',
    //             }}
    //           />
    //         </div>
    //         <ModeToggle />
    //       </div>
    //     </div>
    //   </div>
    // </Container>
  );
}
