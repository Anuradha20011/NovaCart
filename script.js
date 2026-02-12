
class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem("cart")) || [];
    }

    add(product) {
        const existing = this.items.find(p => p.id === product.id);
        if (existing) {
            existing.quantity++;
        } else {
            this.items.push({ ...product, quantity: 1 });
        }
        this.save();
    }

    remove(id) {
        this.items = this.items.filter(p => p.id !== id);
        this.save();
    }

    getTotal() {
        return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }

    getCount() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    save() {
        localStorage.setItem("cart", JSON.stringify(this.items));
    }
}

const cart = new Cart();



const products = [

    { id:1, name:"Laptop", price:45000, oldPrice:50000, category:"Electronics", rating:4.5,
        image:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
        description:"High performance laptop with SSD and 16GB RAM." },

    { id:2, name:"Smartphone", price:30000, oldPrice:35000, category:"Electronics", rating:4.3,
        image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
        description:"Latest 5G smartphone with powerful processor." },

    { id:3, name:"Headphones", price:2000, oldPrice:2500, category:"Electronics", rating:4.2,
        image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
        description:"Noise cancelling over-ear headphones." },

    { id:4, name:"Smart Watch", price:5000, oldPrice:6000, category:"Electronics", rating:4.1,
        image:"https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b",
        description:"Track fitness and notifications easily." },

    { id:5, name:"Bluetooth Speaker", price:3500, oldPrice:4200, category:"Electronics", rating:4.4,
        image:"https://shop.zebronics.com/collections/wireless-speakers",
        description:"Portable speaker with deep bass." },

    { id:6, name:"Camera", price:55000, oldPrice:60000, category:"Electronics", rating:4.6,
        image:"https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
        description:"Professional DSLR camera for photography." },

    { id:7, name:"Microwave", price:12000, oldPrice:15000, category:"Home", rating:4.2,
        image:"https://images.unsplash.com/photo-1586201375761-83865001e31c",
        description:"Quick cooking microwave oven." },

    { id:8, name:"T-Shirt", price:999, oldPrice:1499, category:"Fashion", rating:4.1,
        image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
        description:"Comfortable cotton t-shirt." },

    { id:9, name:"Jeans", price:1999, oldPrice:2499, category:"Fashion", rating:4.3,
        image:"https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
        description:"Slim fit stylish jeans." },

    { id:10, name:"Shoes", price:2999, oldPrice:3999, category:"Fashion", rating:4.4,
    image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    description:"Comfortable running shoes." },

    { id:11, name:"Jacket", price:3499, oldPrice:4500, category:"Fashion", rating:4.2,
        image:"https://images.unsplash.com/photo-1544441893-675973e31985",
        description:"Winter jacket with warm lining." },

    { id:12, name:"Handbag", price:2499, oldPrice:3200, category:"Fashion", rating:4.1,
        image:"https://images.unsplash.com/photo-1584917865442-de89df76afd3",
        description:"Stylish handbag for daily use." },

    { id:13, name:"Sunglasses", price:1499, oldPrice:1999, category:"Fashion", rating:4.0,
        image:"https://images.unsplash.com/photo-1511499767150-a48a237f0083",
        description:"UV protection sunglasses." },

    { id:14, name:"Sofa", price:25000, oldPrice:30000, category:"Home", rating:4.5,
        image:"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
        description:"Comfortable 3-seater sofa." },

    { id:15, name:"Dining Table", price:18000, oldPrice:22000, category:"Home", rating:4.3,
        image:"https://images.unsplash.com/photo-1505691938895-1758d7feb511",
        description:"Wooden dining table set." },

    { id:16, name:"Bed", price:22000, oldPrice:26000, category:"Home", rating:4.4,
        image:"https://images.unsplash.com/photo-1505692794403-35a9d2fdf1f9",
        description:"Queen size wooden bed." },

    { id:17, name:"Table Lamp", price:1499, oldPrice:1999, category:"Home", rating:4.1,
        image:"https://images.unsplash.com/photo-1507473885765-e6ed057f782c",
        description:"Decorative bedside lamp." },

    { id:18, name:"Wall Clock", price:999, oldPrice:1299, category:"Home", rating:4.0,
        image:"https://images.unsplash.com/photo-1509042239860-f550ce710b93",
        description:"Modern design wall clock." },

    { id:19, name:"Curtains", price:1999, oldPrice:2499, category:"Home", rating:4.2,
        image:"https://images.unsplash.com/photo-1505691938895-1758d7feb511",
        description:"Premium quality curtains." },

    { id:20, name:"Mixer Grinder", price:4500, oldPrice:5500, category:"Home", rating:4.3,
        image:"https://images.unsplash.com/photo-1586201375761-83865001e31c",
        description:"Powerful kitchen mixer grinder." }

];




