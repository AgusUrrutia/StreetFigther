export default class BackGround {
    constructor({position},context,imageSrc){
        this.position = position;
        this.context = context;
        this.image = new Image();
        this.image.src = imageSrc;
    }

    draw(){
        this.context.drawImage(this.image,this.position.x,this.position.y, this.context.canvas.clientWidth, this.context.canvas.clientHeight);
    }

    animate(){
        this.draw();
    }
}
