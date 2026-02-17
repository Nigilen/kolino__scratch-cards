import { Assets, Container, Sprite } from "pixi.js";

export const createCoverLayer = async () => {
  const texture = Assets.get('coverLayerImg');
  const sprite = Sprite.from(texture);
  const container = new Container();
  container.addChild(sprite);

  return { coverLayer: container };
};