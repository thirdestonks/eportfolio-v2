<script setup lang="ts">
import type { Project } from '~/types'

const props = defineProps<{ project: Project }>()
const { activeSection, pulse } = useCrt()

const active = ref('about')

const screens = computed(() => props.project.dossier?.screens ?? [])
const lightImages = computed(() =>
  screens.value.length ? screens.value.map(s => s.image) : [props.project.image],
)
const heroImage = computed(() => lightImages.value[0])

const tabs = computed(() => {
  const list = [
    { id: 'about', label: 'ABOUT' },
    { id: 'build', label: 'BUILD.LOG' },
    { id: 'features', label: 'FEATURES' },
  ]
  if (screens.value.length) list.push({ id: 'screens', label: 'SCREENS' })
  return list
})

function setTab(id: string) {
  active.value = id
  pulse()
}

function backToProjects() {
  activeSection.value = 'projects'
  pulse()
}

// Lightbox
const lightbox = ref(false)
const lightIndex = ref(0)

function openLightbox(i = 0) {
  lightIndex.value = i
  lightbox.value = true
}
function closeLightbox() {
  lightbox.value = false
}
function step(dir: number) {
  const n = lightImages.value.length
  lightIndex.value = (lightIndex.value + dir + n) % n
}

function onKey(e: KeyboardEvent) {
  if (!lightbox.value) return
  if (e.key === 'Escape') {
    closeLightbox()
  }
  else if (e.key === 'ArrowRight') {
    step(1)
  }
  else if (e.key === 'ArrowLeft') {
    step(-1)
  }
}

onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <div
    v-if="project.dossier"
    class="dossier"
  >
    <div class="bar">
      <span class="path">&gt; ~/projects/{{ project.slug }}</span>
      <NuxtLink
        to="/"
        class="back"
        @click="backToProjects"
      >
        <i class="fa-solid fa-arrow-left" /> back to projects
      </NuxtLink>
    </div>

    <!-- Hero: title/description left, image + meta right -->
    <div class="hero">
      <div class="hero-left">
        <div class="hud-tag">
          // {{ project.role }}
        </div>
        <h1 class="title">
          {{ project.title }}
        </h1>
        <p class="subtitle">
          {{ project.dossier.subtitle }}
        </p>

        <div class="meta-bar">
          <div class="m">
            <span>STATUS</span>{{ project.dossier.status }}
          </div>
          <div class="m">
            <span>STACK</span>{{ project.dossier.stack }}
          </div>
          <div class="m">
            <span>TYPE</span>{{ project.dossier.type }}
          </div>
          <div class="m">
            <span>{{ project.dossier.extraMeta.label }}</span>{{ project.dossier.extraMeta.value }}
          </div>
        </div>
      </div>

      <div class="hero-right">
        <button
          v-if="project.portrait"
          class="phone"
          type="button"
          @click="openLightbox(0)"
        >
          <img
            :src="heroImage"
            :alt="project.alt"
          >
          <span class="shot-hint">⤢ EXPAND</span>
        </button>
        <button
          v-else
          class="shot"
          type="button"
          @click="openLightbox(0)"
        >
          <span class="shot-top">
            <span class="dots"><i /><i /><i /></span>
            <span>{{ project.slug }}.app</span>
          </span>
          <img
            :src="heroImage"
            :alt="project.alt"
          >
          <span class="shot-hint">⤢ EXPAND</span>
        </button>
      </div>
    </div>

    <!-- Tabs -->
    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="tab"
        type="button"
        :class="{ active: active === tab.id }"
        @click="setTab(tab.id)"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Tab body (scrolls internally, page never does) -->
    <div class="body">
      <div
        v-show="active === 'about'"
        class="pane about"
      >
        <p
          v-for="paragraph in project.dossier.background"
          :key="paragraph"
        >
          {{ paragraph }}
        </p>
      </div>

      <div
        v-show="active === 'build'"
        class="pane build"
      >
        <div class="cell">
          <b>TIMELINE</b>{{ project.dossier.timeline }}
        </div>
        <div class="cell">
          <b>TECH STACK</b>{{ project.dossier.techStack.join(' · ') }}
        </div>
        <div class="cell">
          <b>TOOLS</b>{{ project.dossier.tools.join(' · ') }}
        </div>
        <div class="cell">
          <b>DISCIPLINES</b>{{ project.dossier.disciplines.join(' · ') }}
        </div>
      </div>

      <div
        v-show="active === 'features'"
        class="pane features"
      >
        <div
          v-for="feature in project.dossier.features"
          :key="feature.title"
          class="feature"
        >
          <i :class="feature.icon" />
          <div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </div>
        </div>
      </div>

      <div
        v-if="screens.length"
        v-show="active === 'screens'"
        class="pane screens"
      >
        <button
          v-for="(screen, i) in screens"
          :key="screen.image"
          class="screen"
          type="button"
          @click="openLightbox(i)"
        >
          <img
            :src="screen.image"
            :alt="screen.alt"
          >
          <span>{{ screen.caption }}</span>
        </button>
      </div>
    </div>

    <!-- Lightbox -->
    <div
      v-if="lightbox"
      class="lightbox"
      @click.self="closeLightbox"
    >
      <button
        class="lb-close"
        type="button"
        @click="closeLightbox"
      >
        ✕
      </button>
      <button
        v-if="lightImages.length > 1"
        class="lb-nav lb-prev"
        type="button"
        @click="step(-1)"
      >
        ‹
      </button>
      <img
        :src="lightImages[lightIndex]"
        :alt="project.alt"
        class="lb-img"
      >
      <button
        v-if="lightImages.length > 1"
        class="lb-nav lb-next"
        type="button"
        @click="step(1)"
      >
        ›
      </button>
    </div>
  </div>
