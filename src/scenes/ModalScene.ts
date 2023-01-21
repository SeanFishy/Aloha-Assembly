import Phaser from 'phaser'

export default class ModalScene extends Phaser.Scene {

	private modalbutton?: Phaser.GameObjects.Image;
	private modalbg?: Phaser.GameObjects.Image;
	private closebutton?: Phaser.GameObjects.Image;

	private score = 0
	private scoreText?: Phaser.GameObjects.Text

	constructor() {
		super('ModalScene')
	}

	preload() {
		this.load.image('sky', 'assets/sky.png');
		this.load.image('modal-button', 'assets/red-button.png');
		this.load.image('modal-bg', 'assets/modal.png');
		this.load.image('close-button', 'assets/close.png');
	}

	create() {
		this.add.image(400, 300, 'sky');

		this.modalbg = this.add.image(400, 300, 'modal-bg');
		this.modalbg.setAlpha(0);
		this.modalbg.setScale(0.8);

		this.closebutton = this.add.image(645, 135, 'close-button');
		this.closebutton.setAlpha(0);
		this.closebutton.setScale(0.06);

		this.modalbutton = this.add.image(100, 60, 'modal-button').setAlpha(1);

		//code from LMNTor for creating buttons
		//I added the scale for the images and changed the opacity
		//this.modalbutton = this.add.image(this.game.canvas.width / 2, this.game.canvas.height / 2, 'modal-button').setAlpha(1);
		this.modalbutton.setScale(.25)
		//Display.Align.In.Center(this.playbutton, this.background);
		this.modalbutton.setInteractive();
		this.modalbutton.on("pointerover", () => {
			this.modalbutton?.setAlpha(.5);
		});
		this.modalbutton.on("pointerout", () => {
			this.modalbutton?.setAlpha(1);
		});
		this.modalbutton.on("pointerup", () => {
			// open modal
			this.modalbg?.setAlpha(1);
			this.closebutton?.setAlpha(0.8);

			this.score += 10
			this.scoreText = this.add.text(150, 150, 'Level Completed!\n\nScore: ' + this.score, { fontSize: '20px', color: '#000' });
		});


		this.closebutton.setInteractive();
		this.closebutton.on("pointerup", () => {
			// close modal
			this.modalbg?.setAlpha(0);
			this.closebutton?.setAlpha(0);
			this.scoreText?.setAlpha(0);
		});
	}

	update() {

	}
}
