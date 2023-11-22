import type { Metadata } from "next";
import { Ms_Madi, Libre_Baskerville } from "next/font/google";
import "./globals.css";
import HamburgerMenu from "./components/HamburgerMenu";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "./utils/nextAuth";
import Image from "next/image";
import ShoppingCartIcon from "./components/icons/ShoppingCart";

const madi = Ms_Madi({
  subsets: ["latin"],
  weight: "400",
});
const libre = Libre_Baskerville({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Lunas Despiertas",
  description: "By Ana-Maria Colberg",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  console.log({ session });
  return (
    <html lang="en">
      <body className={libre.className}>
        <header className="flex navbar-gradient h-[60px] items-center px-5 justify-between sticky top-0">
          <div className="flex items-center">
            <Link href="/">
              <Image
                className="relative top-8 w-16 h-16 sm:w-[100px] sm:h-[100px]"
                src="/LD-Logo.png"
                height={100}
                width={100}
                alt="Lunas Despiertas Logo"
              />
            </Link>
            <Link href="/">
              <div className="sm:w-64 pt-4">
                <p
                  className={`text-[10px] sm:text-[14px] text-white tracking-[.4em] ${libre.className}`}
                >
                  LUNAS DESPIERTAS
                </p>
                <p
                  className={`text-[12px] sm:text-sm pl-12 tracking-[.1em] ${madi.className}`}
                >
                  By Ana-Maria Colberg
                </p>
              </div>
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            <HamburgerMenu isAdmin={Boolean(session?.user.isAdmin)} />
          </div>
          <div className="hidden md:flex gap-7 justify-end text-gold text-[12px] uppercase font-bold pt-8 text-shadow shadow-black/25">
            <Link href="/about">about</Link>
            <Link href="/services">services</Link>
            <Link href="/blog">blog</Link>
            <Link href="/shop">shop</Link>
            {session?.user.isAdmin ? <Link href="/admin">admin</Link> : null}
            {session ? (
              <Link className="text-[#3E3A37]" href="/api/auth/signout">
                Sign-out
              </Link>
            ) : (
              <Link className="text-[#3E3A37]" href="/api/auth/signin">
                Sign-in
              </Link>
            )}
            <Link className="relative bottom-[3px]" href="/shopping-cart">
              <ShoppingCartIcon></ShoppingCartIcon>
            </Link>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}
