import { collisionBox } from "./collisionbox"
import { Player } from "./player"
import { Collectable } from "./collectableobjects";
import{ Platform } from "./platform"

document.addEventListener("DOMContentLoaded", function () {

    const canvas = document.getElementById('mycanvas');
    const background = new Image()
    background.src = "./img/city.png"
    ctx.drawImage(background,0,0)
    
    //variables
    canvas.width = 1000;
    canvas.height = 600;
    let collectables= []
    let multiplier =1 
    let iSpyItems=[]
    let endDogMeet = false;
    const gravity = .5;
    let startGamePlay = false
    const ctx = canvas.getContext('2d')
    const meetDogButton= document.querySelector('#dogMeet')
    const meetDog = document.querySelector('.dabutton')
    const startGameButton = document.querySelector('#startGame')
    const startScreen = document.querySelector('.startbutton')
    const keys = {
        ArrowRight: {
            hit: false
        },
        ArrowLeft: {
            hit: false
        },
        ArrowUp: {
            hit: false
        }
    };

    //object instances

    const wind = new Collectable({
        position: {
            x: 20,
            y: 450
        },
            sign: "wind",
            moveType: 8,
            imageLink: "./img/wind2.png",
            speed: 1,
            frames: 1,
            size: 0.255,
            direction:{
                x: 3,
                y: 0
            },
            frameOffset: 1,
            cropOffset: 0

    })
    const dog = new Player({
        position: {
            x: 950,
            y: canvas.height-50
        },
            velocity: {
                x:0,
                y:0

            }

    })


    collectables.unshift(new Collectable({
        position: {
            x: 402,
            y: 115
        },
        sign: "balloon",
        moveType: 100,
        imageLink: "./img/yellowballoon.png",
        speed: 5,
        frames: 19,
        size: 0.255,
        direction:{
            x: 0,
            y: 0
        },
        frameOffset: 1,
        cropOffset: 0
    }))


    collectables.unshift(new Collectable({
        position: {
            x: 45, 
            y: 475
        },
        sign: "flower",
        moveType: 100,
        imageLink:"./img/flower.png",
        speed: 20,
        frames: 3,
        frameOffset:1,
        size: 0.20
    }))

    collectables.unshift(new Collectable({
        position: {
            x: 65, 
            y: 465
        },
        sign: "dinosaur",
        moveType: 100,
        imageLink:"./img/Dinosaur.png",
        speed: 4,
        frames: 10,
        size:0.25,
        frameOffset: 1,
        cropOffset: 0   
    }))

    collectables.unshift(new Collectable({
        position: {
            x: 0, 
            y: 275
        },
        sign: "red and blue bird",
        moveType: 6,
        imageLink: "./img/birds3.png",
        speed: 4,
        frames: 10,
        size: 0.4,
        direction:{
            x: 1,
            y: 0
        },
        frameOffset: 2
    }))

    collectables.unshift(new Collectable({
        position: {
            x: 200, 
            y: 120
        },
        sign: "red bird",
        moveType: 7,
        imageLink: "./img/birds4.png",
        speed: 4,
        frames: 45,
        size: 0.15,
        direction:{
            x: -2,
            y: 0
        }
        
    }))

    collectables.unshift(new Collectable({
        position: {
            x: 20, 
            y: 20
        },
        sign: "S",
        moveType: 100,
        imageLink: "./img/sun.png",
        speed: 9,
        frames: 2,
        size: 0.45,
        direction:{
            x: 0,
            y: 0
        },
        frameOffset: 1
        
    }))

    collectables.unshift(new Collectable({
        position: {
            x: 1000, 
            y: 50
        },
        sign: "ninja",
        moveType: 5,
        imageLink: "./img/ninja3.png",
        speed: 5,
        frames: 10,
        size: 0.20,
        direction:{
            x: -2,
            y: 0
        },
        frameOffset: 1,
        cropOffset: 0
        
    }))

    collectables.unshift(new Collectable({
        position: {
            x: 850, 
            y: canvas.height - 100
        },
        sign: "cat",
        moveType: 100,
        imageLink: "./img/cat.png",
        speed: 8,
        frames: 6,
        size: 0.7,
        direction:{
            x: 1,
            y: 0
        }
        
    }))



    const platform = new Platform({
        position: {
            x: 150,
            y: 350
        }, 
        width: 160,
        height: 40
    })


    const platform2 = new Platform({
        position: {
            x: 565,
            y: 200
        }, 
        width: 60,
        height: 40
    })
    const platform3 = new Platform({
        position: {
            x: 840,
            y: 235
        }, 
        width: 60,
        height: 40
    })

    // const floorPlatform = new Platform({
    //     position: {
    //         x: canvas.width - 150,
    //         y: canvas.height - 125
    //     }, 
    //     width: 150,
    //     height: 125
    // })
    // const floorPlatform2 = new Platform({
    //     position: {
    //         x: floorPlatform.position.x - 100,
    //         y: canvas.height - 50
    //     }, 
    //     width: 100,
    //     height: 50
    // })


    const player = new Player({
        position: {
            x: 0,
            y: canvas.height- 60
        },
        velocity: {
            x: 0,
            y: 0
        },
        offset: {
            x: 0,
            y: 0
        }
    });

    const startScreenPlayer = new Player({
        position: {
            x: 390,
            y: 212
        },
        velocity: {
            x: 0,
            y: 0
        },
        offset: {
            x: 0,
            y: 0
        }
    });





    //Start screen movement

    function update2(object1,object2){
        object2.draw()
        object1.draw()
        
        
    
        object2.direction.x = -1.25
        object2.direction.y = 1.1
        object2.position.x += object2.direction.x
        object2.position.y += object2.direction.y
        object1.velocity.x = -1.25
        object1.velocity.y = 1.1
        object1.position.x += object1.velocity.x
        object1.position.y += object1.velocity.y
        

        if (object1.position.x <= 0){
                object2.position.x= 12
                object2.position.y = 460
                object1.position.x= 0
                object1.position.y = canvas.height-50
                
                
                
        }
    }

    //Collision Function
    function objectCollision({ object1, object2 }) {
        return (
            object1.catchBox.position.x + object1.catchBox.width >= object2.position.x &&
            object1.catchBox.position.x <= object2.position.x + object2.width &&
            object1.catchBox.position.y + object1.catchBox.height >= object2.position.y  
            && object1.catchBox.position.y <= object2.position.y + object2.height
        );
    }

    //Game over Function
    function gameOver(){
        if (collectables.length ===0 && animate_game){
            
        document.querySelector('#endMessage').innerHTML = "Great Job"
        document.querySelector('#endMessage').style.display = "flex"
        return true
        }

    }

    //Game Animation 

    animate();
    function animate(){
        if(endDogMeet){return}
        window.requestAnimationFrame(animate);
        ctx.drawImage(background,0,0)
        collectables[collectables.length-1].draw()
        startScreenPlayer.draw()
        
        
    }

    function animate_meet_dog(){
        if(endDogMeet){return}
        window.requestAnimationFrame(animate_meet_dog);
        // ctx.fillStyle = 'red';
        // ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(background,0,0)
        update2(startScreenPlayer,collectables[collectables.length-1])
        
        dog.draw()


    }
    animate_game()

    function animate_game() {
        
        window.requestAnimationFrame(animate_game);
        // ctx.fillStyle = 'red';
        // ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(background,0,0)
        dog.draw()
    

        player.update();
        wind.update()
        // platform.draw();
        // platform2.draw();
        // platform3.draw();
        // floorPlatform.draw();
        // floorPlatform2.draw();
        
        collectables.forEach(
            (collectable) => {
                collectable.update()
                if (objectCollision({ object1: player, object2: collectable })
                && player.isCatching && collectable.sign ===collectables[collectables.length-1].sign) {
                player.isCatching = false;
                iSpyItems.push(collectables.pop())
                
                }
                
            });
            if(gameOver()){return}
        player.velocity.x = 0;
        if (keys.ArrowRight.hit && player.lastkey === "ArrowRight" && player.position.x + player.width< 1000) {
            player.velocity.x = 5 * multiplier;
        } else if (keys.ArrowLeft.hit && player.lastkey === "ArrowLeft" && player.position.x > 0) {
            player.velocity.x = -5 * multiplier;
        }
    
        if (player.position.y + player.height <= platform.position.y && 
            player.position.y + player.height+ player.velocity.y >= platform.position.y && 
            player.position.x + player.width >= platform.position.x && 
            player.position.x <= platform.position.x + platform.width){
            player.velocity.y = 0
        }
        if (player.position.y + player.height <= platform2.position.y && 
            player.position.y + player.height + player.velocity.y >= platform2.position.y && 
            player.position.x + player.width >= platform2.position.x && 
            player.position.x <= platform2.position.x + platform2.width){
            player.velocity.y = 0
        }
        if (player.position.y + player.height <= platform3.position.y && 
            player.position.y + player.height + player.velocity.y >= platform3.position.y && 
            player.position.x + player.width >= platform3.position.x && 
            player.position.x <= platform3.position.x + platform3.width){
            player.velocity.y = 0
        }

        // if (player.position.y + player.height <= floorPlatform.position.y && 
        //     player.position.y + player.height + player.velocity.y >= floorPlatform.position.y && 
        //     player.position.x + player.width >= floorPlatform.position.x && 
        //     player.position.x <= floorPlatform.position.x + floorPlatform.width){
        //     player.velocity.y = 0
        // }
        // if (
        //     (player.position.x + player.width +player.velocity.x> floorPlatform.position.x ) && 
        //     (player.position.y >= floorPlatform.position.y ||player.position.y + player.height >= floorPlatform.position.y) ){
        //     player.velocity.x=0
        // }
        // if (player.position.y + player.height <= floorPlatform2.position.y && 
        //     player.position.y + player.height + player.velocity.y >= floorPlatform2.position.y && 
        //     player.position.x + player.width >= floorPlatform2.position.x && 
        //     player.position.x <= floorPlatform2.position.x + floorPlatform2.width){
        //     player.velocity.y = 0
        // }
        // if (
        //     (player.position.x + player.width + player.velocity.x >= floorPlatform2.position.x ) && 
        //     (player.position.y >= floorPlatform2.position.y ||player.position.y + player.height >= floorPlatform2.position.y) ){
        //     player.velocity.x=0
        // }

    
    };

    //Event Listeners


    window.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'ArrowRight':
                keys.ArrowRight.hit = true;
                player.lastkey = "ArrowRight";
                break;
            case 'ArrowLeft':
                keys.ArrowLeft.hit = true;
                player.lastkey = "ArrowLeft";
                break;
            case 'ArrowUp':
                player.velocity.y = -10 * multiplier;;
                break;

        }

    });

    window.addEventListener('keyup', (event) => {
        switch (event.key) {
            case 'ArrowRight':
                keys.ArrowRight.hit = false;
                break;
            case 'ArrowLeft':
                keys.ArrowLeft.hit = false;
                break;
            case 'ArrowUp':
                keys.ArrowUp.hit = false;
                break;
            case ' ':
                player.catch();
        }

    });
    // function wordListCompletion(timerId){ 
        
    //     if(wordCount > 10){
    //         clearTimeout(timerId)
    //         document.querySelector('#endMessage').innerHTML = "You did it!"
    //         document.querySelector('#endMessage').style.display = "flex"

    //     }
    // }
    // let wordCount =1 //variable for word count




    //Extra
    //power ups
    // function increaseTime(){ //increase time bonus
    //     timer +=5
        
    // }
    // // function multiplyMovement(){ //increase movement
    // //     multiplier += .25
    // //     setTimeout(resetMovement,5000)

    // // }
    // function resetMovement(){ //reset movement
    //     multiplier = 1
    // }


    
        
    meetDogButton.addEventListener('click', () => { 
        meetDog.style.display = 'none'
        startScreen.style.display ='block'

        setTimeout(animate_meet_dog(),100)
        
        
    

    })

    startGameButton.addEventListener('click', () => { 

        setTimeout(animate_game(),100)
        startScreen.style.display = 'none'
        
        endDogMeet= true
        collectables.pop()
        collectables.push(new Collectable({
            position: {
                x: 12,
                y: 460
            },
            sign: "balloon",
            moveType: 9,
            imageLink: "./img/yellowballoon.png",
            speed: 5,
            frames: 19,
            size: 0.255,
            direction:{
                x: 2,
                y: -.3
            },
            frameOffset: 1,
            cropOffset: 0
        }))
    

    

    })
});