package com.practica.backend.controller;

import com.practica.backend.model.Producto;
import com.practica.backend.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/productos")
@CrossOrigin(origins = "http://localhost:4200") //Angular
public class ProductoController {

    @Autowired
    private ProductoService productoService;

    // 1. LISTAR CON PAGINACIÓN (GET /productos)
    @GetMapping
    public Page<Producto> listarProductos(@PageableDefault(size = 10) Pageable pageable) {
        return productoService.listarProductos(pageable);
    }

    // 2. OBTENER POR ID (GET /productos/{id})
    @GetMapping("/{id}")
    public ResponseEntity<Producto> obtenerPorId(@PathVariable Long id) {
        Optional<Producto> producto = productoService.buscarPorId(id);
        return producto.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 3. CREAR PRODUCTO (POST /productos)
    @PostMapping
    public ResponseEntity<Producto> crearProducto(@Valid @RequestBody Producto producto) {
        try {
            Producto nuevoProducto = productoService.guardarProducto(producto);
            return new ResponseEntity<>(nuevoProducto, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            // Si el nombre ya existe, devuelve error 400
            return ResponseEntity.badRequest().build();
        }
    }

    // 4. ACTUALIZAR PRODUCTO (PUT /productos/{id})
    @PutMapping("/{id}")
    public ResponseEntity<Producto> actualizarProducto(@PathVariable Long id, @Valid @RequestBody Producto producto) {
        try {
            Producto actualizado = productoService.actualizarProducto(id, producto);
            return ResponseEntity.ok(actualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // 5. ACTIVAR / DESACTIVAR (PATCH /productos/{id}/activar)
    @PatchMapping("/{id}/activar")
    public ResponseEntity<Void> cambiarEstado(@PathVariable Long id) {
        try {
            productoService.cambiarEstado(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}