import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanLoad, Route, Router, RouterStateSnapshot} from "@angular/router";
import { Store } from '@ngrx/store';

import * as fromRoot from '../app.reducer';
import { take } from "rxjs";

@Injectable()
export class AuthGuard implements  CanLoad {
  constructor(
    private store: Store<fromRoot.State>,
    private router: Router
    ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.store.select(fromRoot.getIsAuth).pipe(take(1));
  }

  canLoad(route: Route): any {
    return this.store.select(fromRoot.getIsAuth).pipe(take(1));
  }
}
