/* =========================================================
   MYSTORE
   Frontend Application
   CHUNK 1/8 — Data, State & Helpers
   ========================================================= */

/* ---------------------------------------------------------
   MOCK PRODUCTS
   This will later be replaced by Supabase data.
   --------------------------------------------------------- */

const PRODUCTS = [
  {
    id: "p1",
    name: "Oversized Essential Tee",
    price: 1800,
    category: "Fashion",
    store: "Amani Streetwear",
    storeSlug: "amani-streetwear",
    rating: 4.8,
    reviews: 42,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
    description:
      "A heavyweight oversized everyday tee designed for comfort, clean fits and effortless streetwear.",
    featured: true
  },

  {
    id: "p2",
    name: "Air Street Sneakers",
    price: 6500,
    category: "Shoes",
    store: "Nairobi Sneaker Co.",
    storeSlug: "nairobi-sneaker-co",
    rating: 4.9,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    description:
      "Clean everyday sneakers with a lightweight feel and versatile street-ready design.",
    featured: true
  },

  {
    id: "p3",
    name: "Classic Steel Watch",
    price: 4200,
    category: "Accessories",
    store: "Kijiji Goods",
    storeSlug: "kijiji-goods",
    rating: 4.7,
    reviews: 31,
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=80",
    description:
      "A minimal steel watch built for everyday wear, from business meetings to weekend outings.",
    featured: true
  },

  {
    id: "p4",
    name: "Nia Everyday Tote",
    price: 2500,
    category: "Bags",
    store: "Home by Nia",
    storeSlug: "home-by-nia",
    rating: 4.8,
    reviews: 28,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80",
    description:
      "A spacious everyday tote with a simple premium look for work, school and daily errands.",
    featured: true
  },

  {
    id: "p5",
    name: "Wireless Studio Headphones",
    price: 7800,
    category: "Tech",
    store: "Tech Hub KE",
    storeSlug: "tech-hub-ke",
    rating: 4.6,
    reviews: 53,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
    description:
      "Wireless over-ear headphones with immersive sound and a comfortable studio-inspired design.",
    featured: true
  },

  {
    id: "p6",
    name: "Minimal Lounge Chair",
    price: 12500,
    category: "Home",
    store: "Home by Nia",
    storeSlug: "home-by-nia",
    rating: 4.9,
    reviews: 19,
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=900&q=80",
    description:
      "A modern lounge chair designed to bring comfort and understated style into your space.",
    featured: false
  },

  {
    id: "p7",
    name: "Everyday Sunglasses",
    price: 2200,
    category: "Accessories",
    store: "Kijiji Goods",
    storeSlug: "kijiji-goods",
    rating: 4.5,
    reviews: 24,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80",
    description:
      "Simple statement sunglasses with a timeless frame for everyday styling.",
    featured: false
  },

  {
    id: "p8",
    name: "Creator Camera Kit",
    price: 28500,
    category: "Tech",
    store: "Tech Hub KE",
    storeSlug: "tech-hub-ke",
    rating: 4.8,
    reviews: 16,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80",
    description:
      "A creator-focused camera setup for content, product photography and social media production.",
    featured: false
  }
];


/* ---------------------------------------------------------
   MOCK STORES
   Later these will come from the sellers table.
   --------------------------------------------------------- */

const STORES = [
  {
    id: "s1",
    name: "Amani Streetwear",
    slug: "amani-streetwear",
    category: "Fashion",
    location: "Nairobi",
    description:
      "Modern streetwear made for everyday Kenyan style.",
    products: 24,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80"
  },

  {
    id: "s2",
    name: "Nairobi Sneaker Co.",
    slug: "nairobi-sneaker-co",
    category: "Shoes",
    location: "Nairobi",
    description:
      "Everyday sneakers and footwear for people who care about their fit.",
    products: 31,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=1000&q=80"
  },

  {
    id: "s3",
    name: "Kijiji Goods",
    slug: "kijiji-goods",
    category: "Accessories",
    location: "Nairobi",
    description:
      "Simple accessories and everyday essentials.",
    products: 18,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=1000&q=80"
  },

  {
    id: "s4",
    name: "Home by Nia",
    slug: "home-by-nia",
    category: "Home",
    location: "Nairobi",
    description:
      "Beautiful pieces designed to make your home feel like yours.",
    products: 27,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80"
  },

  {
    id: "s5",
    name: "Tech Hub KE",
    slug: "tech-hub-ke",
    category: "Tech",
    location: "Nairobi",
    description:
      "Technology, creator equipment and useful digital gear.",
    products: 36,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1000&q=80"
  }
];


/* ---------------------------------------------------------
   APPLICATION STATE
   --------------------------------------------------------- */

let cart = loadStorage("mystore_cart", []);

let wishlist = loadStorage("mystore_wishlist", []);

let sellerProducts = loadStorage("mystore_seller_products", []);

let currentSearch = "";

let currentCategory = "All";


/* ---------------------------------------------------------
   STORAGE HELPERS
   --------------------------------------------------------- */

function loadStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);

    if (!saved) {
      return fallback;
    }

    return JSON.parse(saved);
  } catch (error) {
    console.warn("Could not load local storage:", key, error);
    return fallback;
  }
}


function saveStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn("Could not save local storage:", key, error);
  }
}


/* ---------------------------------------------------------
   FORMATTING
   --------------------------------------------------------- */

function money(value) {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0
  }).format(Number(value) || 0);
}


function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


/* ---------------------------------------------------------
   PRODUCT HELPERS
   --------------------------------------------------------- */

function allProducts() {
  return [...PRODUCTS, ...sellerProducts];
}


function getProduct(id) {
  return allProducts().find(product => product.id === id);
}


function getStore(slug) {
  return STORES.find(store => store.slug === slug);
}


function getStoreProducts(slug) {
  return allProducts().filter(product => {
    return product.storeSlug === slug;
  });
}


function isWishlisted(productId) {
  return wishlist.includes(productId);
}


/* ---------------------------------------------------------
   CART HELPERS
   --------------------------------------------------------- */

function cartCount() {
  return cart.reduce((total, item) => {
    return total + Number(item.quantity || 0);
  }, 0);
}


function cartSubtotal() {
  return cart.reduce((total, item) => {
    const product = getProduct(item.productId);

    if (!product) {
      return total;
    }

    return total + product.price * item.quantity;
  }, 0);
}


/* ---------------------------------------------------------
   TOAST
   --------------------------------------------------------- */

function toast(message) {
  const element = document.getElementById("toast");

  if (!element) {
    return;
  }

  element.textContent = message;
  element.classList.add("show");

  clearTimeout(window.__mystoreToastTimer);

  window.__mystoreToastTimer = setTimeout(() => {
    element.classList.remove("show");
  }, 2500);
}


/* ---------------------------------------------------------
   NAVIGATION
   --------------------------------------------------------- */

function navigate(path) {
  window.location.hash = path;
}


/* ---------------------------------------------------------
   HTML ROOT
   --------------------------------------------------------- */

function appRoot() {
  return document.getElementById("app");
}


/* ---------------------------------------------------------
   SAFE IMAGE FALLBACK
   --------------------------------------------------------- */

function imageFallback(event) {
  event.target.src =
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80";
}


/* ---------------------------------------------------------
   END OF CHUNK 1
   ========================================================= */


/* =========================================================
   CHUNK 2/8 — LAYOUT, HEADER, NAVIGATION & FOOTER
   ========================================================= */


/* ---------------------------------------------------------
   MAIN APPLICATION LAYOUT
   --------------------------------------------------------- */

function layout(content) {
  const root = appRoot();

  if (!root) {
    return;
  }

  root.innerHTML = `
    <div class="site-shell">

      ${renderHeader()}

      <main class="site-main">
        ${content}
      </main>

      ${renderFooter()}

    </div>
  `;

  updateHeaderState();
}


/* ---------------------------------------------------------
   HEADER
   --------------------------------------------------------- */

