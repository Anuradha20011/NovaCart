
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

let products = [];

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

                <img src="${product.image_url}" class="card-img-top" onclick="openModal(${product.id})" style="cursor:pointer;">
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

    document.getElementById("modal-img_url").src = product.image;
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
                <img src="${item.image_url}" 
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

document.addEventListener("DOMContentLoaded", async function() {

    try {
        const response = await fetch("http://localhost:5000/products");
        products = await response.json();

        displayProducts(products);
        updateWishlistUI();
    } catch (error) {
        console.error("Error loading products:", error);
    }

    updateUI();
    updateNavbar();
     const year = document.getElementById("year");
     if(year){
        year.innerText = new DataTransfer().getFullYear();
     }
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






