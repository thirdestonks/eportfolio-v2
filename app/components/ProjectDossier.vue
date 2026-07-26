<script setup lang="ts">
import type { Project } from '~/types'

defineProps<{ project: Project }>()

const { activeSection, pulse } = useCrt()
function backToProjects() {
  activeSection.value = 'projects'
  pulse()
}
</script>

<template>
  <div v-if="project.dossier">
    <section class="project-hero">
      <div class="project-terminal-path">
        &gt; ~/projects/{{ project.slug }}
      </div>

      <div class="project-terminal-window">
        <div class="project-terminal-top">
          <div class="terminal-dots">
            <span /><span /><span />
          </div>
          <div class="project-terminal-title">
            {{ project.slug }}.app
          </div>
          <div class="project-terminal-status">
            {{ project.dossier.status }}
          </div>
        </div>

        <div class="project-terminal-body">
          <div class="project-header">
            <div class="project-title-group">
              <h1>{{ project.title }}</h1>
              <p class="project-subtitle">
                {{ project.dossier.subtitle }}
              </p>
            </div>

            <div class="project-meta">
              <div class="project-meta-row">
                <span>STATUS</span>
                <span>{{ project.dossier.status }}</span>
              </div>
              <div class="project-meta-row">
                <span>STACK</span>
                <span>{{ project.dossier.stack }}</span>
              </div>
              <div class="project-meta-row">
                <span>TYPE</span>
                <span>{{ project.dossier.type }}</span>
              </div>
              <div class="project-meta-row">
                <span>{{ project.dossier.extraMeta.label }}</span>
                <span>{{ project.dossier.extraMeta.value }}</span>
              </div>
            </div>
          </div>

          <div
            v-if="project.dossier.screens"
            class="mobile-screens-grid"
          >
            <div
              v-for="screen in project.dossier.screens"
              :key="screen.image"
              class="mobile-screen"
            >
              <img
                :src="screen.image"
                :alt="screen.alt"
              >
              <div class="mobile-screen-caption">
                {{ screen.caption }}
              </div>
            </div>
          </div>
          <div
            v-else
            class="hero-image"
          >
            <img
              :src="project.image"
              :alt="project.alt"
            >
          </div>
        </div>
      </div>
    </section>

    <section class="process-section">
      <div class="project-section-title">
        &gt; build.log
      </div>

      <div class="process-details">
        <div class="detail-column">
          <h3>TIMELINE</h3>
          <p>{{ project.dossier.timeline }}</p>
        </div>

        <div class="detail-column">
          <h3>DISCIPLINES</h3>
          <p>
            <template
              v-for="(item, i) in project.dossier.disciplines"
              :key="item"
            >
              {{ item }}<br v-if="i < project.dossier.disciplines.length - 1">
            </template>
          </p>
        </div>

        <div class="detail-column">
          <h3>TOOLS</h3>
          <p>
            <template
              v-for="(item, i) in project.dossier.tools"
              :key="item"
            >
              {{ item }}<br v-if="i < project.dossier.tools.length - 1">
            </template>
          </p>
        </div>

        <div class="detail-column">
          <h3>TECH STACK</h3>
          <p>
            <template
              v-for="(item, i) in project.dossier.techStack"
              :key="item"
            >
              {{ item }}<br v-if="i < project.dossier.techStack.length - 1">
            </template>
          </p>
        </div>
      </div>
    </section>

    <section class="background-section">
      <div class="project-section-title">
        &gt; about_project.md
      </div>

      <div class="background-content">
        <p
          v-for="paragraph in project.dossier.background"
          :key="paragraph"
        >
          {{ paragraph }}
        </p>
      </div>
    </section>

    <section class="features-section">
      <div class="project-section-title">
        &gt; feature_registry.json
      </div>

      <div class="features-grid">
        <div
          v-for="feature in project.dossier.features"
          :key="feature.title"
          class="feature-card"
        >
          <i :class="feature.icon" />
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <footer>
      <div class="footer-terminal">
        <span>© {{ new Date().getFullYear() }} thirde.dev — project dossier loaded</span>

        <div class="footer-links">
          <a
            href="https://github.com/thirdestonks"
            target="_blank"
            rel="noopener"
          >
            <i class="fa-brands fa-github" /> github
          </a>
          <NuxtLink
            to="/"
            @click="backToProjects"
          >
            <i class="fa-solid fa-arrow-left" /> back to projects
          </NuxtLink>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.project-hero {
  padding-top: 10rem;
}

.project-terminal-path {
  color: var(--muted);
  margin-bottom: 2rem;
  font-size: 1rem;
}

.project-terminal-window {
  border: 1px solid var(--primary);
  border-radius: 22px;
  overflow: hidden;
  background: rgba(2, 4, 2, 0.92);
  box-shadow:
    0 0 40px rgba(124, 255, 91, 0.05),
    inset 0 0 40px rgba(124, 255, 91, 0.02);
}

