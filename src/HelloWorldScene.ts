import Phaser from 'phaser'

export default class HelloWorldScene extends Phaser.Scene {
	private cursors?: Phaser.Types.Input.Keyboard.CursorKeys
	private conv1?: Phaser.GameObjects.TileSprite;
	private conv2?: Phaser.GameObjects.TileSprite;
	private arrow1?: Phaser.GameObjects.Image;

	private currDirection: number = 0;

	constructor() {
		super('hello-world')
	}

	preload() {
		this.load.image("h-conveyor", "public/assets/Horizontal Conveyor.png");
		this.load.image("v-conveyor", "public/assets/Vertical Conveyor.png");
		this.load.image("l-arrow", "public/assets/Arrow Left.png");
		this.load.image("r-arrow", "public/assets/Arrow Right.png");
		this.load.image('sky', 'assets/sky.png')
	}

	create() {
		this.add.image(400,300,'sky')

		this.cursors = this.input.keyboard.createCursorKeys()

		this.conv1 = this.add.tileSprite(240, 200, 400, 60, "h-conveyor");
		this.conv2 = this.add.tileSprite(400, 0, 60, 200, "v-conveyor");
		this.conv1.setOrigin(0,0);
    	this.conv2.setOrigin(0,0);
		this.arrow1 = this.add.image(400,248,'r-arrow')
		this.arrow1.setOrigin(0,0);
	}

	update() {
		if(!this.cursors || !this.conv1 || !this.conv2 || !this.arrow1){
			return
		}
		if(this.cursors?.left.isDown){
			this.arrow1.setTexture('l-arrow');
			this.arrow1.setOrigin(0,0);
			this.currDirection = 1;
		}
		if(this.cursors?.right.isDown){
			this.arrow1.setTexture('r-arrow');
			this.arrow1.setOrigin(0,0);
			this.currDirection = 0;
		}
		this.conv2.tilePositionY -= 1;
		if(this.currDirection === 0){
			this.conv1.tilePositionX -= 1;
		} else {
			this.conv1.tilePositionX += 1;
		}
	}
}
