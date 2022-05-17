import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

import { UIService } from 'src/app/shared/ui.service';
import { AuthService } from '../auth.service';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  maxDate;
  isLoading$ = new Observable<boolean>();
  private loadingSubs: Subscription = new Subscription;

  constructor(
    private authService: AuthService,
    private uiService: UIService,
    private store: Store<fromRoot.State>
    ) {
    this.maxDate = new Date;
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading)
    // this.loadingSubs = this.uiService.logingStateChanged.subscribe(isloading => {
    //   this.isLoading = isloading;
    // })
  }

  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    })
  }

  // ngOnDestroy(): void {
  //   if(this.loadingSubs){
  //     this.loadingSubs.unsubscribe();
  //   }

  // }
}
