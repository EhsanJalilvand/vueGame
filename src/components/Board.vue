<template>
  <div class="game-board">
    <!-- Header section -->
    <div class="game-header">
      <div class="game-info">
        <div class="game-timer">
          <span class="info-label">TIME</span>
          <span class="info-value">{{ gameStore.gameTime }}</span>
        </div>
        
        <div v-if="gameStore.gameScore > 0" class="game-score">
          <span class="info-label">SCORE</span>
          <span class="info-value">{{ gameStore.gameScore }}</span>
        </div>
      </div>

      <button class="btn btn-reset" @click="reset">
        <span class="btn-text">Reset Game</span>
      </button>
    </div>

    <!-- Game cards grid -->
    <div class="cards-wrapper">
      <div class="grid-container" :style="{
        gridTemplateColumns: `repeat(${columnCount}, minmax(80px, 1fr))`,
        gridTemplateRows: `repeat(${rowCount}, minmax(100px, 1fr))`
      }">
        <GameCard 
          v-for="n in cardCount" 
          :key="n" 
          :id="n" 
          :imageFinalSource="`/Images/Split${cardCount}/${n}.jpg`"
          :state='gameStore.cards[n - 1].state' 
          :random-num="gameStore.cards[n - 1].randomNum">
        </GameCard>
      </div>
    </div>

    <!-- Difficulty controls -->
    <div class="difficulty-controls">
      <h3 class="difficulty-title">Select Difficulty:</h3>
      <div class="difficulty-buttons">
        <button class="btn btn-difficulty" @click="start(2,3)">
          <span class="btn-text">Easy (2×3)</span>
        </button>
        <button class="btn btn-difficulty" @click="start(3,4)">
          <span class="btn-text">Normal (3×4)</span>
        </button>
        <button class="btn btn-difficulty" @click="start(3,6)">
          <span class="btn-text">Hard (3×6)</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import GameCard from './GameCard.vue';
import { useGameStore } from '@/stores/game';

const gameStore = useGameStore();
const rowCount = ref(2);
const columnCount = ref(3);

const cardCount = computed(() => rowCount.value * columnCount.value);
gameStore.initGame(cardCount.value);


function reset() {
  gameStore.initGame(cardCount.value);
}

function start(r, c) {
  rowCount.value = r;
  columnCount.value = c;
  gameStore.initGame(cardCount.value);
}
</script>

<style scoped>
/* Main game container */
.game-board {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem;
  background-color: #121212;
  min-height: 100vh;
  font-family: 'Arial', sans-serif;
  color: #e0e0e0;
  box-sizing: border-box;
  width: 100%;
}

/* Game header section */
.game-header {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  padding: 1rem;
  background-color: #1e1e1e;
  border-radius: 8px;
  border: 1px solid #333;
  gap: 1rem;
}

/* Game info section containing time and score */
.game-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5rem;
  gap: 1.5rem; /* Added gap between time and score */
}

/* Time display styling */
.game-timer {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 80px;
}

/* Score display styling */
.game-score {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  min-width: 80px;
}

/* Label styling for time and score */
.info-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #888;
  margin-bottom: 0.25rem;
}

/* Value styling for time and score */
.info-value {
  font-size: 1.1rem;
  font-weight: bold;
  color: #fff;
  white-space: nowrap;
}

/* Reset button styling */
.btn-reset {
  background-color: #333;
  color: #fff;
  border: 1px solid #444;
  padding: 0.75rem;
  border-radius: 6px;
  font-weight: 600;
  width: 100%;
  transition: background-color 0.2s ease;
}

.btn-reset:hover {
  background-color: #444;
}

/* Difficulty controls container */
.difficulty-controls {
  width: 100%;

  padding: 1rem;
  background-color: #1e1e1e;
  border-radius: 8px;
  border: 1px solid #333;
}

/* Difficulty title styling */
.difficulty-title {
  text-align: center;
  margin-bottom: 1rem;
  color: #aaa;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Difficulty buttons container */
.difficulty-buttons {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

/* Base difficulty button styling */
.btn-difficulty {
  background-color: #252525;
  color: #e0e0e0;
  border: 1px solid #333;
  padding: 0.75rem 0.5rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.85rem;
  text-align: center;
  transition: all 0.2s ease;
  white-space: nowrap;
}

/* Button hover effects */
.btn-difficulty:hover {
  background-color: #333;
  color: #fff;
}

/* Cards container with horizontal scroll */
.cards-wrapper {
  width: 100%;

  overflow-x: auto;
  padding: 0.5rem 0;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

/* Hide scrollbar while keeping functionality */
.cards-wrapper::-webkit-scrollbar {
  display: none;
}

/* Grid container for cards */
.grid-container {
  display: grid;
  gap: 8px;
  width: max-content;
  
  margin: 0 auto;
  padding: 0.5rem;
  background-color: #1e1e1e;
  border-radius: 8px;
  border: 1px solid #333;
  box-sizing: border-box;
}

/* Mobile-first responsive grid */
.grid-container {
  grid-template-columns: repeat(v-bind('columnCount'), minmax(calc((100vw - 2rem - 1rem) / v-bind('columnCount') - 8px), 1fr));
  grid-auto-rows: minmax(calc((100vw - 2rem - 1rem) / v-bind('columnCount') * 1.25), 1fr);
}

/* Tablet/desktop responsive styles */
@media (min-width: 768px) {
  .game-board {
    padding: 2rem;
  }
  
  .game-header {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  
  .btn-reset {
    width: auto;
    min-width: 120px;
  }
  
  .difficulty-buttons {
    gap: 1rem;
  }
  
  .btn-difficulty {
    padding: 0.75rem;
    font-size: 0.9rem;
  }
  
  .grid-container {
    gap: 12px;
    padding: 1rem;
    grid-template-columns: repeat(v-bind('columnCount'), minmax(80px, 1fr));
    grid-auto-rows: minmax(100px, 1fr);
  }
}

/* Special handling for hard mode (6 columns) */
.grid-container[style*='grid-template-columns: repeat(6,'] {
  grid-template-columns: repeat(6, minmax(60px, 1fr));
  grid-auto-rows: minmax(75px, 1fr);
  width: max-content;
  min-width: calc(6 * 60px + 5 * 8px + 1rem);
}

/* Very small devices (below 360px) */
@media (max-width: 360px) {
  .difficulty-buttons {
    grid-template-columns: 1fr;
  }
  
  .grid-container {
    grid-template-columns: repeat(v-bind('columnCount'), minmax(50px, 1fr));
    grid-auto-rows: minmax(65px, 1fr);
  }
  
  .grid-container[style*='grid-template-columns: repeat(6,'] {
    transform: scale(0.95);
    transform-origin: left center;
  }
}
</style>