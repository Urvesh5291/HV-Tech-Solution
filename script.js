/**
 * CCTV Security Systems - Complete E-Commerce & Inventory Management Script
 * Features:
 * - Live Product Add with image upload / preset selection
 * - Live Instant Price Change (inline & quick modal)
 * - Persistent LocalStorage sync
 * - WhatsApp direct order & inquiry generator
 * - Cart management with quantity & totals
 * - Admin Owner Hub with tabs (Add, Manage Prices, Orders, Shop Settings)
 * - Printable invoice generation
 */

// Preset Camera SVGs for crisp, guaranteed offline/online visuals
const PRESET_CAMERA_IMAGES = {
    dome: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300"><defs><radialGradient id="dg" cx="50%" cy="40%" r="50%"><stop offset="0%" stop-color="%233b82f6"/><stop offset="60%" stop-color="%231e293b"/><stop offset="100%" stop-color="%230f172a"/></radialGradient><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23f8fafc"/><stop offset="100%" stop-color="%23e2e8f0"/></linearGradient></defs><rect width="400" height="300" fill="url(%23bg)"/><path d="M 90 190 Q 200 70 310 190 Z" fill="white" stroke="%23cbd5e1" stroke-width="4"/><ellipse cx="200" cy="190" rx="110" ry="24" fill="%23f1f5f9" stroke="%2394a3b8" stroke-width="3"/><circle cx="200" cy="165" r="55" fill="url(%23dg)"/><circle cx="200" cy="165" r="28" fill="%23020617" stroke="%2360a5fa" stroke-width="3"/><circle cx="192" cy="157" r="7" fill="%2393c5fd" opacity="0.8"/><circle cx="200" cy="165" r="42" fill="none" stroke="%23ef4444" stroke-width="2" stroke-dasharray="4,6"/><circle cx="240" cy="140" r="4" fill="%2310b981"/><text x="200" y="255" text-anchor="middle" font-family="sans-serif" font-size="15" font-weight="bold" fill="%231e40af">DOME CCTV CAMERA</text></svg>`,
    bullet: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300"><defs><linearGradient id="metal" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="%23f8fafc"/><stop offset="50%" stop-color="%23e2e8f0"/><stop offset="100%" stop-color="%23cbd5e1"/></linearGradient><linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23f8fafc"/><stop offset="100%" stop-color="%23e2e8f0"/></linearGradient></defs><rect width="400" height="300" fill="url(%23bg2)"/><path d="M 60 230 L 110 230 L 110 190 L 140 190 L 140 160 L 60 160 Z" fill="%23475569"/><rect x="130" y="100" width="170" height="75" rx="10" fill="url(%23metal)" stroke="%2364748b" stroke-width="3"/><path d="M 115 90 L 315 90 L 295 105 L 130 105 Z" fill="%231e293b"/><circle cx="300" cy="138" r="32" fill="%230f172a" stroke="%232563eb" stroke-width="3"/><circle cx="300" cy="138" r="16" fill="%23020617"/><circle cx="295" cy="133" r="5" fill="%2360a5fa" opacity="0.9"/><circle cx="300" cy="138" r="24" fill="none" stroke="%23ef4444" stroke-width="2" stroke-dasharray="3,5"/><line x1="280" y1="90" x2="260" y2="40" stroke="%23334155" stroke-width="4" stroke-linecap="round"/><circle cx="260" cy="40" r="5" fill="%23f59e0b"/><text x="200" y="270" text-anchor="middle" font-family="sans-serif" font-size="15" font-weight="bold" fill="%231e40af">BULLET NIGHT VISION</text></svg>`,
    ptz: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300"><defs><linearGradient id="bg3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23f8fafc"/><stop offset="100%" stop-color="%23e2e8f0"/></linearGradient></defs><rect width="400" height="300" fill="url(%23bg3)"/><path d="M 120 40 L 210 40 L 210 90 L 170 120 L 120 120 Z" fill="%23334155"/><rect x="160" y="100" width="80" height="35" rx="5" fill="%23cbd5e1" stroke="%23475569" stroke-width="2"/><circle cx="200" cy="180" r="60" fill="white" stroke="%2394a3b8" stroke-width="4"/><circle cx="200" cy="185" r="42" fill="%230f172a" stroke="%232563eb" stroke-width="3"/><circle cx="200" cy="185" r="22" fill="%23020617" stroke="%2360a5fa" stroke-width="2"/><circle cx="194" cy="179" r="6" fill="%2393c5fd"/><path d="M 140 180 A 60 60 0 0 1 260 180" stroke="%23f59e0b" stroke-width="3" fill="none" stroke-dasharray="6,4"/><text x="200" y="275" text-anchor="middle" font-family="sans-serif" font-size="15" font-weight="bold" fill="%231e40af">360° PTZ SMART CAMERA</text></svg>`,
    wifi: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300"><defs><linearGradient id="bg4" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23f8fafc"/><stop offset="100%" stop-color="%23e2e8f0"/></linearGradient></defs><rect width="400" height="300" fill="url(%23bg4)"/><ellipse cx="200" cy="230" rx="65" ry="18" fill="%23e2e8f0" stroke="%23cbd5e1" stroke-width="2"/><path d="M 155 225 L 165 140 L 235 140 L 245 225 Z" fill="white" stroke="%2394a3b8" stroke-width="2"/><circle cx="200" cy="115" r="48" fill="white" stroke="%2364748b" stroke-width="3"/><circle cx="200" cy="115" r="30" fill="%230f172a" stroke="%233b82f6" stroke-width="2"/><circle cx="200" cy="115" r="14" fill="%23020617"/><circle cx="196" cy="111" r="4" fill="%2393c5fd"/><path d="M 175 45 A 35 35 0 0 1 225 45" fill="none" stroke="%232563eb" stroke-width="4" stroke-linecap="round"/><path d="M 185 55 A 20 20 0 0 1 215 55" fill="none" stroke="%232563eb" stroke-width="3" stroke-linecap="round"/><circle cx="200" cy="65" r="3" fill="%232563eb"/><text x="200" y="275" text-anchor="middle" font-family="sans-serif" font-size="15" font-weight="bold" fill="%231e40af">WIFI SMART HOME CAMERA</text></svg>`,
    kit: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300"><defs><linearGradient id="bg5" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23f8fafc"/><stop offset="100%" stop-color="%23e2e8f0"/></linearGradient></defs><rect width="400" height="300" fill="url(%23bg5)"/><rect x="60" y="170" width="280" height="55" rx="8" fill="%231e293b" stroke="%230f172a" stroke-width="3"/><circle cx="95" cy="198" r="6" fill="%2310b981"/><line x1="120" y1="198" x2="220" y2="198" stroke="%23334155" stroke-width="8" stroke-linecap="round"/><rect x="280" y="190" width="40" height="15" rx="3" fill="%23475569"/><circle cx="110" cy="95" r="30" fill="white" stroke="%2364748b" stroke-width="3"/><circle cx="110" cy="95" r="16" fill="%230f172a"/><circle cx="190" cy="85" r="30" fill="white" stroke="%2364748b" stroke-width="3"/><circle cx="190" cy="85" r="16" fill="%230f172a"/><circle cx="270" cy="95" r="30" fill="white" stroke="%2364748b" stroke-width="3"/><circle cx="270" cy="95" r="16" fill="%230f172a"/><text x="200" y="265" text-anchor="middle" font-family="sans-serif" font-size="15" font-weight="bold" fill="%231e40af">COMPLETE CCTV KIT + DVR</text></svg>`
};

