import ExampleObject from '../objects/exampleObject';

export default class MainScene extends Phaser.Scene {
  private exampleObject: ExampleObject;

  constructor() {
    super({ key: 'MainScene' });
  }

  ship; 
  ship2;
  ship3;
  background;
  powerUps;
  player;
  cursorKeys;
  spacebar;
  projectiles;
  enemies;

  create() {
    this.background = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, "background");
    this.background.setOrigin(0,0);
    this.ship = this.add.sprite(this.scale.width/2-50, this.scale.height/2, "ship");
    this.ship2 = this.add.sprite(this.scale.width/2, this.scale.height/2, "ship2");
    this.ship3 = this.add.sprite(this.scale.width/2+50, this.scale.height/2, "ship3");

    this.enemies = this.physics.add.group();
    this.enemies.add(this.ship);
    this.enemies.add(this.ship2);
    this.enemies.add(this.ship3);

    this.powerUps = this.physics.add.group();
    let maxObjects = 4;
    for (let i = 0; i <= maxObjects; i++){
      let powerUp = this.physics.add.sprite(16, 16, "power-up");
      this.powerUps.add(powerUp);
      powerUp.setRandomPosition(0, 0, this.scale.width, this.scale.height);
      if (Math.random() > 0.5){
        powerUp.play("red");
      }
      else {
        powerUp.play("gray");
      }
      powerUp.setVelocity(100, 100);
      powerUp.setCollideWorldBounds(true);
      powerUp.setBounce(1);
    }

    this.player = this.physics.add.sprite(this.scale.width/2-8,this.scale.height - 64, "player");
    this.player.play("thrust");
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.player.setCollideWorldBounds(true);
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.projectiles = this.add.group();
    this.physics.add.collider(this.projectiles, this.powerUps, function(projectile, powerUp){
      projectile.destroy();
    });
    this.physics.add.overlap(this.player, this.powerUps, this.pickPowerUp);
    this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer);
    this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy);
    this.exampleObject = new ExampleObject(this, 0, 0);
  }

  pickPowerUp(player, powerUp){
    powerUp.disableBody(true, true);
  }

  hurtPlayer(player, enemy){
    this.resetShipPos(enemy);
    player.x = this.scale.width/2-8;
    player.y = this.scale.height - 64;
  }

  hitEnemy(projectile, enemy){
    projectile.destroy();
    this.resetShipPos(enemy);
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

  update() {
    this.moveShip(this.ship, 1);
    this.moveShip(this.ship2, 2);
    this.moveShip(this.ship3, 3);
    this.background.tilePositionY -= 0.5;
    let gameSettings = {
      playerSpeed: 200,
    } 
    if (this.cursorKeys.left.isDown){
      this.player.setVelocityX(-gameSettings.playerSpeed);
    }
    else if(this.cursorKeys.right.isDown){
      this.player.setVelocityX(gameSettings.playerSpeed);
    }
    if (this.cursorKeys.up.isDown){
      this.player.setVelocity(-gameSettings.playerSpeed);
    }
    else if (this.cursorKeys.down.isDown){
      this.player.setVelocityY(gameSettings.playerSpeed);
    }
    if (Phaser.Input.Keyboard.JustDown(this.spacebar)){
      this.shootBeam();
      console.log("Fire!");
    }
    for (let i = 0; i < this.projectiles.getChildren().length; i++){
      let beam = this.projectiles.getChildren()[i];
      beam.update();
    }
  }
  destroyShip(pointer,gameObject){
    gameObject.setTexture("explosion");
    gameObject.play("explode");
  }
  shootBeam(){
    let beam = new Beam(this);
  }
}