</template>

<style scoped>
.dossier {
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 2.4vmin, 2rem);
  padding-bottom: 2rem;
}

.bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  color: var(--muted);
  font-size: clamp(0.75rem, 1.3vmin, 0.95rem);
  flex-wrap: wrap;
}

.back {
  color: var(--muted);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.2s ease;
}

.back:hover {
  color: var(--primary);
}

/* Hero */
.hero {
  display: grid;
  grid-template-columns: 1.2fr 0.9fr;
  gap: clamp(1.5rem, 4vmin, 4rem);
  align-items: center;
}

.title {
  font-family: var(--pixel);
  color: var(--primary);
  font-size: clamp(1.6rem, 4.4vmin, 3.6rem);
  line-height: 1.2;
  margin: clamp(0.6rem, 1.4vmin, 1.4rem) 0;
  text-shadow: 0 0 2vmin color-mix(in srgb, var(--primary) 45%, transparent);
}

.subtitle {
  color: var(--muted);
  line-height: 1.9;
  font-size: clamp(0.85rem, 1.6vmin, 1.05rem);
  max-width: 52ch;
}

.hero-right {
  display: flex;
  flex-direction: column;
  gap: clamp(0.8rem, 1.6vmin, 1.4rem);
}

.shot {
  position: relative;
  display: block;
  width: 100%;
  padding: 0;
  border: 1px solid var(--border);
  background: var(--surface-2);
  cursor: pointer;
  overflow: hidden;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.shot:hover {
  border-color: var(--primary);
  box-shadow: var(--shadow);
}

.shot-top {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.5rem 0.8rem;
  border-bottom: 1px solid var(--border);
  color: var(--muted);
  font-size: clamp(0.6rem, 1.1vmin, 0.78rem);
}

.dots {
  display: flex;
  gap: 0.35rem;
}

.dots i {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--muted);
}

.dots i:first-child {
  background: var(--primary);
}

.dots i:nth-child(2) {
  background: var(--secondary);
}

.shot img {
  display: block;
  width: 100%;
  max-height: clamp(9rem, 22vmin, 15rem);
  object-fit: contain;
  filter: contrast(1.05);
}

