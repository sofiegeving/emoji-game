// settings 
var roundsToWin = 1; 
var countdownFrom = 3;
var newRoundStartsIn = 4000; 
var newRoundStartsInFromSnap = 4000; 
var robotCallsIn = 2000; 
var countdownSpeed = 500;
var noticeShowTime = 1200;
var noticeDelay = 1000;

// timers
var newRoundTimer = undefined; 
var robotCallSnapTimer = undefined; 
var countdownTimer = undefined;

// define players
var user = {
	name: 'user',
	roundsWon: 0, 
	currentEmoji: undefined
};
var robot = {
	name: 'robot',
	roundsWon: 0, 
	currentEmoji: undefined
};

//define the emojis 
var emojis = ['🤑','🙈','👑','🎓','🍕','🍑'];
var startingEmoji = '❤️'
var pizza = '🍕';

//define state 
var currentRound = 0; 
var count = countdownFrom; 
var gameStarted = false;

// HTML stuff 
var instructions = document.getElementById('instructions');
var countdownNode = document.getElementById('countdown');
var resetBtn = document.getElementById('reset-btn');
var userEmojiNode = document.getElementById('user-emoji');
var robotEmojiNode = document.getElementById('robot-emoji');
var noticeNode = document.getElementById('notice');
var currentRoundNode = document.getElementById('current-round');
var roundsToWinNode = document.getElementById('rounds-to-win');
var pizzaSliceNode = document.getElementById('pizza-slice');
var userScoreNode = document.getElementById('user-score');
var robotScoreNode = document.getElementById('robot-score');



// Event listeners 
resetBtn.addEventListener('click', function () {
	init();
	start();
})

//do some initial stuff
userEmojiNode.innerText = startingEmoji;
robotEmojiNode.innerText = startingEmoji;
roundsToWinNode.innerText = roundsToWin;
pizzaSliceNode.innerText = pizza;

var init = function () {
	robot.roundsWon = 0; 
	user.roundsWon = 0; 
	userEmojiNode.innerText = startingEmoji;
	robotEmojiNode.innerText = startingEmoji;
	roundsToWinNode.innerText = roundsToWin;
	pizzaSliceNode.innerText = pizza;
	currentRound = 0;

	currentRoundNode.innerText = currentRound;
	noticeNode.innerText = '';
	userScoreNode.innerText = 0; 
	robotScoreNode.innerText = 0; 

}

init();

var start = function() {
	init();
	countdown();

	//Change the interface 

	resetBtn.classList.add('hide');
	instructions.classList.add('hide');
	if (!gameStarted) {
		gameStarted = true;
		setTimeout(function () {
			instructions.parentNode.removeChild(instructions);
			gameStarted = true;
		}, 510)
		setTimeout(function () {

		}, 510)
	}
	
	setTimeout(function () {
		resetBtn.classList.add('none');
	}, 510)
}

var countdown = function () {
	if (count != 0) {
		console.log('count', count);
		countdownNode.innerText = count;
		countdownNode.classList.remove('hide');
	}

	if (count <= 0) {
		count = countdownFrom;
		countdownNode.classList.add('hide');
		startNextRound();
		return; 
	} else {
		countdownTimer = setTimeout(countdown, countdownSpeed);
	}

		count --;
};

var startNextRound = function () {
	// round +1 
	currentRound ++;

	console.log('Round', currentRound);
	currentRoundNode.innerText = currentRound;

	// robot and user to be assigned random emojis
	robot.currentEmoji = getRandomEmoji();
	user.currentEmoji = getRandomEmoji();
	userEmojiNode.innerText = user.currentEmoji;
	robotEmojiNode.innerText = robot.currentEmoji;

	// robot calls snap 
	if (isAMatch()) {
		robotCallSnapTimer = setTimeout(function () {
			snap(true);
		}, robotCallsIn);
	}

	newRoundTimer = setTimeout(countdown, newRoundStartsIn);

	console.log('emojis', robot.currentEmoji, 'vs', user.currentEmoji)
};

var isAMatch = function () { 
	if (robot.currentEmoji == pizza || user.currentEmoji == pizza) {
		return true; 
	}
	return robot.currentEmoji == user.currentEmoji;
}

var getRandomEmoji = function () {
	var randomNumber = Math.round(Math.random() * (emojis.length-1));
	var randomEmoji = emojis[randomNumber]

	return randomEmoji;
};

var createNewNotice = function (noticeText, persist, delay) {
	var newNotice = document.createElement('div');
	newNotice.innerHTML = '<span>' + noticeText + '</span>';
	newNotice.classList.add('hide');

	if (!delay) delay = 0;


	noticeNode.appendChild(newNotice);
	setTimeout(function () {
			newNotice.classList.remove('hide');
	}, 10+delay);

	if (!persist) {
		setTimeout(function () {
			newNotice.classList.add('hide');
			setTimeout(function () {
				noticeNode.removeChild(newNotice);
		 	}, 260);
		}, noticeShowTime+delay);
	}
}

var snap = function (robotCalledSnap) {
	// compare between the two emojis 
	// if it is the pizza then snap is true 
	// if snap is true then the user/robot gets +1 to roundsWon 
	// if user gets it wrong then robot gets +1 to roundsWon 
	// notification of what happened - console/ui/html 

	//check for undefined emojis 
	if (robot.currentEmoji == undefined || user.currentEmoji == undefined) {
		return false;
	}


	clearTimeout(newRoundTimer);

	var snap = isAMatch();
	
	createNewNotice('SNAP! by '+(robotCalledSnap ? '🤖' : '👩🏽'));
	console.group('Snap called by: '+ (robotCalledSnap ? 'Robot' : 'User'));

	//robot called 
	if (robotCalledSnap) {
		if (snap) {
			robot.roundsWon ++;
			console.log('robot won the round')
			robotScoreNode.innerText = robot.roundsWon;
			createNewNotice('🤖 won the round! 💯', false, noticeDelay);

		} else {
			user.roundsWon ++;
			console.log('robot lost the round')
			userScoreNode.innerText = user.roundsWon;
			createNewNotice('🤖 lost the round! 😢', false, noticeDelay);
		}
	
	//user called
	} else {
		if (snap) {
			user.roundsWon ++;
			userScoreNode.innerText = user.roundsWon;
			console.log('you won the round')
			createNewNotice('👩🏽 won the round! 💯', false, noticeDelay);
		} else {
			robot.roundsWon ++;
			robotScoreNode.innerText = robot.roundsWon;
			console.log('you lost the round')
			createNewNotice('👩🏽 lost the round! 😢', false, noticeDelay);
		}
	}

	console.log('user: ', user.roundsWon, 'Robot: ', robot.roundsWon)

	robot.currentEmoji = undefined;
	user.currentEmoji = undefined;

	var whenWon = function () {
		resetBtn.classList.remove('none');
		resetBtn.classList.remove('hide');
		snapBtn.classList.add('hide');
		setTimeout(function() {
			snapBtn.classList.add('none');
		}, 250);
	}

	if (user.roundsWon == roundsToWin) {
		console.log('you won the game!!')
		console.log('game over')
		createNewNotice('👩🏽 won the game 🎉', true, noticeDelay*2);
		whenWon();
	}	else if (robot.roundsWon == roundsToWin) {
		console.log('robot won the game!!')
		console.log('game over')
		createNewNotice('🤖 won the game 😭', true, noticeDelay*2);
		whenWon();
	} else {
		newRoundTimer = setTimeout(countdown, newRoundStartsInFromSnap);
	}



	console.groupEnd();
};





















