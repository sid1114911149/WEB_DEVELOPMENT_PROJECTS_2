//board
let board;
let boardWidth=600;
let boardHeight=640;
var context;

//bird
let birdwidth=36;
let birdheight=28;
let birdX=boardWidth/8;
let birdY=boardHeight/2;
let birdimg;
let bird={
    x:birdX,
    y:birdY,
    width:birdwidth,
    height:birdheight,
}

//pipes
let pipeArray=[];
let pipeWidth=64;
let pipeHeight=512;
let pipeX=boardWidth;
let pipeY=birdheight;
let TopPipeImg;
let BottomPipeImg

//physics
let velocityX=-2;
let velocityY=0;
let gravity=0.3;
let gameover=false;
let score=0;

//Audio
let gameAud=new Audio();
gameAud.src=("./bgm_mario.mp3");
let finishAud=new Audio();
finishAud.src="./sfx_die.mp3";
let pointAud=new Audio();
pointAud.src="./sfx_point.mp3";
let wingAud=new Audio();
wingAud.src="./sfx_wing.mp3";

window.onload=function(){
    board=document.getElementById("board");
    board.height=boardHeight;
    board.width=boardWidth;
    context=board.getContext("2d");

    birdimg=new Image();
    birdimg.src="./flappybird.png";
    birdimg.onload=function (){
        context.drawImage(birdimg,bird.x,bird.y,bird.width,bird.height);
    }    
    TopPipeImg=new Image();
    TopPipeImg.src="./toppipe.png";
    BottomPipeImg=new Image();
    BottomPipeImg.src="./bottompipe.png";
    requestAnimationFrame(update);
    setInterval(placepipes,1500);
    document.addEventListener("keypress",movebird);
}
function update(){
    if(gameover){
        gameAud.pause();
        finishAud.play();
        return ;
    }
    gameAud.play();
    requestAnimationFrame(update);
    context.clearRect(0,0,boardWidth,boardHeight);
    velocityY+=gravity;
    bird.y=Math.max(velocityY+bird.y,0);
    bird.y+=velocityY;
    context.drawImage(birdimg,bird.x,bird.y,bird.width,bird.height);
    //pipes
    if(bird.y>boardHeight){
        gameover=true;
    }
    let count=0;
    for(let i=0;i<pipeArray.length;i++){
        let pipe=pipeArray[i];
        pipe.x+=velocityX;
        context.drawImage(pipe.img,pipe.x,pipe.y,pipe.width,pipe.height);
        if(!pipe.passed && bird.x>pipe.x+pipe.width){
            score+=0.5;
            pipe.passed=true;
            count++;
        }
        if(count%2==0 && count!=0){
            pointAud.play();
            count=0;
        }
        if(detectcollision(bird,pipe)){
            gameover=true;
        }
    }
    while(pipeArray.length>0 && pipeArray[0].X<-pipeWidth){
        pipeArray.shift();
    }

    context.fillStyle="white";
    context.font="45px sans-serif";
    context.fillText(score,5,45);
    if(gameover){
        context.fillText("GAME OVER",5,90);
    }
}
function placepipes(){
    if(gameover){
        return ;
    }
    let randomPipeY=pipeY-pipeHeight/4-Math.random()*(pipeHeight/2);
    let openingSpace=board.height/4;
    let toppipe={
        img:TopPipeImg,
        x:pipeX,
        y:randomPipeY,
        width:pipeWidth,
        height:pipeHeight,
        passed:false,
    }
    pipeArray.push(toppipe);
    let bottompipe={
        img:BottomPipeImg,
        x:pipeX,
        y:randomPipeY+pipeHeight+openingSpace,
        width:pipeWidth,
        height:pipeHeight,
        passed:false,
    }
    pipeArray.push(bottompipe);
}
function movebird(e){
    if(e.code=="Space" || e.code=="ArrowUp" || e.code=="keyX"){
        velocityY=-4;
        wingAud.play();
        if(gameover){
            bird.y=birdY;
            pipeArray=[];
            score=0;
            gameover=false;
            update();
        }
    }
    
}
function detectcollision(a,b){
    return a.x<b.x+b.width && a.x+a.width>b.x && a.y<b.y+b.height && a.y+a.height>b.y;
}
