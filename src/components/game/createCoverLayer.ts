import { Assets, Container, Sprite } from "pixi.js";

export const createCoverLayer = async (layerImg: string) => {
  const texture = await Assets.load(layerImg);
  const sprite = new Sprite(texture);
  const container = new Container();
  
  container.addChild(sprite);
  return container;
};