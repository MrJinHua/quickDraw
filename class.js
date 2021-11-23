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
        //canvas文字，如何换行的问题！
        ctx.fillText(this.context, this.x, this.y, this.maxWidth);
    }
}

class Polygon {
    constructor(n, x, y, r, deg, fillColor, strokeColor, strokeWidth) {
        this.n = n;
        this.x = x;
        this.y = y;
        // this.x2 = x2;
        // this.y2 = y2;
        // this.l = l;
        this.r = r;
        this.deg = deg;
        this.fillColor = fillColor;
        this.strokeColor = strokeColor;
        this.strokeWidth = strokeWidth;
    }

    draw() {
        ctx.beginPath();
        // let r = ((this.x - this.x2) ** 2 + (this.x2 - this.y2) ** 2) ** 0.5;
        ctx.save();
        ctx.translate(this.x, this.y);
        // let deg = Math.atan((getPos(e).y - pos.y) / (getPos(e).x - pos.x));
        ctx.moveTo(this.r * Math.cos(this.deg), this.r * Math.sin(this.deg));
        ctx.rotate(this.deg);
        // ctx.moveTo(this.r, 0);
        for (let i = 0; i < this.n; i++) {
            ctx.rotate(Math.PI * 2 / this.n);
            ctx.lineTo(this.r, 0);
        }
        ctx.restore();
        ctx.closePath();
        ctx.strokeStyle = this.strokeColor;
        ctx.lineWidth = this.strokeWidth;
        ctx.fillStyle = this.fillColor;
        ctx.stroke();
        ctx.fill();
    }
}

class Control {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.x = (this.x1 + this.x2) / 2;
        this.y = (this.y1 + this.y2) / 2;
    }

    draw() {
        let color = "purple";
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.lineTo(this.x1, this.y2);
        ctx.closePath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 0.5;
        ctx.stroke()

        ctx.fillStyle = color;
        ctx.beginPath()
        ctx.arc(this.x1, this.y1, 3, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath()
        ctx.arc(this.x2, this.y1, 3, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath()
        ctx.arc(this.x2, this.y2, 3, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath()
        ctx.arc(this.x1, this.y2, 3, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }


}


export { Brush, Rect, Circle, Text, Polygon, Control }