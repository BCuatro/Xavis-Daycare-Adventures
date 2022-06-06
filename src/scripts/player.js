export class Player {

    constructor({ position, velocity, color = 'blue', offset =0 }) {
        this.position = position;
        this.velocity = velocity;
        this.height = 50;
        this.width = 50;
        this.lastkey;
        this.isCatching;
        this.health = 100;
        this.color = color;
        this.catchBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: offset,
            width: 100,
            height: 125
        };
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        if (this.isCatching) {
            ctx.fillStyle = "green";
            ctx.fillRect(this.catchBox.position.x, this.catchBox.position.y, this.catchBox.width, this.catchBox.height);
        }
    }

    update() {
        this.draw();
        this.catchBox.position.x = this.position.x + this.catchBox.offset.x;
        this.catchBox.position.y = this.position.y + this.catchBox.offset.y-50 ;
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        
        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0;
        } 
        else {
            this.velocity.y += gravity;
        }

    };
    catch() {
        this.isCatching = true;
        setTimeout(() => { this.isCatching = false; }, 200);
    }
 
};
