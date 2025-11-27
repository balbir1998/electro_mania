const categoryMenu = document.querySelector(".category-menu");
const categoryList = document.querySelector(".category-list");

categoryMenu.addEventListener("click", function () {
    categoryList.classList.toggle("active");
});