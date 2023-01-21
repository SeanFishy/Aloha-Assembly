import Phaser from 'phaser'

export default class Level_One_Scene extends Phaser.Scene {

	private pineapple?: Phaser.Physics.Arcade.Sprite
	private mango?: Phaser.Physics.Arcade.Sprite
	private currentFruit?: Phaser.Physics.Arcade.Sprite

	private baskets?: Phaser.Physics.Arcade.StaticGroup
	private ifYellow?: Phaser.GameObjects.Text
	private ifNotYellow?: Phaser.GameObjects.Text

	constructor() {
		super('level-1')
	}

	preload() {
		this.load.image("pineapple", "assets/big_pineapple.png");
		this.load.image("mango", "assets/big_mango.png");
		this.load.image("basket", "assets/big_basket.png");
		this.load.image("factory", "assets/factory.png");
		this.load.image("vertical", "assets/vertical_conveyor.png")
		this.load.image("horizontal", "assets/horizontal_conveyor.png")
	}

	create() {
		this.add.image(400, 300, "factory")

		this.add.tileSprite(400, 100, 60, 500, "vertical");
		this.add.tileSprite(400, 350, 500, 60, "horizontal")
		this.add.tileSprite(150, 570, 60, 500, "vertical")
		this.add.tileSprite(650, 570, 60, 500, "vertical")

		this.baskets = this.physics.add.staticGroup()
		this.baskets.create(150, 550, "basket")
		this.baskets.create(650, 550, "basket")

		this.ifYellow = this.add.text(275, 300, 'If Fruit is 🟡', {
			fontSize: '18px',
			color: 'black',
			backgroundColor: 'white'
		}).setOrigin(0.5)

		this.ifNotYellow = this.add.text(550, 300, 'If Fruit is not 🟡', {
			fontSize: '18px',
			color: 'black',
			backgroundColor: 'white'
		}).setOrigin(0.5)

		this.mango = this.physics.add.sprite(500, 350, "mango")
		this.currentFruit = this.pineapple= this.physics.add.sprite(400, 250, "pineapple")
	}

	update() {
		var pineapple = this.input.keyboard.addKey('P');
		var mango = this.input.keyboard.addKey('M');
		if(pineapple.isDown){
			this.currentFruit?.setTexture("pineapple")
		}
		if(mango.isDown){
			this.currentFruit?.setTexture("mango")
		}
	}
}
