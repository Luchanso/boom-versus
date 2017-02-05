import Player from './actors/player';
import Explosion from './actors/explosion';

export default class Game extends Phaser.State {
  constructor() {
    super();
  }

  init() {

  }

  preload() {

  }

  create() {
    this.stage.backgroundColor = 0x282c34;

    this.addPlayers();
    this.addCursor();
    this.addAnimationTimer();
  }

  update() {

  }

  render() {

  }

  handleClick(deviceButton) {
    const { event } = deviceButton;
    let explosion = this.addExplosion(event.offsetX, event.offsetY);

    explosion.animate();
  }

  addExplosion(x = 300, y = 300) {
    let explosion = new Explosion(this.game, x, y);

    this.add.existing(explosion);

    return explosion;
  }

  addPlayers() {
    this.p1 = new Player(this, 50, 50);
    this.p2 = new Player(this.game, this.game.width - 50 - this.p1.width, 50);

    this.add.existing(this.p1);
    this.add.existing(this.p2);
  }

  addCursor() {
    const { game: { input } } = this;

    input.activePointer.leftButton.onDown.add(this.handleClick, this);
  }

  addAnimationTimer() {
    const ANIMATION_DELAY = 1000;
    let animationTimer = this.time.create(false);

    animationTimer.loop(ANIMATION_DELAY, this.tickTimerAnimation, this);
    animationTimer.start();

    this.animationTimer = animationTimer;

    return animationTimer;
  }

  tickTimerAnimation() {
    const force = 20;

    if (tempFlag) {
      this.p1.addIpulse(force, force);
    } else {
      this.p1.addIpulse(-force, -force);
    }

    tempFlag = !tempFlag;
  }
}

let tempFlag = true;
