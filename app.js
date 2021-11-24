import {
    singleSelectTool, mutilSelectTool, brushTool, lineTool, rectTool, circleTool, curveTool, textTool,
    polygonTool, fillColor, noStrokeColor, strokeColor, noFillColor, canvas, ctx, toolState, widthNum, polygonNum, fontFamily, fontSize,
    strokePoints, layers, selectedLayers, pos, color,
    selected, text, polygon, layersNumber, up, down, top, bottom
} from './globalVar.js'

import { add, remove, open, getPos, clearAll, drawLayers, removeTextarea, getSingleSelected, getControl } from './globalFun.js'
import { Brush, Line, Rect, Circle, Text, Polygon, Control } from './class.js'

// 获取填充颜色，描边颜色，边框粗细
fillColor.addEventListener('change', (e) => {
    color.fill = e.target.value;
    text.fontColor = e.target.value;
    if (selected.item) {
        selected.item.fillColor = color.fill;
        selected.item.fontColor = color.fill;
        clearAll()
        drawLayers()
    }
})
strokeColor.addEventListener('change', (e) => {
    color.stroke = e.target.value;
    if (selected.item) {
        selected.item.strokeColor = color.stroke;
        clearAll();
        drawLayers();
    }
})
widthNum.addEventListener('change', (e) => {
    color.width = Number(e.target.value);
    if (selected.item) {
        selected.item.strokeWidth = color.width;
        clearAll();
        drawLayers();
    }
})
polygonNum.addEventListener('change', (e) => {
    polygon.n = Number(e.target.value);
    if (selected.item) {
        selected.item.n = polygon.n;
        clearAll();
        drawLayers();
    }
})
fontFamily.addEventListener('change', (e) => {
    text.fontFamily = e.target.value;
    if (selected.item) {
        selected.item.fontFamily = text.fontFamily;
        clearAll();
        drawLayers();
    }
})
fontSize.addEventListener('change', (e) => {
    text.fontSize = Number(e.target.value);
    if (selected.item) {
        selected.item.fontSize = text.fontSize;
        clearAll();
        drawLayers();
    }
})
noFillColor.onclick = function () {
    color.fill = "transparent";
    fillColor.value = "#000000";
    if (selected.item) {
        selected.item.fillColor = color.fill;
        clearAll();
        drawLayers();
    }
}
noStrokeColor.onclick = function () {
    color.stroke = "transparent";
    strokeColor.value = "#000000";
    if (selected.item) {
        selected.item.strokeColor = color.stroke;
        clearAll();
        drawLayers();
    }
}

//调整图层顺序
// up.onclick = function () {
//     if (selected.item) {
//         let index = layers.indexOf(selected.item)
//         if (index > 0) {
//             let curr = index[index];
//             layers[index] = layers[index + 1];
//             layers[index + 1] = curr;
//         }
//         clearAll();
//         drawLayers()

//     }
// }

//画笔 ————————————————————————————————————————————
brushTool.onclick = function () {
    removeTextarea();
    remove(lineTool, startLine, stopLine);
    remove(singleSelectTool, startSingleSelect, stopSingleSelect);
    remove(mutilSelectTool, startMutilSelect, stopMutilSelect);
    remove(rectTool, startRect, stopRect);
    remove(circleTool, startCircle, stopCircle);
    remove(textTool, startText, stopText);
    remove(polygonTool, startPolygon, stopPolygon);
    add(brushTool, startBrush, stopBrush);
}

function startBrush(e) {

    pos.x = getPos(e).x;
    pos.y = getPos(e).y;

    ctx.beginPath()
    ctx.moveTo(pos.x, pos.y);

    canvas.addEventListener('mousemove', drawBrush);
}

function drawBrush(e) {

    strokePoints.push({ x: getPos(e).x, y: getPos(e).y })
    ctx.lineTo(getPos(e).x, getPos(e).y);
    ctx.strokeStyle = color.fill;
    ctx.lineWidth = color.width;
    ctx.lineCap = 'round';
    ctx.stroke();

}

function stopBrush() {
    canvas.removeEventListener('mousemove', drawBrush);
    layers.push(new Brush([...strokePoints], color.width, color.fill))
    strokePoints.length = 0;
    clearAll();
    drawLayers();
}

