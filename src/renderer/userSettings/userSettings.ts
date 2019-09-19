import { writeFile } from "fs";
const { dialog } = require('electron').remote
import { videoFilters } from "../video/activeFilters";
import { AdjustmentOptions } from "pixi-filters";
import { RgbColor } from "../shaders/PaletteLimiterBuilder";
import { currentPalette } from "../videoSettings/colorLimiter";
import { videoPlaybackSettings, videoPath } from "../video/videoView";
import { videoRecordingSettings } from "../video/videoSaving";

export const saveUserSettings = (path: string) => {

    //filters
    const { brightness, contrast, alpha, gamma, red, green, blue, saturation } = videoFilters.adjustment
    const adjustmentPresets: AdjustmentOptions = { brightness, contrast, alpha, gamma, red, green, blue, saturation }

    const pixelSize = videoFilters.pixelate.uniforms.size[0]

    const userSettings: IUserSettings = {
        filters: {
            adjustmentPresets: adjustmentPresets,
            pixelSize: pixelSize,
            colorPalette: currentPalette
        },
        playback: {
            playbackSpeed: videoPlaybackSettings.playbackSpeed,
            min: videoPlaybackSettings.min,
            max: videoPlaybackSettings.max,
            scale: {
                x: videoPlaybackSettings.scale.x,
                y: videoPlaybackSettings.scale.y
            }
        },
        recording: {
            recordingFps: videoRecordingSettings.recordingFps,
            recordingScale: videoRecordingSettings.recordingScale,
            recordingDir: videoRecordingSettings.recordingDir
        },
        vidDir: videoPath
    }

    writeFile(path, JSON.stringify(userSettings), function (err) {
        // console.log();
    });
}

interface IUserSettings {
    filters: {
        adjustmentPresets: AdjustmentOptions
        pixelSize: number
        colorPalette: RgbColor[]
    },
    playback: {
        playbackSpeed: number,
        min: number,
        max: number,
        scale: {
            x: number,
            y: number
        }
    },
    recording: {
        recordingFps: number,
        recordingScale: number,
        recordingDir: string
    },
    vidDir: string,
}