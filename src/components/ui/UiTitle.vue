<script lang="ts" setup>
import { mainConfig } from '@/config/mainConfig';
</script>

<template>
  <h1 class="title">{{ mainConfig.title }}</h1>
</template>

<style lang="css" scoped>
.title {
  margin-block: 0 5dvh;
  text-align: center;
  font-size: min(60px, 10vmin);
  line-height: 1;
}
</style>