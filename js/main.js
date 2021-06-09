var gElCanvas;
var gCtx;

function onInit() {
    gElCanvas = document.querySelector('.canvas');
    gCtx = gElCanvas.getContext('2d');
    drawImage();


}

function drawImage() {
    var selectedImg = getMemeImage();
    var img = new Image();
    img.src = selectedImg.url;

    img.onload = () => {
        gCtx.drawImage(img, 0, 0, img.width, img.height);
        addText();

    }
}

function onChangeCanvasText(canvasText) {
    if (!canvasText) return;
    changeCanvasText(canvasText);
    renderCanvas();


}

function renderCanvas() {
    gCtx.save()
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height);
    drawImage();
    gCtx.restore()
}

function addText() {
    var selectedLine = getMemeText();
    document.querySelector('[name=canvas-text]').value = selectedLine.txt;
    drawText(selectedLine.txt, selectedLine.pos, selectedLine.align, selectedLine.color, selectedLine.size);
}

function drawText(text, pos, alignment, color, fontSize) {
    const { x, y } = pos;

    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'white';
    gCtx.fillStyle = color;
    gCtx.font = fontSize + 'px ' + 'Impact';
    gCtx.textAlign = alignment
    gCtx.strokeText(text, x, y);
    gCtx.fillText(text, x, y);

}