import React from "react";
import { Card } from "@/components/ui/card";
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
import SettlingIn from "@/components/pitch/settling-in";
import Solution from "@/components/pitch/solution";

export default function Pitch() {
  return (
    <Carousel>
      <CarouselContent>
        <CarouselItem>
          <Introduction />
        </CarouselItem>
        <CarouselItem className="h-full">
          <SettlingIn />
        </CarouselItem>
        <CarouselItem className="h-full">
          <Solution />
        </CarouselItem>
      </CarouselContent>

      <Card className="flex justify-center items-center p-2 max-w-sm mx-auto mt-4 absolute bottom-0">
        <PreviousSlide />
        <NextSlide />
      </Card>
    </Carousel>
  );
}
