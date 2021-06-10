var gKeywords = { 'happy': 1, 'funny puk': 1 }
var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['happy'] },
    { id: 2, url: 'img/2.jpg', keywords: ['happy'] }
];
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [{
            txt: 'I never eat Falafel',
            size: 32,
            align: 'CENTER',
            color: '#ffffff',
            pos: null
        },
        {
            txt: 'I always eat Falafel',
            size: 32,
            align: 'CENTER',
            color: '#ffffff',
            pos: null
        }
    ]
}

var gDiff = 1;

function getMeme() {
    return gMeme;
}

function getImgs() {
    return gImgs;
}

function getMemeImage() {
    var selectedImg = gImgs.find(img => img.id === gMeme.selectedImgId);
    return selectedImg;

}

function getMemeLines() {
    return gMeme.lines;
}

function getSelectedLine() {
    if (gMeme.selectedLineIdx >= gMeme.lines.length) return null;
    var selectedLine = gMeme.lines[gMeme.selectedLineIdx];
    return selectedLine;
}

function saveLinePos(idx, pos) {
    if (idx < 0 || idx >= gMeme.lines.length) return;

    var line = gMeme.lines[idx];
    line.pos = pos;

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
    if (newIdx < 0) {
        newIdx = gMeme.lines.length - 1;
    } else
    if (newIdx === gMeme.lines.length) newIdx = 0;
    gMeme.selectedLineIdx = newIdx;
}

function addLine() {
    var newLine = {
        txt: 'Enter text here',
        size: 32,
        align: 'CENTER',
        color: '#ffffff',
        pos: null
    }
    gMeme.lines.push(newLine);
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

function deleteLine() {
    var lineIdx = gMeme.selectedLineIdx;
    gMeme.lines.splice(lineIdx, 1);
    gMeme.selectedLineIdx = 0;
}

function setLineAlignment(alignment) {
    var selectedLine = getSelectedLine();
    if (selectedLine) selectedLine.align = alignment
}

function setTextColor(color) {
    var selectedLine = getSelectedLine();
    if (selectedLine) selectedLine.color = color;
}