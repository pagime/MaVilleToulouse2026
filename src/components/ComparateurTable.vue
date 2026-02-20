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
          <span class="mr-2">{{ thematique.icone }}</span>
          {{ thematique.nom }}
        </h3>
      </div>
      <div class="grid divide-x divide-neutral-200" :style="{ gridTemplateColumns: `repeat(${candidats.length}, 1fr)` }">
        <div
          v-for="candidat in candidats"
          :key="candidat.id"
          class="p-4"
        >
          <p class="text-sm font-medium text-primary mb-2">
            {{ candidat.prenom }} {{ candidat.nom }}
          </p>
          <template v-if="getProposition(candidat, thematique.slug)">
            <p class="text-sm font-semibold text-neutral-800 mb-1">
              {{ getProposition(candidat, thematique.slug).titre }}
            </p>
            <p class="text-xs text-neutral-600 mb-2">
              {{ getProposition(candidat, thematique.slug).description }}
            </p>
            <p
              v-if="getProposition(candidat, thematique.slug).cout_estime"
              class="text-xs text-neutral-500"
            >
              Coût estimé : {{ getProposition(candidat, thematique.slug).cout_estime }}
            </p>
            <a
              :href="getProposition(candidat, thematique.slug).source_url"
              target="_blank"
              rel="noopener noreferrer"
              class="text-xs text-secondary hover:underline mt-1 inline-block"
            >
              Source
            </a>
          </template>
          <p v-else class="text-xs text-neutral-400 italic">Pas de proposition sur ce thème</p>
        </div>
      </div>
    </div>
  </div>
</template>
