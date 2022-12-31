const useWindo = function (method) {
  if (method) {
    if (window[method]) return window[method]
    return undefined
  } else {
    return window
  }
}

let O_WIDTH
let O_HEIGHT

export const G_WIDTH = useWindo('innerWidth') % 2 === 0 ? useWindo('innerWidth') : useWindo('innerWidth') + 1
export const G_HEIGHT = useWindo('innerHeight') % 2 === 0 ? useWindo('innerHeight') : useWindo('innerHeight') + 1
export const W_CENTER = parseInt(useWindo('innerWidth') * 0.5)
export const H_CENTER = parseInt(useWindo('innerHeight') * 0.5)

export const G_DIMS = {
  width: G_WIDTH,
  height: G_HEIGHT
}
export const G_CENTER = {
  width: W_CENTER,
  height: H_CENTER
}

export const setDesignDimensions = function (w, h) {
  O_WIDTH = w
  O_HEIGHT = h
}

export const scaleW = function (w) {
  return w *= O_WIDTH ? G_WIDTH / O_WIDTH : 1
}

export const scaleH = function (h) {
  return h *= O_HEIGHT ? G_HEIGHT / O_HEIGHT : 1
}

export const scaleSprite = function (scale) {
  const W_SCALE = G_WIDTH / O_WIDTH
  const H_SCALE = G_HEIGHT / O_HEIGHT

  return scale *= (W_SCALE + H_SCALE) * 0.5
}

export default useWindo
