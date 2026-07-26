<script setup lang="ts">
// CYBERPUNK boot — nocturnal breach. Smooth, slow rain of warm-red + purple
// streams (continuous fall, long fading trails) with a glitch title. Rendered
// only under the client-only boot host.
const props = defineProps<{ progress: number, reduced: boolean }>()

interface Drop {
  y: number
  speed: number
  glyph: string
  color: string
}

const canvasRef = ref<HTMLCanvasElement | null>(null)
const glyphs = 'アイウエオカキクケコサシスセABCDEF0123456789#@%*<>/\\'
const FONT = 15
const HEAD = '#ffd8e6'
const RED = '#ff4d6d'
const PURPLE = '#a56bff'

let raf = 0
let drops: Drop[] = []
let width = 0
let height = 0

function randGlyph(): string {
  return glyphs.charAt(Math.floor(Math.random() * glyphs.length))
}

function newColor(): string {
  return Math.random() < 0.5 ? RED : PURPLE
}

function frame(ctx: CanvasRenderingContext2D) {
  raf = requestAnimationFrame(() => frame(ctx))

  // Light fade = long, smooth trails.
  ctx.fillStyle = 'rgba(11, 6, 18, 0.08)'
  ctx.fillRect(0, 0, width, height)
  ctx.font = `${FONT}px monospace`

  for (let i = 0; i < drops.length; i++) {
    const drop = drops[i]
    if (!drop) {
      continue
    }
    const x = i * FONT
    if (Math.random() < 0.1) {
      drop.glyph = randGlyph()
    }
    ctx.fillStyle = HEAD
    ctx.fillText(drop.glyph, x, drop.y)
    ctx.fillStyle = drop.color
    ctx.fillText(randGlyph(), x, drop.y - FONT)
    drop.y += drop.speed
    if (drop.y > height + Math.random() * 140) {
      drop.y = -Math.random() * 90
      drop.speed = 0.35 + Math.random() * 0.55
      drop.color = newColor()
      drop.glyph = randGlyph()
    }
  }
}

function setup() {
  const canvas = canvasRef.value
  const parent = canvas?.parentElement
  if (!canvas || !parent) return
  width = canvas.width = parent.clientWidth
  height = canvas.height = parent.clientHeight
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  drops = Array.from({ length: Math.ceil(width / FONT) }, () => ({
    y: Math.random() * -height,
    speed: 0.35 + Math.random() * 0.55,
    glyph: randGlyph(),
    color: newColor(),
  }))

  if (props.reduced) {
    ctx.font = `${FONT}px monospace`
    for (let i = 0; i < drops.length; i++) {
      const drop = drops[i]
      if (!drop) {
        continue
      }
      ctx.fillStyle = drop.color
      ctx.fillText(drop.glyph, i * FONT, (i * 41) % height)
    }
    return
  }

  frame(ctx)
}

onMounted(setup)
onBeforeUnmount(() => cancelAnimationFrame(raf))
</script>

<template>
  <div class="cyber-boot">
    <canvas
      ref="canvasRef"
      class="rain"
    />
    <div class="scrim" />
    <div class="overlay">
      <div class="warn">
        ▲ ATTENTION ▲
      </div>
      <div
        class="glitch"
        data-text="T.A // BREACH"
      >
        T.A
      </div>
      <div class="bar">
        <i :style="{ transform: `scaleX(${progress})` }" />
      </div>
      <div class="scan">
        C0NNECTING {{ Math.round(progress * 100) }}% · ICE BYPASSED
      </div>
    </div>
  </div>
</template>

<style scoped>
.cyber-boot {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.rain {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.scrim {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, transparent 28%, rgba(11, 6, 18, 0.85) 100%);
}

.overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.4vmin;
  text-align: center;
}

.warn {
  font-family: var(--pixel);
  color: var(--primary);
  font-size: clamp(0.7rem, 1.5vmin, 1rem);
  letter-spacing: 0.2em;
  animation: warnblink 0.9s steps(1) infinite;
}

@keyframes warnblink {
  50% {
    opacity: 0.3;
  }
}

.glitch {
  position: relative;
  font-family: var(--pixel);
  color: #fff;
  font-size: clamp(1.1rem, 3.4vmin, 2.8rem);
  letter-spacing: 0.05em;
  text-shadow: 0 0 2vmin rgba(255, 77, 109, 0.75);
}

.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  inset: 0;
}

.glitch::before {
  color: #a56bff;
  animation: glitch-a 1.9s infinite steps(2);
}

.glitch::after {
  color: #ff4d6d;
  animation: glitch-b 1.4s infinite steps(2);
}

@keyframes glitch-a {
  0%, 100% {
    transform: translate(0, 0);
    clip-path: inset(0 0 60% 0);
  }

  50% {
    transform: translate(-3px, 1px);
    clip-path: inset(50% 0 10% 0);
  }
}

@keyframes glitch-b {
  0%, 100% {
    transform: translate(0, 0);
    clip-path: inset(60% 0 0 0);
  }

  50% {
    transform: translate(3px, -1px);
    clip-path: inset(10% 0 55% 0);
  }
}

.bar {
  width: 42vmin;
  max-width: 78vw;
  height: 1.4vmin;
  min-height: 11px;
  border: 1px solid var(--primary);
}

.bar i {
  display: block;
  height: 100%;
  width: 100%;
  transform-origin: left center;
  background: var(--primary);
  box-shadow: 0 0 2vmin var(--glow);
  transition: transform 0.1s linear;
}

.scan {
  font-family: var(--pixel);
  color: var(--secondary);
  font-size: clamp(0.55rem, 1.1vmin, 0.78rem);
  letter-spacing: 0.1em;
}
</style>
