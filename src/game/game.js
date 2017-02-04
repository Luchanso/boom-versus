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
    let p1 = new Player(this, 50, 50);
    let p2 = new Player(this.game, this.game.width - 50 - p1.width, 50);

    p1.addIpulse(10, 10);
    p1.addIpulse(10, 10);
    p1.addIpulse(10, 10);

    this.add.existing(p1);
    this.add.existing(p2);
  }

  addCursor() {
    const { game: { input } } = this;

    input.activePointer.leftButton.onDown.add(this.handleClick, this);
  }
}
