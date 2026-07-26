<script setup lang="ts">
import type { Component } from 'vue'
import CrtBootTerminal from './CrtBootTerminal.vue'
import CrtBootBlade from './CrtBootBlade.vue'
import CrtBootCyber from './CrtBootCyber.vue'

// Owns the boot lifecycle (progress + flipping `booted`), then dispatches to the
// active filter's own boot screen. Each filter is its own world.
const { current } = useCrtFilter()
const { booted } = useCrt()

const progress = ref(0)
const reduced = ref(false)

const bootMap: Record<string, Component> = {
  terminal: CrtBootTerminal,
  blade: CrtBootBlade,
  cyber: CrtBootCyber,
}
const bootComponent = computed(() => bootMap[current.value.id] ?? CrtBootTerminal)

let raf = 0

onMounted(() => {
  reduced.value = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
  const duration = reduced.value ? 300 : 2800
  const start = performance.now()

  const tick = (t: number) => {
    progress.value = Math.min(1, (t - start) / duration)
    if (progress.value < 1) {
      raf = requestAnimationFrame(tick)
    }
    else {
      setTimeout(() => {
        booted.value = true
      }, reduced.value ? 0 : 500)
    }
  }
  raf = requestAnimationFrame(tick)
})

onBeforeUnmount(() => cancelAnimationFrame(raf))
</script>

<template>
  <div class="boot">
    <div class="power" />
    <component
      :is="bootComponent"
      :progress="progress"
      :reduced="reduced"
    />
  </div>
</template>

<style scoped>
.boot {
  position: absolute;
  inset: 0;
  z-index: 8;
  background: var(--bg);
  overflow: hidden;
}

/* CRT power-on line snap, shared by every boot screen. */
.power {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 2px;
  z-index: 2;
  background: #f4fff4;
  box-shadow: 0 0 30px var(--glow);
  animation: power 0.8s ease forwards;
}

@keyframes power {
  0% {
    transform: scaleY(40) scaleX(0.02);
    opacity: 1;
  }

  45% {
    transform: scaleY(1) scaleX(1);
    opacity: 1;
  }

  100% {
    transform: scaleY(1) scaleX(1);
    opacity: 0;
  }
}
</style>
