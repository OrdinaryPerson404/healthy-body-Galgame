<template>
  <div class="bg-white rounded-2xl shadow-sm p-4">
    <div class="flex justify-between items-center mb-4">
      <h2 class="font-bold text-gray-800">选择行动</h2>
      <button 
        @click="endMonth"
        :disabled="gameStore.actionPoints > 0"
        class="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-lg"
      >
        结束本月
      </button>
    </div>
    
    <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
      <button 
        v-for="action in availableActions"
        :key="action.id"
        @click="$emit('action', action)"
        :disabled="gameStore.actionPoints <= 0 || gameStore.isEventActive"
        class="p-4 rounded-xl border-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 hover:shadow-md"
        :class="getActionClass(action)"
      >
        <div class="text-3xl mb-2">{{ action.icon }}</div>
        <div class="font-semibold text-gray-700">{{ action.name }}</div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useGameStore } from '../stores/gameStore'
import { actions } from '../data/actions'

defineEmits(['action'])

const gameStore = useGameStore()
const availableActions = actions.filter(a => !a.target)

function getActionClass(action) {
  const classes = {
    exercise: 'border-green-200 bg-green-50',
    eat: 'border-yellow-200 bg-yellow-50',
    study: 'border-purple-200 bg-purple-50',
    entertain: 'border-pink-200 bg-pink-50',
    sleep: 'border-blue-200 bg-blue-50'
  }
  return classes[action.id] || 'border-gray-200 bg-gray-50'
}

function endMonth() {
  gameStore.monthlySettlement()
}
</script>