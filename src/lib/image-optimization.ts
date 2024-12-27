export const getOptimizedImageUrl = (imageUrl: string, width: number = 800) => {
  if (!imageUrl) return '/placeholder.svg';
  
  // For local development placeholder images
  if (imageUrl.startsWith('/')) {
    return imageUrl;
  }

  // If it's already a full URL, return as is with optimization params
  if (imageUrl.startsWith('http')) {
    try {
      const url = new URL(imageUrl);
      url.searchParams.set('width', width.toString());
      url.searchParams.set('quality', '80');
      return url.toString();
    } catch (error) {
      console.error('Invalid URL:', imageUrl);
      return '/placeholder.svg';
    }
  }

  // Get Supabase URL from environment
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  if (!supabaseUrl) {
    console.error('VITE_SUPABASE_URL is not defined');
    return '/placeholder.svg';
  }

  // Construct full Supabase storage URL
  return `${supabaseUrl}/storage/v1/object/public/property-images/${imageUrl}`;
};