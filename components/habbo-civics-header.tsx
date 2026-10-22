"use client"

import React from "react"
import { type CivicStage } from "@/lib/civics-data"
import { soundManager } from "@/lib/audio-effects"
import styles from "@/styles/habbo.module.css"
import { Map, BookOpen, Volume2, VolumeX, Sparkles, Trophy, Smile, Flame, Compass } from "lucide-react"

interface Props {
  currentStage: CivicStage
  totalSolvedInStage: number
  totalCasesInStage: number
  totalSolvedOverall: number
  totalCasesOverall: number
  onOpenStageNavigator: () => void
  onOpenDossier: () => void
  onOpenTutorial: () => void
  isAudioOn: boolean
  onToggleAudio: () => void
  isDancing: boolean
  onToggleDance: () => void
  isWaving: boolean
  onToggleWave: () => void
}

export default function HabboCivicsHeader({
  currentStage,
  totalSolvedInStage,
  totalCasesInStage,
  totalSolvedOverall,
  totalCasesOverall,
  onOpenStageNavigator,
  onOpenDossier,
  isAudioOn,
  onToggleAudio,
  isDancing,
  onToggleDance,
  isWaving,
  onToggleWave,
}: Props) {
  const percentage = Math.round((totalSolvedInStage / totalCasesInStage) * 100)

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#162737] border-b-3 border-black shadow-[0_4px_0_rgba(0,0,0,0.4)] select-none">
      <div className="max-w-7xl mx-auto px-3 py-2 flex flex-wrap items-center justify-between gap-2.5">
        {/* Left: Logo & Title */}
        <div className="flex items-center gap-2.5">
          <div className={styles.logoBlock}>
            <span className={styles.logoWord}>HABBO CIVICS</span>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-pixel text-xs sm:text-sm font-bold text-amber-300 tracking-wider">
                Misi: Agen Kewarganegaraan
              </span>
              <span className="bg-blue-600 text-white text-[9px] font-pixel px-1.5 py-0.5 rounded border border-blue-400">
                PPKN XII
              </span>
            </div>
            <div className="text-[11px] text-slate-300 hidden sm:flex items-center gap-2">
              <span className="font-bold text-white">{currentStage.title}</span>
              <span>•</span>
              <span className="text-slate-400">{currentStage.environmentName}</span>
            </div>
          </div>
        </div>

        {/* Center: Gamification Progress Bar */}
        <div className="flex items-center gap-3 bg-[#0d1722] border-2 border-black rounded-lg px-3 py-1.5 shadow-inner">
          <div className="text-left">
            <div className="text-[9px] font-pixel text-amber-400 flex items-center gap-1">
              <Trophy className="w-3 h-3 text-amber-400" />
              <span>Kasus Ditemukan:</span>
            </div>
            <div className="text-xs sm:text-sm font-mono font-bold text-white">
              {totalSolvedInStage} / {totalCasesInStage} Kasus
            </div>
          </div>

          {/* Segmented Retro Progress Bar */}
          <div className="w-24 sm:w-36 h-4 bg-slate-800 border-2 border-black rounded-sm overflow-hidden p-0.5 flex gap-0.5">
            {Array.from({ length: totalCasesInStage }).map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-full rounded-[1px] transition-all duration-300 ${
                  i < totalSolvedInStage
                    ? "bg-gradient-to-r from-emerald-400 to-emerald-500 shadow-[0_0_4px_#34d399]"
                    : "bg-slate-700/60"
                }`}
              />
            ))}
          </div>

          <span className="text-[10px] font-pixel text-emerald-400 hidden sm:inline">
            {percentage}%
          </span>
        </div>

        {/* Right: Actions (Navigator, Dossier, Audio, Actions) */}
        {/* Right: Actions (Navigator, Dossier, Tutorial, Audio, Actions) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Tutorial / Panduan Button */}
          <button
            onClick={() => {
              soundManager.playClick()
              onOpenTutorial()
            }}
            className={`${styles.pixelButtonGreen} px-2 sm:px-2.5 py-1.5 rounded text-xs font-bold flex items-center gap-1 cursor-pointer`}
            title="Panduan & Tour Misi"
          >
            <Compass className="w-3.5 h-3.5" />
            <span className="font-pixel text-[10px] hidden sm:inline">Tour</span>
          </button>

          {/* Stage Switcher Button */}
          <button
            onClick={() => {
              soundManager.playClick()
              onOpenStageNavigator()
            }}
            className={`${styles.pixelButtonYellow} px-2.5 sm:px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 cursor-pointer`}
            title="Ganti Stage / Lokasi Misi"
          >
            <Map className="w-3.5 h-3.5" />
            <span className="font-pixel text-[10px] hidden sm:inline">Misi Lain</span>
          </button>

          {/* Dossier Notebook Button */}
          <button
            onClick={() => {
              soundManager.playClick()
              onOpenDossier()
            }}
            className={`${styles.pixelButtonPrimary} px-2.5 sm:px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 cursor-pointer`}
            title="Lihat Berkas Kasus"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="font-pixel text-[10px] hidden sm:inline">Berkas</span>
          </button>

          {/* Character Action: Dance */}
          <button
            onClick={onToggleDance}
            className={`${
              isDancing ? styles.pixelButtonGreen : styles.pixelButtonGray
            } p-1.5 rounded cursor-pointer hidden md:flex items-center`}
            title={isDancing ? "Berhenti Joget" : "Joget (Dance)"}
          >
            <Flame className="w-3.5 h-3.5" />
          </button>

          {/* Character Action: Wave */}
          <button
            onClick={onToggleWave}
            className={`${
              isWaving ? styles.pixelButtonGreen : styles.pixelButtonGray
            } p-1.5 rounded cursor-pointer hidden md:flex items-center`}
            title={isWaving ? "Turunkan Tangan" : "Melambai (Wave)"}
          >
            <Smile className="w-3.5 h-3.5" />
          </button>

          {/* Audio toggle */}
          <button
            onClick={onToggleAudio}
            className={`${
              isAudioOn ? styles.pixelButtonYellow : styles.pixelButtonGray
            } p-1.5 rounded cursor-pointer`}
            title={isAudioOn ? "Matikan Musik Chiptune" : "Nyalakan Musik Chiptune"}
          >
            {isAudioOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </header>
  )
}
