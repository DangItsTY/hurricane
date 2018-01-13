var windPower = 0;
var windTimer = 0;

function applyVerticalWind(object) {
	if (object.lift) {
		object.vy = object.vy - (mod * object.gravity * windPower);
		log("vy", object.vy);
	}
	
	if (windTimer <= 0) {
		windPower = (Math.random() * 0.1) + 1.0;
		
		if (hurricaneLevel) {
			windPower = 1.1;
		}
		
		windTimer = Math.random() * 5;
	}
	windTimer = windTimer - mod;

	log("Wind Power", windPower);
	log("Wind Timer", windTimer);
}