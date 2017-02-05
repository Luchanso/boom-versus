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

    this.addExplosions();
    this.addPlayers();
    this.addCursor();
  }

  update() {

  }

  render() {
    const { debug } = this.game;

    debug.text(
      'Explosions in memory: ' + this.explosions.length,
      25,
      25,
      'rgb(79, 254, 117)'
    );
  }

  addImpulse(x, y) {
    let force1 = this.calculateForceForPlayer(x, y, this.p1);
    let force2 = this.calculateForceForPlayer(x, y, this.p2);

    this.p1.addImpulse(force1.x, force1.y);
    this.p2.addImpulse(force2.x, force2.y);
  }

  calculateForceForPlayer(x, y, player) {
    const { math } = this.game;
    const distance = math.distance(x, y, player.x, player.y);
    const baseDistance = 300;
    const maxF = 10;
    let F = 0;

    if (distance < baseDistance) {
      F = maxF;
    } else {
      F = (baseDistance / distance * maxF);
    }

    const angle = math.angleBetween(x, y, player.x, player.y);

    let lx = Math.cos(angle) * F;
    let ly = Math.sin(angle) * F;

    return new Phaser.Point(lx, ly);
  }

  handleClick(deviceButton) {
    const { event } = deviceButton;

    let explosion = this.explosions.getFirstDead();

    if (!explosion) {
      explosion = new Explosion(this.game);
      this.explosions.add(explosion);
    }

    explosion.reset(event.offsetX, event.offsetY);
    explosion.animate();

    this.addImpulse(explosion.x, explosion.y);
  }

  addExplosions() {
    const explosionLength = 30;

    this.explosions = this.add.group();

    for (let i = 0; i < explosionLength; i++) {
      let explosion = new Explosion(this.game);
      explosion.kill();
      this.explosions.add(explosion);
    }
  }

  addExplosion(x = 300, y = 300) {
    let explosion = new Explosion(this.game, x, y);

    this.add.existing(explosion);

    return explosion;
  }

  addPlayers() {
    this.p1 = new Player(this, 50, 50);
    this.p2 = new Player(this.game, 300, 300);

    this.add.existing(this.p1);
    this.add.existing(this.p2);
  }

  addCursor() {
    const { game: { input } } = this;

    input.activePointer.leftButton.onDown.add(this.handleClick, this);
  }
}
