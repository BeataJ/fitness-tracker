import { Subject } from "rxjs";

export class UIService {
  logingStateChanged = new Subject<boolean>()
}
