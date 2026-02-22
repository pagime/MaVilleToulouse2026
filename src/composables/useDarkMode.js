import { ref, watch } from 'vue'

const STORAGE_KEY = 'maville2026-dark-mode'

function getInitialMode() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved !== null) return saved === 'true'
  } catch {}
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

const isDark = ref(getInitialMode())

function applyMode() {
  document.documentElement.classList.toggle('dark', isDark.value)
}

applyMode()

watch(isDark, () => {
  applyMode()
  try {
    localStorage.setItem(STORAGE_KEY, isDark.value)
  } catch {}
})

export function useDarkMode() {
  function toggle() {
    isDark.value = !isDark.value
  }

  return { isDark, toggle }
}
