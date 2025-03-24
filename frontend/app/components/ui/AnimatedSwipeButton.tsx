"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { TextAnimate } from "@/components/magicui/text-animate";
import { motion } from "framer-motion";

interface SwipeButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  firstText: string;
  secondText: string;
  className?: string;
  firstClass?: string;
  secondClass?: string;
}

export default function SwipeButton({
  className = "",
  secondText = "Get access",
  firstText = "Get access",
  firstClass = "bg-orange-500 text-white",
  secondClass = "bg-black text-white",
  ...props
}: SwipeButtonProps) {
  const common = "block px-4 py-2 text-2xl duration-300 ease-in-out";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.8 }}>
      <button
        {...props}
        className={cn(
          "group relative min-w-fit overflow-hidden rounded-md",
          className
        )}>
        <span
          className={cn(
            "absolute inset-0 translate-y-full group-hover:translate-y-0",
            common,
            secondClass
          )}>
          <TextAnimate animation="fadeIn" by="line" as="span" delay={0.3}>
            {secondText}
          </TextAnimate>
        </span>
        <span
          className={cn("group-hover:-translate-y-full", common, firstClass)}>
          <TextAnimate animation="fadeIn" by="line" as="span" delay={0.5}>
            {firstText}
          </TextAnimate>
        </span>
      </button>
    </motion.div>
  );
}
