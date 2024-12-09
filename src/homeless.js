export default class homeless extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, spawnSide,  type){

        const frame  = 'run_0' 


        super(scene, spawnSide, 830, 'homeless_1_run', frame);

        this.setOrigin(.5, 1);

        scene.add.existing(this);
        scene.physics.add.existing(this);


        
        
        //this.sound = scene.sound;

        
        this.isAlive = true;
        //this.isThrowing = false;

        this.speed = 50;

        //  0 = walk, 1 = idle, 2 = throw
        this.previousAction = 0;

        this.currentSide= spawnSide;

    }

    start(){
    
        this.isAlive = true;
        //this.isThrowing = false;
        this.previousAction = 0;

        this.x = this.currentSide;

        this.setActive(true);
        this.setVisible(true);

        this.play('homeless_1_run');

        this.setVelocity(this.speed);


        console.log('homelessStart')
        console.log(this)
        console.log(this.x)
        console.log(this.y)

    }

}