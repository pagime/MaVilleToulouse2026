<script setup>
import { ref } from 'vue'

const openItems = ref({})

function toggle(id) {
  openItems.value[id] = !openItems.value[id]
}

const faqs = [
  {
    id: 'calcul',
    question: 'Comment sont calculés les résultats du quiz ?',
    answer: "Pour chaque question, on mesure la distance entre votre position et celle du candidat (de 0 à 4 points d'écart). Cette distance est pondérée par l'importance que vous accordez au sujet. Le pourcentage de compatibilité est la moyenne pondérée de tous ces scores. Plus de détails sur la page Mentions légales & Méthodologie."
  },
  {
    id: 'sources',
    question: "D'où viennent les positions attribuées aux candidats ?",
    answer: "Les positions sont basées sur les programmes officiels publiés par les candidats, leurs déclarations publiques (interviews, débats, communiqués) et leurs votes antérieurs. Chaque position est accompagnée d'un lien vers sa source. Les professions de foi officielles seront déposées le 26 février 2026 et les données seront mises à jour."
  },
  {
    id: 'neutralite',
    question: 'Le site est-il neutre politiquement ?',
    answer: "Oui. Ma Ville Toulouse 2026 est un projet citoyen indépendant, non affilié à aucun parti politique, candidat ou institution. L'ordre d'affichage des candidats est aléatoire à chaque chargement. L'algorithme est le même pour tous les candidats et son code est transparent."
  },
  {
    id: 'donnees',
    question: 'Mes données sont-elles collectées ?',
    answer: "Non. Le quiz s'exécute entièrement dans votre navigateur. Aucune donnée n'est envoyée à un serveur. Vos réponses sont stockées localement (localStorage) uniquement pour sauvegarder votre progression. Aucun cookie de tracking n'est utilisé."
  },
  {
    id: 'erreur',
    question: "Une position me semble incorrecte, que faire ?",
    answer: "Contactez-nous via la page Contact. Les candidats et leurs équipes peuvent demander une correction, qui sera traitée sous 48h. Merci de fournir une source (lien, vidéo, document) pour appuyer la demande."
  },
  {
    id: 'sondage',
    question: "Est-ce un sondage ?",
    answer: "Non. Cet outil ne constitue pas un sondage au sens de la loi du 19 juillet 1977. Il s'agit d'un outil d'aide à la décision individuelle. Aucun résultat collectif n'est agrégé ni publié."
  },
  {
    id: 'reserve',
    question: "Pourquoi le quiz est-il parfois désactivé ?",
    answer: "Conformément à l'article L49 du Code électoral, le quiz est automatiquement désactivé la veille et le jour du scrutin (1er et 2nd tour). Le comparateur de programmes reste accessible."
  },
  {
    id: 'maj',
    question: 'Quand les données seront-elles mises à jour ?',
    answer: "Les professions de foi officielles seront déposées le 26 février 2026. Les positions des candidats seront mises à jour à cette date avec les programmes définitifs. Le site affichera un bandeau pour signaler la mise à jour."
  }
]
</script>

<template>
  <div class="max-w-3xl mx-auto">
    <h1 class="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-2">
      Questions fréquentes
    </h1>
    <p class="text-neutral-600 dark:text-neutral-300 mb-8">
      Tout ce que vous devez savoir sur Ma Ville Toulouse 2026 et le quiz de compatibilité.
    </p>

    <div class="space-y-3">
      <div
        v-for="faq in faqs"
        :key="faq.id"
        class="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 overflow-hidden"
      >
        <button
          @click="toggle(faq.id)"
          class="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
          :aria-expanded="openItems[faq.id]"
        >
          <span class="font-medium text-neutral-800 dark:text-neutral-100 pr-4">{{ faq.question }}</span>
          <svg
            class="w-5 h-5 text-neutral-400 dark:text-neutral-500 shrink-0 transition-transform duration-200"
            :class="{ 'rotate-180': openItems[faq.id] }"
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div v-if="openItems[faq.id]" class="px-5 pb-5 border-t border-neutral-100 dark:border-neutral-700">
          <p class="pt-4 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
            {{ faq.answer }}
          </p>
        </div>
      </div>
    </div>

    <div class="mt-8 text-center">
      <p class="text-sm text-neutral-500 dark:text-neutral-400 mb-3">Vous n'avez pas trouvé votre réponse ?</p>
      <router-link
        to="/contact"
        class="inline-flex items-center px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary/5 transition-colors"
      >
        Nous contacter
      </router-link>
    </div>
  </div>
</template>
