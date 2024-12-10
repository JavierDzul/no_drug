import { Scene } from 'phaser';



export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.add.image(1980/2, 1080/2, 'background_bg');
        this.add.image(1980/2, 1080/2, 'background_sun');
        this.add.image(1980/2, 1080/2, 'background_top_threes');
        this.add.image(1980/2, 1080/2, 'background_mid_threes');
        this.add.image(1980/2, 1080/2, 'background_bot_threes');
        this.add.image(1980/2, 1080/2, 'background_red_bg');
        this.add.image(1980/2, 1080/2, 'background_floor');
        this.add.image(1980/2, 1080/2, 'background_floor_threes');

        this.sound.stopByKey('death');

        this.music = this.sound.add('menu', {volume:.3, loop:true});

        this.music.play();

        

        this.add.text(1980/2, 300, 'Sacrus   Corpus', {
            fontFamily: 'dungeon', fontSize: 220, color: '#ffffff', 
            stroke: '#000000', strokeThickness: 80,
            align: 'center'
        }).setOrigin(0.5);


        let z  = this.anims;

        console.log(z)


        let a = this.anims.create('idle')
        console.log(a);

        const sprite = this.add.sprite(1980/2 + 20, 830, 'idle', '_idle_0').setScale(5)

        sprite.play('idle');

        

        const button = this.add.rectangle( 1980/2, 600, 200, 100, '#ffffff', 1).setInteractive();
        button.name = 'JUGAR';
        button.setScale(2, 1.5);

        const text = this.add.text(1980/2 + 100, 600 + 8, 'J U G A R', {
            fontFamily: 'dungeon', fontSize: 80, color: '#ffffff', 
            stroke: '#000000', strokeThickness: 70,
            align: 'center'
        }).setOrigin(0.5);

        text.x += (button.width - text.width) / 2;
        
        
        
           
            this.input.on('gameobjectdown', function (pointer, button)
            {   

                this.scene.start('Game');
    
            }, this);
        

    } 

}
