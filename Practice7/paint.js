let canvas = document.getElementById('draw');
let context = canvas.getContext("2d");


let clickX = [];
let clickY = [];
let clickDrag = [];
let paint;
let mouseX;
let mouseY;

let strokeStyle;
let lineWidth;

// to clear
document.getElementById('clear')
    .addEventListener('click', function (e) {
        clickX    = [];
        clickY    = [];
        clickDrag = [];
        context.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    }
);

canvas.addEventListener('mousedown', function (e) {
    mouseX = e.pageX - this.offsetLeft;
    mouseY = e.pageY - this.offsetTop;
    paint = true;
    addClick(mouseX, mouseY);
    redraw();
});

canvas.addEventListener('mousemove',function (e) {
    if (paint) {
        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
        redraw();
    }
});
canvas.addEventListener('mouseup',function (e) {
    paint = false;
});
canvas.addEventListener('mouseleave',function (e) {
    paint = false;
});

const addClick = (x, y, dragging) => {
        clickX.push(x);
        clickY.push(y);
        clickDrag.push(dragging);
};

const redraw = () =>  {

    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

    context.strokeStyle = strokeStyle;
    context.lineWidth = lineWidth;
    context.lineJoin = "round";

    for(let i = 0; i < clickX.length; ++i) {

        context.beginPath();

        if (clickDrag[i] && i)
            context.moveTo(clickX[i-1], clickY[i-1]);
        else
            context.moveTo(clickX[i] - 1, clickY[i]);

        context.lineTo(clickX[i], clickY[i]);
        context.closePath();
        context.stroke();
    }
};

let select = document.getElementById("select-size");
let options = [];

for (let i = 0; i < 20; ++i)
    options += `<option value="${i}">${i}</option>`;

select.innerHTML = options;

select.addEventListener('change', function (e) {
    lineWidth = e.target.value;
});

let picker = document.getElementById('color-picker')
    .addEventListener('change', function (e) {
        strokeStyle = e.target.value;
    });
