<script lang="ts" setup>
import { Application, Container, Graphics, RenderTexture, Ticker } from 'pixi.js';
import { onMounted, onUnmounted, ref } from 'vue';
import { handleResize } from '@/components/game/resize';
import baseLayerImg from '@/assets/images/base-layer.avif';
import coverLayerImg from '@/assets/images/cover-layer.avif';
import { createCoverLayer } from '@/components/game/createCoverLayer';
import { createBaseLayer } from '@/components/game/createBaseLayer';
import { createMaskLayer } from '@/components/game/createMaskLayer';
import { setup } from '@/components/game/setup';
import { STATE } from '@/components/game/constants';

const app = new Application();
const sceneRef = ref<HTMLDivElement>();

const currentX = ref({ x: 0, y: 50 });
const movingTopRight = ref(true);

const updatePosition = (delta: number) => {
  if (movingTopRight.value) {
    currentX.value.x += 10 * delta;
    currentX.value.y -= 10 * delta;
    if (currentX.value.y < 0 || currentX.value.x > STATE.WORLD_WIDTH) {
      movingTopRight.value = false;
      currentX.value.x += 45;
    }
  } else {
    currentX.value.x -= 10 * delta;
    currentX.value.y += 10 * delta;
    if (currentX.value.x < 0 || currentX.value.y > STATE.WORLD_HEIGHT - 50) {
      movingTopRight.value = true;
      currentX.value.y += 45;
    }
  }
};

const renderMask = (masklLayer: Graphics, texture: RenderTexture) => {
  masklLayer.circle(currentX.value.x, currentX.value.y, 50);
  masklLayer.fill('#000000');
  app.renderer.render({ container: masklLayer, target: texture });
};

const createCard = async () => {
  const container = new Container();
  const base = await createBaseLayer(
    baseLayerImg,
    'red',
    'empty',
    '#ffffff',
    60,
  );
  const cover = await createCoverLayer(coverLayerImg);
  const { rect, texture } = await createMaskLayer(cover, app);

  cover.on('pointerdown', () => {
    app.ticker.add((ticker: Ticker) => animation(ticker.deltaTime));
  });

  const animation = (delta: number) => {
    updatePosition(delta);
    renderMask(rect, texture);
    if (currentX.value.y > STATE.WORLD_HEIGHT && currentX.value.x > STATE.WORLD_WIDTH) {
      app.ticker.remove((ticker: Ticker) => animation(ticker.deltaTime));
    }
  };

  container.addChild(base);
  container.addChild(cover);
  app.stage.addChild(container);
}  

onMounted(async () => {
  if (!sceneRef.value) return;
  await setup(app, sceneRef.value);
  await createCard();
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
  position: absolute;
  inset: 0;
  inline-size: 100%;
  block-size: 100%;
  cursor: pointer;
}
</style>