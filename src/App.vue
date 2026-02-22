<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-neutral-50 flex flex-col">
    <header class="bg-white border-b border-neutral-200 sticky top-0 z-50">
      <nav class="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <RouterLink to="/" class="flex items-center gap-2 font-bold text-primary text-lg">
          MaVilleToulouse2026
        </RouterLink>
        <div class="flex items-center gap-1 sm:gap-4 text-sm">
          <RouterLink
            to="/quiz"
            class="px-3 py-2 rounded-lg text-neutral-600 hover:text-primary hover:bg-neutral-50 transition-colors font-medium"
            active-class="text-primary bg-primary/5"
          >
            Quiz
          </RouterLink>
          <RouterLink
            to="/comparer"
            class="px-3 py-2 rounded-lg text-neutral-600 hover:text-primary hover:bg-neutral-50 transition-colors font-medium"
            active-class="text-primary bg-primary/5"
          >
            Comparer
          </RouterLink>
        </div>
      </nav>
    </header>

    <main class="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-8 w-full">
      <RouterView />
    </main>

    <footer class="bg-white border-t border-neutral-200 mt-auto">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-neutral-500">
          <p>MaVilleToulouse2026 — Projet citoyen indépendant</p>
          <div class="flex gap-6">
            <RouterLink to="/mentions-legales" class="hover:text-primary transition-colors">
              Mentions légales & Méthodologie
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
