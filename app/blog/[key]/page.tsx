import prisma from "../../../prisma/client";
import { notFound } from "next/navigation";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeFormat from "rehype-format";
import remarkGfm from "remark-gfm";

import rehypeStringify from "rehype-stringify";
import { unified } from "unified";
import MDEditor from "@uiw/react-md-editor";

export default async function BlogPost({
  params,
}: {
  params: { key: string };
}) {
  const blog = await prisma.blog.findUnique({
    where: { key: decodeURI(params.key) },
  });
  if (!blog) notFound();

  const content = (
    await unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(remarkGfm)
      .use(rehypeFormat)
      .use(rehypeStringify)
      .process(JSON.parse(blog.content as string))
  ).toString();
  return content ? (
    <div className="pt-10">
      <div>
        <div className="flex flex-col gap-5 px-8 py-10 bg-[#AB9D97] mx-8 my-10 sm:mx-24 rounded-sm ">
          <h2>{blog.title}</h2>
          <p>{blog.createdAt.toLocaleString()}</p>

          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </div>
  ) : (
    "blog not found"
  );
}