function renderHeader() {
  return `
    <header class="topbar">

      <div class="topbar-inner">

        <a
          href="#/"
          class="brand"
          aria-label="MyStore home"
        >
          <span class="brand-mark">M</span>
          <span class="brand-name">MyStore</span>
        </a>


        <nav class="desktop-nav" aria-label="Main navigation">

          <a href="#/" data-nav-link="home">
            Home
          </a>

          <a href="#/discover" data-nav-link="discover">
            Discover
          </a>

          <a href="#/stores" data-nav-link="stores">
            Stores
          </a>

        </nav>


        <div class="header-search">

          <form
            class="search-form"
            onsubmit="searchNow(event)"
          >

            <span class="search-icon">⌕</span>

            <input
              id="global-search"
              type="search"
              placeholder="Search products, stores..."
              autocomplete="off"
              aria-label="Search products and stores"
            />

          </form>

        </div>


        <div class="header-actions">

          <a
            href="#/wishlist"
            class="icon-button"
            aria-label="Wishlist"
            title="Wishlist"
          >
            ♡
            <span
              class="header-badge"
              id="wishlist-count"
            >
              ${wishlist.length}
            </span>
          </a>


          <a
            href="#/cart"
            class="icon-button"
            aria-label="Shopping cart"
            title="Cart"
          >
            🛒
            <span
              class="header-badge"
              id="cart-count"
            >
              ${cartCount()}
            </span>
          </a>


          <a
            href="#/account"
            class="account-button"
            aria-label="My account"
          >
            <span class="account-avatar">
              A
            </span>

            <span class="account-label">
              Account
            </span>
          </a>

        </div>


        <button
          class="mobile-menu-button"
          type="button"
          aria-label="Open navigation menu"
          aria-expanded="false"
          onclick="toggleMobileMenu()"
        >
          ☰
        </button>

      </div>


      <div
        id="mobile-menu"
        class="mobile-menu"
        aria-hidden="true"
      >

        <a href="#/" onclick="closeMobileMenu()">
          Home
        </a>

        <a href="#/discover" onclick="closeMobileMenu()">
          Discover
        </a>

        <a href="#/stores" onclick="closeMobileMenu()">
          Stores
        </a>

        <a href="#/wishlist" onclick="closeMobileMenu()">
          Wishlist
        </a>

        <a href="#/cart" onclick="closeMobileMenu()">
          Cart
        </a>

        <a href="#/account" onclick="closeMobileMenu()">
          Account
        </a>

        <a
          href="#/seller"
          class="mobile-sell-link"
          onclick="closeMobileMenu()"
        >
          Open your store
        </a>

      </div>

    </header>
  `;
}


/* ---------------------------------------------------------
   HEADER STATE
   --------------------------------------------------------- */

function updateHeaderState() {
  const cartElement = document.getElementById("cart-count");
  const wishlistElement = document.getElementById("wishlist-count");

  if (cartElement) {
    cartElement.textContent = cartCount();
  }

  if (wishlistElement) {
    wishlistElement.textContent = wishlist.length;
  }


  const currentHash = window.location.hash || "#/";

  document.querySelectorAll("[data-nav-link]").forEach(link => {
    link.classList.remove("active");
  });


  if (
    currentHash === "#/" ||
    currentHash === "" ||
    currentHash === "#"
  ) {
    const homeLink = document.querySelector(
      '[data-nav-link="home"]'
    );

    if (homeLink) {
      homeLink.classList.add("active");
    }

    return;
  }


  if (currentHash.startsWith("#/discover")) {
    const link = document.querySelector(
      '[data-nav-link="discover"]'
    );

    if (link) {
      link.classList.add("active");
    }
  }


  if (currentHash.startsWith("#/stores")) {
    const link = document.querySelector(
      '[data-nav-link="stores"]'
    );

    if (link) {
      link.classList.add("active");
    }
  }
}


/* ---------------------------------------------------------
   MOBILE MENU
   --------------------------------------------------------- */

function toggleMobileMenu() {
  const menu = document.getElementById("mobile-menu");
  const button = document.querySelector(".mobile-menu-button");

  if (!menu || !button) {
    return;
  }

  const isOpen = menu.classList.toggle("open");

  menu.setAttribute(
    "aria-hidden",
    String(!isOpen)
  );

  button.setAttribute(
    "aria-expanded",
    String(isOpen)
  );

  button.textContent = isOpen ? "✕" : "☰";
}


function closeMobileMenu() {
  const menu = document.getElementById("mobile-menu");
  const button = document.querySelector(".mobile-menu-button");

  if (!menu || !button) {
    return;
  }

  menu.classList.remove("open");

  menu.setAttribute(
    "aria-hidden",
    "true"
  );

  button.setAttribute(
    "aria-expanded",
    "false"
  );

  button.textContent = "☰";
}


/* ---------------------------------------------------------
   FOOTER
   --------------------------------------------------------- */

function renderFooter() {
  return `
    <footer class="site-footer">

      <div class="footer-inner">

        <div class="footer-brand">

          <div class="brand footer-logo">

            <span class="brand-mark">
              M
            </span>

            <span class="brand-name">
              MyStore
            </span>

          </div>

          <p>
            Shop local. Sell online.
          </p>

          <p class="footer-small">
            A marketplace built for modern sellers and shoppers.
          </p>

        </div>


        <div class="footer-column">

          <h4>Shop</h4>

          <a href="#/discover">
            Discover products
          </a>

          <a href="#/stores">
            Browse stores
          </a>

          <a href="#/wishlist">
            Wishlist
          </a>

          <a href="#/cart">
            Shopping cart
          </a>

        </div>


        <div class="footer-column">

          <h4>Sell</h4>

          <a href="#/seller">
            Open your store
          </a>

          <a href="#/seller">
            Seller dashboard
          </a>

          <a href="#/seller">
            Add products
          </a>

          <a href="#/seller">
            Store settings
          </a>

        </div>


        <div class="footer-column">

          <h4>MyStore</h4>

          <a href="#/account">
            My account
          </a>

          <a href="#/">
            About
          </a>

          <a href="#/">
            Help centre
          </a>

          <a href="#/">
            Contact
          </a>

        </div>

      </div>


      <div class="footer-bottom">

        <span>
          © ${new Date().getFullYear()} MyStore
        </span>

        <span>
          Built for sellers. Made for shoppers.
        </span>

      </div>

    </footer>
  `;
}


/* ---------------------------------------------------------
   SEARCH
   --------------------------------------------------------- */

function searchNow(event) {
  if (event) {
    event.preventDefault();
  }

  const input = document.getElementById("global-search");

  if (!input) {
    return;
  }

  const query = input.value.trim();

  if (!query) {
    navigate("#/discover");
    return;
  }

  navigate(
    `#/discover?q=${encodeURIComponent(query)}`
  );
}


/* ---------------------------------------------------------
   SEARCH INPUT RESTORATION
   --------------------------------------------------------- */

function restoreSearchInput() {
  const input = document.getElementById("global-search");

  if (!input) {
    return;
  }

  const hash = window.location.hash || "";

  if (!hash.includes("q=")) {
    input.value = "";
    return;
  }

  try {
    const queryString = hash.split("?")[1] || "";

    const params = new URLSearchParams(queryString);

    input.value = params.get("q") || "";
  } catch (error) {
    input.value = "";
  }
}


/* ---------------------------------------------------------
   PAGE HEADER COMPONENT
   --------------------------------------------------------- */

function pageHeader(eyebrow, title, description = "") {
  return `
    <section class="page-header">

      <div>

        ${
          eyebrow
            ? `<span class="eyebrow">${esc(eyebrow)}</span>`
            : ""
        }

        <h1>
          ${esc(title)}
        </h1>

        ${
          description
            ? `<p>${esc(description)}</p>`
            : ""
        }

      </div>

    </section>
  `;
}


/* ---------------------------------------------------------
   EMPTY STATE
   --------------------------------------------------------- */

function emptyState(
  icon,
  title,
  message,
  buttonText = "",
  buttonAction = ""
) {
  return `
    <div class="empty-state">

      <div class="empty-icon">
        ${icon}
      </div>

      <h3>
        ${esc(title)}
      </h3>

      <p>
        ${esc(message)}
      </p>

      ${
        buttonText
          ? `
            <button
              class="button primary"
              type="button"
              onclick="${buttonAction}"
            >
              ${esc(buttonText)}
            </button>
          `
          : ""
      }

    </div>
  `;
}


/* ---------------------------------------------------------
   SECTION HEADER
   --------------------------------------------------------- */

function sectionHeader(
  title,
  subtitle = "",
  actionText = "",
  actionHref = ""
) {
  return `
    <div class="section-header">

      <div>

        <h2>
          ${esc(title)}
        </h2>

        ${
          subtitle
            ? `<p>${esc(subtitle)}</p>`
            : ""
        }

      </div>

      ${
        actionText && actionHref
          ? `
            <a
              href="${actionHref}"
              class="text-link"
            >
              ${esc(actionText)}
              →
            </a>
          `
          : ""
      }

    </div>
  `;
}


