<script setup lang="ts">
// The living 3D core behind the whole CRT. Client-only (WebGL). Persists in the
// layout across route changes, so it never reloads as you navigate.
const { current } = useCrtFilter()
const { navPulse } = useCrt()
</script>

<template>
  <div class="crt-core">
    <TresCanvas
      :alpha="true"
      :clear-alpha="0"
      :antialias="true"
    >
      <CrtCoreScene
        :color="current.color"
        :pulse-key="navPulse"
      />
    </TresCanvas>
  </div>
</template>

<style scoped>
.crt-core {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.crt-core :deep(canvas) {
  display: block;
  width: 100% !important;
  height: 100% !important;
}
</style>
