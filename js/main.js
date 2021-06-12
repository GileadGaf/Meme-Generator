function onInit() {
    loadImages();
    initCanvas();
}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    // Note: changing the canvas dimension this way clears the canvas
    var selectedImg = getImg();
    var img = new Image();
    img.src = selectedImg.url;
    var elCanvas = getCanvas();
    elCanvas.width = elContainer.offsetWidth;
    elCanvas.height = (img.height * gElCanvas.width) / img.width;
    renderCanvas();
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
    setMeme(imgId);
    resizeCanvas();
    var elGallery = document.querySelector('.images-gallery');
    elGallery.hidden = true;
    elGallery.classList.remove('grid');
}

function backToGallery() {
    document.querySelector('.editor-box').classList.remove('flex');
    var elGalleryNav = document.querySelector('.gallery-nav');
    elGalleryNav.classList.add('active');
    var elGallery = document.querySelector('.images-gallery');
    elGallery.classList.add('grid');
    document.body.classList.remove('menu-open');
    elGallery.hidden = false;
}

function onChangeCanvasText(canvasText) {

    changeCanvasText(canvasText);
    renderCanvas();
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
        elLineText.value = 'No line is selected';
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
        var lineWidth = getTextWidth(line.txt);
        setLineWidth(idx, lineWidth);

    });
}
// TODO: Add  stroke color
//TODO: Fix mobile design
//TODO: Add alignment again


function onChangeFontSize(diff) {
    changeFontSize(diff);
    renderCanvas();
}

//Up and down buttons to make the test higher or lower
function onChangeTextPos(yDelta) {
    changeTextVerticalPos(yDelta);
    renderCanvas();
}

//Moving through the lines to select them one by one
function onSwitchSelectedLines() {
    switchSelectedLines();
    renderCanvas();
}

function onAddLine() {
    addLine();
    renderCanvas();
    focusText();
}

function focusText() {
    document.querySelector('[name=line-text]').focus();
}

function onDeleteLine() {
    deleteLine();
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
    var elCanvas = getCanvas();
    const data = elCanvas.toDataURL()
    var elLink = elButton.querySelector('a');
    elLink.href = data
    elLink.download = 'my-meme.jpg'
}

function toggleMenu() {
    document.body.classList.toggle('menu-open');
}