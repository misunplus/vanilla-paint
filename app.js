const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColors");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");



function getToday(){
    const day = new Date();
    const ss = day.getSeconds();
    const mi = day.getMinutes();
    const hh = day.getHours();
    const dd = day.getDate();
    const mm = day.getMonth();
    const yyyy = day.getFullYear();
    const toDay = `${yyyy}${mm <10 ? `0${mm}`:mm}${dd < 10 ? `0${dd}` : dd}${hh < 10 ? `0${hh}` : hh}${mi < 10 ? `0${mi}` : mi}${ss < 10 ? `0${ss}` : ss}`
    console.log(toDay);
    return toDay;
}


const INITIAL_COLOR = "2c2c2c";
const CANVAS_SIZE = 700;


canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

//캔버스 베이스 색상 설정
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// 선과 페인트 기본설정
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

//마우스 움직일때
function onMouseMove(event){
    const x =event.offsetX;
    const y =event.offsetY;

    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    
    }else{
        ctx.lineTo(x, y);
        ctx.stroke();
     
    }
}


function handleColorclick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
    console.log(event.target.value);
}

function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill"
    } else {
        filling = true;
        mode.innerText = "Paint";
            
    }

}

function handleCanvasClick() {
    if(filling){
        ctx.fillRect(0, 0, canvas.width, canvas.height);

    }
}

function handleCM(event){
    event.preventDefault();
}

function handleSaveClick(){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = getToday();
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    //우클릭 방지
    canvas.addEventListener("contextmenu", handleCM);
}


// array.from메소드는 object로부터 array를 만듬
// Array.from(colors) 안에서 forEach로 color를 얻음

// forEach()메소드는 배열의 각 요소에 대해 순서대로 함수를 한 번 호출
// 화살표 함수 왼쪽 괄호에 사용할 매개변수를, 오른쪽 괄호에는 실행 문장을 넣습니다.

//addEventListener()는 지정한 이벤트가 대상에 전달 될 때마다 호출 함수(핸들러)입니다. 
//addEventListener(type, listener <handleColorclick>, options);

//array를 만들고 foreach로 color를 돌려서 addEventListener("click",handleColorclick)호출 
Array.from(colors).forEach(color =>color.addEventListener("click",handleColorclick));

if(range){
    range.addEventListener("input", handleRangeChange)
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
     saveBtn.addEventListener("click", handleSaveClick);
 }