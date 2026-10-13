// 1. Perfumes Data
const products = [
    { id: 1, name: "Royal Oud", notes: "Rich Woody & Amber Notes", size: '50ML', price: 4500, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBokM0NatJ5_pje3wlT4AnYhXLJY9wE76gtwnpV7JX0nLcuhc00BsKGwKC&s=10" },
    { id: 2, name: "Velvet Rose", notes: "Soft Floral & Sweet Scents", size: '30ML', price: 3800, image: "https://img.drz.lazcdn.com/static/pk/p/249f9ba349c07afedea39a7f2852818e.jpg_720x720q80.jpg" },
    { id: 3, name: "Golden Amber", notes: "Warm Vanilla & Spice", size: '100ML', price: 5200, image: "https://nextmemory.eu/cdn/shop/files/Golden-Amber_EDP-100ml.jpg?v=1775649019&width=2048" },
    { id: 4, name: "Celestial Bloom", notes: "Fresh Citrus & Jasmine", size: '50ML', price: 4100, image: "https://elixirelysium.com/cdn/shop/files/1B2CA56E-A866-41E5-9D79-AFEE1843050A_69ef74c0-8bde-4f62-9e2b-cf850cb39ea6.jpg?v=1760928635&width=1445" },
    { id: 5, name: "Midnight Musk", notes: "Deep Leather & Dark Musk", size: '100ML', price: 6000, image: "https://wholesale.intenseoud.com/cdn/shop/files/6_84ff937a-6ebe-427e-a475-bd82c462f635.jpg?v=1726346497" },
    { id: 6, name: "Ocean Breeze", notes: "Aquatic, Mint & Sea Salt", size: '30ML', price: 3500, image: "https://www.cliveshoes.com/cdn/shop/files/FPR0047-MLT.jpg?v=1779702418" },
    { id: 7, name: "Vanilla Dream", notes: "Sweet Vanilla & Caramel", size: '50ML', price: 4300, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-hEH4zLSh5kL8Af9QEaK9bNceXZNUv61wSGGk7nY__Q&s=10" },
    { id: 8, name: "Santal Glow", notes: "Creamy Sandalwood & Iris", size: '100ML', price: 5500, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9fbxP0XH_DRMFHXKYiKXghXnx0W_FAGWM0eVE3tID6IJc63XR29Vsl_c&s=10" },
    { id: 9, name: "Emerald Ivy", notes: "Green Leaves & Crisp Apple", size: '30ML', price: 3900, image: "https://int.stylo.pk/cdn/shop/files/PR1158-10-01.jpg?v=1785407750" },
    { id: 10, name: "Jo Malone", notes: "Ambrette seed, sea salt", size: '100ML', price: 7000, image: "https://www.countryandtownhouse.com/wp-content/uploads/2026/03/Jo-Malone-London-English-Pear_Campaign-Georgia-May-Lizzy-Jagger-%C2%A9JoMaloneLondon-6-768x1152.jpg" },
    { id: 11, name: "Sugarcane Vanilla", notes: "Vanilla, Tonka Bean, Sandalwood", size: '100ML', price: 5500, image: "https://media.zid.store/cdn-cgi/image/fit=scale-down,width=770,height=770/https://media.zid.store/26bef7b7-3691-499a-8d35-84ad9a634962/931b2bc1-ae8f-4dc5-a604-6a5395afe65d.png" }
];

let cart = [];

// 2. Render Products on Shop Page
const productsContainer = document.getElementById("products-container");

if (productsContainer) {
    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="product-price-size">
                <span class="price">Rs. ${product.price.toLocaleString()}</span> 
                <span class="size">/${product.size}</span>
            </p>
            <button class="add-btn" onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        
        productsContainer.appendChild(productCard);
    });
}

// 3. Add to Cart Function
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
    toggleCart("open");
}

