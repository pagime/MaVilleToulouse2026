<script setup>
import { ref, watch } from 'vue'
import GlossaryText from './GlossaryText.vue'

const props = defineProps({
  question: { type: Object, required: true },
  savedAnswer: { type: Object, default: null }
})

const emit = defineEmits(['answer', 'skip'])

const selectedPosition = ref(null)
const importance = ref(3)
const showContext = ref(false)

const positionLabels = [
  { value: 2, label: "Tout à fait d'accord", short: '++' },
  { value: 1, label: "Plutôt d'accord", short: '+' },
  { value: 0, label: 'Neutre', short: '=' },
  { value: -1, label: "Plutôt pas d'accord", short: '-' },
  { value: -2, label: "Pas du tout d'accord", short: '--' }
]

const importanceLabels = ['Peu important', 'Assez peu', 'Moyen', 'Important', 'Essentiel']

watch(() => props.question.id, () => {
  if (props.savedAnswer && !props.savedAnswer.skipped) {
    selectedPosition.value = props.savedAnswer.position
    importance.value = props.savedAnswer.importance || 3
  } else {
    selectedPosition.value = null
    importance.value = 3
  }
}, { immediate: true })

function selectPosition(value) {
  selectedPosition.value = value
  emit('answer', {
    questionId: props.question.id,
    position: value,
    importance: importance.value
  })
}

function updateImportance(value) {
  importance.value = value
  if (selectedPosition.value !== null) {
    emit('answer', {
      questionId: props.question.id,
      position: selectedPosition.value,
      importance: value
    })
  }
}
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 md:p-8">
    <h2 class="text-xl md:text-2xl font-semibold text-neutral-900 leading-snug mb-4">
      <GlossaryText :text="question.texte" />
    </h2>

    <button
      v-if="question.contexte"
      @click="showContext = !showContext"
      class="text-sm text-secondary hover:text-primary-light font-medium mb-6 flex items-center gap-1 cursor-pointer"
      :aria-expanded="showContext"
    >
      <span>{{ showContext ? 'Masquer le contexte' : 'En savoir plus sur cet enjeu' }}</span>
      <svg
        class="w-4 h-4 transition-transform duration-200"
        :class="{ 'rotate-180': showContext }"
        fill="none" viewBox="0 0 24 24" stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <div
      v-if="showContext && question.contexte"
      class="bg-accent/50 border border-primary/10 rounded-lg p-4 mb-6 text-sm text-neutral-700 leading-relaxed"
    >
      <GlossaryText :text="question.contexte" />
    </div>

    <div class="space-y-3 mb-8" role="radiogroup" :aria-label="question.texte">
      <button
        v-for="pos in positionLabels"
        :key="pos.value"
        @click="selectPosition(pos.value)"
        class="w-full text-left px-4 py-3 rounded-lg border-2 transition-all duration-150 font-medium cursor-pointer"
        :class="selectedPosition === pos.value
          ? 'border-primary bg-primary/5 text-primary'
          : 'border-neutral-200 hover:border-neutral-300 text-neutral-700'"
        role="radio"
        :aria-checked="selectedPosition === pos.value"
      >
        {{ pos.label }}
      </button>
    </div>

    <div class="mb-6">
      <label class="block text-sm font-medium text-neutral-700 mb-3">
        Ce sujet compte pour moi :
        <span class="text-primary font-semibold">{{ importanceLabels[importance - 1] }}</span>
      </label>
      <div class="flex items-center gap-3">
        <span class="text-xs text-neutral-400">1</span>
        <input
          type="range"
          min="1"
          max="5"
          :value="importance"
          @input="updateImportance(Number($event.target.value))"
          class="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary"
          aria-label="Importance du sujet"
        />
        <span class="text-xs text-neutral-400">5</span>
      </div>
    </div>

    <button
      @click="$emit('skip', question.id)"
      class="text-sm text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer"
    >
      Passer cette question
    </button>
  </div>
</template>
