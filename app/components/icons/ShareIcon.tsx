"use client";
import { Share1Icon } from "@radix-ui/react-icons";
import toast from "react-hot-toast";

type Props = {
  link: string;
  classname?: string;
};

export default function ShareIcon({ link, classname = "" }: Props) {
  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}${link}`);
    toast.success("This blog link has been copied.");
  };
  return (
    <Share1Icon
      className={`${classname} hover:bg-[#E4C7A7] cursor-pointer rounded-sm w-fit`}
      width={24}
      height={24}
      onClick={handleShare}
    />
  );
}
