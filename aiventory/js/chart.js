// chart.js - Demand forecast chart
document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('demandChart');
    
    if (ctx) {
        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                datasets: [
                    {
                        label: 'Motorcycle Batteries',
                        data: [120, 110, 90, 75, 60, 45, null],
                        borderColor: '#2E3A8C',
                        backgroundColor: 'rgba(46, 58, 140, 0.1)',
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'AI-Predicted Demand',
                        data: [null, null, null, null, 45, 30, 15, 0],
                        borderColor: '#FF6B6B',
                        backgroundColor: 'rgba(255, 107, 107, 0.1)',
                        borderDash: [5, 5],
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'Threshold',
                        data: [50, 50, 50, 50, 50, 50, 50],
                        borderColor: '#06D6A0',
                        backgroundColor: 'transparent',
                        borderDash: [3, 3],
                        tension: 0,
                        fill: false
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
                        beginAtZero: true,
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