import { productsData } from './../data/products.js';
import renderProducts from './utils/renderProducts.js';
const cardsContainer = document.querySelector(".cards-container");
const categoryTitle = document.querySelector(".category-title");

const category = new URLSearchParams(location.search).get("title");
categoryTitle.innerText = category;

const filterProducts = productsData.filter(product => category.toLowerCase() === product.category.toLowerCase());
renderProducts(filterProducts, cardsContainer);