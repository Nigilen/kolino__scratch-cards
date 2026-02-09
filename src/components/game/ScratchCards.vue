<script lang="ts" setup>
import ScratchLayout from '@/components/game/ScratchLayout.vue';
import { data } from '@/data';
</script>

<template>

  <ul class="list">
    <li class="item" v-for="card in data.cards.values" :key="card">
      <span class="item__bonus">{{ card }}</span>
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
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    inline-size: min(400px, 70vmin);
    block-size: auto;
    aspect-ratio: 1.6;
    border: 2px solid var(--primary-color);
    background-color: var(--primary-color);
    container-type: inline-size;
    border-radius: 32px;
    overflow: hidden;
  }

  & .item__bonus {
    position: relative;
    font-size: 12cqi;
    color: #E8E0D5;
    text-transform: uppercase;
  }
}

</style>