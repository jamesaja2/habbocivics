"use client"

import React, { useEffect } from "react"
import { soundManager } from "@/lib/audio-effects"
import styles from "@/styles/habbo.module.css"
import { Sparkles, Trophy, ArrowRight, BookOpen, X } from "lucide-react"

interface Props {
  stageTitle: string
  environmentName: string
  isLastStage: boolean
  onNextStage: () => void
  onOpenDossier: () => void
  onDismiss: () => void
}

export default function HabboSuccessBanner({
  stageTitle,
  environmentName,
  isLastStage,
  onNextStage,
  onOpenDossier,
  onDismiss,
}: Props) {
  useEffect(() => {
    soundManager.playStageComplete()
  }, [])

  return (
    <div className="fixed bottom-12 left-3 right-3 sm:left-auto sm:right-6 sm:max-w-xl z-50 animate-bounce">
      <div className="border-3 border-black rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-green-600 p-3 sm:p-4 text-white shadow-[0_8px_0_rgba(0,0,0,0.5)]">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-yellow-300 border-2 border-black flex items-center justify-center text-2xl shrink-0 shadow-md">
              🏆
            </div>

            <div>
              <div className="font-pixel text-[10px] text-yellow-200 uppercase tracking-widest flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                MISI SELESAI DENGAN SEMPURNA!
              </div>
              <h3 className="font-bold text-sm sm:text-base text-white leading-tight font-sans">
                Selamat! Kamu telah mengidentifikasi semua masalah di {environmentName}.
              </h3>
              <p className="text-xs text-emerald-100 mt-0.5">
                Kamu telah memahami analisis hak, kewajiban, dan gagasan solutifnya!
              </p>
            </div>
          </div>

          <button
            onClick={onDismiss}
            className="text-white hover:text-yellow-200 p-1"
            title="Tutup banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="mt-3 pt-2.5 border-t border-emerald-400/50 flex flex-wrap items-center justify-end gap-2">
          <button
            onClick={onOpenDossier}
            className={`${styles.pixelButtonYellow} px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 cursor-pointer`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Tinjau Berkas Solusi</span>
          </button>

          {!isLastStage && (
            <button
              onClick={onNextStage}
              className={`${styles.pixelButtonGreen} px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 cursor-pointer`}
            >
              <span>Misi Berikutnya</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
