import { supabase } from './supabase';

export const getOptimizedImageUrl = (imageUrl: string, width = 800) => {
  if (!imageUrl || imageUrl.startsWith('/')) {
    return '/placeholder.svg';
  }

  try {
    const url = new URL(imageUrl);
    // Add width parameter for CDN optimization
    url.searchParams.set('width', width.toString());
    return url.toString();
  } catch {
    console.error('Invalid image URL:', imageUrl);
    return '/placeholder.svg';
  }
};

export const validateImage = async (file: File): Promise<boolean> => {
  if (file.size > 500000) { // 500KB limit
    throw new Error('Image size should be less than 500KB');
  }

  if (!file.type.startsWith('image/')) {
    throw new Error('File must be an image');
  }

  return true;
};

export const uploadPropertyImage = async (
  file: File,
  propertyId: string
): Promise<string> => {
  await validateImage(file);
  
  const fileExt = file.name.split('.').pop();
  const fileName = `${propertyId}/${crypto.randomUUID()}.${fileExt}`;

  const { error: uploadError, data } = await supabase.storage
    .from('property-images')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (uploadError) {
    console.error('Error uploading image:', uploadError);
    throw uploadError;
  }

  const { data: { publicUrl } } = supabase.storage
    .from('property-images')
    .getPublicUrl(fileName);

  return publicUrl;
};