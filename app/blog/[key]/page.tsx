import prisma from "../../../prisma/client";
import { notFound } from "next/navigation";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeFormat from "rehype-format";
import remarkGfm from "remark-gfm";
import { Petit_Formal_Script } from "next/font/google";
import rehypeStringify from "rehype-stringify";
import { unified } from "unified";
import MDEditor from "@uiw/react-md-editor";
import Image from "next/image";
import ShareIcon from "@/app/components/icons/ShareIcon";

const script = Petit_Formal_Script({
  subsets: ["latin"],
  weight: "400",
});

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
      .process(blog.content)
  ).toString();
  return content ? (
    <div className="py-20 bg-[#DDCFB1]">
      <div>
        <div className="flex flex-col gap-5 px-8 py-5 bg-white rounded-sm mx-3 max-w-full lg:max-w-4xl lg:mx-auto">
          <div>
            <div className="flex justify-end">
              <ShareIcon link={`/blog/${blog.key}`} />
            </div>

            <div className="flex justify-between w-full">
              <h1 className={`${script.className}`}>{blog.title}</h1>
            </div>
          </div>
          {blog.image ? (
            <Image
              className="w-full"
              alt={blog.title}
              src={blog.image}
              width={700}
              height={400}
            />
          ) : null}
          <p>{blog.createdAt.toLocaleDateString()}</p>

          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </div>
  ) : (
    "blog not found"
  );
}
