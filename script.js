document.addEventListener("keydown", keyboardEvents)
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
    if(this.id == "negative"){
      if(num1 == mainDisplay.innerText){
        num1 *= -1;
        mainDisplay.innerText = num1;
      }
      else if(num2 == mainDisplay.innerText){
        num2 *= -1;
        mainDisplay.innerText = num2;
      }  
    }
    if(this.id == "percent"){
        if(num1 == mainDisplay.innerText){
            num1 = Math.round(num1*100)/10000;
            mainDisplay.innerText = num1;
          }
          else if(num2 == mainDisplay.innerText){
            num2 = Math.round(num2*100)/10000;
            mainDisplay.innerText = num2;
          }  
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
    if(num1 == ""){
        return false;
    }
    if(num2 == "" && operation == ""){
        if(pastOp != "" && pastnum2 != ""){
            evalPart(pastOp, num1, pastnum2);
            evaled = true;
            mainDisplay.innerText = num1;
            if (num1.length > 13){
                mainDisplay.innerText = `OVERFLOW ERROR`;
                num1 = "";
                num2= "";
                num3="";
                evaled = false;
            }
            return true;
        }
        return false;
    }
    else if (num2 == "" || operation == ""){
        return false;
    }
    else{
        evaled = evalPart(operation, num1, num2);
        operation = "";
        num2 = "";
        
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
        if(number2 != 0){
            num1 = ""+Math.round((parseFloat(number1)/parseFloat(number2))*10000)/10000;
            pastOp = operate;
            pastnum2 = number2;
        }
        else{
            alert("You cannot divide by zero");
            return false;
        }
        
    }
    return true;
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
    else if(operation === "" && !evaled){
        if(button.id == "."){
            if(!num1.includes(".")){
                num1+= ".";
            }
        }
        else{
            num1 += button.id;
        }
        mainDisplay.innerText = num1;
    }
    else if(operation != ""){
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
    pastOp="";
    pastnum2="";
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
function keyboardEvents(e){
    let name = e.key;
    let buttonEquiv = document.getElementById(name);
    if(name == "Enter"){
        buttonEquiv = document.getElementById("=");
    }
    if(buttonEquiv != null){
        if(buttonEquiv.classList.contains("number")){
            numClick(buttonEquiv);
        }
        else if (buttonEquiv.classList.contains("operation")){
            operatorClick(buttonEquiv);
        }
        if (buttonEquiv.id == "clear"){
            clearClick();
        }
        if(buttonEquiv.id == "Backspace"){
            deleteDigit();
        }
    }
    else{
        console.log(name);
    }
}
