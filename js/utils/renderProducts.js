export default function renderProducts(data, container) {
    let cardHtml = "";
    data.forEach(product => {
        cardHtml += `<div class="card" data-product-id=${product.id}>
                    <div class="card-image">
                        <img src=${product.images[0]} alt="card image">
                    </div>
                    <div>
                        <p class="card-title">${product.title}</p>
                        <span class="price">&#8377;${product.price.toLocaleString({ "en": "IN" })}</span>
                        <div class="card-bottom">
                            <button class="card-btn add-to-cart">Add To Cart</button>
                            <button class="card-btn wishlist"><i class="fa-regular fa-heart"></i> Wishlist</button>
                        </div>
                    </div>
                 </div>`;
    });
    container.innerHTML = cardHtml;
}