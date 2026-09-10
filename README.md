# 🌋 Gas El Volcán - Plataforma E-Commerce y Backoffice

![](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) ![](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) ![](https://img.shields.io/badge/JavaScript_ES6+-F7DF1E?style=flat&logo=javascript&logoColor=black) ![](https://img.shields.io/badge/LocalStorage-Persistencia-0052CC?style=flat&logo=databricks&logoColor=white) ![](https://img.shields.io/badge/Diseño-Mobile_First-339933?style=flat) ![](https://img.shields.io/badge/Arquitectura-Modular-8A2BE2?style=flat) ![](https://img.shields.io/badge/VSCode-IDE-007ACC?style=flat&logo=visualstudiocode&logoColor=white) ![](https://img.shields.io/badge/GitHub-Version_Control-181717?style=flat&logo=github&logoColor=white) ![](https://img.shields.io/badge/Grupo-3-8A2BE2?style=flat)

> **Gas El Volcán** es una solución digital diseñada para modernizar la distribución de gas licuado a domicilio. El sistema reúne una **Sucursal Virtual** donde los clientes pueden explorar productos, consultar sucursales y preparar su carrito de compras, junto con un **Panel de Administración (Backoffice)** para la gestión del inventario, usuarios y métricas generales.

---

## 📑 Tabla de Contenidos

- 👥 [Equipo de Desarrollo (Grupo 3)](#equipo)
- 🎯 [Contexto del Negocio y Alcance](#contexto)
- 🏗️ [Arquitectura y Organización de Archivos](#arquitectura)
- 🎨 [Ingeniería CSS, SMACSS y Diseño Responsive](#css)
- 🧠 [JavaScript, Responsabilidades y Persistencia](#javascript)
- 🛒 [Tienda Pública, Catálogo y Carrito](#cliente)
- 📍 [Cobertura, Noticias y Atención al Cliente](#contenidos)
- 🔐 [Autenticación, Registro y Validaciones](#seguridad)
- ⚙️ [Administración: Dashboard y CRUD](#administrador)
- 🚀 [Instalación y Ejecución Local](#ejecucion)
- 🧪 [Validación Funcional con Live Server](#pruebas)
- 🛡️ [Alcance Técnico y Consideraciones](#alcance)
- 🌿 [Flujo de Trabajo y Versionado](#versionado)

---

<a id="equipo"></a>
## 👥 Equipo de Desarrollo (Grupo 3)

La plataforma fue organizada y desarrollada colaborativamente por tres integrantes, con responsabilidades definidas por vistas y funcionalidades:

| Integrante | GitHub | Área de responsabilidad |
| :--- | :--- | :--- |
| **Benjamín Aliste** | [@shirokamidev](https://github.com/shirokamidev) | Tienda pública, navegación, Inicio, Catálogo, Detalle de productos, Autenticación, Nosotros y Sucursales. |
| **Jesús Amaya** | [@Jesusamayap](https://github.com/Jesusamayap) | Blogs, Detalle de noticias, Contacto, Carrito, Legales y componentes del pie de página. |
| **Benjamín Mora** | [@nNoriega-K](https://github.com/nNoriega-K) | Backoffice, Dashboard, gestión de productos y usuarios, tablas y formularios administrativos. |

### Organización colaborativa

Se utilizó **Git y GitHub** para separar funcionalidades, registrar cambios con **Conventional Commits** e integrar el trabajo mediante `develop`. Las ramas `feature/*` permitieron desarrollar componentes de manera aislada, revisarlos y fusionarlos antes de preparar la versión estable en `main`.

El historial diferencia nuevas funcionalidades (`feat`), correcciones (`fix`), reorganizaciones de código (`refactor`), estilos (`style`), documentación (`docs`) y mantenimiento (`chore`). Esta organización permite seguir la evolución de las vistas y entender qué componente modificó cada integrante.

---

<a id="contexto"></a>
## 🎯 Contexto del Negocio y Alcance

**Distribuidora de Gas El Volcán** presenta una alternativa de atención digital para clientes de las regiones de **Ñuble y Biobío**. La plataforma reúne el catálogo de cilindros, reguladores, mangueras y accesorios, la consulta de zonas de atención, noticias y un entorno interno para la administración de información.

La solución se distribuye en dos áreas complementarias:

1. **Tienda pública:** navegación por productos, búsqueda y filtros, fichas detalladas, carrito de compras, información de sucursales y formularios de consulta.
2. **Backoffice administrativo:** acceso desde el inicio de sesión, visualización de indicadores y mantenimiento de productos y usuarios mediante operaciones de creación, consulta, edición y eliminación.

Las vistas interactivas y el almacenamiento de productos, usuarios y carrito funcionan en el **navegador**. La plataforma permite preparar compras y validar formularios, mientras que las operaciones comerciales y los envíos efectivos requieren servicios de servidor.

### Identidad visual

| Elemento | Implementación |
| :--- | :--- |
| Color principal | Azul corporativo `#004b87` |
| Color de acento | Naranja `#f37021` |
| Colores complementarios | Blanco, azul oscuro y tonos neutros |
| Tipografía | **Montserrat**, solicitada mediante Google Fonts, con alternativas del sistema |
| Diseño | Estructura adaptable a celular, tablet y escritorio |
| Recursos | Fotografías, logotipo, ilustraciones SVG e iconos de medios de pago en `assets/images/` |

---

<a id="arquitectura"></a>
## 🏗️ Arquitectura y Organización de Archivos

El proyecto utiliza **HTML5, CSS3 y JavaScript nativo**. La separación por carpetas evita concentrar la lógica de negocio, los estilos y los datos en un único archivo.

```text
Gas El Volcán/
├── index.html
├── catalogo.html
├── detalle-producto.html
├── carrito.html
├── sucursales.html
├── nosotros.html
├── blogs.html
├── detalle-blog.html
├── contacto.html
├── legales.html
├── login.html
├── registro.html
├── admin-index.html
├── admin-lista-productos.html
├── admin-nuevo-producto.html
├── admin-editar-producto.html
├── admin-lista-usuarios.html
├── admin-nuevo-usuario.html
├── admin-editar-usuario.html
├── README.md
└── assets/
    ├── css/
    │   ├── layout.css
    │   ├── admin-layout.css
    │   ├── pages/                 # Estilos de cada vista
    │   └── utils/                 # Componentes y estilos compartidos
    ├── js/
    │   ├── app.js                 # Inicialización y carga de scripts
    │   ├── data/                  # Catálogo y datos iniciales
    │   ├── services/              # Persistencia y carrito
    │   ├── utils/                 # Validaciones y utilidades
    │   ├── pages/                 # Controladores de vistas públicas
    │   └── admin/                 # Tablas, formularios y métricas
    ├── fonts/                     # Archivos de tipografía Montserrat
    └── images/                    # Fotografías, logotipo y recursos SVG
```

La plataforma reúne **19 documentos HTML, 32 hojas CSS y 23 archivos JavaScript**, distribuidos por función. Cada vista utiliza los estilos y comportamientos correspondientes, manteniendo una estructura clara para usuarios y administradores. Las páginas administrativas requieren haber iniciado sesión para habilitar su navegación.

### Vistas de la tienda y contenidos

| Vista | Propósito | Controlador asociado |
| :--- | :--- | :--- |
| `index.html` | Portada corporativa, búsqueda rápida y productos destacados | `catalogo.js`, `sucursales.js` |
| `catalogo.html` | Catálogo, categorías, búsqueda y opciones de visualización | `catalogo.js` |
| `detalle-producto.html` | Ficha del artículo por identificador y productos relacionados | `catalogo.js`, `detalle-productos.js` |
| `carrito.html` | Gestión de cantidades, artículos, precios y promociones | `interfaz-carrito.js` |
| `sucursales.html` | Regiones, comunas, puntos de atención y filtros geográficos | `sucursales.js` |
| `nosotros.html` | Historia, misión, visión y equipo | Funciones compartidas |
| `blogs.html` | Noticias y filtros por texto, categoría y fecha | `blogs.js` |
| `detalle-blog.html` | Artículo seleccionado mediante el parámetro `id` | `detalle-blog.js` |
| `contacto.html` | Formulario de consulta, datos de atención y preguntas frecuentes | `contacto.js` |
| `legales.html` | Términos, condiciones y políticas informativas | Funciones compartidas |
| `login.html` | Validación de ingreso y acceso de demostración | `autenticacion.js` |
| `registro.html` | Validaciones de datos personales y dirección | `autenticacion.js` |

El detalle de noticias utiliza una sola vista: `detalle-blog.html?id=1` o `detalle-blog.html?id=2`. No necesita una página HTML independiente para cada artículo.

### Vistas de administración

| Vista | Función | Controlador asociado |
| :--- | :--- | :--- |
| `admin-index.html` | Dashboard con métricas generales | `admin-metricas.js` |
| `admin-lista-productos.html` | Inventario, paginación y eliminación | `admin-tablas.js` |
| `admin-nuevo-producto.html` | Registro de un producto | `admin-formularios.js` |
| `admin-editar-producto.html` | Edición de producto mediante `?id=` | `admin-formularios.js` |
| `admin-lista-usuarios.html` | Directorio de usuarios, roles y acciones | `admin-tablas.js` |
| `admin-nuevo-usuario.html` | Alta de usuario | `admin-formularios.js` |
| `admin-editar-usuario.html` | Actualización de usuario mediante `?id=` | `admin-formularios.js` |

---

<a id="css"></a>
## 🎨 Ingeniería CSS, SMACSS y Diseño Responsive

La interfaz se construyó con **CSS nativo**, sin Bootstrap ni otros frameworks de interfaz. La organización sigue una separación de responsabilidades inspirada en **SMACSS (Scalable and Modular Architecture for CSS)**:

| Capa | Ubicación | Responsabilidad |
| :--- | :--- | :--- |
| Base y tema | `assets/css/utils/base.css`, `variables.css`, `fuentes.css` | Reglas globales, paleta corporativa y tipografía |
| Estructura pública | `assets/css/layout.css`, `header.css`, `navbar.css`, `footer.css` | Cabecera, navegación y pie corporativo |
| Estructura administrativa | `assets/css/admin-layout.css` | Barra lateral, cabecera y distribución del backoffice |
| Componentes reutilizables | `assets/css/utils/` | Botones, formularios, tarjetas de producto, tablas, autenticación e impresión |
| Estilos por vista | `assets/css/pages/` | Diseño específico sin mezclar todas las páginas en una sola hoja |

### Decisiones visuales

- **Responsive:** uso de Flexbox, CSS Grid y *media queries* para reorganizar navegación, tarjetas, formularios y tablas según el ancho de pantalla.
- **Navegación móvil:** controles tipo hamburguesa y desplegables preparados para interacción por teclado y JavaScript cuando corresponde.
- **Accesibilidad básica:** etiquetas asociadas a entradas, mensajes de error cercanos a los campos, estados `:focus-visible`, navegación semántica y descripciones alternativas de imágenes.
- **Tablas del backoffice:** desplazamiento horizontal en dispositivos pequeños para conservar la información del inventario y los usuarios.
- **Estilos de impresión:** reglas específicas para facilitar la impresión del catálogo.
- **Consistencia:** variables CSS compartidas para colores, jerarquías visuales y componentes recurrentes.

La tipografía **Montserrat**, los colores corporativos y los componentes compartidos mantienen una identidad visual consistente en todas las pantallas.

---

<a id="javascript"></a>
## 🧠 JavaScript, Responsabilidades y Persistencia

Toda la lógica está desarrollada con **JavaScript nativo**, utilizando arreglos, objetos, funciones, eventos del DOM y almacenamiento del navegador. La separación funcional facilita comprender qué archivo administra cada comportamiento.

### 1. Funcionamiento general de las páginas

El archivo **`assets/js/app.js`** es el punto de entrada compartido. Cada HTML lo incorpora y este selecciona los scripts correspondientes según el nombre de la vista.

```html
<script defer src="assets/js/app.js"></script>
```

`app.js` agrega los scripts necesarios al documento y los carga **en orden**: primero los datos y las funciones compartidas, y después el comportamiento específico de la página. De esta manera, las vistas mantienen una navegación coherente y cada función se ejecuta donde corresponde.

Los componentes de suscripción y ciertas interacciones de la navegación también se inicializan desde este archivo.

### 2. Interacción con el DOM y los eventos

El **DOM (Document Object Model)** representa los elementos HTML que JavaScript puede consultar y actualizar. La plataforma lo utiliza para construir tarjetas, mostrar mensajes, cambiar valores, abrir filtros y actualizar tablas sin tener que escribir una página distinta para cada producto o usuario.

| Herramienta de JavaScript | Aplicación en el sitio |
| :--- | :--- |
| `document.getElementById()` y `querySelector()` | Localizar formularios, botones, listas, mensajes y controles de cada vista |
| `querySelectorAll()` | Obtener grupos de campos, tarjetas o elementos que comparten un comportamiento |
| `document.createElement()` y `appendChild()` | Construir tarjetas del catálogo, noticias, filas y otros componentes dinámicos |
| `textContent` y `innerHTML` | Presentar nombres, descripciones, cantidades, precios y estructuras de interfaz |
| `classList` | Mostrar, ocultar y cambiar estados visuales de controles y mensajes |
| `addEventListener()` | Responder a clics, escritura, cambios en selectores y envíos de formularios |
| `preventDefault()` | Controlar formularios y enlaces cuando la acción debe resolverse en la misma vista |
| `closest()` | Reconocer el botón o elemento relacionado con una acción dentro de componentes dinámicos |
| `URLSearchParams` | Obtener valores de la dirección, como el `id` del producto o de la noticia |

Los eventos `click`, `input`, `change`, `submit` y `keydown` permiten que la interfaz responda a las acciones de la persona. También se utiliza `DOMContentLoaded` para inicializar funcionalidades cuando la estructura de la página está disponible.

El catálogo y los blogs emplean arreglos y métodos como `filter()`, `find()` y `map()` para localizar información, aplicar criterios de búsqueda y generar el contenido que se presenta. El backoffice utiliza estas mismas herramientas para mostrar registros y mantener las tablas actualizadas.

### 3. Datos iniciales: `assets/js/data/`

| Archivo | Contenido |
| :--- | :--- |
| `productosData.js` | **14 productos** con código, categoría, descripción, precios, stock, límite crítico individual e imagen |
| `usuariosData.js` | **4 usuarios** de ejemplo con datos de contacto y rol |
| `categoriasData.js` | Categorías utilizadas por el catálogo |
| `sucursalesData.js` | Diccionario de comunas de Ñuble y Biobío |
| `blogsData.js` | Resumen de las dos noticias publicadas |
| `detallesBlogsData.js` | Contenido completo de las noticias |

Los datos iniciales sirven para recuperar el estado base cuando todavía no existen registros guardados en el navegador.

### 4. Servicios: `assets/js/services/`

**`almacenamiento-local.js`** centraliza la lectura y escritura de JSON, la inicialización de datos y la recuperación ante información inválida. Incluye comprobaciones de disponibilidad de `localStorage` y manejo de excepciones mediante `try...catch`.

**`operaciones-carrito.js`** gestiona la lista de artículos del carrito, sus cantidades, los límites de stock y la sincronización con el almacenamiento del navegador.

### 5. JSON y persistencia con `localStorage`

La aplicación conserva productos, usuarios y carrito mediante la API **`localStorage`** del navegador. Como estos datos se organizan en objetos y arreglos de JavaScript, se convierten a **JSON (JavaScript Object Notation)** para poder almacenarlos y recuperarlos.

- **`JSON.stringify()`** transforma un objeto o arreglo en texto JSON antes de guardarlo mediante `localStorage.setItem()`.
- **`localStorage.getItem()`** recupera el contenido guardado para una clave específica.
- **`JSON.parse()`** convierte el texto JSON recuperado nuevamente en objetos o arreglos que las páginas pueden utilizar.
- **`try...catch`** controla datos incorrectos o situaciones en las que el navegador impide acceder al almacenamiento.
- **`Array.isArray()`** comprueba que la información recuperada tenga la estructura esperada antes de usarla como listado.

Al abrir las vistas, el sistema utiliza los registros almacenados si son válidos. Cuando no existen datos de productos o usuarios, inicializa sus colecciones con el contenido de `assets/js/data/`. Los cambios del administrador se reflejan en el catálogo y en las métricas cuando se vuelve a consultar la información compartida.

| Clave de `localStorage` | Contenido almacenado |
| :--- | :--- |
| `productosVolcan` | Inventario editable y precios de los productos |
| `usuariosVolcan` | Directorio administrativo de usuarios |
| `carritoVolcan` | Productos y cantidades seleccionados |
| `busquedaIndexVolcan` | Búsqueda de ubicación iniciada desde la portada, cuando corresponde |

`localStorage` funciona **por origen del navegador**. Por ello, las páginas deben abrirse bajo una misma dirección y puerto para compartir los datos de forma consistente. El estado del acceso administrativo se conserva aparte mediante `sessionStorage`, dentro de la pestaña donde se inició sesión.

### 6. Utilidades: `assets/js/utils/`

| Archivo | Función |
| :--- | :--- |
| `validaciones.js` | Correo, contraseña, RUT, teléfono, nombres, región, comuna y mensajes de error |
| `ubicaciones.js` | Actualización del selector de comunas según la región elegida |
| `interacciones-productos.js` | Controles de cantidad y acciones relacionadas con productos |

Se prioriza una responsabilidad reconocible por archivo. Para los elementos dinámicos se utilizan eventos del DOM y, cuando es adecuado, delegación mediante `closest()`.

---

<a id="cliente"></a>
## 🛒 Tienda Pública, Catálogo y Carrito

### Catálogo de productos

El catálogo presenta **14 artículos iniciales** distribuidos entre cilindros, reguladores, mangueras y accesorios. Permite consultar precios, buscar productos por nombre y aplicar filtros por categoría.

La vista de detalle se genera a partir del identificador del artículo, mostrando su descripción, disponibilidad y productos relacionados. Los controles de cantidad tienen en cuenta el stock para evitar solicitudes superiores a las unidades disponibles. Cada producto tiene su propio valor de **stock crítico**, por lo que el aviso de últimas unidades depende del límite configurado para ese artículo y no de una cantidad general.

Los productos administrados en el backoffice son los mismos que se consultan desde la tienda: cuando se actualiza el inventario en `localStorage`, las vistas públicas recuperan esos cambios al cargarse de nuevo. Si las existencias llegan a cero, el producto se muestra sin stock disponible.

### Carrito de compras

El carrito mantiene los artículos agregados entre visitas realizadas desde el mismo origen:

- Agregar productos desde el catálogo o sus fichas detalladas.
- Aumentar y disminuir cantidades respetando el stock disponible.
- Eliminar artículos o vaciar el carrito.
- Consultar subtotales, descuentos y monto total, junto con avisos de existencias críticas según cada producto.
- Actualizar el indicador del carrito en la navegación.
- Aplicar el cupón **`VOLCAN15`**, que descuenta **15 %** del monto correspondiente.

**Alcance del proceso:** el botón para continuar la compra muestra un aviso de que esa etapa estará disponible posteriormente. **No se realizan cobros, compras efectivas ni confirmaciones de pedidos.**

---

<a id="contenidos"></a>
## 📍 Cobertura, Noticias y Atención al Cliente

### Sucursales y zonas de atención

La vista `sucursales.html` permite filtrar zonas mediante región y comuna. El diccionario geográfico considera las siguientes comunas:

| Región | Comunas disponibles en los selectores |
| :--- | :--- |
| **Ñuble** | Chillán, Chillán Viejo, Bulnes, El Carmen, Pinto, San Ignacio y Quillón |
| **Biobío** | Concepción, Talcahuano y Los Ángeles |

El buscador de Inicio puede transmitir el texto de una comuna o zona a la vista de Sucursales. Los resultados provienen de la información incorporada en el sitio: **no se consulta una API de geolocalización en tiempo real**.

### Blogs y noticias

El módulo permite filtrar noticias por **texto, categoría y año**, restablecer resultados y abrir el detalle seleccionado. La versión incluye dos publicaciones: consejos de ahorro y subsidio de gas, y prevención de fugas de gas.

`detalle-blog.html` utiliza el parámetro `id` para elegir el contenido. Incluye un enlace de retorno al listado y controles para copiar o compartir el enlace del artículo.

### Contacto y suscripción

El formulario de Contacto valida nombre, correo, teléfono opcional, asunto y mensaje, mostrando retroalimentación cerca de los campos. El pie corporativo reutilizable contiene enlaces institucionales, suscripción y referencias gráficas a medios de pago.

La suscripción comprueba el formato del correo, y las validaciones de correo consideran los dominios `@duoc.cl`, `@profesor.duoc.cl` y `@gmail.com`.

**Los formularios de Contacto y Suscripción no envían datos ni registran solicitudes en un servidor.** Al validar correctamente, informan la disponibilidad futura de esa operación.

---

<a id="seguridad"></a>
## 🔐 Autenticación, Registro y Validaciones

Las pantallas `login.html` y `registro.html` comparten el controlador `assets/js/pages/autenticacion.js` y las utilidades generales de validación.

### Inicio de sesión de demostración

El formulario comprueba correo y contraseña, permite alternar la visibilidad de la clave y muestra los errores sin recargar la página.

**Acceso de demostración:**

```text
Correo: admin@duoc.cl
Contraseña: admin
```

Al ingresar estos datos, la aplicación guarda el estado de acceso en `sessionStorage`, mediante la clave `accesoAdministradorVolcan`, y dirige a `admin-index.html`. La sesión se mantiene al navegar por el panel o recargar sus páginas en la misma pestaña.

Antes de cargar una vista administrativa, `app.js` comprueba que ese acceso siga activo. Si se intenta abrir una página `admin-` sin haber iniciado sesión, la aplicación redirige a `login.html`. El enlace **Salir** elimina el estado de la sesión y devuelve al inicio de sesión.

Este control se realiza en el navegador y permite probar el acceso al panel. No utiliza una sesión autenticada por servidor ni sustituye la seguridad de un sistema de producción.

### Formulario de registro

El formulario revisa formato de RUT, nombre y apellidos, contraseñas, coincidencia de correo, teléfono, dirección, región y comuna, además de la aceptación de términos cuando corresponde.

Los controles geográficos son dependientes: al elegir una región se actualizan las comunas disponibles. Los mensajes de validación se muestran durante la escritura o al intentar enviar el formulario, según el tipo de campo.

**El registro valida los datos, pero no crea una cuenta real ni almacena contraseñas de clientes.** La interfaz comunica expresamente que el alta de cuentas está pendiente.

---

<a id="administrador"></a>
## ⚙️ Administración: Dashboard y CRUD

El backoffice reúne herramientas de mantenimiento del inventario y del directorio de usuarios. Sus vistas se utilizan después de iniciar sesión y comparten cabecera, navegación lateral y componentes de formularios y tablas.

### Dashboard

`admin-index.html` presenta estadísticas calculadas a partir de los datos disponibles en el navegador. Inicialmente, el sistema dispone de **14 productos y 4 usuarios**. Los contadores se obtienen mediante `admin-metricas.js`.

### Gestión de productos

Desde el panel se puede:

1. **Listar** artículos, consultar precios, stock disponible, límite crítico por producto y recorrer la paginación.
2. **Crear** productos con código, nombre, categoría, precios, existencias, stock crítico individual, descripción e imagen.
3. **Editar** productos existentes a partir del identificador recibido en la URL (`?id=`).
4. **Eliminar** productos del inventario, con confirmación cuando corresponde.

Los datos se mantienen en `productosVolcan`. Los formularios comprueban campos obligatorios, valores numéricos, stock, límite crítico y códigos duplicados. **Cada producto tiene su propio límite de stock crítico**, que puede configurarse al crearlo o editarlo. En el inventario, si quedan unidades y la cantidad es menor o igual al límite, el número se muestra en rojo. Si las existencias son cero, aparece **Sin stock** en rojo y en una sola línea, sin mostrar el número `0`. La columna **Stock crítico** muestra el límite definido para ese producto.

### Gestión de usuarios

El administrador dispone de un directorio con información personal, contacto, comuna y rol. Los formularios permiten **crear, modificar y eliminar registros** y verificar datos como RUT y correo duplicados.

Los roles disponibles en los datos y formularios son **administrador, vendedor y cliente**. El proceso de edición identifica al usuario por su `id` y conserva el tratamiento del RUT establecido en el formulario.

Los registros se guardan en `usuariosVolcan`. **Las contraseñas introducidas en el formulario administrativo se validan, pero no se persisten como credenciales de acceso.**

### Archivos administrativos

| Script | Responsabilidad |
| :--- | :--- |
| `assets/js/admin/admin-metricas.js` | Recuento de productos y usuarios |
| `assets/js/admin/admin-tablas.js` | Construcción de filas, paginación y acciones del listado |
| `assets/js/admin/admin-formularios.js` | Alta, edición y validaciones de productos y usuarios |

---

<a id="ejecucion"></a>
## 🚀 Instalación y Ejecución Local

### Para comenzar

- Navegador actualizado: Chrome, Edge, Firefox o Safari.
- Código fuente del proyecto descargado o clonado.
- Visual Studio Code con la extensión **Live Server**, utilizada para abrir y comprobar las páginas.
- Conservar el mismo origen del navegador al recorrer las vistas para que productos, usuarios y carrito compartan los datos guardados.

### Abrir la plataforma con Live Server

1. Descarga el repositorio y ábrelo como carpeta en Visual Studio Code.
2. Inicia **Live Server** desde `index.html`, o desde la raíz de la carpeta.
3. Utiliza las rutas del menú para explorar la tienda pública.
4. Para probar el Backoffice, entra a `login.html` con las credenciales de demostración. El acceso a las páginas administrativas se mantiene durante la sesión de la pestaña.
5. Conserva la misma dirección y puerto mientras pruebas el catálogo, el carrito y la administración.

> Utiliza Live Server para que todas las páginas se abran desde la misma dirección. Así, el carrito, los productos y los usuarios comparten correctamente la información guardada en el navegador.

### Reiniciar datos del navegador

1. Abre las herramientas de desarrollo con **F12**.
2. Entra a **Application → Local Storage** o al apartado equivalente de tu navegador.
3. Selecciona el origen desde el cual estás probando el proyecto.
4. Elimina solo las claves que deseas restablecer: `productosVolcan`, `usuariosVolcan` o `carritoVolcan`.
5. Recarga la página. Los arreglos de productos y usuarios iniciales se restaurarán al no encontrar sus claves. El carrito quedará vacío.

Eliminar todos los datos del origen puede afectar otras aplicaciones que compartan esa misma dirección. Si cambias de puerto o alternas `localhost` y `127.0.0.1`, estarás utilizando un origen de almacenamiento distinto.

---

<a id="pruebas"></a>
## 🧪 Validación Funcional con Live Server

Las vistas y los flujos de navegación se revisaron mediante **Live Server**, comprobando el diseño adaptable, los controles y el intercambio de información entre páginas. Los siguientes puntos reúnen las funcionalidades que componen la revisión del sitio:

- **Navegación:** recorrer las 19 páginas y comprobar enlaces, imágenes, menú móvil y foco por teclado.
- **Diseño:** revisar las vistas en anchos de celular, tablet y escritorio, sin pérdida de controles ni contenido.
- **Catálogo:** filtrar por categoría, buscar artículos, restablecer filtros y consultar fichas detalladas.
- **Carrito:** agregar productos, aumentar y disminuir cantidades, respetar el stock disponible, comprobar los avisos de últimas unidades y vaciar el contenido.
- **Promoción:** aplicar `VOLCAN15` y verificar el descuento del 15 %.
- **Persistencia:** recargar el navegador y confirmar que los productos, usuarios y artículos del carrito permanecen.
- **Sucursales:** elegir regiones y comunas, ejecutar la búsqueda y restablecer la selección.
- **Blogs:** combinar filtros, probar resultados vacíos y visitar ambos artículos mediante su identificador.
- **Autenticación:** mostrar y ocultar la contraseña, verificar errores, ingresar con el usuario de demostración, comprobar la persistencia de `sessionStorage` al recargar, el bloqueo de acceso directo a páginas administrativas y la opción Salir.
- **Registro y Contacto:** comprobar campos obligatorios, formatos inválidos y mensajes informativos sin envío real.
- **Productos administrativos:** crear, editar y eliminar artículos, configurar el stock crítico de cada uno y comprobar que el inventario destaque las cantidades críticas en rojo y muestre **Sin stock** cuando no queden unidades.
- **Usuarios administrativos:** crear y editar un usuario, revisar los roles y comprobar la persistencia.
- **Dashboard:** verificar que los indicadores respondan a los datos guardados.
- **Consola:** revisar que no existan errores de ejecución o cargas faltantes.

La validación se realizó navegando por las páginas y comprobando sus interacciones mediante Live Server. Las funciones que muestran un aviso de disponibilidad futura se verificaron conforme al comportamiento implementado, sin atribuirles operaciones con servidor.

---

<a id="alcance"></a>
## 🛡️ Alcance Técnico y Consideraciones

La tienda pública, la navegación, el catálogo, el carrito y los formularios están desarrollados con HTML, CSS y JavaScript nativo. La gestión de productos y usuarios se mantiene mediante `localStorage`, y el acceso a las páginas administrativas se controla con `sessionStorage` después de iniciar sesión.

El inventario dispone de **stock crítico individual por producto**. Los formularios permiten definirlo y editarlo, mientras que el listado distingue las cantidades críticas y las existencias agotadas. La información se actualiza al consultar nuevamente los datos guardados en el navegador.

Los formularios de registro, contacto y suscripción presentan validaciones y mensajes al usuario. El carrito permite preparar una compra y calcular importes, pero estas interacciones no ejecutan pagos, crean pedidos comerciales ni envían mensajes a un servidor. El acceso administrativo es demostrativo y su comprobación se realiza en el navegador.

---

<a id="versionado"></a>
## 🌿 Flujo de Trabajo y Versionado

El código se organizó mediante un flujo de integración continuo entre **ramas de funcionalidad** y `develop`, reservando `main` para la versión estable.

```text
feature/* ──► develop ──► main
                           └── v1.0.0
```

Los mensajes de commit utilizan la estructura `tipo(alcance): descripción`, para identificar el módulo modificado sin mezclar cambios ajenos a él. Las ramas temporales pueden eliminarse después de confirmar que sus commits fueron incorporados a `develop`.

**Versión:** `v1.0.0`. El flujo del repositorio reúne las funcionalidades en `develop` y utiliza `main` para la versión estable. El tag `v1.0.0` identifica el commit correspondiente a esa publicación en `main`, de modo que la versión pueda localizarse sin depender de cambios posteriores.

---

**Gas El Volcán · Grupo 3**  
**Tecnologías:** HTML5 · CSS3 · JavaScript nativo · LocalStorage · Git/GitHub
