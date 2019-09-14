import { Graphics } from 'pixi.js'
import { initGui } from './gui/gui'
import { initRenderer } from './core/renderer'
const style = require('./gui/style.scss')

const gui = initGui()

const r = initRenderer(gui.main)