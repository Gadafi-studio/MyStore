
/* =========================================================
   MYSTORE
   Frontend Application
   CHUNK 1/8 — Data, State & Helpers
   ========================================================= */

/* ---------------------------------------------------------
   LIVE MARKETPLACE DATA
   Public store and product listings are loaded from Supabase.
   Demo stores are normal database rows marked is_demo=true.
   --------------------------------------------------------- */

let PRODUCTS = [];
let STORES = [];
let marketplaceLoaded = false;
let marketplaceLoadError = null;
let supabaseClient = null;


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
   SUPABASE MARKETPLACE DATA
   --------------------------------------------------------- */

const SUPABASE_URL = "https://meqjeuhozdzjjsabldbg.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_AcRGmTQSBv0JPLnhDMagUg_R2eVxJzh";

function normalizeCategory(name) {
  const value = String(name || "").trim();

  const aliases = {
    "Clothing": "Fashion",
    "Footwear": "Shoes",
    "Technology": "Tech",
    "Home & Living": "Home"
  };

  return aliases[value] || value || "Other";
}

function renderMarketplaceStatus(title, message, retry = false) {
  layout(`
    <section class="section" style="min-height:45vh;display:grid;place-items:center;text-align:center">
      <div style="max-width:560px;padding:24px">
        <span class="eyebrow">MYSTORE MARKETPLACE</span>
        <h1>${esc(title)}</h1>
        <p>${esc(message)}</p>
        ${retry ? '<button class="button primary" type="button" onclick="retryMarketplaceData()">Try again</button>' : ""}
      </div>
    </section>
  `);
}

async function loadMarketplaceData() {
  if (!window.supabase ||
      typeof window.supabase.createClient !== "function") {
    throw new Error(
      "The Supabase client library did not load. Check the Supabase script in index.html."
    );
  }

  if (!supabaseClient) {
    supabaseClient = window.supabase.createClient(
      SUPABASE_URL,
      SUPABASE_PUBLISHABLE_KEY
    );
  }

  const [
    storesResult,
    productsResult,
    imagesResult,
    inventoryResult
  ] = await Promise.all([
    supabaseClient
      .from("stores")
      .select("id,name,slug,description,logo_url,banner_url,location_text,county,town,status,is_featured,is_demo")
      .eq("status", "active")
      .order("is_featured", { ascending: false })
      .order("name", { ascending: true }),

    supabaseClient
      .from("products")
      .select("id,store_id,category_id,name,slug,description,price_kes,status,is_featured,stores!inner(id,name,slug,status),categories(name,slug)")
      .eq("status", "active")
      .eq("stores.status", "active")
      .order("is_featured", { ascending: false })
      .order("created_at", { ascending: false }),

    supabaseClient
      .from("product_images")
      .select("product_id,image_url,sort_order,is_primary")
      .order("is_primary", { ascending: false })
      .order("sort_order", { ascending: true }),

    supabaseClient
      .from("inventory")
      .select("product_id,stock_quantity,reserved_quantity")
  ]);

  if (storesResult.error) throw storesResult.error;
  if (productsResult.error) throw productsResult.error;
  if (imagesResult.error) throw imagesResult.error;
  if (inventoryResult.error) throw inventoryResult.error;

  const imageByProduct = new Map();

  for (const image of imagesResult.data || []) {
    if (!imageByProduct.has(image.product_id)) {
      imageByProduct.set(image.product_id, image.image_url);
    }
  }

  const stockByProduct = new Map(
    (inventoryResult.data || []).map(item => [
      item.product_id,
      Math.max(
        0,
        Number(item.stock_quantity || 0) -
        Number(item.reserved_quantity || 0)
      )
    ])
  );

  const storeRows = storesResult.data || [];
  const storeById = new Map(
    storeRows.map(store => [store.id, store])
  );

  PRODUCTS = (productsResult.data || []).map(row => {
    const store = Array.isArray(row.stores)
      ? row.stores[0]
      : row.stores;

    const category = Array.isArray(row.categories)
      ? row.categories[0]
      : row.categories;

    return {
      id: row.id,
      name: row.name,
      slug: row.slug,
      price: Number(row.price_kes || 0),
      category: normalizeCategory(category?.name),
      store: store?.name || "MyStore",
      storeId: row.store_id,
      storeSlug: store?.slug || "",
      rating: null,
      reviews: null,
      image: imageByProduct.get(row.id) || "",
      description: row.description || "",
      featured: Boolean(row.is_featured),
      stock: stockByProduct.get(row.id) ?? 0,
      isDemo: Boolean(
        storeById.get(row.store_id)?.is_demo
      )
    };
  });

  STORES = storeRows.map(row => {
    const storeProducts = PRODUCTS.filter(
      product => product.storeId === row.id
    );

    const firstCategory = storeProducts.find(
      product => product.category
    )?.category;

    return {
      id: row.id,
      name: row.name,
      slug: row.slug,
      category: firstCategory || "Store",
      location:
        row.town ||
        row.location_text ||
        row.county ||
        "Kenya",
      description: row.description || "",
      products: storeProducts.length,
      rating: null,
      image: row.banner_url || row.logo_url || "",
      isDemo: Boolean(row.is_demo),
      status: row.status
    };
  });

  // Remove legacy local-only products whose store has
  // no database listing. They remain in localStorage
  // but are not shown as marketplace inventory.
  sellerProducts = sellerProducts.filter(product =>
    STORES.some(store => store.slug === product.storeSlug)
  );

  marketplaceLoaded = true;
  marketplaceLoadError = null;
}

