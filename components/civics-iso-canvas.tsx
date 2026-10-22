"use client"

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { projectIso, unprojectIso, type IsoProjectParams } from "@/lib/iso"
import { aStar } from "@/lib/pathfinding"
import { type CivicStage, type CivicCase } from "@/lib/civics-data"
import { soundManager } from "@/lib/audio-effects"
import { palette } from "@/lib/palette"
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react"

type Props = {
  currentStage: CivicStage
  solvedCaseIds: Set<string>
  onSelectCase: (c: CivicCase) => void
  selfName?: string
  dancing?: boolean
  waving?: boolean
  sitting?: boolean
  onAvatarMove?: (pos: { x: number; y: number }) => void
}

type Avatar = { x: number; y: number; facing: "N" | "S" | "E" | "W" }
type Grid = { cols: number; rows: number; walkable: boolean[] }

function idx(x: number, y: number, cols: number) {
  return y * cols + x
}
function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v))
}

function computeCenteredOrigin(w: number, h: number, cols: number, rows: number, tileW: number, tileH: number) {
  const hw = tileW / 2, hh = tileH / 2
  const corners = [
    { px: (0 - 0) * hw, py: (0 + 0) * hh },
    { px: (cols - 1 - 0) * hw, py: (cols - 1 + 0) * hh },
    { px: (0 - (rows - 1)) * hw, py: (0 + (rows - 1)) * hh },
    { px: (cols - 1 - (rows - 1)) * hw, py: (cols - 1 + (rows - 1)) * hh },
  ]
  const minX = Math.min(...corners.map((c) => c.px - hw))
  const maxX = Math.max(...corners.map((c) => c.px + hw))
  const minY = Math.min(...corners.map((c) => c.py))
  const maxY = Math.max(...corners.map((c) => c.py + tileH))
  const originX = Math.round(w / 2 - (minX + maxX) / 2)
  const originY = Math.round(h / 2 - (minY + maxY) / 2) - 8
  return { x: originX, y: originY }
}

