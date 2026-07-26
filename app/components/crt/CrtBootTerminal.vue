<script setup lang="ts">
// TERMINAL boot — Weyland-Yutani corporate BIOS: the T.A logo, a load bar, and
// POST log lines revealed by progress.
const props = defineProps<{ progress: number, reduced: boolean }>()
const { current } = useCrtFilter()

const shown = computed(() =>
  Math.round(props.progress * current.value.boot.log.length),
)
</script>

<template>
  <div class="terminal-boot">
    <div class="logo">
      <CrtLogo :label="current.boot.title" />
    </div>
    <div class="bar">
      <i :style="{ transform: `scaleX(${progress})` }" />
    </div>
    <div class="pct">
      {{ Math.round(progress * 100) }}%
    </div>
    <div class="log">
      <div
        v-for="(line, n) in current.boot.log"
        v-show="n < shown"
        :key="line"
      >
        {{ line }}
      </div>
    </div>
    <div class="sub">
      {{ current.boot.sub }}
    </div>
  </div>
</template>

<style scoped>
.terminal-boot {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.2vmin;
  opacity: 0;
  animation: fadein 0.5s ease 0.5s forwards;
}

@keyframes fadein {
  to {
    opacity: 1;
  }
}

.logo {
  width: clamp(9rem, 22vmin, 15rem);
  height: clamp(9rem, 22vmin, 15rem);
}

.bar {
  width: 40vmin;
  max-width: 80vw;
  height: 1.6vmin;
  min-height: 12px;
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
  color: var(--secondary);
  font-size: clamp(0.6rem, 1.2vmin, 0.85rem);
}

.log {
  min-height: 12vmin;
  text-align: center;
  color: var(--muted);
  font-size: clamp(0.75rem, 1.4vmin, 0.95rem);
  line-height: 1.9;
}

.sub {
  font-family: var(--pixel);
  color: var(--muted);
  font-size: clamp(0.55rem, 1.1vmin, 0.75rem);
  letter-spacing: 0.08em;
}
</style>
