<script lang="ts" setup>
import { Application, Assets, Container, Graphics, RenderTexture, Sprite, Text, Ticker } from 'pixi.js';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { handleResize } from '@/components/game/resize';
import baseLayerImg from '@/assets/images/base-layer.avif';
import baseLayerImgWin from '@/assets/images/base-layer--win.avif';
import coverLayerImg from '@/assets/images/cover-layer.avif';
import { createCoverLayer } from '@/components/game/createCoverLayer';
import { createBaseLayer } from '@/components/game/createBaseLayer';
import { createMaskLayer } from '@/components/game/createMaskLayer';
import { setup } from '@/components/game/setup';
import { gameConfig } from '@/config/gameConfig';
import { mainConfig } from '@/config/mainConfig';

let app: Application | null = null;
let resizeObserver: ResizeObserver | null = null;
const sceneRef = ref<HTMLDivElement | null>(null);

const props = defineProps<{
  openCardsCounter: number;
  isReset: boolean;
}>();

const emits = defineEmits<{
  (event: 'update:openCardsCounter', value: number): void;
  (event: 'cardOpened'): void;
}>();

const currentX = ref({ x: 0, y: 50 });
const movingTopRight = ref(true);

const updatePosition = (delta: number) => {
  if (movingTopRight.value) {
    currentX.value.x += 10 * delta;
    currentX.value.y -= 10 * delta;
    if (currentX.value.y < 0 || currentX.value.x > gameConfig.worldWidth) {
      movingTopRight.value = false;
      currentX.value.x += 45;
    }
  } else {
    currentX.value.x -= 10 * delta;
    currentX.value.y += 10 * delta;
    if (currentX.value.x < 0 || currentX.value.y > gameConfig.worldHeight - 50) {
      movingTopRight.value = true;
      currentX.value.y += 45;
    }
  }
};

const renderMask = (masklLayer: Graphics, texture: RenderTexture) => {
  masklLayer.circle(currentX.value.x, currentX.value.y, 50);
  masklLayer.fill('#000000');
  app?.renderer.render({ container: masklLayer, target: texture });
};

const createCard = async () => {
  if (!app) return;
  const { container: base, text, sprite: baseSprite } = await createBaseLayer(baseLayerImg, mainConfig.cards.values.empty, '#ffffff', 60, gameConfig.worldWidth, gameConfig.worldHeight);
  const cover = await createCoverLayer(coverLayerImg);
  const { rect, texture } = await createMaskLayer(cover, app, gameConfig.worldWidth, gameConfig.worldHeight);

  const scratchAnimation = (delta: Ticker) => {
    updatePosition(delta.deltaTime);
    renderMask(rect, texture);
    if (currentX.value.y > gameConfig.worldHeight && 
        currentX.value.x > gameConfig.worldWidth) {
      app?.ticker.remove(scratchAnimation);
      cover.removeListener('pointerdown', handleOpenCard);
      emits('cardOpened');
    };
  };

  const handleOpenCard = async () => {
    emits('update:openCardsCounter', props.openCardsCounter + 1);
    if (props.openCardsCounter === 1) {
      text.text = mainConfig.cards.values.win;
      baseSprite.texture = await Assets.load(baseLayerImgWin);
    }
    app?.ticker.add(scratchAnimation);
  };

  cover.once('pointerdown', handleOpenCard);

  app.stage.addChild(base);
  app.stage.addChild(cover);
}  

const resetGame = () => {
  app?.stage.removeChildren();
  currentX.value = { x: 0, y: 50 };
  createCard();
};

watch(() => props.isReset, async () => {
  if (props.isReset) resetGame();
});

onMounted(async () => {
  const scene = sceneRef.value;
  if (!scene) return;

  app = new Application();

  await setup(app, scene);
  await createCard();

  handleResize(
    app, 
    scene.offsetWidth, scene.offsetHeight, 
    gameConfig.worldWidth, gameConfig.worldHeight
  );
  resizeObserver = new ResizeObserver(() => {
    if (app) {
      handleResize(
        app, 
        scene.offsetWidth, scene.offsetHeight, 
        gameConfig.worldWidth, gameConfig.worldHeight
      );
    }
  });
  resizeObserver.observe(scene);
});

onUnmounted(() => {
  app?.destroy(true, { children: true, texture: true });
  app = null;
  resizeObserver?.disconnect();
  resizeObserver = null;
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