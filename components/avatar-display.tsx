import Image from "next/image";
import React, { Fragment } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { AVATARS } from "@/constants/constants";
import { Avatar } from "./ui/avatar";
import Icons from "./icons";

type Avatar = {
  name: string;
  image: string;
};

export default function AvatarDisplay({ avatars }: { avatars: Avatar[] }) {
  return (
    <div className="flex -space-x-2 py-2">
      {avatars.map((avatar) => (
        <Fragment key={avatar.name}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar
                src={avatar.image || AVATARS.DEFAULT}
                size="sm"
                variant="circle"
                className="inline-block h-8 w-8 ring-2 ring-primary"
                alt={avatar.name}
              />

              {/* <Image
                key={avatar.name}
                src={avatar.image}
                alt={avatar.name}
                width={128}
                height={128}
                className="inline-block h-8 w-8 rounded-full ring-2 ring-primary"
              /> */}
            </TooltipTrigger>
            <TooltipContent>
              <p>{avatar.name}</p>
            </TooltipContent>
          </Tooltip>
        </Fragment>
      ))}
    </div>
  );
}
