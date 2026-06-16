<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden">
      <div class="bg-gradient-to-r from-indigo-500 to-purple-500 p-4 text-white">
        <h3 class="text-xl font-bold">📢 {{ event.title }}</h3>
      </div>
      
      <div class="p-6">
        <p class="text-gray-700 mb-6">{{ event.description }}</p>
        
        <div class="space-y-3">
          <button 
            v-for="(option, index) in event.options"
            :key="index"
            @click="$emit('select', option)"
            class="w-full p-3 text-left rounded-xl border-2 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all"
          >
            <span class="font-medium text-gray-800">{{ option.text }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  event: {
    type: Object,
    required: true
  }
})

defineEmits(['select'])
</script>