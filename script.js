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