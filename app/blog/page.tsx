import { PrismaClient, Blog } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import ShareIcon from "../components/icons/ShareIcon";

const prisma = new PrismaClient();

export default async function Blog() {
  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
  });
  console.log(blogs);

  return (
    <div>
      <h1 className="text-[#9A090E] text-center tracking-[.4em] text-shadow shadow-black/25 sm:text-[30px] text-[20px] font-bold">
        Mente Lunar
      </h1>

      <div>
        {blogs.map((blog) => (
          <div
            key={blog.key}
            className="px-8 py-10 bg-[#AB9D97] my-10 rounded-sm mx-3 max-w-4xl lg:mx-auto"
          >
            <div className="flex justify-between items-center">
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
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

// b79b5c
