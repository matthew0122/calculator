const buttons = Array.from(document.querySelectorAll("button"));
addButtonEvents(buttons);
const mainDisplay = document.getElementById("main-display");
let num1 = "";
let num2 = "";
let operation ="";
let pastOp = "";
let pastnum2 = "";
let evaled = false;
const dot = document.getElementById(".");
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
        if(pastOp != "" && pastnum2 != ""){
            evalPart(pastOp, num1, pastnum2);
            evaled = true;
            mainDisplay.innerText = Math.round(num1*100000)/100000;
            dot.addEventListener("click", numClick);
        }
        return;
    }
    else{
        evalPart(operation, num1, num2);
        dot.addEventListener("click", numClick);
        operation = "";
        num2 = "";
        evaled = true;
        mainDisplay.innerText = Math.round(num1*100000)/100000;
    }
}
function evalPart(operate, number1, number2){
    if (operate == "+"){
        num1 = parseInt(number1)+parseInt(number2);
        pastOp = operate;
        pastnum2 = number2;
    }
    else if (operate == "-"){
        num1 = parseInt(number1)-parseInt(number2);
        pastOp = operate;
        pastnum2 = number2;
    }
    else if (operate == "x"){
        num1 = parseInt(number1)*parseInt(number2);
        pastOp = operate;
        pastnum2 = number2;
    }
    else if (operate == "/"){
        num1 = parseInt(number1)/parseInt(number2);
        pastOp = operate;
        pastnum2 = number2;
    }
}
function operatorClick(button){
    if (button.id=="="){
        evaluateExp();
    }
    else if(num1 != "" && num2 != "" && operation != ""){
        evaluateExp();
        operation = button.id;
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
            button.removeEventListener("click", clicked);
        }
        num1 += button.id;
        mainDisplay.innerText = num1;
    }
    else if(operation === ""){
        if(button.id == "."){
            button.removeEventListener("click", clicked);
        }
        num1 += button.id;
        mainDisplay.innerText = num1;
    }
    else{
        if(button.id == "."){
            button.removeEventListener("click", clicked);
        }
        num2 += button.id;
        mainDisplay.innerText = num2;
    }
}
function clearClick(){
    num1 = "";
    operation = "";
    num2 = "";
    mainDisplay.innerText="";
    evaled = false;
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