import Power from "./power.js";

export default class Player {
    constructor({position}, fill, context,  width, height, {velocity},gravityH){
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
            width:  80,
            height: 40
        };
        this.punch = false;
        this.lastDirection = "right";
        this.valuePrueba = 0;
        this.powers = [];
    }

    moveTo(x, y){
        this.position.x = x;
        this.position.y = y;
    }
    

    draw(){
        this.context.fillStyle = this.fill;
        this.context.fillRect(this.position.x, this.position.y, this.width, this.height);
        if(this.punch){
            this.context.fillRect(this.punchArea.position.x, this.punchArea.position.y, this.punchArea.width , this.punchArea.height)
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

        
        if(this.position.y + this.height + this.velocity.y >= this.context.canvas.clientHeight){
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
                    y: this.position.y
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
            this.lastDirection
        );
        this.powers.push(power);
    }

    animate(){
        this.punchArea.position.x = this.position.x - this.valuePrueba;
        this.punchArea.position.y = this.position.y;
        this.gravity();
        
    }
}