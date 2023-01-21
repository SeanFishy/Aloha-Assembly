import Phaser from 'phaser'

import ModalScene from './ModalScene'

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
	scene: [ModalScene],
}

export default new Phaser.Game(config)
