import Phaser from 'phaser'
import BootScene from '@/game/scenes/BootScene'
import PlayScene from '@/game/scenes/PlayScene'
import { G_DIMS } from '@/useWindow'

export function launch(containerId) {
  return new Phaser.Game({
    type: Phaser.AUTO,
    width: G_DIMS.width,
    height: G_DIMS.height,
    parent: containerId,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 300 },
        debug: true
      }
    },
    scene: [BootScene, PlayScene]
  })
}

// export default launch()
// export { launch }
