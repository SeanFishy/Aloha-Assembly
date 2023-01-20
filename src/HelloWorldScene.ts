import Phaser from 'phaser'

export default class HelloWorldScene extends Phaser.Scene {

	private conveyor?: Phaser.GameObjects.TileSprite;

	constructor() {
		super('hello-world')
	}

	preload() {
		this.load.image("conveyor", "public/assets/Conveyor.png");
		this.load.image('sky', 'assets/sky.png')
	}

	create() {
		this.add.image(400,300,'sky')
		this.conveyor = this.add.tileSprite(30, 30, 60, 100, "conveyor");
    	this.conveyor.setOrigin(0,0);
	}

	update() {
		if(this.conveyor){
			this.conveyor.tilePositionX -= 4;
		}
	}
}