//直线————————————————————————————————————————————
lineTool.onclick = function () {
    removeTextarea();
    remove(brushTool, startBrush, stopBrush);
    remove(singleSelectTool, startSingleSelect, stopSingleSelect);
    remove(mutilSelectTool, startMutilSelect, stopMutilSelect);
    remove(rectTool, startRect, stopRect);
    remove(circleTool, startCircle, stopCircle);
    remove(textTool, startText, stopText);
    remove(polygonTool, startPolygon, stopPolygon);
    add(lineTool, startLine, stopLine);
}

function startLine(e) {
    pos.x = getPos(e).x;
    pos.y = getPos(e).y;
    canvas.addEventListener('mousemove', drawLine);
}

function drawLine(e) {
    clearAll();
    drawLayers();
    new Line(pos.x, pos.y, getPos(e).x, getPos(e).y, color.fill, color.width).draw();

}

function stopLine(e) {
    canvas.removeEventListener('mousemove', drawLine);
    layers.push(new Line(pos.x, pos.y, getPos(e).x, getPos(e).y, color.fill, color.width));
}

// 矩形——————————————————————————————————————————————————
rectTool.onclick = function () {
    removeTextarea();
    remove(lineTool, startLine, stopLine);
    remove(singleSelectTool, startSingleSelect, stopSingleSelect);
    remove(mutilSelectTool, startMutilSelect, stopMutilSelect);
    remove(brushTool, startBrush, stopBrush);
    remove(circleTool, startCircle, stopCircle);
    remove(textTool, startText, stopText);
    remove(polygonTool, startPolygon, stopPolygon);
    add(rectTool, startRect, stopRect);
}

function startRect(e) {
    pos.x = getPos(e).x;
    pos.y = getPos(e).y;
    canvas.addEventListener('mousemove', drawRect);
}

let rectWidth, rectHeight;
function drawRect(e) {
    clearAll();
    drawLayers();
    rectWidth = getPos(e).x - pos.x;
    rectHeight = getPos(e).y - pos.y;
    ctx.fillStyle = color.fill;
    ctx.fillRect(pos.x, pos.y, rectWidth, rectHeight);
    ctx.strokeStyle = color.stroke;
    ctx.lineWidth = color.width;
    ctx.strokeRect(pos.x, pos.y, rectWidth, rectHeight)
}

function stopRect() {
    canvas.removeEventListener('mousemove', drawRect);
    let newRect = new Rect(pos.x, pos.y, rectWidth, rectHeight, color.fill, color.stroke, color.width)
    layers.push(newRect);
}


// 圆形——————————————————————————————————
circleTool.onclick = function () {
    // clearAll();
    // drawLayers();
    removeTextarea();
    remove(singleSelectTool, startSingleSelect, stopSingleSelect);
    remove(mutilSelectTool, startMutilSelect, stopMutilSelect)
    remove(brushTool, startBrush, stopBrush);
    remove(lineTool, startLine, stopLine);
    remove(rectTool, startRect, stopRect);
    remove(polygonTool, startPolygon, stopPolygon);
    remove(textTool, startText, stopText)

    add(circleTool, startCircle, stopCircle);
}

function startCircle(e) {
    pos.x = getPos(e).x;
    pos.y = getPos(e).y;
    canvas.addEventListener('mousemove', drawCircle);
}

let ridus;
function drawCircle(e) {
    clearAll();
    ridus = ((getPos(e).x - pos.x) ** 2 + (getPos(e).y - pos.y) ** 2) ** 0.5;
    drawLayers();
    ctx.beginPath()
    ctx.arc(pos.x, pos.y, ridus, 0, Math.PI * 2);
    ctx.fillStyle = color.fill;
    ctx.fill();
    ctx.strokeStyle = color.stroke;
    ctx.lineWidth = color.width;
    ctx.stroke();
}

function stopCircle() {
    canvas.removeEventListener('mousemove', drawCircle);
    let newCircle = new Circle(pos.x, pos.y, ridus, color.fill, color.stroke, color.width);
    layers.push(newCircle);
    console.log(layers)
}


// 单选工具——————————————————————————————————————
singleSelectTool.onclick = function () {
    removeTextarea();
    remove(mutilSelectTool, startMutilSelect, stopMutilSelect);
    remove(brushTool, startBrush, stopBrush);
    remove(rectTool, startRect, stopRect);
    remove(lineTool, startLine, stopLine);
    remove(circleTool, startCircle, stopCircle);
    remove(polygonTool, startPolygon, stopPolygon);
    remove(textTool, startText, stopText);
    add(singleSelectTool, startSingleSelect, stopSingleSelect);
}

