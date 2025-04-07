// Product data structure with image support
const products = [
    {
        id: 1,
        name: "Áo cộc tay",
        price: 150000,
        image: "images/anh-1.jpg",
        images: [
            "images/anh-1.jpg",
            "images/anh-1.jpg",
            "images/anh-1.jpg"
        ],
        category: "Áo",
        description: "Áo cộc tay nam chất liệu cotton mềm mại",
        details: [
            "Chất liệu: Cotton 100%",
            "Kiểu dáng: Regular fit",
            "Màu sắc: Đen, Trắng, Xám",
            "Xuất xứ: Việt Nam"
        ],
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: 2,
        name: "Áo cộc tay",
        price: 300000,
        image: "images/ao-thun-nam.jpg",
        images: [
            "images/ao-thun-nam.jpg",
            "images/ao-thun-nam.jpg"
        ],
        category: "Áo",
        description: "Áo cộc tay đi biển",
        details: [
            "Chất liệu: Cotton 100%",
            "Kiểu dáng: Slim fit",
            "Màu sắc: Xanh dương",
            "Xuất xứ: Việt Nam"
        ],
        sizes: ["S", "M", "L"]
    },
    {
        id: 3,
        name: "Áo Barcelona 2024/2025",
        price: 500000,
        image: "images/anh-3.png",
        images: [
            "images/anh-3.png",
            "images/anh-3.png"
        ],
        category: "Áo",
        description: "Áo Barcelona sân nhà chính hãng",
        details: [
            "Chất liệu: Polyester 100%",
            "Kiểu dáng: Regular fit",
            "Màu sắc: Xanh đỏ sọc",
            "Xuất xứ: Tây Ban Nha"
        ],
        sizes: ["S", "M", "L", "XL", "XXL"]
    },
    {
        id: 4,
        name: "Áo khoác nam",
        price: 450000,
        image: "images/anh-4.png",
        images: [
            "images/anh-4.png",
            "images/anh-4.png",
            "images/anh-4.png"
        ],
        category: "Áo",
        description: "Áo khoác nam phong cách trẻ trung",
        details: [
            "Chất liệu: Polyester 100%",
            "Kiểu dáng: Regular fit",
            "Màu sắc: Xanh đen",
            "Xuất xứ: Tây Ban Nha"
        ],
        sizes: ["S", "M", "L", "XL", "XXL"]
    },
    {
        id: 5,
        name: "Áo hoa",
        price: 350000 ,
        image: "images/ao-hoa.png",
        images: [
            "images/ao-hoa.png",
            "images/ao-hoa-1.png",
            "images/ao-hoa-2.png"
        ],
        category: "Áo",
        description: "Áo Luffy hải tặc",
        details: [
            "Chất liệu: Cotton 100%",
            "Kiểu dáng: Regular fit",
            "Màu sắc: Hoa hòe",
            "Xuất xứ: Biển Đông"
        ],
        sizes: ["S", "M", "L", "XL", "XXL"]
    },
    {
        id: 6,
        name: "Túi xách cám cò",
        price: 250000,
        image: "images/tui-xach.png",
        images: [
            "images/tui-xach.png",
            "images/tui-xach-1.png"
        ],
        category: "Phụ kiện",
        description: "Túi xách cám cò phong cách thời trang",
        details: [  
            "Chất liệu: Bao bì cám",
            "Kiểu dáng: Regular fit",
            "Màu sắc: Trắng",
            "Xuất xứ: Việt Nam"
        ],
        sizes: ["S", "M", "L", "XL", "XXL"]
    },

    {
        id: 7,
        name: "Mũ cối bộ đội",
        price: 200000,
        image: "images/mu-coi.jpg",
        category: "Phụ kiện",
        description: "Mũ cối chính hãng",
        details: [
            "Chất liệu: Cao cấp",
            "Kiểu dáng: Regular fit",
            "Màu sắc: Xanh lá",
            "Xuất xứ: Việt Nam"
        ],
        sizes: ["S", "M", "L", "XL", "XXL"]
    }
];

// Cart data
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Display products on homepage
function displayProducts() {
    const productGrid = document.getElementById('productGrid');
    if (productGrid) {
        productGrid.innerHTML = products.map(product => `
            <div class="product-card" onclick="handleProductClick(${product.id})">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" onerror="this.src='images/default-product.png'">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="price">${product.price.toLocaleString('vi-VN')} VNĐ</p>
                    <p class="description">${product.description}</p>
                    <button onclick="event.stopPropagation(); addToCart(${product.id})">Thêm vào giỏ</button>
                </div>
            </div>
        `).join('');
    }
}

