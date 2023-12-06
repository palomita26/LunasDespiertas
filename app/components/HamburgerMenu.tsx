"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import type { Session } from "next-auth";
import Link from "next/link";

type Props = {
  isAdmin: boolean;
  session: Session | null;
};

export default function HamburgerMenu({ isAdmin, session }: Props) {
  return (
    <DropdownMenu.Root>
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
          className="bg-[#9a090e] p-4 text-white rounded-sm text-xl w-[150px] z-20"
          sideOffset={12}
        >
          <DropdownMenu.Item className="py-3 text-center">
            <Link href="/about"> About </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item className="py-3 text-center">
            <Link href="/services"> Services </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item className="py-3 text-center">
            <Link href="/blog"> Blog </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item className="py-3 text-center">
            <Link href="/shop"> Shop </Link>
          </DropdownMenu.Item>
          {isAdmin ? (
            <DropdownMenu.Item className="py-3 text-center">
              <Link href="/admin"> Admin </Link>
            </DropdownMenu.Item>
          ) : null}
          <DropdownMenu.Item className="py-3 text-center">
            {session ? (
              <Link href="/api/auth/signout">Sign-out</Link>
            ) : (
              <Link href="/api/auth/signin">Sign-in</Link>
            )}
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
