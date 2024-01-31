import type { Metadata } from "next";
import {
  Ms_Madi,
  Libre_Baskerville,
  DM_Mono,
  Josefin_Sans,
} from "next/font/google";
import "./globals.css";
import HamburgerMenu from "./components/HamburgerMenu";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "./utils/nextAuth";
import Image from "next/image";
import ShoppingCartIcon from "./components/icons/ShoppingCart";
import { Toaster } from "react-hot-toast";

const madi = Ms_Madi({
  subsets: ["latin"],
  weight: "400",
});
const libre = Libre_Baskerville({
  subsets: ["latin"],
  weight: "400",
});
// const mono = DM_Mono({
//   subsets: ["latin"],
//   weight: "400",
// });
const josefin = Josefin_Sans({
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
      <body className={`${libre.className}`}>
        <Toaster />

        <header className="flex bg-[#9a090e] h-[60px] items-center px-5 justify-between sticky top-0 z-50">
          <div className="flex items-center">
            <Link href="/">
              <Image
                className="relative top-6 sm:top-8 w-[72px] h-[72px] sm:w-[100px] sm:h-[100px]"
                src="/LD-Logo.png"
                height={100}
                width={100}
                alt="Lunas Despiertas Logo"
              />
            </Link>
            <Link href="/">
              <div className="sm:w-64 pt-1 text:center sm:text-left">
                <p
                  className={`text-[10px] sm:text-[14px] text-white tracking-[.4em] text-shadow shadow-black/25 pl-3 sm:pl-2 ${libre.className}`}
                >
                  LUNAS DESPIERTAS
                </p>
                {/* <p
                  className={`text-[12px] sm:text-sm pl-12 tracking-[.1em] text-white ${madi.className}`}
                >
                  By Ana-Maria Colberg
                </p> */}
              </div>
            </Link>
          </div>
          <div className="lg:hidden flex items-center">
            <HamburgerMenu
              isAdmin={Boolean(session?.user.isAdmin)}
              session={session}
            />
          </div>
          <div
            className={`hidden lg:flex gap-7 justify-end text-white text-[14px] tracking-[.1em] uppercase font-bold pt-8 text-shadow shadow-black/25 ${josefin.className}`}
          >
            <Link href="/about">about</Link>
            <Link href="/services">services</Link>
            <Link href="/blog">blog</Link>
            <Link href="/shop">shop</Link>
            {session?.user.isAdmin ? <Link href="/admin">admin</Link> : null}
            {session ? (
              <Link className="text-white" href="/api/auth/signout">
                Sign-out
              </Link>
            ) : (
              <Link className="text-white" href="/api/auth/signin">
                Sign-in
              </Link>
            )}
            <Link className="relative bottom-[3px]" href="/shopping-cart">
              <ShoppingCartIcon></ShoppingCartIcon>
            </Link>
          </div>
        </header>
        <div className="h-[60px] sticky top-0 z-10 bg-white relative" />

        {children}
      </body>
    </html>
  );
}