/* ---------------------------------------------------------
   END OF CHUNK 2
   ========================================================= */


/* =========================================================
   CHUNK 3A/2 — PRODUCT & STORE CARDS
   ========================================================= */


/* ---------------------------------------------------------
   PRODUCT CARD
   --------------------------------------------------------- */

function productCard(product) {
  if (!product) return "";

  const wished = isWishlisted(product.id);

  return `
    <article class="product-card">

      <div class="product-image-wrap">

        <a
          href="#/product/${encodeURIComponent(product.id)}"
          class="product-image-link"
          aria-label="View ${esc(product.name)}"
        >
          <img
            src="${esc(product.image)}"
            alt="${esc(product.name)}"
            class="product-image"
            loading="lazy"
            onerror="imageFallback(event)"
          />
        </a>

        <button
          class="wishlist-button ${wished ? "active" : ""}"
          type="button"
          aria-label="${wished ? "Remove from wishlist" : "Add to wishlist"}"
          onclick="toggleWishlist('${esc(product.id)}')"
        >
          ${wished ? "♥" : "♡"}
        </button>

        ${
          product.featured
            ? `<span class="product-tag">Featured</span>`
            : ""
        }

      </div>


      <div class="product-card-body">

        <div class="product-store">
          <a href="#/store/${encodeURIComponent(product.storeSlug)}">
            ${esc(product.store)}
          </a>
        </div>

        <a
          href="#/product/${encodeURIComponent(product.id)}"
          class="product-name"
        >
          ${esc(product.name)}
        </a>

        <div class="product-meta">

          <strong class="product-price">
            ${money(product.price)}
          </strong>

          <span class="product-rating">
            ★ ${esc(product.rating)}
          </span>

        </div>

        <button
          class="button product-add-button"
          type="button"
          onclick="addToCart('${esc(product.id)}')"
        >
          Add to cart
        </button>

      </div>

    </article>
  `;
}


/* ---------------------------------------------------------
   PRODUCT GRID
   --------------------------------------------------------- */

function productGrid(
  products,
  emptyMessage = "No products found."
) {
  if (!products || products.length === 0) {
    return emptyState(
      "🛍",
      "Nothing here yet",
      emptyMessage
    );
  }

  return `
    <div class="product-grid">
      ${products.map(productCard).join("")}
    </div>
  `;
}


/* ---------------------------------------------------------
   STORE CARD
   --------------------------------------------------------- */

function storeCard(store) {
  if (!store) return "";

  return `
    <article class="store-card">

      <a
        href="#/store/${encodeURIComponent(store.slug)}"
        class="store-image-link"
      >
        <img
          src="${esc(store.image)}"
          alt="${esc(store.name)}"
          class="store-image"
          loading="lazy"
          onerror="imageFallback(event)"
        />
      </a>


      <div class="store-card-body">

        <div class="store-card-top">

          <div>

            <a
              href="#/store/${encodeURIComponent(store.slug)}"
              class="store-name"
            >
              ${esc(store.name)}
            </a>

            <span class="store-location">
              ${esc(store.location)}
            </span>

          </div>

          <span class="store-rating">
            ★ ${esc(store.rating)}
          </span>

        </div>


        <p class="store-description">
          ${esc(store.description)}
        </p>


        <div class="store-card-footer">

          <span>
            ${esc(store.products)} products
          </span>

          <a
            href="#/store/${encodeURIComponent(store.slug)}"
            class="text-link"
          >
            Visit store →
          </a>

        </div>

      </div>

    </article>
  `;
}


/* ---------------------------------------------------------
   STORE GRID
   --------------------------------------------------------- */

function storeGrid(
  stores,
  emptyMessage = "No stores found."
) {
  if (!stores || stores.length === 0) {
    return emptyState(
      "🏪",
      "No stores found",
      emptyMessage
    );
  }

  return `
    <div class="store-grid">
      ${stores.map(storeCard).join("")}
    </div>
  `;
}


/* ---------------------------------------------------------
   END OF CHUNK 3A
   ========================================================= */


/* =========================================================
   CHUNK 3B/2 — CATEGORIES, FILTERING & PAGES
   ========================================================= */


/* ---------------------------------------------------------
   CATEGORY DATA
   --------------------------------------------------------- */

const CATEGORIES = [
  {
    name: "Fashion",
    icon: "✦",
    description: "Clothing & style"
  },
  {
    name: "Shoes",
    icon: "◈",
    description: "Sneakers & footwear"
  },
  {
    name: "Tech",
    icon: "⌁",
    description: "Gadgets & gear"
  },
  {
    name: "Accessories",
    icon: "◇",
    description: "Everyday essentials"
  },
  {
    name: "Home",
    icon: "⌂",
    description: "Furniture & living"
  },
  {
    name: "Bags",
    icon: "▱",
    description: "Bags & carry"
  }
];


/* ---------------------------------------------------------
   CATEGORY CARD
   --------------------------------------------------------- */

function categoryCard(category) {
  return `
    <a
      href="#/discover?category=${encodeURIComponent(category.name)}"
      class="category-card"
    >

      <span class="category-icon">
        ${category.icon}
      </span>

      <span class="category-name">
        ${esc(category.name)}
      </span>

      <span class="category-description">
        ${esc(category.description)}
      </span>

    </a>
  `;
}


/* ---------------------------------------------------------
   CATEGORY ROW
   --------------------------------------------------------- */

function categoryRow() {
  return `
    <div class="category-row">
      ${CATEGORIES.map(categoryCard).join("")}
    </div>
  `;
}


/* ---------------------------------------------------------
   FILTER PRODUCTS
   --------------------------------------------------------- */

function filterProducts(
  products,
  search = "",
  category = "All"
) {
  const query = String(search || "")
    .trim()
    .toLowerCase();

  return products.filter(product => {

    const matchesSearch =
      !query ||
      product.name.toLowerCase().includes(query) ||
      product.store.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query);

    const matchesCategory =
      !category ||
      category === "All" ||
      product.category === category;

    return matchesSearch && matchesCategory;
  });
}


/* ---------------------------------------------------------
   HOME PAGE
   --------------------------------------------------------- */

function renderHomePage() {

  const featuredProducts = allProducts()
    .filter(product => product.featured)
    .slice(0, 8);

  const popularStores = STORES.slice(0, 5);

  layout(`

    <section class="hero-section">

      <div class="hero-content">

        <span class="eyebrow">
          THE MARKETPLACE FOR MODERN SHOPPING
        </span>

        <h1>
          Discover products.<br>
          <span>Support local stores.</span>
        </h1>

        <p>
          Shop from independent sellers and discover
          stores built by people just like you.
        </p>

        <div class="hero-actions">

          <a
            href="#/discover"
            class="button primary"
          >
            Start shopping
          </a>

          <a
            href="#/seller"
            class="button secondary"
          >
            Open your store
          </a>

        </div>

      </div>


      <div class="hero-visual">

        <div class="hero-card hero-card-main">

          <img
            src="${esc(
              featuredProducts[0]?.image ||
              PRODUCTS[0].image
            )}"
            alt="Featured product"
            onerror="imageFallback(event)"
          />

          <div class="hero-card-overlay">

            <span>
              Featured
            </span>

            <strong>
              ${esc(
                featuredProducts[0]?.name ||
                PRODUCTS[0].name
              )}
            </strong>

            <b>
              ${money(
                featuredProducts[0]?.price ||
                PRODUCTS[0].price
              )}
            </b>

          </div>

        </div>


        <div class="hero-floating-card">

          <span class="hero-floating-icon">
            ✓
          </span>

          <div>

            <strong>
              Built for local sellers
            </strong>

            <small>
              Create your store online
            </small>

          </div>

        </div>

      </div>

    </section>


    <section class="section">

      ${sectionHeader(
        "Shop by category",
        "Find something that fits your world."
      )}

      ${categoryRow()}

    </section>


    <section class="section">

      ${sectionHeader(
        "Featured products",
        "Fresh picks from stores on MyStore.",
        "View all",
        "#/discover"
      )}

      ${productGrid(featuredProducts)}

    </section>


    <section class="section section-muted">

      ${sectionHeader(
        "Discover stores",
        "Explore independent businesses and their collections.",
        "View all stores",
        "#/stores"
      )}

      ${storeGrid(popularStores)}

    </section>


    <section class="seller-cta-section">

      <div class="seller-cta-content">

        <span class="eyebrow">
          SELL ON MYSTORE
        </span>

        <h2>
          Your physical shop deserves<br>
          an online storefront.
        </h2>

        <p>
          Turn your existing shop into a digital store,
          reach more customers and manage your products
          from one place.
        </p>

        <a
          href="#/seller"
          class="button primary"
        >
          Open your store
        </a>

      </div>


      <div class="seller-cta-stat">

        <strong>
          01
        </strong>

        <span>
          Create your store
        </span>

        <small>
          Then start adding products.
        </small>

      </div>

    </section>

  `);
}


