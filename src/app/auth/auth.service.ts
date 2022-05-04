import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { MatSnackBar } from '@angular/material/snack-bar';
import { UIService } from '../shared/ui.service';

import { AuthData } from "./auth-data.model";
import { User } from "./user.model";
import { TrainingService } from "../training/training.service";




@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authChange = new Subject<boolean>()
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private afaAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private snackbar: MatSnackBar,
    private uiService: UIService
    ) {}

    initAuthListener() {
      this.afaAuth.authState.subscribe(user => {
        if(user) {
          this.isAuthenticated = true;
          this.authChange.next(true);
          this.router.navigate(['/training']);
        } else {
          this.trainingService.cancelSubscription();
          this.authChange.next(false);
          this.router.navigate(['/login']);
          this.isAuthenticated = false;
        }
      })
    }

  registerUser(authData: AuthData) {
    this.uiService.logingStateChanged.next(true);
    this.afaAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.uiService.logingStateChanged.next(false);
    }).catch((error) => {
      this.uiService.logingStateChanged.next(false);
      this.uiService.showSnackbar(error.message, null, 3000)

    })

  }

  login(authData: AuthData) {
    this.uiService.logingStateChanged.next(true);
    this.afaAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
      this.uiService.logingStateChanged.next(false)

    }).catch(error => {
      this.uiService.logingStateChanged.next(false);
      this.uiService.showSnackbar(error.message, null, 3000);
    })

  }

  logout() {
    this.afaAuth.signOut()
  }

  isAuth() {
    return this.isAuthenticated;
  }


}


function action(_message: any, _action: any) {
  throw new Error("Function not implemented.");
}

