import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState } from "react";

interface PropertyImageCarouselProps {
  images: string[];
  title: string;
}

const PropertyImageCarousel = ({ images, title }: PropertyImageCarouselProps) => {
  const [imageLoadError, setImageLoadError] = useState<{ [key: string]: boolean }>({});

  const handleImageError = (imageUrl: string) => {
    console.error(`Failed to load image: ${imageUrl}`);
    setImageLoadError(prev => ({ ...prev, [imageUrl]: true }));
  };

  return (
    <Carousel className="w-full max-w-4xl mx-auto">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="aspect-video relative rounded-lg overflow-hidden">
              <img
                src={imageLoadError[image] ? '/placeholder.svg' : image}
                alt={`${title} - Image ${index + 1}`}
                className="object-cover w-full h-full"
                onError={() => handleImageError(image)}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default PropertyImageCarousel;