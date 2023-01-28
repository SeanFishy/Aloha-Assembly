import Phaser from 'phaser'


export default class IntroScene extends Phaser.Scene {
    private backbutton?: Phaser.GameObjects.Image;
    private background?: Phaser.GameObjects.Image;
    private platforms?: Phaser.Physics.Arcade.StaticGroup
    private title?: Phaser.GameObjects.Image;
    private instructText?: Phaser.GameObjects.Text


    constructor() {
    	super('instructionsScene')
    }

    preload() {
	    this.load.image('BackgroundImage', 'assets/IntroBackground.png')
	    this.load.image('BackButton','assets/Back.png')
        this.load.image('title','assets/Title.png')
        this.load.image('ground', 'assets/BlackBox.png');
	}

    create() {
		this.background = this.add.image(400,300,'BackgroundImage')
        this.background.setAlpha(.5)
        this.title = this.add.image(400,300,'title')
    //code from LMNTor for creating buttons
    //I added the scale for the images and changed the opacity

    this.platforms = this.physics.add.staticGroup();
    
        const ground  = this.platforms.create(this.game.canvas.width/2+3, this.game.canvas.height/2+80, 'ground') as Phaser.Physics.Arcade.Sprite
        
        ground
            .setScale(2)
            .refreshBody()

        this.backbutton = this.add.image(this.game.canvas.width/2, 5*this.game.canvas.height/6+50, 'BackButton').setAlpha(1);
        this.backbutton.setScale(.10)
        //Display.Align.In.Center(this.playbutton, this.background);
        this.backbutton.setInteractive();
        this.backbutton.on("pointerover",() =>{
            this.backbutton?.setAlpha(.5);
        });
        this.backbutton.on("pointerout", ()=>{
            this.backbutton?.setAlpha(1);
        });
        this.backbutton.on("pointerup",()=>{
            this.scene.stop('instructionsScene');
            this.scene.start('IntroScene');
        });
        
    
		this.instructText = this.add.text(this.game.canvas.width-695, this.game.canvas.width/3, '  Help your character sort fruit \n  into the correct basket! Press \n  the left and right arrow keys \n   to direct the fruit to the \n   left or right path. Use the \n    if statements provided to \n   help choose the correct path \n           for the fruit.', { 
			fontSize: '30px', 
			color: '#999' 
		})
        
    }

}

