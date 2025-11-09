export interface SignupModel {
  username: string;
  full_name: string;
  password: string;
  confirm_password: string;
}

export interface SignupResponseModel {
  username: string;
  full_name: string;
}