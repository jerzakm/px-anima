import {Graphics} from 'pixi.js'

export const makeBackgroundGrid = () => {
    const g = new Graphics()
    const gridSize = 32;
    g.beginFill(0xaaaaaa)
    for(let x = 0; x<screen.width; x+=gridSize){
        for(let y = 0; y<screen.height; y+=gridSize){
            if(
                (x%(gridSize*2) == 0 && y%(gridSize*2)==0)||
                (x%(gridSize*2) != 0 && y%(gridSize*2)!=0)
            ){
                g.drawRect(x, y, gridSize, gridSize)
                console.log(x)
            }
        }
    }
    g.endFill()

    return g
}