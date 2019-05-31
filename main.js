var paperIcon = 'https://goodday451999.github.io/Rock-Paper-Scissors-Neo/images/paper.png';
var rockIcon = 'https://goodday451999.github.io/Rock-Paper-Scissors-Neo/images/stone.png';
var scissorsIcon = 'http://chittagongit.com/images/rock-paper-scissors-icon/rock-paper-scissors-icon-5.jpg';
var numberOfGames;
var total_player_wins = 0;
var gamesPlayed = 0;
var cWins = 0;
var pWins = 0;
var totalGamesPlayed = 0;

$(document).ready(function(){
  $('#start_game').on('click', function(){
    numberOfGames = parseInt($('#games').val());
    if ($('#games').val() == ''){
      alert('You need to enter how many games you want to play!')
      // DO SOMETHING TO NOT LET GAME CONTINUE;
    }else ;
    $('#start').addClass('hidden')
    $('#game_play_container').slideToggle().removeClass('hidden');
    $('#score_card').slideToggle().removeClass('hidden');
    setTimeout(() => {
      $('#restart').removeClass('hidden');
    }, 1000);
  });
  
  $('#restart_button').on('click', restartGame)
  
  function restartGame(){
    numberOfGames;
    cWins = 0;
    pWins = 0;
    $('#start').removeClass('hidden')
    $('#game_play_container').slideToggle().addClass('hidden');
    $('#score_card').slideToggle().addClass('hidden');
    $('#restart').addClass('hidden');
    $('#all_computer_wins').text('');
    $('#all_user_wins').text('');
    $('#user_win_rate').text('');
  };
  
  $('.game_button').on('click', function(){
    var playerSelection = this.id
    if (playerSelection == 'paper')
      playerSelection = paperIcon;
    else if (playerSelection == 'rock')
      playerSelection = rockIcon;
    else playerSelection = scissorsIcon;
    $('#user_play').append(`<img src="${playerSelection}" class="played_icons">`)
    playerSelection = this.id;
    playGame(playerSelection);
    $('.game_button').off('click', arguments.callee)
    setTimeout(() => {
      $('.game_button').on('click', arguments.callee)
    }, 2000);
  });
  
  function computerPlay(){
    var computerChoice = ['rock', 'paper', 'scissors'][Math.floor(Math.random() * 3)];
    if (computerChoice == 'rock')
      printComputerChoice = rockIcon;
    else if (computerChoice == 'paper')
      printComputerChoice = paperIcon;
    else printComputerChoice = scissorsIcon;
    $('#computer_play').append(`<img src="${printComputerChoice}" class="played_icons">`)
    console.log(computerChoice);
    return computerChoice;
  }

  function playGame(playerSelection) {
    totalGamesPlayed += 1;
    var computerChoice = computerPlay();
    if (playerSelection == computerChoice) {
        writeGameResults('draw');
    } else if (playerSelection == 'rock' && computerChoice == 'paper' 
            || playerSelection == 'scissors' && computerChoice == 'rock' 
            || playerSelection == 'paper' && computerChoice == 'scissors') {
        writeGameResults('computer');
      }else writeGameResults('player');
  }

  function writeGameResults(winner) {
    if (winner == 'computer'){
      $('#results').append('<p id="computer_win"> Computer Wins, Better luck next time</p>')
      cWins += 1
      gamesPlayed += 1;
    }else if (winner == 'player'){

      $('#results').append('<p id="player_win"> You Win, have a beer</p>')
      pWins += 1
      gamesPlayed += 1;
      total_player_wins += 1
    }else
      $('#results').append('<p id="draw">It\'s a draw. Sad') ;

      writeToTally(cWins, pWins);
      setTimeout(() => {
      (gamesPlayed == numberOfGames) ? gameOver() : null;
      $('#results').children().remove();
      $('#user_play').children().remove();
      $('#computer_play').children().remove();
    }, 2000);
  };

function writeToTally(cWins, pWins){
  var user_win_rate = (total_player_wins / totalGamesPlayed)*100;
  $('#all_computer_wins').text(`Computer Wins: ${cWins}`)
  $('#all_user_wins').text(`User Wins: ${pWins}`)
  user_win_rate == NaN ? $('#user_win_rate').text(`Win Rate: 0%`): $('#user_win_rate').text(`Player winning rate: ${user_win_rate.toFixed(0)}%`);
}

function gameOver(){
  restartGame()
  alert("game over")
}

});