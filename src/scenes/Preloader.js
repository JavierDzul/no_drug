import { Scene } from 'phaser';


function loadFont(name, url) {
    var newFont = new FontFace(name, `url(${url})`);
    newFont.load().then(function (loaded) {
        document.fonts.add(loaded);
    }).catch(function (error) {
        return error;
    });
}

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {

        //  We loaded this image in our Boot Scene, so we can display it here
        this.add.image(512, 384, 'background');

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);

        });
    }

    preload ()
    {   

        this.load.atlas('idle', 'assets/player/idle/idle.png', 'assets/player/idle/idle_atlas.json');
        this.load.atlas('attack_1', 'assets/player/attack_1/attack_1.png', 'assets/player/attack_1/attack_1_atlas.json');
        this.load.atlas('attack_2', 'assets/player/attack_2/attack_2.png', 'assets/player/attack_2/attack_2_atlas.json');
        this.load.atlas('run', 'assets/player/run/run.png', 'assets/player/run/run_atlas.json');
        this.load.atlas('death', 'assets/player/death/death.png', 'assets/player/death/death_atlas.json');
        this.load.atlas('roll', 'assets/player/roll/roll.png', 'assets/player/roll/roll_atlas.json');
        
        this.load.animation('player_idle_anim', 'assets/player/idle/idle_anim.json');
        this.load.animation('player_attack_2_anim', 'assets/player/attack_2/attack_2_anim.json');
        this.load.animation('player_attack_1_anim', 'assets/player/attack_1/attack_1_anim.json');
        this.load.animation('player_run_anim', 'assets/player/run/run_anim.json');
        this.load.animation('player_death_anim', 'assets/player/death/death_anim.json');
        this.load.animation('player_roll_anim', 'assets/player/roll/roll_anim.json');
        

        this.load.atlas('homeless_1_death','assets/homeless/homeless_1/death/homeless_death.png', 'assets/homeless/homeless_1/death/homeless_death_atlas.json');
        this.load.animation('homeless_1_death_anim', 'assets/homeless/homeless_1/death/homeless_death_anim.json')

        this.load.atlas('homeless_1_run','assets/homeless/homeless_1/run/homeless_1_run.png', 'assets/homeless/homeless_1/run/homeless_1_run_atlas.json');
        this.load.animation('homeless_1_run_anim', 'assets/homeless/homeless_1/run/homeless_1_run_anim.json')
        
        this.load.atlas('death_bg','assets/death_bg/death_bg.png', 'assets/death_bg/death_bg_atlas.json');
        this.load.animation('death_bg_anim', 'assets/death_bg/death_bg_anim.json')

        this.load.video('no_es_cierto', 'assets/no_es_cierto.mp4' )

        this.load.setPath('assets/sounds/');
        this.load.audio('menu', ['menu.wav']);
        this.load.audio('game', ['battle.wav']);
        this.load.audio('hit', ['hit.wav']);
        this.load.audio('death', ['in-the-wreckage.wav']);
        //  Load the assets for the game - Replace with your own assets
        

        loadFont("dungeon", "assets/DungeonFont.ttf");
    }

    create ()
    {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('MainMenu');
    }
}
