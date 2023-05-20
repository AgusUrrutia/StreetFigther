export default class Power {
    constructor({position}, fill, context,  width, height, {velocity},direction,{imageSrc}){
        this.position = position;
        this.velocity = velocity;
        this.fill = fill;
        this.context = context;
        this.width = width;
        this.height = height;
        this.direction = direction;
        this.image = new Image();
        this.image.src = imageSrc.left;
        this.directionImage = imageSrc;
    }

    draw(){
        // this.context.fillRect(this.position.x, this.position.y, this.width , this.height);
        this.context.drawImage(this.image,this.position.x,this.position.y, this.width, this.height);
    }
    animate(){
        if(this.direction === "left"){
            this.position.x -= this.velocity.x;
            this.image.src = this.directionImage.left
        }
        if(this.direction === "right"){
            this.position.x += this.velocity.x;
            this.image.src = this.directionImage.right
        }
        this.draw();
    }
    delete(){
        this.context.clearRect(this.position.x, this.position.y, this.width, this.height);
    }
}