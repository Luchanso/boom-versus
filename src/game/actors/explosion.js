export default class Explosion extends Phaser.Sprite {
  constructor(game, x, y) {
    const radius = 100;
    const bitmap = game.add.bitmapData(radius * 2, radius * 2);
    const { ctx } = bitmap;
    const greenComponent = 200 + game.rnd.between(-50, 0);

    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'white';
    ctx.arc(radius, radius, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    super(game, x, y, bitmap);

    this.anchor.setTo(0.5);
    this.tint = Phaser.Color.getColor(255, greenComponent, 87);

    this.alpha = 0.2;
  }

  animate() {
    const { game } = this;
    const tweenTime = 250 + game.rnd.between(-50, 200);
    const maxSize = 400 + game.rnd.between(-100, 100);

    this.width = 10;
    this.height = 10;
    this.alpha = 0.1;

    game.add.tween(this)
      .to({
        width: maxSize,
        height: maxSize,
        alpha: 0.5,
      }, tweenTime)
      .to({
        width: 0,
        height: 0,
        alpha: 0,
      }, tweenTime)
      .start()
      .onComplete
      .add(() => {
        this.destroy();
      });
  }
}
