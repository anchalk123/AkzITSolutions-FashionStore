document.addEventListener("DOMContentLoaded", () => {
    renderCartPage();
});

function renderCartPage() {
    let currentCart = JSON.parse(localStorage.getItem('user_shopping_cart')) || [];
    const tableBody = document.getElementById('cart-table-body');
    const layoutContainer = document.getElementById('main-cart-layout');
    const subtotalElement = document.getElementById('bag-subtotal');
    const totalElement = document.getElementById('bag-total');
    if (currentCart.length === 0) {
        if (layoutContainer) {
            layoutContainer.innerHTML = `
                <div class="empty-cart-message" style="grid-column: span 2; text-align: center; padding: 50px 20px; width: 100%;">
                    <i class="fa-solid fa-bag-shopping" style="font-size: 48px; color: #757575; margin-bottom: 15px;"></i>
                    <h2>Your Shopping Bag is empty</h2>
                    <p style="color: #757575; margin-bottom: 20px;">Looks like you haven't added anything to your cart yet.</p>
                    <a href="shop.html" class="btn-shop-back" style="display: inline-block; padding: 10px 25px; background: #123026; color: white; text-decoration: none; border-radius: 4px;">Continue Shopping</a>
                </div>
            `;
        }
        if (subtotalElement) subtotalElement.innerText = "₹0.00";
        if (totalElement) totalElement.innerText = "₹0.00";
        return;
    }

    if (!tableBody) return;
    tableBody.innerHTML = '';
    let grandTotal = 0;

    currentCart.forEach((item, index) => {
        if (item.title === "Minimal Sneakers") {
            item.price = "₹2000.00";
        }

        let priceString = item.price ? item.price.toString() : "0";
        let purePrice = parseFloat(priceString.replace(/[₹$ ,]/g, '')) || 0;
        let subTotal = purePrice * item.quantity;
        grandTotal += subTotal;

        tableBody.innerHTML += `
            <tr class="cart-row">
                <td>
                    <div class="product-cell">
                        <img src="${item.image}" alt="${item.title}">
                        <div class="cart-item-info">
                            <h4>${item.title}</h4>
                            <p>Size: <strong>${item.size || 'M'}</strong></p>
                        </div>
                    </div>
                </td>
                <td class="price-cell">₹${purePrice.toFixed(2)}</td>
                <td class="qty-cell">
                    <div class="qty-controller" style="display: flex; align-items: center; gap: 10px;">
                        <button onclick="changeQuantity(${index}, -1)" style="width: 28px; height: 28px; border: 1px solid #ccc; background: #fff; cursor: pointer; border-radius: 4px; font-weight: bold;">-</button>
                        <span style="font-weight: 600; min-width: 20px; text-align: center;">${item.quantity}</span>
                        <button onclick="changeQuantity(${index}, 1)" style="width: 28px; height: 28px; border: 1px solid #ccc; background: #fff; cursor: pointer; border-radius: 4px; font-weight: bold;">+</button>
                    </div>
                </td>
                <td class="total-cell">₹${subTotal.toFixed(2)}</td>
                <td>
                    <button class="remove-btn" onclick="removeItemFromCart(${index})">
                        <i class="fa-regular fa-trash-can"></i>
                    </button>
                </td>
            </tr>
        `;
    });

    if (subtotalElement) subtotalElement.innerText = `₹${grandTotal.toFixed(2)}`;
    if (totalElement) totalElement.innerText = `₹${grandTotal.toFixed(2)}`;
}

function changeQuantity(targetIndex, amount) {
    let currentCart = JSON.parse(localStorage.getItem('user_shopping_cart')) || [];
    
    if (currentCart[targetIndex]) {
        currentCart[targetIndex].quantity += amount;

        if (currentCart[targetIndex].quantity <= 0) {
            currentCart.splice(targetIndex, 1);
        }

        localStorage.setItem('user_shopping_cart', JSON.stringify(currentCart));
        renderCartPage();
    }
}

function removeItemFromCart(targetIndex) {
    let currentCart = JSON.parse(localStorage.getItem('user_shopping_cart')) || [];
    currentCart.splice(targetIndex, 1);
    localStorage.setItem('user_shopping_cart', JSON.stringify(currentCart));
    renderCartPage();
}