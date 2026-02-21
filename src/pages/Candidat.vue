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

const propositionCount = computed(() => candidat.value?.propositions?.length || 0)

const thematiqueCoverage = computed(() => {
  if (!candidat.value) return 0
  const covered = new Set(candidat.value.propositions.map(p => p.thematique))
  return covered.size
})

function openAll() {
  thematiques.forEach(t => { openThemes.value[t.slug] = true })
}

function closeAll() {
  openThemes.value = {}
}
</script>

<template>
  <div v-if="candidat">
    <router-link to="/" class="inline-flex items-center text-sm text-secondary hover:text-primary mb-6">
      <svg class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      Retour
    </router-link>

    <!-- En-tête candidat -->
    <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 md:p-8 mb-6">
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
          <p class="text-sm text-neutral-600 mt-2">{{ candidat.profession }}</p>
          <div class="flex flex-wrap gap-3 mt-4">
            <a
              v-if="candidat.site_web"
              :href="candidat.site_web"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-light transition-colors"
            >
              Site de campagne
              <svg class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <router-link
              to="/comparer"
              class="inline-flex items-center px-4 py-2 border-2 border-primary text-primary text-sm font-medium rounded-lg hover:bg-primary/5 transition-colors"
            >
              Comparer avec un autre candidat
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Bio + chiffres clés -->
    <div class="grid md:grid-cols-3 gap-6 mb-6">
      <div class="md:col-span-2 bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
        <h2 class="text-lg font-bold text-neutral-800 mb-3">Biographie</h2>
        <p class="text-sm text-neutral-700 leading-relaxed">{{ candidat.bio }}</p>
        <div v-if="candidat.mandats_precedents?.length" class="mt-4">
          <h3 class="text-sm font-semibold text-neutral-700 mb-2">Mandats et expérience :</h3>
          <ul class="text-sm text-neutral-600 space-y-1">
            <li v-for="mandat in candidat.mandats_precedents" :key="mandat" class="flex items-start gap-2">
              <span class="text-primary mt-1">-</span>
              <span>{{ mandat }}</span>
            </li>
          </ul>
        </div>
        <div v-else class="mt-4">
          <p class="text-sm text-neutral-500 italic">Pas de mandat politique précédent.</p>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
        <h2 class="text-lg font-bold text-neutral-800 mb-3">En résumé</h2>
        <div class="space-y-4">
          <div>
            <p class="text-3xl font-bold text-primary">{{ propositionCount }}</p>
            <p class="text-sm text-neutral-600">propositions détaillées</p>
          </div>
          <div>
            <p class="text-3xl font-bold text-primary">{{ thematiqueCoverage }}/10</p>
            <p class="text-sm text-neutral-600">thématiques couvertes</p>
          </div>
          <div>
            <p class="text-3xl font-bold text-primary">{{ candidat.mandats_precedents?.length || 0 }}</p>
            <p class="text-sm text-neutral-600">mandats précédents</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Programme détaillé -->
    <div class="mb-4 flex items-center justify-between">
      <h2 class="text-xl font-bold text-neutral-800">Programme par thématique</h2>
      <div class="flex gap-2 text-xs">
        <button @click="openAll" class="text-secondary hover:text-primary transition-colors cursor-pointer">Tout ouvrir</button>
        <span class="text-neutral-300">|</span>
        <button @click="closeAll" class="text-secondary hover:text-primary transition-colors cursor-pointer">Tout fermer</button>
      </div>
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
          <div class="flex items-center gap-3">
            <span class="font-semibold text-neutral-800">
              <span class="inline-block w-3 h-3 rounded-full mr-2" :style="{ backgroundColor: thematique.couleur }"></span>
              {{ thematique.nom }}
            </span>
            <span
              v-if="getPropositions(thematique.slug).length"
              class="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full"
            >
              {{ getPropositions(thematique.slug).length }} proposition{{ getPropositions(thematique.slug).length > 1 ? 's' : '' }}
            </span>
            <span v-else class="text-xs bg-neutral-100 text-neutral-400 px-2 py-0.5 rounded-full">
              Pas de position
            </span>
          </div>
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
              <p class="text-sm text-neutral-600 mt-1 leading-relaxed">{{ prop.description }}</p>
              <div class="flex flex-wrap gap-4 mt-2 text-xs text-neutral-500">
                <span v-if="prop.cout_estime" class="inline-flex items-center gap-1 bg-neutral-100 px-2 py-1 rounded">
                  Coût estimé : {{ prop.cout_estime }}
                </span>
                <a
                  :href="prop.source_url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1 text-secondary hover:underline"
                >
                  Voir la source
                  <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <p v-else class="pt-4 text-sm text-neutral-400 italic">
            Ce candidat n'a pas publié de proposition sur ce thème.
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
