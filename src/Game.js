import { Scene } from 'phaser';

export class Game extends Scene
{
    health = 100; // Vida inicial del jugador
    healthText;
    playVideo = false;
    lastEnemySpawn = 0;
    enemySpawnInterval = 1500; // Spawn enemy every 2 seconds
    x = 0;
    rollDirection = null;
    enemies = null;
    killCount = 0;
    killText;
    currentFactIndex = 0;
    messageContainer; // Contenedor para el fondo y el texto
    messageBg;        // Fondo del mensaje
    messageText; 
    facts = [
        "¿Sabías que? El abuso de drogas puede llevar a serios problemas de salud.",
        "La adicción altera la función cerebral y el comportamiento.",
        "Alguien murio por la bala que pagaste.",
        "Buscar ayuda es una señal de fortaleza.",
        "El abuso de drogas impacta a familias y comunidades.",
        "Cuando consumes drogas estás apoyando un sistema que perpetúa la injusticia y el dolor.",
        "Tú perpetuas el ciclo de sufrimiento",,
        "La rehabilitación está disponible para quienes la necesitan.",
        'Tú podrías ser el siguiente',
        'Tú mereces ser el siguiente',
        "Cada vez que compras drogas, estás financiando el crimen organizado que destruye vidas y comunidades enteras.",
        "El narcotráfico es responsable de miles de muertes violentas cada año, incluyendo las de inocentes atrapados en medio de la violencia.",
        "Los cárteles de drogas no solo trafican sustancias, sino también personas, perpetuando el sufrimiento humano a nivel global.",
        "El abuso de drogas está vinculado a la desintegración familiar, dejando a niños vulnerables y desprotegidos.",
        "La producción de drogas ilegales implica trabajo forzado, explotación y la destrucción de ecosistemas enteros.",
        "Al consumir drogas, contribuyes a un sistema que perpetúa la violencia, el miedo y la corrupción.",
        "El abuso de drogas causa más de 500,000 muertes anuales en todo el mundo debido a sobredosis y problemas de salud relacionados.",
        "Muchas comunidades rurales son desplazadas por el cultivo y producción de drogas ilegales, dejando a familias sin hogar.",
        "El tráfico de drogas alimenta el lavado de dinero, afectando economías y debilitando los sistemas de justicia en muchos países.",
        "Las guerras contra el narcotráfico han dejado miles de niños huérfanos y generaciones enteras traumatizadas.",
        "Las drogas no solo destruyen a los consumidores, sino que siembran miedo y sufrimiento en quienes están a su alrededor.",
        "El crimen organizado utiliza niños como 'mulas' para transportar drogas, robándoles su infancia y futuro.",
        "Verdad: Las drogas ilegales están vinculadas al aumento de la trata de personas, el tráfico de armas y otros delitos graves.",
        
      ];

    constructor ()
    {
        super('Game');
        
    }


    displayFact(fact) {
        this.messageText.setText(fact);
        this.messageContainer.setAlpha(1);
        
        // Desvanecer después de un tiempo
        this.tweens.add({
          targets: this.messageContainer,
          alpha: 1,
          duration: 500,
          ease: 'Linear',
          onComplete: () => {
            this.time.delayedCall(3000, () => {
              this.tweens.add({
                targets: this.messageContainer,
                alpha: 0,
                duration: 1000,
                ease: 'Linear'
              });
            }, [], this);
          }
        });
      }

    
    handlePlayerEnemyCollision(player, enemy) {
        // Destruir al enemigo que colisionó con el jugador
        if (enemy.anims.currentAnim.key === 'homeless_1_death' ) {
            
        }
        else{
            enemy.anims.play('homeless_1_death', true);
        
            enemy.body.setVelocity(0, 0);
            enemy.body.allowGravity = false;
            // Reducir la vida del jugador
            
            
            
            this.health -= 20;
    
            this.time.delayedCall(100, () => {
                enemy.destroy();
            }, [], this);
            
            this.healthText.setText('Health: ' + this.health);
    
            if(this.health <= 0){
    
                this.scene.start('GameOver',{ score: this.killCount});
    
            }
        }
        
      
        
        
       
    }
    


