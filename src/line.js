export class line {
    move
    positionX

    constructor(positionX) {
        this.move = 0;
        this.positionX = positionX;
    }

    update(myGameArea) {
        let ctx = myGameArea.context;
        ctx.fillStyle = 'grey';
        let y = -50;
        let width = 50;
        var space = 30;
        for (let i = -1; i < 17; i += 1) {
            y = width * i + space * i;
            ctx.fillRect(window.innerWidth/2, y + this.move, 10, width);
        }
        this.move += 4;
        if (this.move > width + space) {
            this.move = 0;
        }
    }
}