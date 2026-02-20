/**
 * Fisher-Yates shuffle pour mélanger l'ordre d'affichage des candidats.
 * Garantit la neutralité en affichant les candidats dans un ordre aléatoire.
 */
export function useShuffle() {
  function shuffle(array) {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  return { shuffle }
}
