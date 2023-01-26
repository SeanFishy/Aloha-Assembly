import Phaser from 'phaser'
import MapScene from './mapScene';

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

	private currentFruitName?: String

	private scoreText?: Phaser.GameObjects.Text
	private score: number = 0

	private finishText?: Phaser.GameObjects.Text

	private backButton?: Phaser.GameObjects.Image;

	private fruitIntro?: Phaser.GameObjects.Image;
	private closeButton?: Phaser.GameObjects.Image;
	private openInfo?: Phaser.GameObjects.Image;
	private infoBox: boolean = true;

	private speed: number = 1
	private speedText?: Phaser.GameObjects.Text

	private aboutButton?: Phaser.GameObjects.Image;

	private pauseButton?: Phaser.GameObjects.Image;
	private resumeButton?: Phaser.GameObjects.Image;

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
		this.load.image('modal-bg', 'assets/modal.png');
		this.load.image('back-button', 'public/assets/Back.png');
		this.load.image('close-button', 'public/assets/close.png');
		this.load.image('fruit-intro', 'assets/emptyDescription.png');
		this.load.image('about-button', 'assets/aboutButton.png');
		this.load.image('pause-button', 'assets/PauseButton.png');
		this.load.image('resume-button', 'assets/ResumeButton.png');
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

		this.scoreText = this.add.text(700, 30, 'Score: '+this.score, {
			fontSize: '25px',
			color: 'black',
			backgroundColor: 'white'
		}).setOrigin(0.5)

		this.fruit = this.physics.add.image(400, 100, "mango")

		this.currentFruitName = "mango"

		this.backButton = this.add.image(50,40, 'back-button').setAlpha(1);
        this.backButton.setScale(.25)
        this.backButton.setInteractive();
        this.backButton.on("pointerover",() =>{
            this.backButton?.setAlpha(.5);
        });
        this.backButton.on("pointerout", ()=>{
            this.backButton?.setAlpha(1);
        });
        this.backButton.on("pointerup",()=>{
            this.scene.stop('level-1');
            this.scene.start('MapScene');
        });
		this.fruitIntro = this.add.image(400,300,'fruit-intro')
		this.infoBox = true;
		this.closeButton = this.add.image(400,470, 'close-button').setAlpha(1);
        this.closeButton.setScale(.08)
        this.closeButton.setInteractive();
        this.closeButton.on("pointerover",() =>{
            this.closeButton?.setAlpha(.5);
        });
        this.closeButton.on("pointerout", ()=>{
            this.closeButton?.setAlpha(1);
        });
        this.closeButton.on("pointerup",()=>{
			if(this.fruitIntro && this.closeButton){
            	this.fruitIntro.visible = false
				this.closeButton.visible = false
			}
			if(this.resumeButton && this.resumeButton.visible === false){
				this.infoBox = false
			}
        });

		this.speedText = this.add.text(700, 70, 'Speed: '+this.speed, {
			fontSize: '25px',
			color: 'black',
			backgroundColor: 'blue'
		}).setOrigin(0.5)
		this.speedText.setInteractive();
        this.speedText.on("pointerover",() =>{
            this.speedText?.setAlpha(.5);
        });
        this.speedText.on("pointerout", ()=>{
            this.speedText?.setAlpha(1);
        });
        this.speedText.on("pointerup",()=>{
			if(this.speed >= 4){
				this.speed = 1
			} else {
            	this.speed += 1
			}
			this.speedText?.setText('Speed: '+this.speed)
        });
		this.aboutButton = this.add.image(150,40, 'about-button').setAlpha(1);
        this.aboutButton.setScale(.3)
        this.aboutButton.setInteractive();
        this.aboutButton.on("pointerover",() =>{
            this.aboutButton?.setAlpha(.5);
        });
        this.aboutButton.on("pointerout", ()=>{
            this.aboutButton?.setAlpha(1);
        });
        this.aboutButton.on("pointerup",()=>{
            if(this.fruitIntro && this.closeButton){
            	this.fruitIntro.visible = true
				this.closeButton.visible = true
			}
			this.infoBox = true
        });

		this.pauseButton = this.add.image(250,35, 'pause-button').setAlpha(1);
        this.pauseButton.setScale(.3)
        this.pauseButton.setInteractive();
        this.pauseButton.on("pointerover",() =>{
            this.pauseButton?.setAlpha(.5);
        });
        this.pauseButton.on("pointerout", ()=>{
            this.pauseButton?.setAlpha(1);
        });
        this.pauseButton.on("pointerup",()=>{
			if(this.fruitIntro?.visible === false){
				if(this.pauseButton && this.resumeButton){
					this.pauseButton.visible = false;
					this.resumeButton.visible = true;
				}
				this.infoBox = !this.infoBox;
			}
        });
		this.resumeButton = this.add.image(250,35, 'resume-button').setAlpha(1);
        this.resumeButton.setScale(0.05)
        this.resumeButton.setInteractive();
        this.resumeButton.on("pointerover",() =>{
            this.resumeButton?.setAlpha(.5);
        });
        this.resumeButton.on("pointerout", ()=>{
            this.resumeButton?.setAlpha(1);
        });
        this.resumeButton.on("pointerup",()=>{
			if(this.fruitIntro?.visible === false){
				if(this.pauseButton && this.resumeButton){
					this.pauseButton.visible = true;
					this.resumeButton.visible = false;
				}
				this.infoBox = !this.infoBox;
			}
        });
		this.resumeButton.visible = false;
	}

	update() {
		if(!this.cursors || !this.conv1 || !this.conv2 || !this.conv3 || !this.conv4 || !this.arrow1 || !this.fruit){
			return
		}
		if(this.infoBox){
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
		this.conv1.tilePositionY -= this.speed;
		this.conv3.tilePositionY -= this.speed;
		this.conv4.tilePositionY -= this.speed;
		if(this.currDirection === 0){
			this.conv2.tilePositionX -= this.speed;
		} else {
			this.conv2.tilePositionX += this.speed;
		}

		//Check first if the fruit is over a basket
		if(this.fruit.x === 150 && this.fruit.y >= 550){
			if(this.currentFruitName === "pineapple"){
				this.fruit.x = 400;
				this.fruit.y = 100;
				this.newFruit();
				this.score += 100
			}
			else{
				this.fruit.x = 400;
				this.fruit.y = 350;
				if(this.score > 0){
					this.score -= 50
				}
			}
		} else if(this.fruit.x === 650 && this.fruit.y >= 550) {
			if(this.currentFruitName !== "pineapple"){
				this.fruit.x = 400;
				this.fruit.y = 100;
				this.newFruit();
				this.score += 100
			}
			else{
				this.fruit.x = 400;
				this.fruit.y = 350;
				if(this.score > 0){
					this.score -= 50
				}
			}
		}
		this.scoreText?.setText(`Score: ${this.score}`)
		//Manually Check which conveyor the fruit is on using it's position
		if(this.fruit.x === 400 && this.fruit.y < 350){
			this.fruit.y += this.speed;
		} else if(this.fruit.x <= 150){
			if(this.fruit.x < 150){
				this.fruit.x = 150
			}
			this.fruit.y += this.speed;
		} else if(this.fruit.x >= 650){
			if(this.fruit.x > 650){
				this.fruit.x = 650
			}
			this.fruit.y += this.speed;
		} else {
			if(this.currDirection === 0){
				this.fruit.x += this.speed;
			} else {
				this.fruit.x -= this.speed;
			}
		}
		if(this.score >= 1000 && !this.finishText) {
			this.finishText = this.add.text(150, 150, 'Level Completed!\n\nLevel 2 Unlocked', {
				fontSize: '20px',
				color: 'black',
				backgroundColor: 'white'
			}).setOrigin(0.5)
			MapScene.level1Complete = true;
		}
	}

	newFruit(){
		let newFruitIndex = Math.floor(Math.random() * 4)
		if(newFruitIndex == 0){
			this.currentFruitName = "pineapple"
			this.fruit?.setTexture("pineapple")
		}
		else if(newFruitIndex == 1){
			this.currentFruitName = "mango"
			this.fruit?.setTexture("mango")
		}
		else if(newFruitIndex == 2){
			this.currentFruitName = "lychee"
			this.fruit?.setTexture("lychee")
		}
		else{
			this.currentFruitName = "avocado"
			this.fruit?.setTexture("avocado")
		}
	}
}
