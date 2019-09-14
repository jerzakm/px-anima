import { initGui } from './gui/gui'
import { initRenderer } from './core/renderer'

import './gui/style.scss';


const gui = initGui()

initRenderer(gui.main)