import { City, ManagementType, PropertyStatus, PropertyType } from './enums';

export interface Property {
  amenities: string[] | null;
  area: number | null;
  bathrooms: number;
  bedrooms: number;
  city: City;
  created_at: string | null;
  description: string;
  id: string;
  images: string[] | null;
  location: string;
  management_type: ManagementType;
  owner_id: string;
  phone: string | null;
  price: number;
  status: PropertyStatus | null;
  title: string;
  type: PropertyType;
  updated_at: string | null;
  whatsapp: string | null;
}

export interface PropertyInsert extends Omit<Property, 'id' | 'created_at' | 'updated_at'> {
  id?: string;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface PropertyUpdate extends Partial<Property> {}