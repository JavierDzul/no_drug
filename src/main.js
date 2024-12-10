
import { Boot } from './Boot';
import { Game } from './Game';
import { GameOver } from './GameOver';
import { MainMenu } from './MainMenu';
import { Preloader } from './Preloader';

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
