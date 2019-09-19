import { videoFilters } from "../video/activeFilters";
import { AdjustmentOptions } from "pixi-filters";

const saveUserSettings = () => {    

    //filters
    const {brightness, contrast, alpha, gamma, red, green, blue, saturation} = videoFilters.adjustment
    const adjustmentPresets: AdjustmentOptions = {brightness, contrast, alpha, gamma, red, green, blue, saturation}

    const pixelSize = videoFilters.pixelate.uniforms.size[0]

    //playback
    //videoPath
    //videoLoop
    
}

interface IUserSettings {
    filters: {
        adjustmentPresets: AdjustmentOptions
        pixelSize: number
        colorPalette: string[]
    },
    playback: {
        playbackSpeed: number,
        min: number,
        max: number,
        scale: number
    },
    saveDir: string,
    vidDir: string,    
}