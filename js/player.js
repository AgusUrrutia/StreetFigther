import Power from "./power.js";

export default class Player {
    constructor({position}, fill, context,  width, height, {velocity},gravityH,{imagePowerSrc},imageState,imageWalk,frames = 4, scale = 2){
        this.position = position;
        this.velocity = velocity;
        this.fill = fill;
        this.context = context;
        this.width = width;
        this.height = height;
        this.gravityH = gravityH;
        this.punchArea = {
            position:{
                x: this.position.x,
                y: this.position.y
            } ,
            width:  100,
            height: 40
        };
        this.punch = false;
        this.lastDirection = "right";
        this.valuePrueba = 0;
        this.powers = [];
        this.imagePowerSrc = imagePowerSrc;
        this.image = new Image();
        this.image.src = imageState;
        this.imageW = imageWalk;
        this.imageS = imageState;
        this.frames = frames;
        this.scale = scale;
        this.tiempo = 0;
        this.tiempox2 = 0;
        this.tiempoEspera = 10;
    }

    moveTo(x, y){
        this.position.x = x;
        this.position.y = y;
    }
    

    draw(){
        this.context.fillStyle = this.fill;
        this.context.drawImage(
            this.image,
            this.tiempo *(this.image.width / this.frames),
            0,
            this.image.width / this.frames,
            this.image.height,
            this.position.x,
            this.position.y,
            (this.image.width / this.frames) * this.scale,
            this.image.height * this.scale
            );
        if(this.punch){
            this.context.fillRect(this.punchArea.position.x, this.punchArea.position.y, this.punchArea.width , this.punchArea.height)
        }
    }

    animate(){
        this.punchArea.position.x = this.position.x - this.valuePrueba;
        this.punchArea.position.y = this.position.y + 15;
        this.gravity();
        this.tiempox2++;
        if(this.tiempox2 % this.tiempoEspera === 0){
            if(this.tiempo < this.frames - 1){
                this.tiempo++;
            } else {
                this.tiempo = 0;
            }
        }
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

        
        if(this.position.y + this.height + this.velocity.y >= this.context.canvas.clientHeight - 50){
            this.velocity.y = 0;
        }else{
            this.velocity.y += this.gravityH;
        }
    }

    punchHit(){
        if(this.lastDirection == "left"){
            this.valuePrueba =  30;
        }
        if(this.lastDirection == "right"){
            this.valuePrueba = 0;
        }
        this.punch = true;
        setTimeout(() =>{
            this.punch = false;
        }, 100)
    }

    powerHit(){
        console.log("lanzo hechizo");
        let power = new Power(
            {position: 
                {
                    x: this.position.x,
                    y: this.position.y + 15
                }
            },
            this.fill,
            this.context,
            80,
            40,
            {velocity: {
                x: 8,
                y: this.velocity.y}
            },
            this.lastDirection,
            {imageSrc :{
                left : this.imagePowerSrc.left,
                right : this.imagePowerSrc.right
            }}
        );
        this.powers.push(power);
    }

    
}