import { Assets, Container, Graphics, Sprite, Text } from "pixi.js";
import { mainConfig } from '@/config/mainConfig';
import { gameConfig } from '@/config/gameConfig';


export const createBaseLayer = async (): Promise<{baseContainer: Container, baseText: Text, baseSprite: Sprite}> => {
  const container = new Container();
  const texture = Assets.get('baseLayerImg');
  const sprite = Sprite.from(texture);
  const rect = new Graphics();
  rect.rect(0, 0, gameConfig.worldWidth, gameConfig.worldHeight);
  rect.fill(0x000000);
  rect.alpha = 0.7;
  const text = new Text({
    text: mainConfig.cards.values.empty.toUpperCase(),
    style: {
      fontFamily: "FingerPaint",
      fontSize: 60,
      fill: '#ffffff',
    },
    anchor: { x: 0.5, y: 0.5 },
    position: { x: gameConfig.worldWidth / 2, y: gameConfig.worldHeight / 2 },
  });

  container.addChild(sprite, rect, text);

  return { baseContainer: container, baseText: text, baseSprite: sprite } ;
};