/* ---------------------------------------------------------
   DISCOVER PAGE
   --------------------------------------------------------- */

function renderDiscoverPage() {

  const hash = window.location.hash || "";

  let query = "";
  let category = "All";


  if (hash.includes("?")) {

    const queryString = hash.split("?")[1];

    try {

      const params =
        new URLSearchParams(queryString);

      query = params.get("q") || "";

      category =
        params.get("category") || "All";

    } catch (error) {

      query = "";
      category = "All";

    }
  }


  currentSearch = query;
  currentCategory = category;


  const filtered = filterProducts(
    allProducts(),
    query,
    category
  );


  const categories = [
    "All",
    ...CATEGORIES.map(
      category => category.name
    )
  ];


  layout(`

    ${pageHeader(
      "DISCOVER",
      query
        ? `Search results for "${query}"`
        : "Find something you'll love",
      "Browse products from stores across MyStore."
    )}


    <section class="discover-controls">

      <div class="filter-scroll">

        ${categories.map(item => `

          <a
            href="#/discover?category=${encodeURIComponent(item)}"
            class="filter-pill ${
              category === item ? "active" : ""
            }"
          >
            ${esc(item)}
          </a>

        `).join("")}

      </div>

    </section>


    <section class="section discover-results">

      <div class="results-summary">

        <span>
          ${filtered.length}
          product${filtered.length === 1 ? "" : "s"}
        </span>


        ${
          query || category !== "All"
            ? `
              <a
                href="#/discover"
                class="text-link"
              >
                Clear filters
              </a>
            `
            : ""
        }

      </div>


      ${productGrid(
        filtered,
        query
          ? "We couldn't find products matching your search."
          : "There are no products in this category yet."
      )}

    </section>

  `);


  restoreSearchInput();
}


/* ---------------------------------------------------------
   STORES PAGE
   --------------------------------------------------------- */

function renderStoresPage() {

  layout(`

    ${pageHeader(
      "STORES",
      "Discover independent stores",
      "Browse the businesses and sellers behind the products."
    )}


    <section class="section">

      <div class="store-page-intro">

        <div>

          <strong>
            ${STORES.length} stores
          </strong>

          <span>
            on MyStore
          </span>

        </div>

      </div>


      ${storeGrid(
        STORES,
        "There are no stores available yet."
      )}

    </section>

  `);
}


/* ---------------------------------------------------------
   END OF CHUNK 3B
   ========================================================= */


/* =========================================================
   CHUNK 4/8 — STORE & PRODUCT DETAIL PAGES
   ========================================================= */


/* ---------------------------------------------------------
   STORE PAGE
   --------------------------------------------------------- */

function renderStorePage(slug) {

  const store = getStore(slug);

  if (!store) {
    layout(`
      ${pageHeader(
        "STORE",
        "Store not found",
        "This store may no longer be available."
      )}

      <section class="section">

        ${emptyState(
          "🏪",
          "Store unavailable",
          "We couldn't find the store you're looking for.",
          "Browse stores",
          "navigate('#/stores')"
        )}

      </section>
    `);

    return;
  }


  const products = getStoreProducts(slug);


  layout(`

    <section class="store-hero">

      <div class="store-hero-image">

        <img
          src="${esc(store.image)}"
          alt="${esc(store.name)}"
          onerror="imageFallback(event)"
        />

      </div>


      <div class="store-hero-content">

        <span class="eyebrow">
          ${esc(store.category)}
        </span>

        <h1>
          ${esc(store.name)}
        </h1>

        <p>
          ${esc(store.description)}
        </p>


        <div class="store-hero-meta">

          <span>
            ★ ${esc(store.rating)}
          </span>

          <span>
            ${esc(store.products)} products
          </span>

          <span>
            ${esc(store.location)}
          </span>

        </div>


        <div class="store-hero-actions">

          <button
            class="button primary"
            type="button"
            onclick="scrollToStoreProducts()"
          >
            Shop this store
          </button>

          <button
            class="button secondary"
            type="button"
            onclick="shareStore('${esc(store.slug)}')"
          >
            Share store
          </button>

        </div>

      </div>

    </section>


    <section
      class="section"
      id="store-products"
    >

      ${sectionHeader(
        "Products",
        `Explore products from ${store.name}.`
      )}

      ${productGrid(
        products,
        "This store hasn't added products yet."
      )}

    </section>

  `);
}


/* ---------------------------------------------------------
   SCROLL TO STORE PRODUCTS
   --------------------------------------------------------- */

function scrollToStoreProducts() {

  const element =
    document.getElementById("store-products");

  if (!element) return;

  element.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}


/* ---------------------------------------------------------
   SHARE STORE
   --------------------------------------------------------- */

async function shareStore(slug) {

  const store = getStore(slug);

  if (!store) return;


  const shareData = {
    title: store.name,
    text: `Check out ${store.name} on MyStore.`,
    url: window.location.href
  };


  try {

    if (
      navigator.share &&
      typeof navigator.share === "function"
    ) {

      await navigator.share(shareData);

      return;
    }

  } catch (error) {

    if (error.name === "AbortError") {
      return;
    }

  }


  try {

    await navigator.clipboard.writeText(
      window.location.href
    );

    toast("Store link copied!");

  } catch (error) {

    toast("Copy the page link from your browser.");

  }
}


/* ---------------------------------------------------------
   PRODUCT DETAIL PAGE
   --------------------------------------------------------- */

function renderProductPage(productId) {

  const product = getProduct(productId);


  if (!product) {

    layout(`

      ${pageHeader(
        "PRODUCT",
        "Product not found",
        "This product may no longer be available."
      )}


      <section class="section">

        ${emptyState(
          "🛍",
          "Product unavailable",
          "We couldn't find the product you're looking for.",
          "Continue shopping",
          "navigate('#/discover')"
        )}

      </section>

    `);

    return;
  }


  const wished =
    isWishlisted(product.id);


  const relatedProducts =
    allProducts()
      .filter(item =>
        item.id !== product.id &&
        item.category === product.category
      )
      .slice(0, 4);


  layout(`

    <section class="product-detail">

      <div class="product-detail-image">

        <img
          src="${esc(product.image)}"
          alt="${esc(product.name)}"
          onerror="imageFallback(event)"
        />

        ${
          product.featured
            ? `
              <span class="product-detail-tag">
                Featured
              </span>
            `
            : ""
        }

      </div>


      <div class="product-detail-info">

        <a
          href="#/store/${encodeURIComponent(product.storeSlug)}"
          class="product-detail-store"
        >
          ${esc(product.store)}
        </a>


        <h1>
          ${esc(product.name)}
        </h1>


        <div class="product-detail-rating">

          <span>
            ★ ${esc(product.rating)}
          </span>

          <span>
            ${esc(product.reviews)} reviews
          </span>

        </div>


        <div class="product-detail-price">
          ${money(product.price)}
        </div>


        <p class="product-detail-description">
          ${esc(product.description)}
        </p>


        <div class="product-detail-actions">

          <button
            class="button primary large"
            type="button"
            onclick="addToCart('${esc(product.id)}')"
          >
            Add to cart
          </button>


          <button
            class="button wishlist-detail-button ${
              wished ? "active" : ""
            }"
            type="button"
            onclick="toggleWishlist('${esc(product.id)}')"
          >
            ${wished ? "♥ Saved" : "♡ Save"}
          </button>

        </div>


        <div class="product-trust">

          <div>
            <strong>✓</strong>
            <span>Shop from independent sellers</span>
          </div>

          <div>
            <strong>✓</strong>
            <span>Secure checkout coming soon</span>
          </div>

          <div>
            <strong>✓</strong>
            <span>Built for local shopping</span>
          </div>

        </div>

      </div>

    </section>


    <section class="section product-related">

      ${sectionHeader(
        "You may also like",
        `More ${product.category.toLowerCase()} products.`
      )}

      ${productGrid(
        relatedProducts,
        "No similar products available yet."
      )}

    </section>

  `);
}