async function retryMarketplaceData() {
  marketplaceLoaded = false;
  marketplaceLoadError = null;

  renderMarketplaceStatus(
    "Loading the marketplace…",
    "Fetching active stores and products from Supabase."
  );

  try {
    await loadMarketplaceData();
    route();
  } catch (error) {
    console.error("MyStore marketplace load failed:", error);

    marketplaceLoaded = true;
    marketplaceLoadError = error;

    renderMarketplaceStatus(
      "We couldn't load the marketplace",
      "The database request failed. Check the connection, API access and Row Level Security policies, then try again.",
      true
    );
  }
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
   --------------------------------------------------------- */

/* =========================================================
   CHUNK 2/8 — LAYOUT, HEADER & NAVIGATION
   ========================================================= */

/* ---------------------------------------------------------
   MAIN LAYOUT
   --------------------------------------------------------- */

function layout(content) {
  const root = appRoot();

  if (!root) {
    console.error('MyStore: #app element was not found.');
    return;
  }

  root.innerHTML = `
    <div class="mystore-app">
      ${header()}
      <main id="mystore-main">
        ${content}
      </main>
      ${footer()}
      <div id="toast" class="toast" role="status" aria-live="polite"></div>
    </div>
  `;
}


/* ---------------------------------------------------------
   HEADER
   --------------------------------------------------------- */

function header() {
  return `
    <header class="site-header">
      <div class="header-inner">

        <a class="brand" href="#/" aria-label="MyStore home">
          <img
            src="logo.svg"
            alt="MyStore"
            class="brand-logo"
            onerror="this.style.display='none'"
          />
          <span class="brand-name">MyStore</span>
        </a>

        <form class="header-search" onsubmit="handleSearch(event)">
          <span class="search-icon" aria-hidden="true">⌕</span>
          <input
            type="search"
            id="global-search"
            placeholder="What are you looking for?"
            value="${esc(currentSearch)}"
            aria-label="Search products and stores"
          />
          <button type="submit">Search</button>
        </form>

        <nav class="header-actions" aria-label="Main navigation">
          <a href="#/stores" class="header-link">Stores</a>

          <a href="#/wishlist" class="header-link">
            Wishlist
            <span class="nav-count">${wishlist.length}</span>
          </a>

          <a href="#/cart" class="header-link">
            Bag
            <span class="nav-count">${cartCount()}</span>
          </a>

          <a href="#/profile" class="account-link">
            Account
          </a>
        </nav>

        <button
          class="mobile-menu-button"
          type="button"
          onclick="toggleMobileMenu()"
          aria-label="Toggle navigation"
          aria-expanded="false"
        >
          ☰
        </button>

      </div>

      <div class="mobile-menu" id="mobile-menu" hidden>
        <a href="#/">Home</a>
        <a href="#/stores">Stores</a>
        <a href="#/wishlist">Wishlist (${wishlist.length})</a>
        <a href="#/cart">Shopping bag (${cartCount()})</a>
        <a href="#/profile">Account</a>
        <a href="#/seller">Seller centre</a>
      </div>
    </header>
  `;
}


/* ---------------------------------------------------------
   FOOTER
   --------------------------------------------------------- */

function footer() {
  return `
    <footer class="site-footer">
      <div class="footer-main">

        <div class="footer-brand">
          <a href="#/" class="brand">
            <img
              src="logo.svg"
              alt=""
              class="brand-logo"
              onerror="this.style.display='none'"
            />
            <span class="brand-name">MyStore</span>
          </a>

          <p>
            Discover local businesses, shop with confidence,
            and support the people building your community.
          </p>
        </div>

        <div class="footer-column">
          <h3>Discover</h3>
          <a href="#/stores">Explore stores</a>
          <a href="#/category/Fashion">Fashion</a>
          <a href="#/category/Tech">Technology</a>
          <a href="#/category/Home">Home & living</a>
        </div>

        <div class="footer-column">
          <h3>For sellers</h3>
          <a href="#/seller">Seller centre</a>
          <a href="#/seller">Start a store</a>
        </div>

        <div class="footer-column">
          <h3>Help</h3>
          <a href="#/help">Help centre</a>
          <a href="#/delivery">Delivery information</a>
          <a href="#/returns">Returns policy</a>
        </div>

      </div>

      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} MyStore</span>
        <span>Built for Kenya 🇰🇪</span>
      </div>
    </footer>
  `;
}


/* ---------------------------------------------------------
   MOBILE MENU
   --------------------------------------------------------- */

function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const button = document.querySelector('.mobile-menu-button');

  if (!menu || !button) {
    return;
  }

  const willOpen = menu.hidden;

  menu.hidden = !willOpen;
  button.setAttribute('aria-expanded', String(willOpen));
}


/* ---------------------------------------------------------
   SEARCH
   --------------------------------------------------------- */

function handleSearch(event) {
  event.preventDefault();

  const input = document.getElementById('global-search');

  currentSearch = input ? input.value.trim() : '';

  navigate('/search');
}


/* ---------------------------------------------------------
   CATEGORY NAVIGATION
   --------------------------------------------------------- */

function categoryNavigation() {
  const categories = [
    'All',
    'Fashion',
    'Shoes',
    'Tech',
    'Bags',
    'Home'
  ];

  return `
    <nav class="category-nav" aria-label="Product categories">
      ${categories.map(category => `
        <a
          href="${category === 'All'
            ? '#/'
            : '#/category/' + encodeURIComponent(category)}"
          class="category-link ${
            currentCategory === category ? 'active' : ''
          }"
        >${esc(category)}</a>
      `).join('')}
    </nav>
  `;
}


/* ---------------------------------------------------------
   SECTION HEADING
   --------------------------------------------------------- */

function sectionHeading(title, description = '', action = '') {
  return `
    <div class="section-heading">
      <div>
        <h2>${esc(title)}</h2>
        ${description
          ? `<p>${esc(description)}</p>`
          : ''}
      </div>

      ${action}
    </div>
  `;
}


/* ---------------------------------------------------------
   EMPTY STATE
   --------------------------------------------------------- */

function emptyState(title, message, actionText = '', actionPath = '/') {
  return `
    <section class="empty-state">
      <div class="empty-state-icon" aria-hidden="true">○</div>
      <h2>${esc(title)}</h2>
      <p>${esc(message)}</p>

      ${actionText
        ? `<a class="button primary" href="#${esc(actionPath)}">
             ${esc(actionText)}
           </a>`
        : ''}
    </section>
  `;
}


/* ---------------------------------------------------------
   END OF CHUNK 2
   --------------------------------------------------------- */

/* =========================================================
   CHUNK 3/8 — HOMEPAGE, PRODUCT CARDS & STORE CARDS
   ========================================================= */

/* ---------------------------------------------------------
   PRODUCT IMAGE
   --------------------------------------------------------- */