// Default Products Database (Loaded if localStorage is empty)
const DEFAULT_PRODUCTS = [
    {
        id: 1,
        name: "CP Plus 2.4MP HD Dome Camera (Analog)",
        category: "hd",
        resolution: "2.4MP",
        brand: "CP Plus",
        price: 1350,
        mrp: 1950,
        inStock: true,
        badge: "Best Seller",
        img: "images.jpeg",
        fallbackPreset: "dome",
        features: ["20m IR Night Vision", "Plastic Body (Indoor)", "2.4MP Full HD Clarity", "Wide 3.6mm Lens"],
        description: "High performance CP Plus 2.4MP HD Dome CCTV Camera suitable for indoor home, office, and retail shop surveillance."
    },
    {
        id: 2,
        name: "CP Plus 2.4MP Weatherproof Bullet Camera",
        category: "hd",
        resolution: "2.4MP",
        brand: "CP Plus",
        price: 1550,
        mrp: 2200,
        inStock: true,
        badge: "Weatherproof",
        img: "images (1).jpeg",
        fallbackPreset: "bullet",
        features: ["30m Long IR Distance", "IP66 Water & Dust Proof", "Metal Body Outdoor", "Day & Night Auto Switch"],
        description: "Heavy duty CP Plus 2.4MP Weatherproof Bullet Camera for outdoor parking, main gates, and external boundaries."
    },
    {
        id: 3,
        name: "Hikvision 5MP ColorVu Full Night Vision Bullet",
        category: "hd",
        resolution: "5MP",
        brand: "Hikvision",
        price: 2450,
        mrp: 3400,
        inStock: true,
        badge: "Color Night Vision",
        img: "360_F_364144944_uClLSdb4fBolXsPw842K2FvRGMuYL9D5.jpg",
        fallbackPreset: "bullet",
        features: ["24/7 Color Picture even in Dark", "5MP Ultra Clarity", "Built-in Mic Audio", "IP67 Heavy Weatherproof"],
        description: "Hikvision ColorVu technology brings 24/7 full-color images even in total darkness with 5MP crystal clear resolution."
    },
    {
        id: 4,
        name: "Dahua 4MP PoE IP Dome Camera with Audio",
        category: "ip",
        resolution: "4MP",
        brand: "Dahua",
        price: 2850,
        mrp: 3990,
        inStock: true,
        badge: "PoE Network",
        img: PRESET_CAMERA_IMAGES.dome,
        fallbackPreset: "dome",
        features: ["PoE One Cable Power & Video", "Built-in High Sensitivity Mic", "Smart H.265+ Compression", "Mobile View from Anywhere"],
        description: "Professional Dahua 4MP IP PoE dome camera with crystal clear audio recording and mobile live streaming."
    },
    {
        id: 5,
        name: "Hikvision 8MP (4K) Ultra HD IP Bullet Camera",
        category: "ip",
        resolution: "8MP",
        brand: "Hikvision",
        price: 5200,
        mrp: 6990,
        inStock: true,
        badge: "4K Ultra HD",
        img: PRESET_CAMERA_IMAGES.bullet,
        fallbackPreset: "bullet",
        features: ["4K (3840×2160) Resolution", "Human & Vehicle Detection AI", "50m Long Distance IR", "Metal Body IP67"],
        description: "Ultra-high resolution 4K Hikvision IP camera with advanced AI motion detection for factories, warehouses, and luxury villas."
    },
    {
        id: 6,
        name: "360° Smart Outdoor WiFi PTZ Camera with 2-Way Audio",
        category: "ptz",
        resolution: "4MP",
        brand: "Smart AI",
        price: 2950,
        mrp: 4500,
        inStock: true,
        badge: "360° Zoom",
        img: PRESET_CAMERA_IMAGES.ptz,
        fallbackPreset: "ptz",
        features: ["360° Pan & 90° Tilt from Mobile", "Auto Motion Tracking", "Two-Way Talk Mic & Speaker", "MicroSD Card Slot up to 256GB"],
        description: "Control viewing angle in 360 degrees directly from your smartphone app. Has siren alarm, spotlight, and two-way voice call."
    },
    {
        id: 7,
        name: "Imou Ranger 2 4MP WiFi Indoor 360° Smart Camera",
        category: "wifi",
        resolution: "4MP",
        brand: "Imou",
        price: 2150,
        mrp: 3100,
        inStock: true,
        badge: "Smart WiFi",
        img: PRESET_CAMERA_IMAGES.wifi,
        fallbackPreset: "wifi",
        features: ["Easy 2-Minute Phone Setup", "Human Body Detection", "Baby Crying & Sound Alarm", "Cloud & SD Card Storage"],
        description: "Best smart WiFi camera for baby monitoring, elderly care, and home security with 360 degree coverage and instant alerts."
    },
    {
        id: 8,
        name: "Complete 4-Camera HD CCTV Combo Setup with 1TB HDD",
        category: "kit",
        resolution: "2.4MP",
        brand: "CP Plus / Hikvision",
        price: 11999,
        mrp: 16500,
        inStock: true,
        badge: "Complete Kit",
        img: PRESET_CAMERA_IMAGES.kit,
        fallbackPreset: "kit",
        features: ["4 HD Cameras (Dome + Bullet)", "4CH DVR with Online Mobile App", "1TB Surveillance Hard Disk", "Power Supply + 90m Wire + Connectors"],
        description: "Full setup ready-to-install package! Includes all cameras, DVR, 1TB hard drive, power unit, wiring, and mobile setup support."
    },
    {
        id: 9,
        name: "Complete 8-Camera 5MP ColorVu Combo Setup with 2TB HDD",
        category: "kit",
        resolution: "5MP",
        brand: "Hikvision",
        price: 24999,
        mrp: 32000,
        inStock: true,
        badge: "Commercial Setup",
        img: PRESET_CAMERA_IMAGES.kit,
        fallbackPreset: "kit",
        features: ["8 Color Night Vision Cameras", "8CH 5MP Digital DVR", "2TB Seagate Surveillance Drive", "Heavy Duty Power Supply + 180m Wire"],
        description: "Commercial grade 8-camera 5MP setup designed for large shops, showrooms, godowns, schools, and offices with 24/7 color recording."
    }
];

// Bilingual (English & Gujarati) Language Dictionary
const I18N_STRINGS = {
    gu: {
        lang_btn: "English",
        announcement: "🎉 અમદાવાદ & ગુજરાતભરમાં 28 વર્ષનો અતૂટ વિશ્વાસ! ફ્રી સાઇટ વિઝિટ & ઇન્સ્ટોલેશન કન્સલ્ટેશન ઉપલબ્ધ છે.",
        tagline: "Professional CCTV Surveillance & Security Systems",
        search_placeholder: "કેમેરા શોધો (Search Dome, Bullet, 4K, WiFi, CP Plus, Hikvision...)",
        admin_hub: "ઓનર / એડમિન હબ",
        cart: "કાર્ટ",
        admin_banner_text: "એડમિન મોડ ચાલુ છે: તમે અહીંથી લાઈવ નવી પ્રોડક્ટ ઉમેરી શકો છો અને કિંમતો/ફોટો બદલી શકો છો!",
        admin_add_btn: "➕ નવી પ્રોડક્ટ ઉમેરો (Add Product)",
        admin_manage_btn: "📊 કિંમત & ફોટો મેનેજર (Manage)",
        admin_reset_btn: "🔄 ડિફોલ્ટ રિસેટ (Reset)",
        admin_logout_btn: "🔒 એડમિન બંધ કરો (Logout)",
        hero_pill: "🛡️ COMPLETE CCTV & SECURITY SOLUTIONS",
        hero_title: "ઘર, દુકાન અને ફેક્ટરી માટે <span>સર્વશ્રેષ્ઠ CCTV કેમેરા</span>",
        hero_desc: "CCTV કેમેરા ઇન્સ્ટોલેશન, સેટઅપ, નેટવર્કિંગ અને વાયરિંગ મેન્ટેનન્સ. 2.4MP થી 16MP 4K અલ્ટ્રા HD કેમેરા 2 વર્ષની વોરંટી સાથે. 28 વર્ષથી અગ્રેસર સુરક્ષા સોલ્યુશન્સ!",
        shop_btn: "🛍️ કેમેરા ખરીદો / Shop Now",
        seller_btn: "➕ પ્રોડક્ટ ઉમેરો / કિંમત બદલો (Seller)",
        survey_btn: "📋 ફ્રી સાઇટ સર્વે ક્વોટેશન",
        trust_1_title: "28+ વર્ષનો વિશ્વાસ",
        trust_1_desc: "15,000+ સફળ CCTV ઇન્સ્ટોલેશન્સ",
        trust_2_title: "2 વર્ષ રિપ્લેસમેન્ટ વોરંટી",
        trust_2_desc: "100% ઓરિજિનલ બ્રાન્ડ પ્રોડક્ટ્સ",
        trust_3_title: "મોબાઇલ લાઇવ વ્યૂ સેટઅપ",
        trust_3_desc: "દુનિયાના કોઈપણ ખૂણેથી લાઇવ જુઓ",
        trust_4_title: "ડાયરેક્ટ WhatsApp ઓર્ડર",
        trust_4_desc: "પટેલ ઉર્વેશ & પટેલ હર્ષ સાથે સંપર્ક",
        catalog_title: "અમારા પ્રીમિયમ CCTV કેમેરા મોડલ્સ",
        catalog_desc: "તમારી જરૂરિયાત મુજબ યોગ્ય કેમેરા પસંદ કરો અથવા WhatsApp પર સલાહ મેળવો.",
        tab_all: "🔘 બધા કેમેરા (All)",
        tab_hd: "📹 HD Analog કેમેરા",
        tab_ip: "🌐 IP Network કેમેરા",
        tab_ptz: "🔄 360° PTZ કેમેરા",
        tab_wifi: "📶 વાઇફાઇ સ્માર્ટ કેમેરા",
        tab_kit: "📦 કમ્પ્લીટ DVR કિટ્સ",
        res_label: "રિઝોલ્યુશન:",
        sort_label: "કિંમત ક્રમ:",
        reset_filter: "રીસેટ ફિલ્ટર",
        inquiry_title: "CCTV ઇન્સ્ટોલેશન માટે <span>ફ્રી સાઇટ સર્વે</span> બુક કરો!",
        inquiry_desc: "અમારી એક્સપર્ટ ટીમ તમારા ઘર, ગોડાઉન, ઓફિસ કે ફેક્ટરીની મુલાકાત લઈ યોગ્ય કેમેરા અને સૌથી ઓછા ખર્ચે પરફેક્ટ સેટઅપનું ફ્રી ક્વોટેશન આપશે.",
        footer_cat_title: "કેમેરા કેટેગરીઝ",
        footer_admin_title: "ઓનર / મેનેજમેન્ટ",
        add_to_cart: "🛒 કાર્ટમાં ઉમેરો",
        in_stock: "● ઉપલબ્ધ છે (In Stock)",
        out_stock: "○ આઉટ ઓફ સ્ટોક",
        warranty: "🛡️ 2 વર્ષ વોરંટી",
        change_btn: "📷 ફોટો & કિંમત બદલો / Edit (Live)",
        change_photo: "📷 ફોટો બદલો"
    },
    en: {
        lang_btn: "ગુજરાતી",
        announcement: "🎉 28+ Years of Trust across Ahmedabad & Gujarat! Free Site Survey & Installation Consultation available.",
        tagline: "Professional CCTV Surveillance & Security Systems",
        search_placeholder: "Search cameras (Dome, Bullet, 4K, WiFi, CP Plus, Hikvision...)",
        admin_hub: "Owner / Admin Hub",
        cart: "Cart",
        admin_banner_text: "Admin Mode Active: You can add new products and edit photos/prices live!",
        admin_add_btn: "➕ Add Product",
        admin_manage_btn: "📊 Manage Prices & Photos",
        admin_reset_btn: "🔄 Reset Catalog",
        admin_logout_btn: "🔒 Logout Admin",
        hero_pill: "🛡️ COMPLETE CCTV & SECURITY SOLUTIONS",
        hero_title: "Advanced Security & <span>Professional CCTV Cameras</span>",
        hero_desc: "CCTV Camera Installation & Setup | Networking, Wiring & Maintenance. High quality 2.4MP to 16MP 4K Ultra HD Cameras with 2 Year Warranty & 28+ years of expertise!",
        shop_btn: "🛍️ Shop Cameras Now",
        seller_btn: "➕ Add Product / Edit Price (Seller)",
        survey_btn: "📋 Free Site Survey Quote",
        trust_1_title: "28+ Years Experience",
        trust_1_desc: "15,000+ Successful Installations",
        trust_2_title: "2 Year Replacement Warranty",
        trust_2_desc: "100% Genuine Certified Brands",
        trust_3_title: "Mobile Live View Setup",
        trust_3_desc: "Watch Live Footage from Anywhere",
        trust_4_title: "Direct WhatsApp Ordering",
        trust_4_desc: "Contact Patel Urvesh & Patel Harsh",
        catalog_title: "Our Premium CCTV Camera Range",
        catalog_desc: "Choose the right camera for your needs or consult our security experts directly on WhatsApp.",
        tab_all: "🔘 All Cameras",
        tab_hd: "📹 HD Analog Cameras",
        tab_ip: "🌐 IP Network Cameras",
        tab_ptz: "🔄 360° PTZ Cameras",
        tab_wifi: "📶 WiFi Smart Cameras",
        tab_kit: "📦 Complete DVR Kits",
        res_label: "Resolution:",
        sort_label: "Sort by:",
        reset_filter: "Reset Filters",
        inquiry_title: "Book a <span>Free Site Survey</span> for CCTV Setup!",
        inquiry_desc: "Our expert technical team visits your home, shop, office or warehouse to plan the perfect camera setup with the best quote.",
        footer_cat_title: "Camera Categories",
        footer_admin_title: "Owner / Management",
        add_to_cart: "🛒 Add to Cart",
        in_stock: "● In Stock (Ready)",
        out_stock: "○ Out of Stock",
        warranty: "🛡️ 2 Year Warranty",
        change_btn: "📷 Edit Photo & Price (Live)",
        change_photo: "📷 Change Photo"
    }
};

