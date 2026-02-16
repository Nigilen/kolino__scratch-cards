<script setup lang="ts">
import { ref } from 'vue';
import GameTitle from '@/components/ui/UiTitle.vue';
import UiModal from '@/components/ui/UiModal.vue';
import ScratchCards from './components/game/ScratchCards.vue';
import { mainConfig } from '@/config/mainConfig';

const isOpenModal = ref(false);

</script>

<template>
  <main>
    <GameTitle />
    <ScratchCards v-model="isOpenModal" />
  </main>
  <Teleport to="body">
    <UiModal 
      v-model="isOpenModal"
      :winValue="mainConfig.cards.values.win" 
    />
  </Teleport>
</template>

<style lang="css" scoped>

</style>
