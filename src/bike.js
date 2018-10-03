import motorbikePng from '../motorbike.png';

export function bike() {
    this.score = 0;
    this.width = 50;
    this.height = 200;
    this.speedX = 0;
    this.speedY = 0;
    this.x = 200;
    this.y = 600;
    this.update = function (myGameArea) {
        let ctx = myGameArea.context;

        ctx.fillStyle = "black";
        var img = new Image();
        img.src = motorbikePng;
        ctx.fillRect(this.x + 50, this.y, this.width, this.height);
        ctx.drawImage(img, this.x, this.y);
    }
    this.newPos = function (myGameArea) {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    this.crashWith = function (otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}