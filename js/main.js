import { productsData } from './../data/products.js';

const moveToTopBtn = document.querySelector(".move-to-top");
const categoryMenu = document.querySelector(".category-menu");
const categoryList = document.querySelector(".category-list");
const hamburgurMenu = document.querySelector(".hamburgur-menu");
const navbar = document.querySelector(".navbar");
const responsiveMenuBtn = document.querySelector(".responsive-menu-btn");
const responsiveCatBtn = document.querySelector(".responsive-cat-btn");
const responsiveCatList = document.querySelector(".responsive-cat-list");
const responsiveMenusList = document.querySelector(".responsive-menus-list");
const closeMenusBtn = document.querySelector(".close-menus");
const overlay = document.querySelector(".overlay");
const desktopSearchInp = document.querySelector(".desktop-search input");
const responsiveSearchInp = document.querySelector(".responsive-search input");
export const cartBtn = document.querySelector(".cart-btn");

export const cartData = JSON.parse(localStorage.getItem("cartData")) || {};
export const wishlistData = JSON.parse(localStorage.getItem("wishlistData")) || [];

if (Object.keys(cartData).length) {
    document.documentElement.style.cssText = `--cart-itemsCount: "${Object.keys(cartData).length}"`;
    cartBtn.classList.add("active-cart");
}

window.addEventListener("load", () => window.scrollTo(0, 0));

window.addEventListener("scroll", function () {
    if (document.documentElement.scrollTop >= 120) {
        document.body.classList.add("scroll-active");
    }

    if (document.documentElement.scrollTop <= 80 &&
        document.body.classList.contains("scroll-active")) {
        document.body.classList.remove("scroll-active");
    }

    if (document.documentElement.scrollTop >= 500) {
        moveToTopBtn.classList.add("active");
    } else {
        moveToTopBtn.classList.remove("active");
    }
});


const allCategories = [];
productsData.filter(({ category }) => {
    if (!allCategories.includes(category)) {
        allCategories.push(category);
    }
});

function renderCategories() {
    let categoriesHTML = "";
    allCategories.forEach(category => {
        categoriesHTML += `<li><a href="/category.html?title=${category}">${category}</a></li>`
    });
    categoryList.innerHTML = categoriesHTML;
}

renderCategories();

desktopSearchInp.addEventListener("input", function (e) {
    responsiveSearchInp.value = e.target.value;
});

responsiveSearchInp.addEventListener("input", function (e) {
    desktopSearchInp.value = e.target.value;
});

hamburgurMenu.addEventListener("click", function () {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
});

categoryMenu.addEventListener("click", function () {
    categoryList.classList.toggle("active");
});

responsiveMenuBtn.addEventListener("click", toggleMenuCategory);
responsiveCatBtn.addEventListener("click", toggleMenuCategory)
closeMenusBtn.addEventListener("click", function () {
    navbar.classList.remove("active");
    overlay.classList.remove("active")
});

function toggleMenuCategory() {
    responsiveCatBtn.classList.toggle("active");
    responsiveMenuBtn.classList.toggle("active");
    responsiveCatList.classList.toggle("active");
    responsiveMenusList.classList.toggle("active");
}

overlay.addEventListener("click", function () {
    navbar.classList.remove("active");
    overlay.classList.remove("active");
});