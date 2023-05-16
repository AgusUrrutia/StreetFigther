export default class Power {
    constructor({position}, fill, context,  width, height, {velocity},direction){
        this.position = position;
        this.velocity = velocity;
        this.fill = fill;
        this.context = context;
        this.width = width;
        this.height = height;
        this.direction = direction;
    }

    draw(){
        this.context.fillRect(this.position.x, this.position.y, this.width , this.height);
        // let image = new Image();
        // image.src = "image/ryu2.png";
        // let context = this.context;
        // let positionx = this.position.x;
        // let positiony = this.position.y;
        // image.onload = function(){
        //     context.drawImage(this, this.positionx, this.positiony);
        // };
    }
    animate(){
        if(this.direction==="left"){
            this.position.x -= this.velocity.x;
        }
        if(this.direction==="right"){
            this.position.x += this.velocity.x;
        }
        this.draw();
    }
    delete(){
        this.context.clearRect(this.position.x, this.position.y, this.width, this.height);
    }
}