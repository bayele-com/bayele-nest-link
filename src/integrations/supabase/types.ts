export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          role: string | null
          updated_at: string
          whatsapp: string | null
        }
        Insert: {
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
          phone?: string | null
          role?: string | null
          updated_at?: string
          whatsapp?: string | null
        }
        Update: {
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          role?: string | null
          updated_at?: string
          whatsapp?: string | null
        }
        Relationships: []
      }
      properties: {
        Row: {
          amenities: string[] | null
          area: number | null
          bathrooms: number
          bedrooms: number
          city: Database["public"]["Enums"]["city"]
          created_at: string | null
          description: string
          id: string
          images: string[] | null
          is_featured: boolean | null
          location: string
          management_type: Database["public"]["Enums"]["management_type"]
          owner_id: string
          phone: string | null
          price: number
          rejection_reason: string | null
          status: Database["public"]["Enums"]["property_status"] | null
          title: string
          type: Database["public"]["Enums"]["property_type"]
          updated_at: string | null
          whatsapp: string | null
        }
        Insert: {
          amenities?: string[] | null
          area?: number | null
          bathrooms: number
          bedrooms: number
          city: Database["public"]["Enums"]["city"]
          created_at?: string | null
          description: string
          id?: string
          images?: string[] | null
          is_featured?: boolean | null
          location: string
          management_type: Database["public"]["Enums"]["management_type"]
          owner_id: string
          phone?: string | null
          price: number
          rejection_reason?: string | null
          status?: Database["public"]["Enums"]["property_status"] | null
          title: string
          type: Database["public"]["Enums"]["property_type"]
          updated_at?: string | null
          whatsapp?: string | null
        }
        Update: {
          amenities?: string[] | null
          area?: number | null
          bathrooms?: number
          bedrooms?: number
          city?: Database["public"]["Enums"]["city"]
          created_at?: string | null
          description?: string
          id?: string
          images?: string[] | null
          is_featured?: boolean | null
          location?: string
          management_type?: Database["public"]["Enums"]["management_type"]
          owner_id?: string
          phone?: string | null
          price?: number
          rejection_reason?: string | null
          status?: Database["public"]["Enums"]["property_status"] | null
          title?: string
          type?: Database["public"]["Enums"]["property_type"]
          updated_at?: string | null
          whatsapp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "properties_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      property_status_history: {
        Row: {
          changed_by: string | null
          created_at: string | null
          id: string
          new_status: Database["public"]["Enums"]["property_status"] | null
          previous_status: Database["public"]["Enums"]["property_status"] | null
          property_id: string | null
          reason: string | null
        }
        Insert: {
          changed_by?: string | null
          created_at?: string | null
          id?: string
          new_status?: Database["public"]["Enums"]["property_status"] | null
          previous_status?:
            | Database["public"]["Enums"]["property_status"]
            | null
          property_id?: string | null
          reason?: string | null
        }
        Update: {
          changed_by?: string | null
          created_at?: string | null
          id?: string
          new_status?: Database["public"]["Enums"]["property_status"] | null
          previous_status?:
            | Database["public"]["Enums"]["property_status"]
            | null
          property_id?: string | null
          reason?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "property_status_history_changed_by_fkey"
            columns: ["changed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "property_status_history_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: {
          user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      city: "yaounde" | "douala"
      management_type: "self" | "bayele"
      property_status:
        | "available"
        | "occupied"
        | "maintenance"
        | "rejected"
        | "pending"
      property_type: "house" | "apartment" | "studio" | "furnished"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
