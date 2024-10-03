// ClientSideNav.tsx
"use client";

import { Button } from "@/components/ui/button";
import { LoginButton } from "./auth/login-button";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useRouter } from "next/navigation";

interface ClientSideNavProps {
  session: any;
  isMobile?: boolean;
}

export const ClientSideNav: React.FC<ClientSideNavProps> = ({ session, isMobile = false }) => {
  const router = useRouter();

  const handleSignOut = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/signout', { method: 'POST' });
      if (response.ok) {
        router.refresh(); // Refresh the current route
      } else {
        console.error('Sign out failed');
      }
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };

  const renderAuthButtons = () => (
    <>
      {session ? (
        <form onSubmit={handleSignOut}>
          <Button className="font-extrabold bg-slate-50 text-slate-900">
            Sign Out
          </Button>
        </form>
      ) : (
        <>
          <Button className="font-extrabold bg-slate-50 text-slate-900">
            Log in
          </Button>
          <LoginButton>
            <Button variant={"outline"} className="font-extrabold">
              Sign Up
            </Button>
          </LoginButton>
        </>
      )}
    </>
  );

  if (isMobile) {
    return (
      <div className="block lg:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">👀 duoLink</span>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant={"outline"} size={"icon"}>
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold">👀 duoLink</span>
                  </div>
                </SheetTitle>
              </SheetHeader>
              <div className="my-8 flex flex-col gap-4">
                <a href="#" className="font-semibold">
                  Home
                </a>
              </div>
              <div className="border-t pt-4">
                <div className="mt-2 flex flex-col gap-3">
                  {renderAuthButtons()}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    );
  }

  return renderAuthButtons();
};