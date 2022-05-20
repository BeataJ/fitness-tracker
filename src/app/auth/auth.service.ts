import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Store } from '@ngrx/store';

import { UIService } from '../shared/ui.service';
import { AuthData } from "./auth-data.model";
import { TrainingService } from "../training/training.service";
import * as fromRoot from '../app.reducer'
import * as UI from '../shared/ui.actions';
import * as AUTH from './auth.actions';


@Injectable({
  providedIn: 'root',
})
export class AuthService {


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
          this.store.dispatch(new AUTH.SetAuthenticated())
          this.router.navigate(['/training']);
        } else {
          this.trainingService.cancelSubscription();
          this.store.dispatch(new AUTH.SetUnauthenticated())
          this.router.navigate(['/login']);
        }
      })
    }

  registerUser(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading())
    this.afaAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.store.dispatch(new UI.StopLoading());
    }).catch((error) => {
      this.store.dispatch(new UI.StopLoading);
      this.uiService.showSnackbar(error.message, null, 3000)

    })

  }

  login(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading);
    this.afaAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.store.dispatch(new UI.StopLoading);
    }).catch(error => {
      this.store.dispatch(new UI.StopLoading);
      this.uiService.showSnackbar(error.message, null, 3000);
    })

  }

  logout() {
    this.afaAuth.signOut()
  }
}




