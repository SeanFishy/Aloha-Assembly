import Phaser from 'phaser'

//import HelloWorldScene from './HelloWorldScene'
import IntroScene from './scenes/IntroScene'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 300 },
		},
	},
	scene: [IntroScene],
}

export default new Phaser.Game(config)
