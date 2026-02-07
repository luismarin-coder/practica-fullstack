import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; // Importamos ActivatedRoute
import { Producto } from '../../model/producto';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-registrar-producto',
  templateUrl: './registrar-producto.component.html',
  styleUrls: ['./registrar-producto.component.css']
})
export class RegistrarProductoComponent implements OnInit {

  producto: Producto = {
    id: 0,
    nombre: '',
    marca: '',
    categoria: '',
    precio: 0,
    existencia: 0,
    activo: true
  };

  esEdicion: boolean = false; // Bandera para saber si estamos editando

  constructor(
    private productoService: ProductoService,
    private router: Router,
    private route: ActivatedRoute // Inyectamos para leer la URL
  ) { }

  ngOnInit(): void {
    // Leemos el ID de la URL (si existe)
    const id = this.route.snapshot.params['id'];
    
    if (id) {
      this.esEdicion = true;
      this.cargarProducto(id);
    }
  }

  cargarProducto(id: number) {
    this.productoService.obtenerPorId(id).subscribe(
      (dato) => {
        this.producto = dato; // Para rellenar el formulario automáticamente
      },
      (error) => console.error(error)
    );
  }

  guardarProducto() {
    if (this.esEdicion) {
      // MODO ACTUALIZAR
      this.productoService.actualizarProducto(this.producto.id, this.producto).subscribe(
        () => this.goToProductList(),
        (error) => alert("Error al actualizar")
      );
    } else {
      // MODO CREAR
      this.productoService.crearProducto(this.producto).subscribe(
        () => this.goToProductList(),
        (error) => alert("Error al registrar")
      );
    }
  }

  goToProductList() {
    this.router.navigate(['/productos']);
  }
  
  onSubmit() {
    this.guardarProducto();
  }
}