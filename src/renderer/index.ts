import { initGui } from './gui/gui'
import { initRenderer } from './core/renderer'

import { initVideoView } from './video/videoView';
import { Loader } from 'pixi.js';

export const loader = Loader.shared

initGui()

export const renderer = initRenderer()

const video = initVideoView(renderer.stage)

renderer.ticker.add((delta) => {
  video(delta)
})