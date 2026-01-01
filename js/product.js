import { productsData } from './../data/products.js';
import { handleCardsItems } from './utils/handleCards.js';
import updateLocalStorage from './utils/updateLocalStorage.js';
import renderProducts from './utils/renderProducts.js';
import {
    cartData,
    wishlistData,
    getResponsiveSearchInp,
    getDesktopSearchInp,
    getCartBtn
} from '../js/main.js';

const productImagesParent = document.querySelectorAll(".product-image-conatiner .product-img");
const selectImages = document.querySelector(".images-list");
const quantityContainer = document.querySelector(".quantity-section");
const increamentBtn = document.querySelector(".increament");
const decreamentBtn = document.querySelector(".decreament");
const quanityInp = document.querySelector(".quantity-section input");
const ratings = document.querySelector(".ratings");
const addToCartBtn = document.querySelector(".add-to-cart-btn");
const wishlistBtn = document.querySelector(".wishlist-btn");
const cardsContainer = document.querySelector(".cards-container");
const productTitle = document.querySelector(".product-title");
const productDesc = document.querySelector(".description");
const productCategory = document.querySelector(".category");
const productSpecs = document.querySelector(".specs");
const productStock = document.querySelector(".availability");
const productsPrice = document.querySelector(".product-price");

const searchParams = new URLSearchParams(location.search);
const productId = searchParams.get("id");
const isSearch = JSON.parse(searchParams.get("search"));

if (productId) {
    const product = productsData.find(product => product.id === productId);

    const { images, title, description, category, specifications, price, stock } = product;

    if (isSearch) {
        window.addEventListener("load", () => {
            getDesktopSearchInp().value = product.title;
            getResponsiveSearchInp().value = product.title;
        });
    }

    productImagesParent.forEach((parent, idx) => parent.children[0].src = images[idx]);
    [...selectImages.children].forEach((img, idx) => img.src = images[idx]);

    productTitle.innerText = title;
    productDesc.innerText = description;
    productCategory.innerHTML = `<strong>Category: </strong>${category}`;

    let specsHtml = "";
    Object.entries(specifications).forEach(([key, value]) => {
        specsHtml += `  <li><strong>${key}:</strong> ${value}</li>`
    });
    productSpecs.innerHTML = specsHtml;
    productsPrice.innerHTML = `<strong>&#8377;</strong>${price.toLocaleString("en-IN")}`;
    productStock.innerText = stock ? "(In Stock)" : "(Out of Stock)";

    document.querySelector("title").innerText = `${title[0].toUpperCase() + title.slice(1)} - Electro Mania`;

    const relatedproducts = productsData.filter(item => {
        if (item.category === product.category && item.id !== product.id) return item;
    });

    if (relatedproducts.length) {
        renderProducts(relatedproducts, cardsContainer);
        cardsContainer.addEventListener("click", handleCardsItems);
    }
}

selectImages.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) return;

    [...selectImages.children].find(img => img.className === "active" && img.classList.remove("active"));
    const imgIdx = [...selectImages.children].indexOf(e.target);
    e.target.classList.add("active");
    productImagesParent.forEach(img => {
        img.style.transform = `translateX(-${imgIdx * 100}%)`;
    });
});

increamentBtn.addEventListener("click", () => {
    if (parseInt(quanityInp.value) === 4) {
        quantityContainer.classList.add("active-before");
        return;
    };
    quanityInp.value = parseInt(quanityInp.value) + 1;
});

decreamentBtn.addEventListener("click", () => {
    if (parseInt(quanityInp.value) === 1) return;
    if (quantityContainer.classList.contains("active-before")) {
        quantityContainer.classList.remove("active-before");
    }
    quanityInp.value = parseInt(quanityInp.value) - 1;
});

quanityInp.addEventListener("focus", () => {
    if (quantityContainer.classList.contains("active-before")) {
        quantityContainer.classList.remove("active-before");
    }
});

quanityInp.addEventListener("keypress", (e) => {
    if (/\D/.test(e.key)) return e.preventDefault();
});

quanityInp.addEventListener("blur", (e) => {
    if (!(e.target.value) || parseInt(e.target.value) < 1) {
        e.target.value = 1;
        return;
    }

    if (parseInt(e.target.value) > 4) {
        quantityContainer.classList.add("active-before");
        setTimeout(() => {
            e.target.value = 4;
            quantityContainer.classList.remove("active-before");
        }, 1500);
    }
});

addToCartBtn.addEventListener("click", () => {
    const productQuantity = parseInt(quanityInp.value);
    if (cartData[productId]) {

        if (cartData[productId].quantity === 4) {
            alert("Product count is already 4 in the cart!");
            return;
        }

        const totalQuantity = productQuantity + cartData[productId].quantity;

        if (totalQuantity > 4) {
            alert(`Product count in cart is already ${cartData[productId].quantity}, You can only add ${4 - cartData[productId].quantity} more!`);
            quanityInp.value = 4 - cartData[productId].quantity;
            return;
        }

        cartData[productId].quantity = totalQuantity;
    } else {
        cartData[productId] = { quantity: productQuantity };
    }
    updateLocalStorage("cartData", cartData);
    alert("Product is added in cart!");
    document.documentElement.style.cssText = `--cart-itemsCount: "${Object.keys(cartData).length}";`
    window.onload = getCartBtn().classList.add("active-cart");
});

wishlistBtn.addEventListener("click", () => {
    if (wishlistData.includes(productId)) {
        alert("Items is already wishlisted");
        return;
    }

    wishlistData.push(productId);
    updateLocalStorage("wishlistData", wishlistData);
    alert("Item added to wishlist");
});

//on hover color stars
ratings.addEventListener("mouseover", (e) => {
    if (e.target === e.currentTarget || parseInt(e.target.id) <= starRatingCount) return;
    updateStarRating(ratings, e.target.id);
});


// onclick update the startRatingCount value
ratings.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) return;

    if (parseInt(starRatingCount) === 1 && parseInt(e.target.id) === 1) {
        starRatingCount = 0;
        [...ratings.children].forEach(el => el.className = "fa-regular fa-star");
        return;
    }
    starRatingCount = parseInt(e.target.id);
    updateStarRating(ratings, starRatingCount);
});


//after mouse leave again update rating based on startRatingCount value
ratings.addEventListener("mouseleave", (e) => {
    if (e.target !== e.currentTarget) return;
    updateStarRating(ratings, starRatingCount);
});


function updateStarRating(ratings, count) {
    [...ratings.children].forEach(el => {
        if (parseInt(el.id) <= parseInt(count)) {
            el.className = "fa-solid fa-star";
        } else {
            el.className = "fa-regular fa-star"
        }
    });
};