// App State
let products = [];
let cart = [];
let orders = [];
let currentLang = localStorage.getItem("cctv_lang") || "gu";
let shopSettings = {
    phone: "919173565466",
    urveshPhone: "919173565466",
    harshPhone: "917203875276",
    name: "HV Tech Solutions",
    ownerName: "Patel Urvesh & Patel Harsh",
    city: "Ahmedabad, Gujarat",
    email: "hvtechsolutions2004@gmail.com",
    experienceYears: "28",
    upi: "hvtech@upi"
};
let currentCategory = "all";
let currentResolution = "all";
let currentSort = "featured";
let searchQuery = "";
let isAdminMode = false;
let selectedPresetImage = "dome";
let newProductImageBase64 = null;
let currentQuickEditProductId = null;
let quickEditTempImage = null;

// Initialize on DOM Ready
document.addEventListener("DOMContentLoaded", () => {
    initApp();
});

function initApp() {
    loadSettings();
    loadProducts();
    loadCart();
    loadOrders();
    checkAdminSession();
    setupEventListeners();
    applyLanguage(currentLang);
    renderProducts();
    updateCartCount();
}

function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("cctv_lang", lang);
    const t = I18N_STRINGS[lang] || I18N_STRINGS.gu;

    const langBtn = document.getElementById("currentLangLabel");
    if (langBtn) langBtn.innerText = t.lang_btn;

    // Apply data-i18n attributes
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (t[key]) el.innerHTML = t[key];
    });

    const searchInput = document.getElementById("searchInput");
    if (searchInput) searchInput.placeholder = t.search_placeholder;

    const adminToggleText = document.getElementById("adminToggleText");
    if (adminToggleText && !isAdminMode) adminToggleText.innerText = t.admin_hub;

    const cartBtnText = document.getElementById("cartBtnText");
    if (cartBtnText) cartBtnText.innerText = `🛒 ${t.cart}`;

    renderProducts();
}

function toggleLanguage() {
    const nextLang = currentLang === "gu" ? "en" : "gu";
    applyLanguage(nextLang);
    showToast(nextLang === "en" ? "🌐 Language switched to English" : "🌐 ભાષા ગુજરાતી પસંદ થઈ", "info");
}

// Storage Operations
function loadProducts() {
    const stored = localStorage.getItem("cctv_products_v2");
    if (stored) {
        try {
            products = JSON.parse(stored);
        } catch(e) {
            products = [...DEFAULT_PRODUCTS];
            saveProducts();
        }
    } else {
        products = [...DEFAULT_PRODUCTS];
        saveProducts();
    }
}

function saveProducts() {
    localStorage.setItem("cctv_products_v2", JSON.stringify(products));
}

function loadSettings() {
    const stored = localStorage.getItem("cctv_shop_settings");
    if (stored) {
        try {
            shopSettings = { ...shopSettings, ...JSON.parse(stored) };
        } catch(e) {}
    }
    applySettingsToUI();
}

function saveSettings() {
    localStorage.setItem("cctv_shop_settings", JSON.stringify(shopSettings));
    applySettingsToUI();
}

function applySettingsToUI() {
    // Update phone numbers and links
    const phoneLinks = document.querySelectorAll(".contact-phone-link");
    phoneLinks.forEach(el => {
        el.href = `tel:+${shopSettings.phone}`;
        el.innerText = `+${shopSettings.phone}`;
    });

    const waLinks = document.querySelectorAll(".contact-wa-link");
    waLinks.forEach(el => {
        el.href = `https://wa.me/${shopSettings.phone}`;
    });

    const floatingWa = document.getElementById("floatingWaBtn");
    if (floatingWa) {
        floatingWa.href = `https://wa.me/${shopSettings.phone}?text=Hello%20HV%20Tech%20Solutions%2C%20I%20am%20interested%20in%20CCTV%20Cameras`;
    }

    // Update settings inputs if modal is open
    const inputPhone = document.getElementById("settingPhone");
    const inputName = document.getElementById("settingShopName");
    const inputCity = document.getElementById("settingCity");
    const inputUpi = document.getElementById("settingUpi");
    if (inputPhone) inputPhone.value = shopSettings.phone;
    if (inputName) inputName.value = shopSettings.name;
    if (inputCity) inputCity.value = shopSettings.city;
    if (inputUpi) inputUpi.value = shopSettings.upi;
}

function loadCart() {
    const stored = localStorage.getItem("cctv_cart");
    if (stored) {
        try { cart = JSON.parse(stored); } catch(e) { cart = []; }
    }
}

function saveCart() {
    localStorage.setItem("cctv_cart", JSON.stringify(cart));
    updateCartCount();
    renderCart();
}

function loadOrders() {
    const stored = localStorage.getItem("cctv_orders_history");
    if (stored) {
        try { orders = JSON.parse(stored); } catch(e) { orders = []; }
    }
}

function saveOrders() {
    localStorage.setItem("cctv_orders_history", JSON.stringify(orders));
}

function checkAdminSession() {
    const loggedIn = sessionStorage.getItem("cctv_admin_logged");
    if (loggedIn === "true") {
        setAdminMode(true);
    }
}

