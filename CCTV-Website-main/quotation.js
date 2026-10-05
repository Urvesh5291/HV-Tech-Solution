/**
 * HV Tech Solutions - CCTV Quotation Calculator Engine
 * Handles IP Camera, HD Camera, WiFi Camera, and PTZ Camera quotation configurations,
 * automatic hardware calculation (NVR/DVR, PoE/SMPS, Cable @ 50/m, PVC Box = Cam Qty),
 * 18% GST calculation, print quotation, and WhatsApp integration.
 */

// Global State
const quoteState = {
    category: 'ip', // 'ip', 'hd', 'wifi', 'ptz'
    cameraQty: 4,
    selectedModelId: '',
    selectedStorageId: '',
    cableMeters: 80,
    includeInstall: true,
    customer: {
        name: '',
        phone: '',
        address: ''
    }
};

// Data Configuration Models
const QUOTE_DATA = {
    ip: {
        title: 'IP Network Camera Setup',
        badge: 'IP CAMERA SETUP',
        subtitle: 'PoE Switch, 4K NVR, Cat-6 કેબલ (₹50/m) અને ઓટોમેટિક PVC બોક્સ',
        presets: [4, 8, 16],
        cableRatePerMeter: 50,
        cableName: 'Cat-6 UTP High-Speed Pure Copper Network Cable',
        cableLabel: 'Cat-6 નેટવર્ક કેબલ (₹50 પ્રતિ મીટર):',
        cableHelp: '(IP કેમેરા માટે ઉચ્ચ ગુણવત્તાનો Cat-6 કેબલ - ₹50/મીટર)',
        defaultCableMeters: { 4: 80, 8: 160, 16: 300 },
        models: [
            { id: 'ip_2mp', name: '2MP Full HD IP Dome/Bullet Camera (30m Night Vision)', rate: 1750, spec: '1080p, H.265+, IP67 Waterproof, DWDR' },
            { id: 'ip_4mp', name: '4MP Ultra HD Smart IP Audio Camera (Built-in Mic)', rate: 2450, spec: '4MP 2K Resolution, Audio Mic, 30m Smart IR' },
            { id: 'ip_5mp', name: '5MP ColorVu All-Time Color Night Vision IP Camera', rate: 3200, spec: '5MP 3K, 24/7 Full Color with Warm LED, AI Human Detect' }
        ],
        storageOptions: [
            { id: 'hdd_1tb', name: '1TB Surveillance Hard Disk (WD Purple / Seagate Skyhawk)', rate: 3400, spec: '24/7 Continuous Recording (approx. 10-14 days for 4 cam)' },
            { id: 'hdd_2tb', name: '2TB Surveillance Hard Disk (WD Purple / Seagate Skyhawk)', rate: 4900, spec: '24/7 Continuous Recording (approx. 20-25 days for 4 cam)' },
            { id: 'hdd_4tb', name: '4TB Surveillance Hard Disk (WD Purple / Seagate Skyhawk)', rate: 7800, spec: '24/7 Continuous Recording (High Capacity)' },
            { id: 'hdd_6tb', name: '6TB Surveillance Enterprise Hard Disk', rate: 12500, spec: '24/7 Continuous Heavy-Duty Storage' }
        ],
        getHardware: function(qty) {
            let nvr, poe, rack;
            if (qty <= 4) {
                nvr = { name: '4 Channel 4K Ultra HD Network Video Recorder (NVR)', rate: 3800, qty: 1, spec: '4K HDMI Output, H.265+, 1 SATA HDD Bay' };
                poe = { name: '4+2 Port Fast Ethernet PoE Switch (4 PoE + 2 Uplink)', rate: 1950, qty: 1, spec: '60W Total Power, 250m Long Distance PoE' };
                rack = { name: '2U CCTV Wall Mount Metal Enclosure Rack with Glass Lock', rate: 950, qty: 1, spec: '2U Heavy Duty Powder Coated' };
            } else if (qty <= 8) {
                nvr = { name: '8 Channel 4K Ultra HD Network Video Recorder (NVR)', rate: 5600, qty: 1, spec: '8K/4K Support, H.265+, 1 SATA HDD Bay' };
                poe = { name: '8+2 Port Gigabit Uplink PoE Switch (8 PoE + 2 Gigabit Uplink)', rate: 3450, qty: 1, spec: '120W High Power PoE, Port Isolation' };
                rack = { name: '4U Wall Mount Network Server Rack with Glass Door', rate: 1650, qty: 1, spec: '4U Standard 19" Rack with Power Strip' };
            } else {
                nvr = { name: '16 Channel 4K Dual-SATA Network Video Recorder (NVR)', rate: 8900, qty: 1, spec: '16 Channels 4K, 2 SATA HDDs Support' };
                poe = { name: '16+2 Gigabit Managed PoE Switch with SFP', rate: 6800, qty: 1, spec: '250W PoE, 16 PoE Ports + 2 Gigabit Uplink' };
                rack = { name: '6U Wall Mount Server/NVR Rack with Cooling Fan & PDU', rate: 2450, qty: 1, spec: '6U Heavy Gauge Steel with 6-Socket PDU' };
            }
            return { nvr, switchOrSmps: poe, rack };
        },
        connectors: function(qty) {
            const count = (qty * 2) + 4; // 2 per camera + patch cords
            return { name: 'Cat-6 RJ45 Modular Connectors with Rubber Boot Caps', rate: 15, qty: count, spec: 'Gold-Plated Pins, Snagless Boot Caps' };
        },
        installRatePerCam: 400
    },

    hd: {
        title: 'HD Analog Camera Setup',
        badge: 'HD ANALOG SETUP',
        subtitle: 'HD DVR + SMPS પાવર સપ્લાય + 3+1 વાયર + BNC/DC અને ઓટોમેટિક PVC બોક્સ',
        presets: [4, 8, 16],
        cableRatePerMeter: 30,
        cableName: 'High-Grade 3+1 CCTV Solid Copper Shielded Coaxial Cable',
        cableLabel: '3+1 CCTV કો-એક્સિયલ કેબલ (₹30 પ્રતિ મીટર):',
        cableHelp: '(HD એનાલોગ કેમેરા માટે 3+1 કોપર કેબલ - ₹30/મીટર)',
        defaultCableMeters: { 4: 80, 8: 160, 16: 300 },
        models: [
            { id: 'hd_2mp', name: '2MP Full HD Night Vision Dome/Bullet Camera', rate: 1150, spec: '1080p Crystal Clear, 20m IR Night Vision, IP66' },
            { id: 'hd_3mp', name: '3MP ColorVu 24/7 Full Color HD Camera with Mic', rate: 1650, spec: '3MP 1296p, Built-in Mic Audio, Color Night Vision' },
            { id: 'hd_5mp', name: '5MP Ultra HD 3K Smart Hybrid Light Camera', rate: 2200, spec: '5MP High Resolution, Dual Smart Light, IP67 Metal' }
        ],
        storageOptions: [
            { id: 'hdd_1tb', name: '1TB Surveillance Hard Disk (WD Purple / Seagate Skyhawk)', rate: 3400, spec: '24/7 Continuous Recording (approx. 12-16 days for 4 cam)' },
            { id: 'hdd_2tb', name: '2TB Surveillance Hard Disk (WD Purple / Seagate Skyhawk)', rate: 4900, spec: '24/7 Continuous Recording (approx. 25-30 days for 4 cam)' },
            { id: 'hdd_4tb', name: '4TB Surveillance Hard Disk (WD Purple / Seagate Skyhawk)', rate: 7800, spec: '24/7 Continuous Recording (approx. 50+ days for 4 cam)' },
            { id: 'hdd_6tb', name: '6TB Surveillance Enterprise Hard Disk', rate: 12500, spec: 'Heavy-Duty Storage for Long Retention' }
        ],
        getHardware: function(qty) {
            let dvr, smps, rack;
            if (qty <= 4) {
                dvr = { name: '4 Channel 1080P HD Digital Video Recorder (DVR)', rate: 2600, qty: 1, spec: 'H.265 Pro+, HDMI/VGA Full HD Output, Mobile App View' };
                smps = { name: '4 Channel 12V 5A CCTV SMPS Power Supply', rate: 750, qty: 1, spec: 'Overload, Short Circuit & Surge Protection' };
                rack = { name: '2U CCTV Wall Mount Metal DVR Rack with Lock', rate: 950, qty: 1, spec: '2U Compact Metal Enclosure' };
            } else if (qty <= 8) {
                dvr = { name: '8 Channel 5MP Support HD Digital Video Recorder (DVR)', rate: 3800, qty: 1, spec: 'Up to 5MP Audio DVR, H.265+, Cloud Mobile View' };
                smps = { name: '8 Channel 12V 10A CCTV SMPS Power Supply', rate: 1350, qty: 1, spec: 'High Efficiency 120W Heavy Duty SMPS' };
                rack = { name: '4U Wall Mount DVR Server Rack with Glass Door', rate: 1650, qty: 1, spec: '4U Standard 19" Rack with Cable Pass' };
            } else {
                dvr = { name: '16 Channel 5MP Support HD Digital Video Recorder (DVR)', rate: 6200, qty: 1, spec: '16CH 5MP Multi-Input DVR, 2 SATA Support' };
                smps = { name: '16 Channel 12V 20A CCTV SMPS Power Supply', rate: 2200, qty: 1, spec: 'Individual Fuse Protected High Output SMPS' };
                rack = { name: '6U Wall Mount DVR Rack with Exhaust Fan & PDU', rate: 2450, qty: 1, spec: '6U Rack with 6-Socket Power Distribution' };
            }
            return { nvr: dvr, switchOrSmps: smps, rack };
        },
        connectors: function(qty) {
            const bncCount = qty * 2;
            const dcCount = qty;
            return {
                name: `Pure Copper Heavy Duty BNC (${bncCount} pcs) + DC Pin (${dcCount} pcs) Connectors Set`,
                rate: (bncCount * 25) + (dcCount * 20),
                qty: 1,
                spec: 'Gold-Plated Core, Screw-less / Heavy Grip Solid Pins'
            };
        },
        installRatePerCam: 350
    },

    wifi: {
        title: 'WiFi Smart Camera Setup',
        badge: 'WIFI SMART SETUP',
        subtitle: 'વાયરલેસ 360° PTZ, MicroSD મેમરી કાર્ડ અને 2-Way ઓડિયો કમ્યુનિકેશન',
        presets: [1, 2, 3, 4],
        cableRatePerMeter: 25,
        cableName: '2-Core DC Power Extension Copper Wire (2x0.75 sq.mm)',
        cableLabel: 'પાવર કેબલ / વાયરિંગ (₹25 પ્રતિ મીટર):',
        cableHelp: '(કેમેરા પાવર એડેપ્ટર સુધીના વાયરિંગ માટે)',
        defaultCableMeters: { 1: 10, 2: 20, 3: 30, 4: 40 },
        models: [
            { id: 'wifi_3mp', name: '3MP 360° Smart WiFi PTZ Indoor Camera', rate: 1850, spec: '360° Pan-Tilt, Two-Way Talk, Motion Auto-Tracking, 10m Night Vision' },
            { id: 'wifi_5mp_out', name: '5MP Outdoor Waterproof 360° PTZ WiFi Camera', rate: 2850, spec: 'IP66 Waterproof, Color Night Vision, Loud Siren Alarm, 30m IR' },
            { id: 'wifi_dual', name: '4MP Dual-Lens Outdoor WiFi PTZ (Dual Screen View)', rate: 3499, spec: 'Dual Lens (Fixed Wide + 360° PTZ), AI Human Detection, Two-Way Audio' },
            { id: 'wifi_4g_solar', name: '4G SIM Card + Solar Powered PTZ Camera (No Wi-Fi Needed)', rate: 5999, spec: 'Built-in 4G LTE SIM Slot, Solar Panel + Rechargeable Battery, 24/7 Standalone' }
        ],
        storageOptions: [
            { id: 'sd_64gb', name: '64GB High Endurance MicroSD Surveillance Card (7-10 Days)', rate: 650, spec: 'Class 10 U3 V30, 24/7 Loop Recording' },
            { id: 'sd_128gb', name: '128GB High Endurance MicroSD Surveillance Card (15-20 Days)', rate: 1150, spec: 'Class 10 U3 V30, 24/7 Continuous Loop Recording' },
            { id: 'sd_256gb', name: '256GB High Endurance MicroSD Surveillance Card (30-40 Days)', rate: 1950, spec: 'Class 10 U3 V30, Max Continuous Storage' },
            { id: 'sd_none', name: 'મેમરી કાર્ડ વગર (Without SD Card - Live View / Cloud)', rate: 0, spec: 'Only Live Remote Smartphone View & Cloud' }
        ],
        getHardware: function(qty) {
            return {
                powerAdapter: { name: '12V 2A Regulated Safe Power Adapter (Included)', rate: 0, qty: qty, spec: 'Tested Low Ripple Stable Adapter' },
                wallMount: { name: 'Adjustable Wall / Ceiling Mounting Bracket Kit', rate: 0, qty: qty, spec: 'Screws, Rawlplugs & Mounting Base' }
            };
        },
        connectors: function(qty) {
            return null; // WiFi cameras don't need BNC/RJ45
        },
        installRatePerCam: 350
    },

    ptz: {
        title: '360° Optical Zoom PTZ Camera Setup',
        badge: 'HIGH-SPEED PTZ SETUP',
        subtitle: 'ઓપ્ટિકલ ઝૂમ, 150m લેસર નાઇટ વિઝન, ઓટો-ટ્રેકિંગ અને હેવી-ડ્યુટી સેટઅપ',
        presets: [1, 2, 4],
        cableRatePerMeter: 50,
        cableName: 'Cat-6 Outdoor Double-Sheath Shielded SFTP Cable',
        cableLabel: 'Cat-6 Outdoor શિલ્ડેડ કેબલ (₹50 પ્રતિ મીટર):',
        cableHelp: '(PTZ કેમેરા માટે 100% કોપર હેવી શીલ્ડ કેબલ - ₹50/મીટર)',
        defaultCableMeters: { 1: 50, 2: 100, 4: 200 },
        models: [
            { id: 'ptz_2mp_18x', name: '2MP 18x Optical Zoom Network PTZ Camera (100m IR)', rate: 14500, spec: '1080p 60fps, 18x Optical Zoom, 100m Smart IR, IP66 Metal Dome' },
            { id: 'ptz_4mp_25x', name: '4MP 25x Optical Zoom AI Smart PTZ Camera (150m IR)', rate: 22500, spec: '4MP 2K, 25x Optical Zoom, Auto Human/Vehicle Tracking, 150m IR' },
            { id: 'ptz_5mp_32x', name: '5MP 32x Optical Zoom Heavy Duty Laser PTZ (200m IR)', rate: 34900, spec: '5MP 3K, 32x Optical Zoom, Starlight Night Vision, 200m Laser IR' }
        ],
        storageOptions: [
            { id: 'hdd_2tb', name: '2TB Surveillance Hard Disk (WD Purple / Seagate Skyhawk)', rate: 4900, spec: 'High-Res PTZ Recording (approx. 20-30 days)' },
            { id: 'hdd_4tb', name: '4TB Surveillance Hard Disk (WD Purple / Seagate Skyhawk)', rate: 7800, spec: 'High-Res PTZ Recording (approx. 45-60 days)' },
            { id: 'hdd_6tb', name: '6TB Surveillance Enterprise Hard Disk', rate: 12500, spec: 'Extended High-Capacity Surveillance' }
        ],
        getHardware: function(qty) {
            let nvr = { name: `${qty <= 2 ? '4' : '8'} Channel 4K Ultra HD Professional PTZ NVR`, rate: qty <= 2 ? 4500 : 6500, qty: 1, spec: 'PTZ Preset & Tour Control Supported, 4K HDMI' };
            let poe = { name: 'Gigabit 30W-60W High-Power PoE+ Injector / Switch', rate: 2800, qty: qty, spec: 'IEEE 802.3at/bt High Power Supply for PTZ Motors & IR' };
            let bracket = { name: 'Heavy Duty Metal PTZ Wall / Pole Mount Bracket', rate: 950, qty: qty, spec: 'Anti-Vibration Aluminum Cast Bracket' };
            let rack = { name: '4U Wall Mount Professional Rack with Power PDU', rate: 1650, qty: 1, spec: 'Lockable Enclosure with Fan & Surge Filter' };
            return { nvr, switchOrSmps: poe, rack, bracket };
        },
        connectors: function(qty) {
            return { name: 'Cat-6 Shielded RJ45 Metal Connectors + Boot Caps', rate: 30, qty: qty * 4, spec: 'Grounding Shroud Metal RJ45' };
        },
        installRatePerCam: 900
    }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    // Generate initial quotation number and date
    generateQuoteMeta();

    // Default setup
    initCategory('ip');

    // Bind outside click for WA popup
    document.addEventListener('click', (e) => {
        const popup = document.getElementById('waPopupMenu');
        const btn = document.getElementById('floatingWaBtn');
        if (popup && btn && !popup.contains(e.target) && !btn.contains(e.target)) {
            popup.classList.remove('open', 'show');
        }
    });
});

