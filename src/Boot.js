import { Scene } from 'phaser';

export class Boot extends Scene
{
    constructor ()
    {
        super('Boot');
    }

    preload ()
    {
        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.

        this.load.image('background_bg', 'assets/background/1.png');
        this.load.image('background_sun', 'assets/background/2.png');
        this.load.image('background_top_threes', 'assets/background/3.png');
        this.load.image('background_mid_threes', 'assets/background/4.png');
        this.load.image('background_bot_threes', 'assets/background/5.png');
        this.load.image('background_red_bg', 'assets/background/6.png');
        this.load.image('background_floor', 'assets/background/7.png');
        this.load.image('background_floor_threes', 'assets/background/8.png');


    }

    create ()
    {
        this.scene.start('Preloader');
    }
}
