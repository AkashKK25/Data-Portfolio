document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('skillsRadar');
    if (!ctx) return;
    
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    // Define chart colors based on current theme
    const backgroundColor = isDarkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(37, 99, 235, 0.2)';
    const borderColor = isDarkMode ? 'rgba(59, 130, 246, 1)' : 'rgba(37, 99, 235, 1)';
    const pointBackgroundColor = isDarkMode ? 'rgba(96, 165, 250, 1)' : 'rgba(59, 130, 246, 1)';
    const gridColor = isDarkMode ? 'rgba(203, 213, 225, 0.2)' : 'rgba(71, 85, 105, 0.2)';
    const labelColor = isDarkMode ? '#cbd5e1' : '#475569';
    
    // Chart data
    const data = {
        labels: [
            'Data Analysis',
            'Machine Learning',
            'Data Visualization',
            'Database',
            'Programming',
            'Statistics',
            'Cloud Computing',
            'Big Data'
        ],
        datasets: [{
            label: 'Skill Level',
            data: [95, 88, 85, 90, 80, 85, 78, 82],
            fill: true,
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            pointBackgroundColor: pointBackgroundColor,
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: borderColor
        }]
    };
    
    // Chart configuration
    const config = {
        type: 'radar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                    titleColor: isDarkMode ? '#f8fafc' : '#0f172a',
                    bodyColor: isDarkMode ? '#cbd5e1' : '#475569',
                    borderColor: isDarkMode ? '#334155' : '#e2e8f0',
                    borderWidth: 1,
                    padding: 10,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return `Skill Level: ${context.raw}/100`;
                        }
                    }
                }
            },
            scales: {
                r: {
                    min: 0,
                    max: 100,
                    beginAtZero: true,
                    backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.4)' : 'rgba(248, 250, 252, 0.4)',
                    grid: {
                        color: gridColor
                    },
                    ticks: {
                        stepSize: 20,
                        backdropColor: 'transparent',
                        color: labelColor
                    },
                    pointLabels: {
                        color: labelColor,
                        font: {
                            size: 12,
                            weight: 'bold'
                        }
                    },
                    angleLines: {
                        color: gridColor
                    }
                }
            }
        }
    };
    
    // Initialize chart and save reference for theme switching
    window.skillsRadarChart = new Chart(ctx, config);
    
    // Create animation on scroll
    const animateChart = function() {
        const chartElement = document.querySelector('.skills-radar');
        if (!chartElement) return;
        
        const chartPosition = chartElement.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (chartPosition < screenPosition) {
            // Animate chart data
            for (let i = 0; i < data.datasets[0].data.length; i++) {
                let value = data.datasets[0].data[i];
                let currentValue = 0;
                
                const interval = setInterval(function() {
                    currentValue += 2;
                    if (currentValue >= value) {
                        currentValue = value;
                        clearInterval(interval);
                    }
                    
                    window.skillsRadarChart.data.datasets[0].data[i] = currentValue;
                    window.skillsRadarChart.update();
                }, 20);
            }
            
            // Remove scroll event once animation is triggered
            window.removeEventListener('scroll', animateChart);
        }
    };
    
    // Add scroll event for chart animation
    window.addEventListener('scroll', animateChart);
    
    // Trigger animation if skills section is already in view on page load
    animateChart();
});