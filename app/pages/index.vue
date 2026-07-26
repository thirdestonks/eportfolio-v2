<script setup lang="ts">
import HomePanel from '~/components/crt/panels/HomePanel.vue'
import AboutPanel from '~/components/crt/panels/AboutPanel.vue'
import SkillsPanel from '~/components/crt/panels/SkillsPanel.vue'
import ProjectsPanel from '~/components/crt/panels/ProjectsPanel.vue'
import ExperiencePanel from '~/components/crt/panels/ExperiencePanel.vue'
import ContactPanel from '~/components/crt/panels/ContactPanel.vue'

const { activeSection } = useCrt()

// All panels stay mounted (v-show) so every section's content is in the
// prerendered HTML for SEO; only the active one is displayed. The CSS animation
// replays each time a panel goes display:none -> shown.
</script>

<template>
  <div class="panels">
    <HomePanel v-show="activeSection === 'home'" />
    <AboutPanel v-show="activeSection === 'about'" />
    <SkillsPanel v-show="activeSection === 'skills'" />
    <ProjectsPanel v-show="activeSection === 'projects'" />
    <ExperiencePanel v-show="activeSection === 'experience'" />
    <ContactPanel v-show="activeSection === 'contact'" />
  </div>
</template>

<style scoped>
.panels {
  min-height: 100%;
  display: flex;
  align-items: center;
}

.panels > :deep(.hud-panel) {
  width: 100%;
  max-width: 62rem;
  margin: auto;
  animation: hud-in 0.4s ease;
}

@keyframes hud-in {
  from {
    opacity: 0;
    transform: translateY(1.6vmin) scale(0.98);
    filter: brightness(1.8);
  }

  to {
    opacity: 1;
    transform: none;
    filter: none;
  }
}
</style>
