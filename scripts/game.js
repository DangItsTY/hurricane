var gameRestartReady = false;
function game() {
	if (gameState == "start") {
		gameStart();
	} else if (gameState == "play") {
		gamePlay();
	} else if (gameState == "over") {
		gameOver();
	} else {
		runGravity(theObjects);
		runFriction([thePlayer]);
		runFall(theObjects);
		applyVerticalWind(thePlayer);
		runPlayer(thePlayer);
		runCollidePlatform(thePlayer, theObjects);
		runClean(theObjects);
	}
}

function gameStart() {
	thePlayer = makePlayer();
	thePlayer.x = 400;
	thePlayer.y = 0;
	theObjects.push(thePlayer);
	renderAttach([thePlayer]);
	makeBigFloor();
	makeStartObject();
	gameState = "start_";
}

function gamePlay() {
	gameTimer = setInterval(gameTime, 250);
	//dropTimer = setInterval(dropPlatform, 3000);	//250
	//dropEnemyTimer = setInterval(dropEnemy, 2000);
	//dropRewardTimer = setInterval(dropReward, 2000);
	spawnParticleTimer = setInterval(spawnParticle, 500);
	document.getElementById("startOverlay").style.display = "none";
	gameState = "play_";
	theObjects = [];
	mainElement.innerHTML = '';
	
	thePlayer = makePlayer();
	thePlayer.x = 400;
	thePlayer.y = 0;
	theObjects.push(thePlayer);
	renderAttach([thePlayer]);

	var newObject = makePlatform('log');
	newObject.x = 400;
	newObject.y = 0;
	newObject.width = 50;
	newObject.element.style.width = newObject.width + "px";
	theObjects.push(newObject);
	renderAttach([newObject]);
}

function gameOver() {
	clearInterval(gameTimer);
	clearInterval(dropTimer);
	clearInterval(dropEnemyTimer);
	clearInterval(dropRewardTimer);
	clearInterval(spawnParticleTimer);
	document.getElementById("overOverlay").style.display = "inline-block";
	document.getElementById("main").focus();
}

function gameRestart() {
	clearInterval(gameTimer);
	gameTimeCount = 0;
	level = 1;
	hurricaneLevel = false;
	clearInterval(dropTimer);
	clearInterval(dropEnemyTimer);
	clearInterval(dropRewardTimer);
	clearInterval(spawnParticleTimer);
	document.getElementById("startOverlay").style.display = "inline-block";
	document.getElementById("overOverlay").scrollTop = 0;
	document.getElementById("overOverlay").style.display = "none";
	theObjects = [];
	mainElement.innerHTML = '';
	gameState = "start";
	points = 0;
}

function makeBigFloor() {
	theFloor = makePlatform('log');
	theFloor.x = 0;
	theFloor.width = 900;
	theFloor.y = 400;
	theFloor.fall = 0;
	theFloor.element.style.width = theFloor.width + "px";
	theObjects.push(theFloor);
	renderAttach([theFloor]);
}

function makeStartObject() {
	theStartPlatform = makePlatform('log');
	theStartPlatform.x = 600;
	theStartPlatform.y = 300;
	theStartPlatform.width = 100;
	theStartPlatform.fall = 0;
	theStartPlatform.element.style.width = theStartPlatform.width + "px";
	theObjects.push(theStartPlatform);
	renderAttach([theStartPlatform]);
}

