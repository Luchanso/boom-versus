export default class Loader extends Phaser.State {
  constructor() {
    super();
  }

  preload() {
    this.preloadFlash();
    this.preloadExpolosion();
  }

  create() {
    this.state.start('Game');
  }

  preloadExpolosion() {
    const basePath = 'assets/sprites/Explosion';
    const baseName = 'explosion';

    for (let i = 0; i < 9; i++) {
      this.load.image(`${baseName}0${i}.png`, `${basePath}/${baseName}0${i}.png`);
    }
  }

  preloadFlash() {
    const basePath = 'assets/sprites/Flash';
    const baseName = 'flash';

    for (let i = 0; i < 9; i++) {
      this.load.image(`${baseName}0${i}.png`, `${basePath}/${baseName}0${i}.png`);
    }
  }

  addProgressLabel() {
    const style = {
      font: '41px Open Sans',
      fill: '#00E676',
    }

    this.progressLabel = this.add.text(this.game.world.centerX, this.game.world.centerY, 'Loading: 0% (0/0)', style);
    this.progressLabel.anchor.setTo(0.5);
  }

  refreshProgress(progress, cacheKey, success, totalLoaded, totalFiles) {
    this.progressLabel.text = `Loading ${progress}% (${totalLoaded}/${totalFiles})`;
  }
}
