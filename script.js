// settings 
var roundsToWin = 3; 
var countdownFrom = 5;
var newRoundStartsIn = 6000; 
var newRoundStartsInFromSnap = 4000; 
var robotCallsIn = 2000; 
var countdownSpeed = 500;

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
var pizza = '🍕';

//define state 
var currentRound = 0; 
var count = countdownFrom; 

var start = function() {
	countdown();
}

var countdown = function () {
	console.clear();
	if (count != 0) {
		console.log('count', count);
	}

	if (count <= 0) {
		count = countdownFrom;
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

	// robot and user to be assigned random emojis
	robot.currentEmoji = getRandomEmoji();
	user.currentEmoji = getRandomEmoji();

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

	console.group('Snap called by: '+ (robotCalledSnap ? 'Robot' : 'User'));

	//robot called 
	if (robotCalledSnap) {
		if (snap) {
			robot.roundsWon ++;
			console.log('robot won the round')
		} else {
			user.roundsWon ++;
			console.log('robot lost the round')
		}
	
	//user called
	} else {
		if (snap) {
			user.roundsWon ++;
			console.log('you won the round')
		} else {
			robot.roundsWon ++;
			console.log('you lost the round')
		}
	}

	console.log('user: ', user.roundsWon, 'Robot: ', robot.roundsWon)

	robot.currentEmoji = undefined;
	user.currentEmoji = undefined;

	if (user.roundsWon == roundsToWin) {
		console.log('you won the game!!')
		console.log('game over')
	}	else if (robot.roundsWon == roundsToWin) {
		console.log('robot won the game!!')
		console.log('game over')
	} else {
		newRoundTimer = setTimeout(countdown, newRoundStartsInFromSnap);
	}



	console.groupEnd();
};





















