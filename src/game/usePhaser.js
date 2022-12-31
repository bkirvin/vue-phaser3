import BootScene from '@/game/scenes/BootScene'
import PlayScene from '@/game/scenes/PlayScene'
import { G_DIMS, setDesignDimensions, scaleH } from '@/useWindow'

setDesignDimensions(800, 600)

export function launch(containerId) {
  return new Phaser.Game({
    type: Phaser.AUTO,
    width: G_DIMS.width,
    height: G_DIMS.height,
    parent: containerId,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: scaleH(0) },
        debug: false
      }
    },
    scene: [BootScene, PlayScene]
  })
}
