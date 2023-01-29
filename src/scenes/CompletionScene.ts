import Phaser from 'phaser'

export default class IntroScene extends Phaser.Scene {
    private background?: Phaser.GameObjects.Image;
    private replayButton?: Phaser.GameObjects.Image;
    private title?: Phaser.GameObjects.Image;
    private audio?: Phaser.Sound.BaseSound;

constructor() {
    super('CompletionScene')
}

preload() {
    this.load.image('BackgroundImage', 'assets/IntroBackground.png')
    this.load.image('title','assets/Title.png')
    this.load.audio('IntroSong', "assets/IntroSong.mp3")
    this.load.image('replayButton', "assets/replayButton.png")
}

create() {
    this.audio = this.sound.add("IntroSong", {volume: 0.5, loop: true});
    this.audio.play();
    this.background = this.add.image(400,300,'BackgroundImage')
    this.background.setAlpha(.5)
    this.title = this.add.image(400,300,'title')
    
    this.replayButton = this.add.image(this.game.canvas.width/2, this.game.canvas.height/2, 'replayButton').setAlpha(1);
    this.replayButton.setScale(.25)
    this.replayButton.setInteractive();
    this.replayButton.on("pointerover",() =>{
        this.replayButton?.setAlpha(.5);
    });
    this.replayButton.on("pointerout", ()=>{
        this.replayButton?.setAlpha(1);
    });
    this.replayButton.on("pointerup",()=>{
        this.scene.stop('CompletionScene');
        this.audio?.stop()
        this.scene.start('IntroScene');
    });
    if(this.title){}
}

}