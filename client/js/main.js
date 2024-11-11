//Creamos el array Carrito
let carrito = [];

//Imprimimos Promociones
const mostrarPromociones = () => {
    let texto = " ";
    for(let promo of promociones){
            texto += `
            <div class="promo">
                <img src="${promo.Imagen}" alt="">
                <h3>${promo.Nombre}</h3>
                <p id="promo-desc">${promo.Descripcion}</p>
                <p class="precio-promo">$ ${promo.Precio}</p>
                <button type="button" id="but-promo" onclick="agregarCarrito('${promo.id}' , '${promo.Nombre}' , '${promo.Precio}' , '${promo.Cantidad}' , '${promo.Imagen}')">Agregar al carrito</button>
            </div>
            `;
        }
    document.querySelector('#cards-promociones').innerHTML = texto;
    
};

//Imprimimos las guitarras en el HTML
const mostrarProductos = () =>{
    let texto = " ";
    for(let guitarra of guitarras){
        texto += `
        <div class="product">
            <img src=${guitarra.Imagen} alt="">
            <div class="product-txt">
                <h3>${guitarra.Nombre}</h3>
                <p class="precio">$ ${guitarra.Precio}</p>
                <button type="button" onclick="agregarCarrito('${guitarra.id}' , '${guitarra.Nombre}' , '${guitarra.Precio}' , '${guitarra.Cantidad}' , '${guitarra.Imagen}')">Agregar al carrito</button>
            </div>
        </div>`;
    };

    document.querySelector('.contenedor-productos').innerHTML = texto;
}

//Imprimimos los accesorios en el HTML
const mostrarAccesorios = () => {
    let texto = " ";
    for(let accesorio of accesorios){
        texto += `
        <div class="accesorio">
            <div class="img-acc">
                <img src="${accesorio.Imagen}" alt="">
            </div>
            <div class="txt-acc">
                <h2>${accesorio.Nombre}</h2>
                <p class="acc-des">${accesorio.Descripcion}</p>
                <p class="acc-precio">$ ${accesorio.Precio}</p>
                <button type="button" id="but-acc" onclick="agregarCarrito('${accesorio.id}' , '${accesorio.Nombre}' , '${accesorio.Precio}' , '${accesorio.Cantidad}' , '${accesorio.Imagen}')">Agregar al carrito</button>
            </div>
        </div>`;
    }
    document.querySelector('.contenedor-accesorios').innerHTML = texto;
}


//Agregamos los productos al carrito
const agregarCarrito = (id, Nombre, Precio, Cantidad, Imagen) => {
    const nuevoProducto = {
        ID: id,
        Nombre: Nombre,
        Precio: Precio,
        Cantidad: parseInt(Cantidad), //el parseInt es para correguir el error a la hora de sumar en la bolita roja de cantidad del carrito
        Imagen: Imagen
    };
    //recorremos el carrito para que no haya duplicados
    const repeat = carrito.some((repeatProduct) => repeatProduct.ID === nuevoProducto.ID);
    
    //sirve para que no se repitan los productos
    if (repeat) {
        carrito.map((prod) => {
            if (prod.ID === nuevoProducto.ID) {
                prod.Cantidad++;
                displayCartCounter();
            }
            return prod;
        });
    } else {
        carrito.push(nuevoProducto);
        displayCartCounter();
    }

    // Luego de agregar el producto al carrito, puedes realizar las operaciones adicionales que necesites aquí
    // Por ejemplo, actualizar la interfaz de usuario para mostrar los productos en el carrito
    //actualizarCarritoHTML();
};

// const actualizarCarritoHTML = () => {
//     let carritoHTML = "";
//     for (producto of carrito) {
//         carritoHTML += `
//         <li> Nombre: ${producto.Nombre} 
//             Precio: ${producto.Precio} 
//             Imagen: <img id="guitarra-compra" src="${producto.Imagen}">
//         </li>`;
//     }
//     const agregarCarritoHTML = document.getElementById('carrito');
//     agregarCarritoHTML.innerHTML = carritoHTML;
// };

