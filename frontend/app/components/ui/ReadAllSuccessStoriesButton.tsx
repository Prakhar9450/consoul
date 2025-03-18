//

import { ArrowTopRightIcon } from "@radix-ui/react-icons";

interface ButtonTitleProps {
  /**
   * Button title
   */
  text: string;
}

export default function ReadAllSuccessStoriesButton({ text = "Open Link" }: ButtonTitleProps) {
  return (
    <button className="text-md group flex items-center justify-center gap-1 rounded-md px-6 py-3 text-xl  hover:cursor-pointer text-[#6438C3] mt-2 w-full pl-10 ">
      <span>{text}</span> 
      <ArrowTopRightIcon
        height={20}
        width={20}
        className="opacity-75 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:scale-110 "
      />
    </button>
  );
}
