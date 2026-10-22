"use client"

import React, { useState } from "react"
import { soundManager } from "@/lib/audio-effects"
import styles from "@/styles/habbo.module.css"
import { Compass, Sparkles, MapPin, BrainCircuit, CheckCircle2, ChevronRight, ChevronLeft, X } from "lucide-react"

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function HabboTutorialModal({ isOpen, onClose }: Props) {
  const [step, setStep] = useState(0)

  if (!isOpen) return null

  const steps = [
    {
      title: "Selamat Datang, Agen Pancasila!",
      icon: "🕵️‍♂️",
      badge: "BRIEFING MISI #01",
      description:
        "Kamu ditugaskan sebagai Agen Khusus Penyelidik Hak & Kewajiban Warga Negara. Misi utamamu adalah menginvestigasi kasus-kasus pelanggaran hak asasi dan pengingkaran kewajiban di 5 zona virtual bertema retro Habbo Hotel.",
      detail:
        "Setiap zona memiliki berbagai kasus nyata di masyarakat seperti vandalisme fasilitas umum, pembakaran hutan (karhutla), cyberbullying, diskriminasi pendidikan, hingga pungutan liar.",
    },
    {
      title: "Kontrol & Eksplorasi Virtual",
      icon: "🕹️",
      badge: "NAVIGASI #02",
      description:
        "Gerakkan karakter agenmu dengan tombol WASD atau Tombol Panah (Arrow Keys) pada keyboard. Di smartphone/tablet, kamu cukup tap langsung pada ubin isometrik yang ingin dituju atau gunakan tombol Hotspot Cepat di footer.",
      detail:
        "Kamu juga bisa berinteraksi dengan tombol aksi: Joget (Dance) dan Melambai (Wave) di header untuk meramaikan suasana kamar!",
    },
    {
      title: "Identifikasi Hotspot Kasus",
      icon: "🔍",
      badge: "INVESTIGASI #03",
      description:
        "Perhatikan lingkungan sekitar! Cari objek-objek mencurigakan yang memiliki pin mengambang emas [!], seperti tumpukan sampah liar, coretan dinding, lampu jalan pecah, atau kobaran api.",
      detail:
        "Klik langsung pin tersebut atau klik tombol Hotspot di bagian bawah layar untuk membuka Dokumen Berkas Kasus yang memuat status pelanggaran, dampak sosial, dan dasar hukum UUD 1945.",
    },
    {
      title: "Tantangan Analisis Detektif",
      icon: "⚡",
      badge: "CHALLENGE #04",
      description:
        "Buktikan kemampuan analisismu! Di dalam setiap modal kasus, kamu harus menjawab 'Tantangan Analisis Detektif' untuk menentukan kategori pelanggaran dan solusi nyata berdasarkan nilai luhur Pancasila.",
      detail:
        "Jawab dengan benar untuk memecahkan kasus, mengubah status pin menjadi hijau [✓], dan mendapatkan poin peningkatan pangkat keagenan!",
    },
    {
      title: "5 Zona Misi Tanpa Batas",
      icon: "🗺️",
      badge: "NAVIGATOR #05",
      description:
        "Kamu bebas memilih dan berpindah ke zona misi mana pun kapan saja melalui tombol 'Misi Lain (Navigator)' di bagian atas tanpa memerlukan database!",
      detail:
        "Semua progres investigasimu otomatis tersimpan di peramban. Selesaikan seluruh 20 kasus untuk meraih gelar kehormatan 'Duta Luhur Pancasila'!",
    },
  ]

  const current = steps[step]

  const handleNext = () => {
    soundManager.playClick()
    if (step < steps.length - 1) {
      setStep(step + 1)
    } else {
      handleComplete()
    }
  }

  const handlePrev = () => {
    soundManager.playClick()
    if (step > 0) setStep(step - 1)
  }

  const handleComplete = () => {
    soundManager.playStageComplete()
    try {
      localStorage.setItem("habbo_civics_tour_done", "true")
    } catch {
      // Ignored
    }
    onClose()
  }

  return (
    <div
      className={styles.habboModalBackdrop}
      onClick={handleComplete}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`${styles.habboModalCard} max-w-lg`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title Bar */}
        <div className={styles.habboModalTitleBar}>
          <div className="flex items-center gap-2">
            <span className={styles.logoBlock} style={{ height: "24px", padding: "0 6px" }}>
              <span className={styles.logoWord} style={{ fontSize: "11px" }}>TUTORIAL</span>
            </span>
            <span className="font-bold text-xs tracking-wide text-[#092231] font-pixel">
              PANDUAN &amp; MISI AGEN PANCASILA
            </span>
          </div>

          <button
            onClick={handleComplete}
            className={`${styles.closeBtn} h-6 w-6 flex items-center justify-center cursor-pointer`}
            title="Lewati Tutorial"
          >
            <span className={styles.closeIcon} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 space-y-4">
          {/* Progress dots */}
          <div className="flex items-center justify-between border-b border-slate-300 pb-2">
            <span className="text-[10px] font-pixel text-blue-900 bg-blue-100 px-2 py-0.5 rounded border border-blue-400">
              {current.badge}
            </span>
            <div className="flex items-center gap-1.5">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full border border-black transition-all ${
                    i === step
                      ? "bg-amber-400 scale-125 shadow-sm"
                      : i < step
                      ? "bg-emerald-500"
                      : "bg-slate-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Icon & Heading */}
          <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border-2 border-black shadow-[0_2px_0_rgba(0,0,0,0.1)]">
            <div className="w-14 h-14 rounded-xl border-2 border-black bg-gradient-to-b from-amber-200 to-amber-400 flex items-center justify-center text-3xl shrink-0 shadow-sm">
              {current.icon}
            </div>

            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 leading-snug font-sans">
                {current.title}
              </h2>
              <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                {current.description}
              </p>
            </div>
          </div>

          {/* Detail card */}
          <div className="bg-amber-50/90 border-2 border-amber-300 rounded-lg p-3 text-xs text-amber-950 font-medium leading-relaxed">
            💡 <strong className="text-amber-900 font-bold">Catatan Agen:</strong> {current.detail}
          </div>

          {/* Navigation Buttons */}
          <div className="pt-2 flex items-center justify-between gap-2 border-t-2 border-slate-300">
            {step > 0 ? (
              <button
                onClick={handlePrev}
                className={`${styles.pixelButtonGray} px-3 py-1.5 text-xs font-bold rounded flex items-center gap-1 cursor-pointer`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Kembali</span>
              </button>
            ) : (
              <button
                onClick={handleComplete}
                className="text-xs text-slate-500 hover:text-slate-800 underline font-medium cursor-pointer"
              >
                Lewati Panduan
              </button>
            )}

            <button
              onClick={handleNext}
              className={`${styles.pixelButtonGreen} px-4 py-2 text-xs font-bold rounded flex items-center gap-1.5 cursor-pointer shadow-md`}
            >
              <span>{step === steps.length - 1 ? "Siap Bertugas! 🚀" : "Lanjut"}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
