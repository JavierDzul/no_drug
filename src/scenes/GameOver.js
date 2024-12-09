import { Game, Scene } from 'phaser';

export class GameOver extends Scene
{
    constructor ()
    {
        super('GameOver');
    }
    

    init( data ){
        console.log('init', data)
        this.finalScore = data.score;
    }

    create ()
    {
        this.cameras.main.setBackgroundColor(0xff0000);

        this.sound.stopByKey('game');

        console.log(this.finalScore)


        if(this.finalScore > 100){
            this.video = this.add.video(1000,500  ,'no_es_cierto').setOrigin(.5,.5).setScale(1.8)
            this.video.play();
            
        }
        else{
            this.song = this.sound.add('death', {loop:true,volume:.5});
            this.song.play();
    
            this.bg = this.add.sprite(990 , 540, 'death_bg', 'kaleicospio03-sheet_0');
    
            this.bg.setDisplaySize(1980,1080)
            
            this.bg.play('death_bg')
    
            this.add.text(1980/2, 540, 'MUERTO', {
                fontFamily: 'dungeon', fontSize: 320, color: '#ad0e00', 
                stroke: '#000000', strokeThickness: 80,
                align: 'center'
            }).setOrigin(0.5);
    
    
            this.add.text(1980/2, 840, 'Las drogas matan', {
                fontFamily: 'dungeon', fontSize: 50, color: '#ffffff', 
                stroke: '#000000', strokeThickness: 80,
                align: 'center'
            }).setOrigin(0.5);
        }

      

        this.input.once('pointerdown', () => {

            this.scene.start('MainMenu');

        });
    }
}
