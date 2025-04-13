class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.cartContainer = document.querySelector('.cart-items');
        this.summaryContainer = document.querySelector('.cart-summary');
        this.bindEvents();
        this.render();
    }

    bindEvents() {
        // Event delegation for cart item interactions
        if (this.cartContainer) {
            this.cartContainer.addEventListener('click', (e) => {
                const target = e.target;
                
                if (target.classList.contains('quantity-btn')) {
                    const itemId = target.closest('.cart-item').dataset.id;
                    if (target.classList.contains('decrease')) {
                        this.updateQuantity(itemId, 'decrease');
                    } else if (target.classList.contains('increase')) {
                        this.updateQuantity(itemId, 'increase');
                    }
                }
                
                if (target.classList.contains('remove-btn')) {
                    const itemId = target.closest('.cart-item').dataset.id;
                    this.removeItem(itemId);
                }
            });
        }

        // Event listener for checkout button
        const checkoutBtn = document.querySelector('.checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => this.checkout());
        }
    }

    addItem(item) {
        const existingItem = this.items.find(i => i.id === item.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
            this.showNotification('Item quantity updated in cart');
        } else {
            this.items.push({ ...item, quantity: 1 });
            this.showNotification('Item added to cart');
        }
        
        this.saveCart();
        this.render();
    }

    updateQuantity(itemId, action) {
        const item = this.items.find(i => i.id === itemId);
        if (!item) return;

        if (action === 'increase') {
            item.quantity += 1;
        } else if (action === 'decrease') {
            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                this.removeItem(itemId);
                return;
            }
        }

        this.saveCart();
        this.render();
    }

    removeItem(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
        this.showNotification('Item removed from cart');
        this.saveCart();
        this.render();
    }

    calculateTotal() {
        const subtotal = this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        const deliveryCharge = subtotal >= 500 ? 0 : 50;
        const total = subtotal + deliveryCharge;

        return {
            subtotal,
            deliveryCharge,
            total
        };
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        // Trigger reflow for animation
        notification.offsetHeight;
        notification.classList.add('show');

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }

    renderEmptyCart() {
        return `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h2>Your cart is empty</h2>
                <a href="products.html" class="continue-shopping">Continue Shopping</a>
            </div>
        `;
    }

    renderCartItems() {
        return this.items.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <p class="price">₹${item.price}</p>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn decrease">-</button>
                    <input type="number" class="quantity" value="${item.quantity}" readonly>
                    <button class="quantity-btn increase">+</button>
                </div>
                <button class="remove-btn"><i class="fas fa-trash"></i></button>
            </div>
        `).join('');
    }

    renderSummary() {
        const { subtotal, deliveryCharge, total } = this.calculateTotal();
        
        return `
            <h2>Cart Summary</h2>
            <div class="summary-details">
                <div class="summary-row">
                    <span>Subtotal</span>
                    <span>₹${subtotal.toFixed(2)}</span>
                </div>
                <div class="summary-row">
                    <span>Delivery Charge</span>
                    <span>₹${deliveryCharge.toFixed(2)}</span>
                </div>
                <div class="summary-row total">
                    <span>Total</span>
                    <span>₹${total.toFixed(2)}</span>
                </div>
            </div>
            <button class="checkout-btn">Proceed to Checkout</button>
            <p class="delivery-note">
                ${subtotal >= 500 ? 'Free delivery applied!' : 'Free delivery on orders above ₹500'}
            </p>
        `;
    }

    render() {
        if (this.cartContainer) {
            this.cartContainer.innerHTML = this.items.length ? this.renderCartItems() : this.renderEmptyCart();
        }
        
        if (this.summaryContainer) {
            this.summaryContainer.innerHTML = this.items.length ? this.renderSummary() : '';
        }

        // Update cart count in navigation
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems ? 'inline' : 'none';
        }
    }

    checkout() {
        if (this.items.length === 0) {
            this.showNotification('Your cart is empty');
            return;
        }

        // Here you would typically integrate with a payment gateway
        // For now, we'll just show a success message and clear the cart
        this.showNotification('Order placed successfully!');
        this.items = [];
        this.saveCart();
        this.render();
        
        // Redirect to a thank you page or show a success modal
        setTimeout(() => {
            window.location.href = 'thank-you.html';
        }, 2000);
    }
}

// Initialize cart when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.cart = new Cart();
});

// Add to cart functionality for product pages
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
        const productCard = e.target.closest('.product-card');
        if (!productCard) return;

        const product = {
            id: productCard.dataset.id,
            name: productCard.querySelector('.product-name').textContent,
            price: parseFloat(productCard.querySelector('.product-price').dataset.price),
            image: productCard.querySelector('img').src,
            description: productCard.querySelector('.product-description').textContent
        };

        window.cart.addItem(product);
    }
}); 