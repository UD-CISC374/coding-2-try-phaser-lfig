export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.image("background", "C:\CISC 374\getting-started-with-phaser-master\getting-started-with-phaser-master\part 3 Game Objects - Images\assets\images\background.png");
    this.load.image("ship","C:\CISC 374\getting-started-with-phaser-master\getting-started-with-phaser-master\part 3 Game Objects - Images\assets\images\ship.png");
    this.load.image("ship2","C:\CISC 374\getting-started-with-phaser-master\getting-started-with-phaser-master\part 3 Game Objects - Images\assets\images\ship2.png");
    this.load.image("ship3","C:\CISC 374\getting-started-with-phaser-master\getting-started-with-phaser-master\part 3 Game Objects - Images\assets\images\ship3.png");
  }

  create() {
    this.add.text(20,20,"Loading game...");
    this.scene.start('MainScene');
  }
}
