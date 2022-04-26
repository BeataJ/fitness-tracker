import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AngularFireAuth } from "@angular/fire/compat/auth";

import { AuthData } from "./auth-data.model";
import { User } from "./user.model";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authChange = new Subject<boolean>()
  private user: User | undefined;

  constructor(
    private router: Router,
    private afaAuth: AngularFireAuth
    ) {}

  registerUser(authData: AuthData) {
    this.afaAuth.createUserWithEmailAndPassword(authData.email, authData.password).then(result => {
      console.log(result);
      this.authSuccessfully();
    }).catch(error => {
      console.log(error)
    })

  }

  login(authData: AuthData) {
    this.afaAuth.signInWithEmailAndPassword(authData.email, authData.password).then(result => {
      console.log(result);
      this.authSuccessfully();
    }).catch(error => {
      console.log(error);
    })

  }

  logout() {
    this.user = undefined;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    return this.user != null;
  }

  private authSuccessfully() {
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }
}


