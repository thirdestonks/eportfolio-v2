import { projects } from './app/data/projects'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/fonts', '@tresjs/nuxt'],

  ssr: true,
  devtools: { enabled: true },

  app: {
    head: {
      title: 'Thirde Aguilera',
      // Inline background so the very first paint is already dark — kills the
      // white flash before the stylesheet/JS loads on mount and reload.
      htmlAttrs: { lang: 'en', style: 'background-color:#000' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        {
          name: 'description',
          content:
            'Thirde Aguilera — Full Stack Software Engineer based in Manila, Philippines.',
        },
      ],
      link: [{ rel: 'icon', href: '/images/profile-icon2.png', type: 'image/png' }],
    },
  },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    public: {
      formspreeEndpoint: 'https://formspree.io/f/mblapwgy',
    },
  },
  compatibilityDate: '2025-07-15',
  nitro: {
    preset: 'static',
    prerender: {
      routes: projects.map(project => `/projects/${project.slug}`),
    },
  },

  typescript: {
    strict: true,
    typeCheck: false,
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  fonts: {
    families: [
      { name: 'IBM Plex Mono', provider: 'google', weights: [400, 500, 600, 700] },
      { name: 'Press Start 2P', provider: 'google', weights: [400] },
    ],
  },
})
