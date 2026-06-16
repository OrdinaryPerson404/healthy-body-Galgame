import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { characters } from '../data/characters'
import { events } from '../data/events'

export const useGameStore = defineStore('game', () => {
  const month = ref(1)
  const maxMonths = 6
  const actionPoints = ref(4)
  const maxActionPoints = 4
  
  const charactersState = ref(
    characters.map(c => ({
      ...c,
      health: c.initialHealth,
      affection: c.initialAffection,
      isComatose: false,
      comaTurns: 0
    }))
  )
  
  const entertainment = ref(60)
  const stress = ref(30)
  const academic = ref(40)
  
  const currentEvent = ref(null)
  const isEventActive = ref(false)
  const gameLog = ref([])
  const gameOver = ref(false)
  const gameWon = ref(false)

  const avgHealth = computed(() => {
    return charactersState.value.reduce((sum, c) => sum + c.health, 0) / charactersState.value.length
  })

  const avgAffection = computed(() => {
    return charactersState.value.reduce((sum, c) => sum + c.affection, 0) / charactersState.value.length
  })

  function addLog(message) {
    gameLog.value.push({
      month: month.value,
      message,
      time: new Date().toLocaleTimeString()
    })
  }

  function randomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  function applyEffects(effects) {
    Object.keys(effects).forEach(key => {
      if (key === 'entertainment') {
        entertainment.value = Math.max(0, Math.min(100, entertainment.value + effects[key]))
      } else if (key === 'stress') {
        stress.value = Math.max(0, Math.min(200, stress.value + effects[key]))
      } else if (key === 'academic') {
        academic.value = Math.max(0, Math.min(100, academic.value + effects[key]))
      } else {
        const char = charactersState.value.find(c => c.id === key)
        if (char) {
          if (effects[key].health) {
            const healthChange = Array.isArray(effects[key].health) 
              ? randomInRange(...effects[key].health) 
              : effects[key].health
            char.health = Math.max(0, Math.min(100, char.health + healthChange))
          }
          if (effects[key].affection) {
            const affectionChange = Array.isArray(effects[key].affection) 
              ? randomInRange(...effects[key].affection) 
              : effects[key].affection
            char.affection = Math.max(0, Math.min(100, char.affection + affectionChange))
          }
        }
      }
    })
  }

  function performAction(action, targetCharId = null) {
    if (actionPoints.value <= 0 || isEventActive.value) return false
    
    actionPoints.value--
    
    let effects = { ...action.effects }
    
    if (action.target && targetCharId) {
      const targetChar = charactersState.value.find(c => c.id === targetCharId)
      if (targetChar) {
        effects = {
          [targetCharId]: { health: [3, 5], affection: [10, 12] },
          entertainment: [4, 6],
          stress: [-4, -6]
        }
        addLog(`与${targetChar.name}互动了！`)
      }
    }
    
    applyEffects(effects)
    
    addLog(`执行了「${action.name}」`)
    
    return true
  }

  function triggerRandomEvent() {
    if (Math.random() > 0.7) return
    
    const event = events[Math.floor(Math.random() * events.length)]
    currentEvent.value = event
    isEventActive.value = true
    addLog(`触发事件：${event.title}`)
  }

  function selectEventOption(option) {
    applyEffects(option.effects)
    addLog(`选择了：${option.text}`)
    isEventActive.value = false
    currentEvent.value = null
  }

  function monthlySettlement() {
    addLog('=== 月末结算 ===')
    
    charactersState.value.forEach(char => {
      let decay = char.baseDecay
      
      if (stress.value > 120) {
        decay += randomInRange(2, 4)
      }
      
      if (char.affection >= 50) {
        const protection = Math.min(25, (char.affection - 50) * 0.5)
        decay = Math.floor(decay * (1 - protection / 100))
      }
      
      char.health = Math.max(0, char.health - decay)
      
      if (char.health > 70) char.affection = Math.min(100, char.affection + 1)
      if (char.health < 30) char.affection = Math.max(0, char.affection - 3)
    })
    
    entertainment.value = Math.max(0, entertainment.value - 2)
    
    checkGameOver()
    
    if (!gameOver.value) {
      month.value++
      actionPoints.value = maxActionPoints
      
      if (month.value > maxMonths) {
        gameWon.value = true
        gameOver.value = true
      } else {
        triggerRandomEvent()
      }
    }
    
    saveGame()
  }

  function checkGameOver() {
    const deadChar = charactersState.value.find(c => c.health <= 0)
    if (deadChar) {
      gameOver.value = true
      addLog(`${deadChar.name}的健康值归零，游戏结束。`)
    }
    
    if (entertainment.value <= 0) {
      gameOver.value = true
      addLog('娱乐值归零，游戏结束。')
    }
  }

  function resetGame() {
    month.value = 1
    actionPoints.value = maxActionPoints
    charactersState.value = characters.map(c => ({
      ...c,
      health: c.initialHealth,
      affection: c.initialAffection,
      isComatose: false,
      comaTurns: 0
    }))
    entertainment.value = 60
    stress.value = 30
    academic.value = 40
    currentEvent.value = null
    isEventActive.value = false
    gameLog.value = []
    gameOver.value = false
    gameWon.value = false
    localStorage.removeItem('bodyGuardians_save')
  }

  function saveGame() {
    const saveData = {
      month: month.value,
      actionPoints: actionPoints.value,
      charactersState: charactersState.value,
      entertainment: entertainment.value,
      stress: stress.value,
      academic: academic.value,
      gameLog: gameLog.value
    }
    localStorage.setItem('bodyGuardians_save', JSON.stringify(saveData))
  }

  function loadGame() {
    const saveData = localStorage.getItem('bodyGuardians_save')
    if (saveData) {
      const data = JSON.parse(saveData)
      month.value = data.month
      actionPoints.value = data.actionPoints
      charactersState.value = data.charactersState.map(savedChar => {
        const originalChar = characters.find(c => c.id === savedChar.id)
        return {
          ...originalChar,
          ...savedChar
        }
      })
      entertainment.value = data.entertainment
      stress.value = data.stress
      academic.value = data.academic
      gameLog.value = data.gameLog
      return true
    }
    return false
  }

  return {
    month,
    maxMonths,
    actionPoints,
    maxActionPoints,
    charactersState,
    entertainment,
    stress,
    academic,
    currentEvent,
    isEventActive,
    gameLog,
    gameOver,
    gameWon,
    avgHealth,
    avgAffection,
    performAction,
    triggerRandomEvent,
    selectEventOption,
    monthlySettlement,
    resetGame,
    saveGame,
    loadGame
  }
})