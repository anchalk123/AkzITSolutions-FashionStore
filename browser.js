const productsCatalog = [
    { id: "1", title: "Vanilla Cream Ribbed Midi", category: "Women", price: 700.00, img: "image/Vanilla Cream Ribbed Midi.webp" },
    { id: "2", title: "Sage Mist Utility Mini", category: "Women", price: 550.00, img: "image/Sunkissed Midi Dress.webp" },
    { id: "3", title: "Sunset Orange Tiered Maxi", category: "Women", price: 600.00, img: "image/Sunset Orange Tiered Maxi.webp" },
    { id: "4", title: "Premium Wool Blend Blazer", category: "Men", price: 1000.00, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxsbaJTQpkEpsczZH4U9LsCZBSpR7TOcsqWA&s" },
    { id: "5", title: "Classic Tailored Oxford Shirt", category: "Men", price: 650.00, img: "https://assets.myntassets.com/w_360,q_50,,dpr_2,fl_progressive,f_webp/assets/images/2026/FEBRUARY/10/ZU2oNhoe_aadd25e77882447cb07b8495022db693.jpg" },
    { id: "6", title: "Minimalist Ceramic Vase Set", category: "Home & Living", price: 480.00, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6L3ns8iu4UEbJ0-Fk1pqj2H9TwzrImtFhhA&s" },
    { id: "7", title: "Organic Hydrating Face Serum", category: "Beauty", price: 320.00, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP6QkxuVcWGpDTrzDpvTpQ_tGGCukeP0k48w&s" },
    { id: "8", title: "Luxury Leather Shoulder Bag", category: "Accessories", price: 900.00, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHWaS0nUzajLhE7-MJ_JKagbExWlTeZaM4Sw&s" }
];

document.addEventListener("DOMContentLoaded", () => {
    updateCartBadge();

    const urlParams = new URLSearchParams(window.location.search);
    const targetCat = urlParams.get('cat');

    if (targetCat) {
        const items = document.querySelectorAll('.category-item');
        items.forEach(li => {
            if (li.innerText.trim().includes(targetCat)) {
                document.querySelectorAll('.category-item').forEach(el => el.classList.remove('active'));
                li.classList.add('active');
            }
        });
        renderGrid(targetCat);
    } else {
        renderGrid('All');
    }
});

function renderGrid(filterKey) {
    const grid = document.getElementById('master-products-grid');
    if (!grid) return;
    
    grid.innerHTML = '';

    const filteredData = filterKey === 'All'
        ? productsCatalog
        : productsCatalog.filter(item => item.category === filterKey);

    document.getElementById('current-category-title').innerText = filterKey === 'All' ? 'All Products' : filterKey;
    document.getElementById('product-count-badge').innerText = `Showing ${filteredData.length} items`;

    filteredData.forEach(prod => {

        grid.innerHTML += `
            <div class="product-card" style="cursor: default;">
                <div class="card-img-wrapper">
                    <img src="${prod.img}" alt="${prod.title}">
                </div>
                <div class="card-info">
                    <span class="card-category">${prod.category}</span>
                    <h4 class="card-title">${prod.title}</h4>
                    <div class="card-bottom">
                        <span class="card-price">₹${prod.price.toFixed(2)}</span>
                        <div class="card-actions">
                            <button class="view-btn" onclick="addToCart('${prod.id}')">Add To Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
}

function filterProducts(category, element) {
    document.querySelectorAll('.category-item').forEach(el => el.classList.remove('active'));
    element.classList.add('active');
    renderGrid(category);
}

function navigateToDetail(id) {
}

function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    const product = productsCatalog.find(item => item.id === id);
    
    if (product) {
        cart.push(product);
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
        updateCartBadge();
    }
}

function updateCartBadge() {
    const badge = document.getElementById('cart-count');
    if (badge) {
        let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
        badge.innerText = cart.length; 
    }
}