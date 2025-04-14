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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDownIcon, FileIcon, FileText, GraduationCap, LayoutIcon, PenBox, StarIcon, VideoIcon } from "lucide-react";
import { checkUser } from "@/lib/CheckUser";


export const Header = async() => {
  await checkUser();
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
            <Link href="/dashboard">
              <Button variant='outline'>
                <LayoutIcon/>
                Industry Trends
                </Button>
            </Link>
            
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <Button>
              <StarIcon/>
              <span>
                Growth Tools
              </span>
              <ChevronDownIcon/>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href='/resume'>
                  <div className="flex justify-between gap-2 items-center">
                    <FileText className="h-4 w-4"/>
                    <span>
                      Build Resume
                    </span>
                  </div>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
              <Link href='/interview'>
                  <div className="flex justify-between gap-2 items-center">
                    <GraduationCap className="h-4 w-4"/>
                    <span>
                      Interview Prepration
                    </span>
                  </div>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
              <Link href='/cover-letter'>
                  <div className="flex justify-between gap-2 items-center">
                    <PenBox className="h-4 w-4"/>
                    <span>
                      Cover Letter
                    </span>
                  </div>
                </Link>
              </DropdownMenuItem>
              
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="/">
              <UserButton
              appearance={{
                elements:{
                  avatarBox:'h-12 w-12',
                  userButtonPopoverCard:'shadow-xl',
                  userPreviewMainIdentifier:'font-semibold'
                }
              }}
              />
            </Link>
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Button variant='outline'>
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
          
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
