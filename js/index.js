import { productsData } from "../data/products.js";
import { accessoriesData } from "../data/accessories.js";
import renderProducts from './utils/renderProducts.js';
import { handleCardsItems } from './utils/handleCards.js';

const cardsContainer = document.querySelector(".cards-container");
const accessoriesCardsContainer = document.querySelector(".accessories-cards-container");

cardsContainer.addEventListener("click", handleCardsItems);
accessoriesCardsContainer.addEventListener("click", handleCardsItems);

renderProducts(productsData, cardsContainer);
renderProducts(accessoriesData, accessoriesCardsContainer);