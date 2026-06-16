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