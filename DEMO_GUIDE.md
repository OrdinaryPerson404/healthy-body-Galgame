# 身体守护者 - 最简Demo实现指南

> 文档版本：v1.0 | 最后更新：2026年6月

---

## 1. 最简Demo定义与目标

### 1.1 定义

**最简可玩Demo**是指能够完整展示游戏核心玩法循环和核心理念的最小版本，满足以下条件：

- 游戏可启动、可进行、可结束
- 核心数值系统完整运行
- 用户能体验到"平衡健康与学业"的核心概念
- 无需外部资源（美术、音效）即可运行

### 1.2 目标

| 目标 | 说明 |
|------|------|
| **验证核心玩法** | 测试"每月4行动点→事件→结算"循环的可玩性 |
| **验证数值平衡** | 测试基础衰减、行动效果的合理性 |
| **验证用户体验** | 测试目标用户（12-18岁）对玩法的理解程度 |
| **展示核心理念** | 体现"天命难违，尽力而为"和"情感的力量" |

### 1.3 Demo范围

| 维度 | 范围 |
|------|------|
| **时间** | 高一上学期（6个月） |
| **角色** | 心咲（心脏）、胃美（胃）、眼璃（眼睛） |
| **行动** | 运动、吃饭、学习、娱乐、互动、早睡（6种） |
| **事件** | 5个随机事件 |
| **结局** | 简单评价（非完整结局） |

---

## 2. 技术栈与环境要求

### 2.1 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Vue | 3.x | 前端框架 |
| Vite | 5.x | 构建工具 |
| Pinia | 2.x | 状态管理 |
| Vue Router | 4.x | 页面路由 |
| Tailwind CSS | 3.x | CSS样式 |
| JavaScript | ES6+ | 开发语言 |

### 2.2 环境要求

| 项目 | 要求 |
|------|------|
| Node.js | ≥ 18.0.0 |
| npm | ≥ 9.0.0 |
| 浏览器 | Chrome ≥ 90 / Firefox ≥ 88 |

### 2.3 前置条件

- 已安装 Node.js 和 npm
- 了解 Vue 3 基础语法
- 了解 JavaScript ES6+ 语法

---

## 3. 分步骤实现指南

### 3.1 项目初始化

#### 3.1.1 创建Vite + Vue项目

```bash
npm create vite@6.5.0 . -- --template vue
```

#### 3.1.2 安装依赖

```bash
npm install
npm install pinia vue-router@4 tailwindcss@3 postcss autoprefixer
```

#### 3.1.3 初始化Tailwind CSS

```bash
npx tailwindcss init -p
```

配置 `tailwind.config.js`：

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

配置 `src/style.css`：

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 3.2 项目结构

