import Color = require("color")

export const hexStringToRgb = (hex: string) => {
  const c = new Color(hex)
  return { r: c.red(), g: c.green(), b: c.blue() }
}