// script.js - Main functionality
document.addEventListener('DOMContentLoaded', function() {
    // Login page role toggle
    const adminBtn = document.getElementById('admin-btn');
    const staffBtn = document.getElementById('staff-btn');
    
    if (adminBtn && staffBtn) {
        adminBtn.addEventListener('click', function() {
            this.classList.add('active');
            staffBtn.classList.remove('active');
        });
        
        staffBtn.addEventListener('click', function() {
            this.classList.add('active');
            adminBtn.classList.remove('active');
        });
    }
    
    // Form submission
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real app, you would authenticate here
            window.location.href = 'dashboard.html';
        });
    }
});

// Logout functionality
document.addEventListener('DOMContentLoaded', function() {
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Are you sure you want to log out?')) {
                // In a real app, you would:
                // 1. Clear session/token
                // 2. Redirect to login
                window.location.href = 'index.html';
            }
        });
    }
});

// General app script.js
document.addEventListener('DOMContentLoaded', function() {
    // Shared inventory data used across all pages
    window.appData = {
        inventoryItems: [
            { id: 1, name: 'AA Batteries', sku: 'BAT-AA-001', currentStock: 45, threshold: 50, status: 'At Risk', reorderDate: 'March 15, 2025' },
            { id: 2, name: 'LED Bulbs', sku: 'LED-60W-002', currentStock: 32, threshold: 30, status: 'Warning', reorderDate: 'April 2, 2025' },
            { id: 3, name: 'USB Cables', sku: 'CAB-USB-003', currentStock: 120, threshold: 50, status: 'Good', reorderDate: 'Feb 10, 2025' },
            { id: 4, name: 'Wireless Mouse', sku: 'MOU-WL-004', currentStock: 15, threshold: 20, status: 'At Risk', reorderDate: 'April 22, 2025' },
            { id: 5, name: 'HDMI Cables', sku: 'CAB-HDMI-005', currentStock: 65, threshold: 40, status: 'Good', reorderDate: 'Jan 30, 2025' }
        ],
        
        // Get item data by ID
        getItemById: function(id) {
            return this.inventoryItems.find(item => item.id === parseInt(id));
        },
        
        // Get item data by SKU
        getItemBySku: function(sku) {
            return this.inventoryItems.find(item => item.sku === sku);
        }
    };
    
    // Handle Analysis Page Sync
    if (document.querySelector('.analysis-summary')) {
        const urlParams = new URLSearchParams(window.location.search);
        const itemId = urlParams.get('id') || 1; // Default to first item if no ID
        const itemData = window.appData.getItemById(itemId);
        
        if (itemData) {
            // Update stock stats in analysis summary
            const statValues = document.querySelectorAll('.stat-value');
            if (statValues.length > 0) {
                statValues[0].textContent = itemData.currentStock;
            }
            
            // Update header
            const header = document.querySelector('.main-header h1');
            if (header) {
                header.textContent = `Detailed Analysis: ${itemData.name} (SKU: ${itemData.sku})`;
            }
        }
    }
    
    // Handle Prediction Page Sync
    if (document.querySelector('.item-details')) {
        const urlParams = new URLSearchParams(window.location.search);
        const itemId = urlParams.get('id') || 1; // Default to first item if no ID
        const itemData = window.appData.getItemById(itemId);
        
        if (itemData) {
            // Update item details
            const itemHeader = document.querySelector('.item-header h2');
            if (itemHeader) {
                itemHeader.textContent = `${itemData.name} (SKU: ${itemData.sku})`;
            }
            
            // Update meta values
            const metaValues = document.querySelectorAll('.meta-value');
            if (metaValues.length > 0) {
                metaValues[0].textContent = `${itemData.currentStock} units`;
                metaValues[1].textContent = `${itemData.threshold} units`;
                metaValues[2].textContent = itemData.reorderDate;
            }
        }
    }
});