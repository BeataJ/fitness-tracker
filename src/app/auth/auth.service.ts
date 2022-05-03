import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private snackbar: MatSnackBar
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
    this.afaAuth.createUserWithEmailAndPassword(authData.email, authData.password).then(result => {

    }).catch((error) => {
      this.snackbar.open(error.message, 'Undo', {
        duration: 3000
      })
    })

  }

  login(authData: AuthData) {
    this.afaAuth.signInWithEmailAndPassword(authData.email, authData.password).then(result => {
      console.log(result);

    }).catch(error => {
      this.snackbar.open(error.message, 'Undo', {
        duration: 3000,
      });
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

