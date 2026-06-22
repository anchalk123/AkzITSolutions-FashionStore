document.addEventListener("DOMContentLoaded", () => {
    updateCount();
    updateHeaderCartCount(); 
    setupCartButtons(); 
});

function updateCount() {
    const count = document.querySelectorAll('.dress-card').length;
    const counterElement = document.getElementById('result-counter');
    if (counterElement) {
        counterElement.innerText = `Showing all ${count} results`;
    }
}

function sortProducts() {
    const grid = document.getElementById('new-grid');
    if (!grid) return;
    
    const cards = Array.from(grid.querySelectorAll('.dress-card'));
    const sortValue = document.getElementById('sort-select').value;

    cards.sort((a, b) => {
        if (sortValue === 'default') {
            return parseInt(a.getAttribute('data-order') || 0) - parseInt(b.getAttribute('data-order') || 0);
        }

        const priceA = parseFloat(a.getAttribute('data-price') || 0);
        const priceB = parseFloat(b.getAttribute('data-price') || 0);

        if (sortValue === 'low-high') return priceA - priceB;
        if (sortValue === 'high-low') return priceB - priceA;
    });

    cards.forEach(card => grid.appendChild(card));
}

function updateHeaderCartCount() {
    let currentCart = JSON.parse(localStorage.getItem('user_shopping_cart')) || [];
    let totalItems = 0;
    currentCart.forEach(item => {
        totalItems += item.quantity;
    });
    const cartCountBadge = document.getElementById('global-cart-badge');
    if (cartCountBadge) {
        cartCountBadge.innerText = totalItems;
    }
}

function setupCartButtons() {
    const overlayButtons = document.querySelectorAll('.btn-cart-trigger');
    
    overlayButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.dress-card');
            const title = card.querySelector('.dress-info h4').innerText;
            const price = card.getAttribute('data-price');
            const image = card.querySelector('.dress-img-holder img').getAttribute('src');
            
            addToCart(title, price, image);
        });
    });
}

function addToCart(title, price, image) {
    let currentCart = JSON.parse(localStorage.getItem('user_shopping_cart')) || [];
    let existingProduct = currentCart.find(item => item.title === title);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        let newProduct = {
            title: title,
            price: '₹' + price, 
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