let button = document.getElementById("button-addon2");
let input = document.getElementById("question");

function askQuestion() {
  let choice1 = document.getElementById("question").value;

  if (
    choice1.toLowerCase().includes("do you") ||
    choice1.toLowerCase().includes("are you")
  ) {
    answer = "I can't answer this question, please try different one";
  } else if (choice1.toLowerCase().includes("love")) {
    answer =
      "Being deeply loved by someone gives you strength, while loving someone deeply gives you courage. You will find your own happiness";
  } else if (choice1.toLowerCase().includes("like me")) {
    answer = "I am sure that everyone likes you";
  } else if (
    choice1.toLowerCase().includes("rich") ||
    choice1.toLowerCase().includes("wealth")
  ) {
    answer =
      "Remember that money is not everything, but if you will work very hard you can be rich";
  } else if (choice1.toLowerCase().includes("money")) {
    answer = "Money can't buy happiness, find your own peace";
  } else if (
    choice1.toLowerCase().includes("job") ||
    choice1.toLowerCase().includes("career")
  ) {
    answer = "Work hard and you will achieve everything what you want to";
  } else if (
    choice1.toLowerCase().includes("die") ||
    choice1.toLowerCase().includes("death") ||
    choice1.toLowerCase().includes("dead")
  ) {
    answer = "Life is short, be happy and live in the moment";
  } else if (choice1.toLowerCase().includes("success")) {
    answer = "I can see you as a successful person in the near future";
  } else if (choice1.toLowerCase().includes("hate")) {
    answer = "Do you really want to know this?";
  } else if (choice1.toLowerCase().includes("family")) {
    answer = "Your family will be very happy if you will be happy";
  } else if (
    choice1.toLowerCase().includes("kids") ||
    choice1.toLowerCase().includes("children") ||
    choice1.toLowerCase().includes("child")
  ) {
    answer = "Future will bring kids and happiness to your life";
  } else if (
    choice1.toLowerCase().includes("husband") ||
    choice1.toLowerCase().includes("wife") ||
    choice1.toLowerCase().includes("marr")
  ) {
    answer = "You will find your second half in next year";
  } else if (choice1.toLowerCase().includes("dream")) {
    answer = "The surest way to make your dreams come true is to live them";
  } else if (
    choice1.toLowerCase().includes("house") ||
    choice1.toLowerCase().includes("home")
  ) {
    answer = "It is a great time to invest in real estate";
  } else if (choice1.toLowerCase().includes("travel")) {
    answer = "Take a gap year and go travel";
  } else if (choice1.toLowerCase().includes("health")) {
    answer =
      "Remember about your mental health, like they saying 'a healthy mind in a healthy body'";
  } else if (choice1.toLowerCase().includes("happ")) {
    answer =
      "Remember, for every minute you are angry you lose sixty seconds of happiness.";
  } else if (choice1.toLowerCase().includes("friend")) {
    answer = "The greatest gift of life is friendship, and I have received it";
  } else if (choice1.toLowerCase().includes("famous")) {
    answer = "If this is what you really want, then yes..";
  } else if (choice1.toLowerCase().includes("do")) {
    answer =
      "Even though this world is narrow, it is wide... to those who understand.";
  } else if (choice1.toLowerCase().includes("ma")) {
    answer =
      "Whether a man is a legend or not is decided by history, not fortune tellers.";
  } else if (choice1.toLowerCase().includes("th")) {
    answer = "Whereof one cannot speak, thereof one must be silent";
  } else if (choice1.toLowerCase().includes("to")) {
    answer =
      "One cannot conceive anything so strange and so implausible that it has not already been said by one philosopher or another";
  } else {
    answer = "Seems like nothing's getting safer or better";
  }
  document.getElementById("msg-cass").innerHTML = answer;
}

function onBtnClick() {
  askQuestion();
}

function onInputKeyPress(event) {
  if (event.keyCode === 13) {
    //debugger;
    askQuestion();

    console.log("clicked");
  }
}
button.addEventListener("click", onBtnClick);
input.addEventListener("keypress", onInputKeyPress);