function productImage(product, extraClass = '') {
  const image = product.image || '';

  if (!image) {
    return `
      <div class="product-image-placeholder ${esc(extraClass)}">
        <span>MyStore</span>
      </div>
    `;
  }

  return `
    <img
      class="product-image ${esc(extraClass)}"
      src="${esc(image)}"
      alt="${esc(product.name)}"
      loading="lazy"
      onerror="imageFallback(event)"
    />
  `;
}


/* ---------------------------------------------------------
   PRODUCT CARD
   --------------------------------------------------------- */

function productCard(product) {
  const wished = isWishlisted(product.id);
  const soldOut = Number(product.stock || 0) <= 0;

  return `
    <article class="product-card">

      <div class="product-card-image">
        <a href="#/product/${encodeURIComponent(product.id)}">
          ${productImage(product)}
        </a>

        ${product.featured
          ? '<span class="product-badge">Featured</span>'
          : ''}

        ${product.isDemo
          ? '<span class="product-demo-badge">Demo</span>'
          : ''}

        <button
          type="button"
          class="wishlist-button ${wished ? 'active' : ''}"
          onclick="toggleWishlist('${esc(product.id)}')"
          aria-label="${wished ? 'Remove from wishlist' : 'Add to wishlist'}"
          aria-pressed="${wished}"
        >${wished ? '♥' : '♡'}</button>

        ${soldOut
          ? '<span class="sold-out-label">Out of stock</span>'
          : ''}
      </div>

      <div class="product-card-info">
        <p class="product-store-name">${esc(product.store || 'MyStore')}</p>

        <a
          class="product-title"
          href="#/product/${encodeURIComponent(product.id)}"
        >${esc(product.name)}</a>

        <div class="product-card-bottom">
          <strong class="product-price">${money(product.price)}</strong>

          <button
            type="button"
            class="quick-add-button"
            onclick="addToCart('${esc(product.id)}')"
            ${soldOut ? 'disabled' : ''}
            aria-label="Add ${esc(product.name)} to bag"
          >+</button>
        </div>

        ${product.rating
          ? `<p class="product-rating">★ ${esc(product.rating)}</p>`
          : ''}
      </div>

    </article>
  `;
}


/* ---------------------------------------------------------
   PRODUCT GRID
   --------------------------------------------------------- */

function productGrid(products) {
  if (!products || products.length === 0) {
    return emptyState(
      'No products found',
      'Try another category or search term.',
      'Explore all products',
      '/'
    );
  }

  return `
    <div class="product-grid">
      ${products.map(product => productCard(product)).join('')}
    </div>
  `;
}


/* ---------------------------------------------------------
   STORE CARD
   --------------------------------------------------------- */

function storeCard(store) {
  const storeImage = store.image
    ? `<img
         src="${esc(store.image)}"
         alt="${esc(store.name)}"
         loading="lazy"
         onerror="this.style.display='none'"
       />`
    : '<div class="store-image-placeholder">M</div>';

  return `
    <article class="store-card">

      <a
        class="store-card-image"
        href="#/store/${encodeURIComponent(store.slug)}"
      >
        ${storeImage}

        ${store.isDemo
          ? '<span class="product-demo-badge">Demo store</span>'
          : ''}
      </a>

      <div class="store-card-info">
        <div class="store-card-heading">
          <h3>
            <a href="#/store/${encodeURIComponent(store.slug)}">
              ${esc(store.name)}
            </a>
          </h3>

          <span class="store-category">
            ${esc(store.category || 'Store')}
          </span>
        </div>

        <p class="store-location">${esc(store.location || 'Kenya')}</p>

        <p class="store-description">
          ${esc(store.description || 'Discover products from this store.')}
        </p>

        <div class="store-card-bottom">
          <span>${Number(store.products || 0)} products</span>

          <a
            class="text-link"
            href="#/store/${encodeURIComponent(store.slug)}"
          >Visit store →</a>
        </div>
      </div>

    </article>
  `;
}


/* ---------------------------------------------------------
   STORE GRID
   --------------------------------------------------------- */

function storeGrid(stores) {
  if (!stores || stores.length === 0) {
    return emptyState(
      'No stores yet',
      'New shops will appear here when they become active.'
    );
  }

  return `
    <div class="store-grid">
      ${stores.map(store => storeCard(store)).join('')}
    </div>
  `;
}


/* ---------------------------------------------------------
   HERO SECTION
   --------------------------------------------------------- */

function homeHero() {
  return `
    <section class="hero">
      <div class="hero-content">

        <span class="eyebrow">DISCOVER SOMETHING LOCAL</span>

        <h1>
          Your next favourite thing
          <span>is closer than you think.</span>
        </h1>

        <p>
          Explore independent Kenyan shops, find products you love,
          and discover the people behind the businesses.
        </p>

        <div class="hero-actions">
          <a href="#/stores" class="button primary">
            Explore stores
          </a>

          <a href="#/seller" class="button secondary">
            Open a store
          </a>
        </div>

      </div>

      <div class="hero-decoration" aria-hidden="true">
        <span class="hero-circle hero-circle-one"></span>
        <span class="hero-circle hero-circle-two"></span>
        <span class="hero-wordmark">M.</span>
      </div>
    </section>
  `;
}


/* ---------------------------------------------------------
   HOMEPAGE
   --------------------------------------------------------- */

function renderHome() {
  currentCategory = 'All';

  const featuredProducts = PRODUCTS.filter(
    product => product.featured && product.stock > 0
  ).slice(0, 8);

  const latestProducts = PRODUCTS
    .filter(product => product.stock > 0)
    .slice(0, 8);

  const featuredStores = STORES.slice(0, 4);

  layout(`
    ${homeHero()}

    ${categoryNavigation()}

    <section class="section">
      ${sectionHeading(
        'Featured products',
        'A few finds worth a closer look.',
        '<a class="text-link" href="#/search">View all →</a>'
      )}

      ${productGrid(
        featuredProducts.length ? featuredProducts : latestProducts
      )}
    </section>

    <section class="section section-muted">
      ${sectionHeading(
        'Discover local stores',
        'Meet the shops bringing great products closer to you.',
        '<a class="text-link" href="#/stores">All stores →</a>'
      )}

      ${storeGrid(featuredStores)}
    </section>

    <section class="section">
      ${sectionHeading(
        'Fresh finds',
        'More products to explore.'
      )}

      ${productGrid(latestProducts)}
    </section>

    <section class="seller-banner">
      <div>
        <span class="eyebrow">FOR KENYAN BUSINESSES</span>
        <h2>Your business deserves to be discovered.</h2>
        <p>
          Bring your products online and help more customers find your shop.
        </p>
      </div>

      <a href="#/seller" class="button primary">
        Explore selling on MyStore
      </a>
    </section>
  `);
}


