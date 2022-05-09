import { NgModule } from "@angular/core";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";


import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";

@NgModule({
  declarations: [SignupComponent, LoginComponent],
  imports: [
    ReactiveFormsModule,
    AngularFirestoreModule,
    SharedModule],
  exports: [],
})
export class AuthModule {}
