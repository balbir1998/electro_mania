import renderProducts from './utils/renderProducts.js';
import { productsData } from './../data/products.js';
const productImagesParent = document.querySelectorAll(".product-image-conatiner .product-img");
const selectImages = document.querySelector(".images-list");
const quantityContainer = document.querySelector(".quantity-section");
const increamentBtn = document.querySelector(".increament");
const decreamentBtn = document.querySelector(".decreament");
const quanityInp = document.querySelector(".quantity-section input");
const ratings = document.querySelector(".ratings");
const cardsContainer = document.querySelector(".cards-container");

renderProducts(productsData.slice(0, 5), cardsContainer);

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
            e.target.value = 1;
            quantityContainer.classList.remove("active-before");
        }, 1500);
    }
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