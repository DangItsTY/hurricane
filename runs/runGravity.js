function runGravity(list) {
	for (var i = 0; i < list.length; i++) {
		if (list[i].gravity) {
			var object = list[i];
			object.vy = object.vy + (mod * object.gravity);
		}
	}
}