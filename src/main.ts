import Phaser from 'phaser'
import HelloWorldScene from './HelloWorldScene'
import Level_One_Scene from './Level_One_Scene'
import Level_Two_Scene from './Level_Two_Scene'

import ModalScene from './ModalScene'

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
	scene: [Level_One_Scene],
}

export default new Phaser.Game(config)
