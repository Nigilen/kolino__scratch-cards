import { Assets, Container, Graphics, Sprite, Text } from "pixi.js";

export const createBaseLayer = async (
  layerImg: string,
  textValue: string, 
  textFill: string,
  textSize: number,
  worldWidth: number,
  worldHeight: number
): Promise<{container: Container, text: Text, sprite: Sprite}> => {
  const container = new Container();
  const texture = Assets.get(layerImg);
  const sprite = Sprite.from(texture);
  const rect = new Graphics();
  rect.rect(0, 0, worldWidth, worldHeight);
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
    position: { x: worldWidth / 2, y: worldHeight / 2 },
  });

  container.addChild(sprite);
  container.addChild(rect);
  container.addChild(text);

  return { container, text, sprite } ;
};