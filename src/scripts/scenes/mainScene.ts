import ExampleObject from '../objects/exampleObject';

export default class MainScene extends Phaser.Scene {
  private exampleObject: ExampleObject;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    let background = this.add.image(0,0,"background");
    background.setOrigin(0,0);
    let ship1 = this.add.image(400/2-50, 400/2, "ship");
    let ship2 = this.add.image(400/2, 400/2, "ship2");
    let ship3 = this.add.image(400/2+50, 400/2, "ship3");
    this.add.text(20,20,"Playing game", {font: "25px Arial", fill: "yellow"});
    this.exampleObject = new ExampleObject(this, 0, 0);
  }

  moveShip(ship, speed){
    ship.y += speed;
  }

  update() {
    this.moveShip()
  }
}
