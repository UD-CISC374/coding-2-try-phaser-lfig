export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  ship; 
  ship2;
  ship3;
  destroyShip;
  music;
  preload() {
    this.load.image("sky", "assets/images/sky.png");
    this.load.spritesheet("ship", "assets/images/ship.png",{
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet("ship2", "assets/images/ship2.png",{
      frameWidth: 32,
      frameHeight: 16
    });
    this.load.spritesheet("ship3", "assets/images/ship3.png",{
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("explosion", "assets/images/explosion.png",{
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet("player", "assets/images/player.png",{
      frameWidth: 16,
      frameHeight: 24
    });
    this.load.spritesheet("beam", "assets/images/beam.png",{
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml");

    this.load.audio("audio_beam", ["assets/sounds/beam.ogg", "assets/sounds/beam.mp3"]);
    this.load.audio("audio_explosion", ["assets/sounds/explosion.ogg", "assets/sounds/explosion.mp3"]);
    this.load.audio("audio_pickup", ["assets/sounds/pickup.ogg", "assets/sounds/pickup.mp3"]);
    this.load.audio("audio_beam", ["assets/sounds/sci-fi_platformer12.ogg", "assets/sounds/sci-fi_platformer.mp3"]);
    
  }

  create() {
    this.add.text(20,20,"Loading game...");
    this.scene.start('MainScene');
    this.anims.create({
      key: "ship_anim",
      frames: this.anims.generateFrameNumbers("ship", {}),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "ship2_anim",
      frames: this.anims.generateFrameNumbers("ship2", {}),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "ship3_anim",
      frames: this.anims.generateFrameNumbers("ship3", {}),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "explode",
      frames: this.anims.generateFrameNumbers("explosion", {}),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true
    });
    this.anims.create({
      key: "thrust",
      frames:this.anims.generateFrameNumbers("player", {}),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "beam_anim",
      frames:this.anims.generateFrameNumbers("beam", {}),
      frameRate: 20,
      repeat: -1
    });
  }
}
