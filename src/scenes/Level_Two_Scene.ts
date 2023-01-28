import Phaser from 'phaser'

export default class Level_Two_Scene extends Phaser.Scene {

	private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
	private conv_vertical1?: Phaser.GameObjects.TileSprite;
	private conv_vertical2?: Phaser.GameObjects.TileSprite;
	private conv_vertical3?: Phaser.GameObjects.TileSprite;
	private conv_vertical4?: Phaser.GameObjects.TileSprite;
	private conv_vertical5?: Phaser.GameObjects.TileSprite;
	private conv_horizontal1?: Phaser.GameObjects.TileSprite;
	private conv_horizontal2?: Phaser.GameObjects.TileSprite;
	private arrow1?: Phaser.GameObjects.Image;
	private arrow2?: Phaser.GameObjects.Image;

	private currDirection: number = 0;
	private speed: number = 1
	private speedText?: Phaser.GameObjects.Text

	private scoreText?: Phaser.GameObjects.Text
	private score: number = 0

	private fruit?: Phaser.Physics.Arcade.Image
	private currentFruitName?: String

	private baskets?: Phaser.Physics.Arcade.StaticGroup
	private ifBerry?: Phaser.GameObjects.Text
	private ifNotBerry?: Phaser.GameObjects.Text
	private ifOrange?: Phaser.GameObjects.Text
	private ifNotOrange?: Phaser.GameObjects.Text

	private finishText?: Phaser.GameObjects.Text

	private backButton?: Phaser.GameObjects.Image;

	private fruitIntro?: Phaser.GameObjects.Image;
	private closeButton?: Phaser.GameObjects.Image;
	private pauseButton?: Phaser.GameObjects.Image;
	private resumeButton?: Phaser.GameObjects.Image;
	
	private aboutButton?: Phaser.GameObjects.Image;
	private openInfo?: Phaser.GameObjects.Image;
	private infoBox: boolean = true;

	constructor() {
		super('level-2')
	}

	preload() {
		this.load.image("pineapple", "assets/pineapple.png");
		this.load.image("mango", "assets/mango.png");
        this.load.image("avocado", "assets/avocado.png");
		this.load.image("lychee", "assets/lychee.png");
		this.load.image("papaya", "assets/papaya.png");
        this.load.image("passionfruit", "assets/passionfruit.png");
		this.load.image("basket", "assets/basket.png");
		this.load.image("factory", "assets/factory.png");
		this.load.image("vertical", "assets/vertical_conveyor.png")
		this.load.image("horizontal", "assets/horizontal_conveyor.png")
		this.load.image("l-arrow", "public/assets/Arrow Left.png");
		this.load.image("r-arrow", "public/assets/Arrow Right.png");
		this.load.image('modal-bg', 'assets/modal.png');
		this.load.image('pause-button', 'assets/PauseButton.png');
		this.load.image('resume-button', 'assets/ResumeButton.png');
		this.load.image('back-button', 'public/assets/Back.png');
		this.load.image('close-button', 'public/assets/close.png');
		this.load.image('fruit-intro', 'assets/emptyDescription.png');
		this.load.image('about-button', 'assets/aboutButton.png');
	}

	create() {
		this.infoBox = true;

		this.add.image(400, 300, "factory")

		this.conv_vertical1 = this.add.tileSprite(450, 100, 60, 250, "vertical");
		this.conv_horizontal1 = this.add.tileSprite(450, 250, 450, 60, "horizontal");
		this.conv_vertical2 = this.add.tileSprite(650, 475, 60, 500, "vertical");
		this.conv_vertical3 = this.add.tileSprite(250, 350, 60, 250, "vertical");
		this.conv_horizontal2 = this.add.tileSprite(250, 450, 350, 60, "horizontal");
		this.conv_vertical4 = this.add.tileSprite(100, 525, 60, 200, "vertical");
		this.conv_vertical5 = this.add.tileSprite(400, 525, 60, 200, "vertical");

		this.cursors = this.input.keyboard.createCursorKeys()
		this.arrow1 = this.add.image(450, 300,'r-arrow');
		this.arrow2 = this.add.image(250, 500,'r-arrow')

		this.baskets = this.physics.add.staticGroup()
		this.baskets.create(100, 550, "basket")
		this.baskets.create(400, 550, "basket")
		this.baskets.create(650, 550, "basket")

		this.ifOrange = this.add.text(165, 390, 'Is 🟠', {
			fontSize: '14px',
			color: 'black',
			backgroundColor: 'white'
		}).setOrigin(0.5)

		this.ifNotOrange= this.add.text(355, 390, 'Not 🟠', {
			fontSize: '14px',
			color: 'black',
			backgroundColor: 'white'
		}).setOrigin(0.5)

		this.ifBerry = this.add.text(555, 200, 'Berry', {
			fontSize: '14px',
			color: 'black',
			backgroundColor: 'white'
		}).setOrigin(0.5)

		this.ifNotBerry = this.add.text(355, 200, 'Not a Berry', {
			fontSize: '14px',
			color: 'black',
			backgroundColor: 'white'
		}).setOrigin(0.5)

		this.fruit = this.physics.add.image(450, 150, "pineapple")
		this.currentFruitName = "pineapple"

		this.scoreText = this.add.text(700, 30, 'Score: '+this.score, {
			fontSize: '25px',
			color: 'black',
			backgroundColor: 'white'
		}).setOrigin(0.5);

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
			this.infoBox = false
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

		if(this.openInfo && this.finishText && this.ifBerry && this.ifNotBerry && this.ifNotOrange && this.ifOrange) {}
	}