/**
 * Generate unique Quotation Reference Number and current Date
 */
function generateQuoteMeta() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    const dateElem = document.getElementById('quoteDate');
    if (dateElem) {
        dateElem.innerText = `${dd}/${mm}/${yyyy}`;
    }

    const numElem = document.getElementById('quoteNumber');
    if (numElem) {
        const randomCode = Math.floor(1000 + Math.random() * 9000);
        numElem.innerText = `HV-QT-${yyyy}${mm}-${randomCode}`;
    }
}

/**
 * Switch quotation category: 'ip', 'hd', 'wifi', 'ptz'
 */
function switchQuoteCategory(catKey) {
    if (!QUOTE_DATA[catKey]) return;

    quoteState.category = catKey;

    // Update active tab styling
    document.querySelectorAll('.quote-category-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById(`catBtn-${catKey}`);
    if (activeBtn) activeBtn.classList.add('active');

    initCategory(catKey);
}

/**
 * Populate controls based on chosen category
 */
function initCategory(catKey) {
    const cfg = QUOTE_DATA[catKey];

    // Set default camera qty to first preset
    quoteState.cameraQty = cfg.presets[0];

    // Update Header Badges & Subtitles
    const badge = document.getElementById('categoryBadge');
    if (badge) badge.innerText = cfg.badge;

    const titleElem = document.getElementById('configPanelTitle');
    if (titleElem) titleElem.innerText = `⚙️ ${cfg.title}`;

    const subtitleElem = document.getElementById('configPanelSubtitle');
    if (subtitleElem) subtitleElem.innerText = cfg.subtitle;

    // Render Preset Chips
    renderPresetChips(cfg.presets);

    // Populate Models Dropdown
    const modelSelect = document.getElementById('cfgModel');
    if (modelSelect) {
        modelSelect.innerHTML = cfg.models.map((m, idx) => 
            `<option value="${m.id}" ${idx === 0 ? 'selected' : ''}>${m.name} - ₹${m.rate.toLocaleString('en-IN')} / cam</option>`
        ).join('');
        quoteState.selectedModelId = cfg.models[0].id;
    }

    // Populate Storage Dropdown
    const storageLabel = document.getElementById('cfgStorageLabel');
    if (storageLabel) {
        storageLabel.innerText = catKey === 'wifi' ? 'MicroSD મેમરી કાર્ડ ક્ષમતા (Memory Card):' : 'રેકોર્ડિંગ સ્ટોરેજ (Surveillance Hard Disk):';
    }

    const storageSelect = document.getElementById('cfgStorage');
    if (storageSelect) {
        storageSelect.innerHTML = cfg.storageOptions.map((s, idx) => 
            `<option value="${s.id}" ${idx === 0 ? 'selected' : ''}>${s.name} ${s.rate > 0 ? `(+₹${s.rate.toLocaleString('en-IN')})` : ''}</option>`
        ).join('');
        quoteState.selectedStorageId = cfg.storageOptions[0].id;
    }

    // Update Cable Labels & Defaults
    const cableLabel = document.getElementById('cfgCableLabel');
    if (cableLabel) cableLabel.innerText = cfg.cableLabel;

    const cableHelp = document.getElementById('cableHelpText');
    if (cableHelp) cableHelp.innerText = cfg.cableHelp;

    const cableInput = document.getElementById('cfgCableMeters');
    const defaultMeters = cfg.defaultCableMeters[quoteState.cameraQty] || 80;
    if (cableInput) {
        cableInput.value = defaultMeters;
        quoteState.cableMeters = defaultMeters;
    }

    // Recalculate
    recalculateQuote();
}

/**
 * Render Preset Qty Chips
 */
function renderPresetChips(presets) {
    const container = document.getElementById('presetChipsContainer');
    if (!container) return;

    container.innerHTML = presets.map((qty, idx) => `
        <button type="button" 
                class="preset-chip ${qty === quoteState.cameraQty ? 'active' : ''}" 
                onclick="selectPresetQty(${qty})">
            📸 ${qty} કેમેરા સેટઅપ (${qty} Cameras)
        </button>
    `).join('');
}

/**
 * Select a Preset Camera Quantity
 */
function selectPresetQty(qty) {
    quoteState.cameraQty = qty;

    // Highlight chip
    const chips = document.querySelectorAll('.preset-chip');
    chips.forEach(chip => {
        if (chip.innerText.includes(`${qty} કેમેરા`)) {
            chip.classList.add('active');
        } else {
            chip.classList.remove('active');
        }
    });

    // Update suggested cable meters
    const cfg = QUOTE_DATA[quoteState.category];
    const cableInput = document.getElementById('cfgCableMeters');
    if (cableInput && cfg.defaultCableMeters[qty]) {
        cableInput.value = cfg.defaultCableMeters[qty];
        quoteState.cableMeters = cfg.defaultCableMeters[qty];
    }

    // Auto-adjust default HDD for larger setups
    const storageSelect = document.getElementById('cfgStorage');
    if (storageSelect && (quoteState.category === 'ip' || quoteState.category === 'hd')) {
        if (qty === 8 && storageSelect.querySelector('option[value="hdd_2tb"]')) {
            storageSelect.value = 'hdd_2tb';
            quoteState.selectedStorageId = 'hdd_2tb';
        } else if (qty === 16 && storageSelect.querySelector('option[value="hdd_4tb"]')) {
            storageSelect.value = 'hdd_4tb';
            quoteState.selectedStorageId = 'hdd_4tb';
        } else if (qty === 4 && storageSelect.querySelector('option[value="hdd_1tb"]')) {
            storageSelect.value = 'hdd_1tb';
            quoteState.selectedStorageId = 'hdd_1tb';
        }
    }

    recalculateQuote();
}

/**
 * Recalculate and Render Itemized Quotation Table with 18% GST
 */
function recalculateQuote() {
    const cat = quoteState.category;
    const cfg = QUOTE_DATA[cat];
    const qty = parseInt(quoteState.cameraQty, 10) || 1;

    // Read form values
    const modelSelect = document.getElementById('cfgModel');
    if (modelSelect) quoteState.selectedModelId = modelSelect.value;

    const storageSelect = document.getElementById('cfgStorage');
    if (storageSelect) quoteState.selectedStorageId = storageSelect.value;

    const cableInput = document.getElementById('cfgCableMeters');
    const cableMeters = cableInput ? (parseFloat(cableInput.value) || 0) : 0;
    quoteState.cableMeters = cableMeters;

    const installCheck = document.getElementById('cfgInstallCheck');
    quoteState.includeInstall = installCheck ? installCheck.checked : true;

    // Update cable cost preview in left column
    const cableCost = cableMeters * cfg.cableRatePerMeter;
    const cableCostPreview = document.getElementById('cableCostPreview');
    if (cableCostPreview) {
        cableCostPreview.innerText = `₹${cableCost.toLocaleString('en-IN')}`;
    }

    // Selected camera model
    const selectedModel = cfg.models.find(m => m.id === quoteState.selectedModelId) || cfg.models[0];
    // Selected storage
    const selectedStorage = cfg.storageOptions.find(s => s.id === quoteState.selectedStorageId) || cfg.storageOptions[0];

    // Hardware bundle
    const hardware = cfg.getHardware(qty);

    // Build Items List
    const items = [];
    let itemIndex = 1;

    // 1. Cameras
    items.push({
        num: itemIndex++,
        name: selectedModel.name,
        spec: selectedModel.spec,
        qty: qty,
        unit: 'Pcs',
        rate: selectedModel.rate,
        total: selectedModel.rate * qty
    });

    // 2. NVR / DVR / Gateway
    if (hardware.nvr) {
        items.push({
            num: itemIndex++,
            name: hardware.nvr.name,
            spec: hardware.nvr.spec,
            qty: hardware.nvr.qty,
            unit: 'Unit',
            rate: hardware.nvr.rate,
            total: hardware.nvr.rate * hardware.nvr.qty
        });
    }

    // 3. PoE Switch / SMPS Power Supply
    if (hardware.switchOrSmps) {
        items.push({
            num: itemIndex++,
            name: hardware.switchOrSmps.name,
            spec: hardware.switchOrSmps.spec,
            qty: hardware.switchOrSmps.qty,
            unit: 'Unit',
            rate: hardware.switchOrSmps.rate,
            total: hardware.switchOrSmps.rate * hardware.switchOrSmps.qty
        });
    }

    // 4. Hard Disk / MicroSD Card (per camera or bundle)
    if (selectedStorage && selectedStorage.rate > 0) {
        if (cat === 'wifi') {
            // For wifi cameras, SD card can be per camera!
            items.push({
                num: itemIndex++,
                name: selectedStorage.name,
                spec: selectedStorage.spec,
                qty: qty,
                unit: 'Pcs',
                rate: selectedStorage.rate,
                total: selectedStorage.rate * qty
            });
        } else {
            // 1 HDD for NVR/DVR
            items.push({
                num: itemIndex++,
                name: selectedStorage.name,
                spec: selectedStorage.spec,
                qty: 1,
                unit: 'Unit',
                rate: selectedStorage.rate,
                total: selectedStorage.rate
            });
        }
    }

    // 5. CCTV Rack (if applicable)
    if (hardware.rack) {
        items.push({
            num: itemIndex++,
            name: hardware.rack.name,
            spec: hardware.rack.spec,
            qty: hardware.rack.qty,
            unit: 'Unit',
            rate: hardware.rack.rate,
            total: hardware.rack.rate * hardware.rack.qty
        });
    }

    // 6. PTZ Bracket (if applicable)
    if (hardware.bracket) {
        items.push({
            num: itemIndex++,
            name: hardware.bracket.name,
            spec: hardware.bracket.spec,
            qty: hardware.bracket.qty,
            unit: 'Pcs',
            rate: hardware.bracket.rate,
            total: hardware.bracket.rate * hardware.bracket.qty
        });
    }

    // 7. Cabling (Cat-6 @ 50/m or 3+1 @ 30/m)
    if (cableMeters > 0) {
        items.push({
            num: itemIndex++,
            name: cfg.cableName,
            spec: `${cableMeters} Mtr @ ₹${cfg.cableRatePerMeter}/Meter`,
            qty: cableMeters,
            unit: 'Mtr',
            rate: cfg.cableRatePerMeter,
            total: cableCost
        });
    }

    // 8. PVC Gang Boxes - AUTOMATICALLY MATCHES CAMERA QUANTITY!
    // As per explicit requirement: "pvc box jetla camera hoy a pramane automatic aavi java joi"
    const pvcBoxRate = cat === 'ptz' ? 150 : 80;
    const pvcBoxDesc = cat === 'ptz' 
        ? 'Heavy Duty Waterproof Junction Box for PTZ'
        : 'CCTV Weatherproof PVC Camera Base Box 4x4 (ઓટોમેટિક કેમેરા મુજબ)';
    items.push({
        num: itemIndex++,
        name: pvcBoxDesc,
        spec: `Flame retardant PVC gang box (${qty} કેમેરા માટે ${qty} બોક્સ)`,
        qty: qty,
        unit: 'Pcs',
        rate: pvcBoxRate,
        total: pvcBoxRate * qty
    });

    // 9. Connectors (RJ45 or BNC/DC)
    const connectors = cfg.connectors(qty);
    if (connectors) {
        items.push({
            num: itemIndex++,
            name: connectors.name,
            spec: connectors.spec,
            qty: connectors.qty,
            unit: 'Pcs',
            rate: connectors.rate,
            total: connectors.rate * connectors.qty
        });
    }

    // 10. Installation, Testing & Mobile App Setup (Optional)
    if (quoteState.includeInstall) {
        const installTotal = cfg.installRatePerCam * qty;
        items.push({
            num: itemIndex++,
            name: 'Complete Professional Installation & Mobile Configuration',
            spec: `All cameras mounting, wiring, NVR/DVR setup & Live Phone App Configuration (@ ₹${cfg.installRatePerCam}/cam)`,
            qty: qty,
            unit: 'Job',
            rate: cfg.installRatePerCam,
            total: installTotal
        });
    }

    // Render Auto-Included Hardware List on the left card
    renderAutoHardwareList(items);

    // Render Table Rows
    const tbody = document.getElementById('quoteItemsTbody');
    if (tbody) {
        tbody.innerHTML = items.map(item => `
            <tr>
                <td style="text-align:center; font-weight:600; color:#64748b;">${item.num}</td>
                <td>
                    <div style="font-weight:700; color:#0f172a;">${item.name}</div>
                    <small style="color:#64748b; font-size:11.5px; display:block; margin-top:2px;">${item.spec}</small>
                </td>
                <td style="text-align:center; font-weight:700; white-space:nowrap;">${item.qty} ${item.unit}</td>
                <td style="text-align:right; white-space:nowrap;">₹${item.rate.toLocaleString('en-IN')}</td>
                <td style="text-align:right; font-weight:700; color:#0f172a; white-space:nowrap;">₹${item.total.toLocaleString('en-IN')}</td>
            </tr>
        `).join('');
    }

    // Calculate Subtotal, 18% GST and Grand Total
    const taxableSubtotal = items.reduce((sum, it) => sum + it.total, 0);
    const gst18 = Math.round(taxableSubtotal * 0.18);
    const grandTotal = taxableSubtotal + gst18;

    // Update Elements
    const subtotalElem = document.getElementById('quoteSubtotal');
    if (subtotalElem) subtotalElem.innerText = `₹${taxableSubtotal.toLocaleString('en-IN')}`;

    const gstElem = document.getElementById('quoteGst');
    if (gstElem) gstElem.innerText = `₹${gst18.toLocaleString('en-IN')}`;

    const grandTotalElem = document.getElementById('quoteGrandTotal');
    if (grandTotalElem) grandTotalElem.innerText = `₹${grandTotal.toLocaleString('en-IN')}`;

    const wordsElem = document.getElementById('quoteAmountInWords');
    if (wordsElem) wordsElem.innerText = numberToIndianWords(grandTotal);

    // Save items to quoteState for WhatsApp generation
    quoteState.calculatedItems = items;
    quoteState.taxableSubtotal = taxableSubtotal;
    quoteState.gst18 = gst18;
    quoteState.grandTotal = grandTotal;
}

/**
 * Render Auto-Hardware List summary on the left configurator
 */
function renderAutoHardwareList(items) {
    const listElem = document.getElementById('autoHardwareList');
    if (!listElem) return;

    // Filter non-camera items for the highlight box
    const accessories = items.filter(it => it.num > 1);
    listElem.innerHTML = accessories.map(acc => `
        <li style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px dashed #e2e8f0; padding-bottom:3px;">
            <span>✓ ${acc.name} <b>(${acc.qty} ${acc.unit})</b></span>
            <span style="font-weight:700; color:#0f766e;">₹${acc.total.toLocaleString('en-IN')}</span>
        </li>
    `).join('');
}

/**
 * Live updates customer name/phone in the printable quotation ribbon
 */
function updateCustomerPreview() {
    const nameInput = document.getElementById('quoteCustName');
    const phoneInput = document.getElementById('quoteCustPhone');
    const addrInput = document.getElementById('quoteCustAddress');

    const name = nameInput ? nameInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';
    const addr = addrInput ? addrInput.value.trim() : '';

    quoteState.customer.name = name;
    quoteState.customer.phone = phone;
    quoteState.customer.address = addr;

    const pName = document.getElementById('previewCustName');
    if (pName) pName.innerText = name || 'Valued Customer';

    const pPhone = document.getElementById('previewCustPhone');
    if (pPhone) pPhone.innerText = phone || '-';

    const pAddr = document.getElementById('previewCustAddress');
    if (pAddr) pAddr.innerText = addr || 'Ahmedabad, Gujarat';
}

/**
 * Print Quotation / Save as PDF
 */
function printQuotation() {
    window.print();
}

/**
 * Send Quotation via WhatsApp to Urvesh or Harsh
 */
function sendQuoteWhatsApp(phone = '9173565466') {
    const custName = quoteState.customer.name || 'Valued Customer';
    const custPhone = quoteState.customer.phone || 'Not Provided';
    const custAddr = quoteState.customer.address || 'Ahmedabad';

    const catName = QUOTE_DATA[quoteState.category].title;
    const dateStr = document.getElementById('quoteDate')?.innerText || '';
    const quoteNo = document.getElementById('quoteNumber')?.innerText || '';

    let itemsText = '';
    if (quoteState.calculatedItems && quoteState.calculatedItems.length > 0) {
        itemsText = quoteState.calculatedItems.map((it, i) => 
            `${i + 1}. *${it.name}* (${it.qty} ${it.unit}) - ₹${it.total.toLocaleString('en-IN')}`
        ).join('\n');
    }

    const message = 
`📄 *CCTV QUOTATION - HV TECH SOLUTIONS*
━━━━━━━━━━━━━━━━━━━
🔖 *Quotation No:* ${quoteNo}
📅 *Date:* ${dateStr}
👤 *Customer:* ${custName}
📞 *Phone:* ${custPhone}
📍 *Location:* ${custAddr}

🎥 *Camera Package:* ${catName} (${quoteState.cameraQty} Cameras)

📦 *Itemized Equipment List:*
${itemsText}

━━━━━━━━━━━━━━━━━━━
💰 *Taxable Subtotal:* ₹${(quoteState.taxableSubtotal || 0).toLocaleString('en-IN')}
🧾 *18% GST (CGST 9% + SGST 9%):* ₹${(quoteState.gst18 || 0).toLocaleString('en-IN')}
⭐ *GRAND TOTAL:* ₹${(quoteState.grandTotal || 0).toLocaleString('en-IN')}
📝 *Amount:* ${numberToIndianWords(quoteState.grandTotal || 0)}
━━━━━━━━━━━━━━━━━━━
✅ *Warranty:* 2 Years Replacement Warranty
🛠️ *Support:* Free App & 1 Year Onsite Service

📞 *HV Tech Solutions:*
• Patel Urvesh: +91 91735 65466
• Patel Harsh: +91 72038 75276
📍 Ahmedabad, Gujarat`;

    const encodedMsg = encodeURIComponent(message);
    const targetUrl = `https://wa.me/91${phone}?text=${encodedMsg}`;
    window.open(targetUrl, '_blank');
}

/**
 * Toggle Floating WhatsApp Popup Menu
 */
function toggleWaPopup(event) {
    if (event) {
        event.stopPropagation();
    }
    const menu = document.getElementById('waPopupMenu');
    if (menu) {
        menu.classList.toggle('open');
        menu.classList.toggle('show');
    }
}

/**
 * Convert Number to Indian Rupees Words
 */
function numberToIndianWords(num) {
    if (!num || isNaN(num) || num === 0) return 'INR Zero Rupees Only';

    const a = [
        '', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ',
        'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ',
        'Seventeen ', 'Eighteen ', 'Nineteen '
    ];
    const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    function inWords(n) {
        if (n < 20) return a[n];
        let digit = n % 10;
        return b[Math.floor(n / 10)] + (digit ? ' ' + a[digit] : '');
    }

    let n = Math.floor(num);
    let str = '';

    const crore = Math.floor(n / 10000000);
    n %= 10000000;

    const lakh = Math.floor(n / 100000);
    n %= 100000;

    const thousand = Math.floor(n / 1000);
    n %= 1000;

    const hundred = Math.floor(n / 100);
    n %= 100;

    if (crore > 0) str += inWords(crore) + 'Crore ';
    if (lakh > 0) str += inWords(lakh) + 'Lakh ';
    if (thousand > 0) str += inWords(thousand) + 'Thousand ';
    if (hundred > 0) str += inWords(hundred) + 'Hundred ';
    if (n > 0) {
        if (str !== '') str += 'and ';
        str += inWords(n);
    }

    return 'INR ' + str.trim() + ' Rupees Only';
}