function startSingleSelect(e) {
    pos.x = getPos(e).x;
    pos.y = getPos(e).y;
    // 判断选中的函数, 如果点击的空处，则取消选中，
    if (!getSingleSelected()) {
        selected.item = null;
        clearAll();
        drawLayers();
    }

    if (getSingleSelected()) {
        canvas.addEventListener('mousemove', move)
    }
}

const controler = { x1: 0, y1: 0, x2: 0, y2: 0 }

function move(e) {
    if (selected.item) {
        clearAll();
        //绘制选中的提示框，不加入layers中，只是临时的
        const shape = selected.item;
        if (shape.constructor.name === "Brush") {
            // console.log(minX, maxX, minY, maxY)
            shape.pos.forEach(point => {
                point.x = point.x + getPos(e).x - pos.x;
                point.y = point.y + getPos(e).y - pos.y;
                controler.x1 = Math.min(...shape.pos.map(p => p.x))
                controler.y1 = Math.min(...shape.pos.map(p => p.y))
                controler.x2 = Math.max(...shape.pos.map(p => p.x))
                controler.y2 = Math.max(...shape.pos.map(p => p.y))
            })
        } else if (shape.constructor.name === "Rect") {
            shape.x = shape.x + getPos(e).x - pos.x;
            shape.y = shape.y + getPos(e).y - pos.y;
            controler.x1 = shape.x;
            controler.y1 = shape.y;
            controler.x2 = controler.x1 + shape.width;
            controler.y2 = controler.y1 + shape.height;
        } else if (shape.constructor.name === "Circle" || shape.constructor.name === "Polygon") {
            shape.x = shape.x + getPos(e).x - pos.x;
            shape.y = shape.y + getPos(e).y - pos.y;
            controler.x1 = shape.x - shape.r;
            controler.y1 = shape.y - shape.r;
            controler.x2 = shape.x + shape.r;
            controler.y2 = shape.y + shape.r;
        } else if (shape.constructor.name === "Text") {
            shape.x = shape.x + getPos(e).x - pos.x;
            shape.y = shape.y + getPos(e).y - pos.y;
            controler.x1 = shape.x
            controler.y1 = shape.y - Number(shape.fontSize);
            controler.x2 = shape.x + shape.context.length * Number(shape.fontSize);
            controler.y2 = shape.y;
        } else if (shape.constructor.name === "Line") {
            console.log(99)
            shape.x1 = shape.x1 + getPos(e).x - pos.x;
            shape.y1 = shape.y1 + getPos(e).y - pos.y;
            shape.x2 = shape.x2 + getPos(e).x - pos.x;
            shape.y2 = shape.y2 + getPos(e).y - pos.y;
            controler.x1 = shape.x1;
            controler.y1 = shape.y1;
            controler.x2 = shape.x2;
            controler.y2 = shape.y2;
        }
        new Control(controler.x1, controler.y1, controler.x2, controler.y2, shape).draw()

        pos.x = getPos(e).x;
        pos.y = getPos(e).y;
        drawLayers()
    };
}

function stopSingleSelect() {
    canvas.removeEventListener('mousemove', move)
}

// 多选————————————————————————————————————————————————
mutilSelectTool.onclick = function () {
    removeTextarea()
    remove(singleSelectTool, startSingleSelect, stopSingleSelect);
    remove(brushTool, startBrush, stopBrush);
    remove(rectTool, startRect, stopRect);
    remove(lineTool, startLine, stopLine);
    remove(circleTool, startCircle, stopCircle);
    remove(polygonTool, startPolygon, stopPolygon);
    remove(textTool, startText, stopText);
    add(mutilSelectTool, startMutilSelect, stopMutilSelect);
}

const area = { x1: 0, y1: 0, x2: 0, y2: 0 };
function startMutilSelect(e) {
    area.x1 = getPos(e).x;
    area.y1 = getPos(e).y;
    canvas.addEventListener('mousemove', selectArea)
}

function selectArea(e) {
    clearAll();
    drawLayers();
    area.x2 = getPos(e).x;
    area.y2 = getPos(e).y;
    ctx.strokeStyle = selected.borderColor;
    ctx.strokeRect(area.x1, area.y1, (area.x2 - area.x1), (area.y2 - area.y1));


}

function stopMutilSelect() {
    canvas.removeEventListener('mousemove', selectArea)
    clearAll();
    drawLayers();
}