// Event Listeners
function setupEventListeners() {
    // Search input
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            searchQuery = e.target.value.trim().toLowerCase();
            const clearBtn = document.getElementById("searchClearBtn");
            if (clearBtn) clearBtn.style.display = searchQuery ? "block" : "none";
            renderProducts();
        });
    }

    // Filter by resolution
    const resFilter = document.getElementById("filterResolution");
    if (resFilter) {
        resFilter.addEventListener("change", (e) => {
            currentResolution = e.target.value;
            renderProducts();
        });
    }

    // Sort by price
    const sortFilter = document.getElementById("filterSort");
    if (sortFilter) {
        sortFilter.addEventListener("change", (e) => {
            currentSort = e.target.value;
            renderProducts();
        });
    }

    // Preset Image Picker selection
    const presetOptions = document.querySelectorAll(".preset-img-option");
    presetOptions.forEach(opt => {
        opt.addEventListener("click", () => {
            presetOptions.forEach(o => o.classList.remove("selected"));
            opt.classList.add("selected");
            selectedPresetImage = opt.getAttribute("data-preset");
            newProductImageBase64 = null; // Clear file upload if preset chosen
            const preview = document.getElementById("newProductImgPreview");
            if (preview) {
                preview.src = PRESET_CAMERA_IMAGES[selectedPresetImage] || "";
                preview.style.display = "block";
            }
        });
    });

    // File input for custom image upload (new product)
    const fileInput = document.getElementById("newProductFile");
    if (fileInput) {
        fileInput.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    newProductImageBase64 = event.target.result;
                    const preview = document.getElementById("newProductImgPreview");
                    if (preview) {
                        preview.src = newProductImageBase64;
                        preview.style.display = "block";
                    }
                    // deselect preset styling
                    presetOptions.forEach(o => o.classList.remove("selected"));
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // File input for editing existing product photo
    const quickEditFileInput = document.getElementById("quickEditFile");
    if (quickEditFileInput) {
        quickEditFileInput.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    quickEditTempImage = event.target.result;
                    const preview = document.getElementById("quickEditImgPreview");
                    if (preview) {
                        preview.src = quickEditTempImage;
                    }
                    // deselect presets in modal
                    document.querySelectorAll(".edit-preset-item").forEach(item => item.classList.remove("selected"));
                };
                reader.readAsDataURL(file);
            }
        });
    }
}

function clearSearch() {
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.value = "";
        searchQuery = "";
        const clearBtn = document.getElementById("searchClearBtn");
        if (clearBtn) clearBtn.style.display = "none";
        renderProducts();
    }
}

// Category Filter Click
function setCategory(cat, element) {
    currentCategory = cat;
    document.querySelectorAll(".category-tab-btn").forEach(btn => btn.classList.remove("active"));
    if (element) element.classList.add("active");
    renderProducts();
}

// Product Filtering & Sorting Logic
function getFilteredProducts() {
    return products.filter(item => {
        // Category filter
        if (currentCategory !== "all" && item.category !== currentCategory) {
            return false;
        }
        // Resolution filter
        if (currentResolution !== "all" && item.resolution !== currentResolution) {
            return false;
        }
        // Search filter
        if (searchQuery) {
            const query = searchQuery;
            const matchName = item.name.toLowerCase().includes(query);
            const matchBrand = (item.brand || "").toLowerCase().includes(query);
            const matchRes = (item.resolution || "").toLowerCase().includes(query);
            const matchCat = (item.category || "").toLowerCase().includes(query);
            const matchFeat = (item.features || []).some(f => f.toLowerCase().includes(query));
            if (!matchName && !matchBrand && !matchRes && !matchCat && !matchFeat) {
                return false;
            }
        }
        return true;
    }).sort((a, b) => {
        if (currentSort === "price-low") return a.price - b.price;
        if (currentSort === "price-high") return b.price - a.price;
        if (currentSort === "resolution") return (parseInt(b.resolution) || 0) - (parseInt(a.resolution) || 0);
        return 0; // default featured
    });
}

// Render Products Grid
function renderProducts() {
    const grid = document.getElementById("productGrid");
    const countBadge = document.getElementById("productCountBadge");
    if (!grid) return;

    const t = I18N_STRINGS[currentLang] || I18N_STRINGS.gu;
    const filtered = getFilteredProducts();

    if (countBadge) {
        countBadge.innerText = currentLang === 'gu' 
            ? `કુલ ${products.length} માંથી ${filtered.length} કેમેરા દર્શાવેલ છે` 
            : `Showing ${filtered.length} of ${products.length} Cameras`;
    }

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">🔍</div>
                <h3>${currentLang === 'gu' ? 'કોઈ કેમેરા મળ્યા નથી' : 'No Cameras Found'}</h3>
                <p>${currentLang === 'gu' ? 'તમારા ફિલ્ટર્સ સાથે મેળ ખાતો કોઈ કેમેરો મળ્યો નથી. ફરીથી પ્રયત્ન કરો.' : "We couldn't find any cameras matching your filters."}</p>
                <button class="btn-hero-primary" onclick="resetAllFilters()">${currentLang === 'gu' ? 'બધા કેમેરા જુઓ' : 'View All Cameras'}</button>
            </div>
        `;
        return;
    }

    let html = "";
    filtered.forEach(p => {
        const discountPercent = p.mrp > p.price ? Math.round(((p.mrp - p.price) / p.mrp) * 100) : 0;
        const imgSrc = p.img || (p.fallbackPreset ? PRESET_CAMERA_IMAGES[p.fallbackPreset] : PRESET_CAMERA_IMAGES.dome);

        let badgeHtml = "";
        if (p.badge) {
            badgeHtml += `<span class="product-badge badge-bestseller">${p.badge}</span>`;
        }
        if (discountPercent > 0) {
            badgeHtml += `<span class="product-badge badge-discount">${discountPercent}% OFF</span>`;
        }

        const featuresListHtml = (p.features || []).slice(0, 3).map(f => `<li>${f}</li>`).join("");

        html += `
            <div class="product-card" id="product-card-${p.id}">
                <div class="product-badge-container">
                    ${badgeHtml}
                </div>

                <!-- Admin Action Bar on Card -->
                <div class="card-admin-bar">
                    <button class="btn-card-admin" title="Change Photo & Price" onclick="openQuickPriceModal(${p.id})">📷</button>
                    <button class="btn-card-admin edit-btn" title="Edit Price & Details" onclick="openQuickPriceModal(${p.id})">✏️</button>
                    <button class="btn-card-admin delete-btn" title="Delete Product" onclick="deleteProduct(${p.id})">🗑️</button>
                </div>

                <!-- Product Image -->
                <div class="product-image-wrap" onclick="openProductDetails(${p.id})">
                    <img src="${imgSrc}" alt="${p.name}" onerror="this.onerror=null; this.src='${PRESET_CAMERA_IMAGES[p.fallbackPreset || 'dome']}';">
                    <button class="card-photo-badge" onclick="event.stopPropagation(); openQuickPriceModal(${p.id});" title="${t.change_photo}">📷 ${t.change_photo}</button>
                </div>

                <!-- Product Content -->
                <div class="product-card-body">
                    <div class="product-meta-row">
                        <span class="product-category-tag">${p.category.toUpperCase()} • ${p.brand || 'CCTV'}</span>
                        <span class="product-res-tag">${p.resolution}</span>
                    </div>

                    <h3 class="product-title" onclick="openProductDetails(${p.id})" title="${p.name}">${p.name}</h3>

                    <ul class="product-features-list">
                        ${featuresListHtml}
                    </ul>

                    <div class="product-price-section">
                        <div class="price-row">
                            <span class="current-price">₹${Number(p.price).toLocaleString('en-IN')}</span>
                            ${p.mrp ? `<span class="original-mrp">₹${Number(p.mrp).toLocaleString('en-IN')}</span>` : ''}
                            ${discountPercent > 0 ? `<span class="savings-tag">Save ₹${Number(p.mrp - p.price).toLocaleString('en-IN')}</span>` : ''}
                        </div>

                        <div class="stock-status-row">
                            <span class="stock-badge ${p.inStock !== false ? 'in-stock' : 'out-stock'}">
                                ${p.inStock !== false ? t.in_stock : t.out_stock}
                            </span>
                            <span class="warranty-text">${t.warranty}</span>
                        </div>

                        <div class="card-actions-grid">
                            <button class="btn-add-cart" onclick="addToCart(${p.id})" ${p.inStock === false ? 'disabled style="opacity:0.6; cursor:not-allowed;"' : ''}>
                                ${t.add_to_cart}
                            </button>
                            <button class="btn-quick-wa" onclick="buyDirectWhatsApp(${p.id})" title="Order directly on WhatsApp">
                                💬
                            </button>
                        </div>

                        <!-- Instant Live Price & Photo Edit Button (Visible when Admin Mode is ON) -->
                        <button class="quick-price-edit-btn" onclick="openQuickPriceModal(${p.id})">
                            ${t.change_btn}
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    grid.innerHTML = html;
}

function resetAllFilters() {
    currentCategory = "all";
    currentResolution = "all";
    currentSort = "featured";
    searchQuery = "";
    const searchInput = document.getElementById("searchInput");
    if (searchInput) searchInput.value = "";
    const resFilter = document.getElementById("filterResolution");
    if (resFilter) resFilter.value = "all";
    const sortFilter = document.getElementById("filterSort");
    if (sortFilter) sortFilter.value = "featured";
    document.querySelectorAll(".category-tab-btn").forEach(btn => btn.classList.remove("active"));
    const allBtn = document.querySelector(".category-tab-btn");
    if (allBtn) allBtn.classList.add("active");
    renderProducts();
}

// -------------------------------------------------------------
// LIVE PRICE & PHOTO EDITING & PRODUCT MANAGEMENT
// -------------------------------------------------------------

