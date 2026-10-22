"use client"

import React, { useState } from "react"
import styles from "@/styles/habbo.module.css"
import { MessageSquare, ChevronDown, ChevronUp, Sparkles, HelpCircle } from "lucide-react"

interface Props {
  currentStageTitle: string
  introText: string
  successText: string
  isStageCompleted: boolean
  totalCases: number
  solvedCount: number
  onHintClick?: () => void
  onOpenTutorial?: () => void
}

export default function HabboNarrator({
  currentStageTitle,
  introText,
  successText,
  isStageCompleted,
  totalCases,
  solvedCount,
  onHintClick,
  onOpenTutorial,
}: Props) {
  const [isMinimized, setIsMinimized] = useState(false)

  const activeMessage = isStageCompleted
    ? successText
    : solvedCount === 0
    ? introText
    : `Bagus sekali! Kamu sudah mengidentifikasi ${solvedCount} dari ${totalCases} kasus di ${currentStageTitle}. Terus selidiki objek mencurigakan lainnya!`

  return (
    <div className="fixed bottom-14 left-4 z-40 max-w-sm sm:max-w-md pointer-events-auto">
      {/* Minimized floating button */}
      {isMinimized ? (
        <button
          onClick={() => setIsMinimized(false)}
          className={`${styles.pixelButtonYellow} px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs font-bold shadow-lg`}
        >
          <span className="text-base">🕵️‍♂️</span>
          <span className="font-pixel text-[10px]">Inspektur Frank</span>
          <ChevronUp className="w-3.5 h-3.5" />
        </button>
      ) : (
        <div className="flex items-end gap-2.5">
          {/* Pixel Avatar Portrait (Habbo style inspector) */}
          <div className="relative shrink-0 flex flex-col items-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl border-3 border-black bg-gradient-to-b from-amber-200 to-amber-400 p-1 shadow-[0_4px_0_rgba(0,0,0,0.5)] flex items-center justify-center overflow-hidden">
              {/* Retro pixel style avatar illustration */}
              <div className="relative w-full h-full flex items-center justify-center text-3xl select-none">
                🕵️‍♂️
              </div>
            </div>
            <span className="mt-1 bg-black text-[#ffcf4d] px-1.5 py-0.5 rounded text-[8px] font-pixel tracking-tighter uppercase border border-amber-400">
              FRANK
            </span>
          </div>

          {/* Habbo Speech Bubble */}
          <div className="flex-1 bg-white border-2 border-black rounded-xl p-3 shadow-[0_4px_0_rgba(0,0,0,0.4)] relative">
            {/* Header of speech bubble */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-1 mb-1.5">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="font-pixel text-[10px] font-bold text-slate-900 uppercase">
                  Inspektur Frank (Duta Pancasila)
                </span>
              </div>
              <button
                onClick={() => setIsMinimized(true)}
                className="text-slate-400 hover:text-slate-700 p-0.5"
                title="Sembunyikan dialog"
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Bubble Dialogue Content */}
            <p className="text-xs text-slate-800 leading-relaxed font-sans font-medium">
              {activeMessage}
            </p>

            {/* Footer / Hint & Tutorial buttons */}
            <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between gap-2">
              <span className="text-[10px] text-slate-500 font-pixel">
                {solvedCount}/{totalCases} KASUS
              </span>

              <div className="flex items-center gap-2.5">
                {onOpenTutorial && (
                  <button
                    onClick={onOpenTutorial}
                    className="inline-flex items-center gap-1 text-[10px] font-pixel text-amber-700 hover:text-amber-900 underline cursor-pointer"
                  >
                    <span>📖 Panduan</span>
                  </button>
                )}

                {!isStageCompleted && onHintClick && (
                  <button
                    onClick={onHintClick}
                    className="inline-flex items-center gap-1 text-[10px] font-pixel text-blue-600 hover:text-blue-800 underline cursor-pointer"
                  >
                    <HelpCircle className="w-3 h-3" />
                    <span>Petunjuk</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
