import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

type BentoProps = {
  title: string;
  content: string;
  image: string;
};

export default function Bento({ data }: { data: BentoProps[] }) {
  if (!data || data.length === 0) {
    return null;
  }
  return (
    <div className="grid auto-rows-auto grid-cols-2 gap-6 md:grid-cols-3">
      {data.map((box, i) => (
        <div
          key={i}
          className={cn(
            "row-span-1 flex flex-col border-none shadow-sm bg-teal-400",
            i === 1 || i === 2 ? "col-span-2" : "col-span-2 md:col-span-1"
          )}
        >
          <div className="pb-2">
            <h2 className="font-bold">{box.title}</h2>
          </div>
          <div>
            <p className="text-muted-foreground">{box.content}</p>
          </div>
          <div className="mt-auto">
            <div className="relative w-full">
              <Image
                unoptimized={true}
                src={box.image}
                alt={box.title}
                width={1000}
                height={250}
                quality={100}
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
