import { AdjustmentFilter, PixelateFilter } from "pixi-filters";

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
  pixelate: new PixelateFilter(3)
}