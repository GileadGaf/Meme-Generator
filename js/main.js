var gElCanvas;
var gCtx;

function onInit() {
    loadImages();

    gElCanvas = document.querySelector('.canvas');
    gCtx = gElCanvas.getContext('2d');
    addListeners();
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
    var elGalleryNav = document.querySelector('.gallery-nav');
    elGalleryNav.classList.remove('active');
    resizeCanvas();
    setMeme(imgId);
    updateMemeContent();

    var elGallery = document.querySelector('.images-gallery');
    elGallery.hidden = true;
    elGallery.classList.remove('grid');


}

function backToGallery() {
    document.querySelector('.editor-box').classList.remove('flex');
    var elGalleryNav = document.querySelector('.gallery-nav');
    elGalleryNav.classList.add('active');
    document.querySelector('.images-gallery').classList.add('grid');
}

function updateMemeContent() {
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
    var elLineText = document.querySelector('[name=line-text]');
    var elLineColor = document.querySelector('[name=color-picker]');
    var elLineFont = document.querySelector('[name=select-font-family]');
    if (selectedLine) {
        elLineText.value = selectedLine.txt;
        elLineColor.value = selectedLine.color;
        elLineFont.value = selectedLine.fontFamily;
    } else {
        elLineText.value = 'Please add a new line';
        elLineColor.value = '#ffffff'
        elLineFont.value = 'IMPACT';
    }

    memeLines.forEach((line, idx) => {
        var pos = line.pos;
        if (!pos) {
            pos = getLinePosIdxBased(idx);
        }
        saveLinePos(idx, pos);
        drawText(line, pos, idx);

    });
}
// TODO: Add  stroke color

function drawText(line, pos, lineIdx) {


    gCtx.beginPath();

    gCtx.fillStyle = line.color;

    gCtx.font = line.size + 'px ' + line.fontFamily.toLowerCase();
    gCtx.font += ', Haettenschweiler, Arial Narrow Bold, sans-serif';
    gCtx.textAlign = "center";
    gCtx.textBaseline = "middle";
    var rectHeight = line.size + 10;
    var rectWidth = gCtx.measureText(line.txt).width + 20;
    var rectX = pos.x;
    //check later if not needed;
    // var rectX = (line.isDrag) ? pos.x : getAlignmentX(line.align);
    var rectY = pos.y;
    if (lineIdx === gMeme.selectedLineIdx) {
        gCtx.lineWidth = 4;
        gCtx.strokeStyle = 'white';
        gCtx.strokeRect(rectX, rectY, rectWidth, rectHeight);
    }
    gCtx.closePath();
    gCtx.strokeStyle = 'black';
    gCtx.lineWidth = 2;
    gCtx.fillText(line.txt, rectX + rectWidth / 2, rectY + rectHeight / 2);
    gCtx.strokeText(line.txt, rectX + rectWidth / 2, rectY + rectHeight / 2);

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

function onChangeFont(fontFamily) {
    setFont(fontFamily);
    renderCanvas();
}

function onChangeTextColor(color) {
    setTextColor(color);
    renderCanvas();
}


function downloadCanvas(elButton) {
    const data = gElCanvas.toDataURL()
    var elLink = elButton.querySelector('a');
    elLink.href = data
    elLink.download = 'my-meme.jpg'
}

function toggleMenu() {
    document.body.classList.toggle('menu-open');
}

function onTouchCanvas(ev) {
    var { offsetX, offsetY } = ev;
    var pos = { x: offsetX, y: offsetY };
    isTextClicked(pos);
}