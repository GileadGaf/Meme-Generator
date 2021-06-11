var gLine = getSelectedLine();
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];
var gStartPos;


function isTextClicked(line, clickedPos) {
    if (!line) return;
    var rectHeight = line.size + 10;
    var rectWidth = gCtx.measureText(line.txt).width + 20

    var rectX = line.pos.x;
    var rectY = line.pos.y;

    var point1 = { x: rectX, y: rectY };
    var point2 = { x: rectWidth + rectX, y: rectY + rectHeight };
    var isTouched = clickedPos.x >= point1.x && clickedPos.x <= point2.x && clickedPos.y >= point1.y && clickedPos.y <= point2.y;
    return isTouched;
}

function drawArc(x, y, size = 60, color = 'blue') {
    gCtx.beginPath()
    gCtx.lineWidth = '4'
    gCtx.arc(x, y, size, 0, 2 * Math.PI)
    gCtx.strokeStyle = 'white'
    gCtx.stroke()
    gCtx.fillStyle = color
    gCtx.fill()
    gCtx.closePath();
}

function setTextDrag(selectedLine, idx, isDrag) {
    if (!selectedLine) return;
    selectedLine.isDrag = isDrag;
    if (isDrag) gLine = selectedLine;
    gMeme.selectedLineIdx = idx;
}

function moveLine(dx, dy) {
    gLine.pos.x += dx
    gLine.pos.y += dy
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}


function onDown(ev) {
    var lines = getMemeLines();
    const pos = getEvPos(ev);
    var selectedLine = lines.find(line => isTextClicked(line, pos));
    if (!selectedLine) return;
    var lineIdx = lines.findIndex(line => line.pos === selectedLine.pos);
    setTextDrag(selectedLine, lineIdx, true)
    gStartPos = pos
    document.body.style.cursor = 'grabbing'

}

function onMove(ev) {
    var lines = getMemeLines();
    const pos = getEvPos(ev)
    gLine = lines.find(line => isTextClicked(line, pos));
    if (!gLine) {
        document.body.style.cursor = 'default';
        return;
    }

    document.body.style.cursor = 'grab';
    if (gLine.isDrag) {
        const pos = getEvPos(ev)
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y
        moveLine(dx, dy)
        gStartPos = pos
        renderCanvas()
    }
}

function onUp() {
    setTextDrag(gLine, gMeme.selectedLineIdx, false);
    document.body.style.cursor = 'grab'
}


function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}