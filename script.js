console.log("FLUXION SHOP");

// ==========================================
// ADMIN AUTH
// ==========================================
// NOTE: This is a client-side-only gate. FLUXION has no backend/server,
// so the password check below runs entirely in the visitor's browser.
// It stops casual visitors and bots from stumbling into the admin panel,
// but it is NOT real security: anyone who opens this file or their
// browser console can see the password or flip the session flag by hand.
// Change ADMIN_PASSWORD before sharing this project, and don't rely on
// this for a store handling real inventory or payments.

const ADMIN_PASSWORD = "fluxion2026";
const ADMIN_SESSION_KEY = "fluxionAdminAuthed";

function setupAdminLogin() {
  const form = document.getElementById("adminLoginForm");

  if (!form) {
    return;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const passwordField = document.getElementById("adminPassword");

    const errorEl = document.getElementById("loginError");

    const enteredPassword = passwordField.value;

    if (enteredPassword === ADMIN_PASSWORD) {
      // sessionStorage clears when the tab/browser closes, so each new
      // session needs the password again.
      sessionStorage.setItem(ADMIN_SESSION_KEY, "true");

      window.location.href = "admin.html";

      return;
    }

    if (errorEl) {
      errorEl.textContent = "Incorrect password. Please try again.";
    }

    passwordField.value = "";

    passwordField.focus();
  });
}

function setupAdminLogout() {
  const logoutButton = document.getElementById("adminLogoutButton");

  if (!logoutButton) {
    return;
  }

  logoutButton.addEventListener("click", function () {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);

    window.location.href = "admin-login.html";
  });
}

// ==========================================
// HIDDEN ADMIN ENTRY (footer logo, 5 clicks)
// ==========================================
// No visible "Admin" button on the customer site. Clicking the FLUXION
// wordmark in the footer 5 times within 1.5 seconds sends the visitor
// to the admin login page. This just keeps the entry point out of sight
// for regular shoppers — the password on the login page is still the
// actual safeguard.

function setupSecretAdminEntry() {
  const footerLogo = document.getElementById("footerLogo");

  if (!footerLogo) {
    return;
  }

  const REQUIRED_CLICKS = 5;

  const RESET_DELAY_MS = 1500;

  let clickCount = 0;

  let resetTimer = null;

  footerLogo.addEventListener("click", function () {
    clickCount += 1;

    clearTimeout(resetTimer);

    resetTimer = setTimeout(function () {
      clickCount = 0;
    }, RESET_DELAY_MS);

    if (clickCount >= REQUIRED_CLICKS) {
      clickCount = 0;

      clearTimeout(resetTimer);

      window.location.href = "admin-login.html";
    }
  });
}

// ==========================================
// DEFAULT PRODUCTS
// ==========================================

