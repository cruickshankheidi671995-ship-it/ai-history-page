$ErrorActionPreference = "Stop"

$Port = 4173
$Root = Split-Path -Parent $MyInvocation.MyCommand.Path

$ip = Get-NetIPAddress -AddressFamily IPv4 |
  Where-Object {
    $_.IPAddress -notlike "127.*" -and
    $_.AddressState -eq "Preferred" -and
    $_.PrefixOrigin -ne "WellKnown"
  } |
  Select-Object -First 1 -ExpandProperty IPAddress

if (-not $ip) {
  $ip = "localhost"
}

Set-Location $Root
Write-Host ""
Write-Host "AI history page is running." -ForegroundColor Cyan
Write-Host "Local URL:   http://127.0.0.1:$Port/index.html"
Write-Host "Network URL: http://$ip`:$Port/index.html" -ForegroundColor Green
Write-Host ""
Write-Host "Keep this window open while other computers visit the page."
Write-Host "Press Ctrl+C to stop the server."
Write-Host ""

python -m http.server $Port --bind 0.0.0.0
