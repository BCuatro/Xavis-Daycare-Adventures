import { collisionBox } from "./collisionbox"
export class Collectable{
    constructor({position, direction= {x:1, y:0},sign, moveType, comment="",imageLink="",frames=1,speed=1, size=1, frameOffset=1, cropOffset=0}){
        this.position = position
        
        this.sign = sign
        this.direction = direction
        this.comment= comment
        this.moveType = moveType

        this.radian = 0
        this.radian_velocity= 0.025
        this.imageLink= imageLink
        this.image = new Image()
        this.image.src = imageLink
        this.framesMultipler = 0
        this.speed = speed
        this.currentFrame=0
        this.frames = frames
        this.size= size
        this.frameOffset =frameOffset
        this.cropOffset= cropOffset
        this.collisionBox = new collisionBox({
            position: {
            x: this.position.x,
            y: this.position.y
        }, 
        width:  (this.image.width/this.frames),
        height:  this.image.height
        
     })
     this.width = (this.image.width/this.frames)/4
     this.height = this.image.height/4
        
        

    }


    draw(){

        if (this.imageLink ===""){ 
        ctx.fillStyle = 'purple'
        ctx.fillRect(this.position.x, this.position.y,this.width, this.height)
        } else{
            // ctx.fillStyle = 'purple'
            // ctx.fillRect(this.position.x, this.position.y,this.width, this.height)
           ctx.drawImage(this.image,
           this.framesMultipler * ((this.image.width/this.frames)-this.cropOffset),
            0,
            this.image.width/this.frames,
            this.image.height,
            this.position.x, 
            this.position.y,
            (this.image.width/this.frames)* this.size,
            this.image.height *this.size) 
        }
    }
     update(){
        this.draw()
        // this.collisionBox.draw()
        this.currentFrame++
        if(this.currentFrame % this.speed===0){
            if(this.framesMultipler< (this.frames-this.frameOffset)){
                this.framesMultipler++
            }else{
                this.framesMultipler = 0
            }

        }
            
        
        if (this.moveType ===1){ this.bounce()}
        else if(this.moveType ===2){ this.horizontalOscillation()}
        else if (this.moveType ===3){ this.jumpingBetweenPlatforms()}
        else if(this.moveType ===4){this.arcMove()}
        else if(this.moveType ===5){this.drive()}
        else if(this.moveType ===6){this.fly()}
        else if(this.moveType ===7){this.flyingleft()}
        else if(this.moveType === 8){this.blow()}
        else if (this.moveType ===9){this.blow2()}
        
        
    }
   
    horizontalOscillation(){
        //Moving between platform top boxes A-B
        const horOsBox1= new collisionBox({
               position: {
               x: 900,
               y: 50
           }, 
           width:  20,
           height:  20
        })
        const horOsBox2= new collisionBox({
            position: {
            x: 1000,
            y: 50
        }, 
        width:  20,
        height:  20
     })
      
        this.position.x += this.direction.x
        
        this.imageLink = "./img/birds4.png"
     
        
       
        
            if (this.position.x <= horOsBox1.position.x && this.position.y === horOsBox1.position.y){

                    this.direction.x = 0.5
                    this.direction.y= 0
                 } else if(this.position.x >= horOsBox2.position.x && this.position.y === horOsBox2.position.y){
                    this.imageLink = "./img/airplane.png"
                    this.direction.x = -0.5
                    this.direction.y= 0
                }
    
    
    }
    
    bounce(){
        //Moving between platform top boxes A-B
        let starting_position = this.position.y - (2*Math.cos(this.radian))* 15
        this.radian += this.radian_velocity
        this.position.y = starting_position + (2*Math.cos(this.radian))* 15
    }
    jumpingBetweenPlatforms(){
        this.position.x += this.direction.x
        this.position.y += this.direction.y
        
            if(this.position.x === platform.cornerC.position.x && this.position.y === platform.cornerC.position.y){
                this.direction.x = 1
                this.direction.y= 1
            } else if (this.position.x <= platform2.cornerD.position.x && this.position.y === platform2.cornerD.position.y){
                this.direction.x = 0
                this.direction.y = -1
            }  
            else if (this.position.x + this.width >= platform2.cornerA.position.x && this.position.y === platform2.cornerA.position.y){
                this.direction.x = -1
                this.direction.y = -1
            }  else if (this.position.x <= platform.cornerB.position.x && this.position.y + this.height>= platform.cornerB.position.y){
                this.direction.x = 0
                this.direction.y = 1
            }  

    }

    arcMove(){

             
        this.radian += this.radian_velocity
        this.position.x = 500+  Math.sin(this.radian) *50
        this.position.y =  50+ Math.cos(this.radian)  *50
       

       
      
    }

    aroundPlatform3(){
        this.position.x += this.direction.x
        this.position.y += this.direction.y
        if (this.position.x <= platform3.cornerA.position.x && this.position.y === platform3.cornerA.position.y){
                this.direction.x = 2
                this.direction.y= 0
            }else if ( this.position.x >= platform3.cornerB.position.x && this.position.y === platform3.cornerB.position.y ){
                this.direction.x = 0
                this.direction.y = 2
            } else if(this.position.x >= platform3.cornerC.position.x && this.position.y === platform3.cornerC.position.y){
                this.direction.x = -2
                this.direction.y= 0
            } else if (this.position.x <= platform3.cornerD.position.x && this.position.y === platform3.cornerD.position.y){
                this.direction.x = 0
                this.direction.y = -2
            }  

    }

    drive(){
        this.position.x += this.direction.x
        
        if(this.direction.x <0){
            this.position.x += this.direction.x
            this.direction.x +=.009
        }else{
            this.direction.x =0
        }
            
    }
    flyingleft(){
        this.position.x += this.direction.x
        if (this.position.x <-50){
            this.position.x = 1250
            }
    }
    fly(){
        this.bounce()
        this.position.x +=this.direction.x
        if (this.position.x >1300){
            this.position.x = -10
        }
    }
    blow(){
        this.position.x += this.direction.x
    }

    blow2(){
            
        this.position.x += this.direction.x
        this.position.y += this.direction.y
        
        if(this.direction.x >0 && this.direction.y <0 ){
            this.position.x += this.direction.x
            this.direction.x -=.009
            this.direction.y +=.001
        }else{ 
            this.direction.x = 0
            this.direction.y =0
            this.radian += this.radian_velocity
            this.position.x = this.position.x+Math.sin(this.radian)/2
            this.position.y =this.position.y+ Math.cos(this.radian)/2
            
        }
    }
   
}