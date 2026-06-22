function updateNavbarCartCount() {
    let currentCart = JSON.parse(localStorage.getItem('user_shopping_cart')) || [];

    let totalItems = 0;

    currentCart.forEach(item => {
        totalItems += parseInt(item.quantity) || 1;
    });

    const badge = document.getElementById('cart-count-badge');

    if (badge) {
        badge.innerText = totalItems;

        if (totalItems === 0) {
            badge.style.display = 'none';
        } else {
            badge.style.display = 'flex';
        }
    }
}

function universalAddToCart(productName, productPrice, productImage, productSize = "M") {
    let currentCart = JSON.parse(localStorage.getItem('user_shopping_cart')) || [];

    let newProduct = {
        title: productName,
        price: productPrice,
        image: productImage,
        size: productSize,
        quantity: 1
    };

    let existingItem = currentCart.find(item => item.title === newProduct.title && item.size === newProduct.size);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        currentCart.push(newProduct);
    }
    localStorage.setItem('user_shopping_cart', JSON.stringify(currentCart));
    updateNavbarCartCount();

    alert(`${productName} successfully added to bag!`);
}

document.addEventListener("DOMContentLoaded", () => {
    updateNavbarCartCount();
});