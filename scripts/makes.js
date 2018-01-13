var imageMap = {
	'door': IMAGEPATH + 'door.png',
	'log': IMAGEPATH + 'log.png',
	'car': IMAGEPATH + 'car.png',
	'stroller': IMAGEPATH + 'stroller.png',
	'piggy': IMAGEPATH + 'piggy.png',
	'bottle': IMAGEPATH + 'bottle.png',
	'glass': IMAGEPATH + 'glass.png',
	'player': IMAGEPATH + 'player.png',
	'player_parachute': IMAGEPATH + 'player_parachute.png',
	'antibacteria': IMAGEPATH + 'antibacteria.png',
	'backpack': IMAGEPATH + 'backpack.png',
	'can': IMAGEPATH + 'can.png',
	'charger': IMAGEPATH + 'charger.png',
	'firstaidkit': IMAGEPATH + 'firstaidkit.png',
	'glassas': IMAGEPATH + 'glassas.png',
	'identity': IMAGEPATH + 'identity.png',
	'jacket': IMAGEPATH + 'jacket.png',
	'light': IMAGEPATH + 'light.png',
	'map': IMAGEPATH + 'map.png',
	'phone': IMAGEPATH + 'phone.png',
	'piggy': IMAGEPATH + 'piggy.png',
	'pills': IMAGEPATH + 'pills.png',
	'plan': IMAGEPATH + 'plan.png',
	'radio': IMAGEPATH + 'radio.png',
	'sleepingbag': IMAGEPATH + 'sleepingbag.png',
	'toiletpaper': IMAGEPATH + 'toiletpaper.png',
	'towel': IMAGEPATH + 'towel.png',
	'wallet': IMAGEPATH + 'wallet.png',
	'atm': IMAGEPATH + 'atm.png',
	'bed': IMAGEPATH + 'bed.png',
	'branch': IMAGEPATH + 'branch.png',
	'cabinet': IMAGEPATH + 'cabinet.png',
	'cardoor': IMAGEPATH + 'cardoor.png',
	'chair': IMAGEPATH + 'chair.png',
	'couch': IMAGEPATH + 'couch.png',
	'fridge': IMAGEPATH + 'fridge.png',
	'jewelry': IMAGEPATH + 'jewelry.png',
	'laptop': IMAGEPATH + 'laptop.png',
	'money': IMAGEPATH + 'money.png',
	'pan': IMAGEPATH + 'pan.png',
	'picture': IMAGEPATH + 'picture.png',
	'pot': IMAGEPATH + 'pot.png',
	'table': IMAGEPATH + 'table.png',
	'toilet': IMAGEPATH + 'toilet.png',
	'tub': IMAGEPATH + 'tub.png',
	'tv': IMAGEPATH + 'tv.png',
	'plank': IMAGEPATH + 'plank.png',
	'knife': IMAGEPATH + 'knife.png',
	'nail': IMAGEPATH + 'nail.png',
	'wrench': IMAGEPATH + 'wrench.png',
	'plate': IMAGEPATH + 'plate.png'
}


function makePlayer() {
	var object = {};
	image = 'player';
	
	var element = document.createElement('div');
	element.style.position = "absolute";
	element.style.backgroundImage = "url("+imageMap[image]+")";
	element.style.backgroundRepeat = "no-repeat";
	element.style.backgroundSize = "100%";
	
	object.kind = 'player';
	object.element = element;
	object.speed = object.speed_init = 10;	//	600
	object.speedMax = 4;
	object.x = 0;
	object.y = 0;
	object.vx = 0;
	object.vy = 0;
	object.width = 25;
	object.height = 50;
	object.gravity = object.gravity_init = 20;
	object.jump = 5;
	object.jumpReady = true;
	object.lift_init = 1;
	object.lift = null;
	object.liftResetReady = false;
	object.parachuteReady = false;
	object.floorTarget = null;
	object.friction = 0;
	object.isAlive = true;
	
	object.element.style.left = object.x + "px";
	object.element.style.top = object.y + "px";
	object.element.style.width = object.width + "px";
	object.element.style.height = object.height + "px";
	
	return object;
}