/* ---------------------------------------------------------
   END OF CHUNK 3
   --------------------------------------------------------- */

/* =========================================================
   CHUNK 4/8 — PRODUCT DETAILS, CATEGORIES & SEARCH
   ========================================================= */

/* ---------------------------------------------------------
   PRODUCT DETAILS PAGE
   --------------------------------------------------------- */

function renderProductDetails(productId) {
  const product = getProduct(decodeURIComponent(productId));

  if (!product) {
    layout(emptyState(
      'Product not found',
      'This product may have been removed or is no longer available.',
      'Continue shopping',
      '/'
    ));
    return;
  }

  const store = STORES.find(
    item => item.id === product.storeId ||
            item.slug === product.storeSlug
  );

  const soldOut = Number(product.stock || 0) <= 0;

  layout(`
    <section class="section product-details-page">

      <div class="breadcrumbs">
        <a href="#/">Home</a>
        <span>/</span>
        <a href="#/category/${encodeURIComponent(product.category)}">
          ${esc(product.category)}
        </a>
        <span>/</span>
        <span>${esc(product.name)}</span>
      </div>

      <div class="product-details-grid">

        <div class="product-details-image">
          ${productImage(product, 'product-main-image')}
        </div>

        <div class="product-details-info">

          <span class="eyebrow">${esc(product.category)}</span>

          <h1>${esc(product.name)}</h1>

          <p class="product-details-price">
            ${money(product.price)}
          </p>

          <p class="product-details-description">
            ${esc(product.description || 'Discover this product from a MyStore seller.')}
          </p>

          <p class="product-stock-status ${
            soldOut ? 'out-of-stock' : 'in-stock'
          }">
            ${soldOut
              ? 'Currently unavailable'
              : 'Available to order'}
          </p>

          ${product.isDemo
            ? '<p class="demo-notice">Demo listing — test product.</p>'
            : ''}

          <div class="product-details-actions">
            <button
              type="button"
              class="button primary"
              onclick="addToCart('${esc(product.id)}')"
              ${soldOut ? 'disabled' : ''}
            >
              Add to bag
            </button>

            <button
              type="button"
              class="button secondary"
              onclick="toggleWishlist('${esc(product.id)}')"
            >
              ${isWishlisted(product.id)
                ? '♥ Saved'
                : '♡ Save'}
            </button>
          </div>

          ${store
            ? `<div class="product-seller-panel">
                 <span class="eyebrow">SOLD BY</span>
                 <h3>
                   <a href="#/store/${encodeURIComponent(store.slug)}">
                     ${esc(store.name)}
                   </a>
                 </h3>
                 <p>${esc(store.location || 'Kenya')}</p>
               </div>`
            : ''}

          <div class="product-trust-note">
            <p>Delivery and payment options are confirmed at checkout.</p>
          </div>

        </div>
      </div>

    </section>

    <section class="section">
      ${sectionHeading('You may also like', 'More products to discover.')}

      ${productGrid(
        PRODUCTS
          .filter(item =>
            item.id !== product.id &&
            item.category === product.category &&
            item.stock > 0
          )
          .slice(0, 4)
      )}
    </section>
  `);
}


/* ---------------------------------------------------------
   CATEGORY PAGE
   --------------------------------------------------------- */

function renderCategory(categoryName) {
  const category = decodeURIComponent(categoryName || 'All');

  currentCategory = category;

  const filteredProducts = category === 'All'
    ? PRODUCTS
    : PRODUCTS.filter(product =>
        product.category.toLowerCase() === category.toLowerCase()
      );

  layout(`
    <section class="section">

      <div class="breadcrumbs">
        <a href="#/">Home</a>
        <span>/</span>
        <span>${esc(category)}</span>
      </div>

      ${sectionHeading(
        category === 'All' ? 'All products' : category,
        `Explore products in ${category === 'All' ? 'the marketplace' : category + '.'}`
      )}

      ${categoryNavigation()}

      ${productGrid(filteredProducts)}
    </section>
  `);
}


/* ---------------------------------------------------------
   SEARCH RESULTS
   --------------------------------------------------------- */

function renderSearchResults() {
  const query = currentSearch.trim().toLowerCase();

  const results = allProducts().filter(product => {
    const searchableText = [
      product.name,
      product.category,
      product.store,
      product.description
    ].join(' ').toLowerCase();

    return !query || searchableText.includes(query);
  });

  layout(`
    <section class="section">

      <div class="breadcrumbs">
        <a href="#/">Home</a>
        <span>/</span>
        <span>Search</span>
      </div>

      ${sectionHeading(
        query ? `Results for "${currentSearch}"` : 'Explore products',
        `${results.length} product${results.length === 1 ? '' : 's'} found.`
      )}

      <form class="search-page-form" onsubmit="handleSearch(event)">
        <input
          id="global-search"
          type="search"
          value="${esc(currentSearch)}"
          placeholder="Search products and stores..."
          aria-label="Search products and stores"
        />
        <button class="button primary" type="submit">Search</button>
      </form>

      ${productGrid(results)}
    </section>
  `);
}


/* ---------------------------------------------------------
   STORES DIRECTORY
   --------------------------------------------------------- */

function renderStores() {
  layout(`
    <section class="section">

      <span class="eyebrow">THE MARKETPLACE</span>

      ${sectionHeading(
        'Discover stores',
        'Explore independent businesses and find your next favourite shop.'
      )}

      <div class="store-directory-search">
        <input
          id="store-search"
          type="search"
          placeholder="Find a store..."
          aria-label="Find a store"
          oninput="filterStoreDirectory(this.value)"
        />
      </div>

      <div id="store-directory-results">
        ${storeGrid(STORES)}
      </div>

    </section>
  `);
}


