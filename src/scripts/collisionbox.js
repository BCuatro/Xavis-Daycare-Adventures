export class collisionBox{
    constructor({position,width,height}){
            
        this.width = width
        this.height = height
        this.position = position
        } 
        draw(ctx){
            ctx.fillStyle = 'white'
            ctx.fillRect(this.position.x, this.position.y,this.width, this.height)
    }
}