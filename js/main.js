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
    //Filling the values of the control box inputs:
    if (selectedLine) {
        document.querySelector('[name=canvas-text]').value = selectedLine.txt;
        document.querySelector('[name=color-picker]').value = selectedLine.color;
    }
    memeLines.forEach((line, idx) => {
        var pos = line.pos;
        if (!pos) {
            pos = getLinePosIdxBased(idx);
        }
        saveLinePos(idx, pos);
        drawText(line.txt, pos, line.align, line.color, line.size, idx);

    });
}
// TODO: Take a look at the options that need to be done again

function drawText(text, pos, alignment, color, fontSize, lineIdx) {


    gCtx.beginPath();
    gCtx.moveTo(0, 0);

    gCtx.fillStyle = color

    gCtx.font = fontSize + 'px ' + 'Impact';
    gCtx.textAlign = "center";
    gCtx.textBaseline = "middle";
    var rectHeight = fontSize + 10;
    var rectWidth = gCtx.measureText(text).width;
    var rectX = getAlignmentX(alignment);
    var rectY = pos.y;
    if (lineIdx === gMeme.selectedLineIdx) {
        gCtx.lineWidth = 4;
        gCtx.strokeStyle = 'white';
        gCtx.strokeRect(rectX - 10, rectY, rectWidth + 20, rectHeight);
    }
    gCtx.strokeStyle = 'black';
    gCtx.lineWidth = 2;
    gCtx.fillText(text, rectX + rectWidth / 2, rectY + rectHeight / 2);
    gCtx.strokeText(text, rectX + rectWidth / 2, rectY + rectHeight / 2);
    gCtx.closePath();

}

function getAlignmentX(alignment) {
    switch (alignment) {
        case 'CENTER':
            return gElCanvas.width / 4;
        case 'RIGHT':
            return gElCanvas.width / 2;
        case 'LEFT':
        default:
            return 0;
    }
}

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
            break;


    }
    //The rest of the lines will be positioned at the center of the canvas
    return pos;
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

function onAddLine() {
    addLine();
    renderCanvas();
}

function onDeleteLine() {
    deleteLine();
    renderCanvas();

}

function onChangeTextAlignment(elAlignButton) {
    var dataAlignment = elAlignButton.getAttribute('data-alignment');
    setLineAlignment(dataAlignment);
    renderCanvas();
}

function onChangeTextColor(color) {
    setTextColor(color);
    renderCanvas();
}