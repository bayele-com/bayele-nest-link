export const getOptimizedImageUrl = (imageUrl: string, width: number = 800) => {
  if (!imageUrl) return '/placeholder.svg';
  
  // Handle Supabase storage URLs
  if (imageUrl.includes('storage.googleapis.com')) {
    // Already a full URL, just append optimization params
    const url = new URL(imageUrl);
    url.searchParams.set('width', width.toString());
    url.searchParams.set('quality', '80');
    return url.toString();
  }
  
  // For local development placeholder images
  if (imageUrl.startsWith('/')) {
    return imageUrl;
  }

  // Construct full Supabase storage URL if just the path is provided
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  if (!supabaseUrl) {
    console.error('VITE_SUPABASE_URL is not defined');
    return '/placeholder.svg';
  }

  const storageUrl = `${supabaseUrl}/storage/v1/object/public/property-images/${imageUrl}`;
  const url = new URL(storageUrl);
  url.searchParams.set('width', width.toString());
  url.searchParams.set('quality', '80');
  
  return url.toString();
};