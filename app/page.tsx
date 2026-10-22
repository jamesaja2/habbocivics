"use client"

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { CIVIC_STAGES, type CivicStage, type CivicCase } from "@/lib/civics-data"
import { soundManager } from "@/lib/audio-effects"
import { ChipTune } from "@/lib/chiptune-fallback"
import CivicsIsoCanvas from "@/components/civics-iso-canvas"
import HabboCivicsHeader from "@/components/habbo-civics-header"
import HabboCivicsFooter from "@/components/habbo-civics-footer"
import HabboCaseModal from "@/components/habbo-case-modal"
import HabboNarrator from "@/components/habbo-narrator"
import HabboStageSelector from "@/components/habbo-stage-selector"
import HabboDossierModal from "@/components/habbo-dossier-modal"
import HabboSuccessBanner from "@/components/habbo-success-banner"
import HabboTutorialModal from "@/components/habbo-tutorial-modal"

export default function CivicsGamePage() {
  // Current active stage
  const [currentStage, setCurrentStage] = useState<CivicStage>(CIVIC_STAGES[0])

  // Solved cases set (stored in localStorage without database)
  const [solvedCaseIds, setSolvedCaseIds] = useState<Set<string>>(new Set())

  // Active case for modal inspection
  const [activeCase, setActiveCase] = useState<CivicCase | null>(null)

  // Modals state
  const [isNavigatorOpen, setIsNavigatorOpen] = useState(false)
  const [isDossierOpen, setIsDossierOpen] = useState(false)
  const [isTutorialOpen, setIsTutorialOpen] = useState(false)
  const [showSuccessBanner, setShowSuccessBanner] = useState(false)
  const [dismissedStages, setDismissedStages] = useState<Set<string>>(new Set())

  // Avatar animations
  const [isDancing, setIsDancing] = useState(false)
  const [isWaving, setIsWaving] = useState(false)

  // Audio / Chiptune state
  const [isAudioOn, setIsAudioOn] = useState(false)
  const chipRef = useRef<ChipTune | null>(null)

  // Hydrate solved cases & check tutorial status on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("habbo_civics_solved_ids")
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) {
          setSolvedCaseIds(new Set(parsed))
        }
      }

      const tourDone = localStorage.getItem("habbo_civics_tour_done")
      if (!tourDone) {
        // Automatically open interactive tutorial for new players!
        setIsTutorialOpen(true)
      }
    } catch {
      // Ignored
    }
  }, [])

  // Persist solved cases to localStorage
  const saveSolvedCases = useCallback((newSet: Set<string>) => {
    try {
      localStorage.setItem("habbo_civics_solved_ids", JSON.stringify(Array.from(newSet)))
    } catch {
      // Ignored
    }
  }, [])

  // Check stage completion
  const solvedInCurrentStage = useMemo(() => {
    return currentStage.cases.filter((c) => solvedCaseIds.has(c.id)).length
  }, [currentStage, solvedCaseIds])

  const isCurrentStageCompleted = solvedInCurrentStage === currentStage.cases.length

  // Trigger stage completion banner when all cases solved
  useEffect(() => {
    if (isCurrentStageCompleted && !dismissedStages.has(currentStage.id)) {
      setShowSuccessBanner(true)
    } else {
      setShowSuccessBanner(false)
    }
  }, [isCurrentStageCompleted, currentStage.id, dismissedStages])

  // Audio synthesizer initialization
  useEffect(() => {
    chipRef.current = new ChipTune()
    return () => {
      chipRef.current?.stop()
      chipRef.current = null
    }
  }, [])

  const handleToggleAudio = useCallback(() => {
    if (!chipRef.current) return
    if (isAudioOn) {
      chipRef.current.stop()
      setIsAudioOn(false)
    } else {
      chipRef.current.start()
      setIsAudioOn(true)
    }
  }, [isAudioOn])

  // Case click handler
  const handleSelectCase = useCallback((c: CivicCase) => {
    setActiveCase(c)
  }, [])

  // Mark case as solved
  const handleMarkSolved = useCallback(
    (caseId: string) => {
      setSolvedCaseIds((prev) => {
        const next = new Set(prev)
        next.add(caseId)
        saveSolvedCases(next)
        return next
      })
    },
    [saveSolvedCases]
  )

  // Stage switcher
  const handleSelectStage = useCallback((stage: CivicStage) => {
    setCurrentStage(stage)
    setActiveCase(null)
    setShowSuccessBanner(false)
  }, [])

  // Move to next stage
  const handleNextStage = useCallback(() => {
    const currentIndex = CIVIC_STAGES.findIndex((s) => s.id === currentStage.id)
    if (currentIndex < CIVIC_STAGES.length - 1) {
      soundManager.playClick()
      const nextStage = CIVIC_STAGES[currentIndex + 1]
      setCurrentStage(nextStage)
      setShowSuccessBanner(false)
    }
  }, [currentStage.id])

  // Total stats overall
  const totalCasesAll = useMemo(() => {
    return CIVIC_STAGES.reduce((acc, s) => acc + s.cases.length, 0)
  }, [])

  const totalSolvedOverall = useMemo(() => {
    return CIVIC_STAGES.reduce((acc, s) => {
      return acc + s.cases.filter((c) => solvedCaseIds.has(c.id)).length
    }, 0)
  }, [solvedCaseIds])

  const isLastStage = CIVIC_STAGES[CIVIC_STAGES.length - 1].id === currentStage.id

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#121f2d] flex flex-col font-sans">
      {/* Gamification Top Header */}
      <HabboCivicsHeader
        currentStage={currentStage}
        totalSolvedInStage={solvedInCurrentStage}
        totalCasesInStage={currentStage.cases.length}
        totalSolvedOverall={totalSolvedOverall}
        totalCasesOverall={totalCasesAll}
        onOpenStageNavigator={() => setIsNavigatorOpen(true)}
        onOpenDossier={() => setIsDossierOpen(true)}
        onOpenTutorial={() => setIsTutorialOpen(true)}
        isAudioOn={isAudioOn}
        onToggleAudio={handleToggleAudio}
        isDancing={isDancing}
        onToggleDance={() => setIsDancing((v) => !v)}
        isWaving={isWaving}
        onToggleWave={() => setIsWaving((v) => !v)}
      />

      {/* Main Isometric Map Area (Habbo Hotel Virtual Room) */}
      <section className="relative flex-1 w-full pt-14 pb-12 overflow-hidden">
        <CivicsIsoCanvas
          currentStage={currentStage}
          solvedCaseIds={solvedCaseIds}
          onSelectCase={handleSelectCase}
          selfName="Agen Pancasila"
          dancing={isDancing}
          waving={isWaving}
        />
      </section>

      {/* Narrator: Inspektur Frank (Habbo NPC) */}
      <HabboNarrator
        currentStageTitle={currentStage.title}
        introText={currentStage.narratorIntro}
        successText={currentStage.narratorSuccess}
        isStageCompleted={isCurrentStageCompleted}
        totalCases={currentStage.cases.length}
        solvedCount={solvedInCurrentStage}
        onHintClick={() => setIsDossierOpen(true)}
        onOpenTutorial={() => setIsTutorialOpen(true)}
      />

      {/* Retro Success Banner (Shown when all cases in stage are found) */}
      {showSuccessBanner && (
        <HabboSuccessBanner
          stageTitle={currentStage.title}
          environmentName={currentStage.environmentName}
          isLastStage={isLastStage}
          onNextStage={handleNextStage}
          onOpenDossier={() => setIsDossierOpen(true)}
          onDismiss={() => {
            setShowSuccessBanner(false)
            setDismissedStages((prev) => new Set(prev).add(currentStage.id))
          }}
        />
      )}

      {/* Retro Habbo Case Pop-up Modal with Interactive Detective Challenge */}
      {activeCase && (
        <HabboCaseModal
          caseData={activeCase}
          isSolved={solvedCaseIds.has(activeCase.id)}
          onClose={() => setActiveCase(null)}
          onMarkSolved={handleMarkSolved}
        />
      )}

      {/* Onboarding Interactive Tour / Tutorial Modal */}
      <HabboTutorialModal
        isOpen={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
      />

      {/* Stage Selector / Navigator Modal */}
      <HabboStageSelector
        isOpen={isNavigatorOpen}
        onClose={() => setIsNavigatorOpen(false)}
        currentStageId={currentStage.id}
        onSelectStage={handleSelectStage}
        solvedCaseIds={solvedCaseIds}
      />

      {/* Case Dossier Modal */}
      <HabboDossierModal
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
        currentStage={currentStage}
        solvedCaseIds={solvedCaseIds}
        onOpenCase={(c) => {
          setIsDossierOpen(false)
          setActiveCase(c)
        }}
      />

      {/* Retro Bottom Footer with Student Credits */}
      <HabboCivicsFooter
        stageCases={currentStage.cases}
        solvedCaseIds={solvedCaseIds}
        onSelectCase={handleSelectCase}
      />
    </main>
  )
}
