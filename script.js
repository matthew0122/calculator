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
    if (this.id == "clear"){
        clearClick();
    }
    if(this.id == "backspace"){
        deleteDigit();
    }
    
}
function deleteDigit(){
    let num = "";
        if(num2 != ""){
            for (let i = 0; i < num2.length-1; i++){
                num += num2[i];
                console.log(num);
            }
            num2=num;
            mainDisplay.innerText=num2;
        }
        else{
            if(!evaled){
                for (let i = 0; i < num1.length-1; i++){
                    num += num1[i];
                    console.log(num);
                }
                num1=num;
                mainDisplay.innerText=num1;
            }
            
        }
}
function evaluateExp(){
    if(num1 == "" || num2 == "" || operation == ""){
        if(pastOp != "" && pastnum2 != ""){
            evalPart(pastOp, num1, pastnum2);
            evaled = true;
            mainDisplay.innerText = num1;
            if (num1.length > 13){
                mainDisplay.innerText = `OVERFLOW ERROR`;
                num1 = "";
                num2= "";
                num3="";
            }
            return true;
        }
        return false;
    }
    else{
        evalPart(operation, num1, num2);
        operation = "";
        num2 = "";
        evaled = true;
        
        mainDisplay.innerText = num1;
        return true;
    }
}
function evalPart(operate, number1, number2){
    if (operate == "+"){
        num1 = ""+Math.round((parseFloat(number1)+parseFloat(number2))*10000)/10000;
        pastOp = operate;
        pastnum2 = number2;
    }
    else if (operate == "-"){
        num1 = ""+Math.round((parseFloat(number1)-parseFloat(number2))*10000)/10000;
        pastOp = operate;
        pastnum2 = number2;
    }
    else if (operate == "x"){
        num1 = ""+Math.round((parseFloat(number1)*parseFloat(number2))*10000)/10000;
        pastOp = operate;
        pastnum2 = number2;
    }
    else if (operate == "/"){
        num1 = ""+Math.round((parseFloat(number1)/parseFloat(number2))*10000)/10000;
        pastOp = operate;
        pastnum2 = number2;
    }
}
function operatorClick(button){
    if (button.id=="="){
        if(evaluateExp()){
            dot.addEventListener("click", clicked);
        }
    }
    else if(num1 != "" && num2 != "" && operation != ""){
        evaluateExp();
        operation = button.id;
        dot.addEventListener("click", clicked);
    }
    else if(num1 == "" || operation != ""){
        return;
    }
    else{
        operation = button.id;
        dot.addEventListener("click", clicked);
    }
}
function numClick(button){
    if(num1 === ""){
        if(button.id == "."){
            dot.removeEventListener("click", clicked);
        }
        num1 += button.id;
        mainDisplay.innerText = num1;
    }
    else if(operation === ""){
        if(button.id == "."){
            dot.removeEventListener("click", clicked);
        }
        num1 += button.id;
        mainDisplay.innerText = num1;
    }
    else{
        if(button.id == "."){
            dot.removeEventListener("click", clicked);
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