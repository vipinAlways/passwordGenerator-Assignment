"use client"; // 🔑 must be first line

import React, { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useAuth } from "@/hooks/useGetuser";

import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

const Nav = () => {
  const { user, isLoading, authenticated } = useAuth();
  const isMobile = useIsMobile();
  console.log({ user });

  return (
    <nav className="w-full flex justify-between ">
      <Link href={"/"} className="text-2xl hover:shadow-2xs">
        {" "}
        <i>PassGen</i>
      </Link>

      <div className="flex gap-3 ">
        <DropdownMenu>
          <DropdownMenuTrigger className="min-w-52 overflow-hidden">
            <button className=" bg-white/10 backdrop:blur-3xl p-2 rounded-lg ">
              {" "}
              {user?.email}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-52">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <LogoutButton />
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {isMobile ? (
          <div>d</div>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <button className=" bg-white/10 backdrop:blur-3xl p-2 rounded-lg ">
                Generate Password
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Generate Password</DialogTitle>
                <DialogDescription>
                  Generate the tough pass and save so no worry about Remembar.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4"></div>
              <DialogFooter>
                <DialogClose asChild>
                  <button>Cancel</button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </nav>
  );
};

export default Nav;
