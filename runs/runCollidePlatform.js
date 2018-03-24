var PLATFORMHEIGHT = 10;
var isColliding = false;
function runCollidePlatform(object, list) {
	isColliding = false;
	for (var i = 0; i < list.length; i++) {
		var target = list[i];
		if (isCollidingAnywhere(object, target)) {
			target.runCollide(object);
			specialStart(target);
		}
	}
	if (!isColliding) {
		onAir(object);
	}
	log("colliding", isColliding);
}

function isCollidingWithFloor(object, target) {
	var sourceVertices = [
		{'x': object.x, 'y': object.y + object.height},
		{'x': object.x + object.width, 'y': object.y + object.height}
	];
	var targetVertices = [
		{'x': target.x, 'y': target.y},
		{'x': target.x + target.width, 'y': target.y},
		{'x': target.x + target.width, 'y': target.y + target.height},
		{'x': target.x, 'y': target.y + target.height}
	];
	return object != target &&
		object.vy >= 0 &&
		(pointInSquareCollision(sourceVertices.slice(0, 1), targetVertices) || pointInSquareCollision(sourceVertices.slice(1, 2), targetVertices));
}

function isCollidingAnywhere(object, target) {
	var sourceVertices = [
		{'x': object.x, 'y': object.y},
		{'x': object.x + object.width, 'y': object.y},
		{'x': object.x + object.width, 'y': object.y + object.height},
		{'x': object.x, 'y': object.y + object.height}
	];
	var targetVertices = [
		{'x': target.x, 'y': target.y},
		{'x': target.x + target.width, 'y': target.y},
		{'x': target.x + target.width, 'y': target.y + target.height},
		{'x': target.x, 'y': target.y + target.height}
	];
	return object != target &&
		(pointInSquareCollision(sourceVertices.slice(0, 1), targetVertices) || pointInSquareCollision(sourceVertices.slice(1, 2), targetVertices) ||
		pointInSquareCollision(sourceVertices.slice(2, 3), targetVertices) || pointInSquareCollision(sourceVertices.slice(3, 4), targetVertices));
}

function onFloor(object, target) {
	object.floorTarget = target;
	object.vy = 0;
	object.gravity = null;
	object.lift = null;
	object.parachuteReady = false;
}

function onAir(object) {
	object.gravity = object.gravity_init;
	object.floorTarget = null;
}

function specialStart(object) {
	if (object == theStartPlatform) {
		gameState = "play";
	}
}

function pointInSquareCollision(sourceVertices, targetVertices) {
	//  Implementing a "Point in Polygon" using a ray casting to the right algorithm.
	//  If any source points pass the test, then collision is true
	//  Winding order is top left, clockwise
	var collided = false;
	for (var i = 0; i < sourceVertices.length; i++) {
	  for (var j = 0; j < targetVertices.length; j++) {
		var p = sourceVertices[i];
		var v1 = targetVertices[j];
		var v2 = targetVertices[j + 1] || targetVertices[0];
		if (
		  ((p.x > v1.x) != (p.x > v2.x)) &&
		  (p.y < v1.y)
		) {
		  collided = !collided;
		}
	  }
	  if (collided) {
		return collided;
	  }
	}
	return false;
}