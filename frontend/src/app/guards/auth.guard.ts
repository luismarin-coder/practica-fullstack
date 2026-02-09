import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    // Verificamos si existe la "bandera" en el navegador
    if (localStorage.getItem('sesionIniciada') === 'true') {
      return true; //Sesion iniciada
    } else {
      this.router.navigate(['/login']); // Regreso al login
      return false;
    }
  }
}