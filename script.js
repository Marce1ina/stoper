class Stopwatch {
    constructor(display) {
        this.running = false;
        this.display = display;
        this.resetTime();
    }

    resetTime() {
        this.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        };

        this.print(this.times);
    }

    print() {
        this.display.innerText = this.format(this.times);
    }

    format(times) {
        return `${this.pad0(times.minutes)}:${this.pad0(times.seconds)}:${this.pad0(Math.floor(times.miliseconds))}`;
    }

    pad0(value) {
        let result = value.toString();
        if (result.length < 2) {
            result = "0" + result;
        }
        return result;
    }

    reset() {
        this.resetTime();
        this.stop();
        this.clearSplitTimes();
    }

    start() {
        if (!this.running) {
            this.running = true;
            this.watch = setInterval(() => this.step(), 10);
        }
    }

    step() {
        if (!this.running) return;
        this.calculate();
        this.print();
    }

    calculate() {
        this.times.miliseconds += 1;
        if (this.times.miliseconds >= 100) {
            this.times.seconds += 1;
            this.times.miliseconds = 0;
        }
        if (this.times.seconds >= 60) {
            this.times.minutes += 1;
            this.times.seconds = 0;
        }
    }

    stop() {
        const { miliseconds, seconds, minutes } = this.times;
        this.running = false;
        clearInterval(this.watch);
        if (miliseconds || seconds || minutes) this.addSplitTime();
    }

    addSplitTime() {
        const element = document.createElement("li");
        element.innerText = this.format(this.times);
        splitTimesList.appendChild(element);
    }

    clearSplitTimes() {
        splitTimesList.innerHTML = "";
    }
}

const stopwatch = new Stopwatch(document.querySelector(".stopwatch"));

const startButton = document.getElementById("start");
startButton.addEventListener("click", () => stopwatch.start());

const stopButton = document.getElementById("stop");
stopButton.addEventListener("click", () => stopwatch.stop());

const resetButton = document.getElementById("reset");
resetButton.addEventListener("click", () => stopwatch.reset());

const splitTimesList = document.getElementById("results");
