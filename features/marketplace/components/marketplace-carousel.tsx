import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  NextSlide,
  PreviousSlide,
} from "@/components/ui/carousel";
import React from "react";

export default function MarketplaceCarousel() {
  return (
    <div className="w-full">
      <Carousel className="relative w-full">
        <div className=" flex space-x-2 z-10 justify-between items-center pb-4">
          <h2 className="text-md font-bold uppercase">Featured Products</h2>
          <div className="flex space-x-2">
            <PreviousSlide />
            <NextSlide />
          </div>
        </div>

        <CarouselContent className="-ml-5 ">
          {Array.from({ length: 10 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="pl-5 md:basis-1/4 lg:basis-1/5 "
            >
              <div className="">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-2xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
