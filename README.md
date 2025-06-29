
# 🎮 Memory Game (Vue 3 + Pinia)

A simple memory matching game built with **Vue 3 Composition API**, **Pinia** for state management, and **Vite** as the build tool.  
Players flip cards to find matching pairs while tracking their time and score.

🎨 **Live Preview:** [View it here](https://ehsanjalilvand.dev/#projects)

---

## 🚀 Features

- Built with **Vue 3 Composition API**
- Global state management using **Pinia**
- Three difficulty levels: Easy, Normal, Hard
- Real-time timer and score display
- Fully responsive layout for mobile and desktop

---

## 📦 Tech Stack

- [Vue 3](https://vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)

---

## 🛠️ Getting Started

1️⃣ Clone the repository:

```bash
git clone https://github.com/EhsanJalilvand/vueGame.git
cd vueGame
```

2️⃣ Install dependencies:

```bash
npm install
```

3️⃣ Start the development server:

```bash
npm run dev
```

---

## 📂 Project Structure

```bash
├── components/
│   ├── Board.vue        # Main game board component
│   └── GameCard.vue     # Individual card component
├── stores/
│   └── game.js          # Pinia store for game logic
├── composables/         # Utility functions (score, time, random number)
├── public/Images/       # Card images for different difficulties
├── App.vue              # Root component
├── main.js              # App entry point
├── vite.config.js       # Vite configuration
└── package.json
```

---

