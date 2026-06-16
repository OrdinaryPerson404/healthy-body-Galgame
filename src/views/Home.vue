<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
    <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 max-w-md w-full text-center">
      <div class="text-6xl mb-4">💚</div>
      <h1 class="text-3xl font-bold text-gray-800 mb-2">身体守护者</h1>
      <p class="text-gray-500 mb-8">Body Guardians</p>
      
      <div class="space-y-4">
        <button 
          @click="startNewGame"
          class="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
        >
          开始新游戏
        </button>
        
        <button 
          v-if="hasSave"
          @click="continueGame"
          class="w-full py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold text-lg hover:bg-gray-200 transition-all"
        >
          继续游戏
        </button>
      </div>
      
      <div class="mt-8 text-sm text-gray-400">
        <p>🎮 模拟养成 + 视觉小说</p>
        <p>🏫 高中三年的健康管理之旅</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '../stores/gameStore'

const router = useRouter()
const gameStore = useGameStore()
const hasSave = ref(false)

onMounted(() => {
  hasSave.value = gameStore.loadGame()
})

function startNewGame() {
  gameStore.resetGame()
  router.push('/game')
}

function continueGame() {
  router.push('/game')
}
</script>