Add-Type -AssemblyName System.Speech

$outDir = Join-Path $PSScriptRoot "..\public\audio"
if (-not (Test-Path $outDir)) {
    New-Item -ItemType Directory -Path $outDir -Force | Out-Null
}

$scripts = @(
    @{
        Id = "vo_scene1"
        Text = "Pernah bayangkan belajar Pendidikan Pancasila di dunia virtual retro Habbo Hotel? Sambutlah: Misi Agen Kewarganegaraan!"
    },
    @{
        Id = "vo_scene2"
        Text = "Jelajahi lima zona misi isometrik! Dari Taman Kota, Hutan Lindung Tropis, Ruang Siber, Sekolah Pancasila, hingga Balai Layanan Publik!"
    },
    @{
        Id = "vo_scene3"
        Text = "Selidiki dua puluh kasus nyata pelanggaran hak dan pengingkaran kewajiban berdasarkan UUD 1945! Dilengkapi animasi kobaran api karhutla, vandalisme coretan liar, hingga lampu jalan pecah!"
    },
    @{
        Id = "vo_scene4"
        Text = "Bukan sekadar membaca! Uji kemampuan analisismu lewat Tantangan Kuis Detektif di setiap kasus untuk memecahkan misteri dan membuktikan pemahamanmu!"
    },
    @{
        Id = "vo_scene5"
        Text = "Dilengkapi panduan tur interaktif, alunan musik chiptune retro, dan kontrol virtual d-pad ramah ponsel!"
    },
    @{
        Id = "vo_scene6"
        Text = "Jadilah Duta Luhur Pancasila sekarang juga! Karya James Timothy dan Karla Jessica Hartono."
    }
)

$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer
$synth.Rate = 1 # Slightly faster pace for energetic promo

foreach ($item in $scripts) {
    $filePath = Join-Path $outDir "$($item.Id).wav"
    Write-Host "Synthesizing $($item.Id)..."
    $synth.SetOutputToWaveFile($filePath)
    $synth.Speak($item.Text)
    Write-Host "Created: $filePath"
}

$synth.Dispose()
Write-Host "Voiceover generation complete!"
