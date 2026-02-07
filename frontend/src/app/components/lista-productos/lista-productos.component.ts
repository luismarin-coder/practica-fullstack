import { Component, OnInit } from '@angular/core';
import { Producto } from '../../model/producto';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {

  productos: Producto[] = [];

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.productoService.getProductos().subscribe(
      (data) => {
        this.productos = data.content;
        console.log('Productos cargados:', this.productos);
      },
      (error) => {
        console.error('Error al obtener productos:', error);
      }
    );
  }

  alternarEstado(producto: Producto) {
    // 1. Confirmación
    const accion = producto.activo ? 'desactivar' : 'activar';
    if(confirm(`¿Estás seguro de que quieres ${accion} el producto "${producto.nombre}"?`)) {
      
      // 2. Llamar al servicio
      this.productoService.cambiarEstado(producto.id).subscribe(
        () => {
          // 3. Recarga la lista para ver el cambio
          this.obtenerProductos(); 
        },
        (error) => {
          console.error('Error al cambiar estado:', error);
          alert('No se pudo cambiar el estado del producto.');
        }
      );
    }
  }
}