<script setup lang="ts">
import * as THREE from 'three'

// Genuinely 3D T.A: the letters are built from real box prisms (with depth) and
// spun on their axis, so they turn and show their side faces — not flat layers.
// Raw three.js for full control. Client-only.
withDefaults(defineProps<{ spin?: boolean }>(), { spin: false })
const { current } = useCrtFilter()

const canvasRef = ref<HTMLCanvasElement | null>(null)

let raf = 0
let ro: ResizeObserver | null = null
let renderer: THREE.WebGLRenderer | null = null
let material: THREE.MeshBasicMaterial | null = null

const DEPTH = 1.5

function makeLetters(mat: THREE.Material): THREE.Group {
  const group = new THREE.Group()
  const add = (w: number, h: number, x: number, y: number, rz = 0) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, DEPTH), mat)
    mesh.position.set(x, y, 0)
    mesh.rotation.z = rz
    group.add(mesh)
  }

  // T (left)
  add(3.6, 0.9, -4.3, 2.6)
  add(0.9, 5.4, -4.3, 0)
  // dot
  add(0.95, 0.95, -0.3, -2.1)
  // A (right) — legs converge at the top (apex up)
  add(0.9, 5.9, 3.3, 0, -0.27)
  add(0.9, 5.9, 5.3, 0, 0.27)
  add(2.1, 0.8, 4.3, -0.7)

  return group
}

onMounted(() => {
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
  const canvas = canvasRef.value
  const parent = canvas?.parentElement
  if (!canvas || !parent) return

  renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
  camera.position.z = 17

  material = new THREE.MeshBasicMaterial({
    color: new THREE.Color(current.value.color),
    wireframe: true,
    transparent: true,
    opacity: 0.92,
  })
  const group = makeLetters(material)
  scene.add(group)

  const resize = () => {
    if (!renderer) return
    const rect = parent.getBoundingClientRect()
    renderer.setSize(rect.width, rect.height)
    camera.aspect = rect.width / rect.height
    camera.updateProjectionMatrix()
  }
  resize()
  ro = new ResizeObserver(resize)
  ro.observe(parent)

  let t = 0
  const loop = () => {
    raf = requestAnimationFrame(loop)
    if (!renderer) return
    if (!reduced) {
      t += 0.016
      group.rotation.y += 0.012
      group.rotation.x = Math.sin(t * 0.5) * 0.16
    }
    renderer.render(scene, camera)
  }
  loop()
})

watch(() => current.value.color, (color) => {
  material?.color.set(color)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  ro?.disconnect()
  renderer?.dispose()
})
</script>

<template>
  <div class="initials3d">
    <canvas
      ref="canvasRef"
      class="initials3d-canvas"
    />
  </div>
</template>

<style scoped>
.initials3d {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.initials3d-canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
