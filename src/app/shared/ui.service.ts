import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UIService {
  logingStateChanged = new Subject<boolean>()
}
