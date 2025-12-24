import { productsData } from "../data/products.js";
import { accessoriesData } from "../data/accessories.js";
import renderProducts from './utils/renderProducts.js';
import { cartBtn, cartData, wishlistData } from "./main.js";
import updateLocalStorage from './utils/updateLocalStorage.js';

const cardsContainer = document.querySelector(".cards-container");
const accessoriesCardsContainer = document.querySelector(".accessories-cards-container");

cardsContainer.addEventListener("click", handleCardsItems);
accessoriesCardsContainer.addEventListener("click", handleCardsItems);

function handleCardsItems(e) {
    if (e.target === e.currentTarget) return;
    const productId = e.target.closest(".card").dataset['productId'];

    if (e.target.classList.contains("add-to-cart")) {
        if (cartData[productId]) {
            if (cartData[productId].quantity >= 4) {
                alert("Limit is 4");
                return;
            }
            cartData[productId].quantity++;
        } else {
            cartData[productId] = { quantity: 1 };
        };
        updateLocalStorage("cartData", cartData);
        alert("Product added to cart");
        cartBtn.classList.add("active-cart");
        document.documentElement.style.cssText = `--cart-itemsCount: "${Object.keys(cartData).length}";`
        return;
    }

    if (e.target.classList.contains("wishlist")) {
        if (wishlistData.includes(productId)) {
            alert("Items is already wishlisted");
            return;
        }

        wishlistData.push(productId);
        updateLocalStorage("wishlistData", wishlistData);
        alert("Item added to wishlist");
        return;
    };

    if (e.target.classList.contains("card-bottom")) return;

    location.href = `./product.html?id=${productId}`;
}

renderProducts(productsData, cardsContainer);
renderProducts(accessoriesData, accessoriesCardsContainer);