import AuthForm from "@/components/auth/auth-form";
import Icons from "@/components/icons";
import Heading from "@/components/layout/heading";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function SignInPage() {
  return (
    <>
      <Link href="/" className="absolute top-10 left-10">
        <Icons.leftarrow className="size-6 text-accent-foreground hover:scale-110" />
      </Link>
      <div className="flex items-center justify-center pb-12">
        <Icons.logooutline className="w-12 text-accent-foreground" />
      </div>
      <Card className="max-w-sm p-10">
        <div className="flex h-full items-center justify-center">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="flex gap-2 items-center flex-col">
              {/* <Icons.logooutline className="w-12 text-accent-foreground" /> */}

              <Heading as="h1" size="sm" className="">
                Login
              </Heading>

              <p className="text-balance text-muted-foreground text-center w-full">
                Continue with one of the providers below
              </p>
            </div>
            <AuthForm />
            <Separator />
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
    </>
  );
}
