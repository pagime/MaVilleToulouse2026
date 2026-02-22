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

const enjeux = [
  {
    slug: 'transport',
    color: '#2563EB',
    title: 'Transports & gratuité',
    description: 'Gratuité des transports Tisséo pour les jeunes ? RER métropolitain ? Les candidats ont des visions différentes de la mobilité.',
    icon: 'M8 7h.01M8 11h.01M12 7h.01M12 11h.01M16 7h.01M16 11h.01M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z'
  },
  {
    slug: 'urbanisme',
    color: '#9333EA',
    title: 'Logement & loyers',
    description: 'Encadrement des loyers, Airbnb, logements sociaux : le logement est au centre de la campagne.',
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
  },
  {
    slug: 'securite',
    color: '#DC2626',
    title: 'Sécurité & vidéosurveillance',
    description: '1 caméra par rue (Moudenc) ou police de proximité (Piquemal, Briançon) ? Deux approches de la sécurité.',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
  },
  {
    slug: 'ecologie',
    color: '#16A34A',
    title: 'Écologie & canicules',
    description: 'Végétalisation massive, rénovation thermique, 100 000 voitures en moins : comment adapter Toulouse au réchauffement ?',
    icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'
  },
  {
    slug: 'fiscalite',
    color: '#CA8A04',
    title: 'Fiscalité & impôts',
    description: 'Geler la taxe foncière ? La baisser ? Taxer les logements vacants ? Les approches varient selon les candidats.',
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  {
    slug: 'democratie',
    color: '#059669',
    title: 'Démocratie locale',
    description: 'RIC local, budget participatif, coopératives de quartier : quel pouvoir pour les citoyens ?',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
  }
]
</script>

<template>
  <div>
    <section class="text-center py-12 md:py-16">
      <h1 class="text-3xl md:text-5xl font-bold text-primary mb-4">
        Ma Ville Toulouse 2026
      </h1>
      <p class="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto mb-8 leading-relaxed">
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
          Faire le quiz (3 min)
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

    <!-- Bannière programmes provisoires -->
    <section class="mb-6">
      <div class="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl p-4 flex items-start gap-3">
        <svg class="w-5 h-5 text-amber-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
        <div>
          <p class="text-sm font-semibold text-amber-800 dark:text-amber-200">Programmes provisoires</p>
          <p class="text-xs text-amber-700 dark:text-amber-300 mt-1">
            Les positions des candidats sont actuellement basées sur leurs déclarations publiques et programmes publiés.
            Les professions de foi officielles seront déposées le <strong>26 février 2026</strong> — les données seront mises à jour à cette date.
          </p>
        </div>
      </div>
    </section>

    <!-- Contexte électoral -->
    <section class="mb-10">
      <div class="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
        <h2 class="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">Les municipales 2026 à Toulouse</h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div class="bg-accent/50 dark:bg-primary/10 rounded-lg p-4 text-center">
            <p class="text-2xl font-bold text-primary">7</p>
            <p class="text-sm text-neutral-600 dark:text-neutral-300">Candidats déclarés</p>
          </div>
          <div class="bg-accent/50 dark:bg-primary/10 rounded-lg p-4 text-center">
            <p class="text-2xl font-bold text-primary">14 mars</p>
            <p class="text-sm text-neutral-600 dark:text-neutral-300">1er tour</p>
          </div>
          <div class="bg-accent/50 dark:bg-primary/10 rounded-lg p-4 text-center">
            <p class="text-2xl font-bold text-primary">21 mars</p>
            <p class="text-sm text-neutral-600 dark:text-neutral-300">2nd tour</p>
          </div>
          <div class="bg-accent/50 dark:bg-primary/10 rounded-lg p-4 text-center">
            <p class="text-2xl font-bold text-primary">~500 000</p>
            <p class="text-sm text-neutral-600 dark:text-neutral-300">Habitants concernés</p>
          </div>
        </div>
        <div class="text-sm text-neutral-600 dark:text-neutral-300 space-y-2">
          <p>
            Les élections municipales de 2026 détermineront le prochain maire de Toulouse et les 69 conseillers municipaux pour un mandat de 6 ans (2026-2032).
            Le maire sortant <strong>Jean-Luc Moudenc</strong> (divers droite), en place depuis 2014, brigue un troisième mandat.
          </p>
          <p>
            Face à lui, la gauche présente deux listes concurrentes : <strong>François Briançon</strong> (union PS-EELV-PCF-Archipel Citoyen) et <strong>François Piquemal</strong> (LFI-NFP).
            À droite, <strong>Julien Léonardelli</strong> (RN) et <strong>Arthur Cottrel</strong> (Reconquête!) portent les listes souverainistes.
            Deux candidatures citoyennes complètent le panorama : <strong>Nouvel Air</strong> (écologie) et <strong>Pierre Pezzin</strong> (démocratie participative).
          </p>
        </div>
      </div>
    </section>

    <!-- Thèmes clés -->
    <section class="mb-10">
      <h2 class="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">Les grands enjeux de la campagne</h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <router-link
          v-for="enjeu in enjeux"
          :key="enjeu.slug"
          :to="{ path: '/comparer', query: { thematique: enjeu.slug } }"
          class="group bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
        >
          <div class="h-1" :style="{ background: `linear-gradient(to right, ${enjeu.color}, transparent)` }"></div>
          <div class="p-5">
            <div
              class="w-10 h-10 rounded-full flex items-center justify-center mb-3"
              :style="{ backgroundColor: enjeu.color + '26' }"
            >
              <svg class="w-5 h-5" :style="{ color: enjeu.color }" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" :d="enjeu.icon" />
              </svg>
            </div>
            <h3 class="font-semibold text-neutral-800 dark:text-neutral-100 mb-1">{{ enjeu.title }}</h3>
            <p class="text-sm text-neutral-600 dark:text-neutral-300 mb-3">{{ enjeu.description }}</p>
            <span class="inline-flex items-center text-sm font-medium transition-colors" :style="{ color: enjeu.color }">
              Comparer les programmes
              <svg class="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </router-link>
      </div>
    </section>

    <!-- Candidats -->
    <section class="pb-12">
      <h2 class="text-2xl font-bold text-neutral-800 dark:text-neutral-100 mb-6">Les 7 candidats</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <CandidatCard
          v-for="candidat in candidats"
          :key="candidat.id"
          :candidat="candidat"
        />
      </div>
      <p class="text-xs text-neutral-400 dark:text-neutral-500 mt-4 text-center">
        L'ordre d'affichage des candidats est aléatoire et change à chaque chargement.
      </p>
    </section>

    <!-- Comment ça marche -->
    <section class="pb-12">
      <h2 class="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">Comment ça marche ?</h2>
      <div class="grid sm:grid-cols-3 gap-6">
        <div class="text-center">
          <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
            <span class="text-xl font-bold text-primary">1</span>
          </div>
          <h3 class="font-semibold text-neutral-800 dark:text-neutral-100 mb-1">Répondez au quiz</h3>
          <p class="text-sm text-neutral-600 dark:text-neutral-300">20 questions sur les grands enjeux toulousains. Donnez votre avis et indiquez l'importance du sujet pour vous.</p>
        </div>
        <div class="text-center">
          <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
            <span class="text-xl font-bold text-primary">2</span>
          </div>
          <h3 class="font-semibold text-neutral-800 dark:text-neutral-100 mb-1">Découvrez vos résultats</h3>
          <p class="text-sm text-neutral-600 dark:text-neutral-300">Votre compatibilité avec chaque candidat est calculée à partir de leurs positions officielles sourcées.</p>
        </div>
        <div class="text-center">
          <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
            <span class="text-xl font-bold text-primary">3</span>
          </div>
          <h3 class="font-semibold text-neutral-800 dark:text-neutral-100 mb-1">Comparez en détail</h3>
          <p class="text-sm text-neutral-600 dark:text-neutral-300">Consultez les programmes complets et comparez les candidats thématique par thématique.</p>
        </div>
      </div>
    </section>
  </div>
</template>
