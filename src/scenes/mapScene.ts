import Phaser from 'phaser'


export default class MapScene extends Phaser.Scene {
    private level1Button?: Phaser.GameObjects.Image;
    private level2Button?: Phaser.GameObjects.Image;
    private background?: Phaser.GameObjects.Image;
	static level1Complete: boolean = false;
    static level2Complete: boolean = false;
    private backButton?: Phaser.GameObjects.Image;

    constructor() {
    	super('MapScene')
    }

    preload() {
	    this.load.image('MapImage', 'assets/hawaiiPixelMap.jpg')
	    this.load.image('LevelButton','assets/levelButton.png')
		this.load.image('back-button', 'public/assets/Back.png');
	}

    create() {
		this.background = this.add.image(400,300,'MapImage')
    //code from LMNTor for creating buttons
        this.level1Button = this.add.image(650, 400, 'LevelButton').setAlpha(1);
        this.level1Button.setInteractive();
        this.level1Button.on("pointerover",() =>{
            this.level1Button?.setAlpha(.5);
        });
        this.level1Button.on("pointerout", ()=>{
            this.level1Button?.setAlpha(1);
        });
        this.level1Button.on("pointerup",()=>{
            this.scene.stop('MapScene');
            this.scene.start('level-1'); //TODO: Change back to level 1
        });

        if(MapScene.level1Complete){
            this.level2Button = this.add.image(500, 250, 'LevelButton').setAlpha(1);
            this.level2Button.setInteractive();
            this.level2Button.on("pointerover",() =>{
                this.level2Button?.setAlpha(.5);
            });
            this.level2Button.on("pointerout", ()=>{
                this.level2Button?.setAlpha(1);
            });
            this.level2Button.on("pointerup",()=>{
                this.scene.stop('MapScene');
                this.scene.start('level-2');
            });
        }

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
            this.scene.stop('MapScene');
            this.scene.start('IntroScene');
        });
    }

}

