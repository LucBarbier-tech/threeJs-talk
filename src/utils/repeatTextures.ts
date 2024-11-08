import { RepeatWrapping, Texture } from "three";

export const repeatTextures = (
  textures: Texture[],
  width: number,
  height: number
) => {
  textures.forEach((texture) => {
    texture.repeat.set(width, height);
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
  });
};
