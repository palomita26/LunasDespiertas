import { PrismaClient, Blog } from "@prisma/client";
import Link from "next/link";
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
            className="flex flex-col gap-5 px-8 py-10 bg-[#AB9D97] mx-8 sm:mx-32 my-10 rounded-sm"
          >
            <h2>{blog.title}</h2>
            <p>{blog.createdAt.toLocaleString()}</p>
            <p>{blog.description?.toString()}</p>
            <div className="text-right">
              <Link
                className="hover:bg-gray-300 p-3"
                href={`/blog/${blog.key}`}
              >
                READ MORE
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// b79b5c
