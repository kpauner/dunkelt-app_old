import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  NextSlide,
  PreviousSlide,
} from "@/components/ui/carousel";
import Introduction from "@/components/pitch/introduction";
import { PageLayout } from "@/components/layout/page-layout";
import Slide2 from "@/components/pitch/slide2";

export default function Pitch() {
  return (
    <Carousel>
      <CarouselContent>
        <CarouselItem>
          <Introduction />
        </CarouselItem>
        <CarouselItem className="h-full">
          <Slide2 />
        </CarouselItem>
        <CarouselItem className="h-full">
          <Introduction />
        </CarouselItem>
      </CarouselContent>

      <Card className="flex justify-center items-center p-2 max-w-sm mx-auto mt-4 absolute bottom-0">
        <PreviousSlide />
        <NextSlide />
      </Card>
    </Carousel>
  );
}
