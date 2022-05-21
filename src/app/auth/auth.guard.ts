import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot} from "@angular/router";
import { Store } from '@ngrx/store';

import { AuthService } from "./auth.service";
import * as fromRoot from '../app.reducer';

@Injectable()
export class AuthGuard implements  CanLoad {
  constructor(
    private store: Store<fromRoot.State>,
    private router: Router
    ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.store.select(fromRoot.getIsAuth);
  }

  canLoad(route: Route): any {
    return this.store.select(fromRoot.getIsAuth);
  }
}
