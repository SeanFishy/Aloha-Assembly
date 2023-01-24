import Phaser from 'phaser'


export default class MapScene extends Phaser.Scene {
    private level1Button?: Phaser.GameObjects.Image;
    private background?: Phaser.GameObjects.Image;

    constructor() {
    	super('MapScene')
    }

    preload() {
	    this.load.image('MapImage', 'assets/hawaiiPixelMap.jpg')
	    this.load.image('LevelButton','assets/levelButton.png')
	}

    create() {
		this.background = this.add.image(400,300,'MapImage')
        //this.background.setAlpha(.8)
    //code from LMNTor for creating buttons
    //I added the scale for the images and changed the opacity
        this.level1Button = this.add.image(650, 400, 'LevelButton').setAlpha(1);
        //this.playbutton.setScale(.25)
        //Display.Align.In.Center(this.playbutton, this.background);
        this.level1Button.setInteractive();
        this.level1Button.on("pointerover",() =>{
            this.level1Button?.setAlpha(.5);
        });
        this.level1Button.on("pointerout", ()=>{
            this.level1Button?.setAlpha(1);
        });
        this.level1Button.on("pointerup",()=>{
            this.scene.stop('MapScene');
            this.scene.start('level-1');
        });
    }

}

