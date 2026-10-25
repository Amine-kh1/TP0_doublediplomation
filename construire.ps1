param(
    [string]$JdkHome = 'C:\Program Files\Zulu\zulu-25',
    [string]$MavenCmd = 'C:\Program Files\JetBrains\IntelliJ IDEA 2026.2.3\plugins\maven-plugin\lib\maven3\bin\mvn.cmd'
)
$ErrorActionPreference = 'Stop'
if (-not (Test-Path -LiteralPath "$JdkHome\bin\javac.exe")) { throw 'JDK introuvable : ajuster JdkHome.' }
if (-not (Test-Path -LiteralPath $MavenCmd)) { throw 'Maven introuvable : ajuster MavenCmd.' }
$env:JAVA_HOME = $JdkHome
Push-Location $PSScriptRoot
try {
    & $MavenCmd "-Dmaven.repo.local=$PSScriptRoot\.maven-repository" '-Dmaven.compiler.fork=true' -B -ntp clean package
    if ($LASTEXITCODE -ne 0) { throw 'La construction Maven a échoué.' }
} finally { Pop-Location }
