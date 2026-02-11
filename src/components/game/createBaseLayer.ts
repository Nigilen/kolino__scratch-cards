import { Assets, Container, Graphics, Sprite, Text } from "pixi.js";
import { gameConfig } from "@/config/gameConfig";

export const createBaseLayer = async (
  layerImg: string,
  textValue: string, 
  textFill: string,
  textSize: number 
): Promise<{container: Container, text: Text, sprite: Sprite}> => {
  const container = new Container();
  const texture = await Assets.load(layerImg);
  const sprite = new Sprite(texture);
  const rect = new Graphics();
  rect.rect(0, 0, gameConfig.worldWidth, gameConfig.worldHeight);
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
    position: { x: gameConfig.worldWidth / 2, y: gameConfig.worldHeight / 2 },
  });

  container.addChild(sprite);
  container.addChild(rect);
  container.addChild(text);

  return { container, text, sprite } ;
};