// Game state store with Pinia
import { defineStore } from 'pinia'
import { getRandomNumber } from '@/composables/getRandomNumber';
import { calculateGameTime } from '@/composables/calculateGameTime';
import { calculateGameScore } from '@/composables/calculateGameScore';

export const useGameStore = defineStore('counter', {
  state: () => ({
    cards: [],
    salt: 0,
    startTime: null,
    gameTime: '',
    gameScore: 0
  }),
  getters: {
    // Returns selected cards
    selectedCards: (state) => state.cards.filter(card => card.isSelected),
    // Checks if all cards are flipped
    isFinish: (state) => state.cards.every(card => card.state === 1)
  },
  actions: {
    // Initialize the game board
    initGame(cardNumber) {
      this.startTime = null;
      this.gameTime = '';
      this.gameScore = 0;
      this.salt += this.cards.length;

      // Reset existing cards
      this.cards.forEach(card => {
        card.state = 0;
      });
      this.cards.length = 0;

      // Create new cards
      for (let i = 1; i <= cardNumber; i++) {
        this.cards.push({ id: i, state: 0, randomNum: -1, isSelected: false })
      }

      // Assign random numbers for matching pairs
      let cardscouples = [...this.cards];
      let _randomNum = 1;
      while (cardscouples.length > 0) {
        for (let i = 0; i < 2; i++) {
          let randomIndex = getRandomNumber(0, cardscouples.length - 1);
          cardscouples[randomIndex].randomNum = _randomNum + this.salt;
          cardscouples.splice(randomIndex, 1);
        }
        _randomNum++;
      }
      console.log(this.startTime, 'Start 111')
    },

    // Handle card selection and game logic
    selectCard(id) {
      const gameCard = this.cards[id - 1];
      if (!this.startTime)
        this.startTime = new Date();

      gameCard.isSelected = true;
      if (gameCard.state === 0 || gameCard.state === 2)
        gameCard.state = 1;

      const selectedCards = this.selectedCards;

      // Check for a pair match
      if (selectedCards.length === 2) {
        if (selectedCards[0].randomNum !== selectedCards[1].randomNum) {
          setTimeout(() => {
            selectedCards[0].state = 2;
            selectedCards[1].state = 2;
          }, 1000);
        }
        this.cards.forEach(card => card.isSelected = false);
      }

      // Check if all cards are matched
      if (this.isFinish) {
        setTimeout(() => {
          this.cards.forEach((card, index) => {
            setTimeout(() => {
              card.state = 3;
              card.isSelected = false;
            }, 100 * index)
          })
          this.gameTime = calculateGameTime(this.startTime);
          this.gameScore = calculateGameScore(this.startTime, this.cards.length)
        }, 1000);
      }
    }
  },
})