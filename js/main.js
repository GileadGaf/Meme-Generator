var gElCanvas;
var gCtx;

function onInit() {
    loadImages();
    gElCanvas = document.querySelector('.canvas');
    gCtx = gElCanvas.getContext('2d');
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
    var meme = getMeme();
    meme.selectedImgId = imgId;
    editMeme();
    document.querySelector('.editor-box').classList.add('flex');
    document.querySelector('.images-gallery').style.display = 'none';


}

function backToGallery() {
    document.querySelector('.editor-box').classList.remove('flex');
    document.querySelector('.images-gallery').style.display = 'block';
}

function editMeme() {

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

    gCtx.save();
    drawImage();
    gCtx.restore();
}

function addText() {

    var memeLines = getMemeLines();
    var selectedLine = getSelectedLine();
    document.querySelector('[name=canvas-text]').value = selectedLine.txt;
    memeLines.forEach(line => {
        drawText(line.txt, line.pos, line.align, line.color, line.size);

    });
    markText();


}

function drawText(text, pos, alignment, color, fontSize) {
    const { x, y } = pos;
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'white';
    gCtx.fillStyle = color;
    gCtx.font = fontSize + 'px ' + 'Impact';
    gCtx.textAlign = alignment;

    gCtx.moveTo(x, y);
    gCtx.strokeText(text, x, y);
    gCtx.fillText(text, x, y);

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