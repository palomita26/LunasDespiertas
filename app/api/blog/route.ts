import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { File, Web3Storage } from "web3.storage";
import { authOptions } from "@/app/utils/nextAuth";
import { create } from "@web3-storage/w3up-client";
import { initW3Client } from "@/app/utils/w3StorageUtils";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const blog = await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(blog);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response("", { status: 401 });
  }
  const data = await req.formData();
  const key = data.get("key") as any as string;
  const image = data.get("image") as any as File;
  const title = data.get("title") as any as string;
  const description = data.get("description") as any as string;
  const content = data.get("content") as any as string;

  // await initW3Client();
  // const client = await create();
  const client = new Web3Storage({
    token: process.env.WEB3STORAGE_TOKEN as string,
  });
  const cid = await client.put([image]);

  const httpsLink = `https://${cid.toString()}.ipfs.w3s.link/${image.name}`;
  const blog = await prisma.blog.create({
    data: { key, image: httpsLink, title, description, content },
  });
  return NextResponse.json(blog);
}

// type DeleteRequestBody = { postId: number };
// export async function DELETE(req: NextRequest) {
//   const session = await getServerSession(authOptions);
//   if (!session) {
//     return new Response("", { status: 401 });
//   }
//   const { postId } = (await req.json()) as DeleteRequestBody;
//   const post = await prisma.posts.findUnique({ where: { id: postId } });
//   if (session.user.id !== post?.userId) {
//     return new Response("", { status: 401 });
//   }

//   await prisma.posts.delete({ where: { id: postId } });

//   return NextResponse.json(post);
// }

// type PutRequestBody = { media: string; description: string; postId: number };
// export async function PUT(req: NextRequest) {
//   const session = await getServerSession(authOptions);
//   if (!session) {
//     return new Response("", { status: 401 });
//   }
//   const { media, description, postId } = (await req.json()) as PutRequestBody;
//   const post = await prisma.posts.findUnique({ where: { id: postId } });
//   if (session.user.id !== post?.userId) {
//     return new Response("", { status: 401 });
//   }
//   const newPost = await prisma.posts.update({
//     where: { id: postId },
//     data: { media, description },
//   });
//   return NextResponse.json(newPost);
// }
