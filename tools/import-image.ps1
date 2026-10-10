<#
  import-image.ps1
  Take an image you made in Magnific (or any PNG/JPG), resize it, and save it into
  the images folder under the slot name the website expects.

  Usage (PowerShell, from the project folder):
    .\tools\import-image.ps1 -Source "C:\Users\me\Downloads\magnific_xxx.png" -Slot treat-05-lifting

  Slot names are listed in README.md (e.g. main-hero, treat-01-pain, doctor-1, facility-01).
  The output is always images\<Slot>.jpg, max width 1600px, JPEG quality 85.
#>
param(
  [Parameter(Mandatory = $true)][string]$Source,
  [Parameter(Mandatory = $true)][string]$Slot,
  [int]$MaxWidth = 1600,
  [int]$Quality = 85
)

Add-Type -AssemblyName System.Drawing

if (-not (Test-Path -LiteralPath $Source -PathType Leaf)) { throw "Source file not found: $Source" }
if ($Slot -notmatch '^[a-z0-9\-]+$') { throw "Slot must contain only lowercase letters, digits and hyphens: $Slot" }

$outDir = Join-Path (Split-Path -Parent $PSScriptRoot) 'images'
if (-not (Test-Path -LiteralPath $outDir)) { New-Item -ItemType Directory -Path $outDir | Out-Null }
$outFile = Join-Path $outDir ($Slot + '.jpg')

$src = [System.Drawing.Image]::FromFile((Resolve-Path -LiteralPath $Source).Path)
try {
  $w = $src.Width; $h = $src.Height
  if ($w -gt $MaxWidth) { $h = [int][math]::Round($h * $MaxWidth / $w); $w = $MaxWidth }

  $bmp = New-Object System.Drawing.Bitmap -ArgumentList $w, $h
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.Clear([System.Drawing.Color]::White)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.DrawImage($src, 0, 0, $w, $h)
  $g.Dispose()

  $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
  $params = New-Object System.Drawing.Imaging.EncoderParameters -ArgumentList 1
  $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter -ArgumentList ([System.Drawing.Imaging.Encoder]::Quality), ([long]$Quality)
  $bmp.Save($outFile, $codec, $params)
  $bmp.Dispose()
}
finally {
  $src.Dispose()
}

$kb = [int]((Get-Item -LiteralPath $outFile).Length / 1KB)
Write-Output ("Saved {0} ({1}x{2}, {3} KB)" -f $outFile, $w, $h, $kb)
