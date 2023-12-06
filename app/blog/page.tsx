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
          <div>
            <div
              key={blog.key}
              className="flex justify-between px-8 py-10 bg-[#AB9D97] my-10 rounded-sm mx-3 max-w-full lg:max-w-4xl lg:mx-auto min-h-[250px]"
            >
              <div className="flex flex-col justify-between">
                <h2>{blog.title}</h2>
                <p className="text-[14px] lg:text-[16px]">
                  {blog.createdAt.toLocaleString()}
                </p>
                <p className="w-[200px] md:w-[550px] mt-10">
                  {blog.description?.toString()}
                </p>
                <Link
                  className="bg-[#D1A068] hover:bg-[#E4C7A7] p-3 rounded-sm w-[125px] h-[48px] text-center mt-5"
                  href={`/blog/${blog.key}`}
                >
                  READ
                </Link>
              </div>

              <div className="flex flex-col justify-between">
                {blog.image ? (
                  <Image
                    alt={blog.title}
                    src={blog.image}
                    width={200}
                    height={100}
                  />
                ) : null}
                <ShareIcon
                  classname="mx-auto mb-4"
                  link={`/blog/${blog.key}`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// b79b5c
