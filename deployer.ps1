param(
    [string]$PayaraHome = 'C:\autresprogrammes\payara7.2026.8\payara7',
    [string]$JdkHome = 'C:\Program Files\Zulu\zulu-25'
)
$ErrorActionPreference = 'Stop'
$asadmin = Join-Path $PayaraHome 'bin\asadmin.bat'
$war = Join-Path $PSScriptRoot 'target\tp0-khabot-amine.war'
if (-not (Test-Path -LiteralPath $asadmin)) { throw 'Payara introuvable : ajuster PayaraHome.' }
if (-not (Test-Path -LiteralPath $war)) { throw 'Construire le projet avec construire.ps1 avant de le déployer.' }
$env:JAVA_HOME = $JdkHome
$client = [Net.Sockets.TcpClient]::new()
try { $client.Connect('127.0.0.1', 4848); $running = $true } catch { $running = $false } finally { $client.Dispose() }
Push-Location (Join-Path $PayaraHome 'bin')
try {
    if (-not $running) {
        & $asadmin --host 127.0.0.1 start-domain domain1
        if ($LASTEXITCODE -ne 0) { throw 'Le domaine Payara ne démarre pas. Consulter server.log.' }
    }
    & $asadmin --host 127.0.0.1 deploy --force=true --name tp0-khabot-amine --contextroot tp0-khabot-amine $war
    if ($LASTEXITCODE -ne 0) { throw 'Le déploiement a échoué. Consulter server.log.' }
    Write-Output 'Application : http://localhost:8080/tp0-khabot-amine/'
} finally { Pop-Location }