// 4. Update Cart Display & Total with Qty Buttons
function updateCart() {
    const cartCount = document.getElementById("cart-count");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) cartCount.innerText = totalItems;

    if (cartItems) {
        if (cart.length === 0) {
            cartItems.innerHTML = "<p>Your cart is empty!</p>";
            if (cartTotal) cartTotal.innerText = "0";
            return;
        }

        cartItems.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            cartItems.innerHTML += `
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;">
                        <div>
                            <h4 style="font-size: 13px; color: #111; margin-bottom: 2px;">${item.name}</h4>
                            <p style="font-size: 12px; color: #b89728; font-weight: bold; margin-bottom: 5px;">Rs. ${item.price.toLocaleString()}</p>
                            
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <button onclick="changeQuantity(${index}, -1)" style="background: #f0f0f0; border: none; width: 20px; height: 20px; border-radius: 3px; cursor: pointer; font-weight: bold;">-</button>
                                <span style="font-size: 13px; font-weight: 600;">${item.quantity}</span>
                                <button onclick="changeQuantity(${index}, 1)" style="background: #f0f0f0; border: none; width: 20px; height: 20px; border-radius: 3px; cursor: pointer; font-weight: bold;">+</button>
                            </div>
                        </div>
                    </div>
                    <button onclick="removeFromCart(${index})" style="background: #ff4d4d; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; font-size: 11px;">Remove</button>
                </div>
            `;
        });

        if (cartTotal) cartTotal.innerText = total.toLocaleString();
    }
}

// 5. Change Quantity (+ / -)
function changeQuantity(index, amount) {
    cart[index].quantity += amount;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    updateCart();
}

// 6. Remove Item
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// 7. Toggle Cart Modal
function toggleCart(action = null) {
    const cartModal = document.getElementById("cart-modal");
    if (cartModal) {
        if (action === "open") {
            cartModal.style.display = "block";
        } else if (action === "close") {
            cartModal.style.display = "none";
        } else {
            if (cartModal.style.display === "block") {
                cartModal.style.display = "none";
            } else {
                cartModal.style.display = "block";
            }
        }
    }
}

/// Open Checkout Form inside Cart Modal
function openCheckoutForm() {
    if (cart.length === 0) {
        showToast("Your shopping bag is empty!");
        return;
    }
    document.getElementById("cart-main-view").style.display = "none";
    document.getElementById("checkout-form-view").style.display = "block";
}

// Back to Cart Items View
function backToCart() {
    document.getElementById("checkout-form-view").style.display = "none";
    document.getElementById("cart-main-view").style.display = "block";
}

// Submit Order and Show Confirmation
function submitOrder(e) {
    e.preventDefault();
    const customerName = document.getElementById("c-name").value;
    
    showToast(`Thank you, ${customerName}! Your order has been placed.`);
    
    cart = [];
    updateCart();
    backToCart();
    toggleCart("close");
const customerPhone = document.getElementById("c-phone").value;
const customerCity = document.getElementById("c-city").value;
const customerAddress = document.getElementById("c-address").value;


console.log("Order Details:", {
    name: customerName,
    phone: customerPhone,
    city: customerCity,
    address: customerAddress,
    items: [...cart] 
});


cart = [];
}
function showToast(message) {
    let toast = document.getElementById("custom-toast");
    

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "custom-toast";
        toast.style.cssText = "position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%) translateY(100px); background-color: #111; color: #fff; padding: 12px 24px; border-radius: 6px; font-size: 14px; font-weight: 500; box-shadow: 0 5px 15px rgba(0,0,0,0.2); transition: transform 0.3s ease, opacity 0.3s ease; opacity: 0; z-index: 9999; border-left: 4px solid #b89728;";
        document.body.appendChild(toast);
    }
    
    toast.innerText = message;
    toast.style.transform = "translateX(-50%) translateY(0)";
    toast.style.opacity = "1";
    
    // 3 seconds baad message khud gayab ho jaye ga
    setTimeout(() => {
        toast.style.transform = "translateX(-50%) translateY(100px)";
        toast.style.opacity = "0";
    }, 3000);
}