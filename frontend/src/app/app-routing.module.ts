import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProductosComponent } from './components/lista-productos/lista-productos.component';
import { RegistrarProductoComponent } from './components/registrar-producto/registrar-producto.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { AjustarInventarioComponent } from './components/ajustar-inventario/ajustar-inventario.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'productos', component: ListaProductosComponent, canActivate: [AuthGuard] },
  { path: 'registrar', component: RegistrarProductoComponent, canActivate: [AuthGuard] },
  { path: 'editar/:id', component: RegistrarProductoComponent, canActivate: [AuthGuard] },
  { path: 'ajustar/:id', component: AjustarInventarioComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'productos', pathMatch: 'full' }, // Redirige a la lista al entrar

  // Redirección inicial: Ahora va al Login primero
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }