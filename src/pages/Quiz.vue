<script setup>
import { useRouter } from 'vue-router'
import { useQuizStore } from '../stores/quiz'
import { useReserve } from '../composables/useReserve'
import QuizQuestion from '../components/QuizQuestion.vue'
import QuizProgress from '../components/QuizProgress.vue'
import ReserveBanner from '../components/ReserveBanner.vue'

const router = useRouter()
const quiz = useQuizStore()
const { isReserve } = useReserve()

function onAnswer({ questionId, position, importance }) {
  quiz.setAnswer(questionId, position, importance)
}

function onSkip(questionId) {
  quiz.skipQuestion(questionId)
  goNext()
}

function goNext() {
  if (quiz.currentIndex < quiz.totalQuestions - 1) {
    quiz.goNext()
  } else {
    quiz.goNext()
    router.push('/quiz/resultats')
  }
}

function goPrevious() {
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
      <p class="text-neutral-600 mb-4">Le quiz est temporairement suspendu.</p>
      <router-link to="/comparer" class="text-primary hover:underline font-medium">
        Accéder au comparateur de programmes
      </router-link>
    </div>

    <div v-else>
      <div v-if="quiz.currentIndex === 0 && !Object.keys(quiz.answers).length" class="mb-8">
        <h1 class="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
          Quiz de compatibilité
        </h1>
        <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <p class="text-neutral-700 leading-relaxed mb-4">
            Ce quiz vous permet de découvrir avec quel candidat vos opinions sont les plus proches.
            Pour chaque question, indiquez votre position et l'importance que vous accordez au sujet.
          </p>
          <ul class="text-sm text-neutral-600 space-y-2 mb-4">
            <li>20 questions couvrant 10 thématiques</li>
            <li>Vous pouvez passer une question si vous n'avez pas d'avis</li>
            <li>Vous pouvez revenir en arrière à tout moment</li>
            <li>Aucune donnée n'est envoyée ni stockée — tout se calcule dans votre navigateur</li>
          </ul>
          <p class="text-xs text-neutral-400">
            Cet outil ne constitue pas un sondage. Il s'agit d'un outil d'aide à la décision individuelle.
            Les positions attribuées aux candidats sont basées sur leurs programmes officiels et déclarations publiques.
          </p>
        </div>
      </div>

      <div v-if="!quiz.isComplete">
        <QuizProgress :current="quiz.currentIndex + 1" :total="quiz.totalQuestions" />

        <QuizQuestion
          :question="quiz.currentQuestion"
          :saved-answer="quiz.answers[quiz.currentQuestion.id]"
          @answer="onAnswer"
          @skip="onSkip"
        />

        <div class="flex justify-between mt-6">
          <button
            @click="goPrevious"
            :disabled="quiz.currentIndex === 0"
            class="px-5 py-2 text-sm font-medium rounded-lg border border-neutral-300 text-neutral-700 hover:bg-neutral-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
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