.shot-hint {
  position: absolute;
  right: 0.6rem;
  bottom: 0.6rem;
  font-family: var(--pixel);
  font-size: clamp(0.5rem, 0.9vmin, 0.62rem);
  color: var(--secondary);
  background: color-mix(in srgb, var(--bg) 70%, transparent);
  padding: 0.3rem 0.5rem;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.shot:hover .shot-hint {
  opacity: 1;
}

/* Portrait projects: wrap the phone screenshot in a device mockup so it reads
   as intentional instead of a phone shot forced into a wide frame. */
.phone {
  position: relative;
  width: clamp(9rem, 20vmin, 13rem);
  aspect-ratio: 9 / 19;
  margin: 0 auto;
  padding: 0.5rem;
  border: 2px solid var(--border);
  border-radius: 1.6rem;
  background: #05070a;
  cursor: pointer;
  overflow: hidden;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.phone:hover {
  border-color: var(--primary);
  box-shadow: var(--shadow);
}

/* notch */
.phone::before {
  content: '';
  position: absolute;
  top: 0.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 34%;
  height: 0.5rem;
  background: var(--border);
  border-radius: 0 0 0.4rem 0.4rem;
  z-index: 2;
}

.phone img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 1.2rem;
}

.phone:hover .shot-hint {
  opacity: 1;
}

.meta-bar {
  display: flex;
  flex-wrap: wrap;
  margin-top: clamp(1rem, 2vmin, 1.6rem);
  border: 1px solid var(--border);
  background: var(--surface-2);
}

.m {
  flex: 1 1 auto;
  min-width: max-content;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: clamp(0.8rem, 1.6vmin, 1.2rem) clamp(1rem, 2vmin, 1.4rem);
  border-right: 1px solid var(--border-soft);
  color: var(--primary);
  font-size: clamp(0.78rem, 1.4vmin, 0.95rem);
}

.m:last-child {
  border-right: none;
}

.m span {
  font-family: var(--pixel);
  color: var(--muted);
  font-size: clamp(0.5rem, 0.95vmin, 0.66rem);
  letter-spacing: 0.08em;
}

/* Tabs */
.tabs {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  border-bottom: 1px solid var(--border);
  padding-bottom: 0.8rem;
}

.tab {
  font-family: var(--pixel);
  font-size: clamp(0.6rem, 1.2vmin, 0.82rem);
  color: var(--muted);
  background: transparent;
  border: 1px solid var(--border-soft);
  padding: 0.6rem 1rem;
  cursor: pointer;
  transition:
    color 0.15s ease,
    border-color 0.15s ease,
    background 0.15s ease;
}

.tab:hover {
  color: var(--text);
}

.tab.active {
  color: var(--primary);
  border-color: var(--primary);
  background: color-mix(in srgb, var(--primary) 8%, transparent);
}

/* Body */
.body {
  min-height: 0;
}

.pane {
  animation: pane 0.3s ease;
}

@keyframes pane {
  from {
    opacity: 0;
    transform: translateY(6px);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

.about p {
  color: var(--text);
  line-height: 1.95;
  margin-bottom: 1.2rem;
  max-width: 78ch;
  font-size: clamp(0.85rem, 1.5vmin, 1rem);
}

.build {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(clamp(12rem, 26vmin, 20rem), 1fr));
  gap: 1rem;
}

.cell {
  border: 1px solid var(--border);
  background: var(--surface-2);
  padding: 1.2rem;
  color: var(--muted);
  line-height: 1.8;
  font-size: clamp(0.8rem, 1.4vmin, 0.95rem);
}

.cell b {
  display: block;
  font-family: var(--pixel);
  color: var(--primary);
  font-size: clamp(0.6rem, 1.1vmin, 0.78rem);
  margin-bottom: 0.7rem;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(clamp(14rem, 30vmin, 22rem), 1fr));
  gap: 1rem;
}

.feature {
  display: flex;
  gap: 1rem;
  border: 1px solid var(--border);
  background: var(--surface-2);
  padding: 1.2rem;
}

.feature i {
  color: var(--secondary);
  font-size: 1.3rem;
  margin-top: 0.2rem;
}

.feature h3 {
  color: var(--primary);
  font-size: clamp(0.85rem, 1.5vmin, 1.05rem);
  margin-bottom: 0.4rem;
}

.feature p {
  color: var(--muted);
  line-height: 1.7;
  font-size: clamp(0.75rem, 1.3vmin, 0.9rem);
}

.screens {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(clamp(9rem, 18vmin, 13rem), 1fr));
  gap: 1rem;
}

.screen {
  border: 1px solid var(--border);
  background: var(--surface-2);
  padding: 0;
  cursor: pointer;
  overflow: hidden;
  transition:
    border-color 0.2s ease,
    transform 0.2s ease;
}

.screen:hover {
  border-color: var(--primary);
  transform: translateY(-3px);
}

.screen img {
  display: block;
  width: 100%;
}

.screen span {
  display: block;
  padding: 0.6rem;
  color: var(--muted);
  font-size: clamp(0.65rem, 1.1vmin, 0.8rem);
  border-top: 1px solid var(--border);
}

/* Lightbox */
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6vmin;
  background: color-mix(in srgb, var(--bg) 82%, #000);
  backdrop-filter: blur(3px);
}

.lb-img {
  max-width: 90%;
  max-height: 86%;
  object-fit: contain;
  border: 1px solid var(--primary);
  box-shadow: 0 0 6vmin color-mix(in srgb, var(--primary) 25%, transparent);
}

.lb-close {
  position: absolute;
  top: 3vmin;
  right: 3vmin;
  width: 2.6rem;
  height: 2.6rem;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--primary);
  font-size: 1.1rem;
  cursor: pointer;
}

.lb-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 3rem;
  height: 3rem;
  border: 1px solid var(--border);
  background: color-mix(in srgb, var(--bg) 60%, transparent);
  color: var(--primary);
  font-size: 1.6rem;
  cursor: pointer;
}

.lb-prev {
  left: 3vmin;
}

.lb-next {
  right: 3vmin;
}

.lb-close:hover,
.lb-nav:hover {
  border-color: var(--primary);
  background: color-mix(in srgb, var(--primary) 12%, transparent);
}

@media (max-width: 820px) {
  .hero {
    grid-template-columns: 1fr;
  }
}
</style>