export default function CivicsIsoCanvas({
  currentStage,
  solvedCaseIds,
  onSelectCase,
  selfName = "Agen Pancasila",
  dancing = false,
  waving = false,
  sitting = false,
  onAvatarMove,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [size, setSize] = useState({ w: 800, h: 560 })

  // Avatar state
  const [avatar, setAvatar] = useState<Avatar>({ x: 8, y: 8, facing: "S" })
  const pathRef = useRef<{ nodes: { x: number; y: number }[]; progress: number } | null>(null)
  const animRef = useRef(0)
  const heldDirRef = useRef<{ dx: number; dy: number; facing: Avatar["facing"] } | null>(null)

  // Hotspot interaction targets
  const hotspotsRef = useRef<{ id: string; caseData: CivicCase; px: number; py: number; r: number }[]>([])
  const [hoveredCase, setHoveredCase] = useState<CivicCase | null>(null)
  const [hoverPos, setHoverPos] = useState<{ x: number; y: number } | null>(null)

  const tileW = 56
  const tileH = 28
  const cols = 18
  const rows = 16

  // Grid setup
  const grid: Grid = useMemo(() => {
    const walkable = new Array(cols * rows).fill(true)
    const block = (x: number, y: number) => {
      if (x >= 0 && y >= 0 && x < cols && y < rows) walkable[idx(x, y, cols)] = false
    }

    // Outer border walls
    for (let x = 0; x < cols; x++) {
      walkable[idx(x, 0, cols)] = false
      walkable[idx(x, rows - 1, cols)] = false
    }
    for (let y = 0; y < rows; y++) {
      walkable[idx(0, y, cols)] = false
      walkable[idx(cols - 1, y, cols)] = false
    }

    if (currentStage.roomPreset === "Park") {
      // Fountain in middle
      for (let y = 7; y <= 9; y++) for (let x = 8; x <= 10; x++) block(x, y)
      // Trees
      ;[[2, 2], [15, 2], [2, 13], [15, 13], [13, 3]].forEach(([x, y]) => block(x, y))
    } else if (currentStage.roomPreset === "Forest") {
      for (let y = 1; y < rows - 1; y++) block(15, y)
      ;[[3, 3], [4, 3], [7, 2], [11, 2], [2, 10], [6, 12]].forEach(([x, y]) => block(x, y))
    } else if (currentStage.roomPreset === "Cyber") {
      for (let x = 3; x <= 6; x++) block(x, 3)
      for (let x = 11; x <= 14; x++) block(x, 3)
      for (let x = 5; x <= 8; x++) block(x, 8)
    } else if (currentStage.roomPreset === "School") {
      for (let x = 6; x <= 11; x++) block(x, 2)
      ;[[4, 6], [7, 6], [10, 6], [13, 6], [4, 9], [7, 9], [10, 9], [13, 9]].forEach(([x, y]) => block(x, y))
    } else if (currentStage.roomPreset === "Civic") {
      for (let x = 4; x <= 13; x++) block(x, 4)
      ;[[5, 8], [6, 8], [7, 8], [10, 8], [11, 8], [12, 8]].forEach(([x, y]) => block(x, y))
    }

    return { cols, rows, walkable }
  }, [currentStage.roomPreset])

  // Resize observer
  useEffect(() => {
    if (!containerRef.current) return
    const ro = new ResizeObserver((entries) => {
      const cr = entries[0].contentRect
      if (cr.width > 0 && cr.height > 0) {
        setSize({ w: Math.floor(cr.width), h: Math.floor(cr.height) })
      }
    })
    ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  // Reset avatar on stage change
  useEffect(() => {
    setAvatar({ x: 9, y: 9, facing: "S" })
    pathRef.current = null
  }, [currentStage.id])

  // Move avatar one step
  const tryMoveOne = useCallback(
    (dx: number, dy: number) => {
      const sx = Math.round(avatar.x)
      const sy = Math.round(avatar.y)
      const nx = clamp(sx + dx, 1, grid.cols - 2)
      const ny = clamp(sy + dy, 1, grid.rows - 2)
      if (!grid.walkable[idx(nx, ny, grid.cols)]) return false
      pathRef.current = { nodes: [{ x: sx, y: sy }, { x: nx, y: ny }], progress: 0 }
      const facing: Avatar["facing"] = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? "E" : "W") : dy > 0 ? "S" : "N"
      setAvatar((a) => ({ ...a, facing }))
      return true
    },
    [avatar.x, avatar.y, grid]
  )

  // Keyboard navigation
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const active = document.activeElement as HTMLElement | null
      const tag = active?.tagName?.toLowerCase()
      if (active?.isContentEditable || tag === "input" || tag === "textarea") return

      const map: Record<string, { dx: number; dy: number; facing: Avatar["facing"] }> = {
        ArrowUp: { dx: 0, dy: -1, facing: "N" },
        w: { dx: 0, dy: -1, facing: "N" },
        ArrowDown: { dx: 0, dy: 1, facing: "S" },
        s: { dx: 0, dy: 1, facing: "S" },
        ArrowLeft: { dx: -1, dy: 0, facing: "W" },
        a: { dx: -1, dy: 0, facing: "W" },
        ArrowRight: { dx: 1, dy: 0, facing: "E" },
        d: { dx: 1, dy: 0, facing: "E" },
      }
      const m = map[e.key]
      if (!m) return
      e.preventDefault()
      heldDirRef.current = m
      if (!pathRef.current) tryMoveOne(m.dx, m.dy)
    }

    const up = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "a", "s", "d"].includes(e.key)) {
        heldDirRef.current = null
      }
    }

    window.addEventListener("keydown", down)
    window.addEventListener("keyup", up)
    return () => {
      window.removeEventListener("keydown", down)
      window.removeEventListener("keyup", up)
    }
  }, [tryMoveOne])

  // Canvas Click handling
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const px = e.clientX - rect.left
      const py = e.clientY - rect.top

      // 1. Check direct hotspot pin hit (large generous radius: 34px)
      const hit = hotspotsRef.current.find((h) => {
        const dx = px - h.px
        const dy = py - h.py
        return Math.hypot(dx, dy) <= h.r
      })

      // 2. Unproject isometric coords
      const origin = computeCenteredOrigin(size.w, size.h, grid.cols, grid.rows, tileW, tileH)
      const params: IsoProjectParams = { tileW, tileH, originX: origin.x, originY: origin.y }
      const { tx, ty } = unprojectIso(px, py, params)

      // Also check if user clicked on or right next to a case's tile
      const tileHit = currentStage.cases.find(
        (c) => Math.abs(c.tileCoord.x - tx) <= 1 && Math.abs(c.tileCoord.y - ty) <= 1
      )

      const targetCase = hit ? hit.caseData : tileHit

      if (targetCase) {
        soundManager.playClick()
        const targetX = clamp(targetCase.tileCoord.x, 1, grid.cols - 2)
        const targetY = clamp(targetCase.tileCoord.y + 1, 1, grid.rows - 2)
        const sx = Math.round(avatar.x)
        const sy = Math.round(avatar.y)
        const path = aStar({ x: sx, y: sy }, { x: targetX, y: targetY }, grid.cols, grid.rows, (x, y) =>
          grid.walkable[idx(x, y, grid.cols)]
        )
        if (path.length > 1) {
          pathRef.current = { nodes: path, progress: 0 }
        }
        onSelectCase(targetCase)
        return
      }

      // Normal movement to tile
      const clampedTx = clamp(tx, 1, grid.cols - 2)
      const clampedTy = clamp(ty, 1, grid.rows - 2)

      if (!grid.walkable[idx(clampedTx, clampedTy, grid.cols)]) return

      const sx = Math.round(avatar.x)
      const sy = Math.round(avatar.y)
      const path = aStar({ x: sx, y: sy }, { x: clampedTx, y: clampedTy }, grid.cols, grid.rows, (x, y) =>
        grid.walkable[idx(x, y, grid.cols)]
      )
      if (path.length > 1) {
        soundManager.playClick()
        pathRef.current = { nodes: path, progress: 0 }
        const first = path[1]
        const dx = first.x - sx
        const dy = first.y - sy
        const facing: Avatar["facing"] = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? "E" : "W") : dy > 0 ? "S" : "N"
        setAvatar((a) => ({ ...a, facing }))
      }
    },
    [avatar.x, avatar.y, currentStage.cases, grid, onSelectCase, size.h, size.w, tileH, tileW]
  )

  // Mouse move for hover detection
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = e.clientX - rect.left
    const py = e.clientY - rect.top

    const hit = hotspotsRef.current.find((h) => {
      const dx = px - h.px
      const dy = py - h.py
      return Math.hypot(dx, dy) <= h.r
    })

    if (hit) {
      setHoveredCase(hit.caseData)
      setHoverPos({ x: hit.px, y: hit.py })
    } else {
      setHoveredCase(null)
      setHoverPos(null)
    }
  }, [])

  // Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let raf = 0
    let lastTime = performance.now()

    function loop(now: number) {
      const dt = Math.min(0.05, (now - lastTime) / 1000)
      lastTime = now

      const pr = pathRef.current
      const speedTilesPerSec = 3.6
      const moving = !!(pr && pr.nodes && pr.nodes.length > 1)
      animRef.current += dt * (moving ? 8 : 3)

      if (moving && pr) {
        pr.progress += speedTilesPerSec * dt
        const maxProgress = pr.nodes.length - 1
        if (pr.progress >= maxProgress) {
          const last = pr.nodes[pr.nodes.length - 1]
          if (last) {
            setAvatar((a) => ({ ...a, x: last.x, y: last.y }))
            onAvatarMove?.({ x: last.x, y: last.y })
          }
          pathRef.current = null
        } else {
          const segIndex = Math.floor(pr.progress)
          const t = pr.progress - segIndex
          const n1 = pr.nodes[segIndex]
          const n2 = pr.nodes[segIndex + 1]
          if (n1 && n2) {
            const curX = n1.x + (n2.x - n1.x) * t
            const curY = n1.y + (n2.y - n1.y) * t
            const dx = n2.x - n1.x
            const dy = n2.y - n1.y
            const facing: Avatar["facing"] = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? "E" : "W") : dy > 0 ? "S" : "N"
            setAvatar({ x: curX, y: curY, facing })
            onAvatarMove?.({ x: curX, y: curY })
          }
        }
      } else if (heldDirRef.current) {
        tryMoveOne(heldDirRef.current.dx, heldDirRef.current.dy)
      }

      ctx.clearRect(0, 0, size.w, size.h)

      // Draw Sky
      drawSky(ctx, size.w, size.h, currentStage.roomPreset)

      const origin = computeCenteredOrigin(size.w, size.h, grid.cols, grid.rows, tileW, tileH)
      const params: IsoProjectParams = { tileW, tileH, originX: origin.x, originY: origin.y }

      // 1. Draw Floor Tiles
      drawFloor(ctx, grid, params, tileW, tileH, currentStage.roomPreset)

      // 2. Draw Walls
      drawWalls(ctx, grid, params, tileW, tileH, currentStage.roomPreset)

      // 3. Draw Scenery (fountain, trees, tables)
      drawScenery(ctx, currentStage.roomPreset, params, tileW, tileH, animRef.current)

      // 4. Draw Animated Case Visualisations & Hotspot Pins
      hotspotsRef.current = []
      drawCaseHotspots(
        ctx,
        currentStage.cases,
        solvedCaseIds,
        params,
        animRef.current,
        hotspotsRef.current
      )

      // 5. Draw Authentic Habbo Avatar
      const { px: ax, py: ay } = projectIso(avatar.x, avatar.y, params)
      const walking = moving || !!heldDirRef.current
      drawHabboAvatar(
        ctx,
        ax,
        ay,
        tileW,
        tileH,
        avatar.facing,
        animRef.current,
        walking,
        "#2563eb", // blue agent uniform
        dancing,
        sitting,
        waving
      )

      // Avatar Nameplate
      drawNameplate(ctx, ax, ay - 38, selfName)

      raf = requestAnimationFrame(loop)
    }

    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [avatar.facing, avatar.x, avatar.y, currentStage, grid, onAvatarMove, selfName, size.h, size.w, solvedCaseIds, dancing, waving, sitting, tryMoveOne])

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden bg-[#182635] select-none">
      <canvas
        ref={canvasRef}
        width={size.w}
        height={size.h}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        className="block w-full h-full cursor-pointer touch-none"
        aria-label="Tampilan Isometrik Interaktif"
      />

      {/* Floating Hover Card for Hotspot */}
      {hoveredCase && hoverPos && (
        <div
          className="absolute z-30 pointer-events-none transform -translate-x-1/2 -translate-y-full mb-3"
          style={{ left: hoverPos.x, top: hoverPos.y }}
        >
          <div className="bg-[#ffffff] border-2 border-black rounded-lg px-2.5 py-1.5 shadow-[0_4px_0_rgba(0,0,0,0.5)] flex items-center gap-2 animate-bounce">
            <span className="text-base">
              {solvedCaseIds.has(hoveredCase.id) ? "✅" : "🔍"}
            </span>
            <div>
              <div className="text-[9px] font-pixel text-slate-500 uppercase tracking-tighter">
                KLIK UNTUK INVESTIGASI
              </div>
              <div className="text-xs font-bold text-slate-900 whitespace-nowrap">
                {hoveredCase.shortTitle}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Virtual Touch D-Pad */}
      <div className="absolute bottom-4 left-4 z-30 md:hidden flex flex-col items-center bg-black/60 p-2 rounded-2xl border-2 border-white/20 backdrop-blur-sm">
        <button
          onClick={() => tryMoveOne(0, -1)}
          className="w-10 h-10 bg-amber-400 active:bg-amber-500 border-2 border-black rounded-lg flex items-center justify-center font-bold shadow text-black"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
        <div className="flex gap-2 my-1">
          <button
            onClick={() => tryMoveOne(-1, 0)}
            className="w-10 h-10 bg-amber-400 active:bg-amber-500 border-2 border-black rounded-lg flex items-center justify-center font-bold shadow text-black"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="w-10 h-10 flex items-center justify-center text-[10px] font-pixel text-amber-200">
            DPAD
          </div>
          <button
            onClick={() => tryMoveOne(1, 0)}
            className="w-10 h-10 bg-amber-400 active:bg-amber-500 border-2 border-black rounded-lg flex items-center justify-center font-bold shadow text-black"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
        <button
          onClick={() => tryMoveOne(0, 1)}
          className="w-10 h-10 bg-amber-400 active:bg-amber-500 border-2 border-black rounded-lg flex items-center justify-center font-bold shadow text-black"
        >
          <ArrowDown className="w-5 h-5" />
        </button>
      </div>

      {/* Controls Hint in bottom-right */}
      <div className="absolute bottom-3 right-3 z-20 pointer-events-none hidden sm:flex items-center gap-2 bg-black/70 backdrop-blur-sm border-2 border-black text-white px-3 py-1.5 rounded-full text-[10px] font-pixel shadow-md">
        <span className="text-amber-400">⌨ WASD / Tap Ubin</span>
        <span>•</span>
        <span>Klik Objek untuk Investigasi</span>
      </div>
    </div>
  )
}

