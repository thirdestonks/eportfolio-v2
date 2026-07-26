<script setup lang="ts">
// T.A monogram — the identity mark, reused in the boot screen and rail.
// Filter-reactive via currentColor / CSS vars.
withDefaults(defineProps<{ label?: string }>(), { label: 'THIRDE-OS' })
</script>

<template>
  <svg
    class="ta-logo"
    viewBox="0 0 160 160"
    role="img"
    aria-label="T.A — Thirde Aguilera"
  >
    <!-- corner ticks -->
    <path
      class="tick"
      d="M14 40 V14 H40"
    />
    <path
      class="tick"
      d="M120 14 H146 V40"
    />
    <path
      class="tick"
      d="M146 120 V146 H120"
    />
    <path
      class="tick"
      d="M40 146 H14 V120"
    />

    <!-- monogram: T and A sharing a stem, drawn as blocky strokes -->
    <g class="mark">
      <!-- T -->
      <rect
        x="34"
        y="52"
        width="52"
        height="12"
      />
      <rect
        x="54"
        y="52"
        width="12"
        height="56"
      />
      <!-- A -->
      <path d="M90 108 L104 52 L118 108 M95 88 H113" />
    </g>

    <!-- baseline + label -->
    <line
      class="rule"
      x1="34"
      y1="120"
      x2="126"
      y2="120"
    />
    <text
      class="lg-sub"
      x="80"
      y="136"
      text-anchor="middle"
    >{{ label }}</text>
  </svg>
</template>

<style scoped>
.ta-logo {
  width: 100%;
  height: 100%;
  overflow: visible;
}

.tick {
  fill: none;
  stroke: var(--secondary);
  stroke-width: 3;
}

.mark rect {
  fill: var(--primary);
}

.mark path {
  fill: none;
  stroke: var(--primary);
  stroke-width: 12;
  stroke-linejoin: round;
  stroke-linecap: square;
}

.ta-logo {
  filter: drop-shadow(0 0 6px color-mix(in srgb, var(--primary) 60%, transparent));
}

.rule {
  stroke: var(--border);
  stroke-width: 2;
}

.lg-sub {
  fill: var(--muted);
  font-family: var(--pixel);
  font-size: 11px;
  letter-spacing: 0.1em;
}
</style>