const defaultProducts = [
  // ===== CLOTHES =====
  {
    id: 1,
    name: "Silk Evening Dress",
    category: "Clothes",
    price: 2800,
    image:
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=85",
    description: "Elegant silk-inspired evening dress for special occasions.",
  },
  {
    id: 2,
    name: "Classic Tailored Blazer",
    category: "Clothes",
    price: 3200,
    image:
      "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=900&q=85",
    description: "A refined tailored blazer for a polished everyday look.",
  },
  {
    id: 3,
    name: "Satin Midi Dress",
    category: "Clothes",
    price: 2500,
    image:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=85",
    description: "A graceful satin-inspired dress with a timeless silhouette.",
  },
  {
    id: 4,
    name: "Printed Silk Blouse",
    category: "Clothes",
    price: 2100,
    image:
      "https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f?auto=format&fit=crop&w=900&q=85",
    description: "A softly draped silk blouse with a delicate printed finish.",
  },
  {
    id: 5,
    name: "Statement Wool Coat",
    category: "Clothes",
    price: 3600,
    image:
      "https://images.unsplash.com/photo-1562347174-7370ad83dc47?auto=format&fit=crop&w=900&q=85",
    description:
      "A bold wool-inspired coat that anchors any cold-weather look.",
  },
  {
    id: 6,
    name: "Tailored Leather Trousers",
    category: "Clothes",
    price: 2900,
    image:
      "https://images.unsplash.com/photo-1512101903502-7eb0c9022c74?auto=format&fit=crop&w=900&q=85",
    description:
      "Sleek tailored trousers with a smooth leather-inspired finish.",
  },
  {
    id: 7,
    name: "Draped Evening Top",
    category: "Clothes",
    price: 1900,
    image:
      "https://images.unsplash.com/photo-1623039497026-00af61471107?auto=format&fit=crop&w=900&q=85",
    description: "A fluid, draped top designed for evenings out.",
  },
  {
    id: 8,
    name: "Classic Trench Coat",
    category: "Clothes",
    price: 3400,
    image:
      "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?auto=format&fit=crop&w=900&q=85",
    description: "A timeless trench coat silhouette for effortless layering.",
  },

  // ===== BAGS =====
  {
    id: 9,
    name: "Minimalist Shoulder Bag",
    category: "Bags",
    price: 2100,
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85",
    description: "A sophisticated shoulder bag designed for everyday elegance.",
  },
  {
    id: 10,
    name: "Structured Handbag",
    category: "Bags",
    price: 2600,
    image:
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=85",
    description: "Structured handbag with a refined and timeless appearance.",
  },
  {
    id: 11,
    name: "Classic Mini Bag",
    category: "Bags",
    price: 1900,
    image:
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=900&q=85",
    description: "Compact bag designed to complement everyday outfits.",
  },
  {
    id: 12,
    name: "Gold-Buckle Satchel",
    category: "Bags",
    price: 2800,
    image:
      "https://images.unsplash.com/photo-1605733513597-a8f8341084e6?auto=format&fit=crop&w=900&q=85",
    description:
      "A structured satchel finished with polished gold-tone hardware.",
  },
  {
    id: 13,
    name: "Everyday Leather Tote",
    category: "Bags",
    price: 2300,
    image:
      "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=900&q=85",
    description: "A roomy leather-inspired tote built for daily essentials.",
  },
  {
    id: 14,
    name: "Grey Crossbody Bag",
    category: "Bags",
    price: 2000,
    image:
      "https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&w=900&q=85",
    description: "A relaxed crossbody silhouette in a versatile soft grey.",
  },
  {
    id: 15,
    name: "Blush Top-Handle Bag",
    category: "Bags",
    price: 2400,
    image:
      "https://images.unsplash.com/photo-1681747685985-a401c271156c?auto=format&fit=crop&w=900&q=85",
    description: "A feminine top-handle bag in a soft blush tone.",
  },
  {
    id: 16,
    name: "Metallic Evening Clutch",
    category: "Bags",
    price: 2700,
    image:
      "https://images.unsplash.com/photo-1589363358751-ab05797e5629?auto=format&fit=crop&w=900&q=85",
    description: "A sleek metallic clutch made for evening occasions.",
  },

  // ===== NECKLACES =====
  {
    id: 17,
    name: "Gold Pendant Necklace",
    category: "Necklaces",
    price: 1800,
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=85",
    description: "Delicate gold-inspired pendant necklace.",
  },
  {
    id: 18,
    name: "Silver Chain Necklace",
    category: "Necklaces",
    price: 1500,
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=85",
    description: "Simple silver-inspired chain for everyday styling.",
  },
  {
    id: 19,
    name: "Pearl Detail Necklace",
    category: "Necklaces",
    price: 2200,
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85",
    description: "Elegant necklace featuring subtle pearl-inspired details.",
  },
  {
    id: 20,
    name: "Gold Drop Pendant",
    category: "Necklaces",
    price: 1700,
    image:
      "https://images.unsplash.com/photo-1569397288884-4d43d6738fbd?auto=format&fit=crop&w=900&q=85",
    description: "A slender chain finished with a warm gold-toned drop.",
  },
  {
    id: 21,
    name: "Beaded Statement Necklace",
    category: "Necklaces",
    price: 1600,
    image:
      "https://images.unsplash.com/photo-1601121141499-17ae80afc03a?auto=format&fit=crop&w=900&q=85",
    description: "A layered beaded necklace with gold and silver-tone accents.",
  },
  {
    id: 22,
    name: "Gold Necklace & Earring Set",
    category: "Necklaces",
    price: 2500,
    image:
      "https://images.unsplash.com/photo-1758995115682-1452a1a9e35b?auto=format&fit=crop&w=900&q=85",
    description: "A matching necklace and earring set in warm gold tones.",
  },
  {
    id: 23,
    name: "Layered Necklace Duo",
    category: "Necklaces",
    price: 2100,
    image:
      "https://images.unsplash.com/photo-1727947074642-0bd47ef70b58?auto=format&fit=crop&w=900&q=85",
    description: "Two delicate chains designed to be worn together or apart.",
  },

  // ===== RINGS =====
  {
    id: 24,
    name: "Gold Minimal Ring",
    category: "Rings",
    price: 1200,
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=85",
    description: "Minimal gold-inspired ring with a refined finish.",
  },
  {
    id: 25,
    name: "Silver Classic Ring",
    category: "Rings",
    price: 1000,
    image:
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=900&q=85",
    description: "Classic silver-inspired ring for everyday elegance.",
  },
  {
    id: 26,
    name: "Elegant Gold Band",
    category: "Rings",
    price: 1600,
    image:
      "https://images.unsplash.com/photo-1627293509201-cd7a9c5f8e8b?auto=format&fit=crop&w=900&q=85",
    description: "Refined gold-inspired band with a timeless appearance.",
  },
  {
    id: 27,
    name: "Polished Gold Ring",
    category: "Rings",
    price: 1300,
    image:
      "https://images.unsplash.com/photo-1598560917807-1bae44bd2be8?auto=format&fit=crop&w=900&q=85",
    description: "A smooth, polished gold-tone ring for everyday wear.",
  },
  {
    id: 28,
    name: "Trio Gold Ring Set",
    category: "Rings",
    price: 2400,
    image:
      "https://images.unsplash.com/photo-1631982690223-8aa4be0a2497?auto=format&fit=crop&w=900&q=85",
    description: "A set of three stackable gold-tone rings.",
  },
  {
    id: 29,
    name: "Amethyst Gold Ring",
    category: "Rings",
    price: 1900,
    image:
      "https://images.unsplash.com/photo-1603561596973-8166e9e089d1?auto=format&fit=crop&w=900&q=85",
    description: "A gold-tone ring set with a soft purple gemstone accent.",
  },
  {
    id: 30,
    name: "Stacked Statement Rings",
    category: "Rings",
    price: 2200,
    image:
      "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?auto=format&fit=crop&w=900&q=85",
    description: "A trio of textured statement rings designed to be stacked.",
  },
];