// 文字工具————————————————————————————————————
textTool.onclick = function () {
    remove(singleSelectTool, startSingleSelect, stopSingleSelect);
    remove(mutilSelectTool, startMutilSelect, stopMutilSelect)
    remove(brushTool, startBrush, stopBrush);
    remove(rectTool, startRect, stopRect);
    remove(lineTool, startLine, stopLine);
    remove(circleTool, startCircle, stopCircle);
    remove(polygonTool, startPolygon, stopPolygon);
    add(textTool, startText, stopText);
}

function startText(e) {
    pos.x = getPos(e).x;
    pos.y = getPos(e).y;
    if (text.node && text.node.parentNode) {
        text.context = text.node.value;
        text.node.parentNode.removeChild(text.node);
        if (text.context) {
            let newText = new Text(text.context, text.fontSize, text.fontColor, text.fontFamily, text.x, text.y);
            layers.push(newText)
        }
    }
    canvas.addEventListener('mousemove', drawTextarea);
}

function drawTextarea(e) {
    clearAll();
    drawLayers();
    //绘制文本提示框
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    ctx.lineTo(getPos(e).x, pos.y)
    ctx.lineTo(getPos(e).x, getPos(e).y)
    ctx.lineTo(pos.x, getPos(e).y)
    ctx.closePath();
    ctx.lineWidth = 0.1;
    ctx.stroke()
}

function stopText(e) {
    text.x = pos.x;
    text.y = pos.y + Number(text.fontSize);

    let width = getPos(e).x - pos.x;
    let height = getPos(e).y - pos.y;

    width = (width > 100) ? width : 100;
    height = (height > 40) ? height : 40;
    canvas.removeEventListener('mousemove', drawTextarea)
    clearAll();
    drawLayers();
    //文本提示框消失后，textarea马上出来，textarea的正好与canvas画的提示框重合
    text.node = document.createElement('textarea');
    document.body.append(text.node);
    text.node.focus();
    text.node.style.position = "absolute";
    text.node.style.left = pos.x + canvas.offsetLeft + 'px';
    text.node.style.top = pos.y + 'px';
    text.node.style.width = width + 'px'
    text.node.style.height = height + 'px'
    text.node.style.background = "transparent";
    text.node.style.fontSize = text.fontSize + 'px';
    text.node.style.fontFamily = text.fontFamily;
    text.node.style.color = text.fontColor;
}


//多边形——————————————————————————————————————————
polygonTool.onclick = function () {
    removeTextarea()
    remove(singleSelectTool, startSingleSelect, stopSingleSelect);
    remove(mutilSelectTool, startMutilSelect, stopMutilSelect)
    remove(brushTool, startBrush, stopBrush);
    remove(rectTool, startRect, stopRect);
    remove(lineTool, startLine, stopLine);
    remove(circleTool, startCircle, stopCircle);
    remove(textTool, startText, stopText);
    add(polygonTool, startPolygon, stopPolygon);
}

function startPolygon(e) {
    pos.x = getPos(e).x;
    pos.y = getPos(e).y;
    canvas.addEventListener('mousemove', drawPolygon);
}

function drawPolygon(e) {
    clearAll();
    drawLayers();
    ctx.beginPath()
    polygon.r = ((getPos(e).x - pos.x) ** 2 + (getPos(e).y - pos.y) ** 2) ** 0.5;
    ctx.save()
    ctx.translate(pos.x, pos.y);
    polygon.deg = Math.atan((getPos(e).y - pos.y) / (getPos(e).x - pos.x));
    ctx.moveTo(polygon.r * Math.cos(polygon.deg), polygon.r * Math.sin(polygon.deg))
    ctx.rotate(polygon.deg)
    for (let i = 0; i < polygon.n; i++) {
        ctx.rotate(Math.PI * 2 / polygon.n) * i;
        ctx.lineTo(polygon.r, 0)
    }
    ctx.restore()
    ctx.closePath()
    ctx.strokeStyle = color.stroke;
    ctx.lineWidth = color.width;
    ctx.stroke()
    ctx.fillStyle = color.fill;
    ctx.fill()
}

function stopPolygon(e) {
    canvas.removeEventListener('mousemove', drawPolygon);
    layers.push(new Polygon(polygon.n, pos.x, pos.y, polygon.r, polygon.deg, color.fill, color.stroke, color.width));
}













