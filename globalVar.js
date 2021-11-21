
//获取DOM元素
const singleSelectTool = document.querySelector('.singleSelectTool');
const mutilSelectTool = document.querySelector('.mutilSelectTool');
const brushTool = document.querySelector('.brushTool');
const rectTool = document.querySelector('.rectTool');
const circleTool = document.querySelector('.circleTool');
const tranTool = document.querySelector('.tranTool');
const curveTool = document.querySelector('.curveTool');
const textTool = document.querySelector('.textTool');
const fillColor = document.querySelector('#fill-color');
const strokeColor = document.querySelector('#stroke-color');
const widthNum = document.querySelector('#stroke-width');
const fontFamily = document.querySelector('#font-family')
const fontSize = document.querySelector('#font-size');

const canvas = document.querySelector('#canvas');
let canvasW = window.innerWidth - canvas.offsetLeft;
let canvasH = window.innerHeight - 4;
canvas.width = canvasW;;
canvas.height = canvasH;
const ctx = canvas.getContext('2d');

const domElements = [singleSelectTool, mutilSelectTool, brushTool, rectTool, tranTool, curveTool, textTool,
    fillColor, strokeColor, canvas, ctx]

domElements.forEach(x => {
    x.state = false;
})

// 当前点击的是哪个btn
const toolState = {
    brush: false,
    rect: false,
    tran: false,
    curve: false,
    text: false,
    singleSelect: false,
    mutilSelect: false
}

const strokePoints = [];
const layers = [];
const pos = { x: 0, y: 0 };
const color = { fill: fillColor.value, stroke: strokeColor.value, width: 1 }
const selected = {
    item: null,
    strokeColor: '',
    preFillColor: '',
    preStrokewidth: 0,
    //border为选中是的提示框
    borderColor: 'red',
    borderWidth: 1,

}

const text = {
    context: '',
    fontSize: fontSize.value,
    fontColor: fillColor.value,
    fontFamily: fontFamily.value,
    x: 200,
    y: 200,
    startX: 0,
    recode: [],
    backspace: [],
    node: null
}

export {
    singleSelectTool, mutilSelectTool, brushTool, rectTool, circleTool, tranTool, curveTool, textTool,
    fillColor, strokeColor, canvas, ctx, toolState, domElements, widthNum, fontFamily, fontSize,
    strokePoints, layers, pos, color,
    selected, text
};