<script setup lang="ts">
const { pulse } = useCrt()

const channels = [
  { k: 'LINKEDIN', v: 'in/thirde-aguilera', href: 'https://www.linkedin.com/in/thirde-aguilera-1224931b1/' },
  { k: 'GITHUB', v: 'github.com/thirdestonks', href: 'https://github.com/thirdestonks' },
  { k: 'RESUME', v: 'download resume.pdf', href: 'https://drive.google.com/uc?export=download&id=1g1wr4KCxkOXSPPwP_v_BJXdtdRr51CtQ' },
]
</script>

<template>
  <section class="hud-panel">
    <div class="hud-tag">
      // UPLINK
    </div>
    <h2 class="hud-title">
      CONTACT
    </h2>
    <p>
      Open a channel. I'm always up for interesting work and good conversations.
    </p>

    <div class="channels">
      <a
        v-for="ch in channels"
        :key="ch.k"
        class="channel"
        :href="ch.href"
        target="_blank"
        rel="noopener"
        @click="pulse"
      >
        <span class="ch-k">{{ ch.k }}</span>
        <span class="ch-v">{{ ch.v }}</span>
        <span class="ch-go">▸</span>
      </a>
    </div>
  </section>
</template>

<style scoped>
.channels {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.channel {
  display: grid;
  grid-template-columns: clamp(6rem, 12vmin, 9rem) 1fr auto;
  align-items: center;
  gap: 1rem;
  padding: clamp(0.9rem, 1.6vmin, 1.4rem) 1.2rem;
  border: 1px solid var(--border);
  background: var(--surface-2);
  color: var(--text);
  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    transform 0.2s ease;
}

.channel:hover {
  border-color: var(--primary);
  background: color-mix(in srgb, var(--primary) 6%, transparent);
  transform: translateX(6px);
}

.ch-k {
  font-family: var(--pixel);
  color: var(--secondary);
  font-size: clamp(0.55rem, 1.1vmin, 0.75rem);
}

.ch-v {
  color: var(--muted);
  font-size: clamp(0.8rem, 1.4vmin, 0.95rem);
}

.ch-go {
  color: var(--primary);
}
</style>
