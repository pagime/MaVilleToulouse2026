<script setup>
import { computed } from 'vue'

// Obfuscation simple pour éviter le scraping par les bots
const user = 'pablomzpv'
const domain = 'gmail.com'
const email = computed(() => `${user}@${domain}`)
function mailto(subject) {
  return `mailto:${email.value}?subject=${encodeURIComponent(subject)}`
}
</script>

<template>
  <div class="max-w-2xl mx-auto">
    <h1 class="text-2xl md:text-3xl font-bold text-neutral-900 mb-2 dark:text-white">
      Contact & Droit de réponse
    </h1>
    <p class="text-neutral-600 mb-8 dark:text-neutral-300">
      Cette page permet aux candidats, à leurs équipes ou à tout citoyen de nous contacter.
    </p>

    <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 mb-6 dark:border-neutral-700 dark:bg-neutral-800">
      <h2 class="text-lg font-semibold text-neutral-800 mb-4 dark:text-neutral-100">Pour les candidats et leurs équipes</h2>
      <p class="text-sm text-neutral-700 mb-4 dark:text-neutral-200">
        Vous pouvez nous contacter pour :
      </p>
      <ul class="text-sm text-neutral-600 list-disc list-inside space-y-2 mb-4 dark:text-neutral-300">
        <li>Signaler une position mal attribuée</li>
        <li>Demander une correction factuelle</li>
        <li>Fournir des sources complémentaires pour préciser vos positions</li>
      </ul>
      <p class="text-sm text-neutral-700 mb-4 dark:text-neutral-200">
        <strong>Engagement :</strong> Toute demande de correction sera traitée sous 48h.
      </p>
      <a
        :href="mailto('Droit de réponse - Ma Ville Toulouse 2026')"
        class="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-light transition-colors"
      >
        Nous écrire par email
      </a>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 dark:border-neutral-700 dark:bg-neutral-800">
      <h2 class="text-lg font-semibold text-neutral-800 mb-4 dark:text-neutral-100">Pour les citoyens</h2>
      <p class="text-sm text-neutral-700 mb-4 dark:text-neutral-200">
        Vous avez une question, une suggestion ou vous souhaitez signaler une erreur ?
        N'hésitez pas à nous contacter.
      </p>
      <a
        :href="mailto('Question - Ma Ville Toulouse 2026')"
        class="inline-flex items-center px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary/5 transition-colors"
      >
        Nous contacter
      </a>
    </div>

    <p class="text-xs text-neutral-400 mt-6 text-center dark:text-neutral-500">
      Les positions attribuées aux candidats sont basées sur leurs programmes officiels
      et déclarations publiques. Toute demande de correction sera traitée sous 48h.
    </p>
  </div>
</template>