	update() {
		if(this.infoBox){
			return
		}
		if(!this.cursors || !this.conv_vertical1 || !this.conv_vertical2 || !this.conv_vertical3 
			|| !this.conv_vertical4 || !this.conv_vertical5 ||
			!this.conv_horizontal1 || !this.conv_horizontal2 || !this.fruit){
			return
		}
		if(this.cursors?.left.isDown){
			this.arrow1?.setTexture('l-arrow');
			this.arrow2?.setTexture('l-arrow');
			this.currDirection = 1;
		}
		if(this.cursors?.right.isDown){
			this.arrow1?.setTexture('r-arrow');
			this.arrow2?.setTexture('r-arrow');
			this.currDirection = 0;
		}
		this.conv_vertical1.tilePositionY -= this.speed;
		this.conv_vertical2.tilePositionY -= this.speed;
		this.conv_vertical3.tilePositionY -= this.speed;
		this.conv_vertical4.tilePositionY -= this.speed;
		this.conv_vertical5.tilePositionY -= this.speed;
		if(this.currDirection === 0){
			this.conv_horizontal1.tilePositionX -= this.speed;
			this.conv_horizontal2.tilePositionX -= this.speed;
		} else {
			this.conv_horizontal1.tilePositionX += this.speed;
			this.conv_horizontal2.tilePositionX += this.speed;
		}

		if(this.fruit.y < 250 || this.fruit.x == 650 || 
			(this.fruit.x == 100 && this.fruit.y >= 450) || 
			(this.fruit.x == 250 && this.fruit.y < 450) || 
			(this.fruit.x == 400 && this.fruit.y >= 450)){
			this.fruit.y += this.speed;
		} else {
			if(this.currDirection === 0){
				this.fruit.x += this.speed;
			} else {
				this.fruit.x -= this.speed;
			}
		}

		//Prevent fruit From flying off first horizontal conveyor belt
		if(this.fruit.y >= 250 && this.fruit.y < 450){
			if(this.fruit.x < 250){
				this.fruit.x = 250;
			}
			else if(this.fruit.x > 650){
				this.fruit.x = 650;
			}
		}

		//Prevent fruit From flying off second horizontal conveyor belt
		if(this.fruit.y >= 450){
			if(this.fruit.x < 100){
				this.fruit.x = 100;
			}
			else if(this.fruit.x > 400 && this.fruit.x < 650){
				this.fruit.x = 400;
			}
		}

		//Reset fruit and update score
		if(this.fruit.y >= 570){
			if((this.fruit.x == 100 && (this.currentFruitName == "mango" 
			|| this.currentFruitName == "papaya")) || 
			this.fruit.x == 400 && (this.currentFruitName == "pineapple" 
			|| this.currentFruitName == "lychee") || 
			this.fruit.x == 650 && (this.currentFruitName == "passionfruit" 
			|| this.currentFruitName == "avocado")){
				this.fruit.x = 450;
				this.fruit.y = 100;
				this.newFruit();
				this.score += 100;
			}
			else if(this.currentFruitName == "mango" 
			|| this.currentFruitName == "papaya"){
				if(this.fruit.x == 400){
					this.fruit.x = 250;
					this.fruit.y = 450;	
				}
				else{
					this.fruit.x = 450;
					this.fruit.y = 100;
				}
				this.score -= 50;
			}

			else if(this.currentFruitName == "pineapple" 
			|| this.currentFruitName == "lychee"){
				if(this.fruit.x == 100){
					this.fruit.x = 250;
					this.fruit.y = 450;	
				}
				else{
					this.fruit.x = 450;
					this.fruit.y = 100;
				}
				this.score -= 50;
			}

			else{
				this.fruit.x = 450;
				this.fruit.y = 100;
				this.score -= 50;
			}
		}
		this.scoreText?.setText(`Score: ${this.score}`)
	}

	newFruit(){
		let newFruitIndex = Math.floor(Math.random() * 6)
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
		else if(newFruitIndex == 3){
			this.currentFruitName = "passionfruit"
			this.fruit?.setTexture("passionfruit")
		}
		else if(newFruitIndex == 4){
			this.currentFruitName = "papaya"
			this.fruit?.setTexture("papaya")
		}
		else{
			this.currentFruitName = "avocado"
			this.fruit?.setTexture("avocado")
		}
	}
}