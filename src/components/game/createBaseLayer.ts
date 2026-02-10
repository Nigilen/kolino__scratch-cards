import { Assets, Container, Graphics, Sprite, Text } from "pixi.js";
import { STATE } from "./constants";

export const createBaseLayer = async (
  layerImg: string,
  rectFill: string, 
  textValue: string, 
  textFill: string,
  textSize: number 
): Promise<Container> => {
  const container = new Container();
  const texture = await Assets.load(layerImg);
  const sprite = new Sprite(texture);
  const rect = new Graphics();
  rect.rect(0, 0, STATE.WORLD_WIDTH, STATE.WORLD_HEIGHT);
  rect.fill(0x000000);
  rect.alpha = 0.7;
  
  const text = new Text({
    text: textValue.toUpperCase(),
    style: {
      fontFamily: "FingerPaint",
      fontSize: textSize,
      fill: textFill,
    },
    anchor: { x: 0.5, y: 0.5 },
    position: { x: STATE.WORLD_WIDTH / 2, y: STATE.WORLD_HEIGHT / 2 },
  });

  container.addChild(sprite);
  container.addChild(rect);
  container.addChild(text);

  return container;
};