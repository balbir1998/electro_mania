export default function renderProducts(data, container) {
    let cardHtml = "";
    data.forEach(product => {
        cardHtml += `<a class="card" href="./product.html?title=${product.title}">
                    <img src=${product.src} alt="card image">
                    <p class="card-title">${product.title}</p>
                    <span class="price">&#8377;${product.price.toLocaleString({ "en": "IN" })}</span>
                    <div class="card-bottom">
                        <button class="card-btn">Add To Cart</button>
                        <button class="card-btn"><i class="fa-regular fa-heart"></i> Wishlist</button>
                    </div>
                 </a>`;
    });
    container.innerHTML = cardHtml;
}