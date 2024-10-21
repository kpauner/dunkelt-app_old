import Heading from "@/components/layout/heading";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  NextSlide,
  PreviousSlide,
} from "@/components/ui/carousel";
import { Product } from "@/types/marketplace";
import Image from "next/image";

type MarketplaceCarouselProps = {
  title?: string;
  products: Product[];
};

export default function MarketplaceCarousel({
  title,
  products,
}: MarketplaceCarouselProps) {
  return (
    <div className="w-full">
      <Carousel className="relative w-full">
        <div className=" flex space-x-2 z-10 justify-between items-center pb-4">
          {title && <h2 className="text-md font-bold uppercase">{title}</h2>}
          <div className="flex space-x-2">
            <PreviousSlide />
            <NextSlide />
          </div>
        </div>

        <CarouselContent className="-ml-5 ">
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className="pl-5 md:basis-1/4 lg:basis-1/5 "
            >
              <div className="">
                <Card className="aspect-square relative overflow-hidden -z-20">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={500}
                    height={500}
                    className="object-cover absolute inset-0 -z-10"
                  />
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-2xl font-semibold text-center">
                      <Heading as="h3" size="xs" className="uppercase pt-2">
                        {product.name}
                      </Heading>
                      {product.price && (
                        <span className="text-sm font-semibold">
                          {product.price}
                        </span>
                      )}
                    </span>
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
