// invoice.js - Invoice generation and display functionality
document.addEventListener('DOMContentLoaded', function() {
    // Invoice data structure
    const invoices = [];
    let currentInvoiceId = 1;

    // Generate a new invoice
    function generateInvoice(transaction) {
        const invoice = {
            id: `INV-${String(currentInvoiceId).padStart(4, '0')}`,
            date: new Date().toLocaleDateString(),
            customer: transaction.customer || 'Walk-in Customer',
            items: transaction.items,
            subtotal: transaction.subtotal,
            tax: transaction.tax || 0,
            total: transaction.total,
            status: 'Paid',
            paymentMethod: transaction.paymentMethod || 'Cash'
        };

        invoices.push(invoice);
        currentInvoiceId++;
        return invoice;
    }

    // Show invoice modal
    function showInvoiceModal(invoice) {
        const modal = document.createElement('div');
        modal.className = 'invoice-modal';
        modal.innerHTML = `
            <div class="invoice-content">
                <div class="invoice-header">
                    <h2>Invoice</h2>
                    <div class="invoice-details">
                        <div class="invoice-id">${invoice.id}</div>
                        <div class="invoice-date">${invoice.date}</div>
                    </div>
                </div>
                
                <div class="invoice-body">
                    <div class="customer-info">
                        <h3>Customer</h3>
                        <p>${invoice.customer}</p>
                    </div>
                    
                    <table class="invoice-items">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${invoice.items.map(item => `
                                <tr>
                                    <td>${item.name}</td>
                                    <td>${item.quantity}</td>
                                    <td>$${item.price.toFixed(2)}</td>
                                    <td>$${(item.quantity * item.price).toFixed(2)}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    
                    <div class="invoice-summary">
                        <div class="summary-row">
                            <span>Subtotal:</span>
                            <span>$${invoice.subtotal.toFixed(2)}</span>
                        </div>
                        <div class="summary-row">
                            <span>Tax:</span>
                            <span>$${invoice.tax.toFixed(2)}</span>
                        </div>
                        <div class="summary-row total">
                            <span>Total:</span>
                            <span>$${invoice.total.toFixed(2)}</span>
                        </div>
                    </div>
                    
                    <div class="payment-info">
                        <p>Payment Method: ${invoice.paymentMethod}</p>
                        <p>Status: <span class="status-badge good">${invoice.status}</span></p>
                    </div>
                </div>
                
                <div class="invoice-footer">
                    <button class="btn btn-primary" onclick="window.print()">
                        <span class="material-icons">print</span>
                        Print Invoice
                    </button>
                    <button class="btn btn-secondary" onclick="this.closest('.invoice-modal').remove()">
                        Close
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    // Update invoice history table
    function updateInvoiceHistory() {
        const invoiceTable = document.querySelector('.invoice-history-table tbody');
        if (!invoiceTable) return;

        invoiceTable.innerHTML = '';
        invoices.forEach(invoice => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${invoice.id}</td>
                <td>${invoice.date}</td>
                <td>${invoice.customer}</td>
                <td>${invoice.items.reduce((sum, item) => sum + item.quantity, 0)}</td>
                <td>$${invoice.total.toFixed(2)}</td>
                <td><span class="status-badge good">${invoice.status}</span></td>
                <td>
                    <button class="view-invoice-btn" data-id="${invoice.id}">
                        <span class="material-icons">visibility</span>
                        View
                    </button>
                </td>
            `;
            invoiceTable.appendChild(row);
        });

        // Add event listeners to view buttons
        document.querySelectorAll('.view-invoice-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const invoiceId = this.getAttribute('data-id');
                const invoice = invoices.find(inv => inv.id === invoiceId);
                if (invoice) {
                    showInvoiceModal(invoice);
                }
            });
        });
    }

    // Handle transaction completion
    function handleTransactionComplete(transaction) {
        const invoice = generateInvoice(transaction);
        showInvoiceModal(invoice);
        updateInvoiceHistory();
    }

    // Export functions
    window.invoiceManager = {
        handleTransactionComplete,
        generateInvoice,
        showInvoiceModal,
        updateInvoiceHistory,
        getInvoices: () => invoices
    };

    // Initialize invoice history if the table exists
    updateInvoiceHistory();
}); 