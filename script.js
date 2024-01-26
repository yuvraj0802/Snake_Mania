// Game constansts and variables

let inputdir = {x:0,y:0} 
let speed = 8;
let score = 0;

// let hiscoreval;
let lastpainttime = 0;
let snackearr = [
    {
        x: 13 , y: 15
    } 
]
let food = {x:6 , y:7}

//function
function main(ctime){
    window.requestAnimationFrame(main);
    //console.log(ctime);
    if((ctime-lastpainttime)/1000 < 1/speed){
        return;
    }
    lastpainttime = ctime;
    gameEngine();
}

function iscollide(snacke){
    
    for(let i=1;i<snacke.length;i++){

        // if you bumb to yourself
        if(snacke[i].x === snacke[0].x && snacke[i].y === snacke[0].y ){
            return true;
        }
    }
    // if collide with wall

    if(snacke[0].x > 20 || snacke[0].x < 0 || snacke[0].y > 20 || snacke[0].y < 0){
        return true;
    }


}

function gameEngine(){
    //part 1: updating the snacke variable 

    if(iscollide(snackearr)){
        inputdir = {x:0,y:0}
        alert("game over press any key to start again");
        snackearr = [
            {
                x: 14 , y: 16
            }
        ]
        scorebox.innerHTML = "Score :" + 0;
    }


    // if you have eat the food increment the the snacke and regenrate the food

    if(snackearr[0].y === food.y && snackearr[0].x === food.x){
         score += 1;
        if(score > hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscorebox.innerHTML = "HiScore: " + hiscoreval;
        }
        scorebox.innerHTML= "Score :" + score;
        snackearr.unshift({x: snackearr[0].x + inputdir.x  ,  y: snackearr[0].y + inputdir.y})
        let a = 0;
        let b = 20;
        food = {x: Math.round(a+(b-a)*Math.random()), y: Math.round( a+(b-a) * Math.random() ) }
    }


    // Moving the snacke
    for(let i = snackearr.length - 2 ; i>= 0 ; i --){
        snackearr[i+1] = {...snackearr[i]};
    }

    snackearr[0].x += inputdir.x;
    snackearr[0].y += inputdir.y; 



    //part 2: display the snacke and food
    board.innerHTML = "";

    //display the snacke
    snackearr.forEach((e, index )=>{
        snackeElement = document.createElement('div');
        snackeElement.style.gridRowStart = e.y;
        snackeElement.style.gridColumnStart = e.x;
        if(index == 0){
            snackeElement.classList.add('head');
        }
        else{
            snackeElement.classList.add('snacke');
        }
        board.appendChild(snackeElement);
    })

    //display the food
    
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);  

}


//Main logic

let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscorebox.innerHTML = "HiScore: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown',(e)=>{
    inputdir = {x:0,y:1}
   // movesound.play();

    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputdir.x = 0;
            inputdir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputdir.x = 0;
            inputdir.y = 1;
            break;
                
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputdir.x = -1;
            inputdir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputdir.x = 1;
            inputdir.y = 0;
            break;
    
        default:
            break;
    }
})