// Open Quick Price & Photo Modal
function openQuickPriceModal(productId) {
    const item = products.find(p => p.id === productId);
    if (!item) return;

    currentQuickEditProductId = productId;
    quickEditTempImage = item.img || (item.fallbackPreset ? PRESET_CAMERA_IMAGES[item.fallbackPreset] : PRESET_CAMERA_IMAGES.dome);

    const preview = document.getElementById("quickEditImgPreview");
    if (preview) preview.src = quickEditTempImage;

    const nameInput = document.getElementById("quickEditNameInput");
    if (nameInput) nameInput.value = item.name;

    const priceInput = document.getElementById("quickEditPrice");
    if (priceInput) priceInput.value = item.price;

    const mrpInput = document.getElementById("quickEditMrp");
    if (mrpInput) mrpInput.value = item.mrp || Math.round(item.price * 1.3);

    const stockInput = document.getElementById("quickEditStock");
    if (stockInput) stockInput.value = item.inStock !== false ? "true" : "false";

    const fileInput = document.getElementById("quickEditFile");
    if (fileInput) fileInput.value = "";

    const urlInput = document.getElementById("quickEditImageUrl");
    if (urlInput) urlInput.value = "";

    document.querySelectorAll(".edit-preset-item").forEach(i => i.classList.remove("selected"));

    document.getElementById("quickPriceModal").classList.add("open");
}

function closeQuickPriceModal() {
    document.getElementById("quickPriceModal").classList.remove("open");
    currentQuickEditProductId = null;
    quickEditTempImage = null;
}

function selectQuickEditPreset(presetKey, el) {
    document.querySelectorAll(".edit-preset-item").forEach(item => item.classList.remove("selected"));
    if (el) el.classList.add("selected");

    if (presetKey === "local_dome") {
        quickEditTempImage = "images.jpeg";
    } else if (presetKey === "local_bullet") {
        quickEditTempImage = "images (1).jpeg";
    } else if (presetKey === "local_colorvu") {
        quickEditTempImage = "360_F_364144944_uClLSdb4fBolXsPw842K2FvRGMuYL9D5.jpg";
    } else {
        quickEditTempImage = PRESET_CAMERA_IMAGES[presetKey] || PRESET_CAMERA_IMAGES.dome;
    }

    const preview = document.getElementById("quickEditImgPreview");
    if (preview) preview.src = quickEditTempImage;

    const urlInput = document.getElementById("quickEditImageUrl");
    if (urlInput) urlInput.value = "";
}

function onQuickEditUrlInput(url) {
    if (url && url.trim()) {
        quickEditTempImage = url.trim();
        const preview = document.getElementById("quickEditImgPreview");
        if (preview) preview.src = quickEditTempImage;
        document.querySelectorAll(".edit-preset-item").forEach(item => item.classList.remove("selected"));
    }
}

// Save Quick Price & Photo changes (Live Instant Update!)
function saveQuickPriceChanges() {
    if (!currentQuickEditProductId) return;

    const newName = document.getElementById("quickEditNameInput").value.trim();
    const newPrice = parseFloat(document.getElementById("quickEditPrice").value);
    const newMrp = parseFloat(document.getElementById("quickEditMrp").value);
    const inStock = document.getElementById("quickEditStock").value === "true";

    if (!newName) {
        showToast("કૃપા કરીને કેમેરાનું નામ લખો! (Product Name required)", "info");
        return;
    }

    if (isNaN(newPrice) || newPrice <= 0) {
        showToast("કૃપા કરીને માન્ય કિંમત દાખલ કરો! (Please enter a valid price)", "info");
        return;
    }

    const itemIndex = products.findIndex(p => p.id === currentQuickEditProductId);
    if (itemIndex > -1) {
        products[itemIndex].name = newName;
        products[itemIndex].price = newPrice;
        products[itemIndex].mrp = isNaN(newMrp) ? Math.round(newPrice * 1.25) : newMrp;
        products[itemIndex].inStock = inStock;

        // Update photo if new one chosen
        if (quickEditTempImage) {
            products[itemIndex].img = quickEditTempImage;
        }

        // Save to Storage
        saveProducts();

        // Also update any matching item currently in cart
        const cartItem = cart.find(c => c.id === currentQuickEditProductId);
        if (cartItem) {
            cartItem.name = newName;
            cartItem.price = newPrice;
            if (quickEditTempImage) cartItem.img = quickEditTempImage;
            saveCart();
        }

        // Close modal
        closeQuickPriceModal();

        // Re-render UI immediately
        renderProducts();
        renderAdminProductsTable();

        showToast(`✅ ${newName} નો ફોટો અને કિંમત સફળતાપૂર્વક અપડેટ થઈ ગઈ! (Updated!)`, "success");

        // Highlight changed card
        const card = document.getElementById(`product-card-${products[itemIndex].id}`);
        if (card) {
            card.scrollIntoView({ behavior: "smooth", block: "center" });
            card.style.boxShadow = "0 0 25px #10b981";
            setTimeout(() => { card.style.boxShadow = ""; }, 2500);
        }
    }
}

// Inline Price Update inside Admin Table
function updateInlinePrice(productId, newPriceInput) {
    const newPrice = parseFloat(newPriceInput.value);
    if (isNaN(newPrice) || newPrice <= 0) {
        showToast("માન્ય કિંમત દાખલ કરો (Invalid price)", "info");
        return;
    }

    const item = products.find(p => p.id === productId);
    if (item) {
        item.price = newPrice;
        if (item.mrp < newPrice) item.mrp = Math.round(newPrice * 1.3);
        saveProducts();
        renderProducts();
        showToast(`✅ કિંમત બદલાઈ ગઈ: ₹${newPrice.toLocaleString('en-IN')}`, "success");
    }
}

// Add New Product (Live)
function handleAddNewProduct(event) {
    if (event) event.preventDefault();

    const name = document.getElementById("newProdName").value.trim();
    const category = document.getElementById("newProdCategory").value;
    const resolution = document.getElementById("newProdResolution").value;
    const brand = document.getElementById("newProdBrand").value.trim() || "HV Tech";
    const price = parseFloat(document.getElementById("newProdPrice").value);
    const mrp = parseFloat(document.getElementById("newProdMrp").value) || Math.round(price * 1.3);
    const featuresRaw = document.getElementById("newProdFeatures").value.trim();
    const description = document.getElementById("newProdDesc").value.trim() || `${brand} ${resolution} High Definition Security Camera`;
    const inStock = document.getElementById("newProdStock").value === "true";
    const customUrl = document.getElementById("newProdImageUrl").value.trim();

    if (!name || isNaN(price) || price <= 0) {
        showToast("કૃપા કરીને કેમેરાનું નામ અને કિંમત લખો! (Name & Price are required)", "info");
        return;
    }

    // Determine product image
    let finalImg = PRESET_CAMERA_IMAGES[selectedPresetImage || "dome"];
    if (newProductImageBase64) {
        finalImg = newProductImageBase64;
    } else if (customUrl) {
        finalImg = customUrl;
    }

    // Split features by comma or newline
    let featuresArray = [];
    if (featuresRaw) {
        featuresArray = featuresRaw.split(/[,;\n]/).map(f => f.trim()).filter(f => f.length > 0);
    }
    if (featuresArray.length === 0) {
        featuresArray = [`${resolution} Crystal HD`, "Night Vision IR", "2 Year Warranty", "Waterproof Setup"];
    }

    const newId = Date.now();
    const newProduct = {
        id: newId,
        name: name,
        category: category,
        resolution: resolution,
        brand: brand,
        price: price,
        mrp: mrp,
        inStock: inStock,
        badge: "New Arrival",
        img: finalImg,
        fallbackPreset: selectedPresetImage || "dome",
        features: featuresArray,
        description: description
    };

    // Add to beginning of products array
    products.unshift(newProduct);
    saveProducts();

    // Reset Form
    document.getElementById("addProductForm").reset();
    newProductImageBase64 = null;
    const preview = document.getElementById("newProductImgPreview");
    if (preview) preview.style.display = "none";

    // Re-render UI
    renderProducts();
    renderAdminProductsTable();

    // Switch to Products Tab or Close
    showToast(`🎉 "${name}" નવી પ્રોડક્ટ સફળતાપૂર્વક વેબસાઇટ પર ઉમેરાઈ ગઈ!`, "success");
    closeOwnerHub();

    // Scroll to the newly added camera
    setTimeout(() => {
        const newCard = document.getElementById(`product-card-${newId}`);
        if (newCard) {
            newCard.scrollIntoView({ behavior: "smooth", block: "center" });
            newCard.style.outline = "3px solid #10b981";
            setTimeout(() => { newCard.style.outline = ""; }, 3000);
        }
    }, 300);
}

// Delete Product
function deleteProduct(productId) {
    const item = products.find(p => p.id === productId);
    if (!item) return;

    if (confirm(`શું તમે ખરેખર "${item.name}" કેમેરાને હટાવવા માંગો છો?\nAre you sure you want to delete this camera?`)) {
        products = products.filter(p => p.id !== productId);
        saveProducts();
        renderProducts();
        renderAdminProductsTable();
        showToast(`🗑️ "${item.name}" પ્રોડક્ટ હટાવી દેવામાં આવી છે.`, "info");
    }
}

