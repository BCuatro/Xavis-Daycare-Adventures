import { collisionBox } from "./collisionbox"
export class Platform {
    constructor({position, width, height}){
        this.position = position
        this.height = height
        this.width= width
        this.boxOffset = 20
        this.cornerA = new collisionBox({
            position:{
                x: this.position.x - this.boxOffset,
                y: this.position.y - this.boxOffset
            },
            width: this.boxOffset,
            height: this.boxOffset
        })
        
        
        this.cornerB = new collisionBox({
            position:{
                x: this.position.x +this.width,
                y: this.position.y- this.boxOffset
            },
            width: this.boxOffset,
            height: this.boxOffset
        })
        
        this.cornerC = new collisionBox({
            position:{
                x: this.position.x +this.width,
                y: this.position.y + this.height
            },
            width: this.boxOffset,
            height: this.boxOffset
        })
        
        
        this.cornerD = new collisionBox({
            position:{
                x: this.position.x- this.boxOffset,
                y: this.position.y + this.height
            },
            width: 20,
            height: 20
            
        })
    }
    draw(ctx){
        // this.cornerA.draw()
        // this.cornerB.draw()
        // this.cornerC.draw()
        // this.cornerD.draw()
        ctx.fillStyle = 'yellow'
        ctx.fillRect(this.position.x, this.position.y,this.width, this.height)
    }
   
}
