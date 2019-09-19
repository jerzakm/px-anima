import { writeFile, readFile } from "fs";
const { dialog } = require('electron').remote
import { videoFilters } from "../video/activeFilters";
import { AdjustmentOptions } from "pixi-filters";
import { RgbColor, PaletteLimiterBuilder } from "../shaders/PaletteLimiterBuilder";
import { currentPalette, updatePalette } from "../videoSettings/colorLimiter";
import { videoPlaybackSettings, videoPath, refreshFilters, playVideo, videoSource, vidSprite } from "../video/videoView";
import { videoRecordingSettings } from "../video/videoSaving";
import { guiUpdaters, updateGuiValues } from "../gui/gui";
import { updateVideoSlider } from "../video/videoSlider";




export const saveUserSettings = (path: string) => {
    const { brightness, contrast, alpha, gamma, red, green, blue, saturation } = videoFilters.adjustment
    const adjustmentPresets: AdjustmentOptions = { brightness, contrast, alpha, gamma, red, green, blue, saturation }

    const pixelSize = videoFilters.pixelate.uniforms.size[0]

    const userSettings: IProjectSettings = {
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
        console.log(err);
    });
}

export const loadUserSettings = (path: string) => {
    readFile(path, (err, data) => {
        if (err) {
            console.log(err)
        } else if (data) {
            const userSettings: IProjectSettings = JSON.parse(data.toString())
            applyUserSettings(userSettings)
        }
    })
}

const applyUserSettings = (settings: IProjectSettings) => {

    const { brightness, contrast, alpha, gamma, red, green, blue, saturation } = settings.filters.adjustmentPresets

    videoFilters.adjustment.brightness = brightness
    videoFilters.adjustment.contrast = contrast
    videoFilters.adjustment.alpha = alpha
    videoFilters.adjustment.gamma = gamma
    videoFilters.adjustment.red = red
    videoFilters.adjustment.green = green
    videoFilters.adjustment.blue = blue
    videoFilters.adjustment.saturation = saturation
    refreshFilters()
    updateGuiValues()

    videoFilters.pixelate.uniforms.size = [settings.filters.pixelSize, settings.filters.pixelSize]
    updateGuiValues()

    updatePalette(settings.filters.colorPalette)

    videoPlaybackSettings.min = settings.playback.min
    videoPlaybackSettings.max = settings.playback.max

    videoPlaybackSettings.playbackSpeed = settings.playback.playbackSpeed

    videoPlaybackSettings.scale.x = settings.playback.scale.x
    videoPlaybackSettings.scale.y = settings.playback.scale.y

    videoRecordingSettings.recordingDir = settings.recording.recordingDir
    videoRecordingSettings.recordingFps = settings.recording.recordingFps
    videoRecordingSettings.recordingScale = settings.recording.recordingScale

    playVideo(settings.vidDir)
    updateGuiValues()
}

interface IProjectSettings {
    filters: {
        adjustmentPresets: {
            brightness: number,
            contrast: number,
            alpha: number,
            gamma: number,
            red: number,
            green: number,
            blue: number,
            saturation: number
        }
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