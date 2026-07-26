<script setup lang="ts">
const { activeSection, sections, booted, pulse } = useCrt()
const { filters, id: filterId, setFilter } = useCrtFilter()
const route = useRoute()

// Which rail item reads as active — 'projects' while viewing a project detail.
const activeId = computed(() =>
  route.path.startsWith('/projects/') ? 'projects' : activeSection.value,
)

function go(id: string) {
  activeSection.value = id
  pulse()
  if (route.path !== '/') navigateTo('/')
}

function pick(id: string) {
  if (id === filterId.value) return
  setFilter(id)
  pulse()
  // Replay this filter's boot sequence.
  booted.value = false
}
</script>

<template>
  <nav class="rail">
    <div class="brand">
      THIRDE<br>AGUILERA
    </div>

    <div class="tabs">
      <button
        v-for="section in sections"
        :key="section.id"
        class="railtab"
        type="button"
        :class="{ active: activeId === section.id }"
        @click="go(section.id)"
      >
        <span class="marker">▸</span>{{ section.label }}
      </button>
    </div>

    <div class="filters">
      <div class="filters-label">
        FILTER
      </div>
      <button
        v-for="filter in filters"
        :key="filter.id"
        class="filter"
        type="button"
        :class="{ active: filterId === filter.id }"
        :title="filter.label"
        @click="pick(filter.id)"
      >
        <span
          class="swatch"
          :style="{ background: filter.color }"
        />{{ filter.label }}
      </button>
    </div>
  </nav>
</template>

<style scoped>
.rail {
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 2.4vmin, 2rem);
  height: 100%;
  padding: clamp(1.4rem, 3vmin, 3rem) clamp(1rem, 2vmin, 2rem) clamp(1.4rem, 3vmin, 3rem) clamp(1.6rem, 4vmin, 4rem);
  justify-content: center;
}

.brand {
  font-family: var(--pixel);
  color: var(--primary);
  font-size: clamp(0.7rem, 1.4vmin, 1rem);
  line-height: 1.6;
  text-shadow: 0 0 1.4vmin color-mix(in srgb, var(--primary) 40%, transparent);
  margin-bottom: 0.5rem;
}

.tabs {
  display: flex;
  flex-direction: column;
  gap: 0.6vmin;
}

.railtab {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--pixel);
  font-size: clamp(0.6rem, 1.3vmin, 0.85rem);
  color: var(--muted);
  background: transparent;
  border: 1px solid var(--border-soft);
  padding: clamp(0.7rem, 1.3vmin, 1.1rem) clamp(0.7rem, 1.1vmin, 1rem);
  text-align: left;
  cursor: pointer;
  letter-spacing: 0.03em;
  transition:
    color 0.15s ease,
    background 0.15s ease,
    border-color 0.15s ease;
}

.railtab:hover {
  color: var(--text);
  border-color: var(--border);
}

.railtab .marker {
  opacity: 0;
  transition: opacity 0.15s ease;
}

.railtab.active {
  color: var(--primary);
  background: color-mix(in srgb, var(--primary) 8%, transparent);
  border-color: var(--border);
  box-shadow: 0 0 2vmin color-mix(in srgb, var(--primary) 12%, transparent);
}

.railtab.active .marker {
  opacity: 1;
}

.filters {
  display: flex;
  flex-direction: column;
  gap: 0.5vmin;
  margin-top: 0.5rem;
}

.filters-label {
  font-family: var(--pixel);
  font-size: clamp(0.5rem, 1vmin, 0.7rem);
  color: var(--muted);
  letter-spacing: 0.15em;
  margin-bottom: 0.4rem;
}

.filter {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--pixel);
  font-size: clamp(0.5rem, 1vmin, 0.7rem);
  color: var(--muted);
  background: transparent;
  border: 1px solid transparent;
  padding: 0.6rem 0.5rem;
  cursor: pointer;
  transition: color 0.15s ease;
}

.filter:hover {
  color: var(--text);
}

.filter.active {
  color: var(--text);
}

.swatch {
  width: 10px;
  height: 10px;
  border-radius: 2px;
  box-shadow: 0 0 8px currentColor;
  flex-shrink: 0;
}

.filter.active .swatch {
  outline: 1px solid var(--text);
  outline-offset: 2px;
}

@media (max-width: 820px) {
  .rail {
    flex-direction: row;
    flex-wrap: wrap;
    height: auto;
    padding: 1.2rem;
    gap: 0.6rem;
    justify-content: flex-start;
    align-items: center;
  }

  .brand {
    width: 100%;
    margin-bottom: 0.3rem;
  }

  .tabs {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .filters {
    flex-direction: row;
    align-items: center;
    margin-top: 0;
  }

  .filters-label {
    margin-bottom: 0;
  }
}
</style>
