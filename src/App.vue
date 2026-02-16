<script setup lang="ts">
import { ref } from 'vue';
import GameTitle from '@/components/ui/UiTitle.vue';
import UiModal from '@/components/ui/UiModal.vue';
import ScratchCards from './components/game/ScratchCards.vue';
import { mainConfig } from '@/config/mainConfig';

const isOpenModal = ref(false);


const handleOpenModal = () => {
  isOpenModal.value = true;
};

const handleCloseModal = () => {
  isOpenModal.value = false;
};

</script>

<template>
  <main class="main">
    <GameTitle />
    <ScratchCards 
      @gameEnd="handleOpenModal" 
      :isOpenModal="isOpenModal"
    />
  </main>
  <Teleport to="body">
    <Transition>
      <UiModal 
        v-if="isOpenModal" 
        :winValue="mainConfig.cards.values.win" 
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
  row-gap: min(30px, 12vmax);
}
</style>
