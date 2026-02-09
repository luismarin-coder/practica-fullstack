import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-ajustar-inventario',
  templateUrl: './ajustar-inventario.component.html',
  styleUrls: ['./ajustar-inventario.component.css']
})
export class AjustarInventarioComponent implements OnInit {

  id: number = 0;
  cantidad: number = 0;
  motivo: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService
  ) { }

  ngOnInit(): void {
    // Obtenemos el ID del producto de la URL
    this.id = this.route.snapshot.params['id'];
  }

  guardarAjuste() {
    this.productoService.ajustarInventario(this.id, this.cantidad, this.motivo).subscribe(
      () => {
        alert('Inventario ajustado correctamente');
        this.router.navigate(['/productos']);
      },
      (error) => {
        console.error(error);
        alert('Error al ajustar: ' + (error.error.message || 'Datos incorrectos'));
      }
    );
  }
  
  cancelar() {
    this.router.navigate(['/productos']);
  }
}