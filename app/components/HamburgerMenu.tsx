"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import type { Session } from "next-auth";
import { Josefin_Sans } from "next/font/google";
import Link from "next/link";
import { useState } from "react";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: "400",
});

type Props = {
  isAdmin: boolean;
  session: Session | null;
};

export default function HamburgerMenu({ isAdmin, session }: Props) {
  const [isOpen, setOpen] = useState(false);
  return (
    <DropdownMenu.Root open={isOpen} onOpenChange={setOpen}>
      <DropdownMenu.Trigger asChild>
        <button className="text-black" aria-label="Customise options">
          <svg
            width="35px"
            height="35px"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 18L20 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M4 12L20 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M4 6L20 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={`bg-[#9a090e] p-4 text-white rounded-sm text-lg w-[150px] z-20 ${josefin.className}`}
          sideOffset={12}
        >
          <DropdownMenu.Item
            onClick={() => setOpen(false)}
            className="py-3 text-center"
          >
            <Link href="/about">
              <p className="tracking-[.1em]">ABOUT</p>{" "}
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onClick={() => setOpen(false)}
            className="py-3 text-center"
          >
            <Link href="/services">
              <p className="tracking-[.1em]">SERVICES</p>{" "}
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onClick={() => setOpen(false)}
            className="py-3 text-center"
          >
            <Link href="/blog">
              <p className="tracking-[.1em]">BLOG</p>{" "}
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onClick={() => setOpen(false)}
            className="py-3 text-center"
          >
            <Link href="/shop">
              <p className="tracking-[.1em]">SHOP</p>{" "}
            </Link>
          </DropdownMenu.Item>
          {isAdmin ? (
            <DropdownMenu.Item
              onClick={() => setOpen(false)}
              className="py-3 text-center"
            >
              <Link href="/admin">
                <p className="tracking-[.1em]">ADMIN</p>{" "}
              </Link>
            </DropdownMenu.Item>
          ) : null}
          <DropdownMenu.Item
            onClick={() => setOpen(false)}
            className="py-3 text-center"
          >
            {session ? (
              <Link href="/api/auth/signout">
                <p className="tracking-[.1em]">SIGN-OUT</p>
              </Link>
            ) : (
              <Link href="/api/auth/signin">
                <p className="tracking-[.1em]">SIGN-IN</p>
              </Link>
            )}
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
