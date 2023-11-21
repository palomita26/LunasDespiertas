import Link from "next/link";
import HamburgerMenu from "./components/HamburgerMenu";
import { getServerSession } from "next-auth";
import { authOptions } from "./utils/nextAuth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log({ session });
  return (
    <main className="">
      <header className="flex bg-gray-800 h-12 items-center px-5 justify-between sticky top-0">
        <div className="sm:hidden">
          <HamburgerMenu isAdmin={Boolean(session?.user.isAdmin)} />
        </div>
        <div className="hidden sm:flex justify-around w-full max-w-sm text-white">
          <Link href="/about"> about </Link>
          <Link href="/offerings"> offerings </Link>
          <Link href="/blog"> blog </Link>
          <Link href="/shop"> shop </Link>
          {session?.user.isAdmin ? <Link href="/admin"> admin </Link> : null}
        </div>
        <button className="p-2 rounded-md bg-gray-400 hover:bg-gray-300">
          {session ? (
            <Link href="/api/auth/signout"> Google Sign-out </Link>
          ) : (
            <Link href="/api/auth/signin"> Google Sign-in </Link>
          )}
        </button>
      </header>
    </main>
  );
}
