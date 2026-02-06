import { Assets, Container, Graphics, Sprite } from "pixi.js";

export const scratchLayout = async (layoutImg: string) => {
  const texture = await Assets.load(layoutImg);
  const sprite = new Sprite(texture);
    

  
  const container = new Container();
  
  container.addChild(sprite);
  return { container, sprite };
};