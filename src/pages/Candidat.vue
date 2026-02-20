<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import candidatsData from '../data/candidats.json'
import thematiquesData from '../data/thematiques.json'

const route = useRoute()

const candidat = computed(() =>
  candidatsData.find(c => c.id === route.params.id)
)

const thematiques = thematiquesData.sort((a, b) => a.ordre - b.ordre)

const openThemes = ref({})

function toggleTheme(slug) {
  openThemes.value[slug] = !openThemes.value[slug]
}

function getPropositions(thematiqueSlug) {
  if (!candidat.value) return []
  return candidat.value.propositions.filter(p => p.thematique === thematiqueSlug)
}

function getThematique(slug) {
  return thematiques.find(t => t.slug === slug)
}

const initials = computed(() => {
  if (!candidat.value) return ''
  return candidat.value.prenom[0] + candidat.value.nom[0]
})
</script>

<template>
  <div v-if="candidat">
    <router-link to="/" class="inline-flex items-center text-sm text-secondary hover:text-primary mb-6">
      <svg class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      Retour
    </router-link>

    <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 md:p-8 mb-8">
      <div class="flex flex-col md:flex-row gap-6">
        <div class="w-32 h-32 md:w-40 md:h-40 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 overflow-hidden">
          <img
            v-if="candidat.photo"
            :src="candidat.photo"
            :alt="`Photo de ${candidat.prenom} ${candidat.nom}`"
            class="w-full h-full object-cover"
            @error="$event.target.style.display = 'none'"
          />
          <span class="text-4xl font-bold text-primary">{{ initials }}</span>
        </div>
        <div class="flex-1">
          <h1 class="text-2xl md:text-3xl font-bold text-neutral-900">
            {{ candidat.prenom }} {{ candidat.nom }}
          </h1>
          <p class="text-lg text-secondary font-medium mt-1">{{ candidat.parti }}</p>
          <p class="text-neutral-500 italic mt-1">{{ candidat.slogan }}</p>
          <p class="text-sm text-neutral-600 mt-3">{{ candidat.profession }}</p>
          <div v-if="candidat.mandats_precedents?.length" class="mt-3">
            <p class="text-sm text-neutral-500">Mandats précédents :</p>
            <ul class="text-sm text-neutral-600 list-disc list-inside">
              <li v-for="mandat in candidat.mandats_precedents" :key="mandat">{{ mandat }}</li>
            </ul>
          </div>
          <div class="flex gap-3 mt-4">
            <a
              v-if="candidat.site_web"
              :href="candidat.site_web"
              target="_blank"
              rel="noopener noreferrer"
              class="text-sm text-secondary hover:text-primary font-medium"
            >
              Site officiel
            </a>
            <router-link
              to="/comparer"
              class="text-sm text-secondary hover:text-primary font-medium"
            >
              Comparer avec un autre candidat
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="mb-4">
      <h2 class="text-xl font-bold text-neutral-800">Programme</h2>
      <p class="text-sm text-neutral-500 mt-1">{{ candidat.bio }}</p>
    </div>

    <div class="space-y-3">
      <div
        v-for="thematique in thematiques"
        :key="thematique.slug"
        class="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden"
      >
        <button
          @click="toggleTheme(thematique.slug)"
          class="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-neutral-50 transition-colors cursor-pointer"
          :aria-expanded="openThemes[thematique.slug]"
        >
          <span class="font-semibold text-neutral-800">
            <span class="mr-2">{{ thematique.icone }}</span>
            {{ thematique.nom }}
          </span>
          <svg
            class="w-5 h-5 text-neutral-400 transition-transform duration-200"
            :class="{ 'rotate-180': openThemes[thematique.slug] }"
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div v-if="openThemes[thematique.slug]" class="px-5 pb-5 border-t border-neutral-100">
          <div v-if="getPropositions(thematique.slug).length">
            <div
              v-for="prop in getPropositions(thematique.slug)"
              :key="prop.titre"
              class="pt-4"
            >
              <h4 class="font-semibold text-neutral-800">{{ prop.titre }}</h4>
              <p class="text-sm text-neutral-600 mt-1">{{ prop.description }}</p>
              <div class="flex gap-4 mt-2 text-xs text-neutral-500">
                <span v-if="prop.cout_estime">Coût estimé : {{ prop.cout_estime }}</span>
                <a
                  :href="prop.source_url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-secondary hover:underline"
                >
                  Voir la source
                </a>
              </div>
            </div>
          </div>
          <p v-else class="pt-4 text-sm text-neutral-400 italic">
            Pas de proposition sur ce thème.
          </p>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="text-center py-16">
    <p class="text-neutral-500">Candidat non trouvé.</p>
    <router-link to="/" class="text-primary hover:underline mt-4 inline-block">
      Retour à l'accueil
    </router-link>
  </div>
</template>
