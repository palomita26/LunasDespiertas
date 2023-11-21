"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Link from "next/link";

type Props = {
  isAdmin: boolean;
};

export default function HamburgerMenu({ isAdmin }: Props) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="" aria-label="Customise options">
          <svg
            width="35px"
            height="35px"
            viewBox="0 0 24 24"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 18L20 18"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M4 12L20 12"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M4 6L20 6"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="bg-gray-800 p-4 text-white"
          sideOffset={10}
        >
          <DropdownMenu.Item className="py-2 text-center">
            <Link href="/about"> About </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item className="py-2 text-center">
            <Link href="/offerings"> Offerings </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item className="py-2 text-center">
            <Link href="/blog"> Blog </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item className="py-2 text-center">
            <Link href="/shop"> Shop </Link>
          </DropdownMenu.Item>
          {isAdmin ? (
            <DropdownMenu.Item className="py-2 text-center">
              <Link href="/admin"> Admin </Link>
            </DropdownMenu.Item>
          ) : null}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
