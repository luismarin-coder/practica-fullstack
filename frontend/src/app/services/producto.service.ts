import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../model/producto'; // Importamos la interfaz que acabas de crear

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  // Conexión con el backend
  private apiUrl = 'http://localhost:8080/productos';

  constructor(private http: HttpClient) { }

  getProductos(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  
  crearProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, producto);
  }
  // 3. Cambiar estado para bajas (Activar / Desactivar)
  cambiarEstado(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/activar`, {});
  }

  // 4. Buscar por ID (Para llenar el formulario al editar)
  obtenerPorId(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

  // 5. Actualizar producto (PUT)
  actualizarProducto(id: number, producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/${id}`, producto);
  }
}