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