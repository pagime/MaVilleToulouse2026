import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import quizData from '../data/quiz.json'

export const useQuizStore = defineStore('quiz', () => {
  const questions = ref(quizData)
  const answers = ref({})
  const currentIndex = ref(0)

  const totalQuestions = computed(() => questions.value.length)

  const currentQuestion = computed(() => questions.value[currentIndex.value])

  const answeredCount = computed(() => {
    return Object.values(answers.value).filter(a => !a.skipped).length
  })

  const isComplete = computed(() => currentIndex.value >= totalQuestions.value)

  function setAnswer(questionId, position, importance) {
    answers.value[questionId] = { position, importance, skipped: false }
  }

  function skipQuestion(questionId) {
    answers.value[questionId] = { skipped: true }
  }

  function goNext() {
    if (currentIndex.value < totalQuestions.value) {
      currentIndex.value++
    }
  }

  function goPrevious() {
    if (currentIndex.value > 0) {
      currentIndex.value--
    }
  }

  function goToQuestion(index) {
    if (index >= 0 && index < totalQuestions.value) {
      currentIndex.value = index
    }
  }

  function reset() {
    answers.value = {}
    currentIndex.value = 0
  }

  return {
    questions,
    answers,
    currentIndex,
    totalQuestions,
    currentQuestion,
    answeredCount,
    isComplete,
    setAnswer,
    skipQuestion,
    goNext,
    goPrevious,
    goToQuestion,
    reset
  }
})
