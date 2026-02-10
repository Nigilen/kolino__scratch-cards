<script lang="ts" setup>
import ScratchLayout from '@/components/game/ScratchLayout.vue';
import { data } from '@/data';
import { ref, watch } from 'vue';

const openCardsCounter = ref(0);
const openedCardsCounter = ref(0);

const props = defineProps<{
  isOpenModal: boolean;
}>();

const emit = defineEmits<{
  (event: 'gameEnd'): void;
}>();

const handleCardOpen = () => {
  openCardsCounter.value++;

};

const handleCardOpened = () => {
  openedCardsCounter.value++;
  console.log(openedCardsCounter.value)
  if (openedCardsCounter.value === data.cards.quantity) {
    emit('gameEnd');
  }
};

watch(() => props.isOpenModal, () => {
  if (!props.isOpenModal) {
    openCardsCounter.value = 0;
    openedCardsCounter.value = 0;
  }
});

</script>

<template>
  <ul class="list">
    <li class="item" v-for="card in data.cards.quantity" :key="card">
      <ScratchLayout 
        @cardOpen="handleCardOpen" 
        @cardOpened="handleCardOpened"
        :openCardsCounter="openCardsCounter" 
        :isOpenModal="props.isOpenModal"
      />
    </li>
  </ul>
</template>

<style lang="css" scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1vmin;

  & .item {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    inline-size: min(320px, 40vmax);
    block-size: auto;
    aspect-ratio: 1.6;
    border: 2px solid var(--primary-color);
    border-radius: 32px;
    overflow: hidden;
  }

}

</style>