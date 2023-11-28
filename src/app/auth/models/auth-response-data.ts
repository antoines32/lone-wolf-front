import { User } from "../../users/models/user";

export interface AuthResponseData {
  access_token: string,
  authenticated_user: User;
}