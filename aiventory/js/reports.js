document.addEventListener('DOMContentLoaded', function() {
    // Time period filter toggle
    const timePeriodSelect = document.getElementById('timePeriod');
    const customDateRange = document.getElementById('customDateRange');
    
    timePeriodSelect.addEventListener('change', function() {
        customDateRange.style.display = this.value === 'custom' ? 'block' : 'none';
    });

    // Initialize charts
    const turnoverCtx = document.getElementById('turnoverChart');
    const stockoutCtx = document.getElementById('stockoutChart');
    const demandCtx = document.getElementById('demandChart');

    // Inventory Turnover Chart
    const turnoverChart = new Chart(turnoverCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Inventory Turnover Ratio',
                data: [2.1, 2.3, 2.5, 2.8, 3.1, 3.0, 2.9, 3.2, 3.5, 3.3, 3.0, 3.2],
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

    // Stockout Predictions Chart
    const stockoutChart = new Chart(stockoutCtx, {
        type: 'doughnut',
        data: {
            labels: ['Critical Items', 'Warning Items', 'Healthy Items'],
            datasets: [{
                data: [8, 15, 77],
                backgroundColor: [
                    '#FF6B6B',
                    '#FFD166',
                    '#06D6A0'
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
                }
            }
        }
    });

    // Monthly Demand Forecast Chart
    const demandChart = new Chart(demandCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label: 'Historical Demand',
                    data: [1200, 1150, 1250, 1300, 1400, 1350, 1450, 1500, 1400, 1300, 1250, 1200],
                    borderColor: '#2E3A8C',
                    backgroundColor: 'rgba(46, 58, 140, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'AI Forecast',
                    data: [null, null, null, null, null, null, null, null, 1400, 1350, 1300, 1400, 1500, 1600],
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
            turnoverChart.data.datasets[0].data = [2.5, 2.7, 2.9, 3.1, 3.3, 3.2];
            turnoverChart.update();
        }
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
                csvRows.push("Month,Turnover Ratio");
                csvRows.push("Jan,2.1");
                csvRows.push("Feb,2.3");
                // Add more data...
                break;
            case 'sales':
                // Different data structure
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