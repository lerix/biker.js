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

import {
    text
} from './text.js'


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

    startGame()

    function startGame() {
        motorbike = new bike();
        lines = new line();
        myScore = new text("30px", "Consolas", "black", 0, 24);
        myGameArea.start();
    }

    function updateGameArea() {

        for (let i = 0; i < enemies.length; i += 1) {
            if (motorbike.crashWith(enemies[i])) {
                let label = new text("50px", "Consolas", "black", 50, 400);
                label.text = "GAME OVER!";
                label.update(myGameArea);
                return;
            }
        }
        myGameArea.clear();
        lines.update(myGameArea);

        for (let i = 0; i < enemies.length; i++) {
            enemies[i].update(myGameArea);
            enemies[i].y++;

            if (enemies[i].y === 850) {
                enemies.splice(i, 1);
            }
        }

        myGameArea.frameNo += 1;

        const interval = 30000 / myGameArea.frameNo;

        if (myGameArea.frameNo == 1 || everyinterval(interval)) {
            const random = Math.floor(Math.random() * (300 - 10 + 1) + 10);
            let enemiBike = new bike();
            enemiBike.x = random;
            enemiBike.y = -100;
            enemies.push(enemiBike);
        }

        myScore.text = "SCORE: " + myGameArea.frameNo;

        isKeyDown(keyEnum.W_Key) && motorbike.up();
        isKeyDown(keyEnum.S_Key) && motorbike.down();
        isKeyDown(keyEnum.A_Key) && motorbike.left();
        isKeyDown(keyEnum.D_Key) && motorbike.right();

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