/* ---------------------------------------------------------
   FILTER STORE DIRECTORY
   --------------------------------------------------------- */

function filterStoreDirectory(value) {
  const query = String(value || '').trim().toLowerCase();

  const filtered = STORES.filter(store => {
    const searchableText = [
      store.name,
      store.category,
      store.location,
      store.description
    ].join(' ').toLowerCase();

    return searchableText.includes(query);
  });

  const results = document.getElementById('store-directory-results');

  if (results) {
    results.innerHTML = storeGrid(filtered);
  }
}


/* ---------------------------------------------------------
   SINGLE STORE PAGE
   --------------------------------------------------------- */

function renderStorePage(storeSlug) {
  const store = getStore(decodeURIComponent(storeSlug));

  if (!store) {
    layout(emptyState(
      'Store not found',
      'This store may have been deactivated or removed.',
      'Browse stores',
      '/stores'
    ));
    return;
  }

  const products = getStoreProducts(store.slug);

  layout(`
    <section class="store-hero">

      ${store.image
        ? `<img
             class="store-hero-image"
             src="${esc(store.image)}"
             alt=""
             onerror="this.style.display='none'"
           />`
        : ''}

      <div class="store-hero-content">

        <span class="eyebrow">MYStore SELLER</span>

        <h1>${esc(store.name)}</h1>

        <p>${esc(store.description || 'Discover products from this store.')}</p>

        <div class="store-meta">
          <span>${esc(store.location || 'Kenya')}</span>
          <span>${products.length} products</span>
          ${store.isDemo ? '<span>Demo store</span>' : ''}
        </div>

      </div>
    </section>

    <section class="section">

      ${sectionHeading(
        'Products from this store',
        `Browse the collection from ${store.name}.`
      )}

      ${productGrid(products)}
    </section>
  `);
}


/* ---------------------------------------------------------
   END OF CHUNK 4
   --------------------------------------------------------- */

/* =========================================================
   CHUNK 5/8 — CART, WISHLIST & SHOPPING INTERACTIONS
   ========================================================= */

/* ---------------------------------------------------------
   ADD PRODUCT TO CART
   --------------------------------------------------------- */

function addToCart(productId) {
  const product = getProduct(productId);

  if (!product) {
    toast('Product could not be found.');
    return;
  }

  const availableStock = Number(product.stock || 0);

  if (availableStock <= 0) {
    toast('Sorry, this product is out of stock.');
    return;
  }

  const existingItem = cart.find(
    item => item.productId === productId
  );

  if (existingItem) {
    if (existingItem.quantity >= availableStock) {
      toast('You have reached the available stock limit.');
      return;
    }

    existingItem.quantity += 1;
  } else {
    cart.push({
      productId,
      quantity: 1
    });
  }

  saveStorage('mystore_cart', cart);

  toast('Added to your shopping bag.');

  // Refresh the current screen so cart counts stay accurate.
  route();
}


/* ---------------------------------------------------------
   REMOVE ITEM FROM CART
   --------------------------------------------------------- */

function removeFromCart(productId) {
  cart = cart.filter(
    item => item.productId !== productId
  );

  saveStorage('mystore_cart', cart);

  toast('Item removed from your bag.');

  renderCart();
}


/* ---------------------------------------------------------
   UPDATE CART QUANTITY
   --------------------------------------------------------- */

function updateCartQuantity(productId, change) {
  const item = cart.find(
    cartItem => cartItem.productId === productId
  );

  const product = getProduct(productId);

  if (!item || !product) {
    return;
  }

  const nextQuantity = item.quantity + Number(change);

  if (nextQuantity <= 0) {
    removeFromCart(productId);
    return;
  }

  if (nextQuantity > Number(product.stock || 0)) {
    toast('You have reached the available stock limit.');
    return;
  }

  item.quantity = nextQuantity;

  saveStorage('mystore_cart', cart);

  renderCart();
}


/* ---------------------------------------------------------
   RENDER CART PAGE
   --------------------------------------------------------- */

function renderCart() {
  // Remove cart lines for products that are no longer
  // present in the current product data.
  cart = cart.filter(item => getProduct(item.productId));

  saveStorage('mystore_cart', cart);

  if (cart.length === 0) {
    layout(`
      <section class="section">
        ${emptyState(
          'Your bag is empty',
          'Find something you love and add it to your bag.',
          'Explore products',
          '/'
        )}
      </section>
    `);
    return;
  }

  const subtotal = cartSubtotal();

  layout(`
    <section class="section">

      <div class="breadcrumbs">
        <a href="#/">Home</a>
        <span>/</span>
        <span>Shopping bag</span>
      </div>

      ${sectionHeading(
        'Your shopping bag',
        `${cartCount()} item${cartCount() === 1 ? '' : 's'} in your bag.`
      )}

      <div class="cart-layout">

        <div class="cart-items">

          ${cart.map(item => {
            const product = getProduct(item.productId);

            if (!product) {
              return '';
            }

            return `
              <article class="cart-item">

                <a
                  class="cart-item-image"
                  href="#/product/${encodeURIComponent(product.id)}"
                >
                  ${productImage(product)}
                </a>

                <div class="cart-item-info">

                  <p class="product-store-name">
                    ${esc(product.store)}
                  </p>

                  <h3>
                    <a href="#/product/${encodeURIComponent(product.id)}">
                      ${esc(product.name)}
                    </a>
                  </h3>

                  <p class="cart-item-price">
                    ${money(product.price)}
                  </p>

                  <div class="quantity-control">

                    <button
                      type="button"
                      onclick="updateCartQuantity('${esc(product.id)}', -1)"
                      aria-label="Decrease quantity"
                    >−</button>

                    <span>${item.quantity}</span>

                    <button
                      type="button"
                      onclick="updateCartQuantity('${esc(product.id)}', 1)"
                      aria-label="Increase quantity"
                    >+</button>

                  </div>

                  <button
                    type="button"
                    class="text-button danger"
                    onclick="removeFromCart('${esc(product.id)}')"
                  >Remove</button>

                </div>

                <strong class="cart-item-total">
                  ${money(product.price * item.quantity)}
                </strong>

              </article>
            `;
          }).join('')}

        </div>

        <aside class="cart-summary">

          <h2>Order summary</h2>

          <div class="summary-row">
            <span>Subtotal</span>
            <strong>${money(subtotal)}</strong>
          </div>

          <div class="summary-row">
            <span>Delivery</span>
            <span>Calculated later</span>
          </div>

          <div class="summary-row summary-total">
            <span>Estimated total</span>
            <strong>${money(subtotal)}</strong>
          </div>

          <p class="summary-note">
            Delivery charges and payment options have not yet been
            confirmed.
          </p>

          <button
            type="button"
            class="button primary full-width"
            onclick="beginCheckout()"
          >
            Continue to checkout
          </button>

          <a href="#/" class="continue-shopping">
            Continue shopping
          </a>

        </aside>

      </div>

    </section>
  `);
}


