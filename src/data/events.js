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