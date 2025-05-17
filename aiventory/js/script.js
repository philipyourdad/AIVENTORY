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
    
    // Create account form role toggle
    const newAdminBtn = document.getElementById('new-admin-btn');
    const newStaffBtn = document.getElementById('new-staff-btn');
    
    if (newAdminBtn && newStaffBtn) {
        newAdminBtn.addEventListener('click', function() {
            this.classList.add('active');
            newStaffBtn.classList.remove('active');
        });
        
        newStaffBtn.addEventListener('click', function() {
            this.classList.add('active');
            newAdminBtn.classList.remove('active');
        });
    }
    
    // Toggle between login and create account forms
    const createAccountLink = document.getElementById('createAccountLink');
    const backToLoginLink = document.getElementById('backToLoginLink');
    const loginForm = document.getElementById('loginForm');
    const createAccountForm = document.getElementById('createAccountForm');
    
    if (createAccountLink && backToLoginLink) {
        createAccountLink.addEventListener('click', function(e) {
            e.preventDefault();
            loginForm.style.display = 'none';
            createAccountForm.style.display = 'block';
        });
        
        backToLoginLink.addEventListener('click', function(e) {
            e.preventDefault();
            createAccountForm.style.display = 'none';
            loginForm.style.display = 'block';
        });
    }
    
    // Form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real app, you would authenticate here
            window.location.href = 'dashboard.html';
        });
    }
    
    if (createAccountForm) {
        createAccountForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real app, you would validate and create the account
            alert('Account created successfully! Please log in.');
            createAccountForm.style.display = 'none';
            loginForm.style.display = 'block';
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
            { id: 1, name: 'Motorcycle Batteries', sku: 'BAT-YTX-001', currentStock: 45, threshold: 50, status: 'At Risk', reorderDate: 'March 15, 2025' },
            { id: 2, name: 'Engine Oil (10W-40)', sku: 'OIL-10W40-002', currentStock: 32, threshold: 30, status: 'Warning', reorderDate: 'April 2, 2025' },
            { id: 3, name: 'Drive Chains', sku: 'CHN-520-003', currentStock: 120, threshold: 50, status: 'Good', reorderDate: 'Feb 10, 2025' },
            { id: 4, name: 'Brake Pads', sku: 'BRK-PAD-004', currentStock: 15, threshold: 20, status: 'At Risk', reorderDate: 'April 22, 2025' },
            { id: 5, name: 'Motorcycle Spark Plugs', sku: 'SPK-NGK-005', currentStock: 65, threshold: 40, status: 'Good', reorderDate: 'Jan 30, 2025' }
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

// AIVENTORY global data
const inventoryData = {
    items: [
        { 
            id: 1, 
            name: 'Motorcycle Batteries', 
            sku: 'BAT-YTX-001', 
            stock: 45, 
            threshold: 50, 
            status: 'At Risk', 
            location: 'Aisle B, Shelf 3',
            supplier: 'MotoMax Performance',
            predicted_out_days: 7
        },
        { 
            id: 2, 
            name: 'Engine Oil (10W-40)', 
            sku: 'OIL-10W40-002', 
            stock: 32, 
            threshold: 30, 
            status: 'Warning', 
            location: 'Aisle C, Shelf 1',
            supplier: 'SpeedZone Parts',
            expected_delivery: 'May 22, 2025'
        },
        { 
            id: 3, 
            name: 'Drive Chains', 
            sku: 'CHN-520-003', 
            stock: 120, 
            threshold: 50, 
            status: 'Good', 
            location: 'Aisle A, Shelf 2',
            supplier: 'Speed Demons Garage'
        },
        { 
            id: 4, 
            name: 'Brake Pads', 
            sku: 'BRK-PAD-004', 
            stock: 15, 
            threshold: 20, 
            status: 'At Risk', 
            location: 'Aisle D, Shelf 4',
            supplier: 'WheelWorld Supplies',
            critical: true
        },
        { 
            id: 5, 
            name: 'Motorcycle Spark Plugs', 
            sku: 'SPK-NGK-005', 
            stock: 65, 
            threshold: 40, 
            status: 'Good', 
            location: 'Aisle B, Shelf 1',
            supplier: 'MotoMax Performance'
        }
    ],
    
    suppliers: [
        { id: 1, name: 'MotoMax Performance', leadTime: '3-5 days', reliability: 'High' },
        { id: 2, name: 'SpeedZone Parts', leadTime: '5-7 days', reliability: 'Medium' },
        { id: 3, name: 'Speed Demons Garage', leadTime: '2-3 days', reliability: 'High' },
        { id: 4, name: 'WheelWorld Supplies', leadTime: '4-6 days', reliability: 'Medium' }
    ],
    
    // Dashboard analytics
    analytics: {
        totalItems: 5,
        lowStock: 1,
        criticalItems: 2,
        totalSuppliers: 4
    }
};

// Initialize event listeners and other functionality
document.addEventListener('DOMContentLoaded', function() {
    // Could add functionality like:
    // - Click handlers for alerts
    // - Dynamic data loading
    // - User interaction events
    
    // Example: Make alert action buttons functional
    const actionButtons = document.querySelectorAll('.alert-actions .btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            // In a real application, this would execute the appropriate action
            if (button.textContent.trim() === 'Reorder Now') {
                console.log('Reorder initiated');
                alert('Reorder initiated. Creating purchase order...');
            } else if (button.textContent.trim() === 'View Details') {
                console.log('Viewing item details');
                // Navigate to item details page
            }
        });
    });
});