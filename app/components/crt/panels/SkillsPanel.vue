<script setup lang="ts">
import { skillFilters, skills } from '~/data/skills'
import type { SkillFilter } from '~/types'

const { pulse } = useCrt()
const activeFilter = ref<SkillFilter['value']>('all')

const filtered = computed(() =>
  activeFilter.value === 'all'
    ? skills
    : skills.filter(s => s.category === activeFilter.value),
)

function setFilter(value: SkillFilter['value']) {
  activeFilter.value = value
  pulse()
}
</script>

<template>
  <section class="hud-panel">
    <div class="hud-tag">
      // LOADOUT
    </div>
    <h2 class="hud-title">
      SKILLS
    </h2>

    <div class="tabs">
      <button
        v-for="f in skillFilters"
        :key="f.value"
        class="tab"
        type="button"
        :class="{ active: activeFilter === f.value }"
        @click="setFilter(f.value)"
      >
        {{ f.label }}
      </button>
    </div>

    <TransitionGroup
      name="sk"
      tag="div"
      class="sk-grid"
    >
      <div
        v-for="skill in filtered"
        :key="skill.name"
        class="sk"
      >
        <img
          class="sk-icon"
          :src="`/assets/icons/${skill.icon}`"
          :alt="skill.name"
          loading="lazy"
        >
        <span class="sk-name">{{ skill.name }}</span>
        <small>{{ skill.note }}</small>
      </div>
    </TransitionGroup>
  </section>
</template>

<style scoped>
.tabs {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin-bottom: 1.6rem;
}

.tab {
  background: transparent;
  color: var(--muted);
  border: 1px solid var(--border-soft);
  padding: 0.5rem 0.8rem;
  font-family: inherit;
  font-size: clamp(0.7rem, 1.2vmin, 0.85rem);
  cursor: pointer;
  transition:
    color 0.2s ease,
    border-color 0.2s ease,
    background 0.2s ease;
}

.tab:hover,
.tab.active {
  color: var(--primary);
  border-color: var(--primary);
  background: color-mix(in srgb, var(--primary) 8%, transparent);
}

.sk-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(clamp(6rem, 12vmin, 9rem), 1fr));
  gap: clamp(0.6rem, 1.2vmin, 1.2rem);
}

.sk {
  border: 1px solid var(--border);
  background: var(--surface-2);
  padding: clamp(1rem, 2vmin, 1.6rem) 0.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition:
    transform 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.sk:hover {
  transform: translateY(-4px);
  border-color: var(--primary);
  box-shadow: var(--shadow);
}

.sk-icon {
  width: clamp(28px, 4vmin, 44px);
  height: clamp(28px, 4vmin, 44px);
  margin-bottom: 0.8rem;
}

.sk-name {
  color: var(--primary);
  font-size: clamp(0.75rem, 1.4vmin, 0.95rem);
}

.sk small {
  color: var(--muted);
  margin-top: 0.4rem;
  font-size: clamp(0.6rem, 1.1vmin, 0.75rem);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.sk-enter-active,
.sk-leave-active {
  transition:
    opacity 0.35s ease,
    transform 0.35s ease;
}

.sk-leave-active {
  position: absolute;
}

.sk-enter-from,
.sk-leave-to {
  opacity: 0;
  transform: scale(0.85);
}

.sk-move {
  transition: transform 0.35s ease;
}
</style>
