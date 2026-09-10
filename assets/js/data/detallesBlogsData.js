// Contenido de ambas noticias para la vista de detalle
const detallesBlogsData = {
    1: `<main class="pagina-detalle">
            <div class="contenedor">
                
                <!-- Ruta de navegación -->
                <nav class="ruta-navegacion" aria-label="Ruta de navegación">
                    <a href="index.html">Inicio</a> ›
                    <a href="blogs.html">Blogs</a> ›
                    <a href="blogs.html?categoria=negocio#filtros-blogs">Nuestro Negocio</a> ›
                    <a href="blogs.html?categoria=negocio&amp;fecha=2026#filtros-blogs">2026</a> ›
                    <span aria-current="page">Consejos para el subsidio de gas y ahorro en el hogar</span>
                </nav>

                <!-- Portada del artículo -->
                <article class="portada-blog">
                    <img src="assets/images/blogs/noticia-subsidio.jpg" alt="Cilindros de gas en planta" class="img-fondo" />
                    <div class="capa-oscura"></div>
                    
                    <div class="contenido-encima">
                        <span class="etiqueta-naranja">NUESTRO NEGOCIO</span>
                        <h1 class="titulo-blanco">Consejos para el subsidio de gas y ahorro en el hogar</h1>
                        <div class="meta-info">
                            <span>Nuestro Negocio</span>
                            <span class="separador">|</span>
                            <span class="fecha-icono">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                10/08/2026
                            </span>
                        </div>
                    </div>
                </article>

                <!-- Cuerpo de la noticia -->
                <div class="cuerpo-texto">
                    <p class="texto-intro">
                        El invierno se acerca y en Gas El Volcán queremos que tu hogar se mantenga cálido sin que tu bolsillo sufra. Por eso, hemos activado nuevos convenios y descuentos exclusivos para la Región de Ñuble.
                    </p>

                    <p>
                        Según el último reporte del Ministerio de Energía, el <strong>84% de las familias de Chile</strong> eligen el gas licuado para su calefacción y cocina debido a su alto poder calorífico y seguridad. Sin embargo, el uso intensivo durante los meses fríos puede elevar el presupuesto del hogar.
                    </p>

                    <h2>Aprovecha tu 15% de Descuento</h2>
                    <p>
                        Para aliviar la carga económica, hemos sellado alianzas con las principales tarjetas bancarias y cajas de compensación. Si es tu primera compra a través de nuestra Sucursal Virtual, podrás optar a un <strong>15% de descuento directo</strong> al momento de pagar. Solo debes ingresar tu RUT y el sistema validará automáticamente si aplicas a este y otros subsidios vigentes.
                    </p>

                    <h2>3 Tips rápidos para hacer rendir tu cilindro</h2>
                    <p>La eficiencia en el consumo de gas no solo cuida tu economía, sino que también contribuye a un mejor uso de la energía. Aquí te dejamos tres consejos fundamentales:</p>
                    <ul>
                        <li><strong>Revisa las llamas de tu cocina:</strong> Si la llama es amarilla o naranja, hay una mala combustión y estás desperdiciando gas. Debe ser siempre azul.</li>
                        <li><strong>Usa tapas en las ollas:</strong> Cocinar con las ollas tapadas retiene el calor y reduce el tiempo de cocción hasta en un 20%.</li>
                        <li><strong>Mantención de estufas:</strong> Limpia los inyectores de tu estufa a gas antes de que comience el invierno para maximizar su eficiencia térmica.</li>
                    </ul>
                </div>

                <!-- Sección de compartir -->
                <div class="bloque-compartir">
                    <span class="compartir-titulo">Comparte este blog en:</span>
                    <div class="compartir-iconos">
                        <a href="detalle-blog.html" aria-label="Copiar enlace">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                        </a>
                        <a href="https://wa.me/" aria-label="Compartir en WhatsApp">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                        </a>
                        <a href="mailto:" aria-label="Compartir por Email">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                        </a>
                        <a href="https://x.com/intent/tweet" aria-label="Compartir en X">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                        </a>
                    </div>
                </div>

            </div>
        </main>`,
    2: `<main class="pagina-detalle">
            <div class="contenedor">
                
                <!-- Ruta de navegación -->
                <nav class="ruta-navegacion" aria-label="Ruta de navegación">
                    <a href="index.html">Inicio</a> ›
                    <a href="blogs.html">Blogs</a> ›
                    <a href="blogs.html?categoria=comunidad#filtros-blogs">Comunidad</a> ›
                    <a href="blogs.html?categoria=comunidad&amp;fecha=2026#filtros-blogs">2026</a> ›
                    <span aria-current="page">¿Cómo detectar fugas de gas a tiempo? 3 pasos clave</span>
                </nav>

                <!-- Portada del artículo -->
                <article class="portada-blog">
                    <img src="assets/images/blogs/seguridad-fugas.png" alt="Revisión de válvula y regulador" class="img-fondo" />
                    <div class="capa-oscura"></div>
                    
                    <div class="contenido-encima">
                        <span class="etiqueta-naranja">COMUNIDAD</span>
                        <h1 class="titulo-blanco">¿Cómo detectar fugas de gas a tiempo? 3 pasos clave</h1>
                        <div class="meta-info">
                            <span>Comunidad</span>
                            <span class="separador">|</span>
                            <span class="fecha-icono">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                02/09/2026
                            </span>
                        </div>
                    </div>
                </article>

                <!-- Cuerpo de la noticia -->
                <div class="cuerpo-texto">
                    <p class="texto-intro">
                        La seguridad de tu familia es nuestra principal prioridad. Aunque nuestros cilindros de Gas El Volcán pasan por rigurosas pruebas de hermeticidad antes de llegar a tu casa, es vital saber cómo actuar ante una sospecha de fuga.
                    </p>

                    <p>
                        El gas licuado de petróleo (GLP) en su estado natural no tiene olor. Por ley, se le añade un componente químico llamado <strong>mercaptano</strong>, que le da ese olor fuerte y característico a "huevo podrido" para que cualquier persona pueda detectarlo rápidamente en el aire.
                    </p>

                    <h2>El método de la espuma (Agua y Jabón)</h2>
                    <p>
                        Si sientes olor a gas cerca de tu cilindro, el método más seguro y casero para confirmarlo es usar agua con jabón. Haz una mezcla espumosa y aplícala sobre la válvula, el regulador y la manguera. Si ves que se forman burbujas que crecen, has encontrado el punto exacto de la fuga. <strong>Nunca uses fuego (fósforos o encendedores) para buscar una fuga.</strong>
                    </p>

                    <h2>¿Qué hacer si detecto una fuga en mi hogar?</h2>
                    <p>Mantener la calma es fundamental. Sigue estos pasos para evitar incidentes mayores y proteger tu hogar y a tus vecinos:</p>
                    <ol>
                        <li><strong>Cierra inmediatamente</strong> el paso de gas desde el regulador del cilindro o la llave de paso principal.</li>
                        <li><strong>Ventila el área:</strong> Abre todas las puertas y ventanas. El GLP es más pesado que el aire y tiende a acumularse en el suelo.</li>
                        <li><strong>Evita chispas:</strong> No enciendas ni apagues luces, ni conectes electrodomésticos, ya que una chispa podría generar combustión. Evacúa el lugar y llama a nuestro número de emergencia <strong>800 50 9111</strong>.</li>
                    </ol>
                </div>

                <!-- Sección de compartir -->
                <div class="bloque-compartir">
                    <span class="compartir-titulo">Comparte este blog en:</span>
                    <div class="compartir-iconos">
                        <a href="detalle-blog.html" aria-label="Copiar enlace">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                        </a>
                        <a href="https://wa.me/" aria-label="Compartir en WhatsApp">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                        </a>
                        <a href="mailto:" aria-label="Compartir por Email">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                        </a>
                        <a href="https://x.com/intent/tweet" aria-label="Compartir en X">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                        </a>
                    </div>
                </div>

            </div>
        </main>`
};