/* ---------------------------------------------------------
   BEGIN CHECKOUT
   --------------------------------------------------------- */

function beginCheckout() {
  if (!cart.length) {
    toast('Your bag is empty.');
    return;
  }

  navigate('/checkout');
}


/* ---------------------------------------------------------
   TOGGLE WISHLIST
   --------------------------------------------------------- */

function toggleWishlist(productId) {
  const product = getProduct(productId);

  if (!product) {
    toast('Product could not be found.');
    return;
  }

  if (wishlist.includes(productId)) {
    wishlist = wishlist.filter(id => id !== productId);
    toast('Removed from your wishlist.');
  } else {
    wishlist.push(productId);
    toast('Added to your wishlist.');
  }

  saveStorage('mystore_wishlist', wishlist);

  // Re-render so the heart icon and header count update.
  route();
}


/* ---------------------------------------------------------
   WISHLIST PAGE
   --------------------------------------------------------- */

function renderWishlist() {
  const products = wishlist
    .map(id => getProduct(id))
    .filter(Boolean);

  layout(`
    <section class="section">

      <div class="breadcrumbs">
        <a href="#/">Home</a>
        <span>/</span>
        <span>Wishlist</span>
      </div>

      ${sectionHeading(
        'Your wishlist',
        'Products you have saved for later.'
      )}

      ${productGrid(products)}

    </section>
  `);
}


/* ---------------------------------------------------------
   CLEAR CART
   --------------------------------------------------------- */

function clearCart() {
  cart = [];

  saveStorage('mystore_cart', cart);

  toast('Your shopping bag has been cleared.');

  renderCart();
}


/* ---------------------------------------------------------
   END OF CHUNK 5
   --------------------------------------------------------- */

/* =========================================================
   CHUNK 6/8 — CHECKOUT, PROFILE & SELLER CENTRE
   ========================================================= */

/* ---------------------------------------------------------
   CHECKOUT PAGE
   --------------------------------------------------------- */

function renderCheckout() {
  if (!cart.length) {
    layout(emptyState(
      'Your bag is empty',
      'Add products before continuing to checkout.',
      'Explore products',
      '/'
    ));
    return;
  }

  const subtotal = cartSubtotal();

  layout(`
    <section class="section">

      <div class="breadcrumbs">
        <a href="#/">Home</a>
        <a href="#/cart">Shopping bag</a>
        <span>Checkout</span>
      </div>

      ${sectionHeading(
        'Checkout',
        'Review your order and prepare your delivery details.'
      )}

      <div class="checkout-layout">

        <form
          class="checkout-form"
          id="checkout-form"
          onsubmit="submitCheckout(event)"
        >

          <h2>Delivery details</h2>

          <label for="checkout-name">Full name</label>
          <input
            id="checkout-name"
            name="fullName"
            type="text"
            autocomplete="name"
            required
          />

          <label for="checkout-phone">Phone number</label>
          <input
            id="checkout-phone"
            name="phone"
            type="tel"
            autocomplete="tel"
            placeholder="e.g. 07XX XXX XXX"
            required
          />

          <label for="checkout-county">County</label>
          <input
            id="checkout-county"
            name="county"
            type="text"
            value="Isiolo"
            required
          />

          <label for="checkout-town">Town / area</label>
          <input
            id="checkout-town"
            name="town"
            type="text"
            placeholder="e.g. Isiolo town"
            required
          />

          <label for="checkout-address">Delivery instructions</label>
          <textarea
            id="checkout-address"
            name="address"
            rows="3"
            placeholder="Building, landmark or other useful directions"
            required
          ></textarea>

          <div class="checkout-notice">
            <strong>Payments aren't connected yet.</strong>
            <p>
              This screen collects delivery details for interface testing.
              It will not submit an order or charge a payment.
            </p>
          </div>

          <button class="button primary full-width" type="submit">
            Review order details
          </button>

        </form>

        <aside class="cart-summary">

          <h2>Your order</h2>

          ${cart.map(item => {
            const product = getProduct(item.productId);

            if (!product) return '';

            return `
              <div class="summary-row">
                <span>
                  ${esc(product.name)} × ${item.quantity}
                </span>
                <strong>
                  ${money(product.price * item.quantity)}
                </strong>
              </div>
            `;
          }).join('')}

          <div class="summary-row">
            <span>Subtotal</span>
            <strong>${money(subtotal)}</strong>
          </div>

          <div class="summary-row">
            <span>Delivery</span>
            <span>Not calculated</span>
          </div>

          <div class="summary-row summary-total">
            <span>Estimated total</span>
            <strong>${money(subtotal)}</strong>
          </div>

        </aside>

      </div>

    </section>
  `);
}


/* ---------------------------------------------------------
   CHECKOUT FORM — TEST MODE ONLY
   --------------------------------------------------------- */