.project-terminal-top {
  height: 64px;
  padding: 0 1.5rem;
  display: grid;
  grid-template-columns: 120px 1fr 120px;
  align-items: center;
  border-bottom: 1px solid var(--border);
  background: rgba(124, 255, 91, 0.03);
}

.terminal-dots {
  display: flex;
  gap: 0.6rem;
}

.terminal-dots span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.terminal-dots span:nth-child(1) {
  background: #ff5f56;
}

.terminal-dots span:nth-child(2) {
  background: #ffbd2e;
}

.terminal-dots span:nth-child(3) {
  background: #27c93f;
}

.project-terminal-title,
.project-terminal-status {
  color: var(--muted);
  font-size: 0.9rem;
}

.project-terminal-title {
  text-align: center;
}

.project-terminal-status {
  text-align: right;
}

.project-terminal-body {
  padding: 2rem;
}

.project-header {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 3rem;
  align-items: start;
  margin-bottom: 3rem;
}

.project-title-group h1 {
  font-size: clamp(3rem, 7vw, 5rem);
  line-height: 0.95;
  color: var(--primary);
  margin-bottom: 1.5rem;
  text-shadow: 0 0 18px rgba(124, 255, 91, 0.16);
}

.project-subtitle {
  color: var(--muted);
  max-width: 720px;
  line-height: 1.9;
  font-size: 1.05rem;
}

.project-meta {
  border: 1px solid var(--border);
  background: rgba(124, 255, 91, 0.03);
}

.project-meta-row {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.2rem;
  border-bottom: 1px solid rgba(124, 255, 91, 0.08);
}

.project-meta-row:last-child {
  border-bottom: none;
}

.project-meta-row span:first-child {
  color: var(--muted);
  font-size: 0.9rem;
}

.project-meta-row span:last-child {
  color: var(--primary);
  text-align: right;
  font-size: 0.9rem;
}

.hero-image {
  border: 1px solid var(--border);
  border-radius: 18px;
  overflow: hidden;
  background: rgba(124, 255, 91, 0.03);
}

.hero-image img {
  width: 100%;
  display: block;
  filter: contrast(1.05);
}

.mobile-screens-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.mobile-screen {
  border: 1px solid var(--border);
  border-radius: 24px;
  overflow: hidden;
  background: rgba(124, 255, 91, 0.03);
}

.mobile-screen img {
  width: 100%;
  display: block;
  filter: contrast(1.05);
}

.mobile-screen-caption {
  text-align: center;
  padding: 0.9rem 0;
  color: var(--muted);
  font-size: 0.85rem;
  border-top: 1px solid var(--border);
}

.project-section-title {
  color: var(--muted);
  margin-bottom: 2.5rem;
  font-size: 1rem;
}

.process-details {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.detail-column {
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 2rem;
  background: rgba(7, 17, 7, 0.45);
  transition: 0.3s ease;
}

.detail-column:hover {
  transform: translateY(-4px);
  border-color: var(--primary);
  box-shadow: var(--shadow);
}

.detail-column h3 {
  color: var(--primary);
  margin-bottom: 1.3rem;
  font-size: 1rem;
  letter-spacing: 0.08em;
}

.detail-column p {
  color: var(--muted);
  line-height: 2;
}

.background-content {
  border: 1px solid var(--border);
  border-radius: 22px;
  background: rgba(7, 17, 7, 0.45);
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.background-content p {
  color: var(--text);
  line-height: 2;
  max-width: 1000px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.feature-card {
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 2rem;
  background: rgba(7, 17, 7, 0.45);
  transition: 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  border-color: var(--primary);
  box-shadow: var(--shadow);
}

.feature-card i {
  font-size: 1.5rem;
  color: var(--secondary);
  margin-bottom: 1.5rem;
}

.feature-card h3 {
  color: var(--primary);
  margin-bottom: 1rem;
}

.feature-card p {
  color: var(--muted);
  line-height: 1.9;
}

footer {
  margin-top: 4rem;
  padding: 2rem;
  border-top: 1px solid var(--border);
}

.footer-terminal {
  width: min(1400px, 92%);
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
}

.footer-terminal span {
  color: var(--muted);
}

.footer-links {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.footer-links a {
  color: var(--muted);
  transition: 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.footer-links a:hover {
  color: var(--primary);
}

@media (max-width: 992px) {
  .project-header,
  .process-details,
  .features-grid {
    grid-template-columns: 1fr;
  }

  .mobile-screens-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .project-terminal-top {
    grid-template-columns: 1fr;
    gap: 0.7rem;
    height: auto;
    padding: 1rem;
  }

  .project-terminal-title,
  .project-terminal-status {
    text-align: left;
  }

  .project-terminal-body {
    padding: 1.5rem;
  }

  .background-content {
    padding: 2rem;
  }
}

@media (max-width: 768px) {
  .project-title-group h1 {
    font-size: 3rem;
  }

  .detail-column,
  .feature-card {
    padding: 1.5rem;
  }

  .background-content {
    padding: 1.5rem;
  }

  .mobile-screens-grid {
    grid-template-columns: 1fr;
  }
}
</style>
