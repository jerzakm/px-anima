import { Filter } from 'pixi.js'
import { defaultVertexShader } from './shaderDefaults';

export class EdgeDetectShader extends Filter {
  constructor() {
    super(defaultVertexShader, fragmentShader);
  }
}

const fragmentShader = `
const float radius = 8.0;
const float power_radius = radius * radius;
const int intensity_level = 5;

varying vec2 vTextureCoord;

uniform sampler2D uSampler;

uniform vec4 filterArea;

void main(void)
{
	  vec2 uv = vTextureCoord;
    int intensity_count[intensity_level];
    // cleanup
    for (int i = 0; i < intensity_level; ++i) {
        intensity_count[i] = 0;
    }

    // step 1
    // for each pixel within radius of a pixel
    for (float x = -radius; x < radius; ++x) {
        for (float y = -radius; y < radius; ++y) {
            vec2 abs_pos = vec2(x, y);
            if (power_radius < dot(abs_pos, abs_pos))
                continue;
              vec2 pos = (abs_pos / filterArea.xy) + uv;
            vec4 col_element = texture2D(uSampler, pos);
            int current_intensity = int(
                (dot(col_element, vec4(1.0, 1.0, 1.0, 0.0)) / 3.0) *
                float(intensity_level)
            );
            current_intensity = (current_intensity >= intensity_level) ?
                intensity_level - 1 :
            	current_intensity;
            for (int i = 0; i < intensity_level; ++i) {
                if (i == current_intensity) {
                    intensity_count[i] += 1;
                    break;
                }
            }
        }
    }
    // step 2
    // find the maximum intensity
    int max_level = 0;
   	float val = 0.0;
    vec4 col_out = vec4(0.0, 0.0, 0.0, 1.0);
    for (int level = 0; level < intensity_level; ++level) {
        if (intensity_count[level] > max_level) {
            max_level = intensity_count[level];
            val = float(max_level) / (3.14 * power_radius);
            float alpha = 1.0;
            if(val > 0.8) {
              alpha = 0.0;
            } else {
              val = 0.0;
            }
            col_out = vec4(val*alpha, val*alpha, val*alpha, 1.0*alpha);
        }
    }
 	// step 3
  // write the final color
	gl_FragColor = col_out;
}
`