// Search products
function searchProducts() {
    const searchInput = document.getElementById('productSearch') || document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase();
    let filteredProducts = [...products];

    // Apply search filter
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
    }

    // Apply other active filters
    const category = document.getElementById('categorySelect').value;
    const priceRange = document.getElementById('priceRange').value;

    if (category !== 'all') {
        filteredProducts = filteredProducts.filter(product => 
            product.category === category
        );
    }

    if (priceRange !== 'all') {
        const [min, max] = priceRange.split('-').map(Number);
        if (priceRange.endsWith('+')) {
            filteredProducts = filteredProducts.filter(product => product.price >= min);
        } else {
            filteredProducts = filteredProducts.filter(product => 
                product.price >= min && product.price <= max
            );
        }
    }

    displayFilteredProducts(filteredProducts);
}

// Add to cart
function addToCart(productId, size = '') {
    const product = products.find(p => p.id === productId);
    if (product) {
        if (!size) {
            // Redirect to product detail page if size is not selected
            window.location.href = `product-detail.html?id=${productId}`;
            return;
        }

        const existingItem = cart.find(item => item.id === productId && item.size === size);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1,
                size: size
            });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        displayCart();
        showNotification('Đã thêm sản phẩm vào giỏ hàng!');
    }
}

// Update cart count in header
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'block' : 'none';
    }
}

