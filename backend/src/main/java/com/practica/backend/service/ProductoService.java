package com.practica.backend.service;

import com.practica.backend.model.Producto;
import com.practica.backend.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProductoService {

    @Autowired
    private ProductoRepository productoRepository;

    // 1. Listar con paginación
    public Page<Producto> listarProductos(Pageable pageable) {
        return productoRepository.findAll(pageable);
    }

    // 2. Buscar por ID
    public Optional<Producto> buscarPorId(Long id) {
        return productoRepository.findById(id);
    }

    // 3. Guardar producto (con validación de nombre único)
    public Producto guardarProducto(Producto producto) {
        producto.setId(null);
        // Si el ID es nulo (es nuevo) y ya existe el nombre -> Error
        if (producto.getId() == null && productoRepository.existsByNombre(producto.getNombre())) {
            throw new IllegalArgumentException("El nombre del producto ya existe");
        }
        return productoRepository.save(producto);
    }

    // 4. Actualizar producto
    public Producto actualizarProducto(Long id, Producto productoDetalles) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        producto.setNombre(productoDetalles.getNombre());
        producto.setMarca(productoDetalles.getMarca());
        producto.setCategoria(productoDetalles.getCategoria());
        producto.setPrecio(productoDetalles.getPrecio());
        producto.setExistencia(productoDetalles.getExistencia());

        return productoRepository.save(producto);
    }

    // 5. Activar / Desactivar (PATCH)
    public void cambiarEstado(Long id) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        producto.setActivo(!producto.getActivo());
        productoRepository.save(producto);
    }
    // Ajustar inventario (Suma o Resta con validación)
    public Producto ajustarInventario(Long id, Integer cantidad, String motivo) {
        // Buscamos el producto
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        // Calcular el nuevo stock
        int nuevoStock = producto.getExistencia() + cantidad;

        // VALIDACIÓN: No permitir stock negativo
        if (nuevoStock < 0) {
            throw new IllegalArgumentException("El stock no puede ser negativo. Stock actual: " + producto.getExistencia());
        }

        // VALIDACIÓN: Motivo obligatorio
        if (motivo == null || motivo.trim().isEmpty()) {
            throw new IllegalArgumentException("Se requiere un motivo para el ajuste.");
        }

        // Guardamos el cambio
        System.out.println("AJUSTE REALIZADO: " + motivo + " | Producto: " + producto.getNombre() + " | Cambio: " + cantidad);

        producto.setExistencia(nuevoStock);
        return productoRepository.save(producto);
    }
}