fabric.Canvas.prototype.disableAll = function () {
    var objects = this.getObjects();
    for (let i = 0, len = this.size(); i < len; i++) {
        objects[i].set("disabled", true);
        objects[i].set("hoverCursor", "default");
    }
}
var canvas = new fabric.Canvas("big-box");
canvas.on('mouse:over', function (e) {
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
});
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
        })
        rectangle.on("mousedown", position)
        rectangle.on("mouse:over", hoverState)
        canvas.add(rectangle);
    }

}
function hoverState(evt) {
    console.log("gghhgh")
    var selectedBox = evt.target;
    selectedBox.set("fill", "red");
    canvas.renderAll();
}
function position(evt) {
    var selectedBox = evt.target;
    if (!selectedBox.get("disabled")) {
        selectedBox.set("fill", "#276b68")
        selectedBox.set("selected", "true")
        canvas.disableAll();
    }


    console.log(selectedBox.get("row") + "." + selectedBox.get("column"));
}
