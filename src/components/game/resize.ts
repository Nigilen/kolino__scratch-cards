import type { Application } from "pixi.js";

export const handleResize = (
  app: Application, 
  sceneWidth: number, sceneHeight: number, 
  logickalWidth: number, logicalHeight: number
) => {
  app.renderer.resize(sceneWidth, sceneHeight);
  app.stage.scale.set(sceneWidth / logickalWidth, sceneHeight / logicalHeight);
};
