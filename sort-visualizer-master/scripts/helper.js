"use strict";
class Helper {
    /* 
   1)This is a class to help with sorting animations.
   2)time affects animation speed.
        For example, if speed is 2, then this.time = 400 / 2 = 200 ms between steps.
   3) list is a list of HTML elements (bars in the array).
     */
    constructor(time, list = []) {
        this.time = parseInt(400/time);  // parseInt() converts a string or number into an integer (a whole number without any decimal points). Ex parseInt(5.8);  → 5
        this.list = list;
    }

    mark = async (index) => {
        this.list[index].setAttribute("class", "cell current"); // set the temprary green color (current class set color)
    }

    markSpl = async (index) => {
        this.list[index].setAttribute("class", "cell min");   // set the temprary special pink color (min class set the color)
    }

    unmark = async (index) => {
        this.list[index].setAttribute("class", "cell");
    }
    // pause time is giving to provide time for the animation
    pause = async() => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();  
            }, this.time);
        });
    }


    compare = async (index1, index2) => {
        await this.pause();
        let value1 = Number(this.list[index1].getAttribute("value"));
        let value2 = Number(this.list[index2].getAttribute("value"));
        if(value1 > value2) {
            return true;
        }
        return false;
    }

    swap = async (index1, index2) => {
        await this.pause();
        let value1 = this.list[index1].getAttribute("value");
        let value2 = this.list[index2].getAttribute("value");
        this.list[index1].setAttribute("value", value2);
        this.list[index1].style.height = `${3.8*value2}px`;
        this.list[index2].setAttribute("value", value1);
        this.list[index2].style.height = `${3.8*value1}px`;
    }
};
