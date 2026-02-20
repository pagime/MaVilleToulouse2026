import { computed } from 'vue'
import config from '../data/config.json'

/**
 * Vérifie si la date actuelle tombe dans une période de réserve électorale.
 * Pendant la réserve (veille et jour du scrutin), le quiz est désactivé
 * conformément à l'article L49 du Code électoral.
 */
export function useReserve() {
  const allReserveDates = [
    ...config.dates_reserve,
    ...config.dates_reserve_2nd_tour
  ]

  const isReserve = computed(() => {
    const today = new Date().toISOString().split('T')[0]
    return allReserveDates.includes(today)
  })

  const reserveMessage = computed(() => {
    if (!isReserve.value) return ''
    return "Conformément au Code électoral, le quiz de compatibilité est suspendu pendant la période de réserve. Le comparateur de programmes reste consultable."
  })

  return { isReserve, reserveMessage }
}
