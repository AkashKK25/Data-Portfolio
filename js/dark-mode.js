document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        body.classList.toggle('dark-mode', savedTheme === 'dark');
        darkModeToggle.checked = savedTheme === 'dark';
    } else {
        // Check if the system prefers dark mode
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        body.classList.toggle('dark-mode', prefersDarkMode);
        darkModeToggle.checked = prefersDarkMode;
    }
    
    // Dark mode toggle functionality
    darkModeToggle.addEventListener('change', function() {
        body.classList.toggle('dark-mode');
        
        // Save theme preference to localStorage
        const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
        
        // Update radar chart colors if it exists
        if (window.skillsRadarChart) {
            updateChartColors();
        }
    });
    
    function updateChartColors() {
        const isDarkMode = body.classList.contains('dark-mode');
        
        // Update chart colors based on current theme
        window.skillsRadarChart.data.datasets[0].backgroundColor = isDarkMode 
            ? 'rgba(59, 130, 246, 0.2)' 
            : 'rgba(37, 99, 235, 0.2)';
        
        window.skillsRadarChart.data.datasets[0].borderColor = isDarkMode 
            ? 'rgba(59, 130, 246, 1)' 
            : 'rgba(37, 99, 235, 1)';
        
        window.skillsRadarChart.data.datasets[0].pointBackgroundColor = isDarkMode 
            ? 'rgba(96, 165, 250, 1)' 
            : 'rgba(59, 130, 246, 1)';
        
        window.skillsRadarChart.options.scales.r.grid.color = isDarkMode 
            ? 'rgba(203, 213, 225, 0.2)' 
            : 'rgba(71, 85, 105, 0.2)';
        
        window.skillsRadarChart.options.scales.r.pointLabels.color = isDarkMode 
            ? '#cbd5e1' 
            : '#475569';
        
        // Update the chart
        window.skillsRadarChart.update();
    }
});