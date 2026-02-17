<script lang="ts" setup>
import { Application, Assets, Graphics, RenderTexture, Ticker } from 'pixi.js';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { handleResize } from '@/components/game/resize';
import { createCoverLayer } from '@/components/game/createCoverLayer';
import { createBaseLayer } from '@/components/game/createBaseLayer';
import { createMaskLayer } from '@/components/game/createMaskLayer';
import { setup } from '@/components/game/setup';
import { gameConfig } from '@/config/gameConfig';
import { mainConfig } from '@/config/mainConfig';
import { loadAssets } from './assets';

const props = defineProps<{
  openCardsCounter: number;
  isReset: boolean;
}>();

const emits = defineEmits<{
  (event: 'update:openCardsCounter', value: number): void;
  (event: 'cardOpened'): void;
}>();

let app: Application | null = null;
let resizeObserver: ResizeObserver | null = null;
const sceneRef = ref<HTMLDivElement | null>(null);

let currentPos: { x: number, y: number } = { x: 0, y: 50 };
let movingTopRight: boolean = true;

const createCard = async () => {
  if (!app) return;

  const { maskRect, maskSprite, maskTexture } = await createMaskLayer();
  const { baseContainer, baseText, baseSprite } = await createBaseLayer();
  const { coverLayer } = await createCoverLayer();
  coverLayer.mask = maskSprite;

  const updatePosition = (delta: Ticker) => {
    if (movingTopRight) {
      currentPos.x += 10 * delta.deltaTime;
      currentPos.y -= 10 * delta.deltaTime;
      if (currentPos.y < 0 || currentPos.x > gameConfig.worldWidth) {
        movingTopRight = false;
        currentPos.x += 45;
      }
    } else {
      currentPos.x -= 10 * delta.deltaTime;
      currentPos.y += 10 * delta.deltaTime;
      if (currentPos.x < 0 || currentPos.y > gameConfig.worldHeight - 50) {
        movingTopRight = true;
        currentPos.y += 45;
      }
    }
  };

  const renderMask = (masklLayer: Graphics, texture: RenderTexture) => {
    masklLayer.circle(currentPos.x, currentPos.y, 50);
    masklLayer.fill('#000000');
    app?.renderer.render({ container: masklLayer, target: texture });
  };

  const scratchAnimation = (delta: Ticker) => {
    updatePosition(delta);
    renderMask(maskRect, maskTexture);
    if (currentPos.y > gameConfig.worldHeight && 
        currentPos.x > gameConfig.worldWidth) {
      app?.ticker.remove(scratchAnimation);
      coverLayer.removeListener('pointerdown', handleOpenCard);
      emits('cardOpened');
    };
  };

  const handleOpenCard = async () => {
    emits('update:openCardsCounter', props.openCardsCounter + 1);
    if (props.openCardsCounter === 1) {
      baseText.text = mainConfig.cards.values.win;
      baseSprite.texture = Assets.get('baseLayerImgWin');
    }
    app?.ticker.add(scratchAnimation);
  };

  coverLayer.interactive = true;
  coverLayer.once('pointerdown', handleOpenCard);

  app.stage.addChild(baseContainer);
  app.stage.addChild(coverLayer);
  app.stage.addChild(maskSprite);
  app.renderer.render({ container: maskRect, target: maskTexture });
}  

const resetGame = async () => {
  app?.stage.removeChildren();
  currentPos = { x: 0, y: 50 };
  movingTopRight = true;
  await createCard();
};

watch(() => props.isReset, async () => {
  if (props.isReset) resetGame();
});

onMounted(async () => {
  app = new Application();
  const scene = sceneRef.value;

  if (!scene || !app) return;

  await loadAssets();
  await setup(app, scene);
  await createCard();

  handleResize(
    app, 
    scene.offsetWidth, scene.offsetHeight, 
    gameConfig.worldWidth, gameConfig.worldHeight
  );
  resizeObserver = new ResizeObserver(() => {
    handleResize(
      app, 
      scene.offsetWidth, scene.offsetHeight, 
      gameConfig.worldWidth, gameConfig.worldHeight
    );
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