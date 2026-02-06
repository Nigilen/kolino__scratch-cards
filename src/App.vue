<script setup lang="ts">
import { ref } from 'vue';
import GameTitle from '@/components/ui/UiTitle.vue';
import UiModal from '@/components/ui/UiModal.vue';
import ScratchCards from './components/game/ScratchCards.vue';
import { data } from '@/data';

const isOpenModal = ref(false);
const isSpin = ref(false);
const winValue = ref();

const handleScratchStart = () => {
  isSpin.value = true;
};

const handleOpenModal = (winSector: number) => {
  isOpenModal.value = true;
  // winValue.value = data.cards.sectorsValue.bonuses[winSector - 1];
};

const handleCloseModal = () => {
  isOpenModal.value = false;
  isSpin.value = false;
};

</script>

<template>
  <main class="main">
    <GameTitle />
    <ScratchCards />
  </main>
  <Teleport to="body">
    <Transition>
      <UiModal 
        v-if="isOpenModal" 
        :winValue="winValue" 
        @modalClose="handleCloseModal" 
      />
    </Transition>
  </Teleport>
</template>

<style lang="css" scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: min(100px, 12vmax);
}
</style>
