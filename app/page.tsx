import Link from "next/link";
import HamburgerMenu from "./components/HamburgerMenu";

export default function Home() {
  return (
    <main className="">
      <header className="flex bg-gray-800 h-12 items-center px-5 justify-between sticky top-0">
        <div className="sm:hidden">
          <HamburgerMenu />
        </div>
        <div className="hidden sm:flex justify-around w-full max-w-sm text-white">
          <Link href="/about"> about </Link>
          <Link href="/offerings"> offerings </Link>
          <Link href="/blog"> blog </Link>
          <Link href="/shop"> shop </Link>
          <Link href="/admin"> admin </Link>
        </div>
      </header>
    </main>
  );
}