/* ---------------------------------------------------------
   END OF CHUNK 4
   ========================================================= */


/* =========================================================
   CHUNK 5A/2 — CART & WISHLIST
   ========================================================= */


/* ---------------------------------------------------------
   ADD TO CART
   --------------------------------------------------------- */

function addToCart(productId) {

  const product = getProduct(productId);

  if (!product) {
    toast("Product not found.");
    return;
  }


  const existing = cart.find(
    item => item.productId === productId
  );


  if (existing) {

    existing.quantity += 1;

  } else {

    cart.push({
      productId: productId,
      quantity: 1
    });

  }


  saveStorage("mystore_cart", cart);

  toast(`${product.name} added to cart.`);

  updateHeaderState();
}


/* ---------------------------------------------------------
   REMOVE FROM CART
   --------------------------------------------------------- */

function removeFromCart(productId) {

  cart = cart.filter(
    item => item.productId !== productId
  );


  saveStorage("mystore_cart", cart);

  renderCartPage();
}


/* ---------------------------------------------------------
   UPDATE CART QUANTITY
   --------------------------------------------------------- */

function updateCartQuantity(productId, change) {

  const item = cart.find(
    cartItem => cartItem.productId === productId
  );


  if (!item) return;


  item.quantity += Number(change);


  if (item.quantity <= 0) {

    cart = cart.filter(
      cartItem => cartItem.productId !== productId
    );

  }


  saveStorage("mystore_cart", cart);

  renderCartPage();
}


/* ---------------------------------------------------------
   CLEAR CART
   --------------------------------------------------------- */

function clearCart() {

  if (!cart.length) {
    toast("Your cart is already empty.");
    return;
  }


  const confirmed =
    window.confirm(
      "Remove all items from your cart?"
    );


  if (!confirmed) return;


  cart = [];

  saveStorage("mystore_cart", cart);

  renderCartPage();

  toast("Cart cleared.");
}


/* ---------------------------------------------------------
   TOGGLE WISHLIST
   --------------------------------------------------------- */

function toggleWishlist(productId) {

  const product = getProduct(productId);

  if (!product) return;


  const index =
    wishlist.indexOf(productId);


  if (index === -1) {

    wishlist.push(productId);

    toast("Added to wishlist.");

  } else {

    wishlist.splice(index, 1);

    toast("Removed from wishlist.");

  }


  saveStorage(
    "mystore_wishlist",
    wishlist
  );


  updateHeaderState();


  /*
     Re-render the current page so wishlist
     buttons immediately reflect the new state.
  */

  route();
}


/* ---------------------------------------------------------
   WISHLIST PRODUCTS
   --------------------------------------------------------- */

function getWishlistProducts() {

  return wishlist
    .map(id => getProduct(id))
    .filter(Boolean);

}


/* ---------------------------------------------------------
   CART ITEM CARD
   --------------------------------------------------------- */

function cartItemCard(item) {

  const product =
    getProduct(item.productId);


  if (!product) return "";


  const quantity =
    Number(item.quantity || 1);


  return `
    <article class="cart-item">

      <a
        href="#/product/${encodeURIComponent(product.id)}"
        class="cart-item-image"
      >

        <img
          src="${esc(product.image)}"
          alt="${esc(product.name)}"
          onerror="imageFallback(event)"
        />

      </a>


      <div class="cart-item-info">

        <a
          href="#/store/${encodeURIComponent(product.storeSlug)}"
          class="cart-item-store"
        >
          ${esc(product.store)}
        </a>


        <a
          href="#/product/${encodeURIComponent(product.id)}"
          class="cart-item-name"
        >
          ${esc(product.name)}
        </a>


        <strong class="cart-item-price">
          ${money(product.price)}
        </strong>


        <div class="cart-item-controls">

          <div class="quantity-control">

            <button
              type="button"
              aria-label="Decrease quantity"
              onclick="updateCartQuantity('${esc(product.id)}', -1)"
            >
              −
            </button>


            <span>
              ${quantity}
            </span>


            <button
              type="button"
              aria-label="Increase quantity"
              onclick="updateCartQuantity('${esc(product.id)}', 1)"
            >
              +
            </button>

          </div>


          <button
            type="button"
            class="remove-button"
            onclick="removeFromCart('${esc(product.id)}')"
          >
            Remove
          </button>

        </div>

      </div>


      <strong class="cart-item-total">
        ${money(product.price * quantity)}
      </strong>

    </article>
  `;
}


/* ---------------------------------------------------------
   CART SUMMARY
   --------------------------------------------------------- */

function cartSummary() {

  const subtotal = cartSubtotal();


  return `
    <aside class="cart-summary">

      <h2>
        Order summary
      </h2>


      <div class="summary-row">

        <span>
          Subtotal
        </span>

        <strong>
          ${money(subtotal)}
        </strong>

      </div>


      <div class="summary-row">

        <span>
          Delivery
        </span>

        <span>
          Calculated at checkout
        </span>

      </div>


      <div class="summary-divider"></div>


      <div class="summary-total">

        <span>
          Total
        </span>

        <strong>
          ${money(subtotal)}
        </strong>

      </div>


      <button
        type="button"
        class="button primary checkout-button"
        onclick="beginCheckout()"
      >
        Proceed to checkout
      </button>


      <p class="checkout-note">
        Checkout and payments will be connected later.
      </p>

    </aside>
  `;
}


/* ---------------------------------------------------------
   END OF CHUNK 5A
   ========================================================= */


/* =========================================================
   CHUNK 5B/2 — CART PAGE, WISHLIST & ACCOUNT
   ========================================================= */


/* ---------------------------------------------------------
   CART PAGE
   --------------------------------------------------------- */

function renderCartPage() {

  const validItems = cart.filter(item => {
    return getProduct(item.productId);
  });


  if (!validItems.length) {

    layout(`

      ${pageHeader(
        "CART",
        "Your cart",
        "Products you add to your cart will appear here."
      )}


      <section class="section">

        ${emptyState(
          "🛒",
          "Your cart is empty",
          "Discover something you love and add it to your cart.",
          "Start shopping",
          "navigate('#/discover')"
        )}

      </section>

    `);

    updateHeaderState();

    return;
  }


  layout(`

    ${pageHeader(
      "CART",
      "Your shopping cart",
      `${cartCount()} item${cartCount() === 1 ? "" : "s"} ready for checkout.`
    )}


    <section class="cart-section">

      <div class="cart-items">

        <div class="cart-items-header">

          <strong>
            Your items
          </strong>

          <button
            type="button"
            class="text-button danger"
            onclick="clearCart()"
          >
            Clear cart
          </button>

        </div>


        ${validItems.map(cartItemCard).join("")}

      </div>


      ${cartSummary()}

    </section>

  `);


  updateHeaderState();
}


/* ---------------------------------------------------------
   BEGIN CHECKOUT
   --------------------------------------------------------- */

function beginCheckout() {

  if (!cart.length) {

    toast("Your cart is empty.");

    return;
  }


  toast(
    "Checkout will be connected to payments later."
  );
}


/* ---------------------------------------------------------
   WISHLIST PAGE
   --------------------------------------------------------- */

function renderWishlistPage() {

  const products =
    getWishlistProducts();


  layout(`

    ${pageHeader(
      "WISHLIST",
      "Saved for later",
      "Keep track of products you want to come back to."
    )}


    <section class="section">

      ${
        products.length
          ? productGrid(products)
          : emptyState(
              "♡",
              "Your wishlist is empty",
              "Tap the heart on a product to save it here.",
              "Discover products",
              "navigate('#/discover')"
            )
      }

    </section>

  `);


  updateHeaderState();
}


/* ---------------------------------------------------------
   ACCOUNT PAGE
   --------------------------------------------------------- */

