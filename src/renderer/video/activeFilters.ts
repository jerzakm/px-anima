import { AdjustmentFilter, PixelateFilter, BloomFilter } from "pixi-filters";
import { EmptyShader } from "../shaders/EmptyShader";

export const emptyFilter = new EmptyShader()

export const videoFilters = {
  adjustment: new AdjustmentFilter(
    {
      gamma: 1.0,
      contrast: 1.0,
      saturation: 1.0,
      red: 1.0,
      green: 1.0,
      blue: 1.0,
      alpha: 1.0
    }),
  pixelate: new PixelateFilter(1),
  paletteLimiter: emptyFilter,
  edgeDetect: emptyFilter
}