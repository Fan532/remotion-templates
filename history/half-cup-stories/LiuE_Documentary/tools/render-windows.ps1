$ErrorActionPreference = 'Stop'
Set-Location (Split-Path $PSScriptRoot -Parent)
if (-not (Get-Command node -ErrorAction SilentlyContinue)) { throw 'Install Node.js LTS, then reopen PowerShell.' }
if (-not (Test-Path node_modules)) { & npm.cmd ci; if ($LASTEXITCODE -ne 0) { throw 'npm ci failed' } }
& npx.cmd remotion browser ensure
if ($LASTEXITCODE -ne 0) { throw 'Browser installation failed' }
& npm.cmd run typecheck
if ($LASTEXITCODE -ne 0) { throw 'TypeScript check failed' }
New-Item -ItemType Directory -Force out | Out-Null
$config = Get-Content -Raw -Encoding UTF8 src/config.json | ConvertFrom-Json
foreach ($clip in $config.clips) {
  & npx.cmd remotion render src/index.tsx $clip.id (Join-Path 'out' $clip.file) --codec=h264 --pixel-format=yuv420p
  if ($LASTEXITCODE -ne 0) { throw ('Render failed: ' + $clip.id) }
}
Write-Host 'Finished. MP4 files are in the out folder.'
