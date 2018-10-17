import motorbikePng from '../motorbike.png';

export class bike {
    width = 60;
    height = 150;
    speedX = 2;
    speedY = 3;
    x = 200;
    y = 600;

    up() {
        if (this.y == 0)
            return;

        this.y -= this.speedY;
    }
    down(cheat = false) {
        if (this.y > 670 && !cheat)
            return;

        this.y += this.speedY;

    }

    left() {
        if (this.x == 0)
            return;

        this.x -= this.speedX;

    }

    right() {
        if (this.x > 320)
            return;

        this.x += this.speedX;
    }

    update(myGameArea) {
        let ctx = myGameArea.context;
        ctx.fillStyle = "#D8D8D8";
        var img = new Image();
        img.src = motorbikePng;
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(img, this.x - 58, this.y - 25);

    }
    newPos(myGameArea) {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    crashWith(otherobj) {
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