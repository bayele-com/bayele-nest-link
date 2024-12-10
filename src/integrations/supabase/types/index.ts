import { Profile, ProfileInsert, ProfileUpdate } from './profiles';
import { Property, PropertyInsert, PropertyUpdate } from './properties';
import { City, ManagementType, PropertyStatus, PropertyType } from './enums';

export * from './enums';
export * from './profiles';
export * from './properties';

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