// Request payload
export interface LoginModel {
  username: string;
  password: string;
}

// Response payload
export interface LoginResponseModel {
  message: string;
  data: {
    id: string;
    last_login: string | null;
    username: string;
    full_name: string;
    is_staff: boolean;
    is_superuser: boolean;
    date_joined: string; // ISO datetime
  };
  access: string;  // access token (JWT)
  refresh: string; // refresh token (JWT)
}
