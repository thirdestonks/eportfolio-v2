<script setup lang="ts">
// Full-colour halftone portrait: the photo shown through a fine dot screen that
// keeps its real colours (soft, retro, easy on the eyes). A light filter tint +
// scanline + mesh overlay (CSS) tie it to the active theme without recolouring
// the whole face. Client-only (canvas).
const props = withDefaults(defineProps<{ src?: string }>(), {
  src: '/images/profile-icon.png',
})

// 2x the original sampling grid with a smaller dot cell so the halftone reads
// as fine detail rather than blur at the card's on-screen size.
const CW = 600
const CH = 720
const CELL = 2

const canvasRef = ref<HTMLCanvasElement | null>(null)

function boost(value: number, avg: number, amount: number): number {
  return Math.max(0, Math.min(255, avg + (value - avg) * amount))
}

function draw(source: Uint8ClampedArray) {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.clearRect(0, 0, CW, CH)

  for (let y = 0; y < CH; y += CELL) {
    for (let x = 0; x < CW; x += CELL) {
      const idx = (y * CW + x) * 4
      const r = source[idx]
      const g = source[idx + 1]
      const b = source[idx + 2]
      const avg = (r + g + b) / 3
      const lum = avg / 255
      // Darker areas -> smaller dots (more black showing) = halftone feel.
      const radius = (CELL / 2) * (0.55 + 0.55 * lum ** 0.9)
      if (radius <= 0.25) continue
      // Slight saturation lift so it pops on the dark screen.
      const cr = Math.round(boost(r, avg, 1.35))
      const cg = Math.round(boost(g, avg, 1.35))
      const cb = Math.round(boost(b, avg, 1.35))
      ctx.fillStyle = `rgb(${cr}, ${cg}, ${cb})`
      ctx.beginPath()
      ctx.arc(x + CELL / 2, y + CELL / 2, radius, 0, Math.PI * 2)
      ctx.fill()
    }
  }
}

function load() {
  const img = new Image()
  img.onload = () => {
    const off = document.createElement('canvas')
    off.width = CW
    off.height = CH
    const octx = off.getContext('2d')
    if (!octx) return
    const scale = Math.max(CW / img.width, CH / img.height)
    const dw = img.width * scale
    const dh = img.height * scale
    octx.drawImage(img, (CW - dw) / 2, (CH - dh) / 2, dw, dh)
    draw(octx.getImageData(0, 0, CW, CH).data)
  }
  img.src = props.src
}

onMounted(load)
watch(() => props.src, load)
</script>

<template>
  <div class="portrait">
    <canvas
      ref="canvasRef"
      :width="CW"
      :height="CH"
      class="portrait-canvas"
    />
    <div class="portrait-mesh" />
    <div class="portrait-scan" />
    <div class="portrait-tint" />
  </div>
</template>

<style scoped>
.portrait {
  position: relative;
  width: 100%;
  aspect-ratio: 300 / 360;
  background: #05070a;
  overflow: hidden;
}

.portrait-canvas {
  display: block;
  width: 100%;
  height: 100%;
}

/* fine cross-hatch mesh, like a print screen */
.portrait-mesh {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.16) 0 1px, transparent 1px 4px),
    repeating-linear-gradient(-45deg, rgba(0, 0, 0, 0.16) 0 1px, transparent 1px 4px);
}

.portrait-scan {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.22) 0 1px, transparent 1px 3px);
  mix-blend-mode: multiply;
}

/* gentle theme tint so the portrait belongs to the active filter */
.portrait-tint {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: var(--primary);
  opacity: 0.14;
  mix-blend-mode: soft-light;
}
</style>
