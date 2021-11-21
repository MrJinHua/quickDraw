const ctx = canvas.getContext('2d');
const strokePoints = [];


class Brush {
    constructor(pos, width, color) {
        this.pos = pos;
        this.width = width;
        this.color = color;
    }

    draw() {
        ctx.strokeStyle = '#aa0000'
        ctx.beginPath()
        ctx.moveTo(this.pos[0].x, this.pos[0].y);
        for (let i = 0; i < this.pos.length; i++) {
            ctx.lineTo(this.pos[i].x, this.pos[i].y)
        }
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;
        ctx.lineCap = 'round';
        ctx.stroke();
    }
}

class Rect {
    constructor(x, y, width, height, fillColor, strokeColor, strokeWidth) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.fillColor = fillColor;
        this.strokeColor = strokeColor;
        this.strokeWidth = strokeWidth;
    }

    draw() {
        ctx.fillStyle = this.fillColor;
        ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.strokeStyle = this.strokeColor;
        ctx.lineWidth = this.strokeWidth;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}

class Circle {
    constructor(x, y, r, fillColor, strokeColor, strokeWidth) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.fillColor = fillColor;
        this.strokeColor = strokeColor;
        this.strokeWidth = strokeWidth;
    }

    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
        ctx.fillStyle = this.fillColor;
        ctx.fill();
        ctx.strokeStyle = this.strokeColor;
        ctx.lineWidth = this.strokeWidth;
        ctx.stroke();
    }
}

class Text {
    constructor(context, fontSize, fontColor, fontFamily, x, y, maxWidth) {
        this.context = context;
        this.fontSize = fontSize;
        this.fontColor = fontColor;
        this.fontFamily = fontFamily;
        this.x = x;
        this.y = y;
        this.maxWidth = maxWidth;
    }

    draw() {
        ctx.fillStyle = this.fontColor;
        ctx.font = this.fontSize + "px" + " " + this.fontFamily;
        // ctx.font = "48px serif";
        ctx.fillText(this.context, this.x, this.y, this.maxWidth);
    }
}

export { Brush, Rect, Circle, Text }