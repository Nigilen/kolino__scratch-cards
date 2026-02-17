import { Graphics, RenderTexture, Sprite } from "pixi.js";
import { gameConfig } from '@/config/gameConfig';

export const createMaskLayer = async () => {
  const rect = new Graphics();
  rect.rect(0, 0, gameConfig.worldWidth, gameConfig.worldHeight);
  rect.fill('#ffffff');
  const texture = RenderTexture.create({ width: gameConfig.worldWidth, height: gameConfig.worldHeight });
  const sprite = Sprite.from(texture);

  return { 
    maskRect: rect, 
    maskTexture: texture, 
    maskSprite: sprite
  };
};