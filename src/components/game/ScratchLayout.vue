<script lang="ts" setup>
import { Application, Assets, Graphics, Sprite } from 'pixi.js';
import { onMounted, onUnmounted, ref } from 'vue';
import { handleResize } from '@/components/game/resize';
import layoutImg from '@/assets/images/card-layout.avif';
import { scratchLayout } from './createLayout';
import { setup } from './setup';

const app = new Application();
const sceneRef = ref<HTMLDivElement>();

onMounted(async () => {
  if (!sceneRef.value) return;

  await setup(app, sceneRef.value);

  // const { container, sprite } = await scratchLayout(layoutImg);


  let posX = 0;
  let posY = 0;

  const animated = async () => {
    const texture = await Assets.load(layoutImg);
    const sprite = new Sprite(texture);
    const mask = new Graphics();
    mask.circle(posX, posY, 50);
    mask.fill(0xffffff);
    sprite.mask = mask;
    app.stage.addChild(mask);
    app.stage.addChild(sprite);
  }

  
  app.ticker.add(() => {
    posX += 1;
    posY += 0.2;
    
    animated();
  });





  handleResize(app, sceneRef.value);
  window.addEventListener('resize', () => handleResize(app, sceneRef.value!));
});

onUnmounted(() => {
  window.addEventListener('resize', () => handleResize(app, sceneRef.value!));
  app.destroy();
});
</script>

<template>
  <div ref="sceneRef" class="scene"></div>
</template>

<style lang="css" scoped>
.scene {
  inline-size: 100%;
  block-size: 100%;
}
</style>