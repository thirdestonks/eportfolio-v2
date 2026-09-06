<script setup lang="ts">
const { pulse } = useCrt()

const links = [
  { label: '> linkedin', href: 'https://www.linkedin.com/in/thirde-aguilera-1224931b1/' },
  { label: '> github', href: 'https://github.com/thirdestonks' },
  { label: '> resume.pdf', href: 'https://drive.google.com/uc?export=download&id=1g1wr4KCxkOXSPPwP_v_BJXdtdRr51CtQ' },
]
</script>

<template>
  <section class="hud-panel home">
    <div class="home-main">
      <div class="hud-tag">
        // IDENTITY
      </div>
      <h1 class="home-name">
        THIRDE<br>AGUILERA
      </h1>
      <div class="home-role">
        FULL STACK SOFTWARE ENGINEER
      </div>
      <p class="hud-muted">
        &gt; LOC: Manila, PH &nbsp;·&nbsp; STATUS: <span class="status-live">[ ONLINE ]</span>
      </p>
      <p>
        Software engineer building digital infrastructure at TESDA. Navigate with
        the rail on the left, this screen never scrolls.
      </p>
      <div class="home-links">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          target="_blank"
          rel="noopener"
          @click="pulse"
        >{{ link.label }}</a>
      </div>
    </div>

    <aside class="id-card">
      <div class="id-top">
        <span>ID_0xT3</span>
        <span>SIGNAL LOW</span>
      </div>
      <ClientOnly>
        <div class="portrait-flip">
          <div class="portrait-flip-inner">
            <CrtPortrait class="portrait-face portrait-face--front" src="/images/profile-icon.png" />
            <CrtPortrait class="portrait-face portrait-face--back" src="/images/profile2.png" />
          </div>
        </div>
      </ClientOnly>
      <div class="id-rows">
        <div class="id-row">
          <span>NAME</span><span>T. AGUILERA</span>
        </div>
        <div class="id-row">
          <span>EXP</span><span>3+ Years</span>
        </div>
        <div class="id-row">
          <span>JOB</span><span>Computer Programmer III</span>
        </div>
        <div class="id-row">
          <span>STATUS</span><span class="status-live">ACTIVE</span>
        </div>
      </div>
    </aside>
  </section>
</template>

<style scoped>
.home {
  display: grid;
  grid-template-columns: 1.4fr 0.8fr;
  gap: clamp(1.5rem, 4vmin, 4rem);
  align-items: center;
}

.home-name {
  font-family: var(--pixel);
  color: var(--primary);
  font-size: clamp(1.8rem, 5.4vmin, 4.6rem);
  line-height: 1.25;
  margin: clamp(0.8rem, 1.6vmin, 1.6rem) 0 clamp(1rem, 2vmin, 2rem);
  text-shadow: 0 0 2vmin color-mix(in srgb, var(--primary) 55%, transparent), 3px 3px 0 rgba(0, 0, 0, 0.6);
}

.home-role {
  font-family: var(--pixel);
  color: var(--secondary);
  font-size: clamp(0.7rem, 1.7vmin, 1.15rem);
  line-height: 1.5;
  margin-bottom: 1.4rem;
  text-shadow: 0 0 1vmin color-mix(in srgb, var(--secondary) 40%, transparent);
}

.home-links {
  display: flex;
  gap: clamp(1rem, 2.4vmin, 2.4rem);
  flex-wrap: wrap;
  margin-top: 2rem;
}

.home-links a {
  color: var(--muted);
  transition:
    color 0.2s ease,
    transform 0.2s ease;
  font-size: clamp(0.85rem, 1.6vmin, 1.05rem);
}

.home-links a:hover {
  color: var(--primary);
  transform: translateX(6px);
}

/* ID card */
.id-card {
  border: 1px solid var(--border);
  background: color-mix(in srgb, var(--bg) 60%, #000);
  padding: 0.7rem;
  box-shadow: var(--shadow);
}

/* Flippable portrait: hover the card to reveal the back photo */
.portrait-flip {
  perspective: 1200px;
}

.portrait-flip-inner {
  position: relative;
  width: 100%;
  aspect-ratio: 300 / 360;
  transition: transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
  transform-style: preserve-3d;
}

.portrait-flip:hover .portrait-flip-inner {
  transform: rotateY(180deg);
}

.portrait-face {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
}

.portrait-face--back {
  transform: rotateY(180deg);
}

.id-top,
.id-row {
  display: flex;
  justify-content: space-between;
  font-family: var(--pixel);
  font-size: clamp(0.5rem, 1vmin, 0.68rem);
  color: var(--muted);
}

.id-top {
  padding: 0.3rem 0.4rem 0.6rem;
}

.id-rows {
  margin-top: 0.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.id-row {
  padding: 0.4rem;
  border-bottom: 1px solid var(--border-soft);
}

.id-row span:last-child {
  color: var(--primary);
}

@media (max-width: 720px) {
  .home {
    grid-template-columns: 1fr;
  }

  .id-card {
    max-width: 16rem;
  }
}
</style>
