import { productsData } from './../data/products.js';
import { loadHtml } from './utils/loadHtml.js';

export const cartData = JSON.parse(localStorage.getItem("cartData")) || {};
export const wishlistData = JSON.parse(localStorage.getItem("wishlistData")) || [];

let desktopSearchInp;
let responsiveSearchInp;
let cartBtn;
const header = document.querySelector("header");
const footer = document.querySelector("footer");

export const getDesktopSearchInp = () => desktopSearchInp;
export const getResponsiveSearchInp = () => responsiveSearchInp;
export const getCartBtn = () => cartBtn;

window.addEventListener("load", () => window.scrollTo(0, 0));

header.classList.add("navbar-container");
footer.classList.add("footer-section");

(async () => {
    const [headerHtml, footerHtml] = await Promise.all([
        loadHtml("./header.html"),
        loadHtml("./footer.html")
    ]);

    header.innerHTML = headerHtml;
    footer.innerHTML = footerHtml;

    desktopSearchInp = document.querySelector(".desktop-search input");
    responsiveSearchInp = document.querySelector(".responsive-search input");
    cartBtn = document.querySelector(".cart-btn");

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
    const searchQuries = document.querySelectorAll(".search-queries");

    if (Object.keys(cartData).length) {
        document.documentElement.style.cssText = `--cart-itemsCount: "${Object.keys(cartData).length}"`;
        cartBtn.classList.add("active-cart");
    }

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
        handleSearchInput(e.target.value);
    });

    responsiveSearchInp.addEventListener("input", function (e) {
        desktopSearchInp.value = e.target.value;
        handleSearchInput(e.target.value);
    });

    desktopSearchInp.addEventListener("focus", (e) => handleSearchInput(e.target.value));
    responsiveSearchInp.addEventListener("focus", (e) => handleSearchInput(e.target.value));

    searchQuries.forEach(queryContainer => {
        queryContainer.addEventListener("mousedown", (e) => {
            if (e.target === e.currentTarget) return;
            const productId = e.target.dataset.searchId;
            location.href = `./product.html?id=${productId}&search=true`;
        });
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

    function handleSearchInput(query) {
        if (!query) {
            searchQuries.forEach(queryContainer => queryContainer.innerHTML = "");
            return;
        }

        let queriesHtml = "";

        productsData.filter(product => product.title.toLowerCase().includes(query.toLowerCase()))
            .forEach(product => {
                queriesHtml += `<p data-search-id="${product.id}">
                                <i class="fa-solid fa-magnifying-glass"></i> ${product.title}
                            </p>`;
            });

        searchQuries.forEach(queryContainer => queryContainer.innerHTML = queriesHtml);
    }
})();