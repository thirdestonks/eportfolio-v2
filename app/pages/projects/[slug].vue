<script setup lang="ts">
import { getProjectBySlug } from '~/data/projects'

const route = useRoute()
const slug = computed(() => String(route.params.slug))
const project = computed(() => getProjectBySlug(slug.value))

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found' })
}

useHead({
  title: `${project.value.title} — Thirde Aguilera`,
  meta: [{ name: 'description', content: project.value.description }],
})
</script>

<template>
  <ProjectDossier
    v-if="project"
    :project="project"
  />
</template>
