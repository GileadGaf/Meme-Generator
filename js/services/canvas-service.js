// var gElCanvas;
// var gCtx;

// function initCanvas(elCanvas) {
//     gElCanvas = elCanvas;
//     gCtx = gElCanvas.getContext('2d');
// }

// function getCanvas() {
//     return gElCanvas;
// }

// function drawImage() {
//     var selectedImg = getMemeImage();
//     var img = new Image();
//     img.src = selectedImg.url;
//     img.onload = () => {
//         gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
//         addText();

//     }
// }

// function drawText(text, pos, alignment, color, fontSize, lineIdx) {


//     gCtx.beginPath();
//     gCtx.moveTo(0, 0);

//     gCtx.fillStyle = color

//     gCtx.font = fontSize + 'px ' + 'Impact';
//     gCtx.textAlign = "center";
//     gCtx.textBaseline = "middle";
//     var rectHeight = fontSize + 10;
//     var rectWidth = gCtx.measureText(text).width;
//     var rectX = getAlignmentX(alignment);
//     var rectY = pos.y;
//     if (lineIdx === gMeme.selectedLineIdx) {
//         gCtx.lineWidth = 4;
//         gCtx.strokeStyle = 'white';
//         gCtx.strokeRect(rectX - 10, rectY, rectWidth + 20, rectHeight);
//     }
//     gCtx.strokeStyle = 'black';
//     gCtx.lineWidth = 2;
//     gCtx.fillText(text, rectX + rectWidth / 2, rectY + rectHeight / 2);
//     gCtx.strokeText(text, rectX + rectWidth / 2, rectY + rectHeight / 2);
//     gCtx.closePath();

// }

// function renderCanvas() {

//     gCtx.save();
//     drawImage();
//     gCtx.restore();
// }