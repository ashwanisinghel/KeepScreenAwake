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
            return @{ Path = $path; Browser = "Chrome" }
        }
    }
    
    # Try to find chrome in PATH
    try {
        $chromeInPath = Get-Command chrome -ErrorAction Stop
        return @{ Path = $chromeInPath.Source; Browser = "Chrome" }
    } catch {
        return $null
    }
}

# Function to find Edge installation
function Find-Edge {
    $possiblePaths = @(
        "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe",
        "${env:ProgramFiles}\Microsoft\Edge\Application\msedge.exe",
        "${env:LOCALAPPDATA}\Microsoft\Edge\Application\msedge.exe"
    )
    
    foreach ($path in $possiblePaths) {
        if (Test-Path $path) {
            return @{ Path = $path; Browser = "Edge" }
        }
    }
    
    # Try to find edge in PATH
    try {
        $edgeInPath = Get-Command msedge -ErrorAction Stop
        return @{ Path = $edgeInPath.Source; Browser = "Edge" }
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

# Find browser executable
$browserInfo = $null
if ($ChromePath -eq "") {
    # Try Chrome first
    $browserInfo = Find-Chrome
    
    # If Chrome not found, try Edge
    if (-not $browserInfo) {
        $browserInfo = Find-Edge
    }
    
    if (-not $browserInfo) {
        Write-Error "Neither Chrome nor Edge found. Please install Google Chrome or Microsoft Edge, or specify the path with -ChromePath parameter."
        Write-Host "Example: .\start-keep-awake.ps1 -ChromePath 'C:\Path\To\chrome.exe'"
        exit 1
    }
    
    $ChromePath = $browserInfo.Path
    Write-Host "Found $($browserInfo.Browser) at: $ChromePath"
} else {
    # User specified a custom path
    if (-not (Test-Path $ChromePath)) {
        Write-Error "Specified browser path not found: $ChromePath"
        exit 1
    }
    Write-Host "Using specified browser at: $ChromePath"
}
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
    if ($browserInfo) {
        Write-Host "The screen will stay awake as long as the $($browserInfo.Browser) window is open and active."
    } else {
        Write-Host "The screen will stay awake as long as the browser window is open and active."
    }
    Write-Host ""
    Write-Host "Tips:"
    Write-Host "- Keep the browser window visible (not minimized)"
    Write-Host "- The app will automatically prevent screen sleep"
    Write-Host "- Close the browser window to stop keeping the screen awake"
} catch {
    if ($browserInfo) {
        Write-Error "Failed to start $($browserInfo.Browser): $($_.Exception.Message)"
    } else {
        Write-Error "Failed to start browser: $($_.Exception.Message)"
    }
    exit 1
}