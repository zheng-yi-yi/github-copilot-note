Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
$env:Path = "C:\Users\yiyiz\tools\node-v22.12.0-win-x64;" + $env:Path
npm run docs:dev