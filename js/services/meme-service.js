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
            align: 'center',
            color: 'black',
            pos: { x: 200, y: 50 }
        },
        {
            txt: 'I always eat Falafel',
            size: 32,
            align: 'center',
            color: 'black',
            pos: { x: 200, y: 480 }
        }
    ]
}

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
    var selectedLine = gMeme.lines[gMeme.selectedLineIdx];
    return selectedLine;
}

function changeCanvasText(canvasText) {
    var selectedLine = getSelectedLine();
    selectedLine.txt = canvasText;
}

function changeFontSize(diff) {
    var selectedLine = getSelectedLine();
    selectedLine.size += diff;
}

function changeTextVerticalPos(yDelta) {
    var selectedLine = getSelectedLine();
    selectedLine.pos.y += yDelta;
}

function switchSelectedLines() {
    if (gMeme.selectedLineIdx < gMeme.lines.length - 1) {
        gMeme.selectedLineIdx++;
    } else if (gMeme.selectedLineIdx > 0) {
        gMeme.selectedLineIdx--;
    }
}