function renderAccountPage() {

  layout(`

    ${pageHeader(
      "ACCOUNT",
      "Your account",
      "Manage your shopping activity and MyStore profile."
    )}


    <section class="account-page">

      <div class="account-profile-card">

        <div class="account-profile-avatar">
          A
        </div>


        <div class="account-profile-info">

          <span class="eyebrow">
            CUSTOMER
          </span>

          <h2>
            Alex
          </h2>

          <p>
            Your MyStore shopping account
          </p>

        </div>


        <button
          type="button"
          class="button secondary"
          onclick="showDemoNotice('Profile editing')"
        >
          Edit profile
        </button>

      </div>


      <div class="account-grid">

        <article class="account-card">

          <span class="account-card-icon">
            🛒
          </span>

          <div>

            <strong>
              Orders
            </strong>

            <p>
              Track your purchases and order history.
            </p>

          </div>

          <button
            type="button"
            class="text-link-button"
            onclick="showDemoNotice('Orders')"
          >
            View orders →
          </button>

        </article>


        <article class="account-card">

          <span class="account-card-icon">
            ♡
          </span>

          <div>

            <strong>
              Wishlist
            </strong>

            <p>
              ${wishlist.length}
              saved product${wishlist.length === 1 ? "" : "s"}.
            </p>

          </div>

          <a
            href="#/wishlist"
            class="text-link"
          >
            View wishlist →
          </a>

        </article>


        <article class="account-card">

          <span class="account-card-icon">
            📍
          </span>

          <div>

            <strong>
              Delivery addresses
            </strong>

            <p>
              Save your preferred delivery locations.
            </p>

          </div>

          <button
            type="button"
            class="text-link-button"
            onclick="showDemoNotice('Delivery addresses')"
          >
            Manage →
          </button>

        </article>


        <article class="account-card">

          <span class="account-card-icon">
            ⚙
          </span>

          <div>

            <strong>
              Account settings
            </strong>

            <p>
              Preferences and account information.
            </p>

          </div>

          <button
            type="button"
            class="text-link-button"
            onclick="showDemoNotice('Account settings')"
          >
            Open →
          </button>

        </article>

      </div>


      <div class="account-seller-banner">

        <div>

          <span class="eyebrow">
            SELL ON MYSTORE
          </span>

          <h2>
            Have products to sell?
          </h2>

          <p>
            Turn your physical shop into an online storefront.
          </p>

        </div>


        <a
          href="#/seller"
          class="button primary"
        >
          Open your store
        </a>

      </div>

    </section>

  `);
}


/* ---------------------------------------------------------
   DEMO NOTICE
   --------------------------------------------------------- */

function showDemoNotice(feature) {

  toast(
    `${feature} will be connected later.`
  );
}


/* ---------------------------------------------------------
   END OF CHUNK 5B
   ========================================================= */


/* =========================================================
   CHUNK 6 — PART 1/4
   SELLER DASHBOARD FOUNDATION
   ========================================================= */


/* ---------------------------------------------------------
   SELLER DASHBOARD
   --------------------------------------------------------- */

function renderSellerPage() {

  const products = sellerProducts || [];

  const totalProducts = products.length;

  const totalValue = products.reduce(
    (total, product) => {
      return total + Number(product.price || 0);
    },
    0
  );


  layout(`

    <section class="seller-dashboard-header">

      <div>

        <span class="eyebrow">
          SELLER CENTER
        </span>

        <h1>
          Your store dashboard
        </h1>

        <p>
          Manage your products, orders and online storefront.
        </p>

      </div>


      <button
        type="button"
        class="button primary"
        onclick="openAddProductModal()"
      >
        + Add product
      </button>

    </section>


    <section class="seller-stats">

      <article class="seller-stat-card">

        <span class="seller-stat-label">
          Products
        </span>

        <strong>
          ${totalProducts}
        </strong>

        <small>
          Listed products
        </small>

      </article>


      <article class="seller-stat-card">

        <span class="seller-stat-label">
          Orders
        </span>

        <strong>
          0
        </strong>

        <small>
          Orders received
        </small>

      </article>


      <article class="seller-stat-card">

        <span class="seller-stat-label">
          Revenue
        </span>

        <strong>
          ${money(0)}
        </strong>

        <small>
          Total sales
        </small>

      </article>


      <article class="seller-stat-card">

        <span class="seller-stat-label">
          Catalog value
        </span>

        <strong>
          ${money(totalValue)}
        </strong>

        <small>
          Current product prices
        </small>

      </article>

    </section>


    <section class="seller-dashboard-layout">

      <div class="seller-main-column">

        <div class="seller-panel">

          <div class="seller-panel-header">

            <div>

              <span class="eyebrow">
                CATALOG
              </span>

              <h2>
                Your products
              </h2>

            </div>


            <button
              type="button"
              class="text-link-button"
              onclick="openAddProductModal()"
            >
              Add product →
            </button>

          </div>


          ${
            products.length
              ? `
                <div class="seller-product-list">
                  ${products.map(sellerProductRow).join("")}
                </div>
              `
              : emptyState(
                  "📦",
                  "No products yet",
                  "Add your first product and start building your online store.",
                  "Add your first product",
                  "openAddProductModal()"
                )
          }

        </div>


        <div class="seller-panel">

          <div class="seller-panel-header">

            <div>

              <span class="eyebrow">
                ORDERS
              </span>

              <h2>
                Recent orders
              </h2>

            </div>

            <button
              type="button"
              class="text-link-button"
              onclick="showDemoNotice('Order management')"
            >
              View all →
            </button>

          </div>


          ${emptyState(
            "🛍",
            "No orders yet",
            "Orders from your customers will appear here."
          )}

        </div>

      </div>


      <aside class="seller-side-column">

        <div class="seller-panel seller-store-panel">

          <span class="eyebrow">
            YOUR STOREFRONT
          </span>

          <h2>
            MyStore Seller
          </h2>

          <p>
            Your online storefront will appear here once
            your seller profile is connected.
          </p>

          <button
            type="button"
            class="button secondary"
            onclick="showDemoNotice('Storefront settings')"
          >
            Store settings
          </button>

        </div>


        <div class="seller-panel">

          <span class="eyebrow">
            QUICK ACTIONS
          </span>

          <div class="seller-quick-actions">

            <button
              type="button"
              onclick="openAddProductModal()"
            >
              <span>＋</span>
              Add product
            </button>

            <button
              type="button"
              onclick="showDemoNotice('Store analytics')"
            >
              <span>↗</span>
              View analytics
            </button>

            <button
              type="button"
              onclick="showDemoNotice('Store settings')"
            >
              <span>⚙</span>
              Store settings
            </button>

          </div>

        </div>

      </aside>

    </section>

  `);

}


/* ---------------------------------------------------------
   SELLER PRODUCT ROW
   --------------------------------------------------------- */

function sellerProductRow(product) {

  return `
    <article class="seller-product-row">

      <img
        src="${esc(product.image)}"
        alt="${esc(product.name)}"
        onerror="imageFallback(event)"
      />


      <div class="seller-product-info">

        <strong>
          ${esc(product.name)}
        </strong>

        <span>
          ${esc(product.category)}
        </span>

      </div>


      <strong class="seller-product-price">
        ${money(product.price)}
      </strong>


      <div class="seller-product-actions">

        <button
          type="button"
          onclick="editSellerProduct('${esc(product.id)}')"
        >
          Edit
        </button>

        <button
          type="button"
          class="danger-text"
          onclick="deleteSellerProduct('${esc(product.id)}')"
        >
          Delete
        </button>

      </div>

    </article>
  `;
}


/* ---------------------------------------------------------
   END OF CHUNK 6 PART 1
   ========================================================= */


/* =========================================================
   CHUNK 6 — PART 2/4
   SELLER PRODUCT MANAGEMENT
   ========================================================= */


/* ---------------------------------------------------------
   CREATE SELLER PRODUCT
   --------------------------------------------------------- */

function createSellerProduct(data) {

  const product = {

    id:
      "seller-" +
      Date.now(),

    name:
      data.name.trim(),

    price:
      Number(data.price) || 0,

    category:
      data.category.trim() || "Other",

    store:
      "MyStore Seller",

    storeSlug:
      "mystore-seller",

    rating:
      0,

    reviews:
      0,

    image:
      data.image.trim() ||
      PRODUCTS[0].image,

    description:
      data.description.trim(),

    featured:
      false

  };


  sellerProducts.push(product);

  saveStorage(
    "mystore_seller_products",
    sellerProducts
  );


  toast("Product added successfully.");

  closeModal();

  renderSellerPage();
}


/* ---------------------------------------------------------
   EDIT SELLER PRODUCT
   --------------------------------------------------------- */

function editSellerProduct(productId) {

  const product =
    sellerProducts.find(
      item => item.id === productId
    );


  if (!product) {

    toast("Product not found.");

    return;
  }


  openProductModal(product);
}


/* ---------------------------------------------------------
   DELETE SELLER PRODUCT
   --------------------------------------------------------- */

