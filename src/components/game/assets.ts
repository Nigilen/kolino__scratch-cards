import baseLayerImg from '@/assets/images/base-layer.webp';
import baseLayerImgWin from '@/assets/images/base-layer--win.webp';
import coverLayerImg from '@/assets/images/cover-layer.webp';
import { Assets, Texture } from 'pixi.js';

export const loadAssets = async () => {
  await Assets.load<Texture>([
    { alias: 'baseLayerImg' , src: baseLayerImg},
    { alias: 'baseLayerImgWin' , src: baseLayerImgWin},
    { alias: 'coverLayerImg' , src: coverLayerImg},
  ]);
};