/* ========================================================================= */
/* GRAPHICS & RENDERING ENGINE                                               */
/* ========================================================================= */

function drawSky(ctx: CanvasRenderingContext2D, w: number, h: number, preset: CivicStage["roomPreset"]) {
  const g = ctx.createLinearGradient(0, 0, 0, h)
  if (preset === "Park") {
    g.addColorStop(0, "#bae6fd")
    g.addColorStop(1, "#38bdf8")
  } else if (preset === "Forest") {
    g.addColorStop(0, "#7dd3fc")
    g.addColorStop(1, "#0369a1")
  } else if (preset === "Cyber") {
    g.addColorStop(0, "#090d16")
    g.addColorStop(1, "#1e1b4b")
  } else if (preset === "School") {
    g.addColorStop(0, "#fed7aa")
    g.addColorStop(1, "#f97316")
  } else {
    // Civic
    g.addColorStop(0, "#e2e8f0")
    g.addColorStop(1, "#94a3b8")
  }
  ctx.fillStyle = g
  ctx.fillRect(0, 0, w, h)
}

function drawFloor(
  ctx: CanvasRenderingContext2D,
  grid: Grid,
  params: IsoProjectParams,
  tileW: number,
  tileH: number,
  preset: CivicStage["roomPreset"]
) {
  for (let y = 0; y < grid.rows; y++) {
    for (let x = 0; x < grid.cols; x++) {
      const { px, py } = projectIso(x, y, params)
      const walk = grid.walkable[idx(x, y, grid.cols)]
      const isCheck = (x + y) % 2 === 0

      let fillA = "#78b871"
      let fillB = "#86c87f"
      let blockFill = "#4a7c43"

      if (preset === "Park") {
        fillA = isCheck ? "#78b871" : "#86c87f"
        fillB = isCheck ? "#86c87f" : "#78b871"
        // Stone pavement pathway in center
        if (x === 8 || x === 9 || y === 7 || y === 8) {
          fillA = isCheck ? "#cbd5e1" : "#e2e8f0"
        }
        blockFill = "#3f6212"
      } else if (preset === "Forest") {
        fillA = isCheck ? "#3f6212" : "#365314"
        fillB = isCheck ? "#4d7c0f" : "#3f6212"
        if (x === 15) {
          fillA = "#0284c7" // River
        }
        blockFill = "#14532d"
      } else if (preset === "Cyber") {
        fillA = isCheck ? "#0f172a" : "#1e293b"
        fillB = isCheck ? "#1e293b" : "#0f172a"
        blockFill = "#020617"
      } else if (preset === "School") {
        fillA = isCheck ? "#d97706" : "#b45309"
        fillB = isCheck ? "#b45309" : "#d97706"
        blockFill = "#78350f"
      } else {
        fillA = isCheck ? "#f1f5f9" : "#e2e8f0"
        fillB = isCheck ? "#e2e8f0" : "#f1f5f9"
        blockFill = "#64748b"
      }

      drawTile(ctx, px, py, tileW, tileH, walk ? fillA : blockFill, "#000000")
    }
  }
}

