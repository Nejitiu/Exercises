// Get DOM elements
const groceryList = document.getElementById('grocery-list');
const groceryCart = document.getElementById('cart');
const groceryTotalPrice = document.getElementById('total-price');

// Initialize cart object
let cart = {};

// Function to display products from API data
function displayProducts(products) {
    groceryList.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product');
        
        productCard.innerHTML = `
            <div class="product-image"></div>
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button class="add-to-cart">Add to Cart</button>
        `;
        
        // Add event listener directly to the button
        const addButton = productCard.querySelector('.add-to-cart');
        addButton.addEventListener('click', function() {
            addToCart(product.name, product.price);
        });
        
        groceryList.appendChild(productCard);
    });
    
    // Initialize cart display
    updateCart();
}

// Function to add item to cart
function addToCart(name, price) {
    if (cart[name]) {
        cart[name].quantity++;
    } else {
        cart[name] = { price: price, quantity: 1 };
    }
    updateCart();
}

// Function to remove item from cart
function removeFromCart(name) {
    if (cart[name]) {
        delete cart[name];
        updateCart();
    }
}

// Function to update cart display
function updateCart() {
    // Clear cart display
    groceryCart.innerHTML = '';
    
    // Check if cart is empty
    if (Object.keys(cart).length === 0) {
        groceryCart.innerHTML = '<div class="cart-empty">Your cart is empty</div>';
        groceryTotalPrice.innerText = 'Total: $0.00';
        return;
    }
    
    // Calculate total price
    let total = 0;
    
    // Create cart items
    for (const [name, item] of Object.entries(cart)) {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        
        cartItem.innerHTML = `
            <div class="item-details">
                <div>${name} <span class="item-quantity">×${item.quantity}</span></div>
                <div class="item-price">$${itemTotal.toFixed(2)}</div>
            </div>
            <button class="remove-btn">Remove</button>
        `;
        
        // Add event listener to remove button
        const removeButton = cartItem.querySelector('.remove-btn');
        removeButton.addEventListener('click', function() {
            removeFromCart(name);
        });
        
        groceryCart.appendChild(cartItem);
    }
    
    // Update total price display
    groceryTotalPrice.innerText = `Total: $${total.toFixed(2)}`;
}

// Fetch products from API
fetch("https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json")
    .then(response => response.json())
    .then(data => displayProducts(data))
    .catch(error => console.error('Error fetching products:', error));
