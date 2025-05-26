/**
 * SVG Viewer Application
 * Manages a dynamic SVG grid viewer with theme switching and export functionality
 */

// DOM Elements
const elements = {
    pathData: document.getElementById('pathData'),
    svgContainer: document.getElementById('svgContainer'),
    gridContainer: document.getElementById('gridContainer'),
    coordinatesDisplay: document.getElementById('coordinatesDisplay'),
    errorMessage: document.getElementById('errorMessage'),
    gridCountInput: document.getElementById('gridCount'),
    sizeInfo: document.getElementById('sizeInfo'),
    themeToggle: document.getElementById('themeToggle'),
    downloadBtn: document.getElementById('downloadBtn'),
    downloadDialog: document.getElementById('downloadDialog'),
    overlay: document.getElementById('overlay'),
    copyBtn: document.getElementById('copyBtn'),
    downloadSvgBtn: document.getElementById('downloadSvgBtn'),
    closeDialog: document.getElementById('closeDialog')
};

// App State
const state = {
    gridCount: 10,
    isDarkTheme: localStorage.getItem('darkTheme') === 'true'
};

/**
 * Initialize the application
 */
function init() {
    // Set initial theme
    if (state.isDarkTheme) {
        document.body.classList.add('dark-theme');
    }

    // Set up event listeners
    setupEventListeners();

    // Initialize the grid
    updateGrid();
}

/**
 * Set up all event listeners
 */
function setupEventListeners() {
    // Input events
    elements.gridCountInput.addEventListener('input', updateGrid);
    elements.pathData.addEventListener('input', updateSvg);
    
    // Mouse events
    document.querySelector('.svg-preview').addEventListener('mousemove', updateCoordinates);
    
    // Button events
    elements.themeToggle.addEventListener('click', toggleTheme);
    elements.downloadBtn.addEventListener('click', openDownloadDialog);
    elements.closeDialog.addEventListener('click', closeDownloadDialog);
    elements.overlay.addEventListener('click', closeDownloadDialog);
    elements.copyBtn.addEventListener('click', copySvgToClipboard);
    elements.downloadSvgBtn.addEventListener('click', downloadSvg);
    
    // Window events
    window.addEventListener('resize', updateGrid);
}

/**
 * Update the grid based on current settings
 */
function updateGrid() {
    state.gridCount = parseInt(elements.gridCountInput.value) || 10;
    elements.sizeInfo.textContent = `${state.gridCount}x${state.gridCount} grid`;
    
    elements.gridContainer.style.setProperty('--grid-count', state.gridCount);
    updateSvg();
}

/**
 * Update the SVG preview
 */
function updateSvg() {
    try {
        elements.errorMessage.style.display = 'none';
        
        const pathCommands = elements.pathData.value.trim();
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");
        svg.setAttribute("viewBox", `0 0 ${state.gridCount} ${state.gridCount}`);
        svg.setAttribute("preserveAspectRatio", "none");
        
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", pathCommands);
        path.setAttribute("stroke", "blue");
        path.setAttribute("stroke-width", "0.1");
        path.setAttribute("fill", "rgba(255,0,0,0.3)");
        path.setAttribute("stroke-linecap", "round");
        path.setAttribute("stroke-linejoin", "round");
        
        svg.appendChild(path);
        elements.svgContainer.innerHTML = '';
        elements.svgContainer.appendChild(svg);
        
    } catch (e) {
        elements.errorMessage.textContent = `Error: ${e.message}`;
        elements.errorMessage.style.display = 'block';
    }
}

/**
 * Update coordinate display based on mouse position
 * @param {MouseEvent} e - Mouse event object
 */
function updateCoordinates(e) {
    const preview = document.querySelector('.svg-preview');
    const rect = preview.getBoundingClientRect();
    
    const x = ((e.clientX - rect.left) / rect.width * state.gridCount).toFixed(1);
    const y = ((e.clientY - rect.top) / rect.height * state.gridCount).toFixed(1);
    
    elements.coordinatesDisplay.textContent = `X: ${x}, Y: ${y}`;
}

/**
 * Toggle between dark and light theme
 */
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    state.isDarkTheme = document.body.classList.contains('dark-theme');
    localStorage.setItem('darkTheme', state.isDarkTheme);
}

/**
 * Open the download dialog
 */
function openDownloadDialog() {
    elements.downloadDialog.style.display = 'block';
    elements.overlay.style.display = 'block';
}

/**
 * Close the download dialog
 */
function closeDownloadDialog() {
    elements.downloadDialog.style.display = 'none';
    elements.overlay.style.display = 'none';
}

/**
 * Copy SVG to clipboard
 */
function copySvgToClipboard() {
    const pathCommands = elements.pathData.value.trim();
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${state.gridCount} ${state.gridCount}"><path d="${pathCommands}" stroke="blue" stroke-width="0.1" fill="rgba(255,0,0,0.3)" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    
    navigator.clipboard.writeText(svgContent)
        .then(() => {
            alert('SVG copied to clipboard!');
            closeDownloadDialog();
        })
        .catch(err => {
            console.error('Copy failed:', err);
            alert('Copy failed!');
        });
}

/**
 * Download SVG as a file
 */
function downloadSvg() {
    const pathCommands = elements.pathData.value.trim();
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${state.gridCount} ${state.gridCount}"><path d="${pathCommands}" stroke="blue" stroke-width="0.1" fill="rgba(255,0,0,0.3)" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'drawing.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    closeDownloadDialog();
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
