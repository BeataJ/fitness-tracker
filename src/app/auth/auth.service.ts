import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Store } from '@ngrx/store';

import { UIService } from '../shared/ui.service';
import { AuthData } from "./auth-data.model";
import { TrainingService } from "../training/training.service";
import * as fromRoot from '../app.reducer'
import * as UI from '../shared/ui.actions';


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
    private store: Store<fromRoot.State>
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
    this.store.dispatch(new UI.StartLoading())
    this.afaAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        // this.uiService.logingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading());
    }).catch((error) => {
      // this.uiService.logingStateChanged.next(false);
      this.store.dispatch(new UI.StopLoading);
      this.uiService.showSnackbar(error.message, null, 3000)

    })

  }

  login(authData: AuthData) {
    // this.uiService.logingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading);
    this.afaAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
      // this.uiService.logingStateChanged.next(false)
        this.store.dispatch(new UI.StopLoading);
    }).catch(error => {
      // this.uiService.logingStateChanged.next(false);
      this.store.dispatch(new UI.StopLoading);
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




