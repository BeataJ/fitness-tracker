import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";


@Injectable({
  providedIn: 'root'
})
export class UIService {
  logingStateChanged = new Subject<boolean>()

  constructor(private snackbar: MatSnackBar) {}

  showSnackbar(message: any, action: any, duration: any) {
    this.snackbar.open(message, action, {
      duration: duration
    })
  }
}
