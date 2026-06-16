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
    dislikes: ['学习'],
    icon: '💗',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#f87171"/><stop offset="100%" style="stop-color:#b91c1c"/></linearGradient></defs><path d="M50 85 C30 75 15 55 15 35 C15 20 25 10 40 10 C45 10 50 12 50 17 C50 12 55 10 60 10 C75 10 85 20 85 35 C85 55 70 75 50 85 Z" fill="url(#heartGrad)"/><circle cx="35" cy="30" r="5" fill="white" opacity="0.5"/><circle cx="65" cy="30" r="5" fill="white" opacity="0.5"/></svg>`
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
    dislikes: ['学习', '娱乐'],
    icon: '🍛',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="stomachGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#fcd34d"/><stop offset="100%" style="stop-color:#a16207"/></linearGradient></defs><ellipse cx="50" cy="55" rx="35" ry="30" fill="url(#stomachGrad)"/><path d="M20 55 L15 45 L35 40 Z" fill="#fcd34d"/><ellipse cx="50" cy="55" rx="20" ry="15" fill="#fde68a"/></svg>`
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
    dislikes: ['学习', '娱乐'],
    icon: '👁️',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="eyeGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#93c5fd"/><stop offset="100%" style="stop-color:#1d4ed8"/></linearGradient></defs><ellipse cx="50" cy="50" rx="35" ry="28" fill="white" stroke="#3b82f6" stroke-width="3"/><ellipse cx="50" cy="50" rx="20" ry="18" fill="url(#eyeGrad)"/><circle cx="50" cy="50" r="10" fill="#1e3a8a"/><circle cx="55" cy="45" r="3" fill="white"/></svg>`
  }
]