// ==========================================
// PRODUCT STORAGE
// ==========================================

// NOTE: the key below was bumped from "fluxionProducts" to
// "fluxionProducts_v2". Products are saved to the browser's
// localStorage, and old data under the previous key (including any
// leftover, non-fashion demo items) will no longer be loaded. If the
// catalog ever needs a full reset again in the future, bump this
// version string once more.
const PRODUCTS_STORAGE_KEY = "fluxionProducts_v2";

function normalizeProduct(product) {
  if (!Array.isArray(product.images) || product.images.length === 0) {
    product.images = product.image ? [product.image] : [];
  }

  if (!product.image) {
    product.image = product.images[0] || "";
  }

  return product;
}

function getProducts() {
  const storedProducts = localStorage.getItem(PRODUCTS_STORAGE_KEY);

  if (storedProducts) {
    try {
      return JSON.parse(storedProducts).map(normalizeProduct);
    } catch (error) {
      console.error("Could not read products:", error);
    }
  }

  localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(defaultProducts));

  return defaultProducts.map(normalizeProduct);
}

function saveProducts(products) {
  try {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
  } catch (error) {
    console.error("Could not save products:", error);

    alert(
      "Could not save that product — your browser's storage is full. " +
        "Try smaller images, fewer uploads per product, or an image URL " +
        "instead of an upload.",
    );
  }
}

// ==========================================
// BAG STORAGE
// ==========================================

function getBag() {
  const storedBag = localStorage.getItem("fluxionBag");

  if (storedBag) {
    try {
      return JSON.parse(storedBag);
    } catch (error) {
      console.error("Could not read bag:", error);
    }
  }

  return [];
}

function saveBag(bag) {
  localStorage.setItem("fluxionBag", JSON.stringify(bag));
}

// ==========================================
// BAG COUNT
// ==========================================

function updateBagCount() {
  const bag = getBag();

  const counters = document.querySelectorAll("#bagCount");

  counters.forEach((counter) => {
    counter.textContent = bag.length;
  });
}

// ==========================================
// ADD TO BAG
// ==========================================

