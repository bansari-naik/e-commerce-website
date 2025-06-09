let VALID_USERNAME = "";
let VALID_PASSWORD = "";
let VALID_EMAIL = "";
let VALID_PHONE = "";
let currentUser = "";
let wishlist = [];

const products = [
  { id: 1, title: "Men's T-Shirt", category: "men", price: 25, rating: 4.2, image: "mentshirt.jpg" },
  { id: 2, title: "Women's Dress", category: "women", price: 40, rating: 4.5, image: "womendress.jpeg" },
  { id: 3, title: "Bluetooth Headphones", category: "electronics", price: 80, rating: 4.1, image: "bh.jpg" },
  { id: 4, title: "Men's Jacket", category: "men", price: 60, rating: 3.9, image: "mj.jpeg" },
  { id: 5, title: "Smartphone", category: "electronics", price: 300, rating: 4.7, image: "sm.jpg" },
  { id: 6, title: "Women's Handbag", category: "women", price: 50, rating: 4.3, image: "whb.jpg" },
  { id: 7, title: "Smartwatch", category: "electronics", price: 150, rating: 4.4, image: "smw.jpg" },
  { id: 8, title: "Men's Shoes", category: "men", price: 70, rating: 4.0, image: "msh.jpg" },
  { id: 9, title: "Women's Scarf", category: "women", price: 20, rating: 4.1, image: "scw.png" }
];

let filteredProducts = [...products];

// Step 1: Set Credentials
function setCredentials() {
  const user = document.getElementById("set-username").value.trim();
  const pass = document.getElementById("set-password").value.trim();
  const email = document.getElementById("set-email").value.trim();
  const phone = document.getElementById("set-phone").value.trim();
  const error = document.getElementById("set-error");

  if (user && pass && email && phone) {
    VALID_USERNAME = user;
    VALID_PASSWORD = pass;
    VALID_EMAIL = email;
    VALID_PHONE = phone;
    document.getElementById("login-section").style.display = "none";
    document.getElementById("actual-login").style.display = "block";
  } else {
    error.textContent = "Please fill in all fields.";
  }
}

// Step 2: Login
function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const error = document.getElementById("login-error");

  if (username === VALID_USERNAME && password === VALID_PASSWORD) {
    currentUser = username;
    document.getElementById("actual-login").style.display = "none";
    document.getElementById("main-content").style.display = "block";
    renderProducts(filteredProducts);
  } else {
    error.textContent = "Invalid credentials!";
  }
}
function convertToINR(usd) {
  const exchangeRate = 83; // Approximate USD to INR rate (can be updated)
  return Math.round(usd * exchangeRate).toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR'
  });
}
// Render products
function renderProducts(data) {
  const container = document.getElementById("product-list");
  container.innerHTML = "";

  data.forEach(product => {
    const isLiked = wishlist.includes(product.id);
    container.innerHTML += `
      <div class="product">
        <img src="${product.image}" alt="${product.title}" />
        <h3>${product.title}</h3>
        <p>Price: ${convertToINR(product.price)}</p>
        <p>Rating: ${product.rating}</p>
        <div style="display: flex; justify-content: center; gap: 10px; align-items: center;">
          <button onclick="alert('Added ${product.title} to cart!')">Add to Cart</button>
          <button class="wishlist-btn ${isLiked ? "liked" : ""}" onclick="toggleWishlist(${product.id})">❤️</button>
        </div>
      </div>
    `;
  });
}

// Toggle wishlist
function toggleWishlist(productId) {
  const index = wishlist.indexOf(productId);
  if (index === -1) {
    wishlist.push(productId);
  } else {
    wishlist.splice(index, 1);
  }
  renderProducts(filteredProducts);
}

// Filter products
function filterCategory(category) {
  filteredProducts = category === "all"
    ? [...products]
    : products.filter(product => product.category === category);
  renderProducts(filteredProducts);
}

// Sort products
function sortProducts(option) {
  if (option === "low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (option === "high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else {
    filteredProducts = [...products];
  }
  renderProducts(filteredProducts);
}

// Search products
function searchProducts() {
  const query = document.getElementById("searchBar").value.toLowerCase();
  const result = filteredProducts.filter(product =>
    product.title.toLowerCase().includes(query)
  );
  renderProducts(result);
}

// Show profile sidebar
function toggleSidebar() {
  const sidebar = document.getElementById("profile-page");
  sidebar.style.display = sidebar.style.display === "block" ? "none" : "block";

  // Populate profile details
  document.getElementById("profile-username").textContent = VALID_USERNAME;
  document.getElementById("profile-email").textContent = VALID_EMAIL;
  document.getElementById("profile-phone").textContent = VALID_PHONE;
  document.getElementById("profile-password").textContent = VALID_PASSWORD;

  // Render wishlist
  const wishlistContainer = document.getElementById("wishlist");
  wishlistContainer.innerHTML = "";

  const likedItems = products.filter(p => wishlist.includes(p.id));
  likedItems.forEach(product => {
    wishlistContainer.innerHTML += `
      <div class="product">
        <img src="${product.image}" alt="${product.title}" />
        <h3>${product.title}</h3>
        <p>Price: $${product.price}</p>
        <p>Rating: ${product.rating}</p>
      </div>
    `;
  });
}

// Hide sidebar
function goToHome() {
  document.getElementById("profile-page").style.display = "none";
}
