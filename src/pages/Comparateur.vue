<script setup>
import { ref, computed } from 'vue'
import ComparateurTable from '../components/ComparateurTable.vue'
import candidatsData from '../data/candidats.json'

const allCandidats = candidatsData.filter(c => c.commune_slug === 'toulouse')
const selectedIds = ref([])

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
</script>

<template>
  <div>
    <h1 class="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">
      Comparateur de programmes
    </h1>
    <p class="text-neutral-600 mb-6">
      Sélectionnez 2 ou 3 candidats pour comparer leurs propositions thématique par thématique.
    </p>

    <div class="flex flex-wrap gap-3 mb-8">
      <button
        v-for="candidat in allCandidats"
        :key="candidat.id"
        @click="toggleCandidat(candidat.id)"
        class="px-4 py-2 rounded-lg border-2 font-medium text-sm transition-all cursor-pointer"
        :class="selectedIds.includes(candidat.id)
          ? 'border-primary bg-primary/5 text-primary'
          : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'"
        :disabled="!selectedIds.includes(candidat.id) && selectedIds.length >= 3"
        :aria-pressed="selectedIds.includes(candidat.id)"
      >
        {{ candidat.prenom }} {{ candidat.nom }}
      </button>
    </div>

    <div v-if="selectedCandidats.length >= 2">
      <ComparateurTable :candidats="selectedCandidats" />
    </div>
    <div v-else class="text-center py-16 text-neutral-400">
      <p>Sélectionnez au moins 2 candidats pour commencer la comparaison.</p>
    </div>
  </div>
</template>