// Reset to Default Products Catalog
function resetToDefaultProducts() {
    if (confirm("શું તમે મૂળ ડિફોલ્ટ કેમેરા લિસ્ટ પાછું લાવવા માંગો છો?\nDo you want to reset all cameras to default demo list?")) {
        products = JSON.parse(JSON.stringify(DEFAULT_PRODUCTS));
        saveProducts();
        renderProducts();
        renderAdminProductsTable();
        showToast("🔄 ડિફોલ્ટ પ્રોડક્ટ્સ લિસ્ટ રિસેટ થઈ ગયું!", "success");
    }
}

// -------------------------------------------------------------
// CART & WHATSAPP CHECKOUT OPERATIONS
// -------------------------------------------------------------

function addToCart(productId) {
    const item = products.find(p => p.id === productId);
    if (!item) return;

    if (item.inStock === false) {
        showToast("આ કેમેરો હાલમાં આઉટ ઓફ સ્ટોક છે. (Out of Stock)", "info");
        return;
    }

    const existing = cart.find(c => c.id === productId);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({
            id: item.id,
            name: item.name,
            price: item.price,
            img: item.img || PRESET_CAMERA_IMAGES[item.fallbackPreset || "dome"],
            fallbackPreset: item.fallbackPreset || "dome",
            qty: 1
        });
    }

    saveCart();
    showToast(`🛒 "${item.name}" કાર્ટમાં ઉમેરાઈ ગયું!`, "success");
    openCartDrawer();
}

function updateCartQty(productId, delta) {
    const item = cart.find(c => c.id === productId);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
        cart = cart.filter(c => c.id !== productId);
    }
    saveCart();
}

function removeFromCart(productId) {
    cart = cart.filter(c => c.id !== productId);
    saveCart();
}

function updateCartCount() {
    const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
    const badge = document.getElementById("cartCountBadge");
    if (badge) badge.innerText = totalCount;
}

function openCartDrawer() {
    renderCart();
    document.getElementById("cartDrawer").classList.add("open");
}

function closeCartDrawer() {
    document.getElementById("cartDrawer").classList.remove("open");
}

function renderCart() {
    const container = document.getElementById("cartItemsContainer");
    const subtotalEl = document.getElementById("cartSubtotal");
    const totalEl = document.getElementById("cartGrandTotal");
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = `
            <div style="text-align:center; padding: 40px 10px; color:#64748b;">
                <div style="font-size:42px; margin-bottom:10px;">🛒</div>
                <h4 style="color:#0f172a; margin-bottom:6px;">Your Cart is Empty</h4>
                <p style="font-size:13px;">Add some cameras to start your order!</p>
            </div>
        `;
        if (subtotalEl) subtotalEl.innerText = "₹0";
        if (totalEl) totalEl.innerText = "₹0";
        return;
    }

    let subtotal = 0;
    let html = "";

    cart.forEach(item => {
        const itemTotal = item.price * item.qty;
        subtotal += itemTotal;
        const imgSrc = item.img || PRESET_CAMERA_IMAGES[item.fallbackPreset || "dome"];

        html += `
            <div class="cart-item-row">
                <img src="${imgSrc}" class="cart-item-img" alt="${item.name}">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">₹${Number(item.price).toLocaleString('en-IN')} × ${item.qty} = ₹${Number(itemTotal).toLocaleString('en-IN')}</div>
                    <div class="cart-qty-ctrl">
                        <button class="btn-qty" onclick="updateCartQty(${item.id}, -1)">-</button>
                        <span class="cart-qty-number">${item.qty}</span>
                        <button class="btn-qty" onclick="updateCartQty(${item.id}, 1)">+</button>
                    </div>
                </div>
                <button class="btn-cart-remove" title="Remove" onclick="removeFromCart(${item.id})">✕</button>
            </div>
        `;
    });

    container.innerHTML = html;
    if (subtotalEl) subtotalEl.innerText = `₹${Number(subtotal).toLocaleString('en-IN')}`;
    if (totalEl) totalEl.innerText = `₹${Number(subtotal).toLocaleString('en-IN')}`;
}

// Open Checkout Details Form Modal
function proceedToCheckout() {
    if (cart.length === 0) {
        showToast("તમારું કાર્ટ ખાલી છે! (Your cart is empty)", "info");
        return;
    }
    closeCartDrawer();
    document.getElementById("checkoutModal").classList.add("open");
}

function closeCheckoutModal() {
    document.getElementById("checkoutModal").classList.remove("open");
}

// Send Order to WhatsApp & Save Order
function submitWhatsAppOrder(event) {
    if (event) event.preventDefault();

    const name = document.getElementById("custName").value.trim();
    const phone = document.getElementById("custPhone").value.trim();
    const address = document.getElementById("custAddress").value.trim();
    const needInstall = document.getElementById("custInstall").value;
    const payment = document.getElementById("custPayment").value;
    const recipientSelect = document.getElementById("checkoutRecipient");
    const recipientPhone = recipientSelect ? recipientSelect.value.trim() : (shopSettings.urveshPhone || "9173565466");
    const recipientName = recipientPhone.includes("7203875276") ? "Patel Harsh" : "Patel Urvesh";

    if (!name || !phone || !address) {
        showToast("કૃપા કરીને તમારું નામ, નંબર અને સરનામું લખો!", "info");
        return;
    }

    let subtotal = 0;
    let itemsText = "";

    cart.forEach((c, index) => {
        const itemTotal = c.price * c.qty;
        subtotal += itemTotal;
        itemsText += `${index + 1}. *${c.name}*%0A   Qty: ${c.qty} × ₹${c.price} = ₹${itemTotal}%0A`;
    });

    const orderId = "HV-" + Math.floor(100000 + Math.random() * 900000);
    const dateStr = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    // Build Formatted WhatsApp Message (English + Gujarati)
    let msg = `🚨 *NEW CCTV ORDER - HV TECH SOLUTIONS*%0A`;
    msg += `━━━━━━━━━━━━━━━━━━━━%0A`;
    msg += `📋 *Order ID:* ${orderId}%0A`;
    msg += `📅 *Date:* ${dateStr}%0A`;
    msg += `👤 *Order Sent To:* ${recipientName}%0A`;
    msg += `━━━━━━━━━━━━━━━━━━━━%0A`;
    msg += `👤 *CUSTOMER DETAILS:*%0A`;
    msg += `• Name: *${name}*%0A`;
    msg += `• Mobile: *${phone}*%0A`;
    msg += `• Address: ${address}%0A`;
    msg += `• Installation Needed: *${needInstall}*%0A`;
    msg += `• Payment Mode: *${payment}*%0A`;
    msg += `━━━━━━━━━━━━━━━━━━━━%0A`;
    msg += `📹 *ORDERED CAMERAS:*%0A`;
    msg += itemsText;
    msg += `━━━━━━━━━━━━━━━━━━━━%0A`;
    msg += `💰 *TOTAL AMOUNT:* *₹${Number(subtotal).toLocaleString('en-IN')}*%0A`;
    msg += `━━━━━━━━━━━━━━━━━━━━%0A`;
    msg += `📞 *Direct Contacts:*%0A`;
    msg += `• Patel Urvesh: +91 91735 65466%0A`;
    msg += `• Patel Harsh: +91 72038 75276%0A`;
    msg += `📧 hvtechsolutions2004@gmail.com%0A`;
    msg += `━━━━━━━━━━━━━━━━━━━━%0A`;
    msg += `_Please confirm this order and dispatch details._`;

    // Save order in admin list
    const orderRecord = {
        orderId: orderId,
        date: dateStr,
        customerName: name,
        customerPhone: phone,
        address: address,
        installation: needInstall,
        payment: payment,
        routedTo: recipientName,
        items: [...cart],
        total: subtotal
    };
    orders.unshift(orderRecord);
    saveOrders();

    // Prepare Invoice Preview Data
    prepareInvoicePrint(orderRecord);

    // Open WhatsApp to Selected Partner
    const cleanPhone = recipientPhone.startsWith("91") ? recipientPhone : `91${recipientPhone}`;
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${msg}`;
    window.open(whatsappUrl, "_blank");

    // Clear Cart
    cart = [];
    saveCart();
    closeCheckoutModal();

    // Open Order Confirmation / Invoice modal
    document.getElementById("invoiceModal").classList.add("open");
    showToast(`🎉 તમારો ઓર્ડર ${recipientName} ને WhatsApp પર મોકલાઈ ગયો છે!`, "success");
}

// Single Camera Direct Buy via WhatsApp
function buyDirectWhatsApp(productId) {
    const item = products.find(p => p.id === productId);
    if (!item) return;

    let msg = `Hello *HV Tech Solutions*,%0A`;
    msg += `I am interested in buying this CCTV camera:%0A%0A`;
    msg += `📹 *${item.name}*%0A`;
    msg += `• Resolution: ${item.resolution}%0A`;
    msg += `• Offer Price: *₹${Number(item.price).toLocaleString('en-IN')}*%0A`;
    msg += `• Category: ${item.category.toUpperCase()}%0A%0A`;
    msg += `Please send me more details, delivery time, and payment method.%0A`;
    msg += `(Contacts: Patel Urvesh: +91 91735 65466 | Patel Harsh: +91 72038 75276)`;

    const defaultPhone = shopSettings.urveshPhone || shopSettings.phone || "919173565466";
    const whatsappUrl = `https://wa.me/${defaultPhone}?text=${msg}`;
    window.open(whatsappUrl, "_blank");
}