    spawnEnemy(player){
        const spawnPositions = [

            {x: 0, y: 830},
            {x: 1980, y: 830}

        ]

        const position = Phaser.Utils.Array.GetRandom(spawnPositions);

        
        const enemy = this.enemies.create(position.x, position.y, 'enemy');

        if(position == spawnPositions[1]){
            enemy.flipX = true,
            enemy.body.setOffset(60,50)
        }
        else{
            enemy.body.setOffset(30,50)
        }

        enemy.setOrigin(.5,.5)
        enemy.setBodySize(40,50,false)
        
        enemy.setCollideWorldBounds(true);
        enemy.setBounce(1);
        enemy.setScale(3);

        enemy.anims.play('homeless_1_run');

        this.physics.moveToObject(enemy, player, 250);

        

    }


     attack() { 

        

    // Verificar si el jugador ya está atacando para evitar ataques simultáneos
    if (this.player.anims.currentAnim.key === 'attack_1' || this.player.anims.currentAnim.key === 'attack_2' ) {
        return;
    }

    // Reproducir la animación de ataque
    if(this.x === 0){
        this.player.anims.play('attack_1');
        this.x = 1;
    }
    else if(this.x === 1){
        this.player.anims.play('attack_2');
        this.x = 0;

    }

    
    this.sound.play('hit');

    
    this.time.delayedCall(200, () =>{
        this.enemies.getChildren().forEach((enemy) => {
            const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, enemy.x, enemy.y);
            if(distance < 250 && ((this.player.body.facing === 13 && enemy.flipX === false) )){
                
                enemy.anims.play('homeless_1_death', true);
              
                // Detener el movimiento del enemigo
                enemy.body.setVelocity(0, 0);
                enemy.body.allowGravity = false;
                
                // Destruir al enemigo después de la animación de muerte
                this.time.delayedCall(1000, () => {
                  enemy.destroy();
      
                  this.killCount += 1;
                this.killText.setText('Kills: ' + this.killCount);
                
                // Mostrar un hecho informativo cada 5 muertes
                if (this.killCount % 5 === 0 && this.currentFactIndex < this.facts.length) {
                  this.displayFact( this.facts[this.currentFactIndex]);
                  this.currentFactIndex += 1;
                }
      
                }, [], this);
                
                // Incrementar el contador de muertes

            }
            else if(distance < 250 && ((this.player.body.facing === 14 && enemy.flipX === true) || (this.player.body.facing === 10 && enemy.flipX === true) )){
                enemy.anims.play('homeless_1_death', true);
              
                // Detener el movimiento del enemigo
                enemy.body.setVelocity(0, 0);
                enemy.body.allowGravity = false;
                
                // Destruir al enemigo después de la animación de muerte
                this.time.delayedCall(1000, () => {
                  enemy.destroy();
      
                  this.killCount += 1;
                this.killText.setText('Kills: ' + this.killCount);
                
                // Mostrar un hecho informativo cada 5 muertes
                if (this.killCount % 5 === 0 && this.currentFactIndex < this.facts.length) {
                  this.displayFact(this.facts[this.currentFactIndex]);
                  this.currentFactIndex += 1;
                }
      
                }, [], this);
            }
            
        })
    })

    
    this.player.once('animationcomplete', () => {
        this.player.anims.play('idle', true);
    });