function addToBag(productId) {
  const products = getProducts();

  const product = products.find(
    (item) => Number(item.id) === Number(productId),
  );

  if (!product) {
    console.error("Product not found:", productId);

    return;
  }

  const bag = getBag();

  bag.push(product);

  saveBag(bag);

  updateBagCount();

  showNotification(product.name + " added to your bag.");
}

// ==========================================
// REMOVE FROM BAG
// ==========================================

function removeFromBag(index) {
  const bag = getBag();

  if (index < 0 || index >= bag.length) {
    return;
  }

  bag.splice(index, 1);

  saveBag(bag);

  updateBagCount();

  renderBag();
}

// ==========================================
// OPEN BAG
// ==========================================

function openBag() {
  const overlay = document.getElementById("bagOverlay");

  if (!overlay) {
    return;
  }

  renderBag();

  overlay.classList.add("open");

  document.body.style.overflow = "hidden";
}

// ==========================================
// CLOSE BAG
// ==========================================

function closeBag() {
  const overlay = document.getElementById("bagOverlay");

  if (!overlay) {
    return;
  }

  overlay.classList.remove("open");

  document.body.style.overflow = "";
}

// ==========================================
// RENDER BAG
// ==========================================

function renderBag() {
  const bagItems = document.getElementById("bagItems");

  const bagTotal = document.getElementById("bagTotal");

  if (!bagItems || !bagTotal) {
    return;
  }

  const bag = getBag();

  if (bag.length === 0) {
    bagItems.innerHTML = `
            <div class="empty-bag">
                Your bag is currently empty.
            </div>
        `;

    bagTotal.textContent = "₱0";

    return;
  }

  let total = 0;

  bagItems.innerHTML = bag
    .map((product, index) => {
      total += Number(product.price);

      return `
                    <div class="bag-item">

                        <div class="bag-item-image">

                            <img
                                src="${escapeHTML(product.image)}"
                                alt="${escapeHTML(product.name)}"
                                onerror="this.src='https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=500&q=80'"
                            >

                        </div>

                        <div>

                            <div class="bag-item-name">
                                ${escapeHTML(product.name)}
                            </div>

                            <div class="bag-item-category">
                                ${escapeHTML(product.category)}
                            </div>

                            <div class="bag-item-price">
                                ₱${Number(product.price).toLocaleString()}
                            </div>

                        </div>

                        <button
                            class="remove-item"
                            onclick="removeFromBag(${index})"
                        >
                            Remove
                        </button>

                    </div>
                `;
    })
    .join("");

  bagTotal.textContent = "₱" + total.toLocaleString();
}

// ==========================================
// SHOP PAGINATION STATE
// ==========================================

const PRODUCTS_PER_PAGE = 12;

let currentShopPage = 1;

// ==========================================
// RENDER SHOP PRODUCTS
// ==========================================

function renderShopProducts() {
  const productGrid = document.getElementById("productGrid");

  if (!productGrid) {
    return;
  }

  const categoryFilter = document.getElementById("categoryFilter");

  const priceFilter = document.getElementById("priceFilter");

  let products = [...getProducts()];

  const category = categoryFilter ? categoryFilter.value : "All";

  const price = priceFilter ? priceFilter.value : "default";

  // CATEGORY FILTER

  if (category !== "All") {
    products = products.filter((product) => product.category === category);
  }

  // PRICE SORTING

  if (price === "low") {
    products.sort((a, b) => Number(a.price) - Number(b.price));
  } else if (price === "high") {
    products.sort((a, b) => Number(b.price) - Number(a.price));
  }

  // PRODUCT COUNT

  const productCount = document.getElementById("productCount");

  if (productCount) {
    productCount.textContent =
      products.length + (products.length === 1 ? " product" : " products");
  }

  // EMPTY STATE

  if (products.length === 0) {
    productGrid.innerHTML = `
            <div class="no-products">
                No products found in this category.
            </div>
        `;

    renderShopPagination(0);

    return;
  }

  // PAGINATION SLICE

  const totalPages = Math.max(
    1,
    Math.ceil(products.length / PRODUCTS_PER_PAGE),
  );

  if (currentShopPage > totalPages) {
    currentShopPage = totalPages;
  }

  if (currentShopPage < 1) {
    currentShopPage = 1;
  }

  const startIndex = (currentShopPage - 1) * PRODUCTS_PER_PAGE;

  const pageProducts = products.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE,
  );

  // PRODUCT CARDS

  productGrid.innerHTML = pageProducts
    .map((product) => {
      return `
                    <article class="product-card" data-product-id="${product.id}">

                        <div class="product-image">

                            <img
                                src="${escapeHTML(product.image)}"
                                alt="${escapeHTML(product.name)}"
                                onerror="this.src='https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=700&q=80'"
                            >

                            <span class="product-category-tag">
                                ${escapeHTML(product.category)}
                            </span>

                        </div>

                        <div class="product-info">

                            <div class="product-category">
                                ${escapeHTML(product.category)}
                            </div>

                            <h3 class="product-name">
                                ${escapeHTML(product.name)}
                            </h3>

                            <div class="product-price">
                                ₱${Number(product.price).toLocaleString()}
                            </div>

                            <p class="product-description">
                                ${escapeHTML(product.description)}
                            </p>

                            <button
                                class="add-to-bag"
                                onclick="addToBag(${product.id})"
                            >
                                Add to Bag
                            </button>

                        </div>

                    </article>
                `;
    })
    .join("");

  renderShopPagination(totalPages);
}

