/************************************
GAME RUELS:

- 2 player game, playing over rounds
- Each turn, a player is able to roll the dice as many times as he wishes. Each result gets added to his score for that ROUND
- BUT, if the player rolls a 1, that player will lose their entire score for that ROUND. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*************************************/
/************************************
CODING CHALLENGE: Modify the game rules
1. Players lose their ENTIRE score if they roll two 6s in a row as well as their turn.
2. Add an input field to the HTML so players can set the winning score of their choosing.
3. Add a second dice to the game. Player will continue to lose his current score if one of dice rolls a 1.
*************************************/

var scores, roundScore, activePlayer, gamePlaying;
init();

// NAMED FUCNTION
//function btn() {
//  Do something here
//}
//btn();
//document.querySelector('.class').addEventListener('click', btn);

// ANONYMUS FUNCTION
    //var lastDice;
    document.querySelector('.btn-roll').addEventListener('click', function() {


        if(gamePlaying) {
            // 1. Random Number
            var dice1 = Math.floor(Math.random()*6)+1;
            var dice2 = Math.floor(Math.random()*6)+1;
            // 2. Display the result
            document.querySelector('#dice-1').style.display = 'block';
            document.querySelector('#dice-2').style.display = 'block';
            document.querySelector('#dice-1').src = '_assets/dice-'+dice1+'.png';
            document.querySelector('#dice-1').src = '_assets/dice-'+dice2+'.png';
                //var diceDom1 = document.querySelector('#dice-1');
                //var diceDom2 = document.querySelector('#dice-2');
                //diceDom1.style.display = 'block';
                //diceDom2.style.display = 'block';
                //diceDom1.src = '_assets/dice-'+dice1+'.png';
                //diceDom2.src = '_assets/dice-'+dice2+'.png';
            // 3. Update the round score If the rolled number was NOT a 1
            //if (dice === 6 && lastDice === 6) {
            if (dice1 === 6 && dice2 === 6) {
                //Player looses score
                scores[activePlayer] = 0;
                document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];
                nextPlayer();
            } else if (dice1 !== 1 && dice2 !== 1 ) {
                //Add score
                roundScore+=dice1+dice2;
                document.querySelector('#current-'+activePlayer).textContent = roundScore;
            } else {
                nextPlayer();
            }
            //lastDice = dice;
        }
    });

    document.querySelector('.btn-hold').addEventListener('click', function() {
        if (gamePlaying) {
            // Add Current score to Global score
            scores[activePlayer] += roundScore;
            // Update the UI
            document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];
            var scoreInput = document.querySelector('.final-score').value;
            var winningScore;
                // undefined, 0, null or "" are COERCED to false
                // Anything else is COERCED to true
            if (scoreInput) {
                winningScore = scoreInput;
            } else {
                winningScore = 100;
            }
            // Check if player won the game
            if (scores[activePlayer] >= winningScore) {
                document.querySelector('#name-'+activePlayer).textContent = 'Winner';
                document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
                document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
                document.querySelector('#dice-1').style.display = 'none';
                document.querySelector('#dice-2').style.display = 'none';
                gamePlaying = false;
            } else {
                // Next Player
                nextPlayer();
            }        
        }                                        
    });
    function nextPlayer() {
        // Next Player
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        //if(activePlayer === 0 ) {
        //    activePlayer = 1;        
        //} else {
        //    activePlayer = 0;
        //}
        roundScore = 0;

        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        //document.querySelector('.player-0-panel').classList.remove('active');
        //document.querySelector('.player-1-panel').classList.add('active');

        //document.querySelector('.dice').style.display = 'none';
    }

    document.querySelector('.btn-new').addEventListener('click', init);

    function init() {
        scores = [0,0];
        roundScore = 0;
        activePlayer = 0;
        gamePlaying = true;
        document.querySelector('#dice-1').style.display = 'none';
        document.querySelector('#dice-2').style.display = 'none';
        document.getElementById('score-0').textContent = '0';
        document.getElementById('score-1').textContent = '0';
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        document.querySelector('#name-0').textContent = 'Player 0';
        document.querySelector('#name-1').textContent = 'Player 1';
        document.querySelector('.player-0-panel').classList.remove('winner');
        document.querySelector('.player-1-panel').classList.remove('winner');
        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.player-1-panel').classList.remove('active');
        document.querySelector('.player-0-panel').classList.add('active');
    };
//document.querySelector('#current-'+activePlayer).textContent = dice;
//document.querySelector('#current-'+activePlayer).innerHTML = '<em>'+dice+'<em>';
//var x = document.querySelector('#score-0').textContent;