function submitCheckout(event) {
  event.preventDefault();

  const form = document.getElementById('checkout-form');

  if (!form || !form.reportValidity()) {
    return;
  }

  const formData = new FormData(form);

  const details = {
    fullName: String(formData.get('fullName') || '').trim(),
    phone: String(formData.get('phone') || '').trim(),
    county: String(formData.get('county') || '').trim(),
    town: String(formData.get('town') || '').trim(),
    address: String(formData.get('address') || '').trim()
  };

  // Keep this as a local preview only.
  // Do not treat this as an actual placed order.
  const preview = {
    delivery: details,
    items: cart.map(item => {
      const product = getProduct(item.productId);

      return {
        productId: item.productId,
        name: product?.name || '',
        quantity: item.quantity,
        unitPrice: product?.price || 0
      };
    }),
    subtotal: cartSubtotal(),
    status: 'preview_only'
  };

  console.log('MyStore checkout preview:', preview);

  layout(`
    <section class="section">
      <div class="checkout-success">

        <span class="eyebrow">TEST CHECKOUT</span>

        <h1>Details captured for preview.</h1>

        <p>
          This is a test preview only. No order has been created,
          no stock has been reserved, and no payment has been made.
        </p>

        <div class="checkout-preview-summary">
          <h2>Delivery summary</h2>
          <p><strong>Name:</strong> ${esc(details.fullName)}</p>
          <p><strong>Phone:</strong> ${esc(details.phone)}</p>
          <p><strong>Location:</strong>
            ${esc(details.town)}, ${esc(details.county)}
          </p>
          <p><strong>Address:</strong> ${esc(details.address)}</p>
          <p><strong>Subtotal:</strong> ${money(preview.subtotal)}</p>
        </div>

        <button
          class="button primary"
          type="button"
          onclick="navigate('/cart')"
        >
          Return to bag
        </button>

      </div>
    </section>
  `);
}


/* ---------------------------------------------------------
   CUSTOMER PROFILE
   --------------------------------------------------------- */

function renderProfile() {
  layout(`
    <section class="section">

      <span class="eyebrow">YOUR ACCOUNT</span>

      ${sectionHeading(
        'Your profile',
        'Manage your MyStore shopping experience.'
      )}

      <div class="profile-panel">

        <div class="profile-avatar">M</div>

        <div>
          <h2>Welcome to MyStore</h2>
          <p>
            Account registration and sign-in need to be connected
            before this becomes a personal customer profile.
          </p>
        </div>

      </div>

      <div class="profile-shortcuts">

        <a class="profile-shortcut" href="#/cart">
          <span>Shopping bag</span>
          <strong>${cartCount()} items →</strong>
        </a>

        <a class="profile-shortcut" href="#/wishlist">
          <span>Wishlist</span>
          <strong>${wishlist.length} saved →</strong>
        </a>

        <a class="profile-shortcut" href="#/stores">
          <span>Discover</span>
          <strong>Explore stores →</strong>
        </a>

      </div>

      <div class="checkout-notice">
        <strong>Authentication not connected</strong>
        <p>
          Sign-in, account security, order history and saved customer
          details must be integrated with Supabase Auth before use.
        </p>
      </div>

    </section>
  `);
}


/* ---------------------------------------------------------
   SELLER CENTRE
   --------------------------------------------------------- */

function renderSellerCentre() {
  layout(`
    <section class="section">

      <span class="eyebrow">FOR BUSINESS OWNERS</span>

      ${sectionHeading(
        'Seller centre',
        'Your starting point for selling on MyStore.'
      )}

      <div class="seller-welcome">

        <div>
          <h1>Bring your shop online.</h1>

          <p>
            Showcase your products and help customers discover your
            business. Start by understanding the seller setup.
          </p>

          <a class="button primary" href="#/seller/register">
            Start seller setup
          </a>
        </div>

      </div>

      <div class="seller-feature-grid">

        <article class="seller-feature">
          <span class="seller-feature-number">01</span>
          <h3>Create your store</h3>
          <p>Set your store name, location and description.</p>
        </article>

        <article class="seller-feature">
          <span class="seller-feature-number">02</span>
          <h3>List your products</h3>
          <p>Add product names, prices, images and stock.</p>
        </article>

        <article class="seller-feature">
          <span class="seller-feature-number">03</span>
          <h3>Prepare to sell</h3>
          <p>Configure delivery, payments and order handling.</p>
        </article>

      </div>

      <div class="checkout-notice">
        <strong>Seller tools are not connected yet.</strong>
        <p>
          Store creation, product management, subscriptions and order
          management require authenticated database operations.
        </p>
      </div>

    </section>
  `);
}


/* ---------------------------------------------------------
   SELLER REGISTRATION PLACEHOLDER
   --------------------------------------------------------- */

function renderSellerRegistration() {
  layout(`
    <section class="section">

      ${sectionHeading(
        'Set up your store',
        'Seller registration is currently a preview.'
      )}

      <div class="checkout-notice">
        <strong>Database setup required</strong>
        <p>
          Before enabling store creation, we need to connect this form
          to authenticated Supabase operations and enforce store ownership
          through Row Level Security.
        </p>
      </div>

      <a class="button secondary" href="#/seller">
        Back to seller centre
      </a>

    </section>
  `);
}


/* ---------------------------------------------------------
   END OF CHUNK 6
   --------------------------------------------------------- */


/* =========================================================
   CHUNK 7/8 — ROUTER, HELP & UTILITY PAGES
   ========================================================= */

/* ---------------------------------------------------------
   HELP PAGE
   --------------------------------------------------------- */

function renderHelp() {
  layout(`
    <section class="section">

      <span class="eyebrow">MYStore SUPPORT</span>

      ${sectionHeading(
        'How can we help?',
        'Helpful information for shoppers and sellers.'
      )}

      <div class="help-grid">

        <article class="help-card">
          <h3>Shopping</h3>
          <p>Browse stores, compare products and add items to your bag.</p>
          <a class="text-link" href="#/">Start shopping →</a>
        </article>

        <article class="help-card">
          <h3>Delivery</h3>
          <p>Delivery options and charges must be confirmed for each order.</p>
          <a class="text-link" href="#/delivery">Delivery information →</a>
        </article>

        <article class="help-card">
          <h3>Payments</h3>
          <p>Payment processing must be connected before live transactions.</p>
          <a class="text-link" href="#/checkout">Checkout information →</a>
        </article>

        <article class="help-card">
          <h3>Selling</h3>
          <p>Learn about preparing your business to sell on MyStore.</p>
          <a class="text-link" href="#/seller">Seller centre →</a>
        </article>

      </div>

    </section>
  `);
}


/* ---------------------------------------------------------
   DELIVERY INFORMATION
   --------------------------------------------------------- */

