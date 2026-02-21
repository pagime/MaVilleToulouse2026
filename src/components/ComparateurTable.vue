<script setup>
import thematiquesData from '../data/thematiques.json'

defineProps({
  candidats: { type: Array, required: true }
})

const thematiques = thematiquesData.sort((a, b) => a.ordre - b.ordre)

function getProposition(candidat, thematiqueSlug) {
  return candidat.propositions.find(p => p.thematique === thematiqueSlug)
}
</script>

<template>
  <div class="space-y-6">
    <div
      v-for="thematique in thematiques"
      :key="thematique.slug"
      class="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden"
    >
      <div class="bg-neutral-50 px-5 py-3 border-b border-neutral-200">
        <h3 class="font-semibold text-neutral-800">
          <span class="inline-block w-3 h-3 rounded-full mr-2" :style="{ backgroundColor: thematique.couleur }"></span>
          {{ thematique.nom }}
        </h3>
      </div>

      <!-- Mobile: cartes empilées -->
      <div class="sm:hidden divide-y divide-neutral-100">
        <div
          v-for="candidat in candidats"
          :key="candidat.id"
          class="p-4"
        >
          <p class="text-sm font-semibold text-primary mb-2">
            {{ candidat.prenom }} {{ candidat.nom }}
          </p>
          <template v-if="getProposition(candidat, thematique.slug)">
            <p class="text-sm font-medium text-neutral-800 mb-1">
              {{ getProposition(candidat, thematique.slug).titre }}
            </p>
            <p class="text-xs text-neutral-600 mb-2 leading-relaxed">
              {{ getProposition(candidat, thematique.slug).description }}
            </p>
            <div class="flex flex-wrap gap-2">
              <span
                v-if="getProposition(candidat, thematique.slug).cout_estime"
                class="text-xs bg-neutral-100 text-neutral-500 px-2 py-0.5 rounded"
              >
                {{ getProposition(candidat, thematique.slug).cout_estime }}
              </span>
              <a
                :href="getProposition(candidat, thematique.slug).source_url"
                target="_blank"
                rel="noopener noreferrer"
                class="text-xs text-secondary hover:underline"
              >
                Source
              </a>
            </div>
          </template>
          <p v-else class="text-xs text-neutral-400 italic">Pas de proposition sur ce thème</p>
        </div>
      </div>

      <!-- Desktop: colonnes côte à côte -->
      <div class="hidden sm:grid divide-x divide-neutral-200" :style="{ gridTemplateColumns: `repeat(${candidats.length}, 1fr)` }">
        <div
          v-for="candidat in candidats"
          :key="candidat.id"
          class="p-4"
        >
          <p class="text-sm font-semibold text-primary mb-2">
            {{ candidat.prenom }} {{ candidat.nom }}
          </p>
          <template v-if="getProposition(candidat, thematique.slug)">
            <p class="text-sm font-medium text-neutral-800 mb-1">
              {{ getProposition(candidat, thematique.slug).titre }}
            </p>
            <p class="text-xs text-neutral-600 mb-2 leading-relaxed">
              {{ getProposition(candidat, thematique.slug).description }}
            </p>
            <div class="flex flex-wrap gap-2">
              <span
                v-if="getProposition(candidat, thematique.slug).cout_estime"
                class="text-xs bg-neutral-100 text-neutral-500 px-2 py-0.5 rounded"
              >
                {{ getProposition(candidat, thematique.slug).cout_estime }}
              </span>
              <a
                :href="getProposition(candidat, thematique.slug).source_url"
                target="_blank"
                rel="noopener noreferrer"
                class="text-xs text-secondary hover:underline"
              >
                Source
              </a>
            </div>
          </template>
          <p v-else class="text-xs text-neutral-400 italic">Pas de proposition sur ce thème</p>
        </div>
      </div>
    </div>
  </div>
</template>
