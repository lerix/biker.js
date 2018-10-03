import _ from 'lodash';
import {
    model
} from './component.js'
import {
    line
} from './line.js'
import {
    bike
} from './bike.js'

export default function app() {

    var motorbike;
    let lines;
    var enemies = [];
    var myScore;

    var myGameArea = {
        canvas: document.createElement("canvas"),
        start: function () {
            this.canvas.width = 400;
            this.canvas.height = 800;
            this.context = this.canvas.getContext("2d");
            document.body.insertBefore(this.canvas, document.body.childNodes[0]);
            this.frameNo = 0;
            this.interval = setInterval(updateGameArea, 10);
        },
        clear: function () {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }


    function startGame() {
        motorbike = new bike();
        lines = new line();
        motorbike.gravity = 0.05;
        myScore = new model("30px", "Consolas", "black", 0, 24, "text");
        myGameArea.start();
    }
    startGame()

    function updateGameArea() {
        var x, height, gap, minHeight, maxHeight, minGap, maxGap;
        for (let i = 0; i < enemies.length; i += 1) {
            if (motorbike.crashWith(enemies[i])) {
                //return;
            }
        }
        myGameArea.clear();
        myGameArea.frameNo += 1;

        lines.update(myGameArea);

        myScore.text = "SCORE: " + myGameArea.frameNo;
        myScore.update(myGameArea);
        motorbike.newPos(myGameArea);
        motorbike.update(myGameArea);
    }

    function everyinterval(n) {
        return (myGameArea.frameNo / n) % 1 == 0;
    }

    function accelerate(n) {
        motorbike.gravity = n;
    }
}