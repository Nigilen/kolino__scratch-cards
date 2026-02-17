import type { Application } from "pixi.js";

export const handleResize = (
  app: Application | null, 
  sceneWidth: number, sceneHeight: number, 
  logickalWidth: number, logicalHeight: number
) => {
  if (!app) return;
  app.renderer.resize(sceneWidth, sceneHeight);
  app.stage.scale.set(sceneWidth / logickalWidth, sceneHeight / logicalHeight);
};
