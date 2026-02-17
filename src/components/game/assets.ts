import baseLayerImg from '@/assets/images/base-layer.avif';
import baseLayerImgWin from '@/assets/images/base-layer--win.avif';
import coverLayerImg from '@/assets/images/cover-layer.avif';
import { Assets } from 'pixi.js';

export const loadAssets = async () => {
  await Assets.load(assets);
  console.log('as')
};

const assets = [
  { alias: 'baseLayerImg' , src: baseLayerImg},
  { alias: 'baseLayerImgWin' , src: baseLayerImgWin},
  { alias: 'coverLayerImg' , src: coverLayerImg},
];