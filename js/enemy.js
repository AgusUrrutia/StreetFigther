export default class Enemy {
    constructor({position}, fill, context,  width, height, {velocity},gravityH){
        this.position = position;
        this.velocity = velocity;
        this.fill = fill;
        this.context = context;
        this.width = width;
        this.height = height;
        this.gravityH = gravityH;
        this.punch = {
            position: this.position,
            width: this.width + 40,
            height: 40
        };
    }

    moveTo(x, y){
        this.position.x = x;
        this.position.y = y;
    }
    

    draw(){
        this.context.fillStyle = this.fill;
        this.context.fillRect(this.position.x, this.position.y, this.width, this.height);

        this.context.fillRect(this.punch.position.x, this.punch.position.y, this.punch.width , this.punch.height)
    }

    left(){
        
        this.draw();
        this.position.x -= this.velocity.x;
        if(this.position.x  <= 0){
            this.velocity.x = 0;
            this.position.x = 0;
        }
        
    }
    right(){
        this.draw();
        this.position.x += this.velocity.x;
        if(this.position.x + this.velocity.x + this.width > this.context.canvas.clientWidth){
            this.velocity.x = 0;
            this.position.x = this.context.canvas.clientWidth - this.width;
        }
    }

    jump(){
        this.velocity.y = -10;
    }
    gravity(){
        this.draw();
        this.position.y += this.velocity.y;

        
        if(this.position.y + this.height + this.velocity.y >= this.context.canvas.clientHeight){
            this.velocity.y = 0;
        }else{
            this.velocity.y += this.gravityH;
        }
    }
    
    animate(){
        this.gravity();
    }
}