document.addEventListener("DOMContentLoaded", () => {
    updateProductCount();
    updateHeaderCartCount(); 
});

function updateProductCount() {
    const totalProducts = document.querySelectorAll('.dress-card').length;
    const counterElement = document.getElementById('result-counter');
    if (counterElement) {
        counterElement.innerText = `Showing all ${totalProducts} results`;
    }
}

function sortProducts() {
    const grid = document.getElementById('dress-grid');
    const cards = Array.from(grid.querySelectorAll('.dress-card'));
    const sortValue = document.getElementById('sort-select').value;

    if (sortValue === 'default') return;

    cards.sort((a, b) => {
        const priceA = parseFloat(a.getAttribute('data-price'));
        const priceB = parseFloat(b.getAttribute('data-price'));

        if (sortValue === 'low-high') {
            return priceA - priceB;
        } else if (sortValue === 'high-low') {
            return priceB - priceA;
        }
    });

    cards.forEach(card => grid.appendChild(card));
}

function updateHeaderCartCount() {
    let currentCart = JSON.parse(localStorage.getItem('user_shopping_cart')) || [];
    let totalItems = 0;
    currentCart.forEach(item => {
        totalItems += item.quantity;
    });
    
    const cartCountBadge = document.getElementById('cart-count-badge');
    if (cartCountBadge) {
        if (totalItems > 0) {
            cartCountBadge.innerText = totalItems;
            cartCountBadge.style.display = 'inline-block'; 
        } else {
            cartCountBadge.style.display = 'none'; 
        }
    }
}

function addToCart(title, price, image) {
    let currentCart = JSON.parse(localStorage.getItem('user_shopping_cart')) || [];
    let existingProduct = currentCart.find(item => item.title === title);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        let newProduct = {
            title: title,
            price: price, 
            image: image,
            size: 'M', 
            quantity: 1
        };
        currentCart.push(newProduct);
    }

    localStorage.setItem('user_shopping_cart', JSON.stringify(currentCart));
    updateHeaderCartCount();
    alert(`🎉 "${title}" has been added to your cart!`);
}