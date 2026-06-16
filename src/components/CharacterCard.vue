<template>
  <div 
    class="bg-white rounded-2xl shadow-sm p-4 transition-all hover:shadow-md cursor-pointer"
    :class="character.health < 30 ? 'border-2 border-red-300' : ''"
    @click="showDetail = true"
  >
    <div class="flex items-center gap-3 mb-3">
      <div 
        class="w-16 h-16 rounded-full flex items-center justify-center"
        :style="{ backgroundColor: character.color + '20' }"
      >
        <span v-if="character.icon" class="text-4xl">{{ character.icon }}</span>
      </div>
      <div>
        <h3 class="font-bold text-gray-800">{{ character.name }}</h3>
        <p class="text-xs text-gray-500">{{ character.organ }}</p>
      </div>
    </div>
    
    <div class="space-y-2">
      <div>
        <div class="flex justify-between text-sm mb-1">
          <span class="text-gray-500">❤️ 健康</span>
          <span :class="getStatusColor(character.health)">{{ character.health }}</span>
        </div>
        <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            class="h-full transition-all"
            :class="getStatusBarColor(character.health)"
            :style="{ width: `${character.health}%` }"
          ></div>
        </div>
      </div>
      
      <div>
        <div class="flex justify-between text-sm mb-1">
          <span class="text-gray-500">💖 好感</span>
          <span class="text-pink-500">{{ character.affection }}</span>
        </div>
        <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            class="h-full bg-gradient-to-r from-pink-400 to-rose-500 transition-all"
            :style="{ width: `${(character.affection / 100) * 100}%` }"
          ></div>
        </div>
      </div>
    </div>
    
    <div class="mt-3 text-xs text-gray-400 text-center">
      {{ getStatusText(character.health) }}
    </div>
    
    <button 
      @click.stop="$emit('interact')"
      class="mt-3 w-full py-2 bg-gradient-to-r from-pink-100 to-purple-100 text-gray-700 rounded-lg text-sm font-medium hover:from-pink-200 hover:to-purple-200 transition-all"
    >
      💬 互动
    </button>

    <div v-if="showDetail" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" @click="showDetail = false">
      <div class="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden" @click.stop>
        <div class="relative h-64 flex items-center justify-center" :style="{ backgroundColor: character.color + '10' }">
          <div v-if="character.svg" class="w-full h-full flex items-center justify-center p-8">
            <div v-html="character.svg" class="w-full h-full"></div>
          </div>
          <span v-else class="text-8xl">{{ character.icon }}</span>
          <button @click="showDetail = false" class="absolute top-4 right-4 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center">
            ✕
          </button>
        </div>
        <div class="p-6">
          <h2 class="text-2xl font-bold mb-2" :style="{ color: character.color }">{{ character.name }}</h2>
          <p class="text-gray-500 mb-4">{{ character.organ }}</p>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-gray-500">❤️ 健康值</span>
              <span :class="getStatusColor(character.health)">{{ character.health }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">💖 好感度</span>
              <span class="text-pink-500">{{ character.affection }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">🎯 喜好</span>
              <span class="text-green-500">{{ character.likes.join(', ') }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">🚫 厌恶</span>
              <span class="text-red-500">{{ character.dislikes.join(', ') }}</span>
            </div>
          </div>
          <p class="mt-4 text-gray-600 text-sm">
            {{ getStatusText(character.health) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  character: {
    type: Object,
    required: true
  }
})

defineEmits(['interact'])

const showDetail = ref(false)

function getStatusColor(health) {
  if (health > 80) return 'text-green-500'
  if (health > 50) return 'text-gray-600'
  if (health > 30) return 'text-yellow-500'
  return 'text-red-500'
}

function getStatusBarColor(health) {
  if (health > 80) return 'bg-green-500'
  if (health > 50) return 'bg-blue-500'
  if (health > 30) return 'bg-yellow-500'
  return 'bg-red-500'
}

function getStatusText(health) {
  if (health > 80) return '今天感觉很棒！'
  if (health > 50) return '一切安好。'
  if (health > 30) return '有点累了...'
  return '我好难受...'
}
</script>