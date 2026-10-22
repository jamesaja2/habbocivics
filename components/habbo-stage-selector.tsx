"use client"

import React from "react"
import { CIVIC_STAGES, type CivicStage } from "@/lib/civics-data"
import { soundManager } from "@/lib/audio-effects"
import styles from "@/styles/habbo.module.css"
import { MapPin, CheckCircle2, ChevronRight, Trophy, BookOpen } from "lucide-react"

interface Props {
  isOpen: boolean
  onClose: () => void
  currentStageId: string
  onSelectStage: (stage: CivicStage) => void
  solvedCaseIds: Set<string>
}

export default function HabboStageSelector({
  isOpen,
  onClose,
  currentStageId,
  onSelectStage,
  solvedCaseIds,
}: Props) {
  if (!isOpen) return null

  const handleSelect = (stage: CivicStage) => {
    soundManager.playClick()
    onSelectStage(stage)
    onClose()
  }

  const handleClose = () => {
    soundManager.playClose()
    onClose()
  }

  // Calculate overall progress
  const totalCasesAll = CIVIC_STAGES.reduce((acc, s) => acc + s.cases.length, 0)
  const solvedTotal = CIVIC_STAGES.reduce((acc, s) => {
    return acc + s.cases.filter((c) => solvedCaseIds.has(c.id)).length
  }, 0)

  return (
    <div
      className={styles.habboModalBackdrop}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`${styles.habboModalCard} max-w-2xl`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title Bar */}
        <div className={styles.habboModalTitleBar}>
          <div className="flex items-center gap-2">
            <span className={styles.logoBlock} style={{ height: "24px", padding: "0 6px" }}>
              <span className={styles.logoWord} style={{ fontSize: "11px" }}>NAVIGATOR</span>
            </span>
            <span className="font-bold text-xs tracking-wide text-[#092231] font-pixel">
              DAFTAR MISI AGEN KEWARGANEGARAAN
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

        {/* Modal Content */}
        <div className="p-4 sm:p-5 max-h-[75vh] overflow-y-auto space-y-4">
          {/* Overall Stats Banner */}
          <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 border-2 border-black rounded-lg p-3 text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-[0_3px_0_rgba(0,0,0,0.3)]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-400 border-2 border-black flex items-center justify-center text-xl shrink-0">
                🏅
              </div>
              <div>
                <div className="text-[10px] font-pixel text-amber-300">
                  PANGKAT AGEN PANCASILA
                </div>
                <div className="text-sm font-bold">
                  {solvedTotal === totalCasesAll
                    ? "DUTA LUHUR PANCASILA 🌟"
                    : solvedTotal >= 10
                    ? "INSPEKTUR PENYELIDIK HAK ASASI"
                    : "AGEN MUDA CIVICS"}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-black/40 px-3 py-1.5 rounded-lg border border-white/20">
              <div className="text-right">
                <div className="text-[9px] font-pixel text-slate-300">TOTAL PROGRES</div>
                <div className="text-xs font-mono font-bold text-emerald-400">
                  {solvedTotal} / {totalCasesAll} KASUS ({Math.round((solvedTotal / totalCasesAll) * 100)}%)
                </div>
              </div>
            </div>
          </div>

          {/* Stage List */}
          <div className="space-y-2.5">
            <div className="text-[11px] font-pixel text-slate-700 tracking-wider">
              PILIH LOKASI INVESTIGASI:
            </div>

            {CIVIC_STAGES.map((stage, idx) => {
              const solvedInStage = stage.cases.filter((c) => solvedCaseIds.has(c.id)).length
              const isAllSolved = solvedInStage === stage.cases.length
              const isCurrent = stage.id === currentStageId

              return (
                <div
                  key={stage.id}
                  onClick={() => handleSelect(stage)}
                  className={`border-2 border-black rounded-xl p-3 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isCurrent
                      ? "bg-amber-100 shadow-[0_4px_0_#d97706] ring-2 ring-amber-500"
                      : "bg-white hover:bg-slate-50 shadow-[0_3px_0_rgba(0,0,0,0.2)]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Badge Icon */}
                    <div
                      className="w-12 h-12 rounded-lg border-2 border-black flex items-center justify-center text-2xl shrink-0 shadow-sm"
                      style={{ backgroundColor: stage.color + "33" }}
                    >
                      {stage.badge}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-pixel text-[10px] text-slate-500">
                          STAGE 0{idx + 1}
                        </span>
                        {isCurrent && (
                          <span className="bg-amber-500 text-black px-1.5 py-0.2 rounded text-[8px] font-pixel font-bold">
                            LOKASI SAAT INI
                          </span>
                        )}
                        {isAllSolved && (
                          <span className="bg-emerald-600 text-white px-1.5 py-0.2 rounded text-[8px] font-pixel flex items-center gap-1">
                            <CheckCircle2 className="w-2.5 h-2.5" /> SELESAI
                          </span>
                        )}
                      </div>
                      <div className="font-bold text-slate-900 text-sm">
                        {stage.title}
                      </div>
                      <div className="text-xs text-slate-600">
                        {stage.subtitle} ({stage.cases.length} Kasus Pelanggaran/Pengingkaran)
                      </div>
                    </div>
                  </div>

                  {/* Progress & Select Button */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200">
                    <div className="text-left sm:text-right">
                      <div className="text-[10px] font-pixel text-slate-500">KASUS DITEMUKAN</div>
                      <div className="text-xs font-bold font-mono text-slate-900">
                        {solvedInStage} / {stage.cases.length}
                      </div>
                    </div>

                    <button
                      className={`${
                        isCurrent
                          ? styles.pixelButtonYellow
                          : isAllSolved
                          ? styles.pixelButtonGreen
                          : styles.pixelButtonPrimary
                      } px-3 py-1.5 text-xs font-bold rounded flex items-center gap-1 cursor-pointer`}
                    >
                      <span>Masuk</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={handleClose}
              className={`${styles.pixelButtonGray} px-4 py-1.5 text-xs font-bold rounded cursor-pointer`}
            >
              Tutup Navigator
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
