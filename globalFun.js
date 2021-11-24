import {
    singleSelectTool, mutilSelectTool, brushTool, rectTool, circleTool, curveTool, textTool, polygonTool,
    fillColor, noStrokeColor, strokeColor, noFillColor, canvas, ctx, toolState, widthNum, polygonNum, fontFamily, fontSize,
    strokePoints, layers, selectedLayers, pos, color,
    selected, text, polygon, layersNumber, up, down, top, bottom
} from './globalVar.js'

import { Brush, Rect, Circle, Text, Polygon } from './class.js'

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
    layersNumber.textContent = layers.length + 1;
}

function removeTextarea() {
    if (text.node && text.node.parentNode) {
        text.context = text.node.value;
        text.node.parentNode.removeChild(text.node);
        if (text.context) {
            let newText = new Text(text.context, text.fontSize, text.fontColor, text.fontFamily, text.x, text.y);
            layers.push(newText)
        }
    }
    drawLayers()
}

//单选之后，点击工具图标，选中框消失
function removeControler() {

}


// 根据每个item的构造函数来确定其是个什么图形
// 整个具体图形，确实其是否被选中
function getSingleSelected() {
    for (let i = 0; i < layers.length; i++) {
        let item = layers[i];

        if (item.constructor.name === "Rect") {
            if (item.x < pos.x && item.x + item.width > pos.x && item.y < pos.y && item.y + item.height > pos.y) {
                selected.item = item;
                return true;
            }
        }

        if (item.constructor.name === "Circle") {
            let dis = ((item.x - pos.x) ** 2 + (item.y - pos.y) ** 2) ** 0.5;
            if ((dis <= item.r)) {
                selected.item = item;
                return true;
            }
        }

        if (item.constructor.name === "Brush") {
            let points = item.pos;
            let allX = points.map(point => point.x)
            let allY = points.map(point => point.y)
            let maxX = Math.max(...allX);
            let minX = Math.min(...allX);
            let maxY = Math.max(...allY);
            let minY = Math.min(...allY);

            if (pos.x > minX && pos.x < maxX && pos.y > minY && pos.y < maxY) {
                selected.item = item;
                return true;
            }
        }

        if (item.constructor.name === "Line") {
            let x1, x2, y1, y2;
            if (item.x2 > item.x1) {
                x1 = item.x1;
                x2 = item.x2;
            } else {
                x1 = item.x2;
                x2 = item.x1
            }
            if (item.y2 > item.y1) {
                y1 = item.y1;
                y2 = item.y2;
            } else {
                y1 = item.y2;
                y2 = item.y1
            }
            if (x1 < pos.x && x2 > pos.x && y1 < pos.y && y2 > pos.y) {
                selected.item = item;
                return true;
            }
        }

        if (item.constructor.name === "Polygon") {
            let dis = ((item.x - pos.x) ** 2 + (item.y - pos.y) ** 2) ** 0.5;
            if ((dis <= item.r)) {
                selected.item = item;
                return true;
            }
        }

        if (item.constructor.name === "Text") {
            let x1 = item.x,
                y1 = item.y - Number(item.fontSize),
                x2 = item.x + item.context.length * Number(item.fontSize),
                y2 = item.y;

            if (x1 < pos.x && x2 > pos.x && y1 < pos.y && y2 > pos.y) {
                selected.item = item;
                return true;
            }
        }
    }
}

function getControl() {
    for (let i = 0; i < selectedLayers.length; i++) {
        let item = selectedLayers[i];

        function dis(x, y) {
            return ((x - pos.x) ** 2 + (y - pos.y) ** 2) ** 0.5;
        }
        // const controlPointers = [[item.x1, item.y1], [item.x2, item.y1], [item.x2, item.y2], [item.x1, item.y2]];
        // controlPointers.forEach((p) => {
        //     if (dis(p[0], p[1]) < 10) {
        //         // console.log(6789)
        //         selected.control = item;
        //         return true;
        //     }
        // })

        if (dis(item.x2, item.y2) < 10) {
            // console.log(item)
            selected.control = item;
            return true;
        }
    }
}

export { add, remove, open, getPos, clearAll, drawLayers, removeTextarea, getSingleSelected, getControl };