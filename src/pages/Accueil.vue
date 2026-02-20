<script setup>
import { computed } from 'vue'
import CandidatCard from '../components/CandidatCard.vue'
import ReserveBanner from '../components/ReserveBanner.vue'
import { useShuffle } from '../composables/useShuffle'
import { useReserve } from '../composables/useReserve'
import candidatsData from '../data/candidats.json'

const { shuffle } = useShuffle()
const { isReserve } = useReserve()

const candidats = computed(() => shuffle(
  candidatsData.filter(c => c.commune_slug === 'toulouse')
))
</script>

<template>
  <div>
    <section class="text-center py-12 md:py-16">
      <h1 class="text-3xl md:text-5xl font-bold text-primary mb-4">
        MaVille2026 — Toulouse
      </h1>
      <p class="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto mb-8 leading-relaxed">
        Informez-vous sur les candidats aux élections municipales 2026,
        comparez leurs programmes et découvrez avec quel projet vous êtes
        le plus compatible.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <router-link
          v-if="!isReserve"
          to="/quiz"
          class="inline-flex items-center justify-center px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-light transition-colors"
        >
          Faire le quiz
        </router-link>
        <router-link
          to="/comparer"
          class="inline-flex items-center justify-center px-8 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary/5 transition-colors"
        >
          Comparer les programmes
        </router-link>
      </div>
    </section>

    <ReserveBanner />

    <section class="pb-12">
      <h2 class="text-2xl font-bold text-neutral-800 mb-6">Les candidats</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <CandidatCard
          v-for="candidat in candidats"
          :key="candidat.id"
          :candidat="candidat"
        />
      </div>
      <p class="text-xs text-neutral-400 mt-4 text-center">
        L'ordre d'affichage des candidats est aléatoire et change à chaque chargement.
      </p>
    </section>
  </div>
</template>
