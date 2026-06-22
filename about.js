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
    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll('.dress-card'));
    const sortValue = document.getElementById('sort-select').value;

    if (sortValue === 'default') return;

    cards.sort((a, b) => {
        const priceA = parseFloat(a.getAttribute('data-price') || 0);
        const priceB = parseFloat(b.getAttribute('data-price') || 0);

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
    const cartCountBadge = document.getElementById('cart-count-badge') || document.getElementById('global-cart-badge');
    
    if (cartCountBadge) {
        if (totalItems > 0) {
            cartCountBadge.innerText = totalItems;
            cartCountBadge.style.display = 'flex'; 
        } else {
            cartCountBadge.innerText = '0';
        }
    }
}

function addToCart(title, price, image) {
    let currentCart = JSON.parse(localStorage.getItem('user_shopping_cart')) || [];
    let existingProduct = currentCart.find(item => item.title === title);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        let cleanPrice = price.toString().replace(/[₹$ ,]/g, '');
        
        let newProduct = {
            title: title,
            price: '₹' + parseFloat(cleanPrice).toFixed(2), 
            image: image,
            size: 'M', 
            quantity: 1
        };
        currentCart.push(newProduct);
    }

    localStorage.setItem('user_shopping_cart', JSON.stringify(currentCart));
    updateHeaderCartCount();
    alert(`🎉 "${title}" has been added to your cart in Rupees!`);
}