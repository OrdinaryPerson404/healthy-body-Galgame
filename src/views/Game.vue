<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
    <header class="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
      <div class="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
        <div>
          <h1 class="text-xl font-bold text-gray-800">身体守护者</h1>
          <p class="text-sm text-gray-500">高一上学期 · 第 {{ gameStore.month }}/{{ gameStore.maxMonths }} 月</p>
        </div>
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2 bg-yellow-100 px-3 py-1 rounded-full">
            <span class="text-lg">⚡</span>
            <span class="font-semibold">{{ gameStore.actionPoints }}/{{ gameStore.maxActionPoints }}</span>
          </div>
          <button @click="goHome" class="text-gray-400 hover:text-gray-600">
            🏠
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-4 py-6">
      <StatusBar />
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <CharacterCard 
          v-for="char in gameStore.charactersState" 
          :key="char.id" 
          :character="char"
          @interact="handleInteract(char.id)"
        />
      </div>

      <ActionPanel @action="handleAction" />

      <div v-if="gameStore.gameOver" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div class="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center">
          <div class="text-5xl mb-4">{{ gameStore.gameWon ? '🎉' : '😢' }}</div>
          <h2 class="text-2xl font-bold mb-4">
            {{ gameStore.gameWon ? '学期结束！' : '游戏结束' }}
          </h2>
          <div class="space-y-2 text-gray-600 mb-6">
            <p>平均健康值：{{ Math.round(gameStore.avgHealth) }}</p>
            <p>平均好感度：{{ Math.round(gameStore.avgAffection) }}</p>
            <p>最终娱乐值：{{ gameStore.entertainment }}</p>
            <p>最终学业值：{{ gameStore.academic }}</p>
          </div>
          <button 
            @click="restartGame"
            class="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold"
          >
            重新开始
          </button>
        </div>
      </div>

      <EventModal 
        v-if="gameStore.isEventActive && gameStore.currentEvent"
        :event="gameStore.currentEvent"
        @select="gameStore.selectEventOption"
      />
    </main>

    <footer class="bg-white/50 py-4 mt-8">
      <div class="max-w-4xl mx-auto px-4">
        <h3 class="font-semibold mb-2 text-gray-700">📜 游戏日志</h3>
        <div class="h-32 overflow-y-auto bg-gray-100 rounded-lg p-3 text-sm space-y-1">
          <div 
            v-for="(log, index) in gameStore.gameLog.slice(-10)" 
            :key="index"
            class="text-gray-600"
          >
            [第{{ log.month }}月] {{ log.message }}
          </div>
          <div v-if="gameStore.gameLog.length === 0" class="text-gray-400">
            游戏开始，开始你的健康管理之旅吧！
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useGameStore } from '../stores/gameStore'
import StatusBar from '../components/StatusBar.vue'
import CharacterCard from '../components/CharacterCard.vue'
import ActionPanel from '../components/ActionPanel.vue'
import EventModal from '../components/EventModal.vue'

const router = useRouter()
const gameStore = useGameStore()

function handleAction(action) {
  gameStore.performAction(action)
}

function handleInteract(charId) {
  const interactAction = { id: 'interact', name: '与角色互动', target: true }
  gameStore.performAction(interactAction, charId)
}

function goHome() {
  router.push('/')
}

function restartGame() {
  gameStore.resetGame()
}
</script>