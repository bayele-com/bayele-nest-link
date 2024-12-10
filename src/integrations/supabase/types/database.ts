import { Profile, ProfileInsert, ProfileUpdate } from './profiles';
import { Property, PropertyInsert, PropertyUpdate } from './properties';
import { City, ManagementType, PropertyStatus, PropertyType } from './enums';

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: ProfileInsert;
        Update: ProfileUpdate;
      };
      properties: {
        Row: Property;
        Insert: PropertyInsert;
        Update: PropertyUpdate;
      };
      property_status_history: {
        Row: {
          id: string;
          property_id: string | null;
          previous_status: PropertyStatus | null;
          new_status: PropertyStatus | null;
          changed_by: string | null;
          reason: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          property_id?: string | null;
          previous_status?: PropertyStatus | null;
          new_status?: PropertyStatus | null;
          changed_by?: string | null;
          reason?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          property_id?: string | null;
          previous_status?: PropertyStatus | null;
          new_status?: PropertyStatus | null;
          changed_by?: string | null;
          reason?: string | null;
          created_at?: string | null;
        };
      };
    };
    Views: Record<string, never>;
    Functions: {
      is_admin: {
        Args: { user_id: string };
        Returns: boolean;
      };
    };
    Enums: {
      city: City;
      management_type: ManagementType;
      property_status: PropertyStatus;
      property_type: PropertyType;
    };
  };
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T];