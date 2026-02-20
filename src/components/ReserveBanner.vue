<script setup>
import { useReserve } from '../composables/useReserve'

const { isReserve, reserveMessage } = useReserve()
</script>

<template>
  <div
    v-if="isReserve"
    class="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6"
    role="alert"
  >
    <div class="flex items-start gap-3">
      <svg class="w-5 h-5 text-amber-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
      <p class="text-sm text-amber-800">{{ reserveMessage }}</p>
    </div>
  </div>
</template>
