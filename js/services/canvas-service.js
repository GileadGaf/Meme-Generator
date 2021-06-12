var gElCanvas;
var gCtx;

function initCanvas() {
    gElCanvas = document.querySelector('.canvas');
    gCtx = gElCanvas.getContext('2d');
    addListeners();
}

function getCanvas() {
    return gElCanvas;
}

function renderCanvas() {
    if (!gCtx) return;
    gCtx.save();
    drawImage();
    gCtx.restore();
}


function drawImage() {
    var selectedImg = getImg();
    var img = new Image();
    img.src = selectedImg.url;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        addText();

    }
}

function drawText(line, pos, lineIdx) {
    gCtx.beginPath();
    gCtx.font = line.size + 'px ' + line.fontFamily.toLowerCase();
    gCtx.font += ', Haettenschweiler, Arial Narrow Bold, sans-serif';
    gCtx.textAlign = "center";
    gCtx.textBaseline = "middle";
    var rectHeight = line.size + 10;
    var rectWidth = gCtx.measureText(line.txt).width + 20;
    var rectX = pos.x;
    var rectY = pos.y;
    if (lineIdx === gMeme.selectedLineIdx) {
        _markText(rectX, rectY, rectHeight, rectWidth);
    }
    gCtx.setLineDash([0]);
    gCtx.closePath();
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = line.color;
    gCtx.lineWidth = 2;
    gCtx.fillText(line.txt, rectX + rectWidth / 2, rectY + rectHeight / 2);
    gCtx.strokeText(line.txt, rectX + rectWidth / 2, rectY + rectHeight / 2);

}

function _markText(x, y, rectHeight, rectWidth) {
    gCtx.lineWidth = 4;
    gCtx.strokeStyle = 'white';
    gCtx.setLineDash([2]);
    _drawArc(x, y)
    _drawArc(x + rectWidth, y)
    _drawArc(x, y + rectHeight)
    _drawArc(x + rectWidth, y + rectHeight)
    gCtx.strokeRect(x, y, rectWidth, rectHeight);
}

function _drawArc(x, y, size = 10, color = 'blue') {
    gCtx.beginPath()
    gCtx.arc(x, y, size, 0, 2 * Math.PI)
    gCtx.stroke()
    gCtx.fillStyle = color
    gCtx.fill()
    gCtx.closePath();
}

function getTextWidth(txt) {
    return gCtx.measureText(txt).width;
}

//Default yPosition
function getLinePosIdxBased(lineIdx) {
    //Middle pos
    var pos = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 };

    switch (lineIdx) {
        //1st line will be at the top of the canvas-about 50px from start
        case 0:
            pos.y = 50;
            break;
            //2nd line will be at the bottom of the canvas-about 50px from end
        case 1:
            pos.y = gElCanvas.height - 50;



    }
    //The rest of the lines will be positioned at the center of the canvas
    return pos;
}