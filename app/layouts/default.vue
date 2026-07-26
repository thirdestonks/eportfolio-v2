<script setup lang="ts">
// The CRT shell. Lives in the layout so it wraps EVERY route — the 3D core and
// chrome persist as you navigate (project detail included); only the content
// slot swaps.
const { init } = useCrtFilter()
const { booted } = useCrt()

useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css',
      integrity:
        'sha512-5Hs3dF2AEPkpNAR7UiOHba+lRSJNeM2ECkwxUIxC1Q/FLycGTbNapWXB4tP889k5T5Ju8fs4b1P5z/iB4nMfSQ==',
      crossorigin: 'anonymous',
      referrerpolicy: 'no-referrer',
    },
  ],
})

onMounted(init)
</script>

<template>
  <div class="crt">
    <div class="screen">
      <ClientOnly>
        <CrtCore />
      </ClientOnly>

      <div class="frame" />
      <div class="readout r-tl">
        THIRDE-OS v3.0
      </div>
      <div class="readout r-tr">
        CORE: STABLE<br>SIG: 98%<br>MANILA, PH
      </div>
      <div class="readout r-bl">
        ● SYSTEM ONLINE
      </div>

      <ClientOnly>
        <CrtBoot v-if="!booted" />
      </ClientOnly>

      <div
        class="ui"
        :class="{ on: booted }"
      >
        <CrtRail />
        <main class="content">
          <slot />
        </main>
      </div>

      <div class="crt-dither" />
      <div class="crt-scan" />
      <div class="crt-glow" />
    </div>
  </div>
</template>

<style scoped>
.crt {
  position: fixed;
  inset: 0;
  padding: 2.2vmin;
  background: radial-gradient(ellipse at center, #0a1614, #000 90%);
}

.screen {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 24px / 34px;
  overflow: hidden;
  background: radial-gradient(ellipse at 50% 45%, color-mix(in srgb, var(--bg) 85%, #000), #000 78%);
  box-shadow:
    inset 0 0 12vmin rgba(0, 0, 0, 0.9),
    inset 0 0 2vmin color-mix(in srgb, var(--primary) 8%, transparent),
    0 0 7vmin color-mix(in srgb, var(--primary) 7%, transparent);
  animation: flick 0.1s steps(2) infinite;
}

@keyframes flick {
  50% {
    opacity: 0.985;
  }
}

/* HUD frame + corner ticks */
.frame {
  position: absolute;
  inset: 2.4vmin;
  z-index: 3;
  pointer-events: none;
  border: 1px solid var(--border);
}

.frame::before,
.frame::after {
  content: '';
  position: absolute;
  width: 3vmin;
  height: 3vmin;
  border: 2px solid var(--secondary);
}

.frame::before {
  left: -1px;
  top: -1px;
  border-right: none;
  border-bottom: none;
}

.frame::after {
  right: -1px;
  bottom: -1px;
  border-left: none;
  border-top: none;
}

.readout {
  position: absolute;
  z-index: 3;
  font-family: var(--pixel);
  font-size: clamp(0.5rem, 1.1vmin, 0.72rem);
  color: var(--muted);
  pointer-events: none;
  line-height: 1.8;
}

.r-tl {
  left: 4vmin;
  top: 4vmin;
  color: var(--secondary);
}

.r-tr {
  right: 4vmin;
  top: 4vmin;
  text-align: right;
}

.r-bl {
  left: 4vmin;
  bottom: 4vmin;
}

/* UI: rail + content, revealed after boot */
.ui {
  position: absolute;
  inset: 0;
  z-index: 4;
  display: grid;
  grid-template-columns: clamp(11rem, 22vmin, 18rem) 1fr;
  opacity: 0;
  visibility: hidden;
}

.ui.on {
  opacity: 1;
  visibility: visible;
  transition: opacity 0.6s ease;
}

.content {
  position: relative;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: clamp(3rem, 6vmin, 6rem) clamp(2rem, 5vmin, 6rem) clamp(3rem, 6vmin, 6rem) clamp(1rem, 2vmin, 2rem);
}

@media (max-width: 820px) {
  .ui {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }

  .readout {
    display: none;
  }

  .content {
    padding: 1.5rem;
  }
}
</style>
