# px-anima
Convert videos and to pixel art animations. Prince of persia style animation reference tool. Attached in the bundle you will find a few sample videos but you're meant to go out into the world and shoot your own! :)

Entry for Game Tools Hackathon [8 Bits to Infinity] made by Marcin Jerzak.

My github is a mess.
https://github.com/jerzakm/px-anima

## 2020 webapp addition
Simple image pixelizer.

## Credits:

Since it's a typescript electron project the list of dependencies is rather long.

Most notable:
- electron
- pixi.js
- color
- nouislider
- @simonwep/pickr
- electron webpack builder

I have learned a lot about shaders from this awesome website: https://www.shadertoy.com/ . I copied, used as an example, edited or was inspired by a few of the shaders. The jam build includes only a few, but I plan to finish the application and add more in the future.

Built-in color palettes come from https://lospec.com/palette-list

## Roadmap:

Things that I lacked time to do, but are within reach:

- support for other file types
- UI/UX. For real, yuck. UI/UX. Good chance to learn React/svelte.
- User color palette library
- Edge detection and drawing shader
- Colors to alpha shader
- Better file and project managament
- Improved image support
- Support for more filetypes.
- Finer video playback options
- Precise rendering video to images and then spritesheets
- Support for popular spritesheet formats
- Finer shader controlls and more options
- Option to user custom user GLSL shader
- Rendering only a chosen fragment of the video/img instead of the entire thing.
- Filter sorting

Extra:
- User accounts and online syncing
- Media display as pop-out window for multi screen display and better editing experience
- Batch jobs
- In-app pixel drawing
- Getting a full or limited color palette from image
- Color palette from texture instead of color list
- Pixelizer options (min, max, avg pixel value in area)