import type { Application } from "pixi.js";
import { STATE } from "@/components/game/constants";

export const handleResize = (app: Application, scene: HTMLDivElement) => {
  app.renderer.resize(scene.offsetWidth, scene.offsetHeight);
  app.stage.scale.set(scene.offsetWidth / STATE.WORLD_WIDTH, scene.offsetHeight / STATE.WORLD_HEIGHT);
};
