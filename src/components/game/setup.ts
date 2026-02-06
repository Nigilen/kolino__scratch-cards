import type { Application } from "pixi.js";

export const setup = async (app: Application, sceneRef: HTMLDivElement) => {
  await app.init({
    width: sceneRef.offsetWidth,
    height: sceneRef.offsetHeight,
    backgroundColor: 0xd3d3d3,
    antialias: true,
    autoDensity: true,
    resolution: window.devicePixelRatio || 1
  });
  sceneRef.appendChild(app.canvas);
}