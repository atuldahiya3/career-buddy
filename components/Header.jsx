import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

export const Header = () => {
  return (
    <header className=" bg-background/80 fixed top-0 w-full border-b z-50 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex justify-between items-center pt-5 px-20 mb-5 h-20">
        <Link href="/">
            <Image
            src="/header_logo.png"
            width={120}
            height={120}
            alt="logo"
            className=""
            />
        </Link>
        
        <div className="flex justify-between gap-10 items-center">
            <SignedIn>
            <Link href='/'>
                <Button>
                    Industry Trends
                </Button>
            </Link>
            <Link href='/'>
                <UserButton />
            </Link>
            </SignedIn>
        </div>
       
      </nav>
      {/* <SignedOut>
        <SignInButton />
        <SignUpButton />
      </SignedOut>
      <SignedIn>
        <div className="text-24">
            <UserButton />
        </div>
      </SignedIn> */}
    </header>
  );
};
