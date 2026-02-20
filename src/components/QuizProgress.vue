<script setup>
import { computed } from 'vue'

const props = defineProps({
  current: { type: Number, required: true },
  total: { type: Number, required: true }
})

const percentage = computed(() => Math.round((props.current / props.total) * 100))
</script>

<template>
  <div class="mb-6">
    <div class="flex justify-between items-center mb-2">
      <span class="text-sm font-medium text-neutral-600">
        Question {{ current }} sur {{ total }}
      </span>
      <span class="text-sm font-medium text-primary">{{ percentage }}%</span>
    </div>
    <div
      class="w-full bg-neutral-200 rounded-full h-2.5"
      role="progressbar"
      :aria-valuenow="current"
      :aria-valuemin="0"
      :aria-valuemax="total"
      :aria-label="`Progression du quiz : question ${current} sur ${total}`"
    >
      <div
        class="bg-primary h-2.5 rounded-full transition-all duration-300"
        :style="{ width: percentage + '%' }"
      ></div>
    </div>
  </div>
</template>
