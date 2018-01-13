function runClean(list) {
	for (var i = list.length - 1; i >= 0; i--) {
		
		if (
		//	no longer alive
		!list[i].isAlive ||
		//	out of bounds and not player
		((list[i].kind != 'player') && (list[i].x < 0 - list[i].width || list[i].x > GAME_WIDTH || list[i].y < 0 - list[i].height || list[i].y > GAME_HEIGHT))) {
			list[i].element.remove();
			list.splice(i, 1);
		}
	}
}