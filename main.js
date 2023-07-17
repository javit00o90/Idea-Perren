let productos = [{
        nombre: "Canaleta",
        descripcion: "Canaleta básica para casa",
        precio: 3586,
        color: "galvanizado",
    },
    {
        nombre: "Chapa",
        descripcion: "Chapa estandar para construcción",
        precio: 1897,
        color: "negro",
    },
    {
        nombre: "Perfil Tipo C",
        descripcion: "Perfil metálico para construcción",
        precio: 11856,
        color: "galvanizado",
    },
    {
        nombre: "Extractor eólico",
        descripcion: "Extractor eólico metálico para colocación en techos",
        precio: 13216,
        color: "galvanizado",
    },
];

// Cards de productos
function mostrarProductos() {
    const contenedorProductos = document.querySelector(".listaProductos");
    contenedorProductos.innerHTML = "";

    productos.forEach((producto, index) => {
        const card = document.createElement("div");
        card.classList.add("productoCard");
        card.classList.add("card-body");

        // Add the class name based on the producto color
        const nombreColor = producto.color === "galvanizado" ? "galvanizado" : "negro";

        card.innerHTML = `
      <h3 class="card-title textTitulo">${producto.nombre}</h3>
      <p class="card-text textoDesc">${producto.descripcion}</p>
      <p class="precio">Precio: $${producto.precio}</p>
      <div class="colorProducto ${nombreColor}"></div>
      <button class="btn btn-danger botonBorrar">Borrar</button>
    `;

        contenedorProductos.appendChild(card);
    });
    //EventListener del boton borrar
    const botonBorrar = document.querySelectorAll(".botonBorrar");
    botonBorrar.forEach((button, index) => {
        button.addEventListener("click", () => deleteProduct(index));
    });
}

// Agregar productos
function agregarProducto() {
    const nombre = document.getElementById("nombre").value;
    const descripcion = document.getElementById("descripcion").value;
    const precio = parseFloat(document.getElementById("precio").value);
    const color = document.getElementById("color").value;

    if (nombre && descripcion && precio && color) {
        const nuevoProducto = {
            nombre: nombre,
            descripcion: descripcion,
            precio: precio,
            color: color,
        };

        productos.push(nuevoProducto);
        mostrarProductos();

        document.getElementById("nombre").value = "";
        document.getElementById("descripcion").value = "";
        document.getElementById("precio").value = "";
        document.getElementById("color").value = "galvanizado";
    }
}
document.getElementById("botonAgregarProd")
    .addEventListener("click", agregarProducto);

// Borrar
function deleteProduct(index) {
    productos.splice(index, 1);
    mostrarProductos();
}

//Calcular precio
function calcularPrecioTotal() {
    const totalprecio = productos.reduce((suma, producto) => suma + producto.precio, 0);

    const precioTotalExistente = document.getElementById("totalprecio");

    const precioTotalParrafo = document.createElement("p");
    precioTotalParrafo.textContent = `Precio total: $${totalprecio}`;
    precioTotalParrafo.setAttribute("id", "totalprecio"); 

    const precioTotalCont = document.getElementById("precioTotalCont");

    if (precioTotalExistente) {
        precioTotalCont.replaceChild(
            precioTotalParrafo,
            precioTotalExistente
        );
    } else {
        precioTotalCont.appendChild(precioTotalParrafo);
    }
}

// Guardar
function guardarCambios() {
    localStorage.setItem("productos", JSON.stringify(productos));
}

// Cargar página con DOMContectLoaded event
document.addEventListener("DOMContentLoaded", () => {
    const guardarProductos = localStorage.getItem("productos");
    if (guardarProductos) {
        productos = JSON.parse(guardarProductos);
    }
    mostrarProductos();
});

// Botones
document.getElementById("calcularPrecioTotal")
    .addEventListener("click", calcularPrecioTotal);
document.getElementById("guardarCambios")
    .addEventListener("click", guardarCambios);
document.getElementById("botonMostrar")
    .addEventListener("click", mostrarAgregar);

//Mostrar/Ocultar
function mostrarAgregar() {
    const agregarProductoForm = document.getElementById("agregarProductoForm");
    agregarProductoForm.classList.toggle("hidden");
}

