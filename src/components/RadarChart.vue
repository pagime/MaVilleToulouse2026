<script setup>
import { computed } from 'vue'
import { Radar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js'
import thematiquesData from '../data/thematiques.json'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

const props = defineProps({
  scoresByThematique: { type: Array, required: true }
})

const colors = [
  { bg: 'rgba(164, 52, 58, 0.15)', border: '#A4343A' },
  { bg: 'rgba(37, 99, 235, 0.15)', border: '#2563EB' },
  { bg: 'rgba(220, 38, 38, 0.15)', border: '#DC2626' },
  { bg: 'rgba(30, 58, 95, 0.15)', border: '#1E3A5F' },
  { bg: 'rgba(124, 58, 237, 0.15)', border: '#7C3AED' },
  { bg: 'rgba(5, 150, 105, 0.15)', border: '#059669' },
  { bg: 'rgba(217, 119, 6, 0.15)', border: '#D97706' }
]

const thematiques = thematiquesData.sort((a, b) => a.ordre - b.ordre)

const chartData = computed(() => ({
  labels: thematiques.map(t => t.nom),
  datasets: props.scoresByThematique.map((item, i) => ({
    label: `${item.candidat.prenom} ${item.candidat.nom}`,
    data: thematiques.map(t => item.scoresByTheme[t.slug] ?? 0),
    backgroundColor: colors[i % colors.length].bg,
    borderColor: colors[i % colors.length].border,
    borderWidth: 2,
    pointRadius: 3,
    pointBackgroundColor: colors[i % colors.length].border
  }))
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    r: {
      min: 0,
      max: 100,
      ticks: {
        stepSize: 25,
        callback: (v) => v + '%',
        backdropColor: 'transparent'
      },
      pointLabels: {
        font: { size: 11 }
      },
      grid: { color: '#e2e8f0' }
    }
  },
  plugins: {
    legend: {
      position: 'bottom',
      labels: { boxWidth: 12, padding: 16 }
    },
    tooltip: {
      callbacks: {
        label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.r}%`
      }
    }
  }
}
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
    <h3 class="text-lg font-semibold text-neutral-800 mb-4">Compatibilité par thématique</h3>
    <div class="h-96">
      <Radar :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>
