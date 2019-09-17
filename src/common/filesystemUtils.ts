import { jsReadStaticFile } from './staticWorkaround'

export const readStaticFile = (filename: string) => {
  const contents = jsReadStaticFile(filename)
  return contents
}