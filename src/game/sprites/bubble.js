import { Physics } from "phaser";
import { scaleSprite, scaleW, scaleH, G_DIMS, W_CENTER } from '@/useWindow'

export default class Bubble extends Phaser.GameObjects.Sprite {
  constructor (scene, x, y, scale)
  {
      super(scene, x, y)
      this.scene = scene

      this.setTexture('bubble')
      this.blendMode = Phaser.BlendModes.ADD
      this.setAlpha(0.7)
      this.initPosition()
      this.setScale(scale)
      this.setPosition(x, y + this.displayHeight * 0.5)
      this.setDepth(5)
      if (scale > 0.1) {
        this.setInteractive()
        this.on('clicked', this.remove, this)
        this.setData('expire', setTimeout(() => {
            this.kill()
          }, (parseInt(Math.random() * 29) + 15) * 1000 )
        )
      } else {
        this.setData('expire', setTimeout(() => {
            this.kill()
          }, (parseInt(Math.random() * 20) + 1) * 1000 )
        )
      }
      
  }

  preUpdate (time, delta)
  {
      super.preUpdate(time, delta)

      if (this.data.values.start) {
        if (this.data.values.wobble < 0) {
          if (this.data.values.objAngle > this.data.values.toAngle) {
            this.data.values.objAngle += this.data.values.wobble
          } else {
            this.data.values.toAngle = this.setToAngle()
          }
        } else {
          if (this.data.values.objAngle < this.data.values.toAngle) {
            this.data.values.objAngle += this.data.values.wobble
          } else {
            this.data.values.toAngle = this.setToAngle()
          }
        }
        // if (angle) this.setAngle(angle)
        this.x += this.data.values.move * Math.cos(this.angleToRadian(this.data.values.objAngle))
        this.y += this.data.values.move * Math.sin(this.angleToRadian(this.data.values.objAngle))
  
        if (this.y < -this.displayHeight) {
          this.resetPosition()
        }
        this.data.values.move *= 1.02
        this.data.values.wobble *= 1.02
      } 
  }

  setToAngle () {
    let angle = parseInt(Math.random() * 44) + 1
    angle = this.data.values.wobble > 0 ? -90 - angle : -90 + angle
    this.data.values.wobble *= -1
    return angle
  }

  initPosition () {
    this.setData('wobble', Math.random() > 0.5 ? 4 * this.scale : -4 * this.scale)
    this.data.values.objAngle = -90
    this.setScale(scaleSprite(this.scale))
    this.data.values.move = 3 * (this.scale * 2)
    this.setAngle(-90)
    this.data.values.toAngle = this.setToAngle()
    this.data.values.start = true
  }

  resetPosition () {
    this.setData('wobble', Math.random() > 0.5 ? 2 * this.scale : -2 * this.scale)
    this.data.values.start = false
    this.data.values.move = 1 * (this.scale * 2)
    this.setPosition(parseInt(Math.random() * (G_DIMS.width - this.displayWidth) + this.displayWidth * 0.5), G_DIMS.height + ( this.displayHeight * 0.5))
    this.setAngle(-90)
    this.data.values.toAngle = this.setToAngle()
    this.setData('pause', setTimeout(() => {
        this.data.values.start = true
      }, parseInt(Math.random() * 400) * 10)
    )
  }

  angleToRadian (angle) {
    return angle * (Math.PI / 180)
  }

  remove () {
    clearTimeout(this.data.values.pause)
    clearTimeout(this.data.values.expire)
    this.destroy()
  }
  kill () {
    const data = {
      x: this.x,
      y: this.y,
      scale: this.scale,
      width: this.displayWidth
    }
    this.scene.bust(data)
    this.remove()
  }
}