// Display cart items
function displayCart() {
    const cartItems = document.getElementById('cartItems');
    const totalAmount = document.getElementById('totalAmount');
    
    if (cartItems && totalAmount) {
        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Giỏ hàng trống</p>';
            totalAmount.textContent = '0 VNĐ';
            return;
        }

        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p class="size">Size: ${item.size}</p>
                    <p class="price">${item.price.toLocaleString('vi-VN')} VNĐ</p>
                    <div class="quantity-controls">
                        <button onclick="updateQuantity(${item.id}, '${item.size}', ${item.quantity - 1})">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, '${item.size}', ${item.quantity + 1})">+</button>
                    </div>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id}, '${item.size}')">Xóa</button>
            </div>
        `).join('');

        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        totalAmount.textContent = `${total.toLocaleString('vi-VN')} VNĐ`;
    }
}

// Update quantity
function updateQuantity(productId, size, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(productId, size);
        return;
    }

    const item = cart.find(item => item.id === productId && item.size === size);
    if (item) {
        item.quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        displayCart();
    }
}

// Remove from cart
function removeFromCart(productId, size) {
    cart = cart.filter(item => !(item.id === productId && item.size === size));
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCart();
    showNotification('Đã xóa sản phẩm khỏi giỏ hàng!');
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Handle login
function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Simple validation
    if (username && password) {
        alert('Đăng nhập thành công!');
        window.location.href = 'index.html';
    } else {
        alert('Vui lòng nhập đầy đủ thông tin!');
    }
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert('Giỏ hàng trống!');
        return;
    }
    
    if (confirm('Xác nhận thanh toán?')) {
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Thanh toán thành công!');
        displayCart();
    }
}

// Filter products by price range
function filterByPrice() {
    applyFilters();
}

// Sort products
function sortProducts() {
    const sortBy = document.getElementById('sortBy').value;
    let sortedProducts = [...products];

    switch (sortBy) {
        case 'price-asc':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name-asc':
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
    }

    displayFilteredProducts(sortedProducts);
}

// Function to get product image with fallback
function getProductImage(product) {
    // Get the image path from product data
    const imagePath = product.image;
    
    // Check if the image exists
    const img = new Image();
    img.src = imagePath;
    
    // If the image exists, return it
    if (img.complete) {
        return imagePath;
    }
    
    // If the image doesn't exist, try alternative formats
    const basePath = imagePath.substring(0, imagePath.lastIndexOf('.'));
    const formats = ['.png', '.jpg', '.jpeg'];
    
    for (const format of formats) {
        const altPath = basePath + format;
        const altImg = new Image();
        altImg.src = altPath;
        if (altImg.complete) {
            return altPath;
        }
    }
    
    // If no image is found, return default image
    return 'images/default-product.png';
}

// Display products with image handling
function displayFilteredProducts(productsToDisplay) {
    const productGrid = document.getElementById('productGrid');
    if (productGrid) {
        productGrid.innerHTML = productsToDisplay.map(product => `
            <div class="product-card" onclick="handleProductClick(${product.id})">
                <div class="product-image">
                    <img src="${getProductImage(product)}" alt="${product.name}" onerror="this.src='images/default-product.png'">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="price">${product.price.toLocaleString('vi-VN')} VNĐ</p>
                    <p class="description">${product.description}</p>
                    ${product.details ? `
                        <div class="product-details">
                            <ul>
                                ${product.details.map(detail => `<li>${detail}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                    ${product.sizes ? `
                        <div class="size-options">
                            ${product.sizes.map(size => `
                                <div class="size-option" onclick="event.stopPropagation(); selectSize(this)">${size}</div>
                            `).join('')}
                        </div>
                    ` : ''}
                    <button onclick="event.stopPropagation(); addToCart(${product.id})">Thêm vào giỏ</button>
                </div>
            </div>
        `).join('');
    }
}

// Filter products by category
function filterByCategory() {
    const category = document.getElementById('categorySelect').value;
    let filteredProducts = [...products];

    if (category !== 'all') {
        filteredProducts = products.filter(product => 
            product.category === category
        );
    }

    displayFilteredProducts(filteredProducts);
}

// Combined filter function
function applyFilters() {
    const category = document.getElementById('categorySelect').value;
    const priceRange = document.getElementById('priceRange').value;
    let filteredProducts = [...products];

    // Apply category filter
    if (category !== 'all') {
        filteredProducts = filteredProducts.filter(product => 
            product.category === category
        );
    }

    // Apply price filter
    if (priceRange !== 'all') {
        const [min, max] = priceRange.split('-').map(Number);
        if (priceRange.endsWith('+')) {
            filteredProducts = filteredProducts.filter(product => product.price >= min);
        } else {
            filteredProducts = filteredProducts.filter(product => 
                product.price >= min && product.price <= max
            );
        }
    }

    displayFilteredProducts(filteredProducts);
}

// Function to handle product click
function handleProductClick(productId) {
    window.location.href = `product-detail.html?id=${productId}`;
}

// Function to display product details
function displayProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const product = products.find(p => p.id === productId);

    if (product) {
        // Set main image
        document.getElementById('mainImage').src = product.image;
        
        // Set product info
        document.getElementById('productName').textContent = product.name;
        document.getElementById('productPrice').textContent = `${product.price.toLocaleString('vi-VN')} VNĐ`;
        document.getElementById('productDescription').textContent = product.description;

        // Display thumbnails if available
        const thumbnailsContainer = document.querySelector('.thumbnail-images');
        if (thumbnailsContainer && product.images) {
            thumbnailsContainer.innerHTML = product.images.map(img => `
                <img src="${img}" alt="${product.name}" onclick="changeMainImage(this.src)">
            `).join('');
        }

        // Display size options if available
        const sizeOptionsContainer = document.getElementById('sizeOptions');
        if (sizeOptionsContainer && product.sizes) {
            sizeOptionsContainer.innerHTML = product.sizes.map(size => `
                <div class="size-option" onclick="selectSize(this)">${size}</div>
            `).join('');
        }

        // Display product details if available
        const detailsContainer = document.getElementById('productDetails');
        if (detailsContainer && product.details) {
            detailsContainer.innerHTML = `
                <h3>Chi tiết sản phẩm</h3>
                <ul>
                    ${product.details.map(detail => `<li>${detail}</li>`).join('')}
                </ul>
            `;
        }

        // Add to cart button
        const addToCartButton = document.querySelector('.add-to-cart');
        if (addToCartButton) {
            addToCartButton.onclick = () => addToCartFromDetail();
        }
    }
}

// Function to change main image when thumbnail is clicked
function changeMainImage(src) {
    document.getElementById('mainImage').src = src;
}

// Function to handle size selection
function selectSize(element) {
    // Remove selected class from all size options
    document.querySelectorAll('.size-option').forEach(option => {
        option.classList.remove('selected');
    });
    // Add selected class to clicked size
    element.classList.add('selected');
}

// Function to add to cart from detail page
function addToCartFromDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const selectedSize = document.querySelector('.size-option.selected');
    
    if (!selectedSize) {
        alert('Vui lòng chọn kích cỡ!');
        return;
    }

    const size = selectedSize.textContent;
    addToCart(productId, size);
}

// Initialize products page
document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on the products page
    if (document.getElementById('productGrid')) {
        displayProducts();
    }
    
    // Check if we're on the product detail page
    if (window.location.pathname.includes('product-detail.html')) {
        displayProductDetails();
    }

    updateCartCount();
    if (document.getElementById('cartItems')) {
        displayCart();
    }
}); 