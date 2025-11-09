export interface ProfileModel {
  id: string;
  last_login: string | null;
  username: string;
  full_name: string;
  is_staff: boolean;
  is_superuser: boolean;
  date_joined: string; // ISO datetime string
}
