import { productsData } from './../data/products.js';
import { cartData, getCartBtn } from './main.js';
import updateLocalStorage from './utils/updateLocalStorage.js';

const productList = document.querySelector(".product-list");
const itemCount = document.querySelector(".item-count");
const subTotal = document.querySelector(".subtotal p span");
const total = document.querySelector(".total p span");
const main = document.querySelector("main");
let length = productList.children.length;

itemCount.innerText = `You have ${length} item${length > 1 ? "s" : ""} in your cart`;
main.style.marginBottom = "200px";

if (Object.keys(cartData).length) {
    let cardsHtml = "";
    let cartTotalPrice = 0;

    Object.entries(cartData).forEach((cartItem, idx) => {
        productsData.find(product => {
            if (cartItem[0] === product.id) {
                cardsHtml += renderCartItems(product, cartItem, idx + 1);
                //calculate totalPrice of each product based on quantity
                cartTotalPrice += product.price * cartItem[1].quantity;
            }
        });
    });

    productList.innerHTML = cardsHtml;
    subTotal.innerText = cartTotalPrice.toLocaleString("en-IN");
    total.innerText = cartTotalPrice.toLocaleString("en-IN");

    productList.parentElement.classList.add("active");

    length = productList.children.length;
    itemCount.innerText = `You have ${length} item${length > 1 ? "s" : ""} in your cart`;
    main.style.marginBottom = "2rem";

    addEvents(document.querySelectorAll("input[type='number']"));
}

productList.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) return;
    // remove cart product from cart page and local storage
    if (e.target.classList.contains("remove-product-btn")) {
        const parentElement = e.target.closest(".cart-product")

        Object.keys(cartData).find(id => {
            if (id === parentElement.dataset["productId"]) {
                delete cartData[id];
                return;
            }
        });

        calculateTotalPrice();

        updateLocalStorage("cartData", cartData);
        parentElement.remove();
        document.documentElement.style.cssText = `--cart-itemsCount: "${Object.keys(cartData).length}";`

        length = productList.children.length;
        itemCount.innerText = `You have ${length} item${length > 1 ? "s" : ""} in your cart`;

        if (length === 0) {
            productList.parentElement.classList.remove("active");
            main.style.marginBottom = "200px";
            window.onload = getCartBtn().classList.remove("active-cart");
        }
    };
});



function addEvents(inputList) {

    inputList.forEach(input => {
        const productId = input.closest(".cart-product").dataset.productId;

        input.addEventListener("keypress", (e) => {
            if (/\D/.test(e.key)) return e.preventDefault();
        });


        input.addEventListener("input", (e) => {
            const productQuantity = parseInt(e.target.value);
            if (productQuantity !== cartData[productId].quantity &&
                productQuantity > 0 && productQuantity <= 4) {

                cartData[productId].quantity = productQuantity;
                updateLocalStorage("cartData", cartData);

                calculateTotalPrice();
            };
        });

        input.addEventListener("change", (e) => {
            cartData[productId].quantity = parseInt(e.target.value);
            updateLocalStorage("cartData", cartData);

            calculateTotalPrice();
        });

        input.addEventListener("blur", (e) => {
            if (!(e.target.value) || parseInt(e.target.value) < 1) {
                e.target.value = 1;
                cartData[productId].quantity = 1;
                updateLocalStorage("cartData", cartData);
                calculateTotalPrice();
                return;
            }

            if (parseInt(e.target.value) > 4) {
                input.parentElement.classList.add("active-before");
                cartData[productId].quantity = 4;
                updateLocalStorage("cartData", cartData);
                calculateTotalPrice();

                setTimeout(() => {
                    e.target.value = 4;
                    input.parentElement.classList.remove("active-before");
                }, 1500);
            }
        });
    });
}

function calculateTotalPrice() {
    let totalPrice = 0;
    Object.entries(cartData).forEach(cartItem => {
        productsData.find(product => {
            if (cartItem[0] === product.id) totalPrice += product.price * cartItem[1].quantity;
        });
    });

    subTotal.innerText = totalPrice.toLocaleString("en-IN");
    total.innerText = totalPrice.toLocaleString("en-IN");
}

function renderCartItems(product, cartItem, idx) {
    return `
        <div class="cart-product" data-product-id=${product.id}>
        <a href="./product.html?id=${product.id}">
            <img src=${product.images[0]} alt="image">
        </a>
         <div class="product-info">
             <div class="product-text">
                 <h1>${product.title}</h1>
                 <p class="price">&#8377; ${product.price.toLocaleString("en-IN")}</p>
                 <div class="quantity">
                     <label for="quantity-${idx}">Quantity:</label>
                     <input type="number" id="quantity-${idx}" value=${cartItem[1].quantity} min="1" max="4">
                 </div>
             </div>
             <button class="remove-product-btn">Remove</button>
         </div>
        </div>`;
}
