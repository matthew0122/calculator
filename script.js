const buttons = Array.from(document.querySelectorAll("button"));
addButtonEvents(buttons);

function clicked(e){
    console.log(e);
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