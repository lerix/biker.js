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
            window.addEventListener('keydown', onKeyDown);
            window.addEventListener('keyup', onKeyUp);
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
        myScore.text = "SCORE: " + myGameArea.frameNo;

        isKeyDown(keyEnum.W_Key) && motorbike.y--;
        isKeyDown(keyEnum.S_Key) && motorbike.y++;
        isKeyDown(keyEnum.A_Key) && motorbike.x--;
        isKeyDown(keyEnum.D_Key) && motorbike.x++;

        lines.update(myGameArea);
        myScore.update(myGameArea);
        motorbike.update(myGameArea);
    }

    function everyinterval(n) {
        return (myGameArea.frameNo / n) % 1 == 0;
    }

    function accelerate(n) {
        motorbike.gravity = n;
    }

    var keyEnum = {
        W_Key: 0,
        A_Key: 1,
        S_Key: 2,
        D_Key: 3
    };
    var keyArray = new Array(4);

    function onKeyDown(e) {
        // Detect which key was pressed
        if (e.key == 'w')
            keyArray[keyEnum.W_Key] = true;
        if (e.key == 's')
            keyArray[keyEnum.S_Key] = true;
        if (e.key == 'a')
            keyArray[keyEnum.A_Key] = true;
        if (e.key == 'd')
            keyArray[keyEnum.D_Key] = true;
        // Repeat for each key you care about...
    }

    function onKeyUp(e) {
        // Detect which key was released
        if (e.key == 'w')
            keyArray[keyEnum.W_Key] = false;
        if (e.key == 's')
            keyArray[keyEnum.S_Key] = false;
        if (e.key == 'a')
            keyArray[keyEnum.A_Key] = false;
        if (e.key == 'd')
            keyArray[keyEnum.D_Key] = false;
        // Repeat for each key you care about...
    }

    function isKeyDown(key) {
        return keyArray[key];
    }
}