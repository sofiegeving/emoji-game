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
var emojis = ['🤑','🙈','👑','🎓','🐨','🍑'];
var pizza = '🍕';

//define state 
var currentRound = 0; 

var startNextRound = function () {
	// round +1 
	currentRound ++;

	// robot and user to be assigned random emojis
	robot.currentEmoji = getRandomEmoji();
	user.currentEmoji = getRandomEmoji();

	console.log('emojis', robot.currentEmoji, 'vs', user.currentEmoji)
};

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

	var snap = false; 
	if (robot.currentEmoji == user.currentEmoji) {
		snap = true; 
	} else if (robot.currentEmoji == pizza) {
		snap = true; 
	} else if (user.currentEmoji == pizza) {
		snap = true;
	}

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

	console.groupEnd();
};





















