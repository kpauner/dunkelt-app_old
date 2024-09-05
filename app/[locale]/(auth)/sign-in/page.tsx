import AuthForm from "@/components/auth/auth-form";
import Icons from "@/components/icons";
import Heading from "@/components/layout/heading";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function SignInPage() {
  return (
    <Card className="max-w-sm px-8 py-4">
      <div className="flex h-full items-center justify-center py-12 ">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="flex gap-2 items-center flex-col">
            <Icons.logo className="w-24 text-accent-foreground" />

            <Heading as="h1" size="sm" className="mt-8">
              Login
            </Heading>

            <p className="text-balance text-muted-foreground text-center w-full">
              Continue with one of the providers below
            </p>
          </div>
          <AuthForm />
          <div className="text-center text-sm">
            By clicking &quot;Continue with Google&quot;, you agree to our
            <Link
              target="_blank"
              href="/posts/terms"
              className="text-primary-500 cursor-pointer font-medium hover:underline"
            >
              {" "}
              Terms of Service{" "}
            </Link>
            and{" "}
            <Link
              href="/posts/privacy"
              target="_blank"
              className="text-primary-500 cursor-pointer font-medium hover:underline"
            >
              {" "}
              Privacy Policy{" "}
            </Link>
          </div>
        </div>
      </div>
      {/* <div className="hidden bg-muted lg:block">
        <Image
          src="/images/hero-papers_0.png"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover back dark:brightness-[0.2] dark:grayscale opacity-50"
        />
      </div> */}
    </Card>
  );
}