// ==========================================
// RENDER SHOP PAGINATION
// ==========================================

function renderShopPagination(totalPages) {
  const paginationContainer = document.getElementById("shopPagination");

  if (!paginationContainer) {
    return;
  }

  if (totalPages <= 1) {
    paginationContainer.innerHTML = "";

    return;
  }

  let buttonsHTML = `
        <button
            class="pagination-arrow"
            data-page="${currentShopPage - 1}"
            ${currentShopPage === 1 ? "disabled" : ""}
        >
            ‹
        </button>
    `;

  for (let page = 1; page <= totalPages; page++) {
    buttonsHTML += `
            <button
                class="pagination-number ${page === currentShopPage ? "active" : ""}"
                data-page="${page}"
            >
                ${page}
            </button>
        `;
  }

  buttonsHTML += `
        <button
            class="pagination-arrow"
            data-page="${currentShopPage + 1}"
            ${currentShopPage === totalPages ? "disabled" : ""}
        >
            ›
        </button>
    `;

  paginationContainer.innerHTML = buttonsHTML;

  paginationContainer
    .querySelectorAll("button[data-page]")
    .forEach((button) => {
      button.addEventListener("click", function () {
        const targetPage = Number(button.getAttribute("data-page"));

        if (!targetPage || targetPage === currentShopPage) {
          return;
        }

        currentShopPage = targetPage;

        renderShopProducts();

        const productGrid = document.getElementById("productGrid");

        if (productGrid) {
          productGrid.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
}

// ==========================================
// URL CATEGORY
// ==========================================

function loadCategoryFromURL() {
  const categoryFilter = document.getElementById("categoryFilter");

  if (!categoryFilter) {
    return;
  }

  const parameters = new URLSearchParams(window.location.search);

  const category = parameters.get("category");

  if (!category) {
    return;
  }

  const allowedCategories = ["Clothes", "Bags", "Necklaces", "Rings"];

  if (allowedCategories.includes(category)) {
    categoryFilter.value = category;

    currentShopPage = 1;

    renderShopProducts();
  }
}

// ==========================================
// PRODUCT DETAIL / GALLERY MODAL
// ==========================================

let currentModalProduct = null;

let currentModalImageIndex = 0;

function openProductModal(productId) {
  const products = getProducts();

  const product = products.find(
    (item) => Number(item.id) === Number(productId),
  );

  if (!product) {
    return;
  }

  const overlay = document.getElementById("productModalOverlay");

  if (!overlay) {
    return;
  }

  currentModalProduct = product;

  currentModalImageIndex = 0;

  renderProductModal();

  overlay.classList.add("open");

  document.body.style.overflow = "hidden";
}

function closeProductModal() {
  const overlay = document.getElementById("productModalOverlay");

  if (!overlay) {
    return;
  }

  overlay.classList.remove("open");

  document.body.style.overflow = "";
}

function renderProductModal() {
  const product = currentModalProduct;

  if (!product) {
    return;
  }

  const images =
    product.images && product.images.length ? product.images : [product.image];

  const mainImage = document.getElementById("productModalMainImage");

  if (mainImage) {
    mainImage.src = images[currentModalImageIndex] || images[0];

    mainImage.alt = product.name;

    mainImage.onerror = function () {
      mainImage.src =
        "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=900&q=80";
    };
  }

  const thumbs = document.getElementById("productModalThumbs");

  if (thumbs) {
    thumbs.innerHTML =
      images.length > 1
        ? images
            .map(
              (image, index) => `
                    <button
                        type="button"
                        class="modal-thumb ${index === currentModalImageIndex ? "active" : ""}"
                        data-index="${index}"
                    >
                        <img src="${escapeHTML(image)}" alt="" />
                    </button>
                `,
            )
            .join("")
        : "";
  }

  const categoryEl = document.getElementById("productModalCategory");

  const nameEl = document.getElementById("productModalName");

  const priceEl = document.getElementById("productModalPrice");

  const descriptionEl = document.getElementById("productModalDescription");

  const addButton = document.getElementById("productModalAddButton");

  if (categoryEl) categoryEl.textContent = product.category;

  if (nameEl) nameEl.textContent = product.name;

  if (priceEl) {
    priceEl.textContent = "₱" + Number(product.price).toLocaleString();
  }

  if (descriptionEl) descriptionEl.textContent = product.description;

  if (addButton) addButton.setAttribute("data-product-id", product.id);
}

function setupProductModal() {
  const grid = document.getElementById("productGrid");

  if (grid) {
    grid.addEventListener("click", function (event) {
      if (event.target.closest(".add-to-bag")) {
        return;
      }

      const card = event.target.closest(".product-card");

      if (!card) {
        return;
      }

      openProductModal(card.getAttribute("data-product-id"));
    });
  }

  const overlay = document.getElementById("productModalOverlay");

  const closeButton = document.getElementById("closeProductModal");

  const thumbs = document.getElementById("productModalThumbs");

  const addButton = document.getElementById("productModalAddButton");

  if (closeButton) {
    closeButton.addEventListener("click", closeProductModal);
  }

  if (overlay) {
    overlay.addEventListener("click", function (event) {
      if (event.target === overlay) {
        closeProductModal();
      }
    });
  }

  if (thumbs) {
    thumbs.addEventListener("click", function (event) {
      const thumbButton = event.target.closest(".modal-thumb");

      if (!thumbButton) {
        return;
      }

      currentModalImageIndex = Number(thumbButton.getAttribute("data-index"));

      renderProductModal();
    });
  }

  if (addButton) {
    addButton.addEventListener("click", function () {
      addToBag(addButton.getAttribute("data-product-id"));
    });
  }
}

// ==========================================
// ADMIN DISPLAY
// ==========================================

function renderAdminProducts() {
  const productList = document.getElementById("adminProductList");

  if (!productList) {
    return;
  }

  const products = getProducts();

  const productCount = document.getElementById("adminProductCount");

  if (productCount) {
    productCount.textContent = products.length;
  }

  if (products.length === 0) {
    productList.innerHTML = `
            <div class="empty-bag">
                No products available.
            </div>
        `;

    return;
  }

  productList.innerHTML = products
    .map((product) => {
      return `
                    <div class="admin-product">

                        <div class="admin-product-image">

                            <img
                                src="${escapeHTML(product.image)}"
                                alt="${escapeHTML(product.name)}"
                                onerror="this.src='https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=500&q=80'"
                            >

                        </div>

                        <div>

                            <div class="admin-product-name">
                                ${escapeHTML(product.name)}
                            </div>

                            <div class="admin-product-category">
                                ${escapeHTML(product.category)}
                            </div>

                            <div class="admin-product-price">
                                ₱${Number(product.price).toLocaleString()}
                            </div>

                        </div>

                        <button
                            class="delete-product"
                            onclick="deleteProduct(${product.id})"
                        >
                            Remove
                        </button>

                    </div>
                `;
    })
    .join("");
}

// ==========================================
// DELETE ADMIN PRODUCT
// ==========================================

function deleteProduct(productId) {
  const products = getProducts();

  const product = products.find(
    (item) => Number(item.id) === Number(productId),
  );

  if (!product) {
    return;
  }

  const confirmed = window.confirm(
    "Remove " + product.name + " from the store?",
  );

  if (!confirmed) {
    return;
  }

  const updatedProducts = products.filter(
    (item) => Number(item.id) !== Number(productId),
  );

  saveProducts(updatedProducts);

  renderAdminProducts();

  renderShopProducts();

  showNotification("Product removed.");
}

// ==========================================
// ADMIN PRODUCT IMAGE BUILDER
// ==========================================

let pendingMainImage = null;

let pendingExtraImages = [];

function renderMainImagePreview() {
  const container = document.getElementById("mainImagePreview");

  if (!container) {
    return;
  }

  if (!pendingMainImage) {
    container.innerHTML = "";

    return;
  }

  container.innerHTML = `
        <div class="image-preview-main">
            <img src="${escapeHTML(pendingMainImage)}" alt="Main product preview" />
            <span class="image-preview-main-tag">Main Photo</span>
            <button
                type="button"
                class="image-preview-remove"
                aria-label="Remove main photo"
            >×</button>
        </div>
    `;
}

function renderExtraImagePreview() {
  const container = document.getElementById("extraImagePreviewList");

  if (!container) {
    return;
  }

  container.innerHTML = pendingExtraImages
    .map(
      (image, index) => `
                <div class="image-preview-item">
                    <img src="${escapeHTML(image)}" alt="Product preview ${index + 2}" />
                    <button
                        type="button"
                        class="image-preview-remove"
                        data-index="${index}"
                        aria-label="Remove image"
                    >×</button>
                </div>
            `,
    )
    .join("");
}

function setupAdminImageInputs() {
  const mainUrlInput = document.getElementById("mainImageUrl");

  const addMainUrlButton = document.getElementById("addMainImageUrlButton");

  const mainFileInput = document.getElementById("mainImageFile");

  const mainPreview = document.getElementById("mainImagePreview");

  if (addMainUrlButton && mainUrlInput) {
    addMainUrlButton.addEventListener("click", function () {
      const url = mainUrlInput.value.trim();

      if (!url) {
        return;
      }

      pendingMainImage = url;

      mainUrlInput.value = "";

      renderMainImagePreview();
    });

    mainUrlInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();

        addMainUrlButton.click();
      }
    });
  }

  if (mainFileInput) {
    mainFileInput.addEventListener("change", function () {
      const file = mainFileInput.files && mainFileInput.files[0];

      if (!file) {
        return;
      }

      const reader = new FileReader();

      reader.onload = function (event) {
        pendingMainImage = event.target.result;

        renderMainImagePreview();
      };

      reader.readAsDataURL(file);

      mainFileInput.value = "";
    });
  }

  if (mainPreview) {
    mainPreview.addEventListener("click", function (event) {
      const removeButton = event.target.closest(".image-preview-remove");

      if (!removeButton) {
        return;
      }

      pendingMainImage = null;

      renderMainImagePreview();
    });
  }

  const extraUrlInput = document.getElementById("extraImageUrl");

  const addExtraUrlButton = document.getElementById("addExtraImageUrlButton");

  const extraFileInput = document.getElementById("extraImageFiles");

  const extraPreviewList = document.getElementById("extraImagePreviewList");

  if (addExtraUrlButton && extraUrlInput) {
    addExtraUrlButton.addEventListener("click", function () {
      const url = extraUrlInput.value.trim();

      if (!url) {
        return;
      }

      pendingExtraImages.push(url);

      extraUrlInput.value = "";

      renderExtraImagePreview();
    });

    extraUrlInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();

        addExtraUrlButton.click();
      }
    });
  }

  if (extraFileInput) {
    extraFileInput.addEventListener("change", function () {
      const files = Array.from(extraFileInput.files || []);

      files.forEach(function (file) {
        const reader = new FileReader();

        reader.onload = function (event) {
          pendingExtraImages.push(event.target.result);

          renderExtraImagePreview();
        };

        reader.readAsDataURL(file);
      });

      extraFileInput.value = "";
    });
  }

  if (extraPreviewList) {
    extraPreviewList.addEventListener("click", function (event) {
      const removeButton = event.target.closest(".image-preview-remove");

      if (!removeButton) {
        return;
      }

      const index = Number(removeButton.getAttribute("data-index"));

      pendingExtraImages.splice(index, 1);

      renderExtraImagePreview();
    });
  }
}

