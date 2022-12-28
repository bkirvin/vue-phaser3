import { G_DIMS, G_CENTER } from '@/useWindow'
import { Scene } from 'phaser'


export default class PlayScene extends Scene {
  constructor () {
    super({ key: 'PlayScene' })
  }


  create () {

    const sky = this.add.image(G_CENTER.width, G_CENTER.height, 'sky')
    sky.displayWidth = G_DIMS.width
    sky.displayHeight = G_DIMS.height

    this.bomb = this.physics.add.image(G_CENTER.width, G_CENTER.height, 'bomb')
    this.bomb.setCollideWorldBounds(true)
    this.bomb.body.onWorldBounds = true // enable worldbounds collision event
    this.bomb.setBounce(1)
    this.bomb.setVelocity(200, 20)

    this.sound.add('thud')
    this.physics.world.on('worldbounds', () => {
      this.sound.play('thud', { volume: 0.75 })
    })
  }

  update () {
  }
}
