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
import { Avatar } from "@/components/ui/avatar";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { getBaseUrl } from "@/lib/utils";
import { useLocale } from "next-intl";
import Icons from "@/components/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Heading from "./layout/heading";

type UserDropdownProps = {
  session?: Session | null;
};

export default function UserDropdown({ session }: UserDropdownProps) {
  const locale = useLocale();
  const router = useRouter();

  return (
    <>
      {session ? (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar
                variant="rounded"
                src={session?.user?.image || undefined}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" sideOffset={10} className="w-72">
              <DropdownMenuLabel className="space-y-1">
                <Heading as="h6" size="xs" className="text-accent-foreground">
                  {session?.user?.name}
                </Heading>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownItem
                label="Characters"
                icon={
                  <Icons.characters className="size-5 text-primary-foreground" />
                }
                onClick={() => router.push(`/${locale}/characters`)}
                className="flex items-center gap-4"
              />
              {/* <DropdownItem
                label="Mysteries"
                icon={
                  <Icons.mystery className="size-5 text-primary-foreground" />
                }
                onClick={() => router.push(`/${locale}/mysteries`)}
                className="flex items-center gap-4"
              /> */}

              <DropdownMenuItem
                onClick={() => router.push(`/${locale}/settings`)}
                className="flex items-center gap-4"
              >
                <Icons.settings className="size-5 text-primary-foreground" />{" "}
                Settings
              </DropdownMenuItem>

              <DropdownItem
                label="Feedback"
                icon={
                  <Icons.feedback className="size-5 text-primary-foreground" />
                }
                onClick={() => router.push(`${locale}/dashboard`)}
                className="flex items-center gap-4"
              />

              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="flex items-center gap-4"
                onClick={() => {
                  signOut({
                    callbackUrl: getBaseUrl(`/${locale}`),
                  });
                }}
              >
                <Icons.signout className="size-5 text-red-500" /> Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <>
          <Button
            onClick={() => {
              router.push(`/${locale}/sign-in`);
            }}
            size="icon"
            variant="outline"
            className=" "
          >
            <Icons.signin className="size-5 text-primary-foreground" />
          </Button>
        </>
      )}
    </>
  );
}

type DropdownItemProps = {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  className?: string;
};

function DropdownItem({ label, icon, onClick, className }: DropdownItemProps) {
  return (
    <>
      <DropdownMenuItem onClick={onClick} className={className}>
        {icon} {label}
      </DropdownMenuItem>
    </>
  );
}
