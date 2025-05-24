// inventory.js - Inventory list functionality
document.addEventListener('DOMContentLoaded', function() {
    // Use shared data from the main script
    const inventoryItems = window.appData ? window.appData.inventoryItems : [
        { id: 1, name: 'Motorcycle Batteries', sku: 'BAT-YTX-001', currentStock: 45, threshold: 50, status: 'At Risk', price: 89.99 },
        { id: 2, name: 'Engine Oil (10W-40)', sku: 'OIL-10W40-002', currentStock: 32, threshold: 30, status: 'Warning', price: 12.99 },
        { id: 3, name: 'Drive Chains', sku: 'CHN-520-003', currentStock: 120, threshold: 50, status: 'Good', price: 45.99 },
        { id: 4, name: 'Brake Pads', sku: 'BRK-PAD-004', currentStock: 15, threshold: 20, status: 'At Risk', price: 29.99 },
        { id: 5, name: 'Motorcycle Spark Plugs', sku: 'SPK-NGK-005', currentStock: 65, threshold: 40, status: 'Good', price: 8.99 }
    ];
    
    const inventoryTable = document.getElementById('inventoryTable');
    const addItemForm = document.getElementById('addItemForm');
    const addItemSuccess = document.getElementById('addItemSuccess');

    // Handle stock out transaction
    function handleStockOut(item, quantity) {
        // Update stock
        item.currentStock -= quantity;
        
        // Create transaction object
        const transaction = {
            customer: 'Walk-in Customer',
            items: [{
                name: item.name,
                quantity: quantity,
                price: item.price
            }],
            subtotal: item.price * quantity,
            tax: (item.price * quantity) * 0.1, // 10% tax
            total: (item.price * quantity) * 1.1,
            paymentMethod: 'Cash'
        };

        // Generate and show invoice
        if (window.invoiceManager) {
            window.invoiceManager.handleTransactionComplete(transaction);
        }

        // Update UI
        updateInventoryTable();
    }

    // Update inventory table
    function updateInventoryTable() {
        const tbody = inventoryTable.querySelector('tbody');
        tbody.innerHTML = '';
        
        inventoryItems.forEach(item => {
            const row = document.createElement('tr');
            let badgeClass = 'status-good';
            if (item.status === 'Warning') badgeClass = 'status-warning';
            if (item.status === 'At Risk') badgeClass = 'status-risk';
            
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.sku}</td>
                <td>${item.category || ''}</td>
                <td>${item.currentStock}</td>
                <td>${item.threshold}</td>
                <td><span class="status-badge ${badgeClass}">${item.status}</span></td>
                <td>
                    <button class="action-btn stock-out" title="Stock Out" data-id="${item.id}">
                        <span class="material-icons">remove_shopping_cart</span>
                    </button>
                    <button class="action-btn" title="Edit">
                        <span class="material-icons">edit</span>
                    </button>
                    <button class="action-btn delete" title="Delete">
                        <span class="material-icons">delete</span>
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });

        // Add event listeners for stock out buttons
        document.querySelectorAll('.stock-out').forEach(btn => {
            btn.addEventListener('click', function() {
                const itemId = parseInt(this.getAttribute('data-id'));
                const item = inventoryItems.find(i => i.id === itemId);
                if (item) {
                    const quantity = prompt(`Enter quantity to remove from ${item.name}:`, '1');
                    if (quantity && !isNaN(quantity) && quantity > 0) {
                        handleStockOut(item, parseInt(quantity));
                    }
                }
            });
        });
    }

    // Initialize table
    updateInventoryTable();

    // Add item form submission
    if (addItemForm) {
        addItemForm.onsubmit = function(e) {
            e.preventDefault();
            // Simple validation
            let valid = true;
            Array.from(addItemForm.elements).forEach(el => {
                if ((el.tagName === 'INPUT' || el.tagName === 'SELECT') && el.type !== 'submit' && el.type !== 'button') {
                    if (!el.value || (el.type === 'number' && el.value < 0)) {
                        el.classList.add('invalid');
                        valid = false;
                    } else {
                        el.classList.remove('invalid');
                    }
                }
            });
            if (!valid) return;

            // Add new item
            const newItem = {
                id: inventoryItems.length + 1,
                name: document.getElementById('itemName').value,
                sku: document.getElementById('itemSKU').value,
                category: document.getElementById('itemCategory').value,
                currentStock: parseInt(document.getElementById('itemStock').value),
                threshold: parseInt(document.getElementById('itemThreshold').value),
                status: document.getElementById('itemStatus').value,
                price: parseFloat(document.getElementById('itemPrice').value) || 0
            };

            inventoryItems.push(newItem);
            updateInventoryTable();

            // Show success message
            if (addItemSuccess) {
                addItemSuccess.style.display = 'block';
                setTimeout(() => {
                    addItemSuccess.style.display = 'none';
                }, 3000);
            }

            // Reset form
            addItemForm.reset();
        };
    }
}); 