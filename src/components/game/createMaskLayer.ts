import { Application, Graphics, RenderTexture, Sprite, Container } from "pixi.js";
import { STATE } from '@/components/game/constants';

export const createMaskLayer = async (object: Container, app: Application) => {
  const rect = new Graphics();
  rect.rect(0, 0, STATE.WORLD_WIDTH, STATE.WORLD_HEIGHT);
  rect.fill('#ffffff');
  
  const texture = RenderTexture.create({ width: STATE.WORLD_WIDTH, height: STATE.WORLD_HEIGHT });
  const textureSprite = new Sprite(texture);

  object.mask = textureSprite;
  object.interactive = true;

  app.renderer.render({ container: rect, target: texture });
  return { rect, texture };
};