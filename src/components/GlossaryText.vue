<script setup>
import { computed, ref } from 'vue'
import glossaire from '../data/glossaire.json'

const props = defineProps({
  text: { type: String, required: true }
})

const activeTooltip = ref(null)

// Sort terms by length (longest first) to avoid partial matches
const sortedTerms = glossaire
  .slice()
  .sort((a, b) => b.terme.length - a.terme.length)

const segments = computed(() => {
  const text = props.text
  const result = []
  const matched = new Array(text.length).fill(false)
  const termMap = []

  // Find all term occurrences (first only)
  for (const entry of sortedTerms) {
    const term = entry.terme
    const regex = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i')
    const match = text.match(regex)
    if (match && match.index !== undefined) {
      const start = match.index
      const end = start + match[0].length
      // Check no overlap with already matched ranges
      let overlap = false
      for (let i = start; i < end; i++) {
        if (matched[i]) { overlap = true; break }
      }
      if (!overlap) {
        for (let i = start; i < end; i++) matched[i] = true
        termMap.push({ start, end, original: match[0], definition: entry.definition })
      }
    }
  }

  // Sort by position
  termMap.sort((a, b) => a.start - b.start)

  // Build segments
  let cursor = 0
  for (const t of termMap) {
    if (t.start > cursor) {
      result.push({ type: 'text', content: text.slice(cursor, t.start) })
    }
    result.push({ type: 'term', content: t.original, definition: t.definition, id: t.start })
    cursor = t.end
  }
  if (cursor < text.length) {
    result.push({ type: 'text', content: text.slice(cursor) })
  }

  return result.length ? result : [{ type: 'text', content: text }]
})

function toggleTooltip(id) {
  activeTooltip.value = activeTooltip.value === id ? null : id
}

function closeTooltip() {
  activeTooltip.value = null
}
</script>

<template>
  <span class="glossary-text" @click.self="closeTooltip">
    <template v-for="seg in segments" :key="seg.type + seg.content">
      <span v-if="seg.type === 'text'">{{ seg.content }}</span>
      <span
        v-else
        class="relative inline"
      >
        <button
          @click.stop="toggleTooltip(seg.id)"
          class="underline decoration-dotted decoration-primary/40 underline-offset-2 hover:decoration-primary cursor-help transition-colors"
        >{{ seg.content }}</button>
        <Transition name="tooltip-fade">
          <span
            v-if="activeTooltip === seg.id"
            class="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 sm:w-72 bg-neutral-800 dark:bg-neutral-700 text-white text-xs leading-relaxed rounded-lg shadow-lg p-3 pointer-events-auto"
            @click.stop
          >
            <button
              @click.stop="closeTooltip"
              class="absolute top-1 right-1.5 text-neutral-400 hover:text-white text-sm leading-none cursor-pointer"
              aria-label="Fermer"
            >&times;</button>
            {{ seg.definition }}
            <span class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-neutral-800 dark:border-t-neutral-700"></span>
          </span>
        </Transition>
      </span>
    </template>
  </span>
</template>

<style scoped>
.tooltip-fade-enter-active,
.tooltip-fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.tooltip-fade-enter-from,
.tooltip-fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(4px);
}
</style>
