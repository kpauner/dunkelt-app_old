import {
  Dashboard,
  DashboardContent,
  DashboardHeader,
  DashboardSidebar,
  DashboardWrapper,
} from "@/components/layout/dashboard";
import Header from "@/components/header";
import SidebarNavigation from "@/components/sidebar-navigation";
import ThemeToggle from "@/components/theme-toggle";
import { useTranslations } from "next-intl";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Heading from "@/components/layout/heading";

export default function HomePage() {
  const t = useTranslations("home");
  return (
    <>
      <div className="grid w-full gap-6 grid-cols-3 grid-rows-2 min-h-[50vh]">
        <Card className="col-span-2 row-span-2">
          <CardHeader>
            <Heading as="h1">Large Card</Heading>
            <CardDescription>Large Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Large Card Content</p>
          </CardContent>
        </Card>
        <Card className="col-span-1 row-span-1 relative  overflow-hidden">
          <CardHeader className="relative z-10">
            <Heading as="h6" size="sm" className=" text-accent-foreground ">
              Keeper quickstart
            </Heading>
            <CardDescription className=" dark:text-primary-light">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              quos.
            </CardDescription>
          </CardHeader>
          <Image
            src="/images/hero-papers_0.png"
            alt="keeper"
            width={200}
            height={100}
            className="w-full h-full absolute top-0 left-0 object-cover opacity-20"
          />
        </Card>
        <Card className="col-span-1 row-span-1 relative overflow-hidden">
          <CardHeader className="relative z-10">
            <Heading as="h6" size="sm" className=" text-accent-foreground ">
              Keeper quickstart
            </Heading>
            <CardDescription className=" dark:text-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              quos.
            </CardDescription>
          </CardHeader>
          <Image
            src="/images/hero-papers_0.png"
            alt="keeper"
            width={200}
            height={200}
            className="w-full h-full absolute top-0 left-0 object-cover opacity-20"
          />
        </Card>
      </div>
    </>
  );
}