var gameTimeCount = 0;
function gameTime() {
	gameTimeCount = gameTimeCount + 0.25;
	log("Game Time: ", gameTimeCount);
	
	if (gameTimeCount % 2 == 0) {
		dropPlatform();
	}
	
	if (gameTimeCount % 60 == 50) {
		hurricaneLevel = true;
	}
	
	if (gameTimeCount % 60 == 0 && gameTimeCount > 10) {
		hurricaneLevel = false;
		level = level + 1;
	}
	
	switch(level) {
		case 1:
			dropPlatformChance = 10;
			dropEnemyChance = 10;
			dropRewardChance = 10;
			break;
		case 2:
			dropPlatformChance = 9;
			dropEnemyChance = 15;
			dropRewardChance = 15;
			break;
		case 3:
			dropPlatformChance = 8;
			dropEnemyChance = 20;
			dropRewardChance = 20;
			break;
		case 4:
			dropPlatformChance = 7;
			dropEnemyChance = 25;
			dropRewardChance = 25;
			break;
		case 5:
			dropPlatformChance = 6;
			dropEnemyChance = 30;
			dropRewardChance = 30;
			break;
		case 6:
			dropPlatformChance = 5;
			dropEnemyChance = 35;
			dropRewardChance = 35;
			break;
		default:
			dropPlatformChance = 10;
			dropEnemyChance = 40;
			dropRewardChance = 40;
	}
		
	//	Trying to do the dice strategy...
	var rand1 = Math.floor((Math.random() * 100)) + 1;
	var rand11 = Math.floor((Math.random() * 100)) + 1;
	var rand2 = Math.floor((Math.random() * 100)) + 1;
	var rand21 = Math.floor((Math.random() * 100)) + 1;
	var rand3 = Math.floor((Math.random() * 100)) + 1;
	var rand31 = Math.floor((Math.random() * 100)) + 1;
	
	if (hurricaneLevel) {
		dropEnemyChance = 100;
		dropRewardChance = 100;
		
		rand11 = 100;
		rand21 = 100;
		rand31 = 100;
	}
	
	if (rand1 < dropPlatformChance) {
		dropPlatform(100 + rand11);
	}
	
	if (rand2 < dropEnemyChance) {
		dropEnemy(-100 - rand21);
	}
	
	if (rand3 < dropRewardChance) {
		dropReward(100 + rand31);
	}
	
	log("Level: ", level);
	log("Drop Platform Chance", dropPlatformChance);
	log("Drop Enemy Chance", dropEnemyChance);
	log("Drop Reward Chance", dropRewardChance);
	log("Hurricane Level? ", hurricaneLevel);
	
	

/*	
	if (gameTimeCount == 3) {
		clearInterval(dropTimer);
		dropTimer = setInterval(dropPlatform, 1000);
		dropPlatform();
	} else if (gameTimeCount == 2) {
		dropEnemyTimer = setInterval(dropEnemy, 1000);
		dropEnemy();
	} else if (gameTimeCount == 5) {
		dropRewardTimer = setInterval(dropReward, 5000);
		dropReward();
	}
	

	if (gameTimeCount == 15) {
		clearInterval(dropTimer);
		dropTimer = setInterval(dropPlatform, 2000);
		dropPlatform();
		
		dropRewardTimer = setInterval(dropReward, 7500);
	} else if (gameTimeCount == 30) {
		dropEnemyTimer = setInterval(dropEnemy, 5000);
		dropEnemy();
	}
	*/
}
var gameTimer = setInterval(gameTime, 250);
clearInterval(gameTimer);

var dropPlatformChance = 10;
function dropPlatform(fall) {
	var x = Math.floor(Math.random() * 600) + 50;
	var width = Math.floor(Math.random() * 50) + 50;
	//	get random image
	var imageList = [];
	
	switch(level) {
		case 1:
			for (key in imageMap) {
				if (key == 'door' || key == 'log' || key == 'car' || key == 'branch') {
					imageList.push(key);
				}
			}
			break;
		case 2:
			for (key in imageMap) {
				if (key == 'cardoor' || key == 'chair' || key == 'cabinet' || key == 'table') {
					imageList.push(key);
				}
			}
			break;
		case 3:
			for (key in imageMap) {
				if (key == 'money' || key == 'jewelry' || key == 'atm' || key == 'bed') {
					imageList.push(key);
				}
			}
			break;
		case 4:
			for (key in imageMap) {
				if (key == 'tub' || key == 'toilet' || key == 'picture' || key == 'pot') {
					imageList.push(key);
				}
			}
			break;
		case 5:
			for (key in imageMap) {
				if (key == 'couch' || key == 'fridge' || key == 'pan') {
					imageList.push(key);
				}
			}
			break;
		case 6:
			for (key in imageMap) {
				if (key == 'stroller' || key == 'laptop' || key == 'tv') {
					imageList.push(key);
				}
			}
			break;
		default:
			for (key in imageMap) {
				if (key == 'door' || key == 'log' || key == 'car' || key == 'stroller' ||
				key == 'atm' || key == 'bed' || key == 'branch' || key == 'cabinet' ||
				key == 'cardoor' || key == 'chair' || key == 'couch' || key == 'fridge' ||
				key == 'jewelry' || key == 'laptop' || key == 'money' || key == 'pan' ||
				key == 'picture' || key == 'pot' || key == 'table' || key == 'toilet' ||
				key == 'tub' || key == 'tv') {
					imageList.push(key);
				}
			}
	}
	
	var image = Math.floor(Math.random() * imageList.length);
	var newObject = makePlatform(imageList[image]);
	
	if (fall != null) {
		newObject.fall = fall;
	}
	
	newObject.x = x;
	newObject.y = 0;
	newObject.width = width;
	newObject.element.style.width = newObject.width + "px";
	theObjects.push(newObject);
	renderAttach([newObject]);
}
var dropTimer = setInterval(dropPlatform, 2000);
clearInterval(dropTimer);

