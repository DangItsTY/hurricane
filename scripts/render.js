function render(list) {
	for (var i = 0; i < list.length; i++) {
		var object = list[i];
		var element = object.element;
		element.style.left = object.x + "px";
		element.style.top = object.y + "px";
	}
}

function renderHud() {
	var element = document.getElementById("points");
	element.innerHTML = points;
}

function renderAttach(list) {
	for (var i = 0; i < list.length; i++) {
		mainElement.appendChild(list[i].element);
	}
}