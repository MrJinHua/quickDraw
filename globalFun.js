import {
    singleSelectTool, mutilSelectTool, brushTool, rectTool, circleTool, curveTool, textTool,
    fillColor, strokeColor, canvas, ctx, toolState, widthNum,
    strokePoints, layers, pos, color,
    selected
} from './globalVar.js'

//点击时先清楚其他按钮的，再add
function add(ele, start, stop) {
    ele.classList.add('toolClicked');
    canvas.addEventListener('mousedown', start);
    canvas.addEventListener('mouseup', stop);
}
function remove(ele, start, stop) {
    ele.classList.remove('toolClicked');
    canvas.removeEventListener('mousedown', start);
    canvas.removeEventListener('mouseup', stop);
}

function open(tool) {
    // close();
    domElements.forEach(item => {
        item.state = false;
        console.log(item.classList)
        // item.classList.remove('toolClicked');
    })
    tool.state = true;
    tool.classList.add('toolClicked');
    // console.log(domElements)
}


function close() {
    domElements.forEach(x => {
        x.state = false;
        x.classList.remove('toolClicked')
    })
}

function getPos(e) {
    let x = e.clientX - canvas.offsetLeft;
    let y = e.clientY - canvas.offsetTop;
    return { x, y };
}

function clearAll() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function drawLayers() {
    layers.forEach(item => {
        item.draw();
    })
}


// 根据每个item的构造函数来确定其是个什么图形
// 整个具体图形，确实其是否被选中
function getSingleSelected() {
    for (let i = 0; i < layers.length; i++) {
        let item = layers[i];
        // layers.forEach(item => {
        if (item.constructor.name === "Rect") {
            if (item.x < pos.x && item.x + item.width > pos.x && item.y < pos.y && item.y + item.height > pos.y) {
                selected.item = item;
                selected.preStrokeColor = item.strokeColor;
                selected.preStrokeWidth = item.strokeWidth;
                item.strokeColor = selected.borderColor;
                item.strokeWidth = selected.borderWidth;
                return;
            }
            // return;
        }

        if (item.constructor.name === "Circle") {
            let dis = ((item.x - pos.x) ** 2 + (item.y - pos.y) ** 2) ** 0.5;
            if ((dis <= item.r)) {
                selected.item = item;
                selected.preStrokeColor = item.strokeColor;
                selected.preStrokeWidth = item.strokeWidth;
                item.strokeColor = selected.borderColor;
                item.strokeWidth = selected.borderWidth;
                return;
            }
        }

        if (item.constructor.name === "Brush") {
            let points = item.pos;
            let allX = points.map(point => point.x)
            let allY = points.map(point => point.y)
            let maxX = Math.max([...allX]);
            let minX = Math.min([...allX]);
            let maxY = Math.max([...allY]);
            let minY = Math.min([...allY]);

            if (pos.x > minX && pos.x < maxX && pos.y > minY && pos.y < maxY) {
                selected.item = item;
            }
        }


    }
}

export { add, remove, open, getPos, clearAll, drawLayers, getSingleSelected }