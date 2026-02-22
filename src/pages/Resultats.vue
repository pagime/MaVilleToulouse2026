<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuizStore } from '../stores/quiz'
import { useQuizScoring } from '../composables/useQuizScoring'
import ResultatChart from '../components/ResultatChart.vue'
import RadarChart from '../components/RadarChart.vue'
import thematiquesData from '../data/thematiques.json'
import quizData from '../data/quiz.json'

const router = useRouter()
const quiz = useQuizStore()
const { calculateScores, getScoresByThematique } = useQuizScoring()

if (!Object.keys(quiz.answers).length) {
  router.replace('/quiz')
}

const results = computed(() => calculateScores(quiz.answers, quizData))
const radarData = computed(() => getScoresByThematique(quiz.answers, quizData))

const openDetails = ref({})

function toggleDetail(qId) {
  openDetails.value[qId] = !openDetails.value[qId]
}

function getPositionLabel(value) {
  const labels = {
    2: "Tout à fait d'accord",
    1: "Plutôt d'accord",
    0: 'Neutre',
    '-1': "Plutôt pas d'accord",
    '-2': "Pas du tout d'accord"
  }
  return labels[value] || 'Non renseigné'
}

function getThematique(slug) {
  return thematiquesData.find(t => t.slug === slug)
}

function getTopThemes(result) {
  const themeScores = {}
  result.detailParQuestion.forEach(d => {
    const q = quizData.find(q => q.id === d.questionId)
    if (!q) return
    const theme = q.thematique
    if (!themeScores[theme]) themeScores[theme] = { score: 0, weight: 0 }
    themeScores[theme].score += d.score
    themeScores[theme].weight += d.importance
  })

  const themes = Object.entries(themeScores)
    .map(([slug, data]) => ({
      slug,
      nom: thematiquesData.find(t => t.slug === slug)?.nom || slug,
      pct: data.weight > 0 ? Math.round((data.score / data.weight) * 100) : 0
    }))
    .sort((a, b) => b.pct - a.pct)

  return {
    accord: themes.filter(t => t.pct >= 70).slice(0, 2),
    desaccord: themes.filter(t => t.pct < 50).slice(0, 2)
  }
}

function refaireQuiz() {
  quiz.reset()
  router.push('/quiz')
}

function partager() {
  if (navigator.share) {
    navigator.share({
      title: 'Ma Ville Toulouse 2026 — Quiz de compatibilité',
      text: "Découvrez avec quel candidat vous êtes le plus compatible pour les municipales 2026 à Toulouse !",
      url: window.location.origin
    })
  } else {
    navigator.clipboard.writeText(window.location.origin)
  }
}
</script>

<template>
  <div v-if="results.length">
    <h1 class="text-2xl md:text-3xl font-bold text-neutral-900 mb-2 dark:text-white">
      Vos résultats
    </h1>
    <p class="text-neutral-600 mb-8 dark:text-neutral-300">
      Voici votre compatibilité avec chaque candidat, calculée à partir de vos réponses.
    </p>

    <div class="grid md:grid-cols-2 gap-6 mb-8">
      <ResultatChart :results="results" />
      <RadarChart :scores-by-thematique="radarData" />
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
      <div
        v-for="(result, index) in results"
        :key="result.candidat.id"
        class="bg-white rounded-xl shadow-sm border border-neutral-200 p-5 dark:bg-neutral-800 dark:border-neutral-700"
      >
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm text-neutral-500 dark:text-neutral-400">#{{ index + 1 }}</span>
          <span class="text-2xl font-bold text-primary">{{ result.compatibilite }}%</span>
        </div>
        <p class="font-semibold text-neutral-800 dark:text-neutral-100">
          {{ result.candidat.prenom }} {{ result.candidat.nom }}
        </p>
        <p class="text-sm text-neutral-500 dark:text-neutral-400 mb-2">{{ result.candidat.parti }}</p>
        <div class="text-xs space-y-1 mb-2">
          <p v-if="getTopThemes(result).accord.length" class="text-green-600 dark:text-green-400">
            D'accord sur : {{ getTopThemes(result).accord.map(t => t.nom).join(', ') }}
          </p>
          <p v-if="getTopThemes(result).desaccord.length" class="text-red-500 dark:text-red-400">
            Divergences : {{ getTopThemes(result).desaccord.map(t => t.nom).join(', ') }}
          </p>
        </div>
        <router-link
          :to="{ name: 'candidat', params: { id: result.candidat.id } }"
          class="text-xs text-secondary hover:underline inline-block"
        >
          Voir le profil
        </router-link>
      </div>
    </div>

    <div class="mb-8">
      <h2 class="text-xl font-bold text-neutral-800 mb-4 dark:text-neutral-100">Détail question par question</h2>
      <div class="space-y-3">
        <div
          v-for="question in quiz.questions"
          :key="question.id"
          class="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden dark:border-neutral-700 dark:bg-neutral-800"
        >
          <button
            @click="toggleDetail(question.id)"
            class="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-neutral-50 transition-colors cursor-pointer dark:hover:bg-neutral-700"
            :aria-expanded="openDetails[question.id]"
          >
            <div class="flex-1 pr-4">
              <span class="text-xs text-secondary font-medium">
                <span class="inline-block w-2.5 h-2.5 rounded-full mr-1.5" :style="{ backgroundColor: getThematique(question.thematique)?.couleur }"></span>
                {{ getThematique(question.thematique)?.nom }}
              </span>
              <p class="text-sm font-medium text-neutral-800 mt-1 dark:text-neutral-100">{{ question.texte }}</p>
            </div>
            <svg
              class="w-5 h-5 text-neutral-400 shrink-0 transition-transform duration-200 dark:text-neutral-500"
              :class="{ 'rotate-180': openDetails[question.id] }"
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div v-if="openDetails[question.id]" class="px-5 pb-5 border-t border-neutral-100 dark:border-neutral-700">
            <div class="pt-4 space-y-3">
              <div class="bg-accent/50 rounded-lg p-3 dark:bg-primary/10">
                <p class="text-sm font-medium text-primary">
                  Vous : {{ quiz.answers[question.id]?.skipped ? 'Question passée' : getPositionLabel(quiz.answers[question.id]?.position) }}
                </p>
              </div>
              <div
                v-for="result in results"
                :key="result.candidat.id"
                class="flex items-start gap-3 text-sm"
              >
                <span class="font-medium text-neutral-700 shrink-0 dark:text-neutral-200">
                  {{ result.candidat.prenom }} {{ result.candidat.nom }} :
                </span>
                <span class="text-neutral-600 dark:text-neutral-300">
                  {{ getPositionLabel(question.positions_candidats[result.candidat.id]?.position) }}
                  <span class="text-neutral-400 dark:text-neutral-500">
                    — {{ question.positions_candidats[result.candidat.id]?.justification }}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col sm:flex-row gap-4 justify-center pb-8">
      <button
        @click="refaireQuiz"
        class="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-light transition-colors cursor-pointer"
      >
        Refaire le quiz
      </button>
      <button
        @click="partager"
        class="px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary/5 transition-colors cursor-pointer"
      >
        Partager l'application
      </button>
    </div>

    <p class="text-xs text-neutral-400 text-center pb-4 dark:text-neutral-500">
      Cet outil ne constitue pas un sondage au sens de la loi du 19 juillet 1977.
      Aucune donnée de résultat n'est stockée, envoyée ou agrégée.
    </p>
  </div>
</template>
