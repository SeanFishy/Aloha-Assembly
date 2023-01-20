import Phaser from 'phaser'

export default class HelloWorldScene extends Phaser.Scene {

	private conveyor?: Phaser.GameObjects.TileSprite;

	constructor() {
		super('hello-world')
	}

	preload() {
		this.load.image("h-conveyor", "public/assets/Horizontal Conveyor.png");
		this.load.image("v-conveyor", "public/assets/Vertical Conveyor.png");
		this.load.image('sky', 'assets/sky.png')
	}

	create() {
		this.add.image(400,300,'sky')
		this.conveyor = this.add.tileSprite(60, 30, 60, 300, "v-conveyor");
    	this.conveyor.setOrigin(0,0);
	}

	update() {
		if(this.conveyor){
			this.conveyor.tilePositionY -= 4;
		}
	}
}
