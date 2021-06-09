var gKeywords = { 'happy': 1, 'funny puk': 1 }
var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['happy'] }];
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [{
        txt: 'I never eat Falafel',
        size: 32,
        align: 'center',
        color: 'black',
        pos: { x: 200, y: 40 }
    }]
}

function getMeme() {
    return gMeme;
}

function getMemeImage() {
    var selectedImg = gImgs.find(img => img.id === gMeme.selectedImgId);
    return selectedImg;

}

function getMemeText() {
    var selectedLine = gMeme.lines[gMeme.selectedLineIdx];
    return selectedLine;
}

function changeCanvasText(canvasText) {
    var selectedLine = getMemeText();
    selectedLine.txt = canvasText;
}