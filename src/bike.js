import motorbikePng from '../motorbike.png';

export function bike() {
    this.score = 0;
    this.width = 77;
    this.height = 125;
    this.speedX = 0;
    this.speedY = -1;
    this.x = 200;
    this.y = 600;

    this.update = function (myGameArea) {
        let ctx = myGameArea.context;
        ctx.fillStyle = "#D8D8D8";
        var img = new Image();
        img.src = motorbikePng;
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(img, this.x - 50, this.y - 25);

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