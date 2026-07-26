<script setup lang="ts">
const meta = [
  { k: 'ROLE', v: 'SOFTWARE ENGINEER' },
  { k: 'FOCUS', v: 'FULL STACK' },
  { k: 'LOCATION', v: 'MANILA, PH' },
  { k: 'COMPANY', v: 'TESDA' },
]
</script>

<template>
  <section class="hud-panel">
    <div class="hud-tag">
      // PROFILE
    </div>
    <h2 class="hud-title">
      ABOUT
    </h2>
    <p>
      Software engineer based in Manila. Dean's Lister graduate from Universidad
      de Manila (BTVTE, Computer Programming Technology).
    </p>
    <p>
      Started shipping frontend code in 2023, then expanded into backend systems
      and full stack engineering.
    </p>
    <p class="hud-muted">
      Currently Computer Programmer II at TESDA, building digital infrastructure
      for technical education across the Philippines.
    </p>

    <div class="meta">
      <div
        v-for="row in meta"
        :key="row.k"
        class="meta-row"
      >
        <span>{{ row.k }}</span><span>{{ row.v }}</span>
      </div>
      <div class="meta-row">
        <span>STATUS</span><span class="status-live">ONLINE</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.meta {
  margin-top: 2rem;
  border: 1px solid var(--border);
  background: var(--surface-2);
}

.meta-row {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.8rem 1.1rem;
  border-bottom: 1px solid var(--border-soft);
  font-size: clamp(0.75rem, 1.4vmin, 0.95rem);
}

.meta-row:last-child {
  border-bottom: none;
}

.meta-row span:first-child {
  color: var(--muted);
}

.meta-row span:last-child {
  color: var(--primary);
}
</style>
