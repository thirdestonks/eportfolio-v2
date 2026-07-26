<script setup lang="ts">
import { projects } from '~/data/projects'

const { pulse } = useCrt()
</script>

<template>
  <section class="hud-panel">
    <div class="hud-tag">
      // ARCHIVE
    </div>
    <h2 class="hud-title">
      PROJECTS
    </h2>

    <div class="proj-grid">
      <NuxtLink
        v-for="project in projects"
        :key="project.slug"
        class="proj"
        :to="`/projects/${project.slug}`"
        @click="pulse"
      >
        <div class="proj-top">
          <span class="idx">{{ project.index }}</span>
          <span class="note">{{ project.note }}</span>
        </div>
        <h3>{{ project.title }}</h3>
        <p>{{ project.description }}</p>
        <div class="proj-foot">
          <span>{{ project.role }}</span>
          <span class="open">OPEN ▸</span>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.proj-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(clamp(14rem, 30vmin, 22rem), 1fr));
  gap: clamp(0.8rem, 1.6vmin, 1.6rem);
}

.proj {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  border: 1px solid var(--border);
  background: var(--surface-2);
  padding: clamp(1.1rem, 2vmin, 1.8rem);
  color: var(--text);
  transition:
    transform 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;
}

.proj:hover {
  transform: translateY(-4px);
  border-color: var(--primary);
  box-shadow: var(--shadow);
}

.proj-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.6rem;
  color: var(--muted);
  font-size: clamp(0.6rem, 1.1vmin, 0.75rem);
}

.idx {
  font-family: var(--pixel);
  color: var(--secondary);
}

.proj h3 {
  font-family: var(--pixel);
  color: var(--primary);
  font-size: clamp(0.85rem, 1.6vmin, 1.15rem);
  line-height: 1.4;
}

.proj p {
  color: var(--muted);
  font-size: clamp(0.75rem, 1.4vmin, 0.95rem);
  line-height: 1.7;
  flex: 1;
}

.proj-foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: clamp(0.6rem, 1.1vmin, 0.75rem);
  color: var(--muted);
  letter-spacing: 0.05em;
}

.open {
  color: var(--secondary);
}
</style>
