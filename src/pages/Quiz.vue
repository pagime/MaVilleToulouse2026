<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuizStore } from '../stores/quiz'
import { useReserve } from '../composables/useReserve'
import QuizQuestion from '../components/QuizQuestion.vue'
import QuizProgress from '../components/QuizProgress.vue'
import ReserveBanner from '../components/ReserveBanner.vue'

const router = useRouter()
const quiz = useQuizStore()
const { isReserve } = useReserve()
const slideDirection = ref('slide-left')

function onAnswer({ questionId, position, importance }) {
  quiz.setAnswer(questionId, position, importance)
}

function onSkip(questionId) {
  quiz.skipQuestion(questionId)
  goNext()
}

function goNext() {
  slideDirection.value = 'slide-left'
  if (quiz.currentIndex < quiz.totalQuestions - 1) {
    quiz.goNext()
  } else {
    quiz.goNext()
    router.push('/quiz/resultats')
  }
}

function goPrevious() {
  slideDirection.value = 'slide-right'
  quiz.goPrevious()
}

function startOver() {
  quiz.reset()
}
</script>

<template>
  <div>
    <ReserveBanner />

    <div v-if="isReserve" class="text-center py-16">
      <p class="text-neutral-600 dark:text-neutral-300 mb-4">Le quiz est temporairement suspendu.</p>
      <router-link to="/comparer" class="text-primary hover:underline font-medium">
        Accéder au comparateur de programmes
      </router-link>
    </div>

    <div v-else>
      <div v-if="quiz.currentIndex === 0 && !Object.keys(quiz.answers).length" class="mb-8">
        <h1 class="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-4">
          Quiz de compatibilité
        </h1>
        <div class="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
          <p class="text-neutral-700 dark:text-neutral-200 leading-relaxed mb-4">
            Ce quiz vous permet de découvrir avec quel candidat vos opinions sont les plus proches.
            Pour chaque question, indiquez votre position et l'importance que vous accordez au sujet.
          </p>
          <ul class="text-sm text-neutral-600 dark:text-neutral-300 space-y-2 mb-4">
            <li>20 questions couvrant 10 thématiques</li>
            <li>Vous pouvez passer une question si vous n'avez pas d'avis</li>
            <li>Vous pouvez revenir en arrière à tout moment</li>
            <li>Aucune donnée n'est envoyée ni stockée — tout se calcule dans votre navigateur</li>
          </ul>
          <div class="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg p-3 flex items-start gap-2">
            <svg class="w-4 h-4 text-amber-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <p class="text-xs text-amber-700 dark:text-amber-300">
              Les positions sont basées sur les déclarations publiques actuelles. Mise à jour prévue après le dépôt des professions de foi le <strong>26 février 2026</strong>.
            </p>
          </div>
          <p class="text-xs text-neutral-400 dark:text-neutral-500 mt-3">
            Cet outil ne constitue pas un sondage. Il s'agit d'un outil d'aide à la décision individuelle.
          </p>
        </div>
      </div>

      <div v-if="!quiz.isComplete">
        <QuizProgress :current="quiz.currentIndex + 1" :total="quiz.totalQuestions" />

        <Transition :name="slideDirection" mode="out-in">
          <QuizQuestion
            :key="quiz.currentQuestion.id"
            :question="quiz.currentQuestion"
            :saved-answer="quiz.answers[quiz.currentQuestion.id]"
            @answer="onAnswer"
            @skip="onSkip"
          />
        </Transition>

        <div class="flex justify-between mt-6">
          <button
            @click="goPrevious"
            :disabled="quiz.currentIndex === 0"
            class="px-5 py-2 text-sm font-medium rounded-lg border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            Précédent
          </button>
          <button
            @click="goNext"
            :disabled="!quiz.answers[quiz.currentQuestion.id]"
            class="px-5 py-2 text-sm font-medium rounded-lg bg-primary text-white hover:bg-primary-light disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            {{ quiz.currentIndex === quiz.totalQuestions - 1 ? 'Voir les résultats' : 'Suivant' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
