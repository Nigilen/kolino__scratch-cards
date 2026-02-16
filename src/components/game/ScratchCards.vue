<script lang="ts" setup>
import ScratchLayout from '@/components/game/ScratchLayout.vue';
import { mainConfig } from '@/config/mainConfig';
import { ref, watch } from 'vue';

const props = defineProps<{
  modelValue: boolean,
}>();

const openCardsCounter = ref(0);
const totalCardsOpened = ref(0);

const emits = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>();

const handleOpenModal = () => {
  emits('update:modelValue', true);
};

const handleCardOpened = () => {
  totalCardsOpened.value++;
  if (totalCardsOpened.value === mainConfig.cards.quantity) {
    handleOpenModal();
  }
};

watch(() => props.modelValue, () => {
  if (!props.modelValue) {
    openCardsCounter.value = 0;
    totalCardsOpened.value = 0;
  }
});

</script>

<template>
  <ul class="list">
    <li class="item" v-for="card in mainConfig.cards.quantity" :key="card">
      <ScratchLayout 
        @cardOpened="handleCardOpened"
        v-model:openCardsCounter="openCardsCounter"
        :isReset="!props.modelValue"
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