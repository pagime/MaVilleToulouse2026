<script setup>
import { computed } from 'vue'
import CandidatCard from '../components/CandidatCard.vue'
import { useShuffle } from '../composables/useShuffle'
import candidatsData from '../data/candidats.json'

const { shuffle } = useShuffle()

const candidats = computed(() => shuffle(
  candidatsData.filter(c => c.commune_slug === 'toulouse')
))
</script>

<template>
  <div>
    <h1 class="text-2xl md:text-3xl font-bold text-neutral-900 mb-2 dark:text-white">
      Les candidats aux municipales 2026
    </h1>
    <p class="text-neutral-600 dark:text-neutral-300 mb-8">
      {{ candidats.length }} listes sont officiellement en lice pour les élections municipales de Toulouse les 14 et 21 mars 2026.
    </p>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <CandidatCard
        v-for="candidat in candidats"
        :key="candidat.id"
        :candidat="candidat"
      />
    </div>

    <p class="text-xs text-neutral-400 dark:text-neutral-500 mt-6 text-center">
      L'ordre d'affichage des candidats est aléatoire et change à chaque chargement.
    </p>
  </div>
</template>
