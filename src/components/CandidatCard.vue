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
    class="block bg-white rounded-xl shadow-sm border border-neutral-200 hover:shadow-md transition-shadow duration-200 overflow-hidden focus:outline-2 focus:outline-primary"
    :aria-label="`Voir le profil de ${candidat.prenom} ${candidat.nom}`"
  >
    <div class="aspect-[4/3] bg-neutral-100 flex items-center justify-center overflow-hidden">
      <img
        v-if="candidat.photo"
        :src="candidat.photo"
        :alt="`Photo de ${candidat.prenom} ${candidat.nom}`"
        class="w-full h-full object-cover"
        loading="lazy"
        @error="$event.target.style.display = 'none'; $event.target.nextElementSibling.style.display = 'flex'"
      />
      <div class="w-full h-full flex items-center justify-center bg-primary/10">
        <span class="text-4xl font-bold text-primary">{{ initials }}</span>
      </div>
    </div>
    <div class="p-5">
      <h3 class="text-lg font-semibold text-neutral-900">
        {{ candidat.prenom }} {{ candidat.nom }}
      </h3>
      <p class="text-sm text-secondary font-medium mt-1">{{ candidat.parti }}</p>
      <p class="text-sm text-neutral-500 mt-2 italic">{{ candidat.slogan }}</p>
    </div>
  </router-link>
</template>
