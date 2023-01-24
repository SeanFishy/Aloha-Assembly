import Phaser from 'phaser'

//import HelloWorldScene from './HelloWorldScene'
import IntroScene from './scenes/IntroScene'
import instructionsScene from './scenes/instructionsScene'
import HelloWorldScene from './scenes/HelloWorldScene'
import Level_One_Scene from './scenes/Level_One_Scene'
import Level_Two_Scene from './scenes/Level_Two_Scene'
import ModalScene from './scenes/ModalScene'
import MapScene from './scenes/mapScene'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
		},
	},
	scene: [IntroScene,Level_One_Scene,instructionsScene,MapScene],
}

export default new Phaser.Game(config)
