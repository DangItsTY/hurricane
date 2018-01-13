function runFall(list) {
	for (var i = 0; i < list.length; i++) {
		var object = list[i];
		if (object.fall) {
			object.y = object.y + (mod * object.fall);
		}
	}
}