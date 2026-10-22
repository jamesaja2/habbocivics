"use client"

import React from "react"
import { type CivicStage, type CivicCase } from "@/lib/civics-data"
import { soundManager } from "@/lib/audio-effects"
import styles from "@/styles/habbo.module.css"
import { CheckCircle2, AlertTriangle, BookOpen, Search, ArrowRight } from "lucide-react"

interface Props {
  isOpen: boolean
  onClose: () => void
  currentStage: CivicStage
  solvedCaseIds: Set<string>
  onOpenCase: (c: CivicCase) => void
}

export default function HabboDossierModal({
  isOpen,
  onClose,
  currentStage,
  solvedCaseIds,
  onOpenCase,
}: Props) {
  if (!isOpen) return null

  const handleOpenCase = (c: CivicCase) => {
    soundManager.playClick()
    onOpenCase(c)
  }

  const handleClose = () => {
    soundManager.playClose()
    onClose()
  }

  return (
    <div
      className={styles.habboModalBackdrop}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`${styles.habboModalCard} max-w-xl`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title Bar */}
        <div className={styles.habboModalTitleBar}>
          <div className="flex items-center gap-2">
            <span className={styles.logoBlock} style={{ height: "24px", padding: "0 6px" }}>
              <span className={styles.logoWord} style={{ fontSize: "11px" }}>DOSSIER</span>
            </span>
            <span className="font-bold text-xs tracking-wide text-[#092231] font-pixel truncate">
              BERKAS KASUS: {currentStage.environmentName}
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

        {/* Content */}
        <div className="p-4 sm:p-5 max-h-[75vh] overflow-y-auto space-y-3">
          <div className="text-xs text-slate-700 bg-blue-50 border border-blue-200 p-2.5 rounded-lg flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-600 shrink-0" />
            <span>
              Klik salah satu kasus di bawah ini untuk melihat status pelanggaran, dasar hukum UUD 1945, dan gagasan solutifnya!
            </span>
          </div>

          <div className="space-y-2">
            {currentStage.cases.map((c, i) => {
              const isSolved = solvedCaseIds.has(c.id)

              return (
                <div
                  key={c.id}
                  onClick={() => handleOpenCase(c)}
                  className={`border-2 border-black rounded-lg p-3 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSolved
                      ? "bg-emerald-50 hover:bg-emerald-100 border-emerald-700"
                      : "bg-white hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-md border-2 border-black flex items-center justify-center text-sm font-pixel font-bold shrink-0 ${
                        isSolved ? "bg-emerald-400 text-emerald-950" : "bg-amber-300 text-amber-950"
                      }`}
                    >
                      {isSolved ? "✓" : `0${i + 1}`}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-pixel text-slate-500 uppercase">
                          KASUS #{i + 1}
                        </span>
                        {isSolved ? (
                          <span className="text-[9px] bg-emerald-600 text-white font-bold px-1.5 py-0.2 rounded font-pixel">
                            SELESAI
                          </span>
                        ) : (
                          <span className="text-[9px] bg-amber-500 text-black font-bold px-1.5 py-0.2 rounded font-pixel">
                            BELUM
                          </span>
                        )}
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-slate-900">
                        {c.title}
                      </div>
                      <div className="text-[11px] text-slate-600 truncate max-w-[260px] sm:max-w-md">
                        {c.category}
                      </div>
                    </div>
                  </div>

                  <button
                    className={`${
                      isSolved ? styles.pixelButtonGreen : styles.pixelButtonPrimary
                    } px-2.5 py-1 text-[11px] font-bold rounded flex items-center gap-1 shrink-0`}
                  >
                    <span>{isSolved ? "Buka" : "Periksa"}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              )
            })}
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={handleClose}
              className={`${styles.pixelButtonGray} px-4 py-1.5 text-xs font-bold rounded cursor-pointer`}
            >
              Tutup Berkas
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
