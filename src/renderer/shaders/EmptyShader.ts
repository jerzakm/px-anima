import { Filter } from 'pixi.js'
import { defaultVertexShader, defaultFragmentShader } from './shaderDefaults';

export class EmptyShader extends Filter {
  constructor() {
    super(defaultVertexShader, defaultFragmentShader);
  }
}