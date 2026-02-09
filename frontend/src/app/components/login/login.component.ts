import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  usuario: string = '';
  contrasena: string = '';
  error: boolean = false;

  constructor(private router: Router) { }

  login() {
    // Simulación de login
    if (this.usuario === 'admin' && this.contrasena === '12345') {
      
      // Bandera de sesión iniciada
      localStorage.setItem('sesionIniciada', 'true');
      
      // Redirigir al inventario
      this.router.navigate(['/productos']);
    } else {
      this.error = true;
      this.contrasena = '';
    }
  }
}
