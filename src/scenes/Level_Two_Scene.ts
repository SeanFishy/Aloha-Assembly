import Phaser from 'phaser'

export default class Level_One_Scene extends Phaser.Scene {

	private pineapple?: Phaser.Physics.Arcade.Sprite
	private mango?: Phaser.Physics.Arcade.Sprite
    private avocado?: Phaser.Physics.Arcade.Sprite
	private currentFruit?: Phaser.Physics.Arcade.Sprite

	private baskets?: Phaser.Physics.Arcade.StaticGroup
	private ifNative?: Phaser.GameObjects.Text
	private ifNotNative?: Phaser.GameObjects.Text
	private ifGreen?: Phaser.GameObjects.Text
	private ifNotGreen?: Phaser.GameObjects.Text

	constructor() {
		super('level-1')
	}

	preload() {
		this.load.image("pineapple", "assets/big_pineapple.png");
		this.load.image("mango", "assets/big_mango.png");
        this.load.image("avocado", "assets/big_avocado.png");
		this.load.image("basket", "assets/big_basket.png");
		this.load.image("factory", "assets/factory.png");
		this.load.image("vertical", "assets/vertical_conveyor.png")
		this.load.image("horizontal", "assets/horizontal_conveyor.png")
	}

	create() {
		this.add.image(400, 300, "factory")

		this.add.tileSprite(450, 100, 60, 250, "vertical");
		this.add.tileSprite(350, 250, 500, 60, "horizontal");
		this.add.tileSprite(600, 475, 60, 500, "vertical");
		this.add.tileSprite(70, 475, 60, 500, "vertical")
		this.add.tileSprite(260, 475, 60, 500, "vertical")

		this.baskets = this.physics.add.staticGroup()
		this.baskets.create(70, 550, "basket")
		this.baskets.create(260, 550, "basket")
		this.baskets.create(600, 550, "basket")

		this.ifGreen= this.add.text(165, 200, 'Is 🟢', {
			fontSize: '14px',
			color: 'black',
			backgroundColor: 'white'
		}).setOrigin(0.5)

		this.ifNotGreen= this.add.text(355, 390, 'Not 🟢', {
			fontSize: '14px',
			color: 'black',
			backgroundColor: 'white'
		}).setOrigin(0.5)

		this.ifNative = this.add.text(355, 200, 'Native', {
			fontSize: '14px',
			color: 'black',
			backgroundColor: 'white'
		}).setOrigin(0.5)

		this.ifNotNative = this.add.text(555, 200, 'Not Native', {
			fontSize: '14px',
			color: 'black',
			backgroundColor: 'white'
		}).setOrigin(0.5)

		this.currentFruit = this.physics.add.sprite(450, 150, "pineapple")
	}

	update() {
		var pineapple = this.input.keyboard.addKey('P');
		var mango = this.input.keyboard.addKey('M');
		var avocado = this.input.keyboard.addKey('A');
		if(pineapple.isDown){
			this.currentFruit?.setTexture("pineapple")
		}
		if(mango.isDown){
			this.currentFruit?.setTexture("mango")
		}
		if(avocado.isDown){
			this.currentFruit?.setTexture("avocado")
		}
	}
}