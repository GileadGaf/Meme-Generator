function onInit() {
    loadImages();
    initCanvas(document.querySelector('.canvas'));
    window.addEventListener('resize', resizeCanvas);
}

function resizeCanvas() {
    if (!isMemeEditActive()) return;
    var elContainer = document.querySelector('.canvas-container');
    // Note: changing the canvas dimension this way clears the canvas
    var selectedImg = getImg();
    var img = new Image();
    img.src = selectedImg.url;
    img.onload = () => {
        var elCanvas = getCanvas();
        elCanvas.width = elContainer.offsetWidth;
        elCanvas.height = (img.height * elCanvas.width) / img.width;
        renderCanvas();
    };

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
    var elEditorBox = document.querySelector('.editor-box');
    elEditorBox.classList.add('flex');
    elEditorBox.hidden = false;
    var elGalleryNav = document.querySelector('.gallery-nav');
    elGalleryNav.classList.remove('active');
    setMeme(imgId);
    resizeCanvas();
    var elGallery = document.querySelector('.images-gallery');
    elGallery.hidden = true;
    elGallery.classList.remove('grid');
}

function backToGallery() {
    var elEditorBox = document.querySelector('.editor-box');
    elEditorBox.classList.remove('flex');
    elEditorBox.hidden = true;
    var elGalleryNav = document.querySelector('.gallery-nav');
    elGalleryNav.classList.add('active');
    clearMeme();
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
    var elLineStrokeColor = document.querySelector('[name=text-color-picker]');
    var elLineFont = document.querySelector('[name=select-font-family]');
    if (selectedLine) {
        elLineText.value = selectedLine.txt;
        elLineColor.value = selectedLine.color;
        elLineStrokeColor.value = selectedLine.strokeColor;
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

function onChangeTextStrokeColor(strokeColor) {
    setTextStrokeColor(strokeColor);
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