"use client"

import React, { useEffect, useRef, useState } from "react"
import { soundManager } from "@/lib/audio-effects"
import styles from "@/styles/habbo.module.css"
import {
  Film,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Download,
  Sparkles,
  Trophy,
  X,
  Maximize,
  Globe,
  ExternalLink,
  Compass,
  ArrowRight,
} from "lucide-react"

interface Props {
  isOpen: boolean
  onClose: () => void
  onProceedToTutorial?: () => void
  isFirstTime?: boolean
}

export default function HabboPromoModal({
  isOpen,
  onClose,
  onProceedToTutorial,
  isFirstTime = false,
}: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [activeScene, setActiveScene] = useState(0)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        soundManager.playClose()
        if (videoRef.current) {
          videoRef.current.pause()
        }
        if (isFirstTime && onProceedToTutorial) {
          onProceedToTutorial()
        } else {
          onClose()
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose, onProceedToTutorial, isFirstTime])

  if (!isOpen) return null

  const handleClose = () => {
    soundManager.playClose()
    if (videoRef.current) {
      videoRef.current.pause()
    }
    if (isFirstTime && onProceedToTutorial) {
      onProceedToTutorial()
    } else {
      onClose()
    }
  }

  const handleProceed = () => {
    soundManager.playClick()
    if (videoRef.current) {
      videoRef.current.pause()
    }
    if (onProceedToTutorial) {
      onProceedToTutorial()
    } else {
      onClose()
    }
  }

  const togglePlay = () => {
    soundManager.playClick()
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    } else {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  const toggleMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !videoRef.current.muted
    setIsMuted(videoRef.current.muted)
  }

  const scenes = [
    { title: "01. Hook & Intro Habbo Civics", time: "0:00 - 0:07", icon: "🏛️" },
    { title: "02. 5 Zona Misi Isometrik", time: "0:07 - 0:15", icon: "🗺️" },
    { title: "03. 20 Kasus Nyata & Animasi", time: "0:15 - 0:25", icon: "🔥" },
    { title: "04. Tantangan Kuis Detektif", time: "0:25 - 0:34", icon: "⚡" },
    { title: "05. Fitur Lengkap & Mobile D-Pad", time: "0:34 - 0:40", icon: "📱" },
    { title: "06. Grand Outro & Student Credits", time: "0:40 - 0:45", icon: "🏆" },
  ]

  return (
    <div
      className={styles.habboModalBackdrop}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`${styles.habboModalCard} max-w-4xl w-full`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title Bar */}
        <div className={styles.habboModalTitleBar}>
          <div className="flex items-center gap-2">
            <span className={styles.logoBlock} style={{ height: "24px", padding: "0 6px" }}>
              <span className={styles.logoWord} style={{ fontSize: "11px" }}>CINEMA 16:9</span>
            </span>
            <span className="font-bold text-xs tracking-wide text-[#092231] font-pixel truncate">
              VIDEO PROMOSI RESMI: HABBO CIVICS (REMOTION)
            </span>
          </div>

          <button
            onClick={handleClose}
            className={`${styles.closeBtn} h-6 w-6 flex items-center justify-center cursor-pointer`}
            title="Tutup (Esc)"
          >
            <span className={styles.closeIcon} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 max-h-[85vh] overflow-y-auto space-y-4 bg-[#eef6fb]">
          {/* First Time Onboarding Step Banner */}
          {isFirstTime && (
            <div className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 border-2 border-black rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 shadow-[0_3px_0_#000]">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl animate-bounce">🎬</span>
                <div>
                  <div className="text-[10px] font-pixel text-slate-900 font-bold uppercase tracking-wider">
                    LANGKAH 1 DARI 2 • PENGENALAN FITUR AGEN
                  </div>
                  <div className="text-xs font-bold text-slate-900">
                    Saksikan video promosi fitur Habbo Civics sebelum memulai panduan interaktif!
                  </div>
                </div>
              </div>

              {onProceedToTutorial && (
                <button
                  onClick={handleProceed}
                  className={`${styles.pixelButtonGreen} px-3.5 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md`}
                >
                  <span>Lewati ke Panduan Tour</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

          {/* 16:9 Video Player Container */}
          <div className="relative aspect-video w-full bg-black border-4 border-black rounded-xl overflow-hidden shadow-2xl flex items-center justify-center">
            <video
              ref={videoRef}
              src="/video/habbo_civics_promo.mp4"
              controls
              playsInline
              className="w-full h-full object-contain"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              Browser Anda belum mendukung pemutaran video tag HTML5.
            </video>
          </div>

          {/* Quick Player Bar */}
          <div className="bg-white border-2 border-black rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="bg-amber-400 text-black border border-black px-2 py-0.5 rounded text-[10px] font-pixel font-bold">
                FORMAT: 16:9 (1920x1080) • 30 FPS • CHIPTUNE &amp; VOICE OVER
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {onProceedToTutorial && (
                <button
                  onClick={handleProceed}
                  className={`${styles.pixelButtonGreen} px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm`}
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Lanjut ke Panduan Tour</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
              <a
                href="https://habbocivics.byjames.id/"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.pixelButtonYellow} px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 cursor-pointer text-decoration-none`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Buka Website (habbocivics.byjames.id)</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <a
                href="/video/habbo_civics_promo.mp4"
                download="Habbo_Civics_Promosi_16x9.mp4"
                className={`${styles.pixelButtonGreen} px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 cursor-pointer text-decoration-none`}
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh MP4</span>
              </a>
            </div>
          </div>

          {/* Scene Breakdown Cards */}
          <div className="space-y-2">
            <div className="text-[11px] font-pixel text-slate-700 tracking-wider">
              DAFTAR ADEGAN &amp; KONTEN FITUR PROMOSI:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {scenes.map((s, idx) => (
                <div
                  key={idx}
                  className="bg-white border-2 border-black rounded-lg p-2.5 flex items-center gap-2.5 shadow-sm"
                >
                  <span className="text-xl">{s.icon}</span>
                  <div>
                    <div className="text-xs font-bold text-slate-900 leading-tight">
                      {s.title}
                    </div>
                    <div className="text-[10px] text-slate-500 font-pixel">
                      {s.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Credits footer */}
          <div className="bg-amber-100 border-2 border-amber-400 rounded-lg p-3 text-center text-xs text-amber-950 font-medium">
            Project Video Promosi Remotion • Dibuat untuk Pendidikan Pancasila (PPKN XII)
            <br />
            <strong>Powered by James Timothy (XII B2/17) &amp; Karla Jessica Hartono (XII B2/23)</strong>
          </div>
        </div>
      </div>
    </div>
  )
}
