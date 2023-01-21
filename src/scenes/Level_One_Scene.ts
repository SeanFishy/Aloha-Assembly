import Phaser from 'phaser'

export default class Level_One_Scene extends Phaser.Scene {

	private cursors?: Phaser.Types.Input.Keyboard.CursorKeys
	private conv1?: Phaser.GameObjects.TileSprite;
	private conv2?: Phaser.GameObjects.TileSprite;
	private conv3?: Phaser.GameObjects.TileSprite;
	private conv4?: Phaser.GameObjects.TileSprite;
	private arrow1?: Phaser.GameObjects.Image;

	private currDirection: number = 0;

	private fruit?: Phaser.Physics.Arcade.Image

	private pinappleBasket?: Phaser.GameObjects.Image;
	private mangoBasket?: Phaser.GameObjects.Image;
	private ifYellow?: Phaser.GameObjects.Text
	private ifNotYellow?: Phaser.GameObjects.Text

	constructor() {
		super('level-1')
	}

	preload() {
		this.load.image("pineapple", "assets/pineapple.png");
		this.load.image("avocado", "assets/avocado.png");
		this.load.image("lychee", "assets/lychee.png");
		this.load.image("passionfruit", "assets/passionfruit.png");
		this.load.image("papaya", "assets/papaya.png");
		this.load.image("mango", "assets/mango.png");
		this.load.image("basket", "assets/basket.png");
		this.load.image("factory", "assets/factory.png");
		this.load.image("vertical", "assets/vertical_conveyor.png")
		this.load.image("horizontal", "assets/horizontal_conveyor.png")
		this.load.image("l-arrow", "public/assets/Arrow Left.png");
		this.load.image("r-arrow", "public/assets/Arrow Right.png");
	}

	create() {
		this.add.image(400, 300, "factory")

		this.cursors = this.input.keyboard.createCursorKeys()
		
		this.arrow1 = this.add.image(400,400,'r-arrow')

		this.conv1 = this.add.tileSprite(400, 100, 60, 500, "vertical");
		this.conv2 = this.add.tileSprite(400, 350, 500, 60, "horizontal")
		this.conv3 = this.add.tileSprite(150, 570, 60, 500, "vertical")
		this.conv4 = this.add.tileSprite(650, 570, 60, 500, "vertical")

		this.pinappleBasket = this.add.image(150, 550, "basket")
		this.mangoBasket = this.add.image(650, 550, "basket")

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

		//this.mango = this.physics.add.sprite(500, 350, "mango")
		this.fruit = this.physics.add.image(400, 100, "pineapple")
	}

	update() {
		if(!this.cursors || !this.conv1 || !this.conv2 || !this.conv3 || !this.conv4 || !this.arrow1 || !this.fruit){
			return
		}
		if(this.cursors?.left.isDown){
			this.arrow1.setTexture('l-arrow');
			this.currDirection = 1;
		}
		if(this.cursors?.right.isDown){
			this.arrow1.setTexture('r-arrow');
			this.currDirection = 0;
		}
		this.conv1.tilePositionY -= 1;
		this.conv3.tilePositionY -= 1;
		this.conv4.tilePositionY -= 1;
		if(this.currDirection === 0){
			this.conv2.tilePositionX -= 1;
		} else {
			this.conv2.tilePositionX += 1;
		}

		//Check first if the fruit is over a basket
		if(this.fruit.x === 150 && this.fruit.y === 550){
			//This is the correct basket, so this should add to the score
			return; //Make this modify the score, remove the current fruit, and send a new fruit
		} else if(this.fruit.x === 650 && this.fruit.y === 550) {
			return;
		}
		//Manually Check which conveyor the fruit is on using it's position
		if(this.fruit.x === 400 && this.fruit.y < 350){
			this.fruit.y++;
		} else if(this.fruit.x === 150){
			this.fruit.y++;
		} else if(this.fruit.x === 650){
			this.fruit.y++;
		} else {
			if(this.currDirection === 0){
				this.fruit.x++;
			} else {
				this.fruit.x--;
			}
		}
	}
}
