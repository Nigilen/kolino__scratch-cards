import { Application, Graphics, RenderTexture, Sprite, Container } from "pixi.js";

export const createMaskLayer = async (object: Container, app: Application, width: number, height: number) => {
  const rect = new Graphics();
  rect.rect(0, 0, width, height);
  rect.fill('#ffffff');
  
  const texture = RenderTexture.create({ width: width, height: height });
  const textureSprite = new Sprite(texture);
  const container = new Container();
  container.addChild(textureSprite);
  app.stage.addChild(container);

  object.mask = textureSprite;
  object.interactive = true;

  app.renderer.render({ container: rect, target: texture });
  return { rect, texture };
};