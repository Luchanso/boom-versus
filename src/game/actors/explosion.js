export default class Explosion extends Phaser.Sprite {
  constructor(game, x = 0, y = 0) {
    const radius = 100;
    const bitmap = game.add.bitmapData(radius * 2, radius * 2);
    const { ctx } = bitmap;
    const greenComponent = 175 + game.rnd.between(-50, 0);

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
    const timeCreate = 800 + game.rnd.between(-50, 200);
    const timeWave = 500 + game.rnd.between(-50, 50);
    const maxSize = 400 + game.rnd.between(-100, 100);
    const createSize = 50;
    const waveSize = 800;

    this.width = 10;
    this.height = 10;
    this.alpha = 0;

    game.add.tween(this)
      .to({
        width: createSize,
        height: createSize,
        alpha: 0.8
      }, timeCreate, Phaser.Easing.Cubic.Out)
      .to({
        width: waveSize,
        height: waveSize,
        alpha: 0,
      }, timeWave)
      .start()
      .onComplete
      .add(() => {
        this.destroy();
      });
  }
}
