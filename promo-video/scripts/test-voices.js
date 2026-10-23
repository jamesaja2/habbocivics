const { execSync } = require('child_process');
try {
  const cmd = `powershell -NoProfile -Command "Add-Type -AssemblyName System.Speech; $s = New-Object System.Speech.Synthesis.SpeechSynthesizer; foreach($v in $s.GetInstalledVoices()) { Write-Host $v.VoiceInfo.Name }"`;
  const out = execSync(cmd, { encoding: 'utf-8' });
  console.log('Installed TTS voices:\n' + out);
} catch (err) {
  console.error('Error checking voices:', err.message);
}
