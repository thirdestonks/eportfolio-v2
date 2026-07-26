<script setup lang="ts">
// BLADE RUNNER boot — the real 3D T.A initials spinning on their axis inside an
// ESPER scanner while it loads.
defineProps<{ progress: number, reduced: boolean }>()
</script>

<template>
  <div class="blade-boot">
    <div class="stage">
      <div class="ring" />
      <div class="ring ring-2" />
      <div class="sweep" />
      <ClientOnly>
        <CrtInitials3D
          class="core3d"
          :spin="true"
        />
      </ClientOnly>
    </div>

    <div class="esper">
      <div class="tag">
        ESPER // LAPD DETECTION UNIT
      </div>
      <div class="row">
        <div class="bar">
          <i :style="{ transform: `scaleX(${progress})` }" />
        </div>
        <span class="pct">{{ Math.round(progress * 100) }}%</span>
      </div>
      <div class="sub">
        ENHANCE · CALIBRATING · SIGNAL LOW
      </div>
    </div>
  </div>
</template>

<style scoped>
.blade-boot {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4vmin;
  opacity: 0;
  animation: fadein 0.5s ease 0.4s forwards;
}

@keyframes fadein {
  to {
    opacity: 1;
  }
}

.stage {
  position: relative;
  width: clamp(16rem, 36vmin, 28rem);
  height: clamp(16rem, 36vmin, 28rem);
}

.core3d {
  position: absolute;
  inset: 8%;
  z-index: 2;
}

.ring {
  position: absolute;
  inset: 0;
  border: 1px solid var(--border);
  border-radius: 50%;
}

.ring-2 {
  inset: 14%;
  border-style: dashed;
  border-color: color-mix(in srgb, var(--primary) 30%, transparent);
  animation: flat-spin 22s linear infinite;
}

.sweep {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: conic-gradient(from 0deg, transparent 0 300deg, color-mix(in srgb, var(--primary) 22%, transparent) 360deg);
  animation: flat-spin 6s linear infinite;
  mask: radial-gradient(circle, transparent 42%, #000 43%);
  -webkit-mask: radial-gradient(circle, transparent 42%, #000 43%);
}

.esper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.4vmin;
}

.tag,
.sub {
  font-family: var(--pixel);
  color: var(--muted);
  font-size: clamp(0.55rem, 1.1vmin, 0.75rem);
  letter-spacing: 0.1em;
}

.tag {
  color: var(--secondary);
}

.row {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.bar {
  width: 34vmin;
  max-width: 70vw;
  height: 1.2vmin;
  min-height: 10px;
  border: 1px solid var(--border);
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

.pct {
  font-family: var(--pixel);
  color: var(--primary);
  font-size: clamp(0.7rem, 1.4vmin, 1rem);
}

@keyframes flat-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
