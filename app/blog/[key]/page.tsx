import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import edjsHTML from "editorjs-html";
import { OutputData } from "@editorjs/editorjs";
import React from "react";

export default async function BlogPost({
  params,
}: {
  params: { key: string };
}) {
  const blog = await prisma.blog.findUnique({
    where: { key: params.key },
  });
  console.log({ blog });
  const edjsParser = edjsHTML();
  const blogContent = blog
    ? edjsParser.parse(JSON.parse(blog.content as string) as OutputData)
    : null;
  console.log({ blogContent });
  return blog && blogContent ? (
    <div className="pt-10">
      <div>
        <div className="flex flex-col gap-5 px-8 py-10 bg-[#AB9D97] mx-24 my-10 rounded-sm">
          <h2>{blog.title}</h2>
          <p>{blog.createdAt.toLocaleString()}</p>
          <p>{blog.content?.toString()}</p>
          <div dangerouslySetInnerHTML={{ __html: blogContent }}></div>
        </div>
      </div>
    </div>
  ) : (
    "blog not found"
  );
}
