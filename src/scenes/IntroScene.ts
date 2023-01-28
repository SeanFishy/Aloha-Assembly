import Phaser from 'phaser'


export default class IntroScene extends Phaser.Scene {
    private playbutton?: Phaser.GameObjects.Image;
    private background?: Phaser.GameObjects.Image;
    private instructionbutton?: Phaser.GameObjects.Image;
    private title?: Phaser.GameObjects.Image;
    private audio?: Phaser.Sound.BaseSound;

    constructor() {
    	super('IntroScene')
    }

    preload() {
	    this.load.image('BackgroundImage', 'assets/IntroBackground.png')
	    this.load.image('StartButton','assets/Start.png')
        this.load.image('Instructions','assets/InstructionButton.png')
        this.load.image('title','assets/Title.png')
        this.load.audio('IntroSong', "assets/IntroSong.mp3")
	}

    create() {
        this.audio = this.sound.add("IntroSong", {volume: 0.5, loop: true});
        this.audio.play();
		this.background = this.add.image(400,300,'BackgroundImage')
        this.background.setAlpha(.5)
        this.title = this.add.image(400,300,'title')
    //code from LMNTor for creating buttons
    //I added the scale for the images and changed the opacity
        this.playbutton = this.add.image(this.game.canvas.width/2, this.game.canvas.height/2, 'StartButton').setAlpha(1);
        this.playbutton.setScale(.25)
        //Display.Align.In.Center(this.playbutton, this.background);
        this.playbutton.setInteractive();
        this.playbutton.on("pointerover",() =>{
            this.playbutton?.setAlpha(.5);
        });
        this.playbutton.on("pointerout", ()=>{
            this.playbutton?.setAlpha(1);
        });
        this.playbutton.on("pointerup",()=>{
            this.scene.stop('IntroScene');
            this.audio?.stop()
            this.scene.start('MapScene');
        });
        this.instructionbutton = this.add.image(this.game.canvas.width/2, this.game.canvas.height/2+100, 'Instructions').setAlpha(1);
        this.instructionbutton.setScale(.5)
        //Display.Align.In.Center(this.playbutton, this.background);
        this.instructionbutton.setInteractive();
        this.instructionbutton.on("pointerover",() =>{
            this.instructionbutton?.setAlpha(.5);
        });
        this.instructionbutton.on("pointerout", ()=>{
            this.instructionbutton?.setAlpha(1);
        });
        this.instructionbutton.on("pointerup",()=>{
            this.scene.stop('IntroScene');
            this.scene.start('instructionsScene');
        });
        if(this.title){}
    }

}