// Free Site Survey / Installation Inquiry Form
function submitSiteSurvey(event) {
    if (event) event.preventDefault();

    const name = document.getElementById("surveyName").value.trim();
    const phone = document.getElementById("surveyPhone").value.trim();
    const location = document.getElementById("surveyLocation").value.trim();
    const camerasCount = document.getElementById("surveyCameras").value;
    const propertyType = document.getElementById("surveyProperty").value;

    let msg = `🏢 *CCTV INSTALLATION & SURVEY REQUEST*%0A`;
    msg += `━━━━━━━━━━━━━━━━━━━━%0A`;
    msg += `• Customer Name: *${name}*%0A`;
    msg += `• Mobile Number: *${phone}*%0A`;
    msg += `• City / Area: *${location}*%0A`;
    msg += `• Required Cameras: *${camerasCount}*%0A`;
    msg += `• Property Type: *${propertyType}*%0A`;
    msg += `━━━━━━━━━━━━━━━━━━━━%0A`;
    msg += `_Please contact me for quotation & site visit._%0A`;
    msg += `(Helpline: Patel Urvesh: 91735 65466 | Patel Harsh: 72038 75276)`;

    const defaultPhone = shopSettings.urveshPhone || shopSettings.phone || "919173565466";
    const url = `https://wa.me/${defaultPhone}?text=${msg}`;
    window.open(url, "_blank");
    showToast("તમારી તપાસ WhatsApp પર મોકલાઈ ગઈ છે!", "success");
    document.getElementById("surveyForm").reset();
}

// -------------------------------------------------------------
// INVOICE & PRINTABLE BILL
// -------------------------------------------------------------

function prepareInvoicePrint(order) {
    const area = document.getElementById("invoicePrintArea");
    if (!area) return;

    let itemsRows = "";
    order.items.forEach((item, i) => {
        itemsRows += `
            <tr>
                <td style="padding:8px; border:1px solid #ddd;">${i+1}</td>
                <td style="padding:8px; border:1px solid #ddd;"><b>${item.name}</b></td>
                <td style="padding:8px; border:1px solid #ddd; text-align:center;">${item.qty}</td>
                <td style="padding:8px; border:1px solid #ddd; text-align:right;">₹${Number(item.price).toLocaleString('en-IN')}</td>
                <td style="padding:8px; border:1px solid #ddd; text-align:right;">₹${Number(item.price * item.qty).toLocaleString('en-IN')}</td>
            </tr>
        `;
    });

    area.innerHTML = `
        <div style="font-family:sans-serif; max-width:800px; margin:0 auto; padding:20px; border:2px solid #1e40af; border-radius:8px; background:#ffffff;">
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #1e40af; padding-bottom:15px; margin-bottom:15px; flex-wrap:wrap; gap:12px;">
                <div style="display:flex; align-items:center; gap:12px;">
                    <img src="hv_logo.png" alt="HV Logo" style="width:55px; height:auto; object-fit:contain; border-radius:6px; box-shadow:0 2px 8px rgba(0,0,0,0.12);" onerror="this.style.display='none'">
                    <div>
                        <h2 style="color:#1e40af; margin:0 0 3px; font-size:22px; font-weight:800;">${shopSettings.name}</h2>
                        <p style="margin:0 0 2px; font-size:12px; color:#475569;">Security & Surveillance Solutions • 28+ Years Trust</p>
                        <p style="margin:0 0 2px; font-size:12px; color:#0f172a;"><b>Patel Urvesh:</b> +91 91735 65466 &nbsp;|&nbsp; <b>Patel Harsh:</b> +91 72038 75276</p>
                        <p style="margin:0; font-size:11px; color:#64748b;">📧 hvtechsolutions2004@gmail.com &nbsp;|&nbsp; 📍 Ahmedabad, Gujarat</p>
                    </div>
                </div>
                <div style="text-align:right;">
                    <h3 style="margin:0; color:#0f172a; font-size:18px;">ESTIMATE / BILL</h3>
                    <p style="margin:4px 0 0; font-size:13px;"><b>Bill No:</b> ${order.orderId}</p>
                    <p style="margin:2px 0 0; font-size:12px; color:#666;">Date: ${order.date}</p>
                </div>
            </div>

            <div style="background:#f8fafc; padding:12px; border-radius:6px; margin-bottom:15px; font-size:13px; border:1px solid #e2e8f0;">
                <p style="margin:2px 0;"><b>Customer Name:</b> ${order.customerName}</p>
                <p style="margin:2px 0;"><b>Phone:</b> ${order.customerPhone}</p>
                <p style="margin:2px 0;"><b>Delivery Address:</b> ${order.address}</p>
                <p style="margin:2px 0;"><b>Installation Requested:</b> ${order.installation}</p>
            </div>

            <table style="width:100%; border-collapse:collapse; font-size:13px; margin-bottom:15px;">
                <thead>
                    <tr style="background:#1e40af; color:white;">
                        <th style="padding:8px; border:1px solid #1e40af;">#</th>
                        <th style="padding:8px; border:1px solid #1e40af; text-align:left;">Item Description</th>
                        <th style="padding:8px; border:1px solid #1e40af;">Qty</th>
                        <th style="padding:8px; border:1px solid #1e40af; text-align:right;">Rate</th>
                        <th style="padding:8px; border:1px solid #1e40af; text-align:right;">Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemsRows}
                </tbody>
                <tfoot>
                    <tr style="font-weight:bold; background:#f1f5f9;">
                        <td colspan="4" style="padding:10px; text-align:right; border:1px solid #ddd; font-size:15px;">Grand Total:</td>
                        <td style="padding:10px; text-align:right; border:1px solid #ddd; font-size:16px; color:#1e40af;">₹${Number(order.total).toLocaleString('en-IN')}</td>
                    </tr>
                </tfoot>
            </table>

            <div style="display:flex; justify-content:space-between; margin-top:25px; font-size:12px; color:#555; flex-wrap:wrap; gap:15px;">
                <div>
                    <p style="margin:3px 0;">• 2 Years Standard Replacement Warranty on Cameras & DVR.</p>
                    <p style="margin:3px 0;">• Free onsite setup guide & mobile remote app configuration.</p>
                    <p style="margin:3px 0;">• For support & service: Patel Urvesh (91735 65466) / Patel Harsh (72038 75276)</p>
                </div>
                <div style="text-align:center;">
                    <br><br>
                    <p style="border-top:1px solid #aaa; padding-top:4px;"><b>Authorized Signatory</b><br>${shopSettings.name}</p>
                </div>
            </div>
        </div>
    `;
}

function printCurrentInvoice() {
    window.print();
}

function closeInvoiceModal() {
    document.getElementById("invoiceModal").classList.remove("open");
}

// -------------------------------------------------------------
// VISITING CARD & FLOATING WHATSAPP POPUP HELPERS
// -------------------------------------------------------------

function toggleWaPopup() {
    const popup = document.getElementById("waPopupMenu");
    if (popup) {
        popup.classList.toggle("open");
    }
}

function openVisitingCardModal() {
    const m = document.getElementById("visitingCardModal");
    if (m) m.classList.add("open");
}

function closeVisitingCardModal() {
    const m = document.getElementById("visitingCardModal");
    if (m) m.classList.remove("open");
}

// Close WhatsApp popup when clicking outside
document.addEventListener("click", function(e) {
    const popup = document.getElementById("waPopupMenu");
    const btn = document.getElementById("floatingWaBtn");
    if (popup && popup.classList.contains("open")) {
        if (!popup.contains(e.target) && !btn.contains(e.target)) {
            popup.classList.remove("open");
        }
    }
});

// -------------------------------------------------------------
// PRODUCT DETAILS / QUICK VIEW MODAL
// -------------------------------------------------------------

function openProductDetails(productId) {
    const item = products.find(p => p.id === productId);
    if (!item) return;

    const discountPercent = item.mrp > item.price ? Math.round(((item.mrp - item.price) / item.mrp) * 100) : 0;
    const imgSrc = item.img || PRESET_CAMERA_IMAGES[item.fallbackPreset || "dome"];

    document.getElementById("detailModalTitle").innerText = item.name;
    document.getElementById("detailModalImg").src = imgSrc;
    document.getElementById("detailModalCategory").innerText = `${item.category.toUpperCase()} Camera • Brand: ${item.brand || 'HV Tech'}`;
    document.getElementById("detailModalPrice").innerText = `₹${Number(item.price).toLocaleString('en-IN')}`;
    document.getElementById("detailModalMrp").innerText = item.mrp ? `₹${Number(item.mrp).toLocaleString('en-IN')}` : '';
    document.getElementById("detailModalDiscount").innerText = discountPercent > 0 ? `${discountPercent}% OFF` : '';
    document.getElementById("detailModalDesc").innerText = item.description || "High quality CCTV Camera with superior resolution and infrared night vision.";

    const featContainer = document.getElementById("detailModalFeatures");
    if (featContainer) {
        featContainer.innerHTML = (item.features || []).map(f => `<li>✓ ${f}</li>`).join("");
    }

    const buyBtn = document.getElementById("detailModalAddCart");
    if (buyBtn) {
        buyBtn.onclick = () => {
            addToCart(item.id);
            closeProductDetails();
        };
    }

    const waBtn = document.getElementById("detailModalWa");
    if (waBtn) {
        waBtn.onclick = () => {
            buyDirectWhatsApp(item.id);
        };
    }

    document.getElementById("productDetailModal").classList.add("open");
}

