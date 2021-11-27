
//获取DOM元素
const singleSelectTool = document.querySelector('.singleSelectTool');
const mutilSelectTool = document.querySelector('.mutilSelectTool');
const brushTool = document.querySelector('.brushTool');
const lineTool = document.querySelector('.lineTool');
const rectTool = document.querySelector('.rectTool');
const circleTool = document.querySelector('.circleTool');
const curveTool = document.querySelector('.curveTool');
const textTool = document.querySelector('.textTool');
const polygonTool = document.querySelector('.polygonTool');
const fillColor = document.querySelector('#fill-color');
const noFillColor = document.querySelector('.no-fill-btn');
const noStrokeColor = document.querySelector('.no-stroke-btn');
const strokeColor = document.querySelector('#stroke-color');
const widthNum = document.querySelector('#stroke-width');
const polygonNum = document.querySelector('#polygonNumber');
const fontFamily = document.querySelector('#font-family')
const fontSize = document.querySelector('#font-size');
const layersNumber = document.querySelector('.layer-number');
const up = document.querySelector('.layer-up');
const down = document.querySelector('.layer-down');
const top = document.querySelector('.layer-top');
const bottom = document.querySelector('.layer-bottom');

const canvas = document.querySelector('#canvas');
let canvasW = window.innerWidth - canvas.offsetLeft;
let canvasH = window.innerHeight - 4;
canvas.width = canvasW;;
canvas.height = canvasH;
const ctx = canvas.getContext('2d');

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
const selectedLayers = [];
//多选中
const multiSelected = [];
const area = { x1: 0, y1: 0, x2: 0, y2: 0 };
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
    control: null
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

const polygon = {
    n: 3,
    r: 0,
    deg: 0
}

export {
    singleSelectTool, mutilSelectTool, brushTool, lineTool, rectTool, circleTool, curveTool, textTool, polygonTool,
    fillColor, noStrokeColor, strokeColor, noFillColor, canvas, ctx, toolState, widthNum, polygonNum, fontFamily, fontSize,
    strokePoints, layers, selectedLayers, multiSelected, area, pos, color,
    selected, text, polygon, layersNumber, up, down, top, bottom
};