function deleteSellerProduct(productId) {

  const product =
    sellerProducts.find(
      item => item.id === productId
    );


  if (!product) {

    toast("Product not found.");

    return;
  }


  const confirmed =
    window.confirm(
      `Delete "${product.name}"?`
    );


  if (!confirmed) return;


  sellerProducts =
    sellerProducts.filter(
      item => item.id !== productId
    );


  saveStorage(
    "mystore_seller_products",
    sellerProducts
  );


  toast("Product deleted.");

  renderSellerPage();
}


/* ---------------------------------------------------------
   SAVE EDITED PRODUCT
   --------------------------------------------------------- */

function updateSellerProduct(productId, data) {

  const product =
    sellerProducts.find(
      item => item.id === productId
    );


  if (!product) {

    toast("Product not found.");

    return;
  }


  product.name =
    data.name.trim();

  product.price =
    Number(data.price) || 0;

  product.category =
    data.category.trim() || "Other";

  product.image =
    data.image.trim() ||
    product.image;

  product.description =
    data.description.trim();


  saveStorage(
    "mystore_seller_products",
    sellerProducts
  );


  toast("Product updated successfully.");

  closeModal();

  renderSellerPage();
}


/* ---------------------------------------------------------
   END OF CHUNK 6 PART 2
   ========================================================= */


/* =========================================================
   CHUNK 6 — PART 3/4
   PRODUCT FORM MODAL
   ========================================================= */


/* ---------------------------------------------------------
   OPEN ADD PRODUCT MODAL
   --------------------------------------------------------- */

function openAddProductModal() {

  openProductModal(null);

}


/* ---------------------------------------------------------
   OPEN PRODUCT MODAL
   --------------------------------------------------------- */

function openProductModal(product = null) {

  const isEditing = Boolean(product);


  const modal =
    document.createElement("div");

  modal.id = "mystore-modal";

  modal.className = "modal-overlay";


  modal.innerHTML = `

    <div
      class="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
    >

      <div class="modal-header">

        <div>

          <span class="eyebrow">
            ${isEditing ? "EDIT PRODUCT" : "NEW PRODUCT"}
          </span>

          <h2 id="product-modal-title">
            ${isEditing ? "Edit product" : "Add a product"}
          </h2>

        </div>


        <button
          type="button"
          class="modal-close"
          onclick="closeModal()"
          aria-label="Close"
        >
          ✕
        </button>

      </div>


      <form
        class="product-form"
        onsubmit="${
          isEditing
            ? `submitEditProduct(event, '${esc(product.id)}')`
            : "submitNewProduct(event)"
        }"
      >

        <label>

          <span>
            Product name
          </span>

          <input
            type="text"
            name="name"
            required
            maxlength="100"
            placeholder="e.g. Classic Black Hoodie"
            value="${isEditing ? esc(product.name) : ""}"
          />

        </label>


        <div class="form-row">

          <label>

            <span>
              Price (KES)
            </span>

            <input
              type="number"
              name="price"
              min="0"
              step="1"
              required
              placeholder="2500"
              value="${isEditing ? esc(product.price) : ""}"
            />

          </label>


          <label>

            <span>
              Category
            </span>

            <select
              name="category"
              required
            >

              <option value="">
                Select category
              </option>

              ${CATEGORIES.map(category => `
                <option
                  value="${esc(category.name)}"
                  ${
                    isEditing &&
                    product.category === category.name
                      ? "selected"
                      : ""
                  }
                >
                  ${esc(category.name)}
                </option>
              `).join("")}

            </select>

          </label>

        </div>


        <label>

          <span>
            Product image URL
          </span>

          <input
            type="url"
            name="image"
            placeholder="https://..."
            value="${isEditing ? esc(product.image) : ""}"
          />

        </label>


        <label>

          <span>
            Description
          </span>

          <textarea
            name="description"
            rows="5"
            maxlength="500"
            placeholder="Describe your product..."
          >${isEditing ? esc(product.description) : ""}</textarea>

        </label>


        <div class="form-actions">

          <button
            type="button"
            class="button secondary"
            onclick="closeModal()"
          >
            Cancel
          </button>


          <button
            type="submit"
            class="button primary"
          >
            ${isEditing ? "Save changes" : "Add product"}
          </button>

        </div>

      </form>

    </div>

  `;


  document.body.appendChild(modal);


  setTimeout(() => {

    const firstInput =
      modal.querySelector(
        'input[name="name"]'
      );

    if (firstInput) {
      firstInput.focus();
    }

  }, 50);

}


/* ---------------------------------------------------------
   SUBMIT NEW PRODUCT
   --------------------------------------------------------- */

function submitNewProduct(event) {

  event.preventDefault();


  const form =
    event.target;


  const data = {

    name:
      form.elements.name.value,

    price:
      form.elements.price.value,

    category:
      form.elements.category.value,

    image:
      form.elements.image.value,

    description:
      form.elements.description.value

  };


  createSellerProduct(data);

}


/* ---------------------------------------------------------
   SUBMIT EDITED PRODUCT
   --------------------------------------------------------- */

function submitEditProduct(
  event,
  productId
) {

  event.preventDefault();


  const form =
    event.target;


  const data = {

    name:
      form.elements.name.value,

    price:
      form.elements.price.value,

    category:
      form.elements.category.value,

    image:
      form.elements.image.value,

    description:
      form.elements.description.value

  };


  updateSellerProduct(
    productId,
    data
  );

}


/* ---------------------------------------------------------
   CLOSE MODAL
   --------------------------------------------------------- */

function closeModal() {

  const modal =
    document.getElementById(
      "mystore-modal"
    );


  if (modal) {
    modal.remove();
  }

}


/* ---------------------------------------------------------
   END OF CHUNK 6 PART 3
   ========================================================= */


/* =========================================================
   CHUNK 6 — PART 4/4
   SELLER NAVIGATION & SETTINGS
   ========================================================= */


/* ---------------------------------------------------------
   SELLER NAVIGATION
   --------------------------------------------------------- */

function sellerNavigate(section) {

  switch (section) {

    case "products":
      renderSellerPage();
      break;

    case "orders":
      showDemoNotice("Order management");
      break;

    case "analytics":
      showDemoNotice("Store analytics");
      break;

    case "settings":
      showDemoNotice("Store settings");
      break;

    default:
      renderSellerPage();

  }

}


/* ---------------------------------------------------------
   STORE SETTINGS NOTICE
   --------------------------------------------------------- */

function openStoreSettings() {

  showDemoNotice(
    "Store settings"
  );

}


/* ---------------------------------------------------------
   SELLER ORDERS NOTICE
   --------------------------------------------------------- */

function openSellerOrders() {

  showDemoNotice(
    "Order management"
  );

}


/* ---------------------------------------------------------
   SELLER ANALYTICS NOTICE
   --------------------------------------------------------- */

function openSellerAnalytics() {

  showDemoNotice(
    "Store analytics"
  );

}


/* ---------------------------------------------------------
   END OF CHUNK 6
   ========================================================= */


/* =========================================================
   CHUNK 7 — PART 1/3
   GENERAL MODAL UTILITIES
   ========================================================= */


/* ---------------------------------------------------------
   CLOSE MODAL WHEN CLICKING OUTSIDE
   --------------------------------------------------------- */

document.addEventListener("click", function(event) {

  const modal =
    document.getElementById("mystore-modal");

  if (!modal) return;


  if (event.target === modal) {
    closeModal();
  }

});


/* ---------------------------------------------------------
   CLOSE MODAL WITH ESCAPE KEY
   --------------------------------------------------------- */

document.addEventListener("keydown", function(event) {

  if (event.key !== "Escape") {
    return;
  }


  const modal =
    document.getElementById("mystore-modal");


  if (modal) {
    closeModal();
  }

});


/* ---------------------------------------------------------
   MODAL OPEN CHECK
   --------------------------------------------------------- */

function isModalOpen() {

  return Boolean(
    document.getElementById("mystore-modal")
  );

}


/* ---------------------------------------------------------
   END OF CHUNK 7 PART 1
   ========================================================= */


/* =========================================================
   CHUNK 7 — PART 2/3
   SELLER STORE PREVIEW
   ========================================================= */


/* ---------------------------------------------------------
   OPEN STORE PREVIEW
   --------------------------------------------------------- */

