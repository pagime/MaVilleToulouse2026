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

    <!-- Contexte électoral -->
    <section class="mb-10">
      <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
        <h2 class="text-xl font-bold text-neutral-800 mb-4">Les municipales 2026 à Toulouse</h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div class="bg-accent/50 rounded-lg p-4 text-center">
            <p class="text-2xl font-bold text-primary">7</p>
            <p class="text-sm text-neutral-600">Candidats déclarés</p>
          </div>
          <div class="bg-accent/50 rounded-lg p-4 text-center">
            <p class="text-2xl font-bold text-primary">14 mars</p>
            <p class="text-sm text-neutral-600">1er tour</p>
          </div>
          <div class="bg-accent/50 rounded-lg p-4 text-center">
            <p class="text-2xl font-bold text-primary">21 mars</p>
            <p class="text-sm text-neutral-600">2nd tour</p>
          </div>
          <div class="bg-accent/50 rounded-lg p-4 text-center">
            <p class="text-2xl font-bold text-primary">~500 000</p>
            <p class="text-sm text-neutral-600">Habitants concernés</p>
          </div>
        </div>
        <div class="text-sm text-neutral-600 space-y-2">
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
      <h2 class="text-xl font-bold text-neutral-800 mb-4">Les grands enjeux de la campagne</h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-5">
          <div class="w-3 h-3 rounded-full mb-3" style="background-color: #2563EB"></div>
          <h3 class="font-semibold text-neutral-800 mb-1">Transports & gratuité</h3>
          <p class="text-sm text-neutral-600">Gratuité des transports Tisséo pour les jeunes ? RER métropolitain ? Les candidats ont des visions différentes de la mobilité.</p>
        </div>
        <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-5">
          <div class="w-3 h-3 rounded-full mb-3" style="background-color: #9333EA"></div>
          <h3 class="font-semibold text-neutral-800 mb-1">Logement & loyers</h3>
          <p class="text-sm text-neutral-600">Encadrement des loyers, Airbnb, logements sociaux : le logement est au centre de la campagne.</p>
        </div>
        <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-5">
          <div class="w-3 h-3 rounded-full mb-3" style="background-color: #DC2626"></div>
          <h3 class="font-semibold text-neutral-800 mb-1">Sécurité & vidéosurveillance</h3>
          <p class="text-sm text-neutral-600">1 caméra par rue (Moudenc) ou police de proximité (Piquemal, Briançon) ? Deux approches de la sécurité.</p>
        </div>
        <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-5">
          <div class="w-3 h-3 rounded-full mb-3" style="background-color: #16A34A"></div>
          <h3 class="font-semibold text-neutral-800 mb-1">Écologie & canicules</h3>
          <p class="text-sm text-neutral-600">Végétalisation massive, rénovation thermique, 100 000 voitures en moins : comment adapter Toulouse au réchauffement ?</p>
        </div>
        <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-5">
          <div class="w-3 h-3 rounded-full mb-3" style="background-color: #CA8A04"></div>
          <h3 class="font-semibold text-neutral-800 mb-1">Fiscalité & impôts</h3>
          <p class="text-sm text-neutral-600">Geler la taxe foncière ? La baisser ? Taxer les logements vacants ? Les approches varient selon les candidats.</p>
        </div>
        <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-5">
          <div class="w-3 h-3 rounded-full mb-3" style="background-color: #059669"></div>
          <h3 class="font-semibold text-neutral-800 mb-1">Démocratie locale</h3>
          <p class="text-sm text-neutral-600">RIC local, budget participatif, coopératives de quartier : quel pouvoir pour les citoyens ?</p>
        </div>
      </div>
    </section>

    <!-- Candidats -->
    <section class="pb-12">
      <h2 class="text-2xl font-bold text-neutral-800 mb-6">Les 7 candidats</h2>
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

    <!-- Comment ça marche -->
    <section class="pb-12">
      <h2 class="text-xl font-bold text-neutral-800 mb-4">Comment ça marche ?</h2>
      <div class="grid sm:grid-cols-3 gap-6">
        <div class="text-center">
          <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
            <span class="text-xl font-bold text-primary">1</span>
          </div>
          <h3 class="font-semibold text-neutral-800 mb-1">Répondez au quiz</h3>
          <p class="text-sm text-neutral-600">20 questions sur les grands enjeux toulousains. Donnez votre avis et indiquez l'importance du sujet pour vous.</p>
        </div>
        <div class="text-center">
          <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
            <span class="text-xl font-bold text-primary">2</span>
          </div>
          <h3 class="font-semibold text-neutral-800 mb-1">Découvrez vos résultats</h3>
          <p class="text-sm text-neutral-600">Votre compatibilité avec chaque candidat est calculée à partir de leurs positions officielles sourcées.</p>
        </div>
        <div class="text-center">
          <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
            <span class="text-xl font-bold text-primary">3</span>
          </div>
          <h3 class="font-semibold text-neutral-800 mb-1">Comparez en détail</h3>
          <p class="text-sm text-neutral-600">Consultez les programmes complets et comparez les candidats thématique par thématique.</p>
        </div>
      </div>
    </section>
  </div>
</template>
