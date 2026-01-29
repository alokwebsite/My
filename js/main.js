// DOM Elements
const grid = document.getElementById('content-grid');
const downloadModal = document.getElementById('download-modal');
const socialTooltip = document.getElementById('social-tooltip');
const btnPlugins = document.getElementById('btn-plugins');
const btnMacros = document.getElementById('btn-macros');

// State
let currentTab = 'plugin'; // 'plugin' or 'macro'

/**
 * Initialize the App
 */
function init() {
    initLoader(); // Initialize Loading Screen

    // Set initial toggle state
    const controls = document.getElementById('toggle-controls');
    if (controls) controls.setAttribute('data-active', 'plugin');

    renderGrid();
    setupSocialHover();
    setupFooter();
}

/**
 * Initialize Loading Screen
 */
function initLoader() {
    const ring = document.getElementById('particle-ring');
    const particleCount = 24;

    // Create Particles
    for (let i = 0; i < particleCount; i++) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('particle-wrapper');

        const angle = (360 / particleCount) * i;
        wrapper.style.transform = `translate(-50%, -50%) rotate(${angle}deg) translate(60px)`;

        const particle = document.createElement('div');
        particle.classList.add('particle');
        // Stagger animations
        particle.style.animationDelay = `-${(i / particleCount) * 2}s`;

        wrapper.appendChild(particle);
        ring.appendChild(wrapper);
    }

    // Hide loader when page is fully loaded
    window.addEventListener('load', () => {
        const loader = document.getElementById('loader-wrapper');
        // Minimum display time of 1.5s for branding
        setTimeout(() => {
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 800);
        }, 1500);
    });
}

/**
 * Set Dynamic Footer Year
 */
function setupFooter() {
    const currentYear = new Date().getFullYear();
    const footerText = document.getElementById('copyright-text');
    if (footerText) {
        footerText.innerHTML = `2023 - ${currentYear} Alok Mahato (Alok Video Editor)`;
    }
}

/**
 * Switch between Plugin and Macro tabs
 */
/**
 * Switch between Plugin and Macro tabs
 */
window.switchTab = function (tab) {
    if (currentTab === tab) return;

    // Determine Animation Direction
    // If going to 'macro' (Right Tab), content moves left
    // If going to 'plugin' (Left Tab), content moves right
    const animationClass = (tab === 'macro') ? 'anim-slide-left' : 'anim-slide-right';

    currentTab = tab;

    // Update State Attribute for CSS Animation
    const controls = document.getElementById('toggle-controls');
    controls.setAttribute('data-active', tab);

    // Update Button Styles (Optional fallback, but CSS handles it now via data-active)
    if (tab === 'plugin') {
        btnPlugins.classList.add('active');
        btnMacros.classList.remove('active');
    } else {
        btnMacros.classList.add('active');
        btnPlugins.classList.remove('active');
    }

    // Replace Opacity Fade with Directional Animation
    // Reset classes first
    grid.className = 'content-grid';
    // Add new animation class
    grid.classList.add(animationClass);

    renderGrid();
}

/**
 * Render Cards based on current tab
 */
function renderGrid() {
    grid.innerHTML = '';

    const filteredData = projectData.filter(item => item.type === currentTab);

    if (filteredData.length === 0) {
        grid.innerHTML = `<p style="text-align:center; color:#aaa; col-span:3;">No ${currentTab}s found.</p>`;
        return;
    }

    // Create Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% visible
    });

    filteredData.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'card long-box'; // "long-box" class for new styling

        // Add Animation Classes
        // Alternating: Even index = Left, Odd index = Right
        if (index % 2 === 0) {
            card.classList.add('hidden-left');
        } else {
            card.classList.add('hidden-right');
        }

        card.innerHTML = `
            <div class="card-left">
                <div class="card-icon-placeholder">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                </div>
                <div>
                    <h3 class="card-title">${item.name}</h3>
                    <div class="card-type">${item.type}</div>
                </div>
            </div>
            
            <div class="card-mid">
                <p class="card-desc">${item.description}</p>
            </div>

            <div class="card-right">
                <button class="btn-download" onclick="startDownload('${item.file}', '${item.name}')">
                    <span>GET</span>
                    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                </button>
            </div>
        `;

        grid.appendChild(card);
        observer.observe(card); // Start watching
    });
}

// Audio Logic
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playClickSound() {
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.1);
}

/**
 * Handle Download Flow
 */
window.startDownload = function (filename, itemName) {
    playClickSound();

    // Show Modal
    downloadModal.classList.remove('hidden');
    // Force reflow for transition
    void downloadModal.offsetWidth;
    downloadModal.classList.add('visible');

    // Simulate Processing Time (2 seconds)
    setTimeout(() => {
        // Trigger Download
        const link = document.createElement('a');
        link.href = filename;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Hide Modal
        downloadModal.classList.remove('visible');
        setTimeout(() => {
            downloadModal.classList.add('hidden');
        }, 300);

    }, 2000);
}

/**
 * Social Media Hover Text
 */
/**
 * Social Media Hover Text - REMOVED
 */
function setupSocialHover() {
    // Logic removed per user request
}

// Start
document.addEventListener('DOMContentLoaded', init);
