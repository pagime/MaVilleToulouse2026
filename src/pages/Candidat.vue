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
    <router-link to="/" class="group inline-flex items-center text-sm text-secondary hover:text-primary mb-6">
      <svg class="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      Retour
    </router-link>

    <!-- En-tête candidat -->
    <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 md:p-8 mb-6 dark:bg-neutral-800 dark:border-neutral-700">
      <div class="flex flex-col md:flex-row gap-6">
        <div class="w-32 h-32 md:w-40 md:h-40 rounded-2xl ring-4 ring-primary/20 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0 overflow-hidden">
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
          <h1 class="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white">
            {{ candidat.prenom }} {{ candidat.nom }}
          </h1>
          <p class="text-lg text-secondary font-medium mt-1">{{ candidat.parti }}</p>
          <p class="text-neutral-500 italic mt-1 dark:text-neutral-400">{{ candidat.slogan }}</p>
          <p class="text-sm text-neutral-600 mt-2 dark:text-neutral-300">{{ candidat.profession }}</p>
          <span
            class="inline-block mt-2 text-xs px-2 py-1 rounded-full font-medium"
            :class="candidat.source_status === 'officiel'
              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
              : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'"
          >
            {{ candidat.source_status === 'officiel' ? 'Programme officiel vérifié' : 'Basé sur les déclarations publiques' }}
          </span>
          <div class="flex flex-wrap gap-3 mt-4">
            <a
              v-if="candidat.site_web"
              :href="candidat.site_web"
              target="_blank"
              rel="noopener noreferrer"
              class="group inline-flex items-center px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-light transition-colors"
            >
              Site de campagne
              <svg class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <router-link
              to="/comparer"
              class="group inline-flex items-center px-4 py-2 border-2 border-primary text-primary text-sm font-medium rounded-lg hover:bg-primary/5 transition-colors"
            >
              Comparer avec un autre candidat
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Points clés -->
    <div v-if="candidat.points_cles?.length" class="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 mb-6 dark:bg-neutral-800 dark:border-neutral-700">
      <h2 class="text-lg font-bold text-neutral-800 mb-4 dark:text-neutral-100">5 points clés du programme</h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
        <div
          v-for="(point, i) in candidat.points_cles"
          :key="i"
          class="flex items-start gap-3 p-3 rounded-lg bg-neutral-50 dark:bg-neutral-700/50"
        >
          <span class="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">{{ i + 1 }}</span>
          <p class="text-sm text-neutral-700 dark:text-neutral-200 font-medium leading-snug">{{ point }}</p>
        </div>
      </div>
    </div>

    <!-- Bio + chiffres clés -->
    <div class="grid md:grid-cols-3 gap-6 mb-6">
      <div class="md:col-span-2 bg-white rounded-xl shadow-sm border border-neutral-200 p-6 dark:bg-neutral-800 dark:border-neutral-700">
        <h2 class="text-lg font-bold text-neutral-800 mb-3 dark:text-neutral-100">Biographie</h2>
        <p class="text-sm text-neutral-700 leading-relaxed dark:text-neutral-200">{{ candidat.bio }}</p>
        <div v-if="candidat.mandats_precedents?.length" class="mt-4">
          <h3 class="text-sm font-semibold text-neutral-700 mb-3 dark:text-neutral-200">Mandats et expérience :</h3>
          <div class="relative ml-3 border-l-2 border-primary/20 dark:border-primary/30">
            <div
              v-for="mandat in candidat.mandats_precedents"
              :key="mandat"
              class="relative pl-5 pb-3 last:pb-0"
            >
              <span class="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary"></span>
              <span class="text-sm text-neutral-600 dark:text-neutral-300">{{ mandat }}</span>
            </div>
          </div>
        </div>
        <div v-else class="mt-4">
          <p class="text-sm text-neutral-500 italic dark:text-neutral-400">Pas de mandat politique précédent.</p>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 dark:border-neutral-700 dark:bg-neutral-800">
        <h2 class="text-lg font-bold text-neutral-800 mb-3 dark:text-neutral-100">En résumé</h2>
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <svg class="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <div>
              <p class="text-3xl font-bold text-primary">{{ propositionCount }}</p>
              <p class="text-sm text-neutral-600 dark:text-neutral-300">propositions détaillées</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <svg class="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
            </div>
            <div>
              <p class="text-3xl font-bold text-primary">{{ thematiqueCoverage }}/10</p>
              <p class="text-sm text-neutral-600 dark:text-neutral-300">thématiques couvertes</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <svg class="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p class="text-3xl font-bold text-primary">{{ candidat.mandats_precedents?.length || 0 }}</p>
              <p class="text-sm text-neutral-600 dark:text-neutral-300">mandats précédents</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Programme détaillé -->
    <div class="mb-4 flex items-center justify-between">
      <h2 class="text-xl font-bold text-neutral-800 dark:text-neutral-100">Programme par thématique</h2>
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
        class="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden dark:bg-neutral-800 dark:border-neutral-700"
      >
        <button
          @click="toggleTheme(thematique.slug)"
          class="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-neutral-50 transition-colors cursor-pointer dark:hover:bg-neutral-700"
          :aria-expanded="openThemes[thematique.slug]"
        >
          <div class="flex items-center gap-3">
            <span class="font-semibold text-neutral-800 dark:text-neutral-100">
              <span class="inline-block w-3 h-3 rounded-full mr-2" :style="{ backgroundColor: thematique.couleur }"></span>
              {{ thematique.nom }}
            </span>
            <span
              v-if="getPropositions(thematique.slug).length"
              class="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full"
            >
              {{ getPropositions(thematique.slug).length }} proposition{{ getPropositions(thematique.slug).length > 1 ? 's' : '' }}
            </span>
            <span v-else class="text-xs bg-neutral-100 text-neutral-400 px-2 py-0.5 rounded-full dark:bg-neutral-700 dark:text-neutral-500">
              Pas de position
            </span>
          </div>
          <svg
            class="w-5 h-5 text-neutral-400 transition-transform duration-200 dark:text-neutral-500"
            :class="{ 'rotate-180': openThemes[thematique.slug] }"
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div
          class="grid transition-[grid-template-rows] duration-300 ease-in-out"
          :class="openThemes[thematique.slug] ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
        >
          <div class="overflow-hidden">
            <div class="px-5 pb-5 border-t border-neutral-100 dark:border-neutral-700">
              <div v-if="getPropositions(thematique.slug).length">
                <div
                  v-for="prop in getPropositions(thematique.slug)"
                  :key="prop.titre"
                  class="pt-4 pl-4 border-l-4"
                  :style="{ borderColor: thematique.couleur }"
                >
                  <h4 class="font-semibold text-neutral-800 dark:text-neutral-100">{{ prop.titre }}</h4>
                  <p class="text-sm text-neutral-600 mt-1 leading-relaxed dark:text-neutral-300">{{ prop.description }}</p>
                  <div class="flex flex-wrap gap-4 mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                    <span v-if="prop.cout_estime" class="inline-flex items-center gap-1 bg-neutral-100 px-2 py-1 rounded dark:bg-neutral-700">
                      Coût estimé : {{ prop.cout_estime }}
                    </span>
                    <a
                      :href="prop.source_url"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="group inline-flex items-center gap-1 text-secondary hover:underline"
                    >
                      Voir la source
                      <svg class="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              <p v-else class="pt-4 text-sm text-neutral-400 italic dark:text-neutral-500">
                Ce candidat n'a pas publié de proposition sur ce thème.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="text-center py-16">
    <p class="text-neutral-500 dark:text-neutral-400">Candidat non trouvé.</p>
    <router-link to="/" class="text-primary hover:underline mt-4 inline-block">
      Retour à l'accueil
    </router-link>
  </div>
</template>
