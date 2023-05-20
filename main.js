import BackGround from "./js/background.js";
import Enemy from "./js/enemy.js";
import  Player  from "./js/player.js";


let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
//valor de gravedad para asignarlos a los personajes
let gravityH = 0.60;

//creamos un jugador
let player = new Player(
    {position:{
        x:50,
        y:50}
    },
    "green",context,80,160,
    {velocity:{
            x:5,
            y:0
        }
    },gravityH,
    {imagePowerSrc:{
        right: "../image/hadouken.png",
        left: "../image/hadouken2.png"
    }},
    "../image/ryuState.png",
    "../image/ryuWalk.png"
    );


let punchSong = new Audio();
punchSong.src = "songs/punch2.mp3";

let powerSong = new Audio();
powerSong.src = "songs/hadouken.mp3";

let backSong = new Audio();
backSong.src = "songs/Street Fighter II Arcade Music - Guile Stage - CPS1.mp3";

// window.addEventListener('load', function() {
//     backSong.play();
// });


//Creamos un enemigo
let enemy = new Enemy(
    {position:{
        x:300,
        y:50}
    },
    "orange",context,200,200,
    {velocity:{
            x:5,
            y:0
        }
    },gravityH
);
    
//creamos las variables de ambas teclas para mantener un movimiento fluido del personaje
let ArrowLeft = false;
let ArrowRight = false;
//Creamos la variable para determinar donde esta mirando el personaje o fue la ultima direccion
let lastDirection = "right"

//Creamos escuchadores de las teclas de movimiento del personaje
window.addEventListener('keydown', (e)=>{
    if(e.code === "ArrowUp"){
        player.jump();
    }
    if(e.code === "ArrowDown"){
        player.crouch();
    }
    if(e.code === "ArrowLeft"){
        context.clearRect(0, 0, canvas.width, canvas.height);
        ArrowLeft = true;
        player.image.src = player.imageW;
        player.left();
    }
    if(e.code === "ArrowRight"){
        context.clearRect(0, 0, canvas.width, canvas.height);
        ArrowRight = true;
        player.image.src = player.imageW;
        player.right();
    }
    if(e.code === "KeyX"){
        player.punchHit();
        punchSong.play();
    }
    if(e.code === "KeyZ"){
        player.powerHit();
        powerSong.play();
    }
})

//agregamos los escuchadores para setear valores a false cuando se levante la tecla

window.addEventListener('keyup',(e)=>{
    if(e.code === "ArrowUp"){
        
    }
    if(e.code === "ArrowDown"){
        
    }
    if(e.code === "ArrowLeft"){
        context.clearRect(0, 0, canvas.width, canvas.height);
        player.velocity.x = 5;
        ArrowLeft = false;
        player.image.src = player.imageS;
    }
    if(e.code === "ArrowRight"){
        context.clearRect(0, 0, canvas.width, canvas.height);
        ArrowRight = false;
        player.velocity.x = 5;
        player.image.src = player.imageS;
    }
})




let backGround1 = new BackGround(
    {position:{
        x:0,
        y:0
    }}, context, "../image/frente1.png"
)

let backGround2 = new BackGround(
    {position:{
        x:0,
        y:0
    }}, context, "../image/fondo.png"
)




//Hacemos que la funcion se autollame y declaramos los metodos que queremos que se repitan
function animate(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    window.requestAnimationFrame(animate);
    
    //llamamos a la funcion de animacion de todos los personajes
    backGround2.animate();
    backGround1.animate();
    enemy.animate();
    player.animate();

    //Creamos una variable para determinar si hay algun poder que haya tocado al enemigo
    let powerHit = null;


    //Recorremos todos los poderes que el payer haya lanzado
    for(let power of player.powers){
        power.animate(); //Animamos todos los poderes

        if(power.position.x + power.width >= enemy.position.x  //preguntamos si el punto de hit: "x" esta entre el enemigo
        && power.position.x  <= enemy.position.x + enemy.width
        && power.position.y + power.height >= enemy.position.y// preguntamos si el punto de hit: "y" esta entre el enemigo
        && power.position.y <= enemy.position.y + enemy.height){
            //Seteamos el valor del poder que haiga alcanzado al enemigo
            powerHit = power;
        }
        //Quitamos el poder del arreglo de poderes de player
        if(powerHit != null){
            player.powers = player.powers.filter(item => item != powerHit);
            powerHit = null;
        }
    }

    


    //preguntamos si las teclas estan siendo precionadas
    if(ArrowLeft === true){
        player.lastDirection = "left";
        player.left();
    }
    if(ArrowRight === true){
        player.lastDirection = "right";
        player.right();
    }


    if(player.punchArea.position.x + player.punchArea.width >= enemy.position.x  //preguntamos si el punto de hit: "x" esta entre el enemigo
        && player.punchArea.position.x  <= enemy.position.x + enemy.width
        && player.punchArea.position.y + player.punchArea.height >= enemy.position.y// preguntamos si el punto de hit: "y" esta entre el enemigo
        && player.punchArea.position.y <= enemy.position.y + enemy.height
        && player.punch=== true) // de esta manera cuando el enemigo salte, no estara en el punto de hit
    {     
        player.punch = false;
        console.log("hit");
    }
}

animate();