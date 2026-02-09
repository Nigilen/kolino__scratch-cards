import type { Application } from "pixi.js";

export const setup = async (app: Application, sceneRef: HTMLDivElement) => {
  await app.init({
    width: sceneRef.offsetWidth,
    height: sceneRef.offsetHeight,
    antialias: true,
    autoDensity: true,
    resolution: window.devicePixelRatio || 1,
    backgroundAlpha: 0,
  });
  sceneRef.appendChild(app.canvas);
}