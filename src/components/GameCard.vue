<template>
  <div class="flex flex-col items-center">
    <!-- Card flipping scene -->
    <div class="scene w-[200px] h-[200px]" @click="flipCard">
      <div 
        class="card"
        :style="{ transform: `rotateY(${rotation}deg)`, transition: 'transform 0.8s ease' }"
      >
        <!-- Card front face -->
        <div class="card-face">
          <img :src="imageBackSource" alt="back image" />
        </div>

        <!-- Card back face -->
        <div class="card-face card-back">
          <img :src="imagesrc" alt="front image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Import game store and dependencies
import { useGameStore } from '@/stores/game';
import { computed, ref, watch } from 'vue'

// Access game store
const gameStore = useGameStore();

// Receive props from parent
const { id, imageFinalSource, state, randomNum } = defineProps({
  id: Number, 
  imageFinalSource: String, 
  state: Number, 
  randomNum: Number 
});

// Reactive state for card rotation and back image
const rotation = ref(0)
const backImagePath = '/Images/wood.jpg';
const imageBackSource = ref(backImagePath)

// Compute image URL for the card face
const imagesrc = computed(() => `https://picsum.photos/200/200?random=${randomNum}`);

// Watch for card state changes and apply effects
watch(() => state, () => {
  if (state === 0) {
    rotation.value = 0
    imageBackSource.value = backImagePath;
  } else if (state === 1) {
    rotation.value += 180
  } else if (state === 2) {
    rotation.value = 0
  } else if (state === 3) {
    rotation.value += 180
    imageBackSource.value = imageFinalSource;
  }
});

// Card click handler
function flipCard() {
  gameStore.selectCard(id);
}
</script>

<style scoped>
.scene {
  perspective: 1000px;
}

.card {
  width: 200px;
  height: 200px;
  position: relative;
  transform-style: preserve-3d;
}

.card-face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-back {
  transform: rotateY(180deg);
}

.card-face img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
</style>