export default class Explosion extends Phaser.Sprite {
  constructor(game, x, y) {
    // let bitmap = game.make.bitmapData(100, 100);

    super(game, x, y);

    this.anchor.setTo(0.5);

    this.addSet();

    this.resize(1, 1);
  }

  resize(w, h) {
    this.width = w;
    this.height = h;
  }

  addSet() {
    const { rnd, make } = this.game;
    const explosionNumber = rnd.between(0, 8);
    const flashNumber = rnd.between(0, 8);

    let explosion = make.sprite(0, 0, `explosion0${explosionNumber}.png`);
    explosion.anchor.setTo(0.5);
    explosion.width = 32;
    explosion.height = 32;
    this.explosion = this.addChild(explosion);

    let flash = make.sprite(0, 0, `flash0${flashNumber}.png`);
    flash.anchor.setTo(0.5);
    flash.width = 32;
    flash.height = 32;
    flash.alpha = 0.6;
    this.flash = this.addChild(flash);

    this.rotationSpeed = {
      explosion: rnd.realInRange(-0.05, 0.05),
      flash: rnd.realInRange(-0.05, 0.05),
    }
  }

  update() {
    const { explosion, flash, rotationSpeed } = this;

    explosion.rotation += rotationSpeed.explosion;
    flash.rotation += rotationSpeed.flash;
  }

  animate() {
    const { game } = this;
    const tweenTime = 400;

    game.add.tween(this)
      .to({
        width: 400,
        height: 400,
        alpha: 0.0,
      }, tweenTime)
      .start()
      .onComplete
      .add(() => {
        this.destroy();
      });
  }
}
