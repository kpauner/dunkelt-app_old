import React from "react";
import Bento from "../layout/bento";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("home");
  return (
    <section className="relative w-full h-[80vh]  bg-red-400 bg-cover bg-center bg-[url('/horror-bg.jpg')] dark:bg-[url('/images/hero-papers_0.png')]">
      <div className="max-w-screen-xl mx-auto bg-amber-300 h-full flex justify-center items-center">
        <Bento data={t.raw("bento")} />
      </div>
    </section>
  );
}
