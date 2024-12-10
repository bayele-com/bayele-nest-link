export interface Profile {
  created_at: string;
  first_name: string | null;
  id: string;
  last_name: string | null;
  phone: string | null;
  role: string | null;
  updated_at: string;
  whatsapp: string | null;
}

export interface ProfileInsert extends Partial<Omit<Profile, 'id'>> {
  id: string;
}

export interface ProfileUpdate extends Partial<Profile> {}