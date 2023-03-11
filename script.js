const buttons = Array.from(document.querySelectorAll("button"));
addButtonEvents(buttons);
const mainDisplay = document.getElementById("main-display");
let num1 = "";
let num2 = "";
let operation ="";

function clicked(e){
    if(this.classList.contains("number")){
        numClick(this);
    }
    
}
function numClick(button){
    if(num1 === ""){
        if(button.id == "."){
            console.log(button);
            button.removeEventListener("click", clicked);
        }
        num1 += button.id;
        mainDisplay.innerText = num1;
    }
    else if(operation === ""){
        if(button.id == "."){
            console.log(button);
            button.removeEventListener("click", clicked);
        }
        num1 += button.id;
        mainDisplay.innerText = num1;
    }
    else{
        if(button.id == "."){
            console.log(button);
            button.removeEventListener("click", clicked);
        }
        num2 += button.id;
        mainDisplay.innerText = num2;
    }
}
function clearClick(){

}
function hovered(e){
    this.classList.add("hovered");
}
function unhovered(e){
    this.classList.remove("hovered");
}
function addButtonEvents(arr){
    for(let i = 0; i < arr.length; i++){
        arr[i].addEventListener("click", clicked);
        arr[i].addEventListener("mouseenter", hovered);
        arr[i].addEventListener("mouseleave", unhovered);
    }
}