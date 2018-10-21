//import _ from 'lodash';
import {
    line
} from './line.js'
import {
    bike
} from './bike.js'
import {
    text
} from './text.js'

export default class App {
    motorbike;
    lines;
    enemies;
    myScore;
    canvas;
    frameNo;
    width;
    height;
    
    constructor() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;


        this.enemies = [];
        this.canvas = document.createElement("canvas");
        this.motorbike = new bike();
        this.lines = new line(this.width/2);
        this.myScore = new text("30px", "Arial", "black", 0, 24);
        this.frameNo = 0;
        this.updateGameArea = this.updateGameArea.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);

        this.context = this.canvas.getContext("2d");
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        window.addEventListener('keydown', this.onKeyDown);
        window.addEventListener('keyup', this.onKeyUp);
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }

    start() {
        this.interval = setInterval(this.updateGameArea, 10);
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    updateGameArea() {
        for (let i = 0; i < this.enemies.length; i += 1) {
            if (this.motorbike.crashWith(this.enemies[i])) {
                let label = new text("50px", "Arial", "black", 50, 400);
                label.text = "GAME OVER!";
                label.update(this);
                let subLabel = new text("30px", "Arial", "black", 150, 450);
                subLabel.text = "Ctrl + R";
                subLabel.update(this);
                return;
            }
        }
        this.clear();
        this.lines.update(this);

        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].update(this);
            this.enemies[i].down(true);

            if (this.enemies[i].y === 850) {
                this.enemies.splice(i, 1);
            }
        }

        this.frameNo += 1;

        const interval = 25000 / this.frameNo;

        if (this.frameNo == 1 || this.everyinterval(this.frameNo, interval)) {
            const random = Math.floor(Math.random() * (300 - 10 + 1) + 10);
            let enemiBike = new bike();
            enemiBike.x = random;
            enemiBike.y = -200;
            enemiBike.speedY = 3;
            this.enemies.push(enemiBike);
        }

        this.myScore.text = "SCORE: " + this.frameNo;

        this.isKeyDown(this.keyEnum.W_Key) && this.motorbike.up();
        this.isKeyDown(this.keyEnum.S_Key) && this.motorbike.down();
        this.isKeyDown(this.keyEnum.A_Key) && this.motorbike.left();
        this.isKeyDown(this.keyEnum.D_Key) && this.motorbike.right();

        this.myScore.update(this);
        this.motorbike.update(this);
    }

    everyinterval(frameNo, n) {
        return (frameNo / n) % 1 == 0;
    }

    accelerate(n) {
        motorbike.gravity = n;
    }

    keyEnum = {
        W_Key: 0,
        A_Key: 1,
        S_Key: 2,
        D_Key: 3
    };
    keyArray = new Array(4);

    onKeyDown(e) {
        // Detect which key was pressed
        if (e.key == 'w')
            this.keyArray[this.keyEnum.W_Key] = true;
        if (e.key == 's')
            this.keyArray[this.keyEnum.S_Key] = true;
        if (e.key == 'a')
            this.keyArray[this.keyEnum.A_Key] = true;
        if (e.key == 'd')
            this.keyArray[this.keyEnum.D_Key] = true;
        // Repeat for each key you care about...
    }

    onKeyUp(e) {
        // Detect which key was released
        if (e.key == 'w')
            this.keyArray[this.keyEnum.W_Key] = false;
        if (e.key == 's')
            this.keyArray[this.keyEnum.S_Key] = false;
        if (e.key == 'a')
            this.keyArray[this.keyEnum.A_Key] = false;
        if (e.key == 'd')
            this.keyArray[this.keyEnum.D_Key] = false;
        // Repeat for each key you care about...
    }

    isKeyDown(key) {
        return this.keyArray[key];
    }
}