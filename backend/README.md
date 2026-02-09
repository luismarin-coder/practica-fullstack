# 📦 Sistema de Inventario - Backend (Spring Boot)

API RESTful desarrollada con Spring Boot para la gestión de inventario de productos. Incluye operaciones CRUD, manejo de estados (soft-delete) y ajustes de stock con validaciones.

## 🛠️ Requisitos Previos
* **Java:** JDK 17.
* **Maven:** 3.8.9.
* **Base de Datos:** MySQL 8.

## ⚙️ Configuración de la Base de Datos
Antes de ejecutar, asegúrate de tener una base de datos creada en MySQL y actualiza el archivo `src/main/resources/application.properties` si tus credenciales son diferentes:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/inventario_db?serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=root
spring.jpa.hibernate.ddl-auto=update