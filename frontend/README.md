```markdown
# 💻 Sistema de Inventario - Frontend (Angular)

Interfaz de usuario desarrollada en Angular para el consumo de la API de Inventario. Permite la gestión completa de productos, ajustes de stock y control de acceso simulado.

## 🛠️ Requisitos Previos
* **Node.js:** v16.20.0.
* **NPM:** v8.19.4.
* **Angular CLI:** v11.

## 🚀 Instalación y Ejecución

1.  **Entrar al directorio:**
    ```bash
    cd frontend
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```
    *(Nota: Si hay conflictos de versiones, usar `npm install --legacy-peer-deps`)*

3.  **Ejecutar el servidor de desarrollo:**
    ```bash
    ng serve -o
    ```
    La aplicación se abrirá automáticamente en: `http://localhost:4200`

## 🔐 Credenciales de Acceso (Login Simulado)

El sistema cuenta con un Login simulado y protección de rutas (AuthGuard). Para ingresar, utilice las siguientes credenciales por defecto:

* **Usuario:** `admin`
* **Contraseña:** `12345`

## ✨ Funcionalidades Implementadas
* **Dashboard:** Listado de productos con indicadores de estado.
* **CRUD Completo:** Registro y edición de productos.
* **Baja Lógica:** Botón inteligente para activar/desactivar productos.
* **Ajuste de Inventario:** Módulo especial para sumar/restar stock justificando el motivo.
* **Seguridad:** Guard de rutas y manejo de sesión con LocalStorage.