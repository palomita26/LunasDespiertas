import { PrismaClient, Blog } from "@prisma/client";
import Link from "next/link";
const prisma = new PrismaClient();

export default async function Blog() {
  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
  });
  console.log(blogs);

  return (
    <div className="pt-10">
      <p className="text-center">Blog Page</p>

      <div>
        {blogs.map((blog) => (
          <div className="flex flex-col gap-5 px-8 py-10 bg-[#AB9D97] mx-24 my-10 rounded-sm">
            <h2>{blog.title}</h2>
            <p>{blog.createdAt.toLocaleString()}</p>
            <p>{blog.content?.toString()}</p>
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
