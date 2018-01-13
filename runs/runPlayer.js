function runPlayer(player) {
	if ((keysDown[keyMap.jump] || touchRight) && !player.gravity && player.jumpReady) {
		jump(player);
		jumpAudio.currentTime = 0;
		jumpAudio.play();
	}
	if ((keysDown[keyMap.jump] || touchRight)) {
		player.jumpReady = false;
	}
	if ((keysUp[keyMap.jump] && !touchRight)) {
		player.jumpReady = true;
	}
	if ((keysUp[keyMap.jump] && !touchRight) && player.gravity) {
		player.parachuteReady = true;
	}
	
	if ((keysDown[keyMap.left] || touchMoveLeft)) {
		player.speed = player.speed_init;
		moveLeft(player);
	} else if ((keysDown[keyMap.right] || touchMoveRight)) {
		player.speed = player.speed_init;
		moveRight(player);
	} else {
		player.speed = 0;
	}
	
	if ((keysDown[keyMap.jump] || touchRight) && player.gravity && player.parachuteReady) {
		parachute(player);
		player.element.style.backgroundImage = "url("+imageMap['player_parachute']+")";
		player.height = 64;
		player.element.style.height = player.height + "px";
		player.element.style.marginTop= "-14px";
		flapAudio.play();
	} else {
		player.lift = null;
		player.liftResetReady = true;
		player.element.style.backgroundImage = "url("+imageMap['player']+")";
		player.height = 50;
		player.element.style.height = player.height + "px";
		player.element.style.marginTop = "0px";
		flapAudio.currentTime = 0;
		flapAudio.paused = true;
	}
	
	if (player.y > GAME_HEIGHT) {
		console.log("player is out of bounds! please restart game by pressing F5");
		gameState = "over";
	}
	
	if (player.vx > player.speedMax) {
		player.vx = player.speedMax;
	}
	if (player.vx < player.speedMax * -1) {
		player.vx = player.speedMax * -1;
	}
	player.x = player.x + player.vx;
	player.y = player.y + player.vy;
	
	stickToFloor(player);
	
	log("y", player.y);
	log("x", player.element.style.left);
	log("keyleft", keysDown[keyMap.left]);
	log("keyright", keysDown[keyMap.right]);
	log("vx", player.vx);
	log("vy", player.vy);
	log("lift", player.lift);
}

function stickToFloor(object) {
	if (object.floorTarget) {
		object.y = object.floorTarget.y - object.height;
	}
}