import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../services/token.service';


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private tokenService: TokenService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkLogin(state.url);
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.checkLogin(state.url);
  }

  private checkLogin(url: string): boolean {
    const isLogged = this.tokenService.isLogged();

    if (isLogged && url === '/login') {
      // Si ya está autenticado y está intentando acceder a /login, redirigir a /inicio
      this.router.navigate(['/inicio']);
      return false;
    } else if (!isLogged && url !== '/login') {
      // Si no está autenticado y está intentando acceder a una ruta que no es /login, redirigir a /login
      this.router.navigate(['/login']);
      return false;
    }

    // En cualquier otro caso, permitir el acceso
    return true;
  }

}