function openStorePreview() {

  const products = sellerProducts || [];


  const modal =
    document.createElement("div");

  modal.id = "mystore-modal";

  modal.className = "modal-overlay";


  modal.innerHTML = `

    <div
      class="modal modal-large"
      role="dialog"
      aria-modal="true"
      aria-labelledby="store-preview-title"
    >

      <div class="modal-header">

        <div>

          <span class="eyebrow">
            STOREFRONT PREVIEW
          </span>

          <h2 id="store-preview-title">
            MyStore Seller
          </h2>

        </div>


        <button
          type="button"
          class="modal-close"
          onclick="closeModal()"
          aria-label="Close"
        >
          ✕
        </button>

      </div>


      <div class="store-preview">

        <div class="store-preview-cover">

          <div class="store-preview-logo">
            M
          </div>

          <div>

            <h3>
              MyStore Seller
            </h3>

            <p>
              Your online store
            </p>

          </div>

        </div>


        <div class="store-preview-meta">

          <span>
            ${products.length} products
          </span>

          <span>
            ★ New store
          </span>

          <span>
            Kenya
          </span>

        </div>


        ${
          products.length
            ? `
              <div class="store-preview-products">

                ${products
                  .slice(0, 4)
                  .map(productCard)
                  .join("")}

              </div>
            `
            : `
              ${emptyState(
                "📦",
                "Your storefront is empty",
                "Add products from your seller dashboard to see them here."
              )}
            `
        }

      </div>


      <div class="form-actions">

        <button
          type="button"
          class="button secondary"
          onclick="closeModal()"
        >
          Close
        </button>


        <button
          type="button"
          class="button primary"
          onclick="closeModal(); openAddProductModal();"
        >
          + Add product
        </button>

      </div>

    </div>

  `;


  document.body.appendChild(modal);

}


/* ---------------------------------------------------------
   END OF CHUNK 7 PART 2
   ========================================================= */


/* =========================================================
   CHUNK 7 — PART 3/3
   FORM VALIDATION & IMAGE PREVIEW
   ========================================================= */


/* ---------------------------------------------------------
   FORM VALIDATION HELPERS
   --------------------------------------------------------- */

function validateProductData(data) {

  const name =
    String(data.name || "").trim();

  const price =
    Number(data.price);

  const category =
    String(data.category || "").trim();

  const description =
    String(data.description || "").trim();


  if (!name) {

    toast(
      "Please enter a product name."
    );

    return false;
  }


  if (
    !Number.isFinite(price) ||
    price < 0
  ) {

    toast(
      "Please enter a valid price."
    );

    return false;
  }


  if (!category) {

    toast(
      "Please select a category."
    );

    return false;
  }


  if (!description) {

    toast(
      "Please add a product description."
    );

    return false;
  }


  return true;
}


/* ---------------------------------------------------------
   PRODUCT IMAGE PREVIEW
   --------------------------------------------------------- */

function previewProductImage(input) {

  const url =
    String(input?.value || "").trim();


  const preview =
    document.getElementById(
      "product-image-preview"
    );


  if (!preview) {
    return;
  }


  if (!url) {

    preview.innerHTML = "";

    preview.classList.remove(
      "visible"
    );

    return;
  }


  preview.innerHTML = `

    <img
      src="${esc(url)}"
      alt="Product image preview"
      onerror="
        this.style.display='none';
        this.parentElement.classList.remove('visible');
      "
    />

  `;


  preview.classList.add(
    "visible"
  );
}


/* ---------------------------------------------------------
   END OF CHUNK 7 PART 3
   ========================================================= */


/* =========================================================
   CHUNK 8 — PART 1/3
   ROUTER
   ========================================================= */


/* ---------------------------------------------------------
   ROUTER
   --------------------------------------------------------- */

function route() {

  const hash =
    window.location.hash || "#/";


  const cleanHash =
    hash.split("?")[0];


  /* -------------------------------------------------------
     HOME
     ------------------------------------------------------- */

  if (
    cleanHash === "#" ||
    cleanHash === "#/"
  ) {

    renderHomePage();

    return;
  }


  /* -------------------------------------------------------
     DISCOVER
     ------------------------------------------------------- */

  if (
    cleanHash === "#/discover"
  ) {

    renderDiscoverPage();

    return;
  }


  /* -------------------------------------------------------
     STORES
     ------------------------------------------------------- */

  if (
    cleanHash === "#/stores"
  ) {

    renderStoresPage();

    return;
  }


  /* -------------------------------------------------------
     STORE
     ------------------------------------------------------- */

  if (
    cleanHash.startsWith("#/store/")
  ) {

    const slug =
      decodeURIComponent(
        cleanHash.replace("#/store/", "")
      );


    renderStorePage(slug);

    return;
  }


  /* -------------------------------------------------------
     PRODUCT
     ------------------------------------------------------- */

  if (
    cleanHash.startsWith("#/product/")
  ) {

    const productId =
      decodeURIComponent(
        cleanHash.replace("#/product/", "")
      );


    renderProductPage(productId);

    return;
  }


  /* -------------------------------------------------------
     CART
     ------------------------------------------------------- */

  if (
    cleanHash === "#/cart"
  ) {

    renderCartPage();

    return;
  }


  /* -------------------------------------------------------
     WISHLIST
     ------------------------------------------------------- */

  if (
    cleanHash === "#/wishlist"
  ) {

    renderWishlistPage();

    return;
  }


  /* -------------------------------------------------------
     ACCOUNT
     ------------------------------------------------------- */

  if (
    cleanHash === "#/account"
  ) {

    renderAccountPage();

    return;
  }


  /* -------------------------------------------------------
     SELLER
     ------------------------------------------------------- */

  if (
    cleanHash === "#/seller"
  ) {

    renderSellerPage();

    return;
  }


  /* -------------------------------------------------------
     UNKNOWN ROUTE
     ------------------------------------------------------- */

  layout(`

    ${pageHeader(
      "404",
      "Page not found",
      "The page you're looking for doesn't exist."
    )}

    <section class="section">

      ${emptyState(
        "⌁",
        "Nothing here",
        "Try heading back to the MyStore homepage.",
        "Back home",
        "navigate('#/')"
      )}

    </section>

  `);

}


/* ---------------------------------------------------------
   END OF CHUNK 8 PART 1
   ========================================================= */


/* =========================================================
   CHUNK 8 — PART 2/3
   APP STARTUP & GLOBAL EVENTS
   ========================================================= */


/* ---------------------------------------------------------
   HASH CHANGE
   --------------------------------------------------------- */

window.addEventListener(
  "hashchange",
  function() {

    closeMobileMenu();

    route();

  }
);


/* ---------------------------------------------------------
   INITIAL PAGE LOAD
   --------------------------------------------------------- */

window.addEventListener(
  "DOMContentLoaded",
  function() {

    if (
      !window.location.hash ||
      window.location.hash === "#"
    ) {

      window.location.hash = "#/";

      return;
    }


    route();

  }
);


/* ---------------------------------------------------------
   GLOBAL CLICK HANDLER
   --------------------------------------------------------- */

document.addEventListener(
  "click",
  function(event) {

    const link =
      event.target.closest("a");


    if (!link) {
      return;
    }


    /*
      Close the mobile menu whenever
      the user follows a navigation link.
    */

    if (
      link.getAttribute("href") &&
      link.getAttribute("href").startsWith("#/")
    ) {

      closeMobileMenu();

    }

  }
);


/* ---------------------------------------------------------
   IMAGE LAZY ERROR PROTECTION
   --------------------------------------------------------- */

document.addEventListener(
  "error",
  function(event) {

    const target =
      event.target;


    if (
      target &&
      target.tagName === "IMG" &&
      !target.dataset.fallbackApplied
    ) {

      target.dataset.fallbackApplied = "true";

      imageFallback({
        target: target
      });

    }

  },
  true
);


/* ---------------------------------------------------------
   END OF CHUNK 8 PART 2
   ========================================================= */


/* =========================================================
   CHUNK 8 — PART 3/3
   FINAL APPLICATION INITIALIZATION
   ========================================================= */


/* ---------------------------------------------------------
   INITIALIZE MYSTORE
   --------------------------------------------------------- */

(function initializeMyStore() {

  /*
    Make sure the application always starts
    on a valid route.
  */

  if (
    !window.location.hash ||
    window.location.hash === "#"
  ) {

    window.location.hash = "#/";

    return;
  }


  /*
    If the DOM is already ready, render immediately.
    Otherwise DOMContentLoaded in Part 2 will handle it.
  */

  if (
    document.readyState === "interactive" ||
    document.readyState === "complete"
  ) {

    route();

  }

})();


/* ---------------------------------------------------------
   END OF CHUNK 8 PART 3
   ========================================================= */


/* =========================================================
   MYSTORE APP.JS COMPLETE
   ========================================================= */





