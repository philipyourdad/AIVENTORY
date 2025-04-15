// chart.js - Demand forecast chart
document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('demandChart');
    
    if (ctx) {
        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    {
                        label: 'Historical Stock',
                        data: [1200, 1150, 1250, 1300, 1400, 1350, 1450, 1500, 1400, 1300, 1250, 1200],
                        borderColor: '#2E3A8C',
                        backgroundColor: 'rgba(46, 58, 140, 0.1)',
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'AI-Predicted Demand',
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
                    legend: {
                        display: false
                    },
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
                            text: 'Stock Level'
                        }
                    }
                }
            }
        });
    }
});