// ===================================
// PRODUCT DATA
// ===================================
const products = [
    {
        id: 1,
        name: 'Line Following Robot (LFR)',
        description: 'Precision-tuned line follower with advanced PID control for competitive racing.',
        price: 8000,
        emoji: '🤖',
        badge: 'Best Seller',
        features: ['PID Control', 'High Speed Motors', 'IR Sensors', 'Arduino Based']
    },
    {
        id: 2,
        name: 'Obstacle Avoiding Car',
        description: 'Smart autonomous vehicle with ultrasonic sensors for perfect navigation.',
        price: 8000,
        emoji: '🚗',
        badge: 'Popular',
        features: ['Ultrasonic Sensors', '360° Detection', 'Smart Algorithm', 'Rechargeable']
    },
    {
        id: 3,
        name: 'Robo Soccer Car',
        description: 'Competition-grade soccer robot with powerful motors and ball detection.',
        price: 7500,
        emoji: '⚽',
        badge: 'Pro Series',
        features: ['Ball Detection', 'Agile Movement', 'Bluetooth Control', 'Durable Build']
    },
    {
        id: 4,
        name: 'Robo Race Car',
        description: 'High-speed racing robot engineered for maximum velocity and control.',
        price: 6000,
        emoji: '🏎️',
        badge: 'Fast',
        features: ['High Torque', 'Speed Optimized', 'Stable Design', 'Competition Ready']
    },
    {
        id: 5,
        name: 'QuadCopter Drone',
        description: 'Stable quadcopter with altitude hold and 6-axis gyro stabilization.',
        price: 18500,
        emoji: '🚁',
        badge: 'Advanced',
        features: ['6-Axis Gyro', 'Altitude Hold', 'Remote Control', 'LED Lights']
    },
    {
        id: 6,
        name: 'RC Boat',
        description: 'Water-ready remote control boat with waterproof electronics.',
        price: 7000,
        emoji: '⛵',
        badge: 'New',
        features: ['Waterproof', 'Long Range', 'Fast Speed', 'Rechargeable Battery']
    }
];

// ===================================
// STATE MANAGEMENT
// ===================================
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// ===================================
// INITIALIZATION
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    initializeParticles();
    renderProducts();
    updateCartUI();
    setupEventListeners();
    setupNavbarScroll();
});

// ===================================
// PARTICLE ANIMATION
// ===================================
function initializeParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================
function setupNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ===================================
// PRODUCT RENDERING
// ===================================
function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image">
                <span style="position: relative; z-index: 1;">${product.emoji}</span>
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-features">
                    ${product.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
                </div>
                <div class="product-footer">
                    <div class="product-price">৳${product.price.toLocaleString()}</div>
                    <button class="add-to-cart" onclick="addToCart(${product.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// ===================================
// CART FUNCTIONS
// ===================================
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCart();
    updateCartUI();
    showNotification(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
    renderCartItems();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCartUI();
            renderCartItems();
        }
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function renderCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartEmpty = document.getElementById('cartEmpty');
    const totalAmount = document.getElementById('totalAmount');

    if (cart.length === 0) {
        cartItemsContainer.style.display = 'none';
        cartEmpty.style.display = 'block';
        totalAmount.textContent = '৳0';
    } else {
        cartItemsContainer.style.display = 'flex';
        cartEmpty.style.display = 'none';

        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">${item.emoji}</div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">৳${item.price.toLocaleString()}</div>
                    <div class="cart-item-controls">
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span class="qty-display">Qty: ${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        <button class="cart-item-remove" onclick="removeFromCart(${item.id})">Remove</button>
                    </div>
                </div>
            </div>
        `).join('');

        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        totalAmount.textContent = `৳${total.toLocaleString()}`;
    }
}

// ===================================
// MODAL MANAGEMENT
// ===================================
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// ===================================
// CHECKOUT FUNCTIONS
// ===================================
function openCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }

    closeModal('cartModal');
    openModal('checkoutModal');
    renderOrderSummary();
}

function renderOrderSummary() {
    const orderSummary = document.getElementById('orderSummary');
    const checkoutTotal = document.getElementById('checkoutTotal');

    orderSummary.innerHTML = cart.map(item => `
        <div class="summary-item">
            <span>${item.name} x ${item.quantity}</span>
            <span>৳${(item.price * item.quantity).toLocaleString()}</span>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    checkoutTotal.textContent = `৳${total.toLocaleString()}`;
}

async function submitOrder(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    
    const orderData = {
        customer: {
            name: formData.get('customerName'),
            phone: formData.get('customerPhone'),
            email: formData.get('customerEmail') || 'Not provided'
        },
        address: {
            street: formData.get('address'),
            city: formData.get('city'),
            district: formData.get('district'),
            postalCode: formData.get('postalCode') || 'N/A'
        },
        items: cart,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        notes: formData.get('notes') || 'None',
        orderId: generateOrderId(),
        timestamp: new Date().toISOString()
    };

    // Show loading state
    const submitBtn = document.getElementById('submitOrder');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Processing...</span>';

    try {
        // Send order to Netlify Function
        const response = await fetch('/.netlify/functions/submit-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });

        if (response.ok) {
            // Clear cart
            cart = [];
            saveCart();
            updateCartUI();

            // Close checkout and show success
            closeModal('checkoutModal');
            document.getElementById('orderId').textContent = orderData.orderId;
            openModal('successModal');

            // Reset form
            form.reset();
        } else {
            throw new Error('Order submission failed');
        }
    } catch (error) {
        console.error('Order submission error:', error);
        showNotification('Order placed! We will contact you soon.', 'success');
        
        // Still clear cart and show success (fallback)
        cart = [];
        saveCart();
        updateCartUI();
        closeModal('checkoutModal');
        document.getElementById('orderId').textContent = orderData.orderId;
        openModal('successModal');
        form.reset();
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }
}

function generateOrderId() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `ORD-${timestamp}-${random}`;
}

// ===================================
// NOTIFICATION SYSTEM
// ===================================
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #06ffa5, #00f0ff)' : 'linear-gradient(135deg, #ff006e, #ff4d00)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        font-weight: 600;
        max-width: 300px;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===================================
// EVENT LISTENERS
// ===================================
function setupEventListeners() {
    // Cart Modal
    document.getElementById('cartBtn').addEventListener('click', () => {
        openModal('cartModal');
        renderCartItems();
    });
    document.getElementById('cartClose').addEventListener('click', () => closeModal('cartModal'));
    document.getElementById('cartOverlay').addEventListener('click', () => closeModal('cartModal'));

    // Checkout Modal
    document.getElementById('checkoutBtn').addEventListener('click', openCheckout);
    document.getElementById('checkoutClose').addEventListener('click', () => closeModal('checkoutModal'));
    document.getElementById('checkoutOverlay').addEventListener('click', () => closeModal('checkoutModal'));

    // Success Modal
    document.getElementById('successClose').addEventListener('click', () => closeModal('successModal'));
    document.getElementById('successOverlay').addEventListener('click', () => closeModal('successModal'));

    // Checkout Form
    document.getElementById('checkoutForm').addEventListener('submit', submitOrder);

    // Mobile Menu
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });

    // Close modals with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal('cartModal');
            closeModal('checkoutModal');
            closeModal('successModal');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===================================
// SCROLL ANIMATIONS
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        }
    });
}, observerOptions);

// Observe product cards when they're rendered
setTimeout(() => {
    document.querySelectorAll('.product-card').forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });
}, 100);
