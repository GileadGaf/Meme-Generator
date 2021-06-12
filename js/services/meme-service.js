// var gWordCountMap = { 'happy': 1, 'funny puk': 1 }
var gImgs = createImgs();
var gMemes = [];
var gMeme;
var gMemeImg;
//TODO: Create an array of gmemes
function createMeme(imgId) {
    return {
        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines: []
    };
}

function createImg(id) {
    return {
        id,
        url: 'img/memes/' + id + '.jpg'
    };
}

function createImgs() {
    var imgs = [];
    for (var i = 1; i <= 18; i++) {
        var newImg = createImg(i);
        imgs.push(newImg);
    }
    return imgs;
}

function getNewMeme(imgId) {
    var newMeme = createMeme(imgId);
    gMemes.push(newMeme);
    return newMeme;

}

function setMeme(imgId) {
    var selectedMeme = gMemes.find(meme => meme.selectedImgId === imgId);
    if (!selectedMeme) selectedMeme = getNewMeme(imgId);
    gMeme = selectedMeme;
    if (!gMeme.lines.length) addLine();
    gMemeImg = _getMemeImg();
}

function getImgs() {
    return gImgs;
}


// Assigning gMemeImg
function _getMemeImg() {
    var selectedImg = gImgs.find(img => img.id === gMeme.selectedImgId);
    return selectedImg;
}

//Controller will be using this function to get the img props
function getImg() {
    return gMemeImg;
}




function getMemeLines() {
    return gMeme.lines;
}

function getSelectedLine() {
    if (!gMeme) return;
    if (gMeme.selectedLineIdx >= gMeme.lines.length) return null;
    var selectedLine = gMeme.lines[gMeme.selectedLineIdx];
    return selectedLine;
}

function saveLinePos(idx, pos) {
    if (idx < 0 || idx >= gMeme.lines.length) return;

    var line = gMeme.lines[idx];
    line.pos = pos;

}

function setLineWidth(idx, width) {
    var line = gMeme.lines[idx];
    line.width = width;
}

function changeCanvasText(canvasText) {
    var selectedLine = getSelectedLine();
    if (selectedLine) selectedLine.txt = canvasText;
}


function changeFontSize(diff) {
    var selectedLine = getSelectedLine();
    if (selectedLine) selectedLine.size += diff;
}

function changeTextVerticalPos(yDelta) {
    var selectedLine = getSelectedLine();
    if (selectedLine) selectedLine.pos.y += yDelta;

}

function switchSelectedLines() {
    var newIdx = gMeme.selectedLineIdx + 1
    if (newIdx === 0) {
        newIdx = gMeme.lines.length - 1;
    } else if (newIdx === gMeme.lines.length) {
        newIdx = 0;
    }
    selectLine(newIdx);
}

function selectLine(idx) {
    gMeme.selectedLineIdx = idx;
}

function addLine() {
    var newLine = {
        txt: '',
        size: 32,
        fontFamily: 'IMPACT',
        color: '#ffffff',
        pos: null,
        width: 0,
        isDrag: false
    }
    if (gMeme) {
        gMeme.lines.push(newLine);
        selectLine(gMeme.lines.length - 1);
    }

}

function deleteLine() {
    var lineIdx = gMeme.selectedLineIdx;
    gMeme.lines.splice(lineIdx, 1);
    if (lineIdx > 0) selectLine(lineIdx - 1);
    else selectLine(0);
}


function setFont(fontFamily) {
    var selectedLine = getSelectedLine();
    if (selectedLine) selectedLine.fontFamily = fontFamily;
}

function setTextColor(color) {
    var selectedLine = getSelectedLine();
    if (selectedLine) selectedLine.color = color;
}