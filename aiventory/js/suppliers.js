document.addEventListener('DOMContentLoaded', function() {
    const suppliersTable = document.getElementById('suppliersTable');
    const supplierModal = document.getElementById('supplierModal');
    const addSupplierBtn = document.getElementById('addSupplier');
    const closeModalBtn = document.querySelector('.close-modal');
    const cancelSupplierBtn = document.getElementById('cancelSupplier');
    const supplierForm = document.getElementById('supplierForm');
    
    // Sample supplier data
    const suppliers = [
        {
            id: 1,
            name: 'ElectroParts Inc.',
            contact: 'John Smith (john@electroparts.com)',
            category: 'electronics',
            leadTime: 3,
            rating: 4
        },
        {
            id: 2,
            name: 'OfficeWorld',
            contact: 'Sarah Johnson (sarah@officeworld.com)',
            category: 'office',
            leadTime: 2,
            rating: 5
        },
        {
            id: 3,
            name: 'FurniturePlus',
            contact: 'Mike Brown (mike@furnitureplus.com)',
            category: 'furniture',
            leadTime: 5,
            rating: 3
        }
    ];
    
    // Render suppliers table
    function renderSuppliers() {
        const tbody = suppliersTable.querySelector('tbody');
        tbody.innerHTML = '';
        
        suppliers.forEach(supplier => {
            const row = document.createElement('tr');
            
            // Generate star rating
            let stars = '';
            for (let i = 1; i <= 5; i++) {
                stars += i <= supplier.rating ? '★' : '☆';
            }
            
            row.innerHTML = `
                <td>${supplier.name}</td>
                <td>${supplier.contact}</td>
                <td>${supplier.category.charAt(0).toUpperCase() + supplier.category.slice(1)}</td>
                <td>${supplier.leadTime} days</td>
                <td class="supplier-rating">${stars}</td>
                <td>
                    <button class="btn btn-small btn-outline edit-supplier" data-id="${supplier.id}">Edit</button>
                    <button class="btn btn-small btn-danger delete-supplier" data-id="${supplier.id}">Delete</button>
                </td>
            `;
            
            tbody.appendChild(row);
        });
        
        // Add event listeners to buttons
        document.querySelectorAll('.edit-supplier').forEach(btn => {
            btn.addEventListener('click', function() {
                const supplierId = parseInt(this.getAttribute('data-id'));
                editSupplier(supplierId);
            });
        });
        
        document.querySelectorAll('.delete-supplier').forEach(btn => {
            btn.addEventListener('click', function() {
                const supplierId = parseInt(this.getAttribute('data-id'));
                deleteSupplier(supplierId);
            });
        });
    }
    
    // Edit supplier
    function editSupplier(id) {
        const supplier = suppliers.find(s => s.id === id);
        if (!supplier) return;
        
        document.getElementById('modalTitle').textContent = 'Edit Supplier';
        document.getElementById('supplierName').value = supplier.name;
        // Populate other fields...
        
        supplierModal.style.display = 'flex';
    }
    
    // Delete supplier
    function deleteSupplier(id) {
        if (confirm('Are you sure you want to delete this supplier?')) {
            const index = suppliers.findIndex(s => s.id === id);
            if (index !== -1) {
                suppliers.splice(index, 1);
                renderSuppliers();
            }
        }
    }
    
    // Add new supplier
    addSupplierBtn.addEventListener('click', function() {
        document.getElementById('modalTitle').textContent = 'Add New Supplier';
        supplierForm.reset();
        supplierModal.style.display = 'flex';
    });
    
    // Close modal
    function closeModal() {
        supplierModal.style.display = 'none';
    }
    
    closeModalBtn.addEventListener('click', closeModal);
    cancelSupplierBtn.addEventListener('click', closeModal);
    
    // Click outside modal to close
    window.addEventListener('click', function(event) {
        if (event.target === supplierModal) {
            closeModal();
        }
    });
    
    // Star rating functionality
    document.querySelectorAll('.star').forEach(star => {
        star.addEventListener('click', function() {
            const value = parseInt(this.getAttribute('data-value'));
            document.getElementById('supplierRating').value = value;
            
            // Highlight selected stars
            document.querySelectorAll('.star').forEach(s => {
                if (parseInt(s.getAttribute('data-value')) <= value) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });
    });
    
    // Form submission
    supplierForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('supplierName').value,
            // Get other form values...
            rating: parseInt(document.getElementById('supplierRating').value)
        };
        
        // In a real app, you would save to database
        alert('Supplier saved successfully!');
        closeModal();
        renderSuppliers();
    });
    
    // Initialize
    renderSuppliers();
});