function makePlatform(image) {
	var object = {};
	
	var element = document.createElement('img');
	element.style.position = "absolute";
	element.src = imageMap[image];
	element.style.backgroundRepeat = "no-repeat";
	element.style.backgroundSize = "100%";
	//element.style.boxShadow = "rgba(145, 255, 255, 0.45) 0px -10px 10px -4px";
	//element.style.borderRadius = "25px"
	
	object.kind = 'platform';
	object.element = element;
	object.speed = 0;
	object.x = 0;
	object.y = 500;
	object.vx = 0;
	object.vy = 0;
	object.width = 100;
	object.height = 50;
	object.gravity = null;
	object.fall = object.fall_init = 100;	//400
	object.friction = 4;
	object.isAlive = true;
	
	object.runCollide = function(target) {
		if (isCollidingWithFloor(target, object)) {
			onFloor(target, object);
			isColliding = true;
		}
	}
	
	
	object.element.style.left = object.x + "px";
	object.element.style.top = object.y + "px";
	object.element.style.width = object.width + "px";
	
	return object;
}

function makeEnemy(image) {
	var object = {};
	
	var element = document.createElement('img');
	element.style.position = "absolute";
	element.src = imageMap[image];
	element.style.backgroundRepeat = "no-repeat";
	element.style.backgroundSize = "100%";
	
	object.type = 'enemy';
	object.element = element;
	object.speed = 0;
	object.x = 0;
	object.y = 500;
	object.vx = 0;
	object.vy = 0;
	object.width = 100;
	object.height = 20;
	object.gravity = null;
	object.fall = object.fall_init = -100;
	object.isAlive = true;
	
	object.element.style.left = object.x + "px";
	object.element.style.top = object.y + "px";
	object.element.style.width = object.width + "px";
	
	object.runCollide = function(target) {
		console.log("play has died! please restart game by pressing F5");
		gameState = "over";
	}
	
	return object;
}

function makeReward(image) {
	var object = {};
	
	var element = document.createElement('img');
	element.style.position = "absolute";
	element.src = imageMap[image];
	element.style.backgroundRepeat = "no-repeat";
	element.style.backgroundSize = "100%";
	element.style.boxShadow = "rgba(255, 234, 132, 0.45) 0px 0px 10px 5px";
	element.style.borderRadius = "25px"
    element.style.backgroundColor = "rgba(255, 234, 132, 0.45)";
	
	/*
	.slidein {
  animation-duration: 3s;
  animation-name: slidein;
  animation-iteration-count: 3;
  animation-direction: alternate;
}

@keyframes slidein {
  from {
    margin-left:100%;
    width:300%
  }
  
  to {
    margin-left:0%;
    width:100%;
  }
}
*/
	
	object.element = element;
	object.speed = 0;
	object.x = 0;
	object.y = 500;
	object.vx = 0;
	object.vy = 0;
	object.width = 100;
	object.height = 20;
	object.gravity = null;
	object.fall = object.fall_init = 100;
	object.friction = 2;
	object.isAlive = true;
	
	object.element.style.left = object.x + "px";
	object.element.style.top = object.y + "px";
	object.element.style.width = object.width + "px";
	
	object.runCollide = function(target) {
		console.log("+10 points!");
		points = points + 10;
		object.isAlive = false;
	}
	
	return object;
}

function makeParticle() {
	var object = {};
	
	var element = document.createElement('div');
	element.style.position = "absolute";
	element.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
	element.style.borderRadius = "5px";
	
	
	object.element = element;
	object.speed = 0;
	object.x = 0;
	object.y = GAME_HEIGHT;
	object.vx = 0;
	object.vy = 0;
	object.width = 5;
	object.height = 5;
	object.gravity = null;
	object.fall = object.fall_init = ((windPower - 1.0) * -3000) - 100; //-400
	object.isAlive = true;
	
	object.element.style.left = object.x + "px";
	object.element.style.top = object.y + "px";
	object.element.style.width = object.width + "px";
	object.element.style.height = object.height + "px";
	
	object.runCollide = function(target) {}
	
	return object;
}