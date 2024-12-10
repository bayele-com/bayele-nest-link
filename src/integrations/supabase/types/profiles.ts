export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  whatsapp: string | null;
  role: string | null;
  created_at: string;
  updated_at: string;
  status?: 'active' | 'inactive';
}

export interface ProfileInsert extends Partial<Omit<Profile, 'id'>> {
  id: string;
}

export interface ProfileUpdate extends Partial<Profile> {}