function drawTile(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  tileW: number,
  tileH: number,
  fill: string,
  stroke: string
) {
  const hw = tileW / 2
  const hh = tileH / 2
  ctx.beginPath()
  ctx.moveTo(Math.round(px), Math.round(py))
  ctx.lineTo(Math.round(px + hw), Math.round(py + hh))
  ctx.lineTo(Math.round(px), Math.round(py + tileH))
  ctx.lineTo(Math.round(px - hw), Math.round(py + hh))
  ctx.closePath()

  ctx.fillStyle = fill
  ctx.fill()
  ctx.lineWidth = 1
  ctx.strokeStyle = stroke
  ctx.stroke()
}

function drawWalls(
  ctx: CanvasRenderingContext2D,
  grid: Grid,
  params: IsoProjectParams,
  tileW: number,
  tileH: number,
  preset: CivicStage["roomPreset"]
) {
  const wallH = 64
  const hw = tileW / 2
  const hh = tileH / 2

  let wallColorA = "#94a3b8"
  let wallColorB = "#64748b"

  if (preset === "Park" || preset === "Forest") {
    wallColorA = "#84cc16"
    wallColorB = "#65a30d"
  } else if (preset === "Cyber") {
    wallColorA = "#1e1b4b"
    wallColorB = "#312e81"
  } else if (preset === "School") {
    wallColorA = "#fde047"
    wallColorB = "#eab308"
  } else {
    wallColorA = "#cbd5e1"
    wallColorB = "#94a3b8"
  }

  // Back left wall
  for (let x = 0; x < grid.cols; x++) {
    const { px, py } = projectIso(x, 0, params)
    ctx.beginPath()
    ctx.moveTo(px - hw, py + hh)
    ctx.lineTo(px, py)
    ctx.lineTo(px, py - wallH)
    ctx.lineTo(px - hw, py + hh - wallH)
    ctx.closePath()
    ctx.fillStyle = wallColorA
    ctx.fill()
    ctx.strokeStyle = "#000"
    ctx.stroke()
  }

  // Back right wall
  for (let y = 0; y < grid.rows; y++) {
    const { px, py } = projectIso(0, y, params)
    ctx.beginPath()
    ctx.moveTo(px, py)
    ctx.lineTo(px + hw, py + hh)
    ctx.lineTo(px + hw, py + hh - wallH)
    ctx.lineTo(px, py - wallH)
    ctx.closePath()
    ctx.fillStyle = wallColorB
    ctx.fill()
    ctx.strokeStyle = "#000"
    ctx.stroke()
  }
}