function closeProductDetails() {
    document.getElementById("productDetailModal").classList.remove("open");
}

// -------------------------------------------------------------
// ADMIN / OWNER HUB
// -------------------------------------------------------------

function toggleAdminMode() {
    if (isAdminMode) {
        setAdminMode(false);
        showToast("🔒 એડમિન મોડ બંધ થયો (Admin Mode Deactivated)", "info");
    } else {
        openLoginModal();
    }
}

function openLoginModal() {
    document.getElementById("loginModal").classList.add("open");
}

function closeLoginModal() {
    document.getElementById("loginModal").classList.remove("open");
}

function handleLoginSubmit(event) {
    if (event) event.preventDefault();

    const user = document.getElementById("adminUser").value.trim();
    const pass = document.getElementById("adminPass").value.trim();

    if ((user === "owner" || user === "admin") && pass === "admin123") {
        closeLoginModal();
        setAdminMode(true);
        sessionStorage.setItem("cctv_admin_logged", "true");
        openOwnerHub();
        showToast("🔓 વેલકમ! એડમિન ડેશબોર્ડ અનલોક થયું (Admin Mode Active)", "success");
    } else {
        showToast("❌ ખોટો યુઝરનેમ અથવા પાસવર્ડ! (Username: owner, Pass: admin123)", "info");
    }
}

function setAdminMode(active) {
    isAdminMode = active;
    const body = document.body;
    const quickBanner = document.getElementById("adminQuickBanner");
    const adminToggleBtn = document.getElementById("adminToggleBtn");

    if (active) {
        body.classList.add("admin-mode");
        if (quickBanner) quickBanner.classList.add("show");
        if (adminToggleBtn) {
            adminToggleBtn.classList.add("active");
            adminToggleBtn.innerHTML = "🟢 Owner Hub Active";
        }
    } else {
        body.classList.remove("admin-mode");
        sessionStorage.removeItem("cctv_admin_logged");
        if (quickBanner) quickBanner.classList.remove("show");
        if (adminToggleBtn) {
            adminToggleBtn.classList.remove("active");
            adminToggleBtn.innerHTML = "⚙️ Owner Hub";
        }
    }
}

function openOwnerHub(tab = "manage") {
    if (!isAdminMode) {
        openLoginModal();
        return;
    }
    switchAdminTab(tab);
    renderAdminProductsTable();
    renderAdminOrdersList();
    document.getElementById("ownerHubModal").classList.add("open");
}

function closeOwnerHub() {
    document.getElementById("ownerHubModal").classList.remove("open");
}

function switchAdminTab(tabName) {
    document.querySelectorAll(".admin-tab-btn").forEach(btn => btn.classList.remove("active"));
    document.querySelectorAll(".admin-tab-content").forEach(c => c.classList.remove("active"));

    const btn = document.getElementById(`tabBtn-${tabName}`);
    const content = document.getElementById(`tabContent-${tabName}`);
    if (btn) btn.classList.add("active");
    if (content) content.classList.add("active");

    if (tabName === "manage") renderAdminProductsTable();
    if (tabName === "orders") renderAdminOrdersList();
}

// Render Admin Products Table with Live Price Inputs
function renderAdminProductsTable() {
    const tbody = document.getElementById("adminProductsTbody");
    if (!tbody) return;

    if (products.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:20px;">No products available. Click "Add Product" to add one!</td></tr>`;
        return;
    }

    let html = "";
    products.forEach((p, index) => {
        const imgSrc = p.img || PRESET_CAMERA_IMAGES[p.fallbackPreset || "dome"];
        html += `
            <tr>
                <td style="width:30px; text-align:center;">${index + 1}</td>
                <td>
                    <div style="position:relative; display:inline-block; cursor:pointer;" onclick="openQuickPriceModal(${p.id})" title="Click to Change Photo / ફોટો બદલો">
                        <img src="${imgSrc}" class="table-img-thumb" alt="${p.name}">
                        <span style="position:absolute; bottom:1px; right:1px; background:rgba(15,23,42,0.85); color:white; font-size:10px; border-radius:3px; padding:1px 3px;">📷</span>
                    </div>
                </td>
                <td>
                    <b>${p.name}</b><br>
                    <span style="font-size:11px; color:#64748b;">${p.category.toUpperCase()} • ${p.resolution}</span>
                </td>
                <td>
                    <div style="display:flex; align-items:center; gap:4px;">
                        <span>₹</span>
                        <input type="number" class="inline-price-input" value="${p.price}" 
                               id="price-input-${p.id}"
                               onchange="updateInlinePrice(${p.id}, this)">
                    </div>
                </td>
                <td>
                    <span style="color:#64748b; font-size:12px;">₹${p.mrp || '-'}</span>
                </td>
                <td>
                    <span style="padding:3px 8px; border-radius:12px; font-size:11px; font-weight:bold; background:${p.inStock !== false ? '#dcfce7; color:#166534;' : '#fee2e2; color:#991b1b;'}">
                        ${p.inStock !== false ? 'In Stock' : 'Out of Stock'}
                    </span>
                </td>
                <td>
                    <div style="display:flex; gap:6px;">
                        <button class="btn-sm-accent" style="padding:4px 8px;" onclick="openQuickPriceModal(${p.id})" title="Full Edit">✏️</button>
                        <button class="btn-sm-light" style="padding:4px 8px; background:#fee2e2; color:#b91c1c; border-color:#fca5a5;" onclick="deleteProduct(${p.id})" title="Delete">🗑️</button>
                    </div>
                </td>
            </tr>
        `;
    });

    tbody.innerHTML = html;
}

// Render Admin Orders List
function renderAdminOrdersList() {
    const container = document.getElementById("adminOrdersList");
    if (!container) return;

    if (orders.length === 0) {
        container.innerHTML = `<div style="text-align:center; padding:30px; color:#64748b;">No customer orders placed yet. Orders will show here live when customers checkout.</div>`;
        return;
    }

    let html = "";
    orders.forEach((ord, i) => {
        const itemsList = (ord.items || []).map(it => `${it.name} (Qty: ${it.qty})`).join(", ");
        html += `
            <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:14px; margin-bottom:12px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                    <span style="font-weight:bold; color:#1e40af;">Order #${ord.orderId || (i+1)}</span>
                    <span style="font-size:12px; color:#64748b;">${ord.date}</span>
                </div>
                <div style="font-size:13px; margin-bottom:4px;">
                    <b>Customer:</b> ${ord.customerName} | <b>Phone:</b> <a href="tel:${ord.customerPhone}" style="color:#2563eb;">${ord.customerPhone}</a>
                </div>
                <div style="font-size:13px; margin-bottom:4px; color:#475569;">
                    <b>Address:</b> ${ord.address} | <b>Installation:</b> ${ord.installation}
                </div>
                <div style="font-size:12px; color:#334155; margin-bottom:6px; background:#fff; padding:6px; border-radius:4px;">
                    <b>Items:</b> ${itemsList}
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span style="font-weight:bold; font-size:15px; color:#0f172a;">Total: ₹${Number(ord.total).toLocaleString('en-IN')}</span>
                    <a href="https://wa.me/${ord.customerPhone}?text=Hello%20${encodeURIComponent(ord.customerName)}%2C%20regarding%20your%20CCTV%20order%20${ord.orderId}" target="_blank" class="btn-sm-accent" style="text-decoration:none; display:inline-flex; align-items:center; gap:4px;">
                        💬 Chat on WhatsApp
                    </a>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

// Save Shop & WhatsApp Settings
function handleSaveSettings(event) {
    if (event) event.preventDefault();

    const phone = document.getElementById("settingPhone").value.trim().replace(/[^0-9]/g, "");
    const name = document.getElementById("settingShopName").value.trim();
    const city = document.getElementById("settingCity").value.trim();
    const upi = document.getElementById("settingUpi").value.trim();

    if (phone) shopSettings.phone = phone;
    if (name) shopSettings.name = name;
    if (city) shopSettings.city = city;
    if (upi) shopSettings.upi = upi;

    saveSettings();
    showToast("✅ સેટિંગ્સ સફળતાપૂર્વક સાચવાઈ ગયા! (Settings Saved)", "success");
}

// -------------------------------------------------------------
// TOAST NOTIFICATION UTILITY
// -------------------------------------------------------------
function showToast(message, type = "info") {
    let container = document.getElementById("toastContainer");
    if (!container) {
        container = document.createElement("div");
        container.id = "toastContainer";
        container.className = "toast-container";
        document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerText = message;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transition = "opacity 0.3s ease";
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}
