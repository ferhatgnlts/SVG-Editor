# Dynamic Grid SVG Viewer

A responsive web application for viewing and editing SVG paths on a dynamic grid system with theme support and export functionality.

## Features

- 🎨 **Interactive SVG Preview**: Real-time rendering of SVG path commands
- 📐 **Adjustable Grid System**: Customize grid density from 5x5 to 50x50
- 🌓 **Theme Support**: Toggle between light and dark themes
- 📱 **Responsive Design**: Optimized for both desktop and mobile devices
- 📋 **Copy/Paste SVG**: Copy SVG code to clipboard with one click
- 💾 **Export SVG**: Download SVG files directly
- 🖱️ **Coordinate Tracking**: Real-time mouse position coordinates in grid units

## File Structure

```
svg-viewer/
│── index.html          # Main application HTML
│── styles/
│   ├── main.css        # Base styles for all devices
│   ├── desktop.css     # Desktop-specific styles (≥1024px)
│   └── themes.css      # Theme-related styles
└── scripts/
    └── main.js         # Core application logic
```

## Installation & Usage

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/svg-viewer.git
   cd svg-viewer
   ```

2. **Open in browser**:
   - Simply open `index.html` in any modern browser
   - No server or dependencies required

3. **Basic Usage**:
   - Enter SVG path commands in the editor
   - Adjust grid size using the number input
   - Toggle theme using the theme button
   - Export SVG using the download button

## Customization

### Themes
Edit `styles/themes.css` to customize:
- Color schemes
- Dark/light mode transitions
- Element-specific theme styles

### Grid System
Modify these aspects in `styles/main.css`:
- Grid line color and thickness
- Preview area sizing
- Responsive breakpoints

### Desktop Layout
Adjust desktop-specific styles in `styles/desktop.css`:
- Sidebar width and positioning
- Button arrangement
- Editor panel sizing

## Browser Support

| Browser | Support |
|---------|---------|
| Chrome  | ✅ Latest |
| Firefox | ✅ Latest |
| Safari  | ✅ Latest |
| Edge    | ✅ Latest |
| IE      | ❌ Not supported |

## Dependencies

This project uses pure HTML, CSS, and JavaScript with no external dependencies.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

## 📜 License
[Ferhat Gönültaş]
MIT LICENSE - see [LICENSE](LICENSE) file for details