function renderDeliveryInfo() {
  layout(`
    <section class="section">

      ${sectionHeading(
        'Delivery information',
        'A clear delivery experience is part of the MyStore mission.'
      )}

      <div class="info-panel">

        <h2>How delivery works</h2>

        <p>
          Delivery availability, pricing and estimated arrival times
          depend on the seller, the destination and the delivery service.
        </p>

        <h3>Before placing an order</h3>

        <ul>
          <li>Confirm that the seller serves your area.</li>
          <li>Check the delivery charge before payment.</li>
          <li>Provide a reachable phone number and clear directions.</li>
          <li>Keep your order confirmation for reference.</li>
        </ul>

        <div class="checkout-notice">
          <strong>Current development status</strong>
          <p>
            MyStore's live delivery calculation, dispatch, tracking and
            delivery-partner integrations are not implemented here.
          </p>
        </div>

      </div>

    </section>
  `);
}


/* ---------------------------------------------------------
   RETURNS INFORMATION
   --------------------------------------------------------- */

function renderReturnsInfo() {
  layout(`
    <section class="section">

      ${sectionHeading(
        'Returns and refunds',
        'Understand the policy before completing a purchase.'
      )}

      <div class="info-panel">

        <p>
          Return eligibility, time limits and refund arrangements must
          be defined clearly by MyStore and participating sellers.
        </p>

        <p>
          This development version does not process returns or refunds.
          Contact the seller through an established support channel
          before assuming a product can be returned.
        </p>

        <a class="button secondary" href="#/help">
          Visit help centre
        </a>

      </div>

    </section>
  `);
}


/* ---------------------------------------------------------
   NOT FOUND PAGE
   --------------------------------------------------------- */

function renderNotFound() {
  layout(`
    <section class="section">
      ${emptyState(
        'Page not found',
        'The page may have moved or the address may be incorrect.',
        'Return home',
        '/'
      )}
    </section>
  `);
}


/* ---------------------------------------------------------
   ROUTE PARSER
   --------------------------------------------------------- */

function getCurrentRoute() {
  const hash = window.location.hash || '#/';
  const rawPath = hash.startsWith('#')
    ? hash.slice(1)
    : hash;

  const path = rawPath || '/';

  return path.split('?')[0];
}


/* ---------------------------------------------------------
   MAIN ROUTER
   --------------------------------------------------------- */

function route() {
  const path = getCurrentRoute();

  // Wait for initial marketplace data to load before rendering
  // database-dependent screens.
  if (!marketplaceLoaded) {
    renderMarketplaceStatus(
      'Loading MyStore…',
      'Getting active stores and products.'
    );
    return;
  }

  if (marketplaceLoadError) {
    renderMarketplaceStatus(
      'Marketplace unavailable',
      'We could not load the latest marketplace data.',
      true
    );
    return;
  }

  if (path === '/' || path === '') {
    renderHome();
    return;
  }

  if (path === '/stores') {
    renderStores();
    return;
  }

  if (path === '/search') {
    renderSearchResults();
    return;
  }

  if (path === '/cart') {
    renderCart();
    return;
  }

  if (path === '/wishlist') {
    renderWishlist();
    return;
  }

  if (path === '/checkout') {
    renderCheckout();
    return;
  }

  if (path === '/profile') {
    renderProfile();
    return;
  }

  if (path === '/seller') {
    renderSellerCentre();
    return;
  }

  if (path === '/seller/register') {
    renderSellerRegistration();
    return;
  }

  if (path === '/help') {
    renderHelp();
    return;
  }

  if (path === '/delivery') {
    renderDeliveryInfo();
    return;
  }

  if (path === '/returns') {
    renderReturnsInfo();
    return;
  }

  if (path.startsWith('/product/')) {
    const productId = path.slice('/product/'.length);
    renderProductDetails(productId);
    return;
  }

  if (path.startsWith('/store/')) {
    const storeSlug = path.slice('/store/'.length);
    renderStorePage(storeSlug);
    return;
  }

  if (path.startsWith('/category/')) {
    const category = path.slice('/category/'.length);
    renderCategory(category);
    return;
  }

  renderNotFound();
}


/* ---------------------------------------------------------
   ROUTER INITIALIZATION
   --------------------------------------------------------- */

function initializeRouter() {
  window.addEventListener('hashchange', route);

  // A hash may have changed before the app finished loading.
  route();
}


/* ---------------------------------------------------------
   END OF CHUNK 7
   --------------------------------------------------------- */


/* =========================================================
   CHUNK 8/8 — APPLICATION INITIALIZATION
   ========================================================= */

/* ---------------------------------------------------------
   GLOBAL ERROR HANDLING
   --------------------------------------------------------- */

window.addEventListener('error', function (event) {
  console.error(
    'MyStore application error:',
    event.error || event.message
  );
});

window.addEventListener('unhandledrejection', function (event) {
  console.error(
    'MyStore asynchronous error:',
    event.reason
  );
});


/* ---------------------------------------------------------
   INITIALIZE APPLICATION
   --------------------------------------------------------- */

async function initializeMyStore() {
  const root = appRoot();

  if (!root) {
    console.error(
      'MyStore could not start: #app was not found in index.html.'
    );
    return;
  }

  renderMarketplaceStatus(
    'Loading MyStore…',
    'Connecting to the marketplace.'
  );

  try {
    await loadMarketplaceData();

    console.info('MyStore marketplace data loaded.', {
      stores: STORES.length,
      products: PRODUCTS.length
    });

    initializeRouter();
  } catch (error) {
    console.error(
      'MyStore startup failed:',
      error
    );

    marketplaceLoaded = true;
    marketplaceLoadError = error;

    renderMarketplaceStatus(
      'We could not load MyStore',
      'Check your internet connection, Supabase configuration, database permissions and table names.',
      true
    );
  }
}


/* ---------------------------------------------------------
   START APP WHEN HTML IS READY
   --------------------------------------------------------- */

if (document.readyState === 'loading') {
  document.addEventListener(
    'DOMContentLoaded',
    initializeMyStore,
    { once: true }
  );
} else {
  initializeMyStore();
}


/* =========================================================
   END OF CHUNK 8
   ========================================================= */
