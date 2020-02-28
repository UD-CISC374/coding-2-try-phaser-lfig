import ExampleObject from '../objects/exampleObject';

export default class MainScene extends Phaser.Scene {
  private exampleObject: ExampleObject;

  constructor() {
    super({ key: 'MainScene' });
  }

  ship1; 
  ship2;
  ship3;
  background;

  create() {
    this.background = this.add.tileSprite(0, 0, 400, 400, "background");
    this.background.setOrigin(0,0);
    this.ship1 = this.add.sprite(400/2-50, 400/2, "ship");
    this.ship2 = this.add.sprite(400/2, 400/2, "ship2");
    this.ship3 = this.add.sprite(400/2+50, 400/2, "ship3");
    this.anims.create({
      key: "ship1_anim",
      frames: this.anims.generateFrameNumbers("ship", {}),
      frameRate: 20,
      repeat: -1
    });
    this.add.text(20,20,"Playing game", {font: "25px Arial", fill: "yellow"});
    this.exampleObject = new ExampleObject(this, 0, 0);
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
    this.moveShip(this.ship1, 1);
    this.moveShip(this.ship2, 2);
    this.moveShip(this.ship3, 3);
    this.background.tilePositionY -= 0.5;
  }
}
