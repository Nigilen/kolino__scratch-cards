import { Assets, Container, Sprite } from "pixi.js";

export const createCoverLayer = async (layerImg: string) => {
  const texture = Assets.get(layerImg);
  const sprite = Sprite.from(texture);
  const container = new Container();
  
  container.addChild(sprite);
  return container;
};