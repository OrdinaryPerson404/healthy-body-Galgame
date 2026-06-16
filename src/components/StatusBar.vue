<template>
  <div class="bg-white rounded-2xl shadow-sm p-4 mb-6">
    <div class="grid grid-cols-3 gap-4">
      <div class="text-center">
        <div class="text-sm text-gray-500 mb-1">娱乐值</div>
        <div class="flex items-center justify-center gap-2">
          <span class="text-xl">😊</span>
          <div class="w-24 h-3 bg-gray-200 rounded-full overflow-hidden">
            <div 
              class="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all"
              :style="{ width: `${entertainment}%` }"
            ></div>
          </div>
          <span class="font-semibold">{{ entertainment }}</span>
        </div>
      </div>
      <div class="text-center">
        <div class="text-sm text-gray-500 mb-1">压力值</div>
        <div class="flex items-center justify-center gap-2">
          <span class="text-xl">😰</span>
          <div class="w-24 h-3 bg-gray-200 rounded-full overflow-hidden">
            <div 
              class="h-full transition-all"
              :class="stress > 120 ? 'bg-red-500' : stress > 80 ? 'bg-yellow-500' : 'bg-blue-400'"
              :style="{ width: `${(stress / 200) * 100}%` }"
            ></div>
          </div>
          <span class="font-semibold">{{ stress }}</span>
        </div>
      </div>
      <div class="text-center">
        <div class="text-sm text-gray-500 mb-1">学业值</div>
        <div class="flex items-center justify-center gap-2">
          <span class="text-xl">📚</span>
          <div class="w-24 h-3 bg-gray-200 rounded-full overflow-hidden">
            <div 
              class="h-full bg-gradient-to-r from-purple-400 to-violet-500 transition-all"
              :style="{ width: `${academic}%` }"
            ></div>
          </div>
          <span class="font-semibold">{{ academic }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useGameStore } from '../stores/gameStore'

const gameStore = useGameStore()
const { entertainment, stress, academic } = gameStore
</script>