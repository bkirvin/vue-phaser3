const windo = function () {
  return window
}

export const G_WIDTH = windo().innerWidth
export const G_HEIGHT = windo().innerWidth
export const W_CENTER = windo().innerWidth * 0.5
export const H_CENTER = windo().innerHeight * 0.5
export const G_DIMS = {
  width: windo().innerWidth,
  height: windo().innerHeight
}
export const G_CENTER = {
  width: windo().innerWidth * 0.5,
  height: windo().innerHeight * 0.5
}

export default windo