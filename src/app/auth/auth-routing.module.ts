import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({

})
export class AuthRoutingModule {}
