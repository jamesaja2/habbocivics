"use client"

import React from "react"
import { type CivicCase } from "@/lib/civics-data"
import { soundManager } from "@/lib/audio-effects"
import styles from "@/styles/habbo.module.css"
import { CheckCircle2, AlertCircle, Heart } from "lucide-react"

interface Props {
  stageCases: CivicCase[]
  solvedCaseIds: Set<string>
  onSelectCase: (c: CivicCase) => void
}

export default function HabboCivicsFooter({
  stageCases,
  solvedCaseIds,
  onSelectCase,
}: Props) {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 bg-[#0e1a26] border-t-3 border-black text-slate-200 shadow-[0_-4px_0_rgba(0,0,0,0.3)] select-none">
      <div className="max-w-7xl mx-auto px-3 py-1.5 flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Quick Hotspot Quick-Action Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-0.5 sm:pb-0">
          <span className="text-[9px] font-pixel text-slate-400 uppercase hidden md:inline shrink-0">
            HOTSPOT AREA:
          </span>
          {stageCases.map((c, i) => {
            const isSolved = solvedCaseIds.has(c.id)
            return (
              <button
                key={c.id}
                onClick={() => {
                  soundManager.playClick()
                  onSelectCase(c)
                }}
                className={`px-2 py-1 border-2 border-black rounded text-[10px] font-pixel flex items-center gap-1 cursor-pointer transition-transform hover:-translate-y-0.5 shrink-0 ${
                  isSolved
                    ? "bg-emerald-600 text-white shadow-[0_2px_0_#065f46]"
                    : "bg-amber-400 text-amber-950 shadow-[0_2px_0_#92400e]"
                }`}
                title={c.title}
              >
                {isSolved ? (
                  <CheckCircle2 className="w-3 h-3 text-white" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-amber-950 animate-ping" />
                )}
                <span>#{i + 1} {c.shortTitle}</span>
              </button>
            )
          })}
        </div>

        {/* Student Credits (Required) */}
        <div className="flex items-center gap-1.5 text-center sm:text-right shrink-0">
          <span className="text-[10px] text-slate-400 font-sans">
            Powered by
          </span>
          <span className="font-pixel text-[10px] text-[#ffcf4d] tracking-wide border-b border-amber-400/40 pb-0.5">
            James Timothy (XII B2/17) &amp; Karla Jessica Hartono (XII B2/23)
          </span>
        </div>
      </div>
    </footer>
  )
}
