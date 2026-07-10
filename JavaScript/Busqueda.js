document.addEventListener('DOMContentLoaded', async () => {
    await cargarPeliculas();
    const peliculasLista = Object.entries(peliculas);
    const categoriasUnicas = ['Todos', ...new Set(peliculasLista.map(([, peli]) => peli.categoria))];

    const inputBusqueda = document.getElementById('buscadorPelis');
    const contenedorResultados = document.getElementById('resultadosBusqueda');
    const contenedorCategorias = document.getElementById('categoriasBusqueda');
    const contenedorGrilla = document.getElementById('grillaPeliculas');
    const contenedorFiltros = document.getElementById('filtrosCategoria');

    const normalizarTexto = (texto) => texto.toLowerCase().trim();

    const crearTarjetaBusqueda = ([id, peli]) => `
        <article class="ResultadoPelicula">
            <a href="DetallePelicula.html?id=${id}" style="text-decoration: none; color: inherit; display: flex; align-items: center; width: 100%;">
                <div class="ContenedorImagen">
                    <img src="${peli.imagen}" alt="${peli.titulo}">
                </div>
                <div class="DetallePelicula">
                    <h3>${peli.titulo}</h3>
                    <span class="Etiqueta">${peli.categoria}</span>
                </div>
                <span class="material-symbols-outlined IconoFlecha">chevron_right</span>
            </a>
        </article>
    `;



    const crearTarjetaCartelera = ([id, peli]) => `
        <article class="TarjetaPelicula" data-categoria="${peli.categoria}">
            <a href="DetallePelicula.html?id=${id}" style="text-decoration: none; color: inherit;">
                <div class="ContenedorImagen">
                    ${peli.estreno === 'ESTRENO' ? '<span class="Etiqueta EtiquetaEstreno">ESTRENO</span>' : ''}
                    ${peli.estreno === 'IMAX' ? '<span class="Etiqueta EtiquetaImax">IMAX</span>' : ''}
                    <img src="${peli.imagen}" alt="${peli.titulo}">
                </div>
                <div class="InfoPelicula">
                    <h3>${peli.titulo}</h3>
                    <p>${peli.categoria} &bull; ${peli.duracion}</p>
                </div>
            </a>
        </article>
    `;

    function mostrarPeliculas(lista) {
        if (!contenedorResultados) {
            return;
        }

        contenedorResultados.innerHTML = '';

        if (lista.length === 0) {
            contenedorResultados.innerHTML = '<p>No se encontraron resultados para la búsqueda.</p>';
            return;
        }

        contenedorResultados.innerHTML = lista.map(crearTarjetaBusqueda).join('');
    }

    function filtrarPeliculas() {
        if (!inputBusqueda) {
            return;
        }

        const texto = normalizarTexto(inputBusqueda.value);

        const filtradas = peliculasLista.filter(([, peli]) => {
            const titulo = normalizarTexto(peli.titulo);
            const categoria = normalizarTexto(peli.categoria);
            return titulo.includes(texto) || categoria.includes(texto);
        });

        mostrarPeliculas(filtradas);
    }

    function renderCategoriasBusqueda() {
        if (!contenedorCategorias) {
            return;
        }

        contenedorCategorias.innerHTML = categoriasUnicas
            .map((categoria, index) => `
                <button class="BotonFiltro${index === 0 ? ' Activo' : ''}" type="button" data-categoria="${categoria}">
                    ${categoria}
                </button>
            `)
            .join('');

        contenedorCategorias.querySelectorAll('button').forEach((boton) => {
            boton.addEventListener('click', () => {
                const categoriaSeleccionada = boton.dataset.categoria;

                contenedorCategorias.querySelectorAll('button').forEach((otroBoton) => {
                    otroBoton.classList.toggle('Activo', otroBoton === boton);
                });

                if (categoriaSeleccionada === 'Todos') {
                    mostrarPeliculas(peliculasLista);
                    return;
                }

                const filtradas = peliculasLista.filter(([, peli]) => peli.categoria === categoriaSeleccionada);
                mostrarPeliculas(filtradas);
            });
        });
    }

    function renderCartelera() {
        if (!contenedorGrilla) {
            return;
        }

        contenedorGrilla.innerHTML = peliculasLista.map(crearTarjetaCartelera).join('');

        if (!contenedorFiltros) {
            return;
        }

        contenedorFiltros.innerHTML = categoriasUnicas
            .map((categoria, index) => `
                <button class="BotonFiltro${index === 0 ? ' Activo' : ''}" type="button" data-categoria="${categoria}">
                    ${categoria}
                </button>
            `)
            .join('');

        contenedorFiltros.querySelectorAll('button').forEach((boton) => {
            boton.addEventListener('click', () => {
                const categoriaSeleccionada = boton.dataset.categoria;

                contenedorFiltros.querySelectorAll('button').forEach((otroBoton) => {
                    otroBoton.classList.toggle('Activo', otroBoton === boton);
                });

                const tarjetas = contenedorGrilla.querySelectorAll('.TarjetaPelicula');

                tarjetas.forEach((tarjeta) => {
                    const categoriaTarjeta = tarjeta.dataset.categoria;
                    const mostrarTarjeta = categoriaSeleccionada === 'Todos' || categoriaTarjeta === categoriaSeleccionada;
                    tarjeta.style.display = mostrarTarjeta ? '' : 'none';
                });
            });
        });
    }

    if (inputBusqueda && contenedorResultados) {
        renderCategoriasBusqueda();
        mostrarPeliculas(peliculasLista);
        inputBusqueda.addEventListener('input', filtrarPeliculas);
    }

    if (contenedorGrilla) {
        renderCartelera();
    }
});
