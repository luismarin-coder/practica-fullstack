import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProductosComponent } from './components/lista-productos/lista-productos.component';
import { RegistrarProductoComponent } from './components/registrar-producto/registrar-producto.component';

const routes: Routes = [
  { path: 'productos', component: ListaProductosComponent },
  { path: 'registrar', component: RegistrarProductoComponent },
  { path: 'editar/:id', component: RegistrarProductoComponent },
  { path: '', redirectTo: 'productos', pathMatch: 'full' } // Redirige a la lista al entrar
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }