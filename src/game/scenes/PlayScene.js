import { G_DIMS, G_CENTER, scaleSprite, scaleW, scaleH } from '@/useWindow'
import { Scene } from 'phaser'
import Bubble from '@/game/sprites/bubble'

export default class PlayScene extends Scene {
  constructor () {
    super({ key: 'PlayScene' })
  }


  create () {

    // const bomb = this.physics.add.image(G_CENTER.width, G_CENTER.height, 'bomb')
    // bomb.setCollideWorldBounds(true)
    // bomb.body.onWorldBounds = true // enable worldbounds collision event
    // bomb.setBounce(1)
    // bomb.setVelocity(scaleW(200), scaleH(20))
    // bomb.setScale(scaleSprite(bomb.scale))
    this.scale.lockOrientation(Phaser.Scale.LANDSCAPE)
    this.input.on('gameobjectup', function (pointer, gameObject) {
      this.burst(pointer.x, pointer.y, gameObject.scale, gameObject.displayWidth)
      gameObject.emit('clicked', gameObject)
    }, this)

    window.addEventListener('onresize', this.reload)
    
    // this.sound.add('thud')
    // this.physics.world.on('worldbounds', () => {
    //   this.sound.play('thud', { volume: 0.75 })
    // })
  }

  update () {
    if (this.children.length < 2) this.start()
  }

  burst (x, y, scale, width) {
    if (scale > 0.1) {
      let reduce = 0.5
      let rndm = scale * 100
      const range = parseInt(width * 0.1)
      for (let b = 10; b >= 0; b--) {
        setTimeout(() => {
          const newScale = ((parseInt(Math.random() * rndm) + 5) / 100) * reduce
          const newX = parseInt(Math.random() * range * 2) - range
          const newY = parseInt(Math.random() * range * 2) - range
          this.add.existing(new Bubble(this, x + newX, y + newY, newScale))
          if (newScale > 0.05) return this.burst(x, y, newScale, width)
        }, b * 10)
      }
    }
  }

  start () {
    if (!this.sky) {
      this.sky = this.add.image(G_CENTER.width, G_CENTER.height, 'sky')
      this.sky.displayWidth = G_DIMS.width
      this.sky.displayHeight = G_DIMS.height
    }
    this.sky.setDepth(0)
    this.add.existing(new Bubble(this, G_CENTER.width, G_DIMS.height, 1))
  }

  bust (data) {
    if (data.scale > 0.1) {
      let rndm = data.scale * 100
      const range = data.width * 0.3
      for (let b = 3; b >= 0; b--) {
        setTimeout(() => {
          const newScale = ((parseInt(Math.random() * rndm) + 1) / 100) * 0.5
          const newX = parseInt(Math.random() * range * 2) - range
          const newY = parseInt(Math.random() * range * 2) - range
          this.add.existing(new Bubble(this, data.x + newX, data.y + newY, newScale))
          const newData = {
            x: data.x,
            y: data.y,
            width: data.width,
            scale: newScale
          }
          if (newScale > 0.05) return this.bust(newData)
        }, b * 10)
      }
    }
  }

  reFresh () {
    location.reload()
  }
}
