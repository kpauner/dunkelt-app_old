"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Session } from "next-auth";
// import { signIn, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { getBaseUrl } from "@/lib/utils";
import { useLocale } from "next-intl";
import Icons from "@/components/icons";
import Link from "next/link";
// import Heading from "./layout/heading";
import { useRouter } from "next/navigation";

// type UserDropdownProps = {
//   session: Session | null;
// };

export default function UserDropdown() {
  const locale = useLocale();
  const router = useRouter();
  const session = {
    user: {
      name: "John Doe",
      email: "john@example.com",
      image: "/images/placeholder-avatar.png",
    },
    expires: "2024-12-31",
  };

  return (
    <>
      {session ? (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="bg-gray-400 cursor-pointer">
                <AvatarImage
                  src={session?.user?.image || "/images/placeholder.png"}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72">
              <DropdownMenuLabel className="space-y-1">
                <h2 className="font-bold">{session?.user?.name}</h2>
                <div className="flex items-center gap-2">
                  <Icons.logo className="size-3 fill-violet-400" />
                  <Link
                    href={`/${locale}/${session?.user?.name}`}
                    target="_blank"
                    className="text-violet-300 text-xs"
                  >
                    sevendays.live/{session?.user?.name}
                  </Link>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => router.push(`${locale}/dashboard`)}
                className="flex items-center gap-4"
              >
                <Icons.logo className="size-5 fill-violet-400" /> Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => router.push(`${locale}/dashboard/settings`)}
                className="flex items-center gap-4"
              >
                <Icons.logo className="size-5 fill-violet-400" /> Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-4">
                <Icons.logo className="size-5 fill-violet-400" /> Feedback
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="flex items-center gap-4"
                onClick={() => {
                  // signOut({
                  //   callbackUrl: getBaseUrl(`/${locale}`),
                  // });
                }}
              >
                <Icons.logo className="size-5 fill-red-500" /> Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <>
          <Button
            onClick={() => {
              // signIn("twitch", {
              //   callbackUrl: absoluteUrl(`/${locale}/dashboard`),
              // });
            }}
            size="lg"
            className=" "
          >
            Sign in
          </Button>
        </>
      )}
    </>
  );
}
