import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Cookie, Refrigerator, Sparkles } from "lucide-react";

import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
// import HowToCookModal from "./HowToCookModal";
import PricingModal from "./PricingModal";
import UserDropdown from "./UserDropdown";

import { SignInButton, SignUpButton } from "@clerk/nextjs";

import { checkUser } from "@/lib/checkUser";

export default async function Header() {
  const user = await checkUser();
  return (
    <header className="fixed top-0 z-50 w-full border-b border-stone-200 bg-stone-50/80 backdrop-blur-md supports-backdrop-filter:bg-stone-50/60">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link
          href={user ? "/dashboard" : "/"}
          className="group flex items-center gap-2"
        >
          <Image
            src="/orange-logo.png"
            alt="Servd Logo"
            width={60}
            height={60}
            className="w-16"
            priority
          />
        </Link>

        {/* Navigation Links */}
        <div className="hidden items-center space-x-8 text-sm font-medium text-stone-600 md:flex">
          <Link
            href="/recipes"
            className="flex items-center gap-1.5 transition-colors hover:text-orange-600"
          >
            <Cookie className="h-4 w-4" />
            My Recipes
          </Link>

          <Link
            href="/pantry"
            className="flex items-center gap-1.5 transition-colors hover:text-orange-600"
          >
            <Refrigerator className="h-4 w-4" />
            My Pantry
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* <HowToCookModal /> */}

          {user ? (
            <>
              <PricingModal subscriptionTier={user.subscriptionTier}>
                <Badge
                  variant="outline"
                  className={`flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-semibold transition-all ${
                    user.subscriptionTier === "pro"
                      ? "bg-gradient-to-r from-orange-600 to-amber-500 text-white border-none shadow-sm"
                      : "cursor-pointer border-stone-200 bg-stone-200/50 text-stone-600 hover:border-stone-300 hover:bg-stone-300/50"
                  }`}
                >
                  <Sparkles
                    className={`h-3 w-3 ${
                      user.subscriptionTier === "pro"
                        ? "fill-white/20 text-white"
                        : "text-stone-500"
                    }`}
                  />

                  <span>
                    {user.subscriptionTier === "pro"
                      ? "Pro Chef"
                      : "Free Plan"}
                  </span>
                </Badge>
              </PricingModal>

              <UserDropdown />
            </>
          ) : (
            <>
              <SignInButton mode="modal">
                <Button
                  variant="ghost"
                  className="font-medium text-stone-600 hover:bg-orange-50 hover:text-orange-600"
                >
                  Sign In
                </Button>
              </SignInButton>

              <SignUpButton mode="modal">
                <Button variant="primary" className="rounded-full px-6">
                  Get Started
                </Button>
              </SignUpButton>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

