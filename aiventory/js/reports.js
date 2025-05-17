document.addEventListener('DOMContentLoaded', function() {
    // Time period filter toggle
    const timePeriodSelect = document.getElementById('timePeriod');
    const customDateRange = document.getElementById('customDateRange');
    
    // Get inventory data from central store if available
    const inventoryItems = window.appData ? window.appData.inventoryItems : [
        { id: 1, name: 'Motorcycle Batteries', sku: 'BAT-YTX-001', currentStock: 45, threshold: 50, status: 'At Risk' },
        { id: 2, name: 'Engine Oil (10W-40)', sku: 'OIL-10W40-002', currentStock: 32, threshold: 30, status: 'Warning' },
        { id: 3, name: 'Drive Chains', sku: 'CHN-520-003', currentStock: 120, threshold: 50, status: 'Good' },
        { id: 4, name: 'Brake Pads', sku: 'BRK-PAD-004', currentStock: 15, threshold: 20, status: 'At Risk' },
        { id: 5, name: 'Motorcycle Spark Plugs', sku: 'SPK-NGK-005', currentStock: 65, threshold: 40, status: 'Good' }
    ];
    
    // Calculate totals
    const totalItems = inventoryItems.length;
    const atRiskItems = inventoryItems.filter(item => item.status === 'At Risk').length;
    const warningItems = inventoryItems.filter(item => item.status === 'Warning').length;
    const healthyItems = inventoryItems.filter(item => item.status === 'Good').length;
    
    // Update summary stats
    const summaryStats = document.querySelectorAll('.stat-value');
    if (summaryStats.length >= 3) {
        summaryStats[0].textContent = totalItems;
        summaryStats[1].textContent = warningItems;
        summaryStats[2].textContent = atRiskItems;
    }
    
    timePeriodSelect.addEventListener('change', function() {
        customDateRange.style.display = this.value === 'custom' ? 'block' : 'none';
    });

    // Initialize charts
    const turnoverCtx = document.getElementById('turnoverChart');
    const stockoutCtx = document.getElementById('stockoutChart');
    const demandCtx = document.getElementById('demandChart');

    // Inventory Turnover Chart - based on our motorcycle parts
    const turnoverChart = new Chart(turnoverCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            datasets: [{
                label: 'Inventory Turnover Ratio',
                data: [2.5, 2.7, 3.0, 3.2, 3.5],
                backgroundColor: '#2E3A8C',
                borderColor: '#2E3A8C',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Turnover Ratio'
                    }
                }
            }
        }
    });

    // Stockout Predictions Chart - reflect actual inventory status
    const stockoutChart = new Chart(stockoutCtx, {
        type: 'doughnut',
        data: {
            labels: ['Critical Items', 'Warning Items', 'Healthy Items'],
            datasets: [{
                data: [atRiskItems, warningItems, healthyItems],
                backgroundColor: [
                    '#FF6B6B', // Red for critical
                    '#FFD166', // Yellow for warning
                    '#06D6A0'  // Green for healthy
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.raw;
                            const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${context.label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });

    // Monthly Demand Forecast Chart - motorcycle parts tailored
    const demandChart = new Chart(demandCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label: 'Motorcycle Batteries',
                    data: [42, 40, 45, 55, 65, 75, 80, 75, 65, 55, 45, 40],
                    borderColor: '#FF6B6B',
                    backgroundColor: 'rgba(255, 107, 107, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Engine Oil',
                    data: [80, 75, 85, 90, 100, 110, 115, 120, 110, 100, 90, 85],
                    borderColor: '#2E3A8C', 
                    backgroundColor: 'rgba(46, 58, 140, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Brake Pads',
                    data: [25, 22, 24, 28, 32, 35, 38, 36, 34, 30, 28, 26],
                    borderColor: '#06D6A0',
                    backgroundColor: 'rgba(6, 214, 160, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'AI Forecast (Next Quarter)',
                    data: [null, null, null, null, null, null, null, null, null, 68, 72, 78],
                    borderColor: '#00B4D8',
                    backgroundColor: 'rgba(0, 180, 216, 0.1)',
                    borderDash: [5, 5],
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Units'
                    }
                }
            }
        }
    });

    // Apply Filters Button
    document.getElementById('applyFilters').addEventListener('click', function() {
        const reportType = document.getElementById('reportType').value;
        const timePeriod = document.getElementById('timePeriod').value;
        
        // In a real app, you would fetch new data based on filters
        alert(`Loading ${reportType} report for ${timePeriod}...`);
        
        // Update charts with filtered data
        updateCharts(reportType, timePeriod);
    });

    function updateCharts(reportType, timePeriod) {
        // This would be replaced with actual API calls in a real app
        console.log(`Updating charts for ${reportType} and ${timePeriod}`);
        
        // Example of how you might update charts
        if (reportType === 'inventory') {
            // Show different time periods based on selection
            if (timePeriod === '7days') {
                turnoverChart.data.labels = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
                turnoverChart.data.datasets[0].data = [3.1, 3.2, 3.0, 3.3, 3.4, 3.5, 3.6];
            } else if (timePeriod === '30days') {
                turnoverChart.data.labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
                turnoverChart.data.datasets[0].data = [3.0, 3.2, 3.4, 3.5];
            } else {
                turnoverChart.data.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
                turnoverChart.data.datasets[0].data = [2.5, 2.7, 3.0, 3.2, 3.5];
            }
            turnoverChart.update();
            
            // Update demand forecast based on time period
            updateDemandChart(timePeriod);
        }
    }
    
    function updateDemandChart(timePeriod) {
        // Different data for different time periods
        if (timePeriod === '7days') {
            demandChart.data.labels = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
            demandChart.data.datasets[0].data = [8, 7, 9, 10, 12, 9, 7];
            demandChart.data.datasets[1].data = [15, 14, 16, 18, 20, 17, 15];
            demandChart.data.datasets[2].data = [5, 4, 6, 7, 8, 6, 5];
        } else {
            // Default to monthly view
            demandChart.data.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            demandChart.data.datasets[0].data = [42, 40, 45, 55, 65, 75, 80, 75, 65, 55, 45, 40];
            demandChart.data.datasets[1].data = [80, 75, 85, 90, 100, 110, 115, 120, 110, 100, 90, 85];
            demandChart.data.datasets[2].data = [25, 22, 24, 28, 32, 35, 38, 36, 34, 30, 28, 26];
        }
        demandChart.update();
    }

    // Generate PDF Report
    document.getElementById('generateReport').addEventListener('click', function() {
        // In a real app, you would generate a PDF report
        alert('Generating PDF report...');
        
        // This would typically call a backend service to generate the PDF
        // For frontend-only solution, you could use libraries like jsPDF
    });

    // Export Data
    document.getElementById('exportData').addEventListener('click', function() {
        const reportType = document.getElementById('reportType').value;
        
        // In a real app, you would export data as CSV/Excel
        alert(`Exporting ${reportType} data as CSV...`);
        
        // Example CSV generation
        const csvContent = "data:text/csv;charset=utf-8,";
        let csvRows = [];
        
        switch(reportType) {
            case 'inventory':
                csvRows.push("Product,Current Stock,Threshold,Status");
                inventoryItems.forEach(item => {
                    csvRows.push(`${item.name},${item.currentStock},${item.threshold},${item.status}`);
                });
                break;
            case 'sales':
                csvRows.push("Month,Motorcycle Batteries,Engine Oil,Brake Pads");
                csvRows.push("Jan,42,80,25");
                csvRows.push("Feb,40,75,22");
                csvRows.push("Mar,45,85,24");
                // Add more data...
                break;
        }
        
        const encodedUri = encodeURI(csvContent + csvRows.join("\n"));
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `${reportType}_report.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});