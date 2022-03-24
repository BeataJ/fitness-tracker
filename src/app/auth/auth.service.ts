import { AuthData } from "./auth-data.model";
import { User } from "./user.model";

export class AuthService {
  private user: User | undefined;

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    }
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString(),
    };
  }

  logout() {
    this.user = undefined;
  }

  getUser(){
    return { ...this.user }
  }

  isAuth() {
    return this.user != null
  }

}
