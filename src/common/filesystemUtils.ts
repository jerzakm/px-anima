// import { jsReadStaticFile } from './staticWorkaround'
const sUtil = require('./staticWorkaround')

export const readStaticFile = (filename: string) => {
  const contents = sUtil.jsReadStaticFile(filename)
  return contents
}