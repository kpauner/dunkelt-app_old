"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Icons from "@/components/icons";
import { Separator } from "@/components/ui/separator";
import { useLocale } from "next-intl";
import { getBaseUrl } from "@/lib/utils";

export default function AuthForm() {
  const locale = useLocale();

  return (
    <div className="grid gap-4">
      <Button
        onClick={() => {
          signIn("google", {
            callbackUrl: getBaseUrl(`/${locale}/characters`),
          });
        }}
        size="lg"
        className="flex w-full gap-4"
      >
        Continue with Google
        <Icons.google className="size-3 fill-secondary-100" />
      </Button>
    </div>
  );
}
