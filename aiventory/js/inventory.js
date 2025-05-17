// inventory.js - Inventory list functionality
document.addEventListener('DOMContentLoaded', function() {
    // Use shared data from the main script
    const inventoryItems = window.appData ? window.appData.inventoryItems : [
        { id: 1, name: 'Motorcycle Batteries', sku: 'BAT-YTX-001', currentStock: 45, threshold: 50, status: 'At Risk' },
        { id: 2, name: 'Engine Oil (10W-40)', sku: 'OIL-10W40-002', currentStock: 32, threshold: 30, status: 'Warning' },
        { id: 3, name: 'Drive Chains', sku: 'CHN-520-003', currentStock: 120, threshold: 50, status: 'Good' },
        { id: 4, name: 'Brake Pads', sku: 'BRK-PAD-004', currentStock: 15, threshold: 20, status: 'At Risk' },
        { id: 5, name: 'Motorcycle Spark Plugs', sku: 'SPK-NGK-005', currentStock: 65, threshold: 40, status: 'Good' }
    ];
    
    const inventoryTable = document.getElementById('inventoryTable');
    
    if (inventoryTable) {
        const tbody = inventoryTable.querySelector('tbody');
        
        // Clear existing rows
        tbody.innerHTML = '';
        
        inventoryItems.forEach(item => {
            const row = document.createElement('tr');
            
            // Set row class based on status
            if (item.status === 'At Risk') {
                row.classList.add('at-risk');
            } else if (item.status === 'Warning') {
                row.classList.add('warning');
            }
            
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.sku}</td>
                <td>${item.currentStock}</td>
                <td>${item.threshold}</td>
                <td><span class="status-badge ${item.status.toLowerCase().replace(' ', '-')}">${item.status}</span></td>
                <td>
                    <button class="btn btn-small btn-outline view-details" data-id="${item.id}">Details</button>
                </td>
            `;
            
            tbody.appendChild(row);
        });
        
        // Add event listeners to detail buttons
        document.querySelectorAll('.view-details').forEach(button => {
            button.addEventListener('click', function() {
                const itemId = this.getAttribute('data-id');
                // Navigate to the prediction page with the item ID
                window.location.href = `prediction.html?id=${itemId}`;
            });
        });
    }
});