```
.
├── src/
│   ├── components/          # 组件
│   │   ├── CharacterCard.vue    # 角色卡片
│   │   ├── ActionPanel.vue      # 行动面板
│   │   ├── EventModal.vue       # 事件弹窗
│   │   └── StatusBar.vue        # 状态栏
│   ├── views/               # 页面
│   │   ├── Home.vue             # 首页
│   │   ├── Game.vue             # 游戏主界面
│   │   └── Result.vue           # 结果页面
│   ├── stores/              # Pinia状态管理
│   │   └── gameStore.js         # 游戏状态
│   ├── data/                # 数据配置
│   │   ├── characters.js        # 角色数据
│   │   ├── actions.js           # 行动数据
│   │   └── events.js            # 事件数据
│   ├── utils/               # 工具函数
│   │   └── gameLogic.js         # 游戏逻辑计算
│   ├── router/              # 路由
│   │   └── index.js             # 路由配置
│   ├── App.vue              # 根组件
│   ├── main.js              # 入口文件
│   └── style.css            # 全局样式
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

### 3.3 核心配置

#### 3.3.1 路由配置 (`src/router/index.js`)

```js
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: () => import('../views/Home.vue') },
  { path: '/game', name: 'Game', component: () => import('../views/Game.vue') },
  { path: '/result', name: 'Result', component: () => import('../views/Result.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
```

#### 3.3.2 角色数据 (`src/data/characters.js`)

```js
export const characters = [
  {
    id: 'H',
    name: '心咲',
    organ: '心脏',
    color: '#ef4444',
    initialHealth: 60,
    initialAffection: 30,
    baseDecay: 4,
    likes: ['运动'],
    dislikes: ['学习']
  },
  {
    id: 'S',
    name: '胃美',
    organ: '胃',
    color: '#eab308',
    initialHealth: 50,
    initialAffection: 30,
    baseDecay: 6,
    likes: ['吃饭'],
    dislikes: ['学习', '娱乐']
  },
  {
    id: 'E',
    name: '眼璃',
    organ: '眼睛',
    color: '#3b82f6',
    initialHealth: 65,
    initialAffection: 30,
    baseDecay: 2,
    likes: ['早睡'],
    dislikes: ['学习', '娱乐']
  }
]
```

#### 3.3.3 行动数据 (`src/data/actions.js`)

```js
export const actions = [
  {
    id: 'exercise',
    name: '运动',
    icon: '🏃',
    effects: {
      H: { health: [4, 6], affection: [3, 4] },
      S: { health: [1, 2] },
      E: { health: [-1, 0] },
      entertainment: [3, 5],
      stress: [-8, -12]
    }
  },
  {
    id: 'eat',
    name: '按时吃饭',
    icon: '🍚',
    effects: {
      H: { health: [1, 2] },
      S: { health: [6, 8], affection: [4, 5] },
      entertainment: [1, 3],
      stress: [-3, -5]
    }
  },
  {
    id: 'study',
    name: '学习',
    icon: '📚',
    effects: {
      H: { health: [-2, -3], affection: [-2, 0] },
      S: { health: [-2, -3], affection: [-2, 0] },
      E: { health: [-3, -4], affection: [-2, 0] },
      entertainment: [-4, -6],
      stress: [15, 20],
      academic: [5, 10]
    }
  },
  {
    id: 'entertain',
    name: '娱乐',
    icon: '🎮',
    effects: {
      E: { health: [-3, -5], affection: [-2, 0] },
      entertainment: [10, 14],
      stress: [-8, -12]
    }
  },
  {
    id: 'interact',
    name: '与角色互动',
    icon: '💬',
    target: true
  },
  {
    id: 'sleep',
    name: '早睡',
    icon: '😴',
    effects: {
      H: { health: [2, 3] },
      S: { health: [2, 3] },
      E: { health: [2, 3] },
      entertainment: [3, 5],
      stress: [-10, -15]
    }
  }
]
```

#### 3.3.4 事件数据 (`src/data/events.js`)

```js
export const events = [
  {
    id: 'exam_stress',
    title: '月考临近',
    description: '老师宣布下周进行月考，同学们都开始紧张复习。',
    options: [
      {
        text: '熬夜复习',
        effects: { H: { health: -3 }, S: { health: -3 }, E: { health: -5 }, stress: 15, academic: 8 }
      },
      {
        text: '正常作息',
        effects: { stress: 5, academic: 3 }
      },
      {
        text: '放松心态',
        effects: { entertainment: 5, stress: -5, academic: -3 }
      }
    ]
  },
  {
    id: 'bad_weather',
    title: '雾霾来袭',
    description: '今天空气质量很差，灰蒙蒙的天空让人心情压抑。',
    options: [
      {
        text: '戴口罩上学',
        effects: { H: { health: -1 }, S: { health: -1 }, stress: 3 }
      },
      {
        text: '请假在家',
        effects: { entertainment: 5, stress: -5, academic: -5 }
      }
    ]
  },
  {
    id: 'friend_invite',
    title: '朋友邀约',
    description: '好朋友邀请你周末一起去看电影。',
    options: [
      {
        text: '答应去',
        effects: { entertainment: 10, stress: -10, academic: -5 }
      },
      {
        text: '拒绝，在家学习',
        effects: { academic: 5, entertainment: -3, stress: 3 }
      }
    ]
  },
  {
    id: 'stomach_ache',
    title: '胃部不适',
    description: '胃美捂着肚子说："好难受...是不是昨天吃多了？"',
    options: [
      {
        text: '喝温水休息',
        effects: { S: { health: -2, affection: 3 }, entertainment: -2 }
      },
      {
        text: '吃止痛药硬扛',
        effects: { S: { health: -5, affection: -3 }, stress: 5 }
      }
    ]
  },
  {
    id: 'eye_tired',
    title: '眼睛疲劳',
    description: '眼璃揉着眼睛说："看东西有点模糊...我需要休息。"',
    options: [
      {
        text: '做眼保健操',
        effects: { E: { health: 3, affection: 3 }, entertainment: 2 }
      },
      {
        text: '滴眼药水继续学',
        effects: { E: { health: -2, affection: -2 }, academic: 3 }
      }
    ]
  }
]
```

### 3.4 核心功能开发

#### 3.4.1 游戏状态管理 (`src/stores/gameStore.js`)

```js
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
            char.health = Math.max(0, Math.min(100, char.health + affectionChange))
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
      charactersState.value = data.charactersState
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
```

#### 3.4.2 首页 (`src/views/Home.vue`)

```vue
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
```

#### 3.4.3 游戏主界面 (`src/views/Game.vue`)

```vue
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
```

#### 3.4.4 组件实现

**StatusBar.vue**

```vue
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
```

**CharacterCard.vue**

```vue
<template>
  <div 
    class="bg-white rounded-2xl shadow-sm p-4 transition-all hover:shadow-md"
    :class="character.health < 30 ? 'border-2 border-red-300' : ''"
  >
    <div class="flex items-center gap-3 mb-3">
      <div 
        class="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
        :style="{ backgroundColor: character.color + '20' }"
      >
        {{ getIcon(character.id) }}
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
      @click="$emit('interact')"
      class="mt-3 w-full py-2 bg-gradient-to-r from-pink-100 to-purple-100 text-gray-700 rounded-lg text-sm font-medium hover:from-pink-200 hover:to-purple-200 transition-all"
    >
      💬 互动
    </button>
  </div>
</template>

<script setup>
defineProps({
  character: {
    type: Object,
    required: true
  }
})

defineEmits(['interact'])

function getIcon(id) {
  const icons = { H: '💗', S: '🍛', E: '👁️' }
  return icons[id] || '🧘'
}

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
  if (health > 80) return '活力满满！'
  if (health > 50) return '一切安好。'
  if (health > 30) return '有点累了...'
  return '我好难受...'
}
</script>
```

**ActionPanel.vue**

```vue
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
```

**EventModal.vue**

```vue
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
```

### 3.5 入口文件配置

**main.js**

```js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import './style.css'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
```

**App.vue**

```vue
<template>
  <router-view />
</template>
```

---

## 4. 运行方法与验证步骤

### 4.1 运行方法

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

开发服务器启动后访问 `http://localhost:5173` 即可进入游戏。

### 4.2 验证步骤

#### 4.2.1 基础功能验证

| 步骤 | 操作 | 预期结果 |
|------|------|----------|
| 1 | 打开首页 | 显示"开始新游戏"和"继续游戏"按钮 |
| 2 | 点击"开始新游戏" | 进入游戏主界面，显示3个角色卡片 |
| 3 | 点击行动按钮（如"运动"） | 行动点-1，角色数值变化 |
| 4 | 点击"结束本月" | 触发月末结算，进入下月 |
| 5 | 触发随机事件 | 弹出事件弹窗，可选择选项 |
| 6 | 消耗完4个行动点 | "结束本月"按钮可用 |
| 7 | 刷新页面 | 进度自动保存，可继续游戏 |

#### 4.2.2 数值验证

| 验证项 | 预期结果 |
|--------|----------|
| 行动效果浮动 | 每次行动效果在80%-120%范围内 |
| 基础衰减 | 每月末各器官健康值按基础衰减减少 |
| 压力影响 | 压力>120时额外增加衰减 |
| 好感度保护 | 好感≥50时衰减减少 |
| 游戏结束 | 任一器官健康归零或娱乐值归零 |
| 学期结束 | 完成6个月后显示评价 |

#### 4.2.3 边界测试

| 测试场景 | 预期结果 |
|----------|----------|
| 健康值接近0 | 角色卡片显示红色边框，状态显示"我好难受..." |
| 健康值>80 | 状态显示"活力满满！" |
| 行动点为0 | 行动按钮禁用，仅"结束本月"可用 |
| 事件触发中 | 行动按钮禁用，只能选择事件选项 |

---

## 5. 扩展方向与注意事项

### 5.1 扩展方向

| 优先级 | 扩展内容 | 说明 |
|--------|----------|------|
| **高** | 添加剩余3个角色（肺清、肝默、足飞） | 完整6角色系统 |
| **高** | 角色个人剧情事件 | 好感度阈值触发 |
| **中** | 完整3年游戏流程 | 高一至高三 |
| **中** | 善意谎言机制 | 好感≥90的昏迷保护 |
| **中** | 紧急救治机制 | 健康≤15的急救 |
| **中** | 抑郁期系统 | 娱乐值归零的特殊状态 |
| **低** | 美术资源 | 角色立绘、背景图 |
| **低** | 音效系统 | BGM、互动音效 |
| **低** | 多语言 | 中英文切换 |
| **低** | 导出/导入存档 | 存档代码功能 |

### 5.2 注意事项

#### 5.2.1 数值平衡

- 行动效果的随机浮动范围需通过测试调整
- 基础衰减数值需确保6个月内不会过快导致游戏失败
- 好感度保护系数需确保高好感确实能提供有效保护

#### 5.2.2 用户体验

- 行动后需有明确的数值变化反馈
- 事件选项需提供清晰的后果提示
- 游戏节奏需控制在每轮10-15分钟

#### 5.2.3 开发规范

- 所有数值配置应集中在 `src/data/` 目录
- 游戏逻辑计算应集中在 `src/utils/gameLogic.js`
- 状态管理使用 Pinia，避免组件间直接传递状态

#### 5.2.4 数据持久化

- 使用 localStorage 存储游戏进度
- 定期自动保存，避免意外丢失
- 考虑添加手动存档功能

---

## 附录：开发时间线参考

| 阶段 | 时长 | 任务 |
|------|------|------|
| Day 1 | 1天 | 项目初始化、技术选型、基础架构 |
| Day 2 | 1天 | 角色数据、状态管理、数值计算 |
| Day 3 | 1天 | 行动系统、UI界面开发 |
| Day 4 | 1天 | 事件系统、结算流程、存档功能 |
| Day 5 | 1天 | 测试、bug修复、优化调整 |

---

> 📝 文档结束 | 身体守护者最简Demo实现指南 v1.0
