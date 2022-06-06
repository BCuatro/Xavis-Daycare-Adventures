export class collisionBox{
    constructor({position,width,height}){
            
        this.width = width
        this.height = height
        this.position = position
        } 
        draw(){
            ctx.fillStyle = 'white'
            ctx.fillRect(this.position.x, this.position.y,this.width, this.height)
    }
}