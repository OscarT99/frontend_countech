import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    
    // Verificar si hay un token en el almacenamiento local o en las cookies
    const token = this.authService.getToken();

    if (token) {
      // Si hay un token, se puede realizar una verificación adicional aquí (por ejemplo, si el token ha expirado)
      if (this.authService.isValidToken(token)) {
        return true; 
      } else {
        this.router.navigate(['/auth/login']); // Redirigir al usuario al login si el token no es válido
        return false;
      }
    }

    // Si no hay token, redirigir al usuario al login
    this.router.navigate(['/auth/login']);
    return false;
  }
}
