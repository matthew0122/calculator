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
    else if (this.classList.contains("operation")){
        operatorClick(this);
    }
    
}
function evaluateExp(){
    if(num1 == "" || num2 == "" || operation == ""){
        return;
    }
    else{
        if (operation == "+"){
            num1 = parseInt(num1)+parseInt(num2);
        }
        else if (operation == "-"){
            num1 = parseInt(num1)-parseInt(num2);
        }
        else if (operation == "x"){
            num1 = parseInt(num1)*parseInt(num2);
        }
        else if (operation == "/"){
            num1 = parseInt(num1)/parseInt(num2);
        }
        operation = "";
        num2 = "";
        mainDisplay.innerText = num1;
    }
}
function operatorClick(button){
    if (button.id=="="){
        evaluateExp();
    }
    else if(num1 == "" || operation != ""){
        return;
    }
    else{
        operation = button.id;
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