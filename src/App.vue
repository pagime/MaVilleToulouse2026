<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useDarkMode } from './composables/useDarkMode'

const { isDark, toggle: toggleDark } = useDarkMode()
const mobileMenuOpen = ref(false)

function closeMobile() {
  mobileMenuOpen.value = false
}
</script>

<template>
  <div class="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex flex-col transition-colors">
    <header class="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 sticky top-0 z-50">
      <nav class="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <RouterLink to="/" class="flex items-center gap-2 font-bold text-primary text-lg" @click="closeMobile">
          MaVilleToulouse2026
        </RouterLink>

        <!-- Desktop nav -->
        <div class="hidden sm:flex items-center gap-4 text-sm">
          <RouterLink
            to="/quiz"
            class="px-3 py-2 rounded-lg text-neutral-600 dark:text-neutral-300 hover:text-primary hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors font-medium"
            active-class="text-primary bg-primary/5 dark:bg-primary/10"
          >
            Quiz
          </RouterLink>
          <RouterLink
            to="/comparer"
            class="px-3 py-2 rounded-lg text-neutral-600 dark:text-neutral-300 hover:text-primary hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors font-medium"
            active-class="text-primary bg-primary/5 dark:bg-primary/10"
          >
            Comparer
          </RouterLink>
          <button
            @click="toggleDark"
            class="p-2 rounded-lg text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
            :aria-label="isDark ? 'Passer en mode clair' : 'Passer en mode sombre'"
          >
            <svg v-if="isDark" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>
        </div>

        <!-- Mobile: dark toggle + hamburger -->
        <div class="flex sm:hidden items-center gap-2">
          <button
            @click="toggleDark"
            class="p-2 rounded-lg text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
            :aria-label="isDark ? 'Passer en mode clair' : 'Passer en mode sombre'"
          >
            <svg v-if="isDark" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="p-2 rounded-lg text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
            :aria-label="mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'"
            :aria-expanded="mobileMenuOpen"
          >
            <svg v-if="!mobileMenuOpen" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </nav>

      <!-- Mobile menu -->
      <Transition name="menu-slide">
        <div v-if="mobileMenuOpen" class="sm:hidden border-t border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800">
          <div class="px-4 py-3 space-y-1">
            <RouterLink to="/quiz" @click="closeMobile" class="block px-3 py-2 rounded-lg text-neutral-600 dark:text-neutral-300 hover:text-primary hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors font-medium" active-class="text-primary bg-primary/5 dark:bg-primary/10">
              Quiz
            </RouterLink>
            <RouterLink to="/comparer" @click="closeMobile" class="block px-3 py-2 rounded-lg text-neutral-600 dark:text-neutral-300 hover:text-primary hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors font-medium" active-class="text-primary bg-primary/5 dark:bg-primary/10">
              Comparer
            </RouterLink>
            <RouterLink to="/faq" @click="closeMobile" class="block px-3 py-2 rounded-lg text-neutral-600 dark:text-neutral-300 hover:text-primary hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors font-medium" active-class="text-primary bg-primary/5 dark:bg-primary/10">
              FAQ
            </RouterLink>
            <RouterLink to="/contact" @click="closeMobile" class="block px-3 py-2 rounded-lg text-neutral-600 dark:text-neutral-300 hover:text-primary hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors font-medium" active-class="text-primary bg-primary/5 dark:bg-primary/10">
              Contact
            </RouterLink>
            <RouterLink to="/mentions-legales" @click="closeMobile" class="block px-3 py-2 rounded-lg text-neutral-600 dark:text-neutral-300 hover:text-primary hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors font-medium" active-class="text-primary bg-primary/5 dark:bg-primary/10">
              Mentions légales
            </RouterLink>
          </div>
        </div>
      </Transition>
    </header>

    <main class="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-8 w-full">
      <RouterView />
    </main>

    <footer class="bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700 mt-auto transition-colors">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
          <p>MaVilleToulouse2026 — Projet citoyen indépendant</p>
          <div class="flex gap-6">
            <RouterLink to="/faq" class="hover:text-primary transition-colors">
              FAQ
            </RouterLink>
            <RouterLink to="/mentions-legales" class="hover:text-primary transition-colors">
              Mentions légales
            </RouterLink>
            <RouterLink to="/contact" class="hover:text-primary transition-colors">
              Contact
            </RouterLink>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
