export function line() {

    let move = 0;

    this.update = function (myGameArea) {
        let ctx = myGameArea.context;
        ctx.fillStyle = 'black';
        let y = -50;
        let width = 50;
        var space = 30;
        for (let i = -1; i < 17; i += 1) {
            y = width * i + space * i;
            ctx.fillRect(195, y + move, 10, width);
        }
        move++;
        if (move > width + space) {
            move = 0;
        }
    }
}