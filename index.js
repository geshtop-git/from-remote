let num1 = 0
let num2 = 0
let action =1
let timer = 0;
let correctAns = action ===1? num1 + num2 :  num1  *  num2;

const questionEl = document.getElementById("question");
const inputEl = document.getElementById("input");
const formEl = document.getElementById("form");
const scoreEl = document.getElementById("score");
const timeEL = document.querySelector(".timer")
const status = JSON.parse(localStorage.getItem("status")) || {win:0, lose:0};
let intervalID = null




const initFunction = ()=>{

  // if(!confirm("are you want to continue")){
  //    return
  // }

  num1 = Math.ceil(Math.random() * 10);
  num2 = Math.ceil(Math.random() * 10);
  action = Math.ceil(Math.random() * 2)
  timer = 10;
  correctAns = action ===1? num1 + num2 :  num1  *  num2;

  scoreEl.innerText = `win: ${status.win} lose: ${status.lose}`;
  questionEl.innerText = `What is ${num1} ${action ===1? "+": "*"} ${num2}?`;
  timeEL.innerText = timer


  intervalID = setInterval(()=>{
    timer --;
    timeEL.innerText = timer
    if(timer < 1 ){
      clearInterval(intervalID)
      status.lose++;
      updateLocalStorage();
      initFunction()
    }
  }, 1000)
}


initFunction()

formEl.addEventListener("submit", () => {
  const userAns = +inputEl.value;
  clearInterval(intervalID)
  if (userAns === correctAns) {
    status.win++;
    updateLocalStorage();
  } else {
    status.lose++;
    updateLocalStorage();
  }
 
});


function updateLocalStorage() {
  localStorage.setItem("status", JSON.stringify(status));
}