var dropEnemyChance = 10;
function dropEnemy(fall) {
	var x = Math.floor(Math.random() * 700) + 50;
	var width = Math.floor(Math.random() * 10) + 20;
	//	get random image
	var imageList = [];
	
	switch(level) {
		case 1:
			for (key in imageMap) {
				if (key == 'glass') {
					imageList.push(key);
				}
			}
			break;
		case 2:
			for (key in imageMap) {
				if (key == 'plank') {
					imageList.push(key);
				}
			}
			break;
		case 3:
			for (key in imageMap) {
				if (key == 'wrench') {
					imageList.push(key);
				}
			}
			break;
		case 4:	
			for (key in imageMap) {
				if (key == 'plate') {
					imageList.push(key);
				}
			}
			break;
		case 5:
			for (key in imageMap) {
				if (key == 'knife') {
					imageList.push(key);
				}
			}
			break;
		case 6:
			for (key in imageMap) {
				if (key == 'nail') {
					imageList.push(key);
				}
			}
			break;
		default:
			for (key in imageMap) {
				if (key == 'plank' || key == 'plate' || key == 'wrench' || key == 'nail' ||
				key == 'knife' || key == 'glass') {
					imageList.push(key);
				}
			}
	}
	
	var image = Math.floor(Math.random() * imageList.length);
	var newObject = makeEnemy(imageList[image]);
	
	if (fall != null) {
		newObject.fall = fall;
	}

	newObject.x = x;
	newObject.y = GAME_HEIGHT;
	newObject.width = width;
	newObject.element.style.width = newObject.width + "px";
	theObjects.push(newObject);
	renderAttach([newObject]);
}
var dropEnemyTimer = setInterval(dropEnemy, 2000);
clearInterval(dropEnemyTimer);

var dropRewardChance = 10;
function dropReward(fall) {
	var x = Math.floor(Math.random() * 600) + 50;
	var width = Math.floor(Math.random() * 30) + 20;
	//	get random image
	var imageList = [];
	
	switch(level) {
		case 1:
			for (key in imageMap) {
				if (key == 'backpack' || key == 'battery' || key == 'bottle' || key == 'light') {
					imageList.push(key);
				}
			}
			break;
		case 2:
			for (key in imageMap) {
				if (key == 'antibacteria' || key == 'firstaidkit' || key == 'pills' || key == 'glassas') {
					imageList.push(key);
				}
			}
			break;
		case 3:
			for (key in imageMap) {
				if (key == 'wallet' || key == 'jacket' || key == 'can') {
					imageList.push(key);
				}
			}
			break;
		case 4:
			for (key in imageMap) {
				if (key == 'identity' || key == 'sleepingbag' || key == 'toiletpaper') {
					imageList.push(key);
				}
			}
			break;
		case 5:
			for (key in imageMap) {
				if (key == 'towel' || key == 'radio' || key == 'map') {
					imageList.push(key);
				}
			}
			break;
		case 6:	
			for (key in imageMap) {
				if (key == 'phone' || key == 'charger' || key == 'plan') {
					imageList.push(key);
				}
			}
			break;
		default:
			for (key in imageMap) {
				if (key == 'antibacteria' || key == 'backpack' || key == 'battery' || key == 'bottle' ||
				key == 'can' || key == 'charger' || key == 'firstaidkit' || key == 'glassas' ||
				key == 'identity' || key == 'jacket' || key == 'light' || key == 'map' ||
				key == 'phone' || key == 'pills' || key == 'plan' || key == 'radio' ||
				key == 'sleepingbag' || key == 'toiletpaper' || key == 'towel' || key == 'wallet') {
					imageList.push(key);
				}
			}
	}
	
	var image = Math.floor(Math.random() * imageList.length);
	var newObject = makeReward(imageList[image]);
	
	if (fall != null) {
		newObject.fall = fall;
	}

	newObject.x = x;
	newObject.y = 0;
	newObject.width = width;	
	newObject.element.style.width = newObject.width + "px";
	theObjects.push(newObject);
	renderAttach([newObject]);
	if (newObject.element.height > 20) {
		newObject.height = newObject.element.height;
	}
}
var dropRewardTimer = setInterval(dropReward, 2000);
clearInterval(dropRewardTimer);

function spawnParticle() {
	var x = Math.floor(Math.random() * 700) + 50;
	var newObject = makeParticle();
	
	newObject.x = x;
	theObjects.push(newObject);
	renderAttach([newObject]);
}
var spawnParticleTimer = setInterval(spawnParticle, 500);
clearInterval(spawnParticleTimer);