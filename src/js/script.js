/* global fabric */

// Creating canvas object
const canvas = new fabric.Canvas('big-box');

// Disable all fields that are not active
fabric.Canvas.prototype.disableAll = function () {
	const objects = this.getObjects();
	for (let i = 0, len = this.size(); i < len; i += 1) {
		objects[i].set('disabled', true);
		objects[i].set('hoverCursor', 'default');
		canvas.sendToBack(objects[i]);
		if (objects[i].get('fill') === '#d0d765') {
			objects[i].set('fill', '#fbfcf2');
		}
	}
};

// Reset game
fabric.Canvas.prototype.resetGame = function () {
	const objects = this.getObjects();
	for (let i = 0, len = this.size(); i < len; i += 1) {
		objects[i].set('disabled', false);
		objects[i].set('hoverCursor', 'pointer');
		objects[i].set('fill', '#fbfcf2');
		objects[i].set('active', true);
		objects[i].set('selected', false);
	}
	canvas.renderAll();
};

// Animate Boxes
function animateObject(object) {
	const duration = 200;
	canvas.bringToFront(object);
	object.animate('scaleX', '1.2', {
		onChange: canvas.renderAll.bind(canvas),
		duration,
	});
	object.animate('scaleY', '1.2', {
		onChange: canvas.renderAll.bind(canvas),
		duration,
	});
	setTimeout(() => {
		object.animate('scaleX', '1', {
			onChange: canvas.renderAll.bind(canvas),
			duration,
		});
		object.animate('scaleY', '1', {
			onChange: canvas.renderAll.bind(canvas),
			duration,
		});
	}, duration);
}

// Check if all boxes are selected
fabric.Canvas.prototype.winGame = function () {
	const objects = this.getObjects();
	let win = true;
	for (let i = 0, len = this.size(); i < len; i += 1) {
		if (!objects[i].get('selected')) {
			win = false;
		}
	}
	return win;
};

// Get box object by id
fabric.Canvas.prototype.getItemById = function (id) {
	let object = null;
	const objects = this.getObjects();

	for (let i = 0, len = this.size(); i < len; i += 1) {
		if (objects[i].id && objects[i].id === id) {
			object = objects[i];
			break;
		}
	}

	return object;
};

// On select box
function position(evt) {
	const selectedBox = evt.target;
	if (!selectedBox.get('disabled')) {
		selectedBox.set('fill', '#276b68');
		selectedBox.set('selected', true);
		canvas.disableAll();
		animateObject(selectedBox);

		// Selecting active boxes
		const activeBoxes = [];
		const nId = `${selectedBox.get('column') - 3}.${selectedBox.get('row')}`;
		const wId = `${selectedBox.get('column')}.${selectedBox.get('row') - 3}`;
		const eId = `${selectedBox.get('column')}.${selectedBox.get('row') + 3}`;
		const sId = `${selectedBox.get('column') + 3}.${selectedBox.get('row')}`;
		const neId = `${selectedBox.get('column') - 2}.${selectedBox.get('row') + 2}`;
		const nwId = `${selectedBox.get('column') - 2}.${selectedBox.get('row') - 2}`;
		const seId = `${selectedBox.get('column') + 2}.${selectedBox.get('row') + 2}`;
		const swId = `${selectedBox.get('column') + 2}.${selectedBox.get('row') - 2}`;

		activeBoxes.push(canvas.getItemById(nId));
		activeBoxes.push(canvas.getItemById(wId));
		activeBoxes.push(canvas.getItemById(eId));
		activeBoxes.push(canvas.getItemById(sId));
		activeBoxes.push(canvas.getItemById(neId));
		activeBoxes.push(canvas.getItemById(nwId));
		activeBoxes.push(canvas.getItemById(seId));
		activeBoxes.push(canvas.getItemById(swId));
		let gameOver = true;
		for (let i = 0; i < activeBoxes.length; i += 1) {
			if (activeBoxes[i]) {
				if (!activeBoxes[i].get('selected')) {
					activeBoxes[i].set('fill', '#d0d765');
					activeBoxes[i].set('active', true);
					activeBoxes[i].set('disabled', false);
					animateObject(activeBoxes[i]);

					gameOver = false;
				}
			}
		}
		const win = canvas.winGame();
		if (gameOver && !win) {
			if (confirm('You have lost this game. Do you want to play again?')) {
				canvas.resetGame();
			}
		} else if (win) {
			if (confirm('You have win this game. Do you want to play again?')) {
				canvas.resetGame();
			}
		}
	}
}

// Generate 100 boxes
let leftPosition = 0;
let topPosition = 0;

for (let i = 1; i < 11; i += 1) {
	topPosition = 0;
	leftPosition += 50;

	for (let j = 1; j < 11; j += 1) {
		topPosition += 50;
		const rectangle = new fabric.Rect({
			height: 50,
			width: 50,
			fill: '#fbfcf2',
			left: leftPosition,
			top: topPosition,
			hasControls: false,
			stroke: '#eee',
			lockMovementX: true,
			lockMovementY: true,
			lockScalingX: true,
			lockScalingY: true,
			lockRotation: true,
			row: i,
			column: j,
			selected: false,
			active: true,
			disabled: false,
			hasBorders: false,
			hoverCursor: 'pointer',
			id: `${j}.${i}`,
			originX: 'center',
			originY: 'center',
		});
		rectangle.on('mousedown', position);
		canvas.add(rectangle);
	}
}
