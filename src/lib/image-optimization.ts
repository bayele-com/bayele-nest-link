import { toast } from "sonner";

const MAX_IMAGE_SIZE = 500 * 1024; // 500KB
const MAX_WIDTH = 1200;
const QUALITY = 0.8;

export async function optimizeImage(file: File): Promise<File> {
  if (file.size <= MAX_IMAGE_SIZE) {
    return file;
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    img.onload = () => {
      let width = img.width;
      let height = img.height;

      if (width > MAX_WIDTH) {
        height = Math.round((height * MAX_WIDTH) / width);
        width = MAX_WIDTH;
      }

      canvas.width = width;
      canvas.height = height;

      ctx?.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Failed to optimize image'));
            return;
          }

          const optimizedFile = new File([blob], file.name, {
            type: 'image/jpeg',
            lastModified: Date.now(),
          });

          if (optimizedFile.size > MAX_IMAGE_SIZE) {
            toast.error("Image is too large even after optimization");
            reject(new Error('Image too large even after optimization'));
            return;
          }

          resolve(optimizedFile);
        },
        'image/jpeg',
        QUALITY
      );
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    img.src = URL.createObjectURL(file);
  });
}

export function getOptimizedImageUrl(url: string, width: number): string {
  // If it's already a data URL or optimized URL, return as is
  if (url.startsWith('data:') || url.includes('?optimize=true')) {
    return url;
  }

  // Add optimization parameters
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}optimize=true&width=${width}`;
}