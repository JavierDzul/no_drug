
import { Boot } from './Boot.js';
import { Game } from './Game.js';
import { GameOver } from './GameOver.js';
import { MainMenu } from './MainMenu.js';
import { Preloader } from './Preloader.js';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: Phaser.AUTO,
    width: 1980,
    height: 1080,
    parent: 'game-container',
    backgroundColor: '#028af8',
    physics:{
        default: 'arcade',
        arcade: {
            debug: false,
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        Game,
        GameOver
    ]
};

export default new Phaser.Game(config);
