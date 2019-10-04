import { vidSprite, videoSource } from "./videoView";
import { RenderTexture, Sprite } from "pixi.js";
import { renderer } from "..";
import { videoFilters } from "./activeFilters";
import { writeFile } from "fs";

export const videoRecordingSettings = {
  recordingFps: 12,
  recordingScale: 1,
  recordingDir: 'default'
}

export const saveFrameToImage = async () => {
  console.log(vidSprite)
  //TODO branch off for videos and images
  if (vidSprite) {
    const rt = RenderTexture.create({ width: vidSprite.width, height: vidSprite.height })
    renderer.renderer.render(vidSprite, rt);
    const sp = Sprite.from(rt)
    if (videoRecordingSettings.recordingScale == 0) {
      sp.scale.x = (1 / videoFilters.pixelate.uniforms.size[0])
      sp.scale.y = sp.scale.x
    } else {
      sp.scale.x = 1
      sp.scale.y = sp.scale.x
    }
    const b64 = renderer.renderer.extract.base64(sp)
    const base64Data = b64.replace(/^data:image\/png;base64,/, "");
    if (videoRecordingSettings.recordingDir != 'default') {
      writeFile(`${videoRecordingSettings.recordingDir}/${new Date().getTime()}.png`, base64Data, 'base64', function (err) {
        // console.log();
      });
    }
  }
}