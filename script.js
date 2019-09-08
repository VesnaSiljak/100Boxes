fabric.Canvas.prototype.disableAll = function () {
    var objects = this.getObjects();
    for (let i = 0, len = this.size(); i < len; i++) {
        objects[i].set("disabled", true);
        objects[i].set("hoverCursor", "default");
        if (objects[i].get("fill") == "#d0d765") {
            objects[i].set("fill", "#fbfcf2");
        }
    };
};

fabric.Canvas.prototype.resetGame = function () {
    var objects = this.getObjects();
    for (let i = 0, len = this.size(); i < len; i++) {
        objects[i].set("disabled", false);
        objects[i].set("hoverCursor", "pointer");
        objects[i].set("fill", "#fbfcf2");
        objects[i].set("active", true);
        objects[i].set("selected", false);
    };
    canvas.renderAll();
};

fabric.Canvas.prototype.winGame = function () {
    var objects = this.getObjects();
    var win = true;
    for (let i = 0, len = this.size(); i < len; i++) {
        if (!objects[i].get("selected")) {
            win = false;
        }
    };
    return win;
};

fabric.Canvas.prototype.getItemById = function(id) {
    var object = null,
      objects = this.getObjects();

    for (var i = 0, len = this.size(); i < len; i++) {
      if (objects[i].id && objects[i].id === id) {
        object = objects[i];
        break;
      }
    }

    return object;
  };


var canvas = new fabric.Canvas("big-box");
/*canvas.on('mouse:over', function (e) {
    if (!e.target.get('selected') && !e.target.get('disabled')) {
        e.target.set('fill', '#eee');
        canvas.renderAll();
    }

});
canvas.on('mouse:out', function (e) {
    if (!e.target.get('selected') && !e.target.get('disabled')) {
        e.target.set('fill', '#fbfcf2');
        canvas.renderAll();
    }
});*/
var leftPosition = -70;
var topPosition = -70;

for (let i = 1; i < 11; i++) {
    topPosition = -70;
    leftPosition += 70;

    for (let j = 1; j < 11; j++) {
        topPosition += 70;
        var rectangle = new fabric.Rect({
            height: 70,
            width: 70,
            fill: "#fbfcf2",
            left: leftPosition,
            top: topPosition,
            hasControls: false,
            stroke: "#eee",
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
            hoverCursor: "pointer",
            id: j + "." + i,
        })
        rectangle.on("mousedown", position)
        canvas.add(rectangle);
    }

}

function position(evt) {
    var selectedBox = evt.target;
    if (!selectedBox.get("disabled")) {
        selectedBox.set("fill", "#276b68")
        selectedBox.set("selected", true)
        canvas.disableAll();

        var activeBoxes = [];
        var nId = selectedBox.get("column") - 3 + "." + selectedBox.get("row"); 
        var wId = selectedBox.get("column") + "." + (selectedBox.get("row") - 3);
        var eId = selectedBox.get("column") + "." + (selectedBox.get("row") + 3);
        var sId = (selectedBox.get("column") + 3) + "." + selectedBox.get("row");
        var neId = (selectedBox.get("column") - 2 ) + "." + (selectedBox.get("row") + 2);
        var nwId = (selectedBox.get("column") - 2 ) + "." + (selectedBox.get("row") - 2);
        var seId = (selectedBox.get("column") + 2 ) + "." + (selectedBox.get("row") + 2);
        var swId = (selectedBox.get("column") + 2) + "." + (selectedBox.get("row") -2);

        activeBoxes.push(canvas.getItemById(nId));
        activeBoxes.push(canvas.getItemById(wId));
        activeBoxes.push(canvas.getItemById(eId));
        activeBoxes.push(canvas.getItemById(sId));
        activeBoxes.push(canvas.getItemById(neId));
        activeBoxes.push(canvas.getItemById(nwId));
        activeBoxes.push(canvas.getItemById(seId));
        activeBoxes.push(canvas.getItemById(swId));
var gameOver = true;
        for (let i = 0; i < activeBoxes.length; i++) {
            if (activeBoxes[i]) {
                if (!activeBoxes[i].get("selected")) {
                    activeBoxes[i].set("fill", "#d0d765");
                    activeBoxes[i].set("active", true)
                    activeBoxes[i].set("disabled", false)
                    console.log(nId);

                    gameOver = false;
                }
            }
        }
var win = canvas.winGame();
        if (gameOver && !win) {
            if (confirm("You have lost this game. Do you want to play again?")) {
                canvas.resetGame();
            }
        }
        else if(win){
            if (confirm("You have win this game. Do you want to play again?")) {
                canvas.resetGame();
            } 
        }
    }


    console.log(selectedBox.get("row") + "." + selectedBox.get("column"));
}
