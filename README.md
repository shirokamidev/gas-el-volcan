# 🌋 Gas El Volcán - Plataforma E-Commerce y Backoffice

![](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) ![](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) ![](https://img.shields.io/badge/JavaScript_ES6+-F7DF1E?style=flat&logo=javascript&logoColor=black) ![](https://img.shields.io/badge/LocalStorage-Persistencia-0052CC?style=flat&logo=databricks&logoColor=white) ![](https://img.shields.io/badge/Diseño-Mobile_First-339933?style=flat) ![](https://img.shields.io/badge/Arquitectura-Modular-8A2BE2?style=flat) ![](https://img.shields.io/badge/Dependencias-Zero-red?style=flat) ![](https://img.shields.io/badge/VSCode-IDE-007ACC?style=flat&logo=visualstudiocode&logoColor=white) ![](https://img.shields.io/badge/GitHub-Version_Control-181717?style=flat&logo=github&logoColor=white) ![](https://img.shields.io/badge/Grupo-3-8A2BE2?style=flat)

> **Gas El Volcán** es una solución digital diseñada para modernizar la distribución de gas licuado a domicilio. El sistema reduce la dependencia de las líneas telefónicas y los registros en papel, ofreciendo una **Sucursal Virtual** para que los clientes gestionen sus pedidos, junto con un **Panel de Administración (Backoffice)** para el control de inventario, roles de usuario y métricas corporativas.

---

## 📑 Tabla de Contenidos

* 👥 [Equipo de Desarrollo (Grupo 3)](#equipo)
* 🎯 [Contexto del Negocio y Solución](#contexto)
* 🏗️ [Arquitectura de Archivos y Mapeo de Módulos](#arquitectura)
* 🎨 [Ingeniería CSS, SMACSS y UI/UX](#css)
* 🧠 [Lógica JavaScript, Clean Code y Persistencia](#javascript)
* 🛒 [Módulo Cliente: Tienda y Carrito](#cliente)
* 🔐 [Módulo Autenticación y Seguridad](#seguridad)
* ⚙️ [Módulo Administrador: Backoffice y CRUD](#administrador)
* 🚀 [Guía de Ejecución Local](#ejecucion)

---

<a id="equipo"></a>
## 👥 Equipo de Desarrollo (Grupo 3)

Este sistema ha sido diseñado, estructurado y desarrollado colaborativamente por:

- **Benjamín Aliste** - [@shirokamidev](https://github.com/shirokamidev)
- **Jesús Amaya** - [@Jesusamayap](https://github.com/Jesusamayap)
- **Benjamín Mora** - [@nNoriega-K](https://github.com/nNoriega-K)

### 🌿 Metodología de Trabajo y Control de Versiones

La organización del código fuente se realizó mediante control de versiones en **GitHub**, utilizando una estructura de trabajo colaborativa para mantener un historial ordenado y trazable:

* **Estrategia de Ramas (GitFlow):** Se dividió el flujo de trabajo mediante ramas independientes para cada funcionalidad o corrección. El código no se subió directamente a `main`, manteniendo esta rama para la versión estable. El desarrollo se realizó principalmente en `develop`, mientras que las nuevas funcionalidades, correcciones y vistas se trabajaron en ramas temporales como `feature/`, `bugfix/` y `release/`. Una vez finalizado el trabajo, las ramas de soporte fueron fusionadas y eliminadas para mantener el repositorio ordenado.
* **Conventional Commits:** Para mantener un historial de versiones claro, se utilizó la nomenclatura `tipo(alcance): mensaje`. Se emplearon prefijos como `feat` para nuevas funcionalidades o vistas, `fix` para correcciones, `style` para cambios de formato visual, `refactor` para reorganización del código y `chore` para tareas de mantenimiento. También se utilizó el alcance o *scope* para identificar el módulo intervenido, por ejemplo `feat(carrito): ...` o `fix(login): ...`.
* **Buenas Prácticas de Repositorio:** Se configuró el archivo `.gitignore` para excluir configuraciones locales del entorno de desarrollo, como la carpeta `.vscode/`, evitando conflictos entre los integrantes del equipo. Las versiones entregables también se identificaron mediante **Tags**, por ejemplo `v1.0.0`, facilitando su descarga y organización.

---

<a id="contexto"></a>
## 🎯 Contexto del Negocio y Solución

**Distribuidora de Gas El Volcán** opera estratégicamente en la **Región de Ñuble** (Chillán, Bulnes, El Carmen, Pinto, San Ignacio, Quillón) y la **Región del Biobío** (Concepción, Talcahuano, Los Ángeles). La empresa enfrentaba distintos desafíos operativos, como la saturación de operadoras telefónicas, la pérdida de trazabilidad en pedidos físicos, desajustes en el stock de cilindros y la falta de comunicación en tiempo real con sus clientes.

Para responder a estas necesidades, el proyecto se dividió en dos ecosistemas:

1. **Tienda Pública (B2C):** Un e-commerce donde el cliente puede explorar productos, consultar su cobertura geográfica, acceder a contenido de la comunidad y realizar pedidos digitales.
2. **Backoffice Administrativo:** Un panel de control privado que permite a la administración gestionar el catálogo de productos, administrar usuarios con diferentes niveles de acceso y visualizar métricas de funcionamiento.

---

<a id="arquitectura"></a>
## 🏗️ Arquitectura de Archivos y Mapeo de Módulos

Para mantener el código organizado y facilitar su mantenimiento, la plataforma se construyó bajo una **arquitectura modular en Vanilla JavaScript**, separando las responsabilidades según cada área del sistema. El directorio de recursos estáticos (`assets/`) se estructuró de la siguiente manera:

* **`assets/img/`**: Iconografía vectorial (SVG) y fotografías organizadas en subdirectorios (`/blogs`, `/contacto`, `/equipo`, `/legales`, `/nosotros`, `/pagos`, `/productos`, `/sucursales`) para mantener los recursos ordenados.
* **`assets/css/`**: Hojas de estilo separadas por vista y *layouts* generales.
* **`assets/js/`**: Lógica de negocio organizada mediante módulos.

A continuación se detalla el ecosistema completo del proyecto:

### 1. Núcleo Lógico, Datos y Estilos Globales

Archivos transversales que inicializan el sistema, definen las reglas base y proporcionan persistencia en toda la plataforma.

| Archivo | Tipo | Responsabilidad Principal |
| :--- | :---: | :--- |
| `data.js` | JS | **Datos iniciales:** Almacena los arreglos estáticos iniciales (`productosBD`, `usuariosBD`) utilizados para cargar la información base del sistema. |
| `main.js` | JS | **Núcleo del sistema:** Administra la API de `LocalStorage`, diccionarios geográficos, disponibilidad y validadores globales, como las expresiones regulares para correos. |
| `eventos.js` | JS | **Event Delegation:** Intercepta los clics a nivel de documento (`document.addEventListener`) para controlar botones dinámicos de forma centralizada. |
| `layout.css` | CSS | **Sistema de Diseño Base:** Define el reset, tipografía (*Montserrat*), variables globales (`:root`), barras de navegación y footer. |
| `admin-layout.css` | CSS | **Sistema de Diseño Backoffice:** Define variables exclusivas del administrador, estructura de la barra lateral, menús desplegables y *navbar* privada. |

### 2. Módulo de Tienda Pública (Cliente)

Vistas interactivas destinadas a la venta, captación e información para los usuarios finales.

| Vista (HTML) | Estilos (CSS) | Controladores (JS) | Descripción Funcional |
| :--- | :--- | :--- | :--- |
| `index.html` | `index.css` | `catalogo.js`, `sucursales.js` | Landing page corporativa. Contiene un hero banner, buscador central y renderizado dinámico de productos. |
| `productos.html` | `productos.css` | `catalogo.js` | Catálogo completo de ventas. Integra filtrado dinámico por categoría y barra de búsqueda en tiempo real. |
| `detalle-productos.html` | `detalle-productos.css` | *N/A (Utiliza `eventos.js`)* | Vista individual (PDP) con especificaciones técnicas detalladas y controles de cantidad de compra. |
| `carrito.html` | `carrito.css` | `carrito.js` | Flujo de checkout. Lee el estado del carrito, procesa subtotales, aplica descuentos y alerta sobre stock crítico. |
| `punto-volcan.html` | `punto-volcan.css` | `sucursales.js` | Georreferenciación interactiva. Implementa selectores dependientes (Región ➔ Comuna) y enrutamiento automatizado. |
| `nosotros.html` | `nosotros.css` | *Solo núcleo base* | Presentación de la empresa (Historia, Misión, Visión) y perfiles del equipo de desarrollo con animaciones CSS. |
| `blogs.html` | `blogs.css` | `blogs.js` | Centro de noticias y comunidad. Incorpora filtrado múltiple (Categoría + Año + Texto). |
| `detalle-blog-1/2.html` | `detalle-blogs.css` | *Solo núcleo base* | Artículos de contenido extenso estructurados para SEO y usabilidad. |
| `contacto.html` | `contacto.css` | `contacto.js` | Central de ayuda y formulario de consultas con validación estructurada y sección de acordeones (FAQ). |
| `legales.html` | `legales.css` | *Solo núcleo base* | Documentación de Términos y Condiciones, y Políticas de Privacidad. |

<a id="seguridad"></a>
### 3. Módulo de Autenticación y Seguridad

Manejo de acceso e identidades para la plataforma.

| Vista (HTML) | Estilos (CSS) | Controladores (JS) | Descripción Funcional |
| :--- | :--- | :--- | :--- |
| `login.html` | `login.css` | `auth.js` | Validación de credenciales. Realiza un ruteo condicional hacia el panel administrativo cuando se detectan los permisos correspondientes. |
| `registro.html` | `registro.css` | `auth.js` | Formulario de registro de clientes. Incluye validación de correos y comprobaciones de seguridad de contraseñas. |

---

<a id="administrador"></a>
## ⚙️ Módulo Administrador: Backoffice y CRUD

El Backoffice permite gestionar distintos elementos del sistema mediante operaciones de administración y CRUD.

| Vista (HTML) | Estilos (CSS) | Controladores (JS) | Descripción Funcional |
| :--- | :--- | :--- | :--- |
| `admin-index.html` | `admin-index.css` | `admin-metricas.js` | Dashboard administrativo. Lee la cantidad total de registros almacenados para presentar métricas de crecimiento. |
| `admin-lista-productos.html` | `admin-lista-...css` | `admin-tablas.js` | Tabla interactiva del inventario. Incorpora paginación y función de eliminación controlada. |
| `admin-lista-usuarios.html` | `admin-lista-...css` | `admin-tablas.js` | Directorio de usuarios con renderizado de datos de contacto y asignación de roles. |
| `admin-nuevo-producto.html` | `admin-nuevo-...css` | `admin-formularios.js` | Formulario de creación de productos. Autogenera un ID secuencial y almacena el objeto en LocalStorage. |
| `admin-nuevo-usuario.html` | `admin-nuevo-...css` | `admin-formularios.js` | Panel de creación de usuarios y asignación de roles (Admin, Vendedor, Cliente). Implementa selectores geográficos anidados. |
| `admin-editar-producto.html` | `admin-editar-...css` | `admin-formularios.js` | Lectura de parámetros de URL (`?id=x`). Autocompleta los campos del formulario y permite guardar los cambios. |
| `admin-editar-usuario.html` | `admin-editar-...css` | `admin-formularios.js` | Permite actualizar la información de un usuario específico manteniendo su RUT en modo de solo lectura. |

---

<a id="css"></a>
## 🎨 Ingeniería CSS, SMACSS y UI/UX

Todo el apartado visual fue desarrollado desde cero, sin utilizar frameworks externos como Bootstrap, utilizando una organización modular de los estilos.

* **Arquitectura SMACSS (Scalable and Modular Architecture for CSS):** Los estilos se organizaron separando responsabilidades:
  * **Base & Theme:** Centralizado en `layout.css`, donde se definen variables globales, resets y reglas tipográficas.
  * **Layout:** Controladores de estructura transversal, como Navbars, Footers y Sidebars.
  * **Modules:** Archivos `.css` independientes por vista, por ejemplo `carrito.css` y `admin-tablas.css`, para encapsular los componentes.
  * **State:** Uso de clases semánticas como `.activo`, `.oculto`, `.exito` y `.error`, manipuladas por JavaScript.
* **Selectores de Clase y Uso de IDs:** Se priorizó el uso de **selectores de clase** (`.clase`) para estructurar la interfaz, favoreciendo la reutilización de estilos. Los atributos `id` (`#`) se utilizaron principalmente como identificadores únicos para eventos y manipulación del DOM desde JavaScript, por ejemplo `#form-login` y `#btn-buscar`. No se utilizaron estilos en línea.
* **Diseño Mobile First:** Se utilizaron `Media Queries` (`@media (max-width: 64rem)` y `48rem`) para adaptar la interfaz desde smartphones hasta pantallas de mayor tamaño, modificando dinámicamente las estructuras `Grid`.
* **Interactividad "No-JS" (Checkbox Hack):** Se implementaron menús hamburguesa móviles, paneles de filtros laterales y acordeones de FAQ utilizando principalmente CSS y elementos HTML como `<details>` y `<summary>`. También se utilizó el pseudo-selector `:checked` (`input[type="checkbox"]:checked ~ .elemento`) para controlar determinados estados y transiciones desde el navegador.

---

<a id="javascript"></a>
## 🧠 Lógica JavaScript, Clean Code y Persistencia

El motor interactivo se desarrolló siguiendo el principio de **Single Responsibility Principle (SRP)**, separando las responsabilidades de cada archivo JavaScript según su función dentro del sistema.

### 1. Persistencia de Datos (LocalStorage)

Ante la ausencia de un servidor backend en esta iteración, se desarrolló un sistema de persistencia utilizando la API nativa `Window.localStorage`.

* **Inicialización:** En el evento `DOMContentLoaded`, el sistema verifica si existe información almacenada. Si está vacío, carga la data inicial definida en `data.js`.
* **Try-Catch Wrappers:** La lectura y escritura se encapsularon mediante bloques `try-catch` para manejar posibles errores durante el acceso a LocalStorage.

### 2. Patrón de Delegación de Eventos (Event Delegation)

Para controlar elementos dinámicos sin tener que asignar listeners individuales a cada uno, el archivo `eventos.js` implementa un listener a nivel de `document`. Mediante `e.target.closest()`, el sistema identifica qué elemento dinámico, como botones de sumar, restar o agregar, originó la acción.

### 3. Validaciones de Negocio

Cada formulario pasa por validaciones del lado del cliente:

* **Filtro de Correos:** Expresiones regulares limitan el ingreso a los dominios autorizados (`@duoc.cl`, `@profesor.duoc.cl`, `@gmail.com`).
* **Integridad de Datos:** Se comprueba la longitud de las contraseñas, los formatos de RUT chilenos y los números telefónicos de 9 dígitos, mostrando mensajes de error en la interfaz.

---

<a id="cliente"></a>
## 🛒 Módulo Cliente: Tienda y Carrito

El flujo público (B2C) está orientado a facilitar la navegación y el proceso de compra mediante herramientas dinámicas.

* **Buscador y Filtrado Dinámico:** El catálogo permite realizar búsquedas en tiempo real mediante el evento `keyup` y filtrar mediante *Radio Buttons*. La lógica combina las condiciones de búsqueda utilizando `Array.prototype.filter()` y actualiza el DOM.
* **Enrutamiento Geográfico Interactivo:** Si el usuario busca términos como "Chillán Viejo", "Los Ángeles" o "Rural" desde el inicio, el script almacena la intención localmente y redirige a `punto-volcan.html`, donde el formulario geográfico se completa mediante el diccionario de `main.js`.
* **Carrito de Compras:**
  * Sincronización del contador numérico de la barra de navegación.
  * **Control de Stock:** Evalúa la relación entre cantidad solicitada y stock disponible, bloqueando cantidades que superen el inventario lógico y mostrando un estado de "Stock Crítico" cuando quedan menos de 20 unidades.
  * **Motor de Promociones:** Integración de cupones de descuento. Al aplicar el código **`VOLCAN15`**, el sistema recalcula los subtotales, aplica un descuento del 15% sobre los precios y actualiza el DOM mostrando los valores originales tachados.

---

<a id="ejecucion"></a>
## 🚀 Guía de Ejecución Local

Dada su arquitectura `Zero Dependencies`, la plataforma no requiere instalación de módulos `npm`, compiladores de código ni configuración de servidores locales para ser ejecutada. Todo funciona nativamente en el navegador.

1. **Clonar o Extraer:** Descarga el código fuente mediante `git clone` o extrae el archivo comprimido del proyecto.
2. **Ejecución Directa:** Abre el archivo `index.html` en cualquier navegador web moderno (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari).
3. **Pruebas de Autenticación (Admin):**
   * Dirígete a la vista de **Iniciar Sesión** (`login.html`) o desde la barra de navegación.
   * Utiliza las credenciales maestras de desarrollo:
     * **Correo:** `admin@duoc.cl`
     * **Contraseña:** `admin`
   * El script evaluará la identidad y redirigirá el flujo hacia el entorno de Backoffice.
4. **Pruebas Transaccionales (Carrito):**
   * Navega al catálogo, agrega cilindros al carrito, dirígete al Checkout y prueba el cupón promocional activo: **`VOLCAN15`**.
5. **Reinicio de Datos Locales:** Si durante las pruebas deseas restablecer el inventario de productos o la lista de usuarios a su estado inicial, abre las herramientas de desarrollo de tu navegador y limpia el almacenamiento local: 
   * `F12 ➔ Application ➔ Local Storage ➔ Clear`
   * Tras recargar la página, el motor `main.js` re-inyectará la estructura base por defecto.