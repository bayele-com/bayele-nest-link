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
  const [imageLoadErrors, setImageLoadErrors] = useState<{ [key: string]: boolean }>({});

  const handleImageError = (imageUrl: string) => {
    console.error(`Failed to load image: ${imageUrl}`);
    setImageLoadErrors(prev => ({ ...prev, [imageUrl]: true }));
  };

  // If all images have failed to load, show a message
  const allImagesFailed = images.every(image => imageLoadErrors[image]);
  if (allImagesFailed) {
    return (
      <div className="w-full max-w-4xl mx-auto aspect-video bg-muted flex items-center justify-center rounded-lg">
        <p className="text-muted-foreground">No images available</p>
      </div>
    );
  }

  return (
    <Carousel className="w-full max-w-4xl mx-auto">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="aspect-video relative rounded-lg overflow-hidden bg-muted">
              <img
                src={imageLoadErrors[image] ? '/placeholder.svg' : image}
                alt={`${title} - Image ${index + 1}`}
                className="object-cover w-full h-full"
                onError={() => handleImageError(image)}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {images.length > 1 && (
        <>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </>
      )}
    </Carousel>
  );
};

export default PropertyImageCarousel;