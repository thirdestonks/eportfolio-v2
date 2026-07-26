<script setup lang="ts">
import { experience } from '~/data/experience'
</script>

<template>
  <section class="hud-panel">
    <div class="hud-tag">
      // LOG
    </div>
    <h2 class="hud-title">
      EXPERIENCE
    </h2>

    <div class="timeline">
      <div
        v-for="job in experience"
        :key="job.title"
        class="job"
      >
        <div class="job-date">
          {{ job.date }} · {{ job.tag }}
        </div>
        <h3>{{ job.title }}</h3>
        <div class="job-co">
          {{ job.company }}
        </div>
        <p class="hud-muted">
          {{ job.description }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.timeline {
  display: flex;
  flex-direction: column;
  gap: clamp(1.2rem, 2.4vmin, 2.4rem);
}

.job {
  position: relative;
  padding-left: 2rem;
  border-left: 1px solid var(--border);
}

.job::before {
  content: '';
  position: absolute;
  left: -5px;
  top: 0.4rem;
  width: 9px;
  height: 9px;
  border-radius: 2px;
  background: var(--primary);
  box-shadow: 0 0 10px var(--glow);
}

.job-date {
  font-family: var(--pixel);
  color: var(--muted);
  font-size: clamp(0.5rem, 1vmin, 0.7rem);
  line-height: 1.6;
}

.job h3 {
  font-family: var(--pixel);
  color: var(--primary);
  font-size: clamp(0.8rem, 1.5vmin, 1.05rem);
  line-height: 1.5;
  margin: 0.7rem 0 0.4rem;
}

.job-co {
  color: var(--secondary);
  font-size: clamp(0.8rem, 1.4vmin, 0.95rem);
  margin-bottom: 0.5rem;
}
</style>
