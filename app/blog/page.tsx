import { PrismaClient, Blog } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { Ms_Madi } from "next/font/google";
import ShareIcon from "../components/icons/ShareIcon";

const madi = Ms_Madi({
  subsets: ["latin"],
  weight: "400",
});

const prisma = new PrismaClient();

export default async function Blog() {
  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
  });
  console.log(blogs);

  return (
    <div>
      <h1
        className={`text-[#9A090E] text-center tracking-[.4em] text-shadow shadow-black/25 sm:text-[50px] text-[40px] font-black ${madi.className}`}
      >
        Mente Lunar
      </h1>
      <h3 className="text-center text-[#9A090E]">
        Educación divina de tu Madre Lunar, Ana-Maria Colberg
      </h3>

      <div className="grid md:grid-cols-2 gap-7 p-8">
        {blogs.map((blog) => (
          <div key={blog.key} className="mb-5 rounded-sm mx-3 w-full mx-auto">
            <div className="flex flex-col items-center">
              <Link className="w-full" href={`/blog/${blog.key}`}>
                {blog.image ? (
                  <Image
                    className="w-full object-cover"
                    alt={blog.title}
                    src={blog.image}
                    width={400}
                    height={300}
                  />
                ) : null}
              </Link>
              <h2 className="mt-2">{blog.title}</h2>
              <div className="flex justify-end w-full">
                <Link
                  className="bg-[#D1A068] hover:bg-[#E4C7A7] rounded-sm w-[100px] h-[30px] text-center block"
                  href={`/blog/${blog.key}`}
                >
                  <p className="leading-[30px] align-middle">READ</p>
                </Link>
              </div>
            </div>
            {/* <div className="flex justify-between items-center">
              <div className="flex gap-3">
                {blog.image ? (
                  <Image
                    className=""
                    alt={blog.title}
                    src={blog.image}
                    width={100}
                    height={75}
                  />
                ) : null}
                <div> 
                  <h2>{blog.title}</h2>
                  <p className="text-[14px] lg:text-[16px]">
                    {blog.createdAt.toLocaleDateString()}
                  </p>
                </div>
              </div>
              <ShareIcon classname="" link={`/blog/${blog.key}`} />
            </div>

            <p className="mt-6">{blog.description?.toString()}</p>

            <Link
              className="bg-[#D1A068] hover:bg-[#E4C7A7] p-3 rounded-sm w-[125px] h-[48px] mx-auto text-center block mt-5"
              href={`/blog/${blog.key}`}
            >
              READ
            </Link> */}
          </div>
        ))}
      </div>
    </div>
  );
}

// b79b5c
