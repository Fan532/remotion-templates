$ErrorActionPreference = 'Stop'
Set-Location (Split-Path $PSScriptRoot -Parent)
if (-not (Get-Command ffmpeg -ErrorAction SilentlyContinue)) { throw 'Install FFmpeg and reopen PowerShell.' }
if (-not (Get-Command py -ErrorAction SilentlyContinue)) { throw 'Install 64-bit Python 3.12 and reopen PowerShell.' }
if (-not (Test-Path .venv)) { & py -3.12 -m venv .venv; if ($LASTEXITCODE -ne 0) { throw 'Python venv creation failed' } }
$python = Join-Path $PWD '.venv/Scripts/python.exe'
& $python -m pip install -r requirements.txt
if ($LASTEXITCODE -ne 0) { throw 'Dependency installation failed' }
foreach ($script in @('tools/download_model.py','tools/inspect_assets.py','tools/process.py','tools/make_comparison.py','tools/validate_tests.py')) {
  & $python $script
  if ($LASTEXITCODE -ne 0) { throw ('Failed: ' + $script) }
}
Write-Host 'Only five-second tests were processed. Review output/preview-comparison.mp4 before any full processing.'
