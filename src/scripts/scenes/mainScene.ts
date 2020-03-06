import ExampleObject from '../objects/exampleObject';
import Beam from '../objects/beam';
import Explosion from '../objects/explosion';
import { Scene } from 'phaser';

export default class MainScene extends Phaser.Scene {
  private exampleObject: ExampleObject;

  constructor() {
    super({ key: 'MainScene' });
  }

  ship; 
  ship2;
  ship3;
  sky;
  player;
  cursorKeys;
  spacebar;
  projectiles;
  enemies;
  score;
  beamSound;
  explosionSound;
  pickupSound;
  scoreLabel;

  create() {
    this.sky = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, "sky");
    this.sky.setOrigin(0,0);
    this.ship = this.add.sprite(this.scale.width/2-50, this.scale.height/2, "ship");
    this.ship2 = this.add.sprite(this.scale.width/2, this.scale.height/2, "ship2");
    this.ship3 = this.add.sprite(this.scale.width/2+50, this.scale.height/2, "ship3");

    this.enemies = this.physics.add.group();
    this.enemies.add(this.ship);
    this.enemies.add(this.ship2);
    this.enemies.add(this.ship3);

    let maxObjects = 4;

    this.player = this.physics.add.sprite(this.scale.width/2-8,this.scale.height - 64, "player");
    this.player.play("thrust");
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.player.setCollideWorldBounds(true);
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.projectiles = this.add.group();
    this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer, undefined, this);
    this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, undefined, this);
    this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer, undefined, this);
    this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, undefined, this);
    this.exampleObject = new ExampleObject(this, 0, 0);

    let graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 1);
    graphics.beginPath();
    graphics.moveTo(0, 0);
    graphics.lineTo(this.scale.width, 0);
    graphics.lineTo(this.scale.width, 20);
    graphics.lineTo(0, 20);
    graphics.lineTo(0,0);
    graphics.closePath();
    graphics.fillPath();

    this.score = 0;
    this.scoreLabel = this.add.bitmapText(10, 5, "pixelFont", "PUNTOS", 16);

    this.beamSound = this.sound.add("audio_beam");
    this.explosionSound = this.sound.add("audio_explosion");
    this.pickupSound = this.sound.add("audio_pickup");
  }

  zeroPad(number, size){
    let stringNumber = String(number);
    while (stringNumber.length < (size || 2)){
      stringNumber = "0" + stringNumber;
    }
    return stringNumber;
  }

  hurtPlayer(player, enemy){
    this.resetShipPos(enemy);

    if (this.player.alpha < 1){
      return;
    }

    let explosion = new Explosion(this, player.x, player.y);

    player.disableBody(true,true);
    player.x = this.scale.width/2-8;
    player.y = this.scale.height - 64;

    this.time.addEvent({
      delay: 1000,
      callback: this.resetPlayer,
      callbackScope: this,
      loop: false
    });
  }

  hitEnemy(projectile, enemy){
    let explosion = new Explosion(this, enemy.x, enemy.y);

    projectile.destroy();
    this.resetShipPos(enemy);
    this.score += 15;
    let scoreFormated = this.zeroPad(this.score, 6);
    this.scoreLabel.text = "PUNTOS" + " "+  scoreFormated;
    this.explosionSound.play();
  }

  pickPowerUp(player, powerUp){
    powerUp.disableBody(true, true);
    this.pickupSound.play();
  }

  moveShip(ship, speed){
    ship.y += speed;
    if (ship.y > 400){
      this.resetShipPos(ship);
    }
  }

  resetShipPos(ship){
    ship.y = 0;
    let randomX = Phaser.Math.Between(0,400);
    ship.x = randomX;
  }

  resetPlayer(){
    let x = this.scale.width / 2 - 8;
    let y = this.scale.height + 64;
    this.player.enableBody(true, x, y, true, true);

    this.player.alpha = 0.5;

    let tween = this.tweens.add ({
      targets: this.player,
      y: this.scale.height - 64,
      ease: 'Power1',
      duration: 1500,
      repeat: 0,
      onComplete:()=> {
        this.player.alpha = 1;
      },
      callbackScope: this
    });
  }

  update() {
    this.ship.play("ship_anim");
    this.ship2.play("ship2_anim");
    this.ship3.play("ship3_anim");
    this.ship.setInteractive();
    this.ship2.setInteractive();
    this.ship3.setInteractive();
    this.input.on('gameobjectdown', this.destroyShip, this);
    this.moveShip(this.ship, 1);
    this.moveShip(this.ship2, 2);
    this.moveShip(this.ship3, 3);
    this.sky.tilePositionY -= 0.5;
    let gameSettings = {
      playerSpeed: 200,
    } 
    if (this.cursorKeys.left.isDown){
      this.player.setVelocityX(-gameSettings.playerSpeed);
    }
    else if(this.cursorKeys.right.isDown){
      this.player.setVelocityX(gameSettings.playerSpeed);
    }
    else {
      this.player.setVelocityX(0);
    }
    if (this.cursorKeys.up.isDown){
      this.player.setVelocity(-gameSettings.playerSpeed);
    }
    else if (this.cursorKeys.down.isDown){
      this.player.setVelocityY(gameSettings.playerSpeed);
    }
    else {
      this.player.setVelocityY(0);
    }
    if (Phaser.Input.Keyboard.JustDown(this.spacebar)){
      this.shootBeam();
      console.log("Fire!");
    }
    for (let i = 0; i < this.projectiles.getChildren().length; i++){
      let beam = this.projectiles.getChildren()[i];
      beam.update();
    }

    if (Phaser.Input.Keyboard.JustDown(this.spacebar)){
      if (this.player.active){
        this.shootBeam();
      }
    }
  }
  destroyShip(pointer,gameObject){
    gameObject.setTexture("explosion");
    gameObject.play("explode");
  }
  shootBeam(){
    let beam = new Beam(this);
    this.beamSound.play();
  }
}
