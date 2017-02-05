export default class Player extends Phaser.Sprite {
  constructor(game, x, y) {
    const w = 20;
    const h = 35;
    const bitmap = game.add.bitmapData(w, h);

    bitmap.ctx.beginPath();
    bitmap.ctx.fillStyle = 'white';
    bitmap.ctx.rect(0, 0, w, h);
    bitmap.ctx.fill();

    super(game, x, y, bitmap);

    this.velocityX = 0;
    this.velocityY = 0;
    this.reduceVelociteSpeed = 0.5;
  }

  update() {
    this.updateVelocity();
    this.updatePosition();
  }

  updateVelocity() {
    if (this.velocityX > this.reduceVelociteSpeed) {
      this.velocityX -= this.reduceVelociteSpeed;
    } else if (this.velocityX < -this.reduceVelociteSpeed) {
      this.velocityX += this.reduceVelociteSpeed;
    } else {
      this.velocityX = 0;
    }
    if (this.velocityY > this.velocityX) {
      this.velocityY -= this.reduceVelociteSpeed;
    } else if (this.velocityY < -this.reduceVelociteSpeed) {
      this.velocityY += this.reduceVelociteSpeed;
    } else {
      this.velocityY = 0;
    }
  }

  updatePosition() {
    this.x += this.velocityX;
    this.y += this.velocityY;
  }

  addImpulse(x, y) {
    this.velocityX += x;
    this.velocityY += y;
  }
}
