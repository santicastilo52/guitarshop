
const modalContainer = document.getElementById('modal-container');
const modalOverlay = document.getElementById('modal-overlay');

const cartBtn = document.getElementById('img-carrito');
const cartCounter = document.getElementById('cart-counter');


const displayCart = () =>{
//sirve para que la pagina suba hacia el carrito
window.scrollTo({
    top: 0,
    behavior: 'smooth'
});
    //limpiar para que no se repita
    modalContainer.innerHTML = " ";
    //le cambiamos el diplay none del styles.css por block
    modalContainer.style.display = "block";
    modalOverlay.style.display = "block";
    //modal Header
    const modalHeader = document.createElement("div");
    const modalClose = document.createElement("div");
    modalClose.innerText = "❌";
    modalClose.className = "modal-close";
    modalHeader.append(modalClose);

    //funcion para cerrar el modal
    modalClose.addEventListener("click",()=>{
        modalContainer.style.display = "none";
        modalOverlay.style.display = "none";
    });

    const modalTitle = document.createElement("div");
    modalTitle.innerText = "Carrito";
    modalTitle.className = "modal-title";
    modalHeader.append(modalTitle);

    modalContainer.append(modalHeader);

    //modal Body
    if(carrito.length > 0){
    carrito.forEach((producto) => {
        const modalBody = document.createElement("div");
        modalBody.className = "modal-body";
        modalBody.innerHTML = `
            <div class="product-cart">
                <img class="product-img" src="${producto.Imagen}" />
                <div class="product-info">
                    <h4>${producto.Nombre}</h4>
                </div>
            <div class="quantity">
                <span class="quantity-btn-decrese">-</span>
                <span class="quantity-input">${producto.Cantidad}</span>
                <span class="quantity-btn-increse">+</span>
            </div>
            <div class="price">
                ${producto.Precio * producto.Cantidad} $
            </div>
            <div class="delete-product">
                X
            </div>
        </div>
        `;
        modalContainer.append(modalBody);

        // Obtén los elementos de botón de decremento e incremento específicos para este producto
        const decreaseBtn = modalBody.querySelector('.quantity-btn-decrese');
        const increaseBtn = modalBody.querySelector('.quantity-btn-increse');

        // Asigna eventos de clic a los botones de decremento e incremento
        decreaseBtn.addEventListener("click", () => {
            if(producto.Cantidad !== 1){
                producto.Cantidad--;
                displayCart();
                displayCartCounter();
            }
            
        });

        increaseBtn.addEventListener("click", () => {
            producto.Cantidad++;
            displayCart(); // Vuelve a renderizar el carrito después de actualizar la cantidad
            displayCartCounter();
        });

        //eliminar 
        const deleteProduct = modalBody.querySelector('.delete-product');
        
        deleteProduct.addEventListener("click", ()=> {
            deleteCarritoProduct(producto.ID);
        });
        
        
    });

    // modal Footer
    //calcular total
    const total = carrito.reduce((acc, el) => acc + el.Precio * el.Cantidad, 0);

    const modalFooter = document.createElement("div");
    modalFooter.className = "modal-footer";
    modalFooter.innerHTML = `
        <div class="total-price">
            Total: $${total}
        </div>
        <button class="btn-primary" id="checkout-btn"> Ir a comprar</button>
        <div id="button-checkout"></div>
    `;
    modalContainer.append(modalFooter);
    
    //Código mercadopago
    const mercadopago = new MercadoPago("TEST-6c60b333-8d12-471b-a351-bc169d8e676f", {
        locale: "es-AR",
    });
    const checkoutButton = modalFooter.querySelector("#checkout-btn");

    checkoutButton.addEventListener("click", function () {

        checkoutButton.remove();

        const orderData = {
            quantity: 1,
            description: "compra de ecommerce",
            price: total,
        };

        fetch("http://localhost:8080/create_preference", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (preference){
            createCheckoutButton(preference.id);
        })
        .catch(function () {
            alert("Unexpected error");
        });
    });

    function createCheckoutButton(preferenceId){

        const bricksBuilder = mercadopago.bricks();

        const renderComponent = async (bricksBuilder) => {
            await bricksBuilder.create(
                "wallet",
                "button-checkout",
            {
                initialization: {
                    preferenceId: preferenceId,

                },
                callbacks: {
                    onError: (error) => console.error(error),
                    onReady: () => {},
                },
            }
            );
        };
        window.checkoutButton = renderComponent(bricksBuilder);
    }


    } else {
    const modalText = document.createElement("h2");
    modalText.className = "modal-body";
    modalText.innerHTML = "Tu carrito esta vacío."
    modalContainer.append(modalText);
}
   
};

cartBtn.addEventListener("click", displayCart);

const deleteCarritoProduct = (id) => {
    const foundId = carrito.findIndex((element)=> element.ID === id);
    if(foundId !== -1){
        carrito.splice(foundId, 1)
        displayCart();
        displayCartCounter();
    }
    
}

//Contador carrito 
const displayCartCounter = () => {
    const cartLength = carrito.reduce((acc, el) => acc + el.Cantidad, 0);
    if(cartLength > 0){
        cartCounter.style.display = "inline";
        //parseInt es para que se ponga 1 y no 01
        cartCounter.innerText = parseInt(cartLength);
    } else {
        cartCounter.style.display = "none";
    }
};