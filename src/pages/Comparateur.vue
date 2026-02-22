<script setup>
import { ref, computed } from 'vue'
import ComparateurTable from '../components/ComparateurTable.vue'
import candidatsData from '../data/candidats.json'
import thematiquesData from '../data/thematiques.json'

const allCandidats = candidatsData.filter(c => c.commune_slug === 'toulouse')
const thematiques = thematiquesData.sort((a, b) => a.ordre - b.ordre)
const selectedIds = ref([])
const selectedThematique = ref(null)

const selectedCandidats = computed(() =>
  selectedIds.value.map(id => allCandidats.find(c => c.id === id)).filter(Boolean)
)

function toggleCandidat(id) {
  const index = selectedIds.value.indexOf(id)
  if (index >= 0) {
    selectedIds.value.splice(index, 1)
  } else if (selectedIds.value.length < 3) {
    selectedIds.value.push(id)
  }
}

function selectThematique(slug) {
  selectedThematique.value = selectedThematique.value === slug ? null : slug
}
</script>

<template>
  <div>
    <h1 class="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-2">
      Comparateur de programmes
    </h1>
    <p class="text-neutral-600 dark:text-neutral-300 mb-6">
      Sélectionnez 2 ou 3 candidats pour comparer leurs propositions thématique par thématique.
    </p>

    <!-- Sélection candidats -->
    <div class="flex flex-wrap gap-3 mb-6">
      <button
        v-for="candidat in allCandidats"
        :key="candidat.id"
        @click="toggleCandidat(candidat.id)"
        class="px-4 py-2 rounded-lg border-2 font-medium text-sm transition-all cursor-pointer"
        :class="selectedIds.includes(candidat.id)
          ? 'border-primary bg-primary/5 dark:bg-primary/10 text-primary'
          : 'border-neutral-200 dark:border-neutral-600 text-neutral-600 dark:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-500'"
        :disabled="!selectedIds.includes(candidat.id) && selectedIds.length >= 3"
        :aria-pressed="selectedIds.includes(candidat.id)"
      >
        {{ candidat.prenom }} {{ candidat.nom }}
      </button>
    </div>

    <!-- Filtre par thématique -->
    <div v-if="selectedCandidats.length >= 2" class="mb-6">
      <p class="text-sm font-medium text-neutral-600 dark:text-neutral-300 mb-3">Filtrer par thématique :</p>
      <div class="flex flex-wrap gap-2">
        <button
          @click="selectedThematique = null"
          class="px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer"
          :class="!selectedThematique
            ? 'bg-primary text-white'
            : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600'"
        >
          Toutes
        </button>
        <button
          v-for="theme in thematiques"
          :key="theme.slug"
          @click="selectThematique(theme.slug)"
          class="px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5"
          :class="selectedThematique === theme.slug
            ? 'text-white'
            : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600'"
          :style="selectedThematique === theme.slug ? { backgroundColor: theme.couleur } : {}"
        >
          <span class="w-2 h-2 rounded-full" :style="{ backgroundColor: theme.couleur }"></span>
          {{ theme.nom }}
        </button>
      </div>
    </div>

    <div v-if="selectedCandidats.length >= 2">
      <ComparateurTable :candidats="selectedCandidats" :filter-thematique="selectedThematique" />
    </div>
    <div v-else class="text-center py-16 text-neutral-400 dark:text-neutral-500">
      <p>Sélectionnez au moins 2 candidats pour commencer la comparaison.</p>
    </div>
  </div>
</template>
