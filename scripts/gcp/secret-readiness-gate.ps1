param(
    [Parameter(Mandatory = $true)]
    [string]$ProjectId,

    [string[]]$Secrets = @("auth-secret", "google-client-id", "google-client-secret")
)

$failed = @()

foreach ($secretName in $Secrets) {
    Write-Host "Checking secret: $secretName ..." -ForegroundColor Cyan

    $existsCheck = & gcloud secrets describe $secretName --project=$ProjectId --format="value(name)" 2>$null

    if (-not $existsCheck) {
        Write-Host "  [FAIL] Secret '$secretName' does not exist in project $ProjectId." -ForegroundColor Red
        $failed += "$secretName (secret container not found)"
        continue
    }

    $enabledVersions = & gcloud secrets versions list $secretName `
        --project=$ProjectId `
        --filter="state:ENABLED" `
        --format="value(name)" 2>$null

    if (-not $enabledVersions) {
        Write-Host "  [FAIL] Secret '$secretName' has no ENABLED version." -ForegroundColor Red
        $failed += "$secretName (no ENABLED version)"
    }
    else {
        Write-Host "  [OK] Secret '$secretName' has at least one ENABLED version." -ForegroundColor Green
    }
}

Write-Host ""

if ($failed.Count -gt 0) {
    Write-Host "Secret Readiness Gate: FAILED" -ForegroundColor Red
    Write-Host "The following secrets are not ready for Cloud Run deployment:" -ForegroundColor Red
    $failed | ForEach-Object { Write-Host "  - $_" -ForegroundColor Red }
    Write-Host ""
    Write-Host "Do NOT run 'terraform apply' until these are resolved." -ForegroundColor Yellow
    exit 1
}
else {
    Write-Host "Secret Readiness Gate: PASSED" -ForegroundColor Green
    Write-Host "All checked secrets have at least one ENABLED version. Safe to proceed to 'terraform plan'." -ForegroundColor Green
    exit 0
}