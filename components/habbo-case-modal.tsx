"use client"

import React, { useState, useEffect } from "react"
import { type CivicCase } from "@/lib/civics-data"
import { soundManager } from "@/lib/audio-effects"
import styles from "@/styles/habbo.module.css"
import {
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  Sparkles,
  BookOpen,
  Lightbulb,
  X,
  HelpCircle,
  Award,
  RotateCcw,
} from "lucide-react"

interface Props {
  caseData: CivicCase | null
  isSolved: boolean
  onClose: () => void
  onMarkSolved?: (id: string) => void
}

export default function HabboCaseModal({
  caseData,
  isSolved,
  onClose,
  onMarkSolved,
}: Props) {
  // Active modal tab: "info" | "challenge"
  const [activeTab, setActiveTab] = useState<"info" | "challenge">("info")
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isAnswerChecked, setIsAnswerChecked] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  // Reset challenge state when case changes
  useEffect(() => {
    setActiveTab(isSolved ? "info" : "info")
    setSelectedOption(null)
    setIsAnswerChecked(false)
    setIsCorrect(false)
  }, [caseData?.id, isSolved])

  // ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        soundManager.playClose()
        onClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  if (!caseData) return null

  const getBadgeClass = (category: CivicCase["category"]) => {
    if (category === "Pelanggaran Hak Warga Negara") return styles.badgeViolation
    if (category === "Pengingkaran Kewajiban Warga Negara") return styles.badgeObligation
    return styles.badgeBoth
  }

  const handleClose = () => {
    soundManager.playClose()
    onClose()
  }

  const handleCheckAnswer = () => {
    if (selectedOption === null) return

    if (selectedOption === caseData.correctOptionIndex) {
      soundManager.playCaseDiscovered()
      setIsCorrect(true)
      setIsAnswerChecked(true)
    } else {
      soundManager.playClick()
      setIsCorrect(false)
      setIsAnswerChecked(true)
    }
  }

  const handleFinalSolve = () => {
    soundManager.playStageComplete()
    onMarkSolved?.(caseData.id)
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
        className={`${styles.habboModalCard} max-w-xl w-full`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title Bar */}
        <div className={styles.habboModalTitleBar}>
          <div className="flex items-center gap-2">
            <span className={styles.logoBlock} style={{ height: "24px", padding: "0 6px" }}>
              <span className={styles.logoWord} style={{ fontSize: "11px" }}>HABBO CIVICS</span>
            </span>
            <span className="font-bold text-xs tracking-wide text-[#092231] font-pixel truncate max-w-[200px] sm:max-w-[340px]">
              DOKUMEN #{caseData.id.replace("case-", "")}
            </span>
          </div>

          <button
            onClick={handleClose}
            className={`${styles.closeBtn} h-6 w-6 flex items-center justify-center cursor-pointer`}
            title="Tutup (Esc)"
            aria-label="Tutup Modal"
          >
            <span className={styles.closeIcon} />
          </button>
        </div>

        {/* Habbo Sub-Tab Navigation */}
        <div className="bg-[#b6d5e9] border-b-2 border-black px-3 pt-2 flex items-center gap-2">
          <button
            onClick={() => setActiveTab("info")}
            className={`px-3 py-1.5 font-pixel text-xs font-bold rounded-t-lg border-2 border-b-0 border-black transition-all cursor-pointer ${
              activeTab === "info"
                ? "bg-[#eef6fb] text-slate-900 translate-y-0.5"
                : "bg-[#9ec3d8] text-slate-700 hover:bg-[#aed1e4]"
            }`}
          >
            📑 Laporan Kasus
          </button>

          <button
            onClick={() => setActiveTab("challenge")}
            className={`px-3 py-1.5 font-pixel text-xs font-bold rounded-t-lg border-2 border-b-0 border-black transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "challenge"
                ? "bg-[#eef6fb] text-amber-900 translate-y-0.5"
                : "bg-amber-200 text-amber-900 hover:bg-amber-300"
            }`}
          >
            <span>⚡ Tantangan Analisis</span>
            {isSolved ? (
              <span className="bg-emerald-600 text-white text-[8px] px-1 rounded">SELESAI</span>
            ) : (
              <span className="bg-rose-600 text-white text-[8px] px-1 rounded animate-pulse">KUIS</span>
            )}
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 max-h-[75vh] overflow-y-auto space-y-4 text-slate-800 text-sm bg-[#eef6fb]">
          {activeTab === "info" ? (
            /* TAB 1: LAPORAN KASUS LENGKAP */
            <>
              {/* Header Card */}
              <div className="bg-[#ffffff] border-2 border-black rounded-lg p-3 shadow-[0_2px_0_rgba(0,0,0,0.15)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] font-pixel text-slate-500 uppercase tracking-widest">
                    Laporan Investigasi Kewarganegaraan
                  </div>
                  <h2 className="text-base sm:text-lg font-black text-slate-900 leading-snug font-sans">
                    {caseData.title}
                  </h2>
                </div>

                {isSolved ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 border-2 border-emerald-600 rounded-full text-emerald-800 font-pixel text-xs shrink-0 self-start sm:self-auto">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    TERPECAHKAN
                  </span>
                ) : (
                  <button
                    onClick={() => setActiveTab("challenge")}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-200 border-2 border-amber-600 rounded-full text-amber-950 font-pixel text-xs shrink-0 self-start sm:self-auto animate-bounce cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                    Ikuti Uji Analisis
                  </button>
                )}
              </div>

              {/* Status & Kategori Badge */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-pixel text-slate-700 tracking-wider">
                  STATUS &amp; KATEGORI:
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`${styles.habboBadge} ${getBadgeClass(caseData.category)} text-xs sm:text-sm`}>
                    <ShieldAlert className="w-4 h-4" />
                    {caseData.category}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-100 border-2 border-blue-500 rounded-md text-[11px] font-bold text-blue-900">
                    ⭐ {caseData.pancasilaSila}
                  </span>
                </div>
              </div>

              {/* Dasar Hukum Box */}
              <div className="bg-amber-50/90 border-2 border-amber-400 rounded-lg p-3 shadow-inner">
                <div className="flex items-center gap-1.5 text-amber-900 font-bold text-xs mb-1">
                  <BookOpen className="w-4 h-4 text-amber-700" />
                  <span>Dasar Hukum Konstitusi RI &amp; Perundang-undangan:</span>
                </div>
                <p className="text-xs text-amber-950 font-medium leading-relaxed font-sans">
                  {caseData.legalBasis}
                </p>
              </div>

              {/* Deskripsi Kasus */}
              <div className={styles.habboSectionBox}>
                <div className="text-xs font-bold text-slate-900 mb-1.5 flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-blue-500 rounded-sm" />
                  <span>Deskripsi Kasus &amp; Pelanggaran:</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                  {caseData.description}
                </p>
              </div>

              {/* Dampak Nyata Box */}
              <div className="bg-rose-50 border-2 border-rose-300 rounded-lg p-3">
                <div className="text-xs font-bold text-rose-900 mb-1 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Dampak Terhadap Hak Orang Lain &amp; Kehidupan Berbangsa:</span>
                </div>
                <p className="text-xs text-rose-950 leading-relaxed font-sans">
                  {caseData.impact}
                </p>
              </div>

              {/* Gagasan Solutif Box (Core Educational Requirement) */}
              <div className="bg-emerald-50 border-2 border-emerald-400 rounded-lg p-3 shadow-[0_2px_0_rgba(16,185,129,0.2)]">
                <div className="text-xs font-bold text-emerald-950 mb-1 flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <span className="font-pixel text-[11px] text-emerald-900">
                    GAGASAN SOLUTIF &amp; REKOMENDASI PANCASILA:
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed bg-white/70 p-2.5 rounded border border-emerald-200 font-sans">
                  💡 {caseData.solutifIdea}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col-reverse sm:flex-row items-center justify-between gap-2 border-t-2 border-slate-300">
                <button
                  onClick={handleClose}
                  className={`${styles.pixelButtonGray} w-full sm:w-auto px-5 py-2 text-xs font-bold rounded cursor-pointer`}
                >
                  Tutup Laporan
                </button>

                {!isSolved ? (
                  <button
                    onClick={() => setActiveTab("challenge")}
                    className={`${styles.pixelButtonYellow} w-full sm:w-auto px-5 py-2 text-xs font-bold rounded flex items-center justify-center gap-2 cursor-pointer shadow-md`}
                  >
                    <Sparkles className="w-4 h-4" />
                    Lanjut ke Tantangan Detektif ⚡
                  </button>
                ) : (
                  <button
                    onClick={handleClose}
                    className={`${styles.pixelButtonGreen} w-full sm:w-auto px-5 py-2 text-xs font-bold rounded flex items-center justify-center gap-1.5 cursor-pointer`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Kasus Selesai
                  </button>
                )}
              </div>
            </>
          ) : (
            /* TAB 2: TANTANGAN ANALISIS DETEKTIF INTERAKTIF */
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-amber-100 to-amber-200 border-2 border-black rounded-lg p-3 shadow-[0_2px_0_rgba(0,0,0,0.15)]">
                <div className="flex items-center gap-2 text-amber-900 font-pixel text-xs mb-1">
                  <Award className="w-4 h-4 text-amber-700" />
                  <span>TANTANGAN UJI KASUS AGEN CIVICS</span>
                </div>
                <p className="text-xs text-amber-950 font-medium">
                  Jawab pertanyaan berikut berdasarkan pemahaman konstitusi dan nilai-nilai Pancasila untuk memverifikasi investigasimu!
                </p>
              </div>

              {/* Question Card */}
              <div className="bg-white border-2 border-black rounded-xl p-4 shadow-[0_3px_0_rgba(0,0,0,0.15)]">
                <div className="text-[10px] font-pixel text-blue-600 uppercase mb-1">
                  PERTANYAAN INVESTIGASI:
                </div>
                <h3 className="font-bold text-sm sm:text-base text-slate-900 mb-3 leading-snug">
                  {caseData.quizQuestion}
                </h3>

                {/* Options List */}
                <div className="space-y-2">
                  {caseData.quizOptions.map((opt, idx) => {
                    const isChosen = selectedOption === idx
                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          if (!isAnswerChecked) {
                            soundManager.playClick()
                            setSelectedOption(idx)
                          }
                        }}
                        className={`p-3 border-2 rounded-lg transition-all cursor-pointer flex items-start gap-3 ${
                          isChosen
                            ? "border-black bg-blue-100 shadow-[0_3px_0_#2563eb]"
                            : "border-slate-300 bg-slate-50 hover:bg-white hover:border-slate-400"
                        }`}
                      >
                        <span
                          className={`w-6 h-6 rounded-md border-2 border-black flex items-center justify-center text-xs font-pixel font-bold shrink-0 ${
                            isChosen ? "bg-blue-600 text-white" : "bg-white text-slate-700"
                          }`}
                        >
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="text-xs sm:text-sm text-slate-800 leading-relaxed font-sans">
                          {opt}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Result Feedback Banner */}
              {isAnswerChecked && (
                <div
                  className={`border-2 border-black rounded-xl p-3.5 ${
                    isCorrect
                      ? "bg-emerald-100 text-emerald-950 shadow-[0_3px_0_#059669]"
                      : "bg-rose-100 text-rose-950 shadow-[0_3px_0_#e11d48]"
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold font-pixel text-xs mb-1">
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        <span>ANALISIS TEPAT! KASUS TERPECAHKAN 🎉</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-5 h-5 text-rose-600" />
                        <span>JAWABAN BELUM TEPAT! COBA LAGI ⚠️</span>
                      </>
                    )}
                  </div>
                  <p className="text-xs leading-relaxed font-sans mt-1">
                    {caseData.quizExplanation}
                  </p>
                </div>
              )}

              {/* Challenge Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-2 border-t-2 border-slate-300">
                <button
                  onClick={() => setActiveTab("info")}
                  className={`${styles.pixelButtonGray} w-full sm:w-auto px-4 py-2 text-xs font-bold rounded cursor-pointer`}
                >
                  Lihat Kembali Laporan
                </button>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  {!isAnswerChecked ? (
                    <button
                      onClick={handleCheckAnswer}
                      disabled={selectedOption === null}
                      className={`${styles.pixelButtonYellow} w-full sm:w-auto px-5 py-2 text-xs font-bold rounded flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50`}
                    >
                      <span>Periksa Analisis</span>
                      <Sparkles className="w-4 h-4" />
                    </button>
                  ) : !isCorrect ? (
                    <button
                      onClick={() => {
                        setIsAnswerChecked(false)
                        setSelectedOption(null)
                      }}
                      className={`${styles.pixelButtonPrimary} w-full sm:w-auto px-4 py-2 text-xs font-bold rounded flex items-center justify-center gap-1.5 cursor-pointer`}
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Ulangi Pertanyaan</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleFinalSolve}
                      className={`${styles.pixelButtonGreen} w-full sm:w-auto px-5 py-2 text-xs font-bold rounded flex items-center justify-center gap-2 cursor-pointer shadow-lg`}
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Tandai Terpecahkan (+1 Poin)</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
