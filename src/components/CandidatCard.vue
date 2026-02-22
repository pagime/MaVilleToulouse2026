<script setup>
import { computed } from 'vue'

const props = defineProps({
  candidat: { type: Object, required: true }
})

const initials = computed(() => {
  return props.candidat.prenom[0] + props.candidat.nom[0]
})
</script>

<template>
  <router-link
    :to="{ name: 'candidat', params: { id: candidat.id } }"
    class="block bg-white rounded-xl shadow-sm border border-neutral-200 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 overflow-hidden focus:outline-2 focus:outline-primary dark:bg-neutral-800 dark:border-neutral-700"
    :aria-label="`Voir le profil de ${candidat.prenom} ${candidat.nom}`"
  >
    <div class="aspect-[4/3] bg-neutral-100 flex items-center justify-center overflow-hidden dark:bg-neutral-700">
      <img
        v-if="candidat.photo"
        :src="candidat.photo"
        :alt="`Photo de ${candidat.prenom} ${candidat.nom}`"
        class="w-full h-full object-cover"
        loading="lazy"
        @error="$event.target.style.display = 'none'; $event.target.nextElementSibling.style.display = 'flex'"
      />
      <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
        <span class="text-4xl font-bold text-primary">{{ initials }}</span>
      </div>
    </div>
    <div class="p-5">
      <h3 class="text-lg font-semibold text-neutral-900 dark:text-white">
        {{ candidat.prenom }} {{ candidat.nom }}
      </h3>
      <p class="text-sm text-secondary font-medium mt-1">{{ candidat.parti }}</p>
      <p class="text-sm text-neutral-500 mt-2 italic dark:text-neutral-400">{{ candidat.slogan }}</p>
      <span
        class="inline-block mt-3 text-xs px-2 py-1 rounded-full font-medium"
        :class="candidat.source_status === 'officiel'
          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
          : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'"
      >
        {{ candidat.source_status === 'officiel' ? 'Programme officiel' : 'Déclarations publiques' }}
      </span>
    </div>
    <div class="h-1 bg-primary"></div>
  </router-link>
</template>