function drawScenery(
  ctx: CanvasRenderingContext2D,
  preset: CivicStage["roomPreset"],
  params: IsoProjectParams,
  tileW: number,
  tileH: number,
  t: number
) {
  if (preset === "Park") {
    // Park Fountain
    const { px: fx, py: fy } = projectIso(9, 8, params)
    ctx.fillStyle = "#60a5fa"
    ctx.beginPath()
    ctx.arc(fx, fy - 6, 20, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = "#000"
    ctx.stroke()

    // Water jets
    ctx.fillStyle = "#ffffff"
    for (let i = 0; i < 6; i++) {
      const ang = (i / 6) * Math.PI * 2 + t * 2
      const jx = fx + Math.cos(ang) * 12
      const jy = fy - 8 + Math.sin(ang) * 6
      ctx.beginPath()
      ctx.arc(jx, jy - 6 + Math.sin(t * 8 + i) * 3, 3, 0, Math.PI * 2)
      ctx.fill()
    }

    // Isometric Trees
    ;[[2, 2], [15, 2], [2, 13], [15, 13]].forEach(([tx, ty]) => {
      const { px, py } = projectIso(tx, ty, params)
      ctx.fillStyle = "#78350f"
      ctx.fillRect(px - 5, py - 32, 10, 32)
      ctx.strokeRect(px - 5, py - 32, 10, 32)
      ctx.fillStyle = "#15803d"
      ctx.beginPath()
      ctx.arc(px, py - 44, 22, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = "#000"
      ctx.stroke()
    })
  } else if (preset === "Forest") {
    ;[[3, 3], [7, 2], [11, 2], [2, 10]].forEach(([tx, ty]) => {
      const { px, py } = projectIso(tx, ty, params)
      ctx.fillStyle = "#451a03"
      ctx.fillRect(px - 4, py - 50, 8, 50)
      ctx.strokeRect(px - 4, py - 50, 8, 50)
      for (let i = 0; i < 3; i++) {
        ctx.fillStyle = "#14532d"
        ctx.beginPath()
        ctx.moveTo(px, py - 70 - i * 14)
        ctx.lineTo(px + 22 - i * 3, py - 50 - i * 14)
        ctx.lineTo(px - 22 + i * 3, py - 50 - i * 14)
        ctx.closePath()
        ctx.fill()
        ctx.strokeStyle = "#000"
        ctx.stroke()
      }
    })
  } else if (preset === "School") {
    const { px: bx, py: by } = projectIso(9, 1, params)
    ctx.fillStyle = "#064e3b"
    ctx.fillRect(bx - 55, by - 60, 110, 36)
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 2
    ctx.strokeRect(bx - 55, by - 60, 110, 36)

    ctx.fillStyle = "#fde047"
    ctx.font = "bold 9px monospace"
    ctx.textAlign = "center"
    ctx.fillText("GARUDA PANCASILA & UUD 1945", bx, by - 44)
    ctx.fillStyle = "#ffffff"
    ctx.font = "8px sans-serif"
    ctx.fillText("Hak & Kewajiban Warga Negara RI", bx, by - 32)
  }
}

/* ========================================================================= */
/* HIGH-DETAIL ANIMATED CASE VISUALISATIONS                                  */
/* ========================================================================= */

function drawCaseHotspots(
  ctx: CanvasRenderingContext2D,
  cases: CivicCase[],
  solvedCaseIds: Set<string>,
  params: IsoProjectParams,
  t: number,
  outTargets: { id: string; caseData: CivicCase; px: number; py: number; r: number }[]
) {
  cases.forEach((c, index) => {
    const { px, py } = projectIso(c.tileCoord.x, c.tileCoord.y, params)
    const isSolved = solvedCaseIds.has(c.id)

    // 1. Draw rich, realistic animated artwork for the case
    renderDetailedCaseArtwork(ctx, c.visualType, px, py, isSolved, t)

    // 2. Draw Floating Habbo Hotspot Pin
    const bob = Math.sin(t * 4 + index * 1.5) * 5
    const pinY = py - 50 + bob

    ctx.save()
    // Aura glow
    ctx.shadowColor = isSolved ? "#10b981" : "#f59e0b"
    ctx.shadowBlur = 14

    // Outer Pin
    ctx.beginPath()
    ctx.arc(px, pinY, 15, 0, Math.PI * 2)
    ctx.fillStyle = isSolved ? "#10b981" : "#f59e0b"
    ctx.fill()
    ctx.lineWidth = 2.5
    ctx.strokeStyle = "#000000"
    ctx.stroke()
    ctx.restore()

    // Inner icon
    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 14px sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(isSolved ? "✓" : "!", px, pinY + 1)

    // Pin stem
    ctx.beginPath()
    ctx.moveTo(px, pinY + 15)
    ctx.lineTo(px, pinY + 24)
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 2.5
    ctx.stroke()

    // Register hit area (radius: 34 for easy tap on mobile)
    outTargets.push({
      id: c.id,
      caseData: c,
      px,
      py: pinY,
      r: 34,
    })
  })
}

function renderDetailedCaseArtwork(
  ctx: CanvasRenderingContext2D,
  visualType: CivicCase["visualType"],
  px: number,
  py: number,
  isSolved: boolean,
  t: number
) {
  ctx.save()

  /* CASE 1: REALISTIC TRASH PILE & OVERTURNED BIN WITH ANIMATED FLIES */
  if (visualType === "trash") {
    // Overturned metal trash can
    ctx.fillStyle = isSolved ? "#94a3b8" : "#475569"
    ctx.beginPath()
    ctx.ellipse(px - 14, py - 4, 8, 4, -0.4, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()

    // Pile of garbage bags
    ctx.fillStyle = isSolved ? "#64748b" : "#1e293b"
    ctx.beginPath()
    ctx.arc(px - 2, py - 6, 9, 0, Math.PI * 2)
    ctx.arc(px + 8, py - 5, 8, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 1.5
    ctx.stroke()

    // Plastic bottles, crumpled paper, soda cans
    ctx.fillStyle = "#ef4444" // red can
    ctx.fillRect(px + 4, py - 3, 5, 7)
    ctx.strokeRect(px + 4, py - 3, 5, 7)
    ctx.fillStyle = "#38bdf8" // blue plastic bottle
    ctx.fillRect(px - 8, py - 2, 4, 9)
    ctx.strokeRect(px - 8, py - 2, 4, 9)

    // Animated buzzing flies if not solved
    if (!isSolved) {
      ctx.fillStyle = "#000000"
      for (let i = 0; i < 4; i++) {
        const flyAngle = t * 6 + i * 1.5
        const flyX = px + Math.cos(flyAngle) * (10 + i * 2)
        const flyY = py - 14 + Math.sin(flyAngle * 1.3) * (6 + i)
        ctx.fillRect(flyX, flyY, 2, 2)
      }
    }
  }

  /* CASE 2: REALISTIC WALL GRAFFITI & SPRAY PAINT DRIPS */
  else if (visualType === "graffiti") {
    // Painted tags on back wall
    ctx.fillStyle = isSolved ? "#10b981" : "#f43f5e"
    ctx.font = "900 12px sans-serif"
    ctx.fillText("VANDAL!", px - 18, py - 20)

    // Paint drips running down
    ctx.strokeStyle = isSolved ? "#10b981" : "#f43f5e"
    ctx.lineWidth = 2
    ;[px - 12, px - 4, px + 6].forEach((dx, i) => {
      const dripLen = 8 + Math.sin(t * 2 + i) * 3
      ctx.beginPath()
      ctx.moveTo(dx, py - 18)
      ctx.lineTo(dx, py - 18 + dripLen)
      ctx.stroke()
    })

    // Spray paint cans on floor
    ctx.fillStyle = "#06b6d4"
    ctx.fillRect(px + 8, py - 8, 5, 10)
    ctx.strokeRect(px + 8, py - 8, 5, 10)
  }

  /* CASE 3: REALISTIC BROKEN STREETLAMP & ELECTRIC SPARKS */
  else if (visualType === "lamp") {
    // Wrought iron lamp post
    ctx.fillStyle = "#1e293b"
    ctx.fillRect(px - 3, py - 46, 6, 46)
    ctx.strokeRect(px - 3, py - 46, 6, 46)

    // Lamp head / lantern frame
    ctx.fillStyle = "#0f172a"
    ctx.fillRect(px - 8, py - 54, 16, 8)
    ctx.strokeRect(px - 8, py - 54, 16, 8)

    // Broken glass bulb
    const sparkPhase = Math.sin(t * 15) > 0.3
    ctx.fillStyle = isSolved ? "#fde047" : sparkPhase ? "#ef4444" : "#334155"
    ctx.beginPath()
    ctx.arc(px, py - 46, 6, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()

    // Electric sparks flying out if not solved
    if (!isSolved && sparkPhase) {
      ctx.strokeStyle = "#38bdf8"
      ctx.lineWidth = 1.5
      for (let s = 0; s < 4; s++) {
        const ang = s * 1.5 + t * 10
        ctx.beginPath()
        ctx.moveTo(px, py - 46)
        ctx.lineTo(px + Math.cos(ang) * 12, py - 46 + Math.sin(ang) * 12)
        ctx.stroke()
      }
    }
  }

  /* CASE 4: REALISTIC ANIMATED FIRE (KARHUTLA) & BILLOWING SMOKE */
  else if (visualType === "fire") {
    if (!isSolved) {
      // Charred blackened ground
      ctx.fillStyle = "#1c1917"
      ctx.beginPath()
      ctx.ellipse(px, py - 2, 16, 8, 0, 0, Math.PI * 2)
      ctx.fill()

      // Billowing rising smoke clouds
      for (let s = 0; s < 4; s++) {
        const smokeT = ((t * 2 + s * 1.2) % 4) / 4
        const smokeY = py - 18 - smokeT * 32
        const smokeX = px + Math.sin(smokeT * 5 + s) * 10
        const smokeR = 6 + smokeT * 12
        ctx.fillStyle = `rgba(50, 45, 45, ${0.7 - smokeT * 0.6})`
        ctx.beginPath()
        ctx.arc(smokeX, smokeY, smokeR, 0, Math.PI * 2)
        ctx.fill()
      }

      // Layered Animated Flames (Deep Red, Orange, Bright Yellow core)
      const f1 = 16 + Math.sin(t * 12) * 5
      const f2 = 12 + Math.cos(t * 15) * 4
      const f3 = 8 + Math.sin(t * 18) * 3

      // Red outer flame
      ctx.fillStyle = "#dc2626"
      ctx.beginPath()
      ctx.moveTo(px - 10, py - 2)
      ctx.quadraticCurveTo(px - 6, py - f1, px, py - f1 - 4)
      ctx.quadraticCurveTo(px + 6, py - f1, px + 10, py - 2)
      ctx.fill()

      // Orange mid flame
      ctx.fillStyle = "#f97316"
      ctx.beginPath()
      ctx.moveTo(px - 7, py - 2)
      ctx.quadraticCurveTo(px - 4, py - f2, px, py - f2 - 2)
      ctx.quadraticCurveTo(px + 4, py - f2, px + 7, py - 2)
      ctx.fill()

      // Yellow inner core
      ctx.fillStyle = "#fde047"
      ctx.beginPath()
      ctx.moveTo(px - 4, py - 2)
      ctx.lineTo(px, py - f3 - 2)
      ctx.lineTo(px + 4, py - 2)
      ctx.fill()
    } else {
      // Extinguished ashes & green sprout
      ctx.fillStyle = "#44403c"
      ctx.beginPath()
      ctx.ellipse(px, py - 2, 14, 6, 0, 0, Math.PI * 2)
      ctx.fill()
      // Small green plant sprouting
      ctx.fillStyle = "#22c55e"
      ctx.beginPath()
      ctx.arc(px, py - 10, 4, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  /* CASE 5: REALISTIC FELLED TREE & LOGGING STUMP */
  else if (visualType === "deforestation") {
    // Cut tree stump with concentric rings
    ctx.fillStyle = "#78350f"
    ctx.fillRect(px - 10, py - 14, 20, 14)
    ctx.strokeRect(px - 10, py - 14, 20, 14)
    ctx.fillStyle = "#b45309"
    ctx.beginPath()
    ctx.ellipse(px, py - 14, 10, 5, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()

    // Felled tree log lying on ground
    ctx.fillStyle = "#451a03"
    ctx.fillRect(px + 8, py - 8, 24, 8)
    ctx.strokeRect(px + 8, py - 8, 24, 8)

    // Embedded woodcutter axe
    if (!isSolved) {
      ctx.fillStyle = "#94a3b8" // steel blade
      ctx.fillRect(px - 3, py - 22, 6, 8)
      ctx.fillStyle = "#a16207" // wood handle
      ctx.fillRect(px - 1, py - 30, 3, 14)
    }
  }

  /* CASE 6: TOXIC CHEMICAL DRUM & GLOWING LEAKING SLIME */
  else if (visualType === "toxic") {
    // Rusty chemical barrel
    ctx.fillStyle = isSolved ? "#64748b" : "#b45309"
    ctx.fillRect(px - 8, py - 24, 16, 22)
    ctx.strokeRect(px - 8, py - 24, 16, 22)

    // Biohazard stripes
    ctx.fillStyle = "#000000"
    ctx.fillRect(px - 8, py - 16, 16, 4)

    // Glowing fluorescent toxic puddle
    ctx.fillStyle = isSolved ? "#94a3b8" : "rgba(34, 197, 94, 0.75)"
    ctx.beginPath()
    ctx.ellipse(px + 4, py - 4, 14, 7, 0, 0, Math.PI * 2)
    ctx.fill()

    // Bubbling toxic gas particles
    if (!isSolved) {
      ctx.fillStyle = "#4ade80"
      const bubbleY = py - 8 + Math.sin(t * 8) * 4
      ctx.beginPath()
      ctx.arc(px + 6, bubbleY, 3, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  /* CASE 7: CYBER TERMINAL & GLITCH MATRIX */
  else if (visualType === "cyberbullying" || visualType === "hoax" || visualType === "data_leak") {
    // Desktop monitor
    ctx.fillStyle = "#0f172a"
    ctx.fillRect(px - 14, py - 30, 28, 22)
    ctx.strokeRect(px - 14, py - 30, 28, 22)
    ctx.fillRect(px - 2, py - 8, 4, 8) // monitor stand

    // Glowing screen matrix
    ctx.fillStyle = isSolved ? "#10b981" : "#ef4444"
    ctx.fillRect(px - 12, py - 28, 24, 18)

    // Animated glitch lines
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(px - 10, py - 24 + (Math.sin(t * 10) * 6), 20, 2)
  }

  /* DEFAULT BRIEFCASE / EVIDENCE FOLDER */
  else {
    ctx.fillStyle = isSolved ? "#10b981" : "#f59e0b"
    ctx.fillRect(px - 9, py - 14, 18, 12)
    ctx.strokeRect(px - 9, py - 14, 18, 12)
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(px - 4, py - 16, 8, 3)
  }

  ctx.restore()
}

/* ========================================================================= */
/* AUTHENTIC HABBO AVATAR RENDERER (Classic Habbo Hotel Proportions)        */
/* ========================================================================= */

function drawHabboAvatar(
  ctx: CanvasRenderingContext2D,
  ax: number,
  ay: number,
  tileW: number,
  tileH: number,
  facing: Avatar["facing"],
  t: number,
  moving: boolean,
  shirtColor = "#2563eb",
  dancing = false,
  sitting = false,
  waving = false
) {
  // Shadow beneath avatar
  ctx.fillStyle = "rgba(0,0,0,0.22)"
  ctx.beginPath()
  ctx.ellipse(ax, ay + tileH * 0.55, tileW * 0.22, tileH * 0.22, 0, 0, Math.PI * 2)
  ctx.fill()

  const walkSwing = Math.sin(t * 6) * (moving ? 3.5 : 1)
  const armSwing = Math.sin(t * 6 + Math.PI) * (moving ? 5 : 2)
  const dancePhase = dancing ? t * 8 : 0
  const danceBob = dancing ? Math.sin(dancePhase) * 2.5 : 0
  const danceArm = dancing ? Math.sin(dancePhase * 1.5) * 8 : 0
  const waveShimmy = waving ? Math.sin(t * 10) * 3 : 0

  const skinTone = "#ffd199"
  const hairColor = "#5b3a1a"
  const pantsColor = "#1e293b"
  const shoesColor = "#0f172a"

  // Legs & Shoes
  ctx.fillStyle = pantsColor
  ctx.fillRect(ax - 6, ay + 8 + (dancing ? 0 : walkSwing * -0.3), 5, 10)
  ctx.strokeRect(ax - 6, ay + 8 + (dancing ? 0 : walkSwing * -0.3), 5, 10)
  ctx.fillRect(ax + 1, ay + 8 + (dancing ? 0 : walkSwing * 0.3), 5, 10)
  ctx.strokeRect(ax + 1, ay + 8 + (dancing ? 0 : walkSwing * 0.3), 5, 10)

  // Shoes with soles
  ctx.fillStyle = shoesColor
  ctx.fillRect(ax - 7, ay + 17 + (dancing ? 0 : walkSwing * -0.3), 7, 4)
  ctx.strokeRect(ax - 7, ay + 17 + (dancing ? 0 : walkSwing * -0.3), 7, 4)
  ctx.fillRect(ax + 0, ay + 17 + (dancing ? 0 : walkSwing * 0.3), 7, 4)
  ctx.strokeRect(ax + 0, ay + 17 + (dancing ? 0 : walkSwing * 0.3), 7, 4)

  // Torso / Blue Agent Uniform
  ctx.fillStyle = shirtColor
  ctx.fillRect(ax - 10, ay - 18 + danceBob, 20, 26)
  ctx.strokeRect(ax - 10, ay - 18 + danceBob, 20, 26)

  // White shirt collar & gold tie
  ctx.fillStyle = "#ffffff"
  ctx.fillRect(ax - 6, ay - 18 + danceBob, 12, 4)
  ctx.fillStyle = "#f59e0b" // gold tie
  ctx.fillRect(ax - 2, ay - 14 + danceBob, 4, 10)

  // Left Arm
  ctx.fillStyle = skinTone
  ctx.fillRect(ax - 13, ay - 12 + (dancing ? -danceArm : armSwing * -0.15) + danceBob, 5, 14)
  ctx.strokeRect(ax - 13, ay - 12 + (dancing ? -danceArm : armSwing * -0.15) + danceBob, 5, 14)

  // Right Arm (or waving arm)
  if (waving) {
    ctx.fillStyle = skinTone
    ctx.fillRect(ax + 7, ay - 24 + waveShimmy + danceBob, 5, 14)
    ctx.strokeRect(ax + 7, ay - 24 + waveShimmy + danceBob, 5, 14)
    // Waving hand
    ctx.fillRect(ax + 10, ay - 28 + waveShimmy + danceBob, 4, 4)
  } else {
    ctx.fillStyle = skinTone
    ctx.fillRect(ax + 8, ay - 12 + (dancing ? danceArm : armSwing * 0.15) + danceBob, 5, 14)
    ctx.strokeRect(ax + 8, ay - 12 + (dancing ? danceArm : armSwing * 0.15) + danceBob, 5, 14)
  }

  // Head
  ctx.fillStyle = skinTone
  ctx.beginPath()
  ctx.arc(ax, ay - 26 + danceBob, 11, 0, Math.PI * 2)
  ctx.fill()
  ctx.strokeStyle = "#000"
  ctx.lineWidth = 1
  ctx.stroke()

  // Classic Habbo Hair with bangs
  ctx.fillStyle = hairColor
  ctx.fillRect(ax - 11, ay - 37 + danceBob, 22, 10)
  ctx.fillRect(ax - 11, ay - 32 + danceBob, 22, 5)
  ctx.strokeRect(ax - 11, ay - 37 + danceBob, 22, 10)

  // Eyes & Smile
  ctx.fillStyle = "#000000"
  if (facing === "S" || facing === "E") {
    ctx.fillRect(ax - 3, ay - 27 + danceBob, 2, 2)
    ctx.fillRect(ax + 3, ay - 27 + danceBob, 2, 2)
    // Smile
    ctx.beginPath()
    ctx.arc(ax, ay - 23 + danceBob, 3, 0, Math.PI)
    ctx.stroke()
  } else if (facing === "W") {
    ctx.fillRect(ax - 5, ay - 27 + danceBob, 2, 2)
    ctx.fillRect(ax, ay - 27 + danceBob, 2, 2)
  } else {
    // North (back of head)
    ctx.fillStyle = hairColor
    ctx.fillRect(ax - 10, ay - 34 + danceBob, 20, 14)
  }
}

function drawNameplate(ctx: CanvasRenderingContext2D, px: number, py: number, text: string) {
  ctx.save()
  ctx.font = "bold 9px sans-serif"
  ctx.textAlign = "center"
  const m = ctx.measureText(text)
  const pad = 5
  const w = m.width + pad * 2
  const h = 15

  ctx.fillStyle = "rgba(10, 15, 25, 0.85)"
  ctx.fillRect(px - w / 2, py - h, w, h)
  ctx.strokeStyle = "#ffd199"
  ctx.lineWidth = 1
  ctx.strokeRect(px - w / 2, py - h, w, h)

  ctx.fillStyle = "#ffffff"
  ctx.fillText(text, px, py - 4)
  ctx.restore()
}
