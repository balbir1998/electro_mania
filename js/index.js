import { productsData } from "../data/products.js";
import { accessoriesData } from "../data/accessories.js";
import renderProducts from './utils/renderProducts.js';

const cardsContainer = document.querySelector(".cards-container");
const accessoriesCardsContainer = document.querySelector(".accessories-cards-container");

renderProducts(productsData, cardsContainer);
renderProducts(accessoriesData, accessoriesCardsContainer)