const productList = document.getElementById("product-list");

function displayProducts(list) {
    productList.innerHTML = "";
    list.forEach(product => {
        const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
        productList.innerHTML += `
        <div class="col-md-3 mb-4">
            <div class="card product-card position-relative">

                <span class="discount-badge">
                    ${discount}% OFF
                </span>

                <img src="${product.image}" class="card-img-top" onclick="openModal(${product.id})" style="cursor:pointer;">
                <div class="card-body text-center">
                    <div class="wishlist-icon" onclick="toggleWishlist(${product.id})"> </div>
                    <h5>${product.name}</h5>
                    <div class="rating">
                        ${generateStars(product.rating)}
                    </div>
                    <p>
                        ₹${product.price}
                        <span class="old-price">₹${product.oldPrice}</span>
                    </p>
                    <button class="btn btn-primary w-100"
                        onclick="addToCart(${product.id})">Add to Cart
                    </button>
                </div>
            </div>
        </div>
        `;
    });
}


function generateStars(rating) {
    let stars = "";
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            stars += "⭐";
        } else {
            stars += "☆";
        }
    }
    return stars;
}

function openModal(id) {
    const product = products.find(p => p.id === id);

    document.getElementById("modal-img").src = product.image;
    document.getElementById("modal-title").innerText = product.name;
    document.getElementById("modal-category").innerText = product.category;
    document.getElementById("modal-price").innerText = product.price;
    document.getElementById("modal-description").innerText = product.description;

    document.getElementById("modal-add-btn").onclick = function() {
        cart.add(product);
        updateUI();
    };

    const modal = new bootstrap.Modal(
        document.getElementById('productModal')
    );
    modal.show();
}


function toggleDarkMode() {
    document.body.classList.toggle("Dark-mode");
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.add(product);
    updateUI();
}

function toggleCart() {
    document.getElementById("cart-panel")
        .classList.toggle("open");
}

function renderCartItems() {
    const panel = document.getElementById("cart-items-panel");

    // 👇 agar element page par nahi hai to function band
    if (!panel) return;

    panel.innerHTML = "";

    if (cart.items.length === 0) {
        panel.innerHTML = `
            <div class="text-center mt-5">
                <h6>Your cart is empty 🛒</h6>
                <p class="text-muted">Looks like you haven’t added anything yet.</p>
                <button class="btn btn-primary btn-sm" onclick="toggleCart()">Continue Shopping </button>
            </div>
        `;
        return;
    }

    cart.items.forEach(item => {
        panel.innerHTML += `
            <div class="d-flex align-items-center mb-3 border-bottom pb-2">
                <img src="${item.image}" 
                     width="60" height="60"
                     style="object-fit:cover; border-radius:8px; margin-right:10px;">
                <div class="flex-grow-1">
                    <strong>${item.name}</strong><br>
                    ₹${item.price} x ${item.quantity}<br>
                    <small class="text-success">
                        Subtotal: ₹${item.price * item.quantity}
                    </small>
                </div>
                <div class="text-end">
                    <button onclick="increase(${item.id})" 
                        class="btn btn-sm btn-success mb-1">+</button><br>
                    <button onclick="decrease(${item.id})" 
                        class="btn btn-sm btn-warning mb-1">-</button><br>
                    <button onclick="removeItem(${item.id})" 
                        class="btn btn-sm btn-danger">❌</button>
                </div>
            </div>
        `;
    });
}




function updateUI() {
    let total = cart.getTotal();
    let finalTotal = total - discountAmount;
    const cartTotal = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");

    if (cartTotal) 
        cartTotal.innerText = finalTotal;
    if (cartCount) 
        cartCount.innerText = cart.getCount();
    renderCartItems();}

document.addEventListener("DOMContentLoaded", function() {
    displayProducts(products);
    updateUI();
    updateNavbar();
});


function increase(id) {
    const item = cart.items.find(p => p.id === id);
    item.quantity++;
    cart.save();
    updateUI();
}

function decrease(id) {
    const item = cart.items.find(p => p.id === id);

    if (item.quantity > 1) {
        item.quantity--;
    } else {
        cart.remove(id);
    }

    cart.save();
    updateUI();
}

function removeItem(id) {
    cart.remove(id);
    cart.save();
    updateUI();
}


//wishlist
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
function toggleWishlist(id) {
    if (wishlist.includes(id)) {
        wishlist = wishlist.filter(item => item !== id);
    } else {
        wishlist.push(id);
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    updateWishlistUI();
}

function updateWishlistUI() {
    document.querySelectorAll(".wishlist-icon")
        .forEach((icon, index) => {
            const productId = products[index].id;
            if (wishlist.includes(productId)) {
                icon.style.color = "red";
            } else {
                icon.style.color = "gray";
            }
        });
}
updateWishlistUI();

//coupon
let discountAmount = 0;
function applyCoupon() {
    const couponInput= document.getElementById("coupon");
    if (!couponInput) 
        return;
    const code = couponInput.value;

    if (code === "SAVE10") {
        discountAmount = cart.getTotal() * 0.10;
        alert("10% discount applied!");
    } else if (code === "SAVE20") {
        discountAmount = cart.getTotal() * 0.20;
        alert("20% discount applied!");
    } else {
        discountAmount = 0;
        alert("Invalid Coupon");
    }

    updateUI();
}

//search
const searchInput = document.getElementById("search");
if (searchInput) {
    searchInput.addEventListener("input", e => {
        const value = e.target.value.toLowerCase();
        const filtered = products.filter(p =>
            p.name.toLowerCase().includes(value)
        );
        displayProducts(filtered);
    });
}


// sort
const sortSelect = document.getElementById("sort");
if (sortSelect) {
    sortSelect.addEventListener("change", e => {
        let sorted = [...products];
        if (e.target.value === "low") {
            sorted.sort((a, b) => a.price - b.price);
        } else if (e.target.value === "high") {
            sorted.sort((a, b) => b.price - a.price);
        }
        displayProducts(sorted);
    });
}


// category filter
const categorySelect = document.getElementById("category");
if (categorySelect) {
    categorySelect.addEventListener("change", e => {
        if (e.target.value === "all") {
            displayProducts(products);
        } else {
            const filtered = products.filter(p => p.category === e.target.value);
            displayProducts(filtered);
        }
    });
}


// checkout
function checkout(){
    const isLoggedIn = localStorage.getItem("loggedIn");

    if(isLoggedIn){
        window.location.href = "checkout.html";
    }else{
        alert("Please login first 🔒");
        window.location.href = "login.html";
    }
}
function updateNavbar(){
    const userArea = document.getElementById("user-area");
    const user = JSON.parse(localStorage.getItem("user"));
    const isLoggedIn = localStorage.getItem("loggedIn");

    if(isLoggedIn && user){
        userArea.innerHTML = `
            <span class="me-2">Hi, ${user.name} 👋</span>
            <button class="btn btn-sm btn-danger" onclick="logout()">Logout</button>
        `;
    }else{
        userArea.innerHTML = `
            <a href="login.html" class="btn btn-outline-primary btn-sm">Login</a>
        `;
    }
}

function logout(){
    localStorage.removeItem("loggedIn");
    alert("Logged out successfully 👋");
    location.reload();
}

document.addEventListener("DOMContentLoaded", function() {
    const year = document.getElementById("year");
    if (year) {
        year.innerText = new Date().getFullYear();
    }
});




