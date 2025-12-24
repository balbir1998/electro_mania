import { wishlistData } from './main.js';
import { productsData } from '../data/products.js';
import { accessoriesData } from './../data/accessories.js';
import updateLocalStorage from './utils/updateLocalStorage.js';

const wishlistStatus = document.querySelector(".wishlist-status");
const wishlistTable = document.querySelector(".wishlist-table");
const cardsParent = document.querySelector(".mobile-wishlist-container");
const tableBody = document.querySelector(".table-body");
const main = document.querySelector("main");

const allItems = [...productsData, ...accessoriesData];

if (wishlistData.length) {
    let tableHtml = "";
    let cardHtml = "";

    wishlistData.forEach(productId => {
        allItems.find(item => {
            if (item.id === productId) {
                tableHtml += renderTableData(item);
                cardHtml += renderCardData(item);
            }
        })
    });

    tableBody.innerHTML = tableHtml;
    cardsParent.innerHTML = cardHtml;
    wishlistTable.classList.add("active");
    main.style.marginBottom = "unset"
} else {
    wishlistStatus.classList.add("empty");
    main.style.marginBottom = "200px"
}

tableBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
        const row = e.target.closest(".row");
        const productId = row.dataset.productId;

        const idx = wishlistData.indexOf(productId);
        wishlistData.splice(idx, 1);
        updateLocalStorage("wishlistData", wishlistData);

        const card = cardsParent.querySelector(`[data-product-id="${productId}"]`);
        row.remove();
        card.remove();

        if (wishlistData.length === 0) {
            wishlistStatus.classList.add("empty");
            wishlistTable.classList.remove("active");
            main.style.marginBottom = "200px";
        }
    }
});

cardsParent.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
        const parentCard = e.target.closest(".wishlist-card");
        const productId = parentCard.dataset.productId;

        const idx = wishlistData.indexOf(productId);
        wishlistData.splice(idx, 1);
        updateLocalStorage("wishlistData", wishlistData);

        const tableRow = tableBody.querySelector(`[data-product-id="${productId}"]`);
        parentCard.remove();
        tableRow.remove();


        if (wishlistData.length === 0) {
            wishlistStatus.classList.add("empty");
            wishlistTable.classList.remove("active");
            main.style.marginBottom = "200px";
        }
    }
});

function renderTableData({ id, src, stock, title, price }) {
    return `<tr class="row" data-product-id=${id}>
                <td><img src=${src} alt="image"></td>
                <td class="title">${title}</td>
                <td><span class="product-price">&#8377; ${price.toLocaleString("en-IN")}</span></td>
                <td><span class="stock">${stock ? "In Stock" : "Out of stock"}</span></td>
                <td><a href="./product.html?id=${id}" class="wishlist-btns view-detail-btn">View Deatils</a></td>
                <td><i class="fa-solid fa-xmark remove-btn"></i></td>
            </tr>`;
}

function renderCardData({ id, src, stock, title, price }) {
    return `<div class="wishlist-card" data-product-id=${id}>
                <img src=${src} alt="image">
                <div class="card-content">
                    <h3 class="title">${title}</h3>
                    <p><span class="product-price">&#8377; ${price.toLocaleString("en-IN")}</span></p>
                    <span class="stock">${stock ? "In Stock" : "Out of stock"}</span>
                    <div class="btns-container">
                        <a href="./product.html?id=${id}" class="wishlist-btns view-detail-btn">View Detail</a>
                        <button class="wishlist-btns remove-btn">Remove</button>
                    </div>
                </div>
            </div>`;
}