    // Implementar la lógica de ataque, por ejemplo, detectar colisiones con enemigos
    // Aquí puedes agregar la lógica para dañar o eliminar enemigos cercanos
    }

    moveTiles(direction){

        if(direction === 'left'){

            this.top_threes.tilePositionX -= .5
            this.mid_threes.tilePositionX -= 1
            this.bot_thres.tilePositionX -= 2
            this.floor.tilePositionX -= 6
            this.floor_threes.tilePositionX -= 6
        }
        else if(direction === 'right'){
            this.top_threes.tilePositionX += .5
            this.mid_threes.tilePositionX += 1
            this.bot_thres.tilePositionX += 2
            this.floor.tilePositionX += 6
            this.floor_threes.tilePositionX += 6
        }

    }

    create ()
    {   
        this.killCount = 0;
        
        this.cameras.main.setBackgroundColor(0x00ff00);

        this.sound.stopByKey('menu');

        this.song = this.sound.add('game', {loop:true,volume:.1});
        this.song.play();
        
        this.health = 100;
        

        this.add.image(1980/2, 1080/2, 'background_bg');
        this.sun = this.add.image(1980/2, 1080/2, 'background_sun');
        this.top_threes = this.add.tileSprite(1980/2, 1080/2, 1980, 1080, 'background_top_threes');
        this.mid_threes = this.add.tileSprite(1980/2, 1080/2,1980 ,1080, 'background_mid_threes');
        this.bot_thres = this.add.tileSprite(1980/2, 1080/2, 1980, 1080, 'background_bot_threes');
        this.add.image(1980/2, 1080/2, 'background_red_bg');
        this.floor = this.add.tileSprite(1980/2, 1080/2, 1980, 1080, 'background_floor');
        this.floor_threes =  this.add.tileSprite(1980/2, 1080/2, 1980, 1080, 'background_floor_threes');

        let a = this.anims.create('idle')
        console.log(a);
        let b = this.anims.create('attack_1')

        this.enemies = this.physics.add.group();
        


        this.ctrl = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL);

        
        this.player = this.physics.add.sprite(990+20 , 830, 'idle', '_idle_0').setScale(5)
        this.player.setOrigin(.5,.5)
        console.log(this.player.getCenter())
        console.log(this.player.originX, this.player.originY)
        console.log(this.player.body.center)
        this.player.setCollideWorldBounds(true);
        this.player.setBodySize(30,45,true)
        this.player.body.setOffset(40,35)
        
        
        
        
        this.player.play('idle');

        
        
        this.player.body.debugShowBody;

        this.cursors = this.input.keyboard.createCursorKeys();
        this.attackKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.physics.add.overlap(this.player, this.enemies, this.handlePlayerEnemyCollision, null, this);

        this.attackKey.on('down', () => {
            this.attack();
        });

       


        this.killText = this.add.text(16, 16, 'Kills: 0', { fontSize: '20px', fill: '#ffffff' });
  
        // Texto para la vida del jugador
        this.healthText = this.add.text(16, 40, 'Health: 100', { fontSize: '20px', fill: '#ffffff' });
        
        this.messageBg = this.add.graphics();
        this.messageBg.fillStyle(0x000000, 0.7); // Negro con 70% de opacidad
        this.messageBg.fillRect(-350, -50, 700, 100);
        // Texto para los hechos informativos
        this.messageText = this.add.text(0, 0, '', { 
          fontSize: '30px', 
          fill: '#ffffff', 
          align: 'center', 
          wordWrap: { width: 700 } 
        });
        this.messageText.setOrigin(0.5);
        this.messageContainer = this.add.container(1980/2, 200, [this.messageBg, this.messageText]); // Posición central en la pantalla
        this.messageContainer.setAlpha(0);
      

    }

    update(time){

        if(this.killCount === 50){
           // this.video = this.add.video(800,500, 'no_es_cierto')
            //this.video.play()
            //this.video.setDisplaySize(300,200)

            this.killCount+=1;
        }

        const speed = 200; 
        let moving = false;
        this.player.body.setOffset(40,35)

        console.log(this.health)
        

        
        
        
        // Resetear la velocidad del jugador en X
        this.player.body.setVelocityX(0);
    
        // Movimiento a la izquierda
        if (this.cursors.left.isDown) {

            if (this.player.anims.currentAnim.key === 'attack_1' || this.player.anims.currentAnim.key === 'attack_2'  ) {
                return;
            }
            
            
           
            this.player.body.setOffset(50,35)

            
            

            this.player.body.setVelocityX(-speed);
            this.moveTiles('left');
            this.player.anims.play('run', true);
            moving = true;
            this.player.flipX = true;
            
        }
        // Movimiento a la derecha
        else if (this.cursors.right.isDown) {

            if (this.player.anims.currentAnim.key === 'attack_1' || this.player.anims.currentAnim.key === 'attack_2' ) {
                return;
            }
            

            


            this.player.body.setVelocityX(speed);
            this.moveTiles('right');
            this.player.anims.play('run', true);
            moving = true;
            this.player.flipX = false; 
        }
    
        // Si el jugador no se está moviendo, reproducir la animación idle
        if (!moving && !(this.player.anims.getName() === 'attack_1' || this.player.anims.getName() === 'attack_2')) {
            
            this.player.anims.play('idle', true);
        }

        if (time > this.lastEnemySpawn + this.enemySpawnInterval) {
            this.spawnEnemy(this.player);
            this.lastEnemySpawn = time;
          }

    }
}
