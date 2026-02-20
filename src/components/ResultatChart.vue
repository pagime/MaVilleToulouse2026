<script setup>
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip)

const props = defineProps({
  results: { type: Array, required: true }
})

const chartData = computed(() => ({
  labels: props.results.map(r => `${r.candidat.prenom} ${r.candidat.nom}`),
  datasets: [{
    data: props.results.map(r => r.compatibilite),
    backgroundColor: ['#A4343A', '#2563EB', '#DC2626', '#1E3A5F', '#7C3AED', '#059669', '#D97706'],
    borderRadius: 6,
    barThickness: 40
  }]
}))

const chartOptions = {
  indexAxis: 'y',
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (ctx) => `${ctx.parsed.x}% de compatibilité`
      }
    }
  },
  scales: {
    x: {
      min: 0,
      max: 100,
      ticks: {
        callback: (v) => v + '%'
      },
      grid: { color: '#e2e8f0' }
    },
    y: {
      grid: { display: false }
    }
  }
}
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
    <h3 class="text-lg font-semibold text-neutral-800 mb-4">Compatibilité par candidat</h3>
    <div class="h-96">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>
