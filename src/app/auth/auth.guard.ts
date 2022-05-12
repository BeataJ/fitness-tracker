import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot} from "@angular/router";

import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements  CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
  //   if (this.authService.isAuth()) {
  //     return true;
  //   } else {
  //     this.router.navigate(['/login']);
  //   }
  // }

  canLoad(route: Route): any {
    if (this.authService.isAuth()) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
  }
}
