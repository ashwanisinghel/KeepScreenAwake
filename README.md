# Keep Screen Awake App

A simple Chrome-based application that prevents your screen from going to sleep using the Screen Wake Lock API.

## Features

- ✅ Uses Chrome's native Screen Wake Lock API
- 🔋 Prevents screen from sleeping while active
- ⏰ Shows current time
- 🎨 Clean, modern interface
- 🔄 Auto-restarts when tab becomes visible again
- 🌐 Language independent (works on any Windows system)

## Files

- `keep-awake.html` - The main web application
- `start-keep-awake.ps1` - PowerShell script to launch the app
- `start-keep-awake.bat` - Batch file for easy launching

## How to Use

### Method 1: Double-click the batch file
1. Double-click `start-keep-awake.bat`
2. The app will open in Chrome automatically

### Method 2: Run PowerShell script directly
```powershell
.\start-keep-awake.ps1
```

### Method 3: Open HTML file manually
1. Open Chrome
2. Drag and drop `keep-awake.html` into Chrome
3. Click "Start Keep Awake" button

## Command Line Options

The PowerShell script supports several options:

```powershell
# Start in fullscreen mode
.\start-keep-awake.ps1 -Fullscreen

# Start in kiosk mode (full immersion)
.\start-keep-awake.ps1 -Kiosk

# Specify custom Chrome path
.\start-keep-awake.ps1 -ChromePath "C:\Custom\Path\chrome.exe"
```

## Requirements

- Windows with PowerShell (built into Windows 10/11)
- Google Chrome browser
- Chrome version 84+ (for Screen Wake Lock API support)

## How It Works

1. The app uses Chrome's Screen Wake Lock API to prevent the screen from sleeping
2. The wake lock is automatically requested when the page loads
3. If the tab becomes hidden and then visible again, the wake lock is re-requested
4. The screen stays awake as long as the Chrome window is open and the tab is active

## Troubleshooting

**Chrome not found:**
- Install Google Chrome from https://chrome.google.com
- Or specify the Chrome path: `.\start-keep-awake.ps1 -ChromePath "path\to\chrome.exe"`

**Wake Lock not working:**
- Ensure you're using Chrome 84 or newer
- Keep the Chrome window visible (not minimized)
- Make sure the tab is active

**PowerShell execution policy error:**
- The batch file automatically bypasses execution policy
- Or run: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`

## Notes

- The app must remain visible in Chrome to work effectively
- Minimizing the Chrome window may cause the wake lock to be released
- The wake lock is automatically released when you close the Chrome window
- This is a client-side solution that doesn't require any server or installation