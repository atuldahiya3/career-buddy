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
} from "@/components/ui/dropdown-menu";
import { 
  Menu, 
  ChevronDownIcon, 
  FileIcon, 
  FileText, 
  GraduationCap, 
  LayoutIcon, 
  PenBox, 
  StarIcon, 
  VideoIcon,
  X
} from "lucide-react";
import { checkUser } from "@/lib/CheckUser";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const Header = async () => {
  await checkUser();
  return (
    <header className="bg-background/80 fixed top-0 w-full border-b z-50 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex justify-between items-center h-16 md:h-20 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/header_logo.png"
            width={100}
            height={100}
            alt="logo"
            className="w-20 sm:w-24 md:w-28 lg:w-32 h-auto"
          />
        </Link>

        {/* Mobile Navigation */}
        <div className="block md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] sm:w-[350px] pt-12">
              <SignedIn>
                <div className="flex flex-col gap-6 mt-6">
                  <Link href="/dashboard" className="w-full">
                    <Button variant="outline" className="w-full justify-start">
                      <LayoutIcon className="mr-2 h-4 w-4" />
                      Industry Trends
                    </Button>
                  </Link>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm px-2">Growth Tools</h4>
                    <div className="pl-2 space-y-2">
                      <Link href="/resume" className="flex items-center gap-2 p-2 hover:bg-accent rounded-md">
                        <FileText className="h-4 w-4" />
                        <span>Build Resume</span>
                      </Link>
                      <Link href="/interview" className="flex items-center gap-2 p-2 hover:bg-accent rounded-md">
                        <GraduationCap className="h-4 w-4" />
                        <span>Interview Preparation</span>
                      </Link>
                      <Link href="/cover-letter" className="flex items-center gap-2 p-2 hover:bg-accent rounded-md">
                        <PenBox className="h-4 w-4" />
                        <span>Cover Letter</span>
                      </Link>
                    </div>
                  </div>
                  
                  <div className="mt-auto flex justify-center pt-6">
                    <UserButton
                      appearance={{
                        elements: {
                          avatarBox: 'h-12 w-12',
                          userButtonPopoverCard: 'shadow-xl',
                          userPreviewMainIdentifier: 'font-semibold'
                        }
                      }}
                    />
                  </div>
                </div>
              </SignedIn>
              <SignedOut>
                <div className="flex flex-col gap-4 mt-6">
                  <SignInButton>
                    <Button className="w-full">Sign In</Button>
                  </SignInButton>
                  <SignUpButton>
                    <Button variant="outline" className="w-full">Sign Up</Button>
                  </SignUpButton>
                </div>
              </SignedOut>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4 lg:gap-8">
          <SignedIn>
            <Link href="/dashboard">
              <Button variant="outline" size="sm" className="hidden md:flex">
                <LayoutIcon className="mr-2 h-4 w-4" />
                Industry Trends
              </Button>
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm">
                  <StarIcon className="mr-2 h-4 w-4" />
                  <span className="hidden md:inline">Growth Tools</span>
                  <ChevronDownIcon className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/resume" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>Build Resume</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/interview" className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    <span>Interview Preparation</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/cover-letter" className="flex items-center gap-2">
                    <PenBox className="h-4 w-4" />
                    <span>Cover Letter</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <UserButton
              appearance={{
                elements: {
                  avatarBox: 'h-10 w-10',
                  userButtonPopoverCard: 'shadow-xl',
                  userPreviewMainIdentifier: 'font-semibold'
                }
              }}
            />
          </SignedIn>
          
          <SignedOut>
            <div className="flex items-center gap-3">
              <SignInButton>
                <Button variant="outline" size="sm">Sign In</Button>
              </SignInButton>
              <SignUpButton>
                <Button size="sm">Sign Up</Button>
              </SignUpButton>
            </div>
          </SignedOut>
        </div>
      </nav>
    </header>
  );
};