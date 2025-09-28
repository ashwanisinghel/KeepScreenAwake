# Global Time Dashboard

A comprehensive time management toolkit with world clocks and various time-related utilities.

## Project Structure

```
├── index.html                 # Main HTML file
├── keep-awake.html           # Original monolithic file (for reference)
├── README.md                 # This file
├── css/                      # Stylesheets
│   ├── variables.css         # CSS custom properties and themes
│   ├── base.css             # Base styles and layout
│   ├── components.css       # Shared component styles
│   ├── dashboard.css        # World clock dashboard styles
│   ├── responsive.css       # Responsive design rules
│   └── tools/               # Tool-specific styles
│       ├── stopwatch.css    # Stopwatch tool styles
│       ├── timer.css        # Timer tool styles
│       ├── timezone.css     # Timezone calculator styles
│       ├── duration.css     # Duration calculator styles
│       ├── epoch.css        # Epoch converter styles
│       └── working-hours.css # Working hours calculator styles
└── js/                      # JavaScript modules
    ├── core/                # Core functionality
    │   ├── theme.js         # Theme management
    │   ├── wake-lock.js     # Screen wake lock
    │   └── world-clock.js   # World clock functionality
    └── tools/               # Time tools
        ├── stopwatch.js     # Stopwatch functionality
        ├── timer.js         # Timer functionality
        ├── timezone-calculator.js # Timezone conversion
        ├── duration-calculator.js # Duration calculation
        ├── epoch-converter.js     # Epoch time conversion
        └── working-hours.js       # Working hours overlap
```

## Features

### World Clock Dashboard
- Real-time clocks for 6 major time zones
- Color-coded timezone indicators
- Responsive grid layout

### Time Tools

1. **⏱️ Stopwatch**
   - Millisecond precision timing
   - Lap time recording
   - Start/stop/reset controls

2. **⏰ Timer**
   - Customizable countdown timer
   - Visual progress bar
   - Audio notification on completion

3. **🌍 Time Zone Calculator**
   - Convert times between time zones
   - Real-time calculation
   - Shows time difference

4. **📅 Duration Calculator**
   - Calculate time between two dates
   - Breakdown by days, hours, minutes
   - Total duration display

5. **🔢 Epoch Time Converter**
   - Convert between epoch timestamps and human-readable dates
   - Supports both seconds and milliseconds
   - Multiple output formats

6. **💼 Working Hours Calculator**
   - Find overlapping work hours across time zones
   - Suggests best meeting times
   - Perfect for remote teams

### Additional Features
- Dark/light theme toggle
- Screen wake lock (keeps screen active)
- Fully responsive design
- Smooth animations and transitions

## Usage

1. Open `index.html` in a web browser
2. The world clocks will start automatically
3. Use the various tools as needed
4. Toggle between light and dark themes using the moon/sun icon

## Development

The modular structure makes it easy to:
- Add new time tools
- Modify existing functionality
- Maintain and debug code
- Customize styling

Each tool is self-contained with its own CSS and JavaScript files, making the codebase highly maintainable.

## Live Demo

🌐 **[View Live App](https://yourusername.github.io/time-tools-dashboard)**

## Deployment

This app is deployed using GitHub Pages and automatically updates when changes are pushed to the main branch.

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/time-tools-dashboard.git
cd time-tools-dashboard
```

2. Open `index.html` in your browser or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```

3. Navigate to `http://localhost:8000`

## Browser Compatibility

- Modern browsers with ES6+ support
- Wake Lock API requires HTTPS in production
- All time zone calculations use native JavaScript Date API

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

Crafted with love, dedicated to you. ❤️