// ==========================================
// ADMIN ADD PRODUCT
// ==========================================

function setupAdminForm() {
  const form = document.getElementById("productForm");

  if (!form) {
    return;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("productName").value.trim();

    const category = document.getElementById("productCategory").value;

    const price = Number(document.getElementById("productPrice").value);

    const description = document
      .getElementById("productDescription")
      .value.trim();

    if (!name || !category || !price || !pendingMainImage || !description) {
      alert("Please complete all fields, including a main product photo.");

      return;
    }

    const products = getProducts();

    const newProduct = {
      id: Date.now(),

      name: name,

      category: category,

      price: price,

      image: pendingMainImage,

      images: [pendingMainImage, ...pendingExtraImages],

      description: description,
    };

    products.push(newProduct);

    saveProducts(products);

    form.reset();

    pendingMainImage = null;

    pendingExtraImages = [];

    renderMainImagePreview();

    renderExtraImagePreview();

    renderAdminProducts();

    renderShopProducts();

    showNotification("Product added successfully.");
  });
}

// ==========================================
// MESSENGER
// ==========================================

function sendMessengerInquiry() {
  const bag = getBag();

  if (bag.length === 0) {
    alert("Your bag is empty.");

    return;
  }

  let message =
    "Hello FLUXION! I would like to inquire about these products:%0A%0A";

  bag.forEach((product) => {
    message +=
      "- " +
      encodeURIComponent(product.name) +
      " (" +
      encodeURIComponent(product.category) +
      ") - ₱" +
      product.price +
      "%0A";
  });

  message += "%0AIs this available?";

  /*
        REPLACE THIS WITH THE CLIENT'S
        REAL FACEBOOK MESSENGER USERNAME.

        Example:

        const messengerPage =
            "https://m.me/fluxionfashion";

    */

  const messengerPage = "https://m.me/fluxion";

  window.open(messengerPage + "?text=" + message, "_blank");
}

// ==========================================
// NOTIFICATION
// ==========================================

function showNotification(message) {
  const existing = document.querySelector(".fluxion-notification");

  if (existing) {
    existing.remove();
  }

  const notification = document.createElement("div");

  notification.className = "fluxion-notification";

  notification.textContent = message;

  notification.style.position = "fixed";

  notification.style.bottom = "25px";

  notification.style.left = "50%";

  notification.style.transform = "translateX(-50%)";

  notification.style.zIndex = "1000";

  notification.style.padding = "14px 22px";

  notification.style.background = "#171513";

  notification.style.color = "#ffffff";

  notification.style.fontFamily = "Arial, sans-serif";

  notification.style.fontSize = "10px";

  notification.style.letterSpacing = "1px";

  notification.style.boxShadow = "0 10px 30px rgba(0,0,0,0.2)";

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 2200);
}

// ==========================================
// HTML ESCAPE
// ==========================================

function escapeHTML(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ==========================================
// BAG BUTTONS
// ==========================================

function setupBagButtons() {
  const openButton = document.getElementById("openBagButton");

  const closeButton = document.getElementById("closeBagButton");

  const overlay = document.getElementById("bagOverlay");

  const messengerButton = document.getElementById("messengerButton");

  if (openButton) {
    openButton.addEventListener("click", openBag);
  }

  if (closeButton) {
    closeButton.addEventListener("click", closeBag);
  }

  if (overlay) {
    overlay.addEventListener("click", function (event) {
      if (event.target === overlay) {
        closeBag();
      }
    });
  }

  if (messengerButton) {
    messengerButton.addEventListener("click", sendMessengerInquiry);
  }
}

// ==========================================
// SHOP FILTERS
// ==========================================

function setupShopFilters() {
  const categoryFilter = document.getElementById("categoryFilter");

  const priceFilter = document.getElementById("priceFilter");

  if (categoryFilter) {
    categoryFilter.addEventListener("change", function () {
      currentShopPage = 1;

      renderShopProducts();
    });
  }

  if (priceFilter) {
    priceFilter.addEventListener("change", function () {
      currentShopPage = 1;

      renderShopProducts();
    });
  }
}

// ==========================================
// ESCAPE KEY
// ==========================================

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeBag();

    closeProductModal();
  }
});

// ==========================================
// START
// ==========================================

document.addEventListener("DOMContentLoaded", function () {
  getProducts();

  updateBagCount();

  setupBagButtons();

  setupShopFilters();

  setupProductModal();

  setupAdminForm();

  setupAdminImageInputs();

  setupAdminLogin();

  setupAdminLogout();

  setupSecretAdminEntry();

  renderShopProducts();

  renderAdminProducts();

  loadCategoryFromURL();
});
