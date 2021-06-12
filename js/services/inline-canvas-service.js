const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];
var gLine;
var gStartPos;


function isTextClicked(line, clickedPos) {
    if (!line || !line.pos) return;
    var rectHeight = line.size + 10;
    var rectWidth = line.width + 20;

    var rectX = line.pos.x;
    var rectY = line.pos.y;

    var point1 = { x: rectX, y: rectY };
    var point2 = { x: rectWidth + rectX, y: rectY + rectHeight };
    var isTouched = clickedPos.x >= point1.x && clickedPos.x <= point2.x &&
        clickedPos.y >= point1.y && clickedPos.y <= point2.y;

    return isTouched;
}


function setTextDrag(selectedLine, isDrag) {
    if (!selectedLine) return;
    selectedLine.isDrag = isDrag;
    if (isDrag) gLine = selectedLine;

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
    gElCanvas.addEventListener('touchmove', onMove, event)
    gElCanvas.addEventListener('touchstart', onDown, event)
    gElCanvas.addEventListener('touchend', onUp)
}


function onDown(ev) {
    var lines = getMemeLines();
    const pos = getEvPos(ev);
    var touchedLine = lines.find(line => isTextClicked(line, pos));
    if (!touchedLine) {
        selectLine(-1);
        renderCanvas();
        return;
    }
    var lineIdx = lines.findIndex(line => line.pos === touchedLine.pos);
    setTextDrag(touchedLine, true)
    selectLine(lineIdx);
    gLine = getSelectedLine();
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
    renderCanvas();

}

function onMove(ev) {
    var lines = getMemeLines();
    const pos = getEvPos(ev)

    var touchedLine = lines.find(line => isTextClicked(line, pos));
    if (!touchedLine) {
        document.body.style.cursor = 'default';
        return;
    }

    document.body.style.cursor = 'grab';
    if (gLine && gLine.isDrag) {
        const pos = getEvPos(ev)
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y
        moveLine(dx, dy)
        gStartPos = pos
        renderCanvas()
    }
}

function onUp() {
    setTextDrag(gLine, false);
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