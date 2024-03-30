let score = JSON.parse(localStorage.getItem('score')); // after removeItem when this will try to access score object ---> error will occur as there is no score object present. So we have to correct this error, we can do this in following way....
    console.log(score);
    if(score === null){
      score = {
        wins : 0,
        loses : 0, 
        tied : 0
      }
    }

    document.querySelector('.js-score').textContent = `${showScore()}`;

     function pickComputerMove(){
      const randomNumber = Math.round(Math.random()*10)%3 + 1;
      if(randomNumber === 1){
        computerMove = "rock";
      }
      else if(randomNumber === 2){
        computerMove = "paper";
      }
      else{
        computerMove = "scissor";
      }
      return computerMove;
    }

    function giveResult(yourMove){
      const computerMove = pickComputerMove();
      // const message = `you picked ${yourMove}, computer picked ${computerMove}`;
      let result = '';
      if(yourMove === 'rock'){
        if(computerMove === 'rock'){
          score.tied++;
          result = 'Tied';
        }
        else if(computerMove === 'paper'){
          score.loses++;
          result = 'You lose';
        
        }
        else{
          score.wins++;
          result = 'You win';
         
        }
      }

      else if(yourMove === 'paper'){
        if(computerMove === 'rock'){
          score.wins++;
          result = 'You win';
          
        }
        else if(computerMove === 'paper'){
          score.tied++;
          result = 'Tied';
         
        }
        else{
          score.loses++;
          result = 'You lose';
          
        }
      }

      else{
        if(computerMove === 'rock'){
          score.loses++;
          result = 'You lose';
         
        }
        else if(computerMove === 'paper'){
          score.wins++;
          result = 'You win';
         
        }
        else{
          score.tied++;
          result = 'Tied';
         
        }
      }
      localStorage.setItem('score', JSON.stringify(score));
     document.querySelector('.js-score').textContent = `${showScore()}`;
     document.querySelector('.js-result').innerHTML = `${result}`;
     document.querySelector('.js-moves').innerHTML = `You
    <img src="images/${yourMove}-emoji.png" class="move-icon">
    <img src="images/${computerMove}-emoji.png" class="move-icon">
    Computer`;
    }

    // score display

    function showScore(){
      const showScore = `Wins: ${score.wins}, Losses: ${score.loses} , Ties: ${score.tied}`;
      return showScore;
    }

    const rockBtnElmnt = document.querySelector('.js-rock-button');
    const paperBtnElmnt = document.querySelector('.js-paper-button');
    const scissorBtnElmnt = document.querySelector('.js-scissor-button');

    rockBtnElmnt.addEventListener('click',() =>{
      yourMove = 'rock';
      giveResult(yourMove);
    });

    paperBtnElmnt.addEventListener('click',() =>{
      yourMove = 'paper';
      giveResult(yourMove);
    });

    scissorBtnElmnt.addEventListener('click',() =>{
      yourMove = 'scissor';
      giveResult(yourMove);
    });

    document.body.addEventListener('keydown',(event) => {
      if(event.key === 'r'){
        giveResult('rock');
      } else if(event.key === 'p'){
        giveResult('paper');
      } else if(event.key === 's'){
        giveResult('scissor');
      }
    });

    const resetBtnElmnt = document.querySelector(".js-reset-score");
    
    function resetScore(){
      score.wins = 0;
      score.loses = 0;
      score.tied = 0;
      document.querySelector('.js-score').textContent = `${showScore()}`;
      document.querySelector('.js-result').innerHTML = '';
      document.querySelector('.js-moves').innerHTML = '';

      // now when i reset it will work but if i refresh then it will reload previous score from local storage so this is not a good method to reset score 
      // a method to reset score is to use localStorage.removeItem('score');
      localStorage.removeItem('score'); // now this will remove whole score object from local storage so now there is no score object available.
    }

  

    resetBtnElmnt.addEventListener('click' , () => {
      document.querySelector('.js-reset-warning')
      .innerHTML = `Are you sure you want to reset the score? <button class = "yes-button js-yes-button">Yes</button> <button class = "no-button js-no-button">No</button>`;

      document.querySelector(".js-yes-button")
       .addEventListener('click', () => {
        resetScore();
        document.querySelector(".js-reset-warning").innerHTML = '';
       });

       document.querySelector(".js-no-button")
       .addEventListener('click', () => {
        document.querySelector(".js-reset-warning").innerHTML = '';
       })

      //resetScore();
    });

    document.body.addEventListener('keydown', (event) => {
      if(event.key === 'Backspace'){
        resetScore();
      }
    })
    
    /*
    
    document.getElementById("reset-score").onclick = function(){
      score.wins = 0;
      score.loses = 0;
      score.tied = 0;
      document.querySelector('.js-score').textContent = `${showScore()}`;
      document.querySelector('.js-result').innerHTML = '';
      document.querySelector('.js-moves').innerHTML = '';

      // now when i reset it will work but if i refresh then it will reload previous score from local storage so this is not a good method to reset score 
      // a method to reset score is to use localStorage.removeItem('score');
      localStorage.removeItem('score'); // now this will remove whole score object from local storage so now there is no score object available.
    }

    */

    let isAutoPlaying = false;
    let intervalId;
    function autoPlay(){
      if(!isAutoPlaying){
          intervalId = setInterval(() => {
          giveResult(pickComputerMove())
        },1000);
        autoPlayElement.innerHTML = 'Stop playing';
        isAutoPlaying = true;
      } else{
        clearInterval(intervalId);
        autoPlayElement.innerHTML = 'Auto play';
        isAutoPlaying = false;
      }
      
    }

    const autoPlayElement = document.querySelector(".js-autoplay-button");

    /*
    autoPlayElement.onclick = () => {
      if(autoPlayElement.innerHTML === 'Auto play'){
        autoPlay();
        autoPlayElement.innerHTML = 'Stop Play';
      } else {
        autoPlay();
        autoPlayElement.innerHTML = 'Auto play';
      }
    }
    */

    autoPlayElement.addEventListener('click', () => {
      autoPlay();
      /*
      if(autoPlayElement.innerHTML === 'Auto play'){
        autoPlay();
        autoPlayElement.innerHTML = 'Stop Play';
      } else {
        autoPlay();
        autoPlayElement.innerHTML = 'Auto play';
      }
      */
    });

    document.body.addEventListener('keydown',(event) => {
      if(event.key === 'a'){
        autoPlay();
      }
    });
