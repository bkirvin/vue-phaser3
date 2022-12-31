import { Scene } from 'phaser'

export default class BootScene extends Scene {
  constructor () {
    super({ key: 'BootScene' })
  }

  preload () {
    this.load.image('sky', './img/sky.png')
    this.load.image('bubble', './img/bubble.png')
  }

  create () {
    this.scene.start('PlayScene')
  }
}
