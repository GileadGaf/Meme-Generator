var gElCanvas;
var gCtx;

function onInit() {
    loadImages();

    gElCanvas = document.querySelector('.canvas');
    gCtx = gElCanvas.getContext('2d');


}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    // Note: changing the canvas dimension this way clears the canvas
    gElCanvas.width = elContainer.offsetWidth;

    gElCanvas.height = elContainer.offsetHeight;

}


function loadImages() {
    var imgs = getImgs();
    var strHtmls = imgs.map(img =>
        `<img src="${img.url}" onclick="imgClicked(${img.id})" />`

    );
    var elImagesGallery = document.querySelector('.images-gallery');
    elImagesGallery.innerHTML = strHtmls.join('');
}

function imgClicked(imgId) {
    document.querySelector('.editor-box').classList.add('flex');
    resizeCanvas();
    var meme = getMeme();
    meme.selectedImgId = imgId;
    editMeme();

    document.querySelector('.images-gallery').style.display = 'none';


}

function backToGallery() {
    document.querySelector('.editor-box').classList.remove('flex');
    document.querySelector('.images-gallery').style.display = 'block';
}

function editMeme() {
    var selectedImg = getMemeImage();
    var img = new Image();

    img.src = selectedImg.url;
    gElCanvas.height = (img.height * gElCanvas.width) / img.width;
    drawImage();
}

function drawImage() {
    var selectedImg = getMemeImage();
    var img = new Image();
    img.src = selectedImg.url;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        addText();

    }
}

function onChangeCanvasText(canvasText) {
    if (!canvasText) return;
    changeCanvasText(canvasText);
    renderCanvas();


}

function renderCanvas() {

    gCtx.save();
    drawImage();
    gCtx.restore();
}

function addText() {

    var memeLines = getMemeLines();
    var selectedLine = getSelectedLine();
    document.querySelector('[name=canvas-text]').value = selectedLine.txt;
    memeLines.forEach((line, idx) => {
        drawText(line.txt, idx, line.align, line.color, line.size);

    });
    markText();


}

function drawText(text, lineIdx, alignment, color, fontSize) {
    var pos = getLinePosIdxBased(lineIdx);
    gCtx.beginPath();
    gCtx.moveTo(0, 0);
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'white';
    gCtx.fillStyle = color;
    gCtx.font = fontSize + 'px ' + 'Impact';
    gCtx.textAlign = alignment;
    gCtx.strokeText(text, pos.x, pos.y);
    gCtx.fillText(text, pos.x, pos.y);
    gCtx.closePath();

}

function getLinePosIdxBased(lineIdx) {
    var pos = { x: 100, y: gElCanvas.height / 2 };
    switch (lineIdx) {
        case 0:
            pos.y = 20;
            break;

        case 1:
            pos.y = gElCanvas.height - 20;
            break;


    }
    return pos;
}

function markText() {
    var selectedLine = getSelectedLine();
    var measure = gCtx.measureText(selectedLine.txt);
    gCtx.lineWidth = 2;
    gCtx.beginPath();
    gCtx.rect(selectedLine.pos.x - measure.width / 2 - 10, selectedLine.pos.y - selectedLine.size, selectedLine.pos.x + measure.width / 2 + 10, selectedLine.size + 10);
    gCtx.stroke();

    gCtx.closePath();
}

function onChangeFontSize(diff) {
    changeFontSize(diff);
    renderCanvas();
}

function onChangeTextPos(yDelta) {
    changeTextVerticalPos(yDelta);
    renderCanvas();
}

function onSwitchSelectedLines() {
    switchSelectedLines();
    renderCanvas();
}