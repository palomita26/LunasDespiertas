"use client";

import dynamic from "next/dynamic";
import type { OutputData } from "@editorjs/editorjs";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const MarkdownEditor = dynamic(() => import("../components/MarkdownEditor"), {
  ssr: false,
});

type Inputs = {
  key: string;
  title: string;
  image: File[];
  description: string;
};

export default function Admin() {
  const [content, setContent] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  console.log({ content }, JSON.stringify(content));
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const inputs = watch();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (isLoading) {
      return;
    }
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.set("key", data.key);
      formData.set("title", data.title);
      formData.set("description", data.description);
      formData.set("image", data.image[0]);
      formData.set("content", JSON.stringify(content));

      const response = await fetch("/api/blog", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast.success("Your blog is uploaded");
        reset();
      } else if (response.status === 401) {
        throw new Error("You must be signed in to create a blog");
      } else {
        throw new Error("Blog was not uploaded");
      }
    } catch (e: any) {
      console.error(e);
      toast.error(e.message ?? "Oops something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <p className="text-center">Admin Page</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 text-black"
      >
        <input
          className="rounded-sm p-2"
          placeholder="key"
          {...register("key", { required: true })}
        />
        {errors.description && (
          <span className="text-white">This field is required</span>
        )}

        <input
          className="rounded-sm p-2"
          placeholder="title"
          {...register("title", { required: true })}
        />
        {errors.description && (
          <span className="text-white">This field is required</span>
        )}

        <input
          className="rounded-sm p-2"
          placeholder="description"
          {...register("description", { required: true })}
        />
        {errors.description && (
          <span className="text-white">This field is required</span>
        )}

        <label
          htmlFor="file-upload"
          className="custom-file-upload text-white cursor-pointer bg-gray-400 hove:bg-gray-300 text-center py-1 px-3 rounded-full w-fit mx-auto mt-3"
        >
          Choose File
        </label>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          placeholder="media"
          {...register("image", {
            required: true,
          })}
        />
        {errors.image && (
          <span className="text-white">This field is required</span>
        )}

        {inputs.image?.length ? (
          <div className="text-black w-full bg-white p-1.5 rounded-sm">
            {inputs.image[0].name}
          </div>
        ) : null}

        <button className="p-1 rounded-sm text-white bg-gray-600 hover:bg-gray-500">
          {isLoading ? "Loading . . ." : "Submit"}
        </button>
      </form>
      {/* <Editor
        data={content}
        onChange={setContent}
        holder="editorjs-container"
      /> */}
      <MarkdownEditor value={content} onChange={setContent} />
    </div>
  );
}
