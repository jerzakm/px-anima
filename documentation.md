### Supported video formats:
- mp4
- webm
- possibly others

### (poorly) Supported image formats:
- jpg
- png
- webm
- possibly others

# Media look manipulation options (left panel)

## Color grading sliders:
Each of these is pretty self explanatory. Min value is 0, default 1, max 10.

- Red
- Green
- Blue
- Gamma
- Contrast
- Brightness
- Saturation

## Pixelizer
Slider for setting how big of an area of the media will be turned into 1 pixel. Size 10 will for example result in 10 x 10 pixel area turned into 1 pixel.

## Color palette
Includes palette editor and palette browser.

### Palette editor:
- Press orange + button to add a color
- Right click a color box to remove color
- Left click a color box to open color picker window
- If palette editor contains less than 2 colors the media file uses it's default color range.

# Media playback (center panel)

## Header
Header contains video file name and it's path. You can load a different media file with 'Load media' button.

## Media canvas
Here your media gets displayed. Not much else right now.

## Video playback slider

Video playback slider contains 3 draggable handles.

- Two of them are 'boundary' handles that allow you to set a playback range and loop the fragment of the video instead of the entire thing. Default values are 0 and video total time.
- Central handle is 'Play handle'. Drag and drop to go to a certain moment in the video.

These currently still appear for image files but dont do anything.

## Playback control buttons

Right now only:

- Play / pause : does exactly that. Toggles video playback.

## Project control buttons

- Record: goes to min playback value set by slider handles and starts saving frames as png images in the provided location.  If the output directory hasn't been provided yet, it will open a file explorer window.

- Save project - saves a json file with project settings. It only references media file and output dir location, so problems may occur if those change.

- Load project - loads a json file with project settings.

```ts
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
```

# Playback & Recording settings (right panel)

## Playback

- Media scale: evenly scales media up and down. Even if the media is outside of the display canvas, the application will still save the entire thing to file.
- Speed: video playback speed

## Recording
- Fps: how many frames to save per second of playback
- Scale: ugly solution and pretty bugged.
    - 0: the program will save 1:1 pixels but it doesnt resize the image.
    - 1: the program will save 1:PixelizerSize pixels, creating much larger, upscaled images

Recording methods and settings are definitely a priority to fix and expand on after the jam.