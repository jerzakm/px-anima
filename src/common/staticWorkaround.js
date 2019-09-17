import fs from 'fs'
import path from 'path'



export const jsReadStaticFile = (filename) => {
    /* use `path` to create the full path to our asset */
    const pathToAsset = path.join(__static, filename)
    /* use `fs` to consume the path and read our asset */
    const fileContents = fs.readFileSync(pathToAsset, 'utf8')

    return fileContents
}