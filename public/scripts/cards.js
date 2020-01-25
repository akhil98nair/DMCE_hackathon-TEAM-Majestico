function getRandomSentence() {
  let sentence = [
    "You will win a lot of money",
    "Your road to glory will be rocky, but fulfilling",
    "Someone is looking up to you. Don't let this person down.",
    "The fortune you seek is on another card.",
    "You will die alone and poorly dressed.",
    "If you look back, you'll soon be going that way.",
    "You will live long enough.",
    "The greatest danger could be your stupidity.",
    "The world may be your oyster, but it doesn't mean you'll get its pearl.",
    "Don't behave with cold manners and people will like you much more.",
    "It is a good day to have a good day.",
    "Someone will invite you to a Karaoke party, you should go.",
    "Hard work pays off in the future. Laziness pays off now.",
    "Don't be affraid of change. ",
    "Today it's up to you to create the peacefulness you long for.",
    "If you have something good in your life, don't let it go!",
    "You cannot love life until you live the life you love.",
    "You already know the answer to the questions lingering inside your head.",
    "Go for it now. The future is promised to no one.",
    "Quit your job and travel the world",
    "Don't listen to fools",
    "The future belongs to those who believe in the beauty of their dreams.",
    "If you want to be happy, do not dwell in the past.",
    "Knowing too much of your future is never a good thing.",
    "The future depends on what you do today",
    "No matter how dirty your past is, your future is still spotless.",
    "The only thing we know about the future is that it will be different.",
    "You cannot change your future. But you can change your habits."
  ];

  let randomSentence = sentence[Math.floor(Math.random() * sentence.length)];
  return randomSentence;
}

function getSentenceOnFlip(id1, id2) {
  document.getElementById(id1).onmouseover = function() {
    document.getElementById(id2).innerHTML = getRandomSentence();
  };
}

getSentenceOnFlip("card1", "msg1");
getSentenceOnFlip("card2", "msg2");
getSentenceOnFlip("card3", "msg3");
getSentenceOnFlip("card4", "msg4");
getSentenceOnFlip("card5", "msg5");
getSentenceOnFlip("card6", "msg6");
