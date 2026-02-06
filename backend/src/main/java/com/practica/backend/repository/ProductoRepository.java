package com.practica.backend.repository;

import com.practica.backend.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
    // Método extra para validar que no se repitan nombres (Regla obligatoria [cite: 103])
    boolean existsByNombre(String nombre);
}