import candidatsData from '../data/candidats.json'

/**
 * Calcule les scores de compatibilité entre les réponses de l'utilisateur et les positions des candidats.
 *
 * Algorithme :
 * - Pour chaque question répondue (non passée) :
 *   distance = |position_utilisateur - position_candidat| (de 0 à 4)
 *   poids = importance donnée par l'utilisateur (1 à 5)
 *   score_question = (1 - distance / 4) * poids
 *
 * - Score global par candidat :
 *   compatibilité = somme(score_question) / somme(poids) * 100
 */
export function useQuizScoring() {
  const DISTANCE_MAX = 4

  function calculateScores(answers, questions, communeSlug = 'toulouse') {
    const candidats = candidatsData.filter(c => c.commune_slug === communeSlug)

    const results = candidats.map(candidat => {
      let scoreSum = 0
      let weightSum = 0
      const detailParQuestion = []

      questions.forEach(question => {
        const answer = answers[question.id]
        if (!answer || answer.skipped) return

        const positionCandidat = question.positions_candidats[candidat.id]
        if (!positionCandidat) return

        const userPosition = answer.position
        const importance = answer.importance || 3
        const distance = Math.abs(userPosition - positionCandidat.position)
        const scoreQuestion = (1 - distance / DISTANCE_MAX) * importance

        scoreSum += scoreQuestion
        weightSum += importance

        detailParQuestion.push({
          questionId: question.id,
          positionUtilisateur: userPosition,
          positionCandidat: positionCandidat.position,
          justificationCandidat: positionCandidat.justification,
          sourceCandidat: positionCandidat.source_url,
          importance,
          distance,
          score: scoreQuestion
        })
      })

      const compatibilite = weightSum > 0 ? Math.round((scoreSum / weightSum) * 100) : 0

      return {
        candidat,
        compatibilite,
        detailParQuestion
      }
    })

    results.sort((a, b) => b.compatibilite - a.compatibilite)

    return results
  }

  function getScoresByThematique(answers, questions, communeSlug = 'toulouse') {
    const candidats = candidatsData.filter(c => c.commune_slug === communeSlug)
    const thematiques = [...new Set(questions.map(q => q.thematique))]

    return candidats.map(candidat => {
      const scoresByTheme = {}

      thematiques.forEach(theme => {
        const themeQuestions = questions.filter(q => q.thematique === theme)
        let scoreSum = 0
        let weightSum = 0

        themeQuestions.forEach(question => {
          const answer = answers[question.id]
          if (!answer || answer.skipped) return

          const positionCandidat = question.positions_candidats[candidat.id]
          if (!positionCandidat) return

          const distance = Math.abs(answer.position - positionCandidat.position)
          const importance = answer.importance || 3
          scoreSum += (1 - distance / DISTANCE_MAX) * importance
          weightSum += importance
        })

        scoresByTheme[theme] = weightSum > 0 ? Math.round((scoreSum / weightSum) * 100) : null
      })

      return {
        candidat,
        scoresByTheme
      }
    })
  }

  return { calculateScores, getScoresByThematique }
}
