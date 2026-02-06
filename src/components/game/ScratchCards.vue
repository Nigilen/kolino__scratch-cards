<script lang="ts" setup>
import ScratchLayout from '@/components/game/ScratchLayout.vue';
import { data } from '@/data';



</script>

<template>

  <ul class="list">
    <li class="item" v-for="card in data.cards.values.length" :key="card">
      <ScratchLayout />
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
    inline-size: min(400px, 70vmin);
    block-size: auto;
    aspect-ratio: 1.6;
    border: 2px solid var(--primary-color);
  }
}

</style>