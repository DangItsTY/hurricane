function runFriction(list) {
	for (var i = 0; i < list.length; i++) {
		var object = list[i];
		if (object.floorTarget) {
			if (object.speed == 0 && object.vx < (mod * object.speed_init) && object.vx > (mod * object.speed_init * -1)) {
				object.vx = 0;
			}
			if (object.vx > 0 && object.speed == 0) {
				object.vx = object.vx - (mod * object.floorTarget.friction);
			}
			if (object.vx < 0 && object.speed == 0) {
				object.vx = object.vx + (mod * object.floorTarget.friction);
			}
		}
	}
}