# Keep Screen Awake using Chrome
# This PowerShell script opens Chrome with the keep-awake HTML page

param(
    [switch]$Fullscreen,
    [switch]$Kiosk,
    [string]$ChromePath = ""
)

# Function to find Chrome installation
function Find-Chrome {
    $possiblePaths = @(
        "${env:ProgramFiles}\Google\Chrome\Application\chrome.exe",
        "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe",
        "${env:LOCALAPPDATA}\Google\Chrome\Application\chrome.exe",
        "${env:USERPROFILE}\AppData\Local\Google\Chrome\Application\chrome.exe"
    )
    
    foreach ($path in $possiblePaths) {
        if (Test-Path $path) {
            return $path
        }
    }
    
    # Try to find chrome in PATH
    try {
        $chromeInPath = Get-Command chrome -ErrorAction Stop
        return $chromeInPath.Source
    } catch {
        return $null
    }
}

# Get the directory where this script is located
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$htmlFile = Join-Path $scriptDir "keep-awake.html"

# Check if HTML file exists
if (-not (Test-Path $htmlFile)) {
    Write-Error "keep-awake.html not found in script directory: $scriptDir"
    Write-Host "Please ensure keep-awake.html is in the same directory as this script."
    exit 1
}

# Find Chrome executable
if ($ChromePath -eq "") {
    $ChromePath = Find-Chrome
}

if (-not $ChromePath -or -not (Test-Path $ChromePath)) {
    Write-Error "Chrome not found. Please install Google Chrome or specify the path with -ChromePath parameter."
    Write-Host "Example: .\start-keep-awake.ps1 -ChromePath 'C:\Path\To\chrome.exe'"
    exit 1
}

Write-Host "Found Chrome at: $ChromePath"
Write-Host "Opening keep-awake app..."

# Build Chrome arguments
$chromeArgs = @(
    "--new-window",
    "--disable-web-security",
    "--disable-features=VizDisplayCompositor",
    "--disable-background-timer-throttling",
    "--disable-backgrounding-occluded-windows",
    "--disable-renderer-backgrounding"
)

# Add fullscreen or kiosk mode if requested
if ($Kiosk) {
    $chromeArgs += "--kiosk"
    Write-Host "Starting in kiosk mode (press Alt+F4 to close)"
} elseif ($Fullscreen) {
    $chromeArgs += "--start-fullscreen"
    Write-Host "Starting in fullscreen mode (press F11 to exit fullscreen)"
}

# Add the HTML file path
$chromeArgs += "file:///$($htmlFile.Replace('\', '/'))"

# Start Chrome
try {
    Start-Process -FilePath $ChromePath -ArgumentList $chromeArgs
    Write-Host "Keep-awake app started successfully!"
    Write-Host "The screen will stay awake as long as the Chrome window is open and active."
    Write-Host ""
    Write-Host "Tips:"
    Write-Host "- Keep the Chrome window visible (not minimized)"
    Write-Host "- The app will automatically prevent screen sleep"
    Write-Host "- Close the Chrome window to stop keeping the screen awake"
} catch {
    Write-Error "Failed to start Chrome: $($_.Exception.Message)"
    exit 1
}