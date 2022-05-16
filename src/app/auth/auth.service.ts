import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Store } from '@ngrx/store';

import { UIService } from '../shared/ui.service';
import { AuthData } from "./auth-data.model";
import { TrainingService } from "../training/training.service";
import * as fromApp from '../app.reducer'



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
    private uiService: UIService,
    private store: Store<{ui: fromApp.State}>
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
    // this.uiService.logingStateChanged.next(true);
    this.store.dispatch({type: 'START_LOADING' })
    this.afaAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        // this.uiService.logingStateChanged.next(false);
        this.store.dispatch({ type: 'STOP_LOADING' });
    }).catch((error) => {
      // this.uiService.logingStateChanged.next(false);
      this.store.dispatch({ type: 'STOP_LOADING' });
      this.uiService.showSnackbar(error.message, null, 3000)

    })

  }

  login(authData: AuthData) {
    // this.uiService.logingStateChanged.next(true);
    this.store.dispatch({ type: 'START_LOADING' });
    this.afaAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
      // this.uiService.logingStateChanged.next(false)
        this.store.dispatch({ type: 'STOP_LOADING' });
    }).catch(error => {
      // this.uiService.logingStateChanged.next(false);
      this.store.dispatch({ type: 'STOP_LOADING' });
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

