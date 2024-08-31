import Header from "@/components/marketing/header";
import Hero from "@/components/marketing/hero";
import ThemeToggle from "@/components/theme-toggle";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function HomePage() {
  const t = useTranslations("home");
  return (
    <main>
      {/* <h1>{t("title")}</h1>
      <ThemeToggle /> */}
      <Header />
      <Hero />
    </main>
  );
}
