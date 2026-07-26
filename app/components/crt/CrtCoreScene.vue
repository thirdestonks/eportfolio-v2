<script setup lang="ts">
import { Color, type BufferGeometry, type Mesh, type MeshBasicMaterial, type Points, type PointsMaterial } from 'three'
import { useLoop } from '@tresjs/core'

// Lives inside <TresCanvas> (CrtCore.client.vue, client-only), so document +
// useLoop are available.
const props = defineProps<{ color: string, pulseKey: number }>()

const reducedMotion = ref(false)
onMounted(() => {
  reducedMotion.value = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
})

const initialsRef = shallowRef<Points<BufferGeometry, PointsMaterial>>()
const ringRef = shallowRef<Mesh<BufferGeometry, MeshBasicMaterial>>()
const dustRef = shallowRef<Points<BufferGeometry, PointsMaterial>>()

const phosphor = new Color(props.color)
watch(() => props.color, value => phosphor.set(value))

// Background icon = the initials, a flat-ish cloud that gently rocks.
const initials = sampleInitials('T.A', { world: 20, step: 3, depth: 1.2 })

// Ambient dust behind the initials.
const DUST = 260
const dust = new Float32Array(DUST * 3)
for (let i = 0; i < DUST; i++) {
  dust[i * 3] = (Math.random() - 0.5) * 46
  dust[i * 3 + 1] = (Math.random() - 0.5) * 30
  dust[i * 3 + 2] = (Math.random() - 0.5) * 20
}

const burst = { value: 0 }
watch(() => props.pulseKey, () => {
  burst.value = 1
})

let elapsed = 0

const { onBeforeRender } = useLoop()
onBeforeRender(({ delta }) => {
  const mark = initialsRef.value
  const ring = ringRef.value
  const grit = dustRef.value
  if (!mark || !ring || !grit) return

  elapsed += delta
  burst.value += (0 - burst.value) * 0.05
  const b = burst.value

  if (!reducedMotion.value) {
    // Gentle rock + float so the initials stay readable (no full spin).
    mark.rotation.y = Math.sin(elapsed * 0.5) * 0.4 + b * 1.2
    mark.position.y = Math.sin(elapsed * 0.8) * 0.4
    ring.rotation.z += 0.0025
    grit.rotation.y += 0.0004
    const arr = grit.geometry.attributes.position.array
    for (let i = 1; i < arr.length; i += 3) {
      arr[i] -= delta * 1.2
      if (arr[i] < -15) arr[i] = 15
    }
    grit.geometry.attributes.position.needsUpdate = true
  }

  mark.scale.setScalar(1 + b * 0.18)
  mark.material.color.copy(phosphor)
  mark.material.opacity = 0.7 + b * 0.3
  ring.material.color.copy(phosphor)
  grit.material.color.copy(phosphor)
})
</script>

<template>
  <TresPerspectiveCamera
    :position="[0, 0, 20]"
    :fov="55"
  />

  <TresPoints ref="initialsRef">
    <TresBufferGeometry :position="[initials, 3]" />
    <TresPointsMaterial
      :color="color"
      :size="0.16"
      :transparent="true"
      :opacity="0.72"
      :size-attenuation="true"
      :depth-write="false"
    />
  </TresPoints>

  <TresMesh
    ref="ringRef"
    :rotation="[1.4, 0, 0]"
  >
    <TresTorusGeometry :args="[10, 0.04, 8, 140]" />
    <TresMeshBasicMaterial
      :color="color"
      :transparent="true"
      :opacity="0.28"
    />
  </TresMesh>

  <TresPoints ref="dustRef">
    <TresBufferGeometry :position="[dust, 3]" />
    <TresPointsMaterial
      :color="color"
      :size="0.05"
      :transparent="true"
      :opacity="0.32"
      :size-attenuation="true"
      :depth-write="false"
    />
  </TresPoints>
</template>
