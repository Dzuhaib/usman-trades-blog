Write-Host "Clearing today's Redis data..." -ForegroundColor Yellow

$url = $env:UPSTASH_REDIS_REST_URL
$token = $env:UPSTASH_REDIS_REST_TOKEN

if (-not $url -or -not $token) {
    Write-Host "Redis credentials not found in environment. Loading from .env.local..." -ForegroundColor Yellow
    Get-Content ".env.local" | ForEach-Object {
        if ($_ -match 'UPSTASH_REDIS_REST_URL=(.+)') { $url = $matches[1] }
        if ($_ -match 'UPSTASH_REDIS_REST_TOKEN=(.+)') { $token = $matches[1] }
    }
}

if (-not $url -or -not $token) {
    Write-Host "ERROR: Could not find Redis credentials. Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in .env.local" -ForegroundColor Red
    exit 1
}

$headers = @{ Authorization = "Bearer $token" }

# 1. Clear dynamic posts (AI-generated articles)
$body = "DEL seo-os:dynamic-posts"
$resp = Invoke-RestMethod -Uri "$url" -Method Post -Headers $headers -Body $body -ContentType "text/plain"
Write-Host "Cleared dynamic posts: $resp" -ForegroundColor Green

# 2. Clear content overrides (today's optimizations)
$body = "KEYS seo-os:content-override:*"
$keysResp = Invoke-RestMethod -Uri "$url" -Method Post -Headers $headers -Body $body -ContentType "text/plain"
if ($keysResp -is [array] -and $keysResp.Length -gt 0) {
    $body = "DEL $($keysResp -join ' ')"
    $delResp = Invoke-RestMethod -Uri "$url" -Method Post -Headers $headers -Body $body -ContentType "text/plain"
    Write-Host "Cleared $($keysResp.Length) content overrides: $delResp" -ForegroundColor Green
} else {
    Write-Host "No content overrides found." -ForegroundColor Yellow
}

Write-Host "Done! All today's blogs removed from Redis." -ForegroundColor Green
