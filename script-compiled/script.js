"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Stopwatch =
/*#__PURE__*/
function () {
  function Stopwatch(display) {
    _classCallCheck(this, Stopwatch);

    this.running = false;
    this.display = display;
    this.resetTime();
  }

  _createClass(Stopwatch, [{
    key: "resetTime",
    value: function resetTime() {
      this.times = {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      };
      this.print(this.times);
    }
  }, {
    key: "print",
    value: function print() {
      this.display.innerText = this.format(this.times);
    }
  }, {
    key: "format",
    value: function format(times) {
      return "".concat(this.pad0(times.minutes), ":").concat(this.pad0(times.seconds), ":").concat(this.pad0(Math.floor(times.miliseconds)));
    }
  }, {
    key: "pad0",
    value: function pad0(value) {
      var result = value.toString();

      if (result.length < 2) {
        result = "0" + result;
      }

      return result;
    }
  }, {
    key: "reset",
    value: function reset() {
      this.resetTime();
      this.stop();
      this.clearSplitTimes();
    }
  }, {
    key: "start",
    value: function start() {
      var _this = this;

      if (!this.running) {
        this.running = true;
        this.watch = setInterval(function () {
          return _this.step();
        }, 10);
      }
    }
  }, {
    key: "step",
    value: function step() {
      if (!this.running) return;
      this.calculate();
      this.print();
    }
  }, {
    key: "calculate",
    value: function calculate() {
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
  }, {
    key: "stop",
    value: function stop() {
      var _this$times = this.times,
          miliseconds = _this$times.miliseconds,
          seconds = _this$times.seconds,
          minutes = _this$times.minutes;
      this.running = false;
      clearInterval(this.watch);
      if (miliseconds || seconds || minutes) this.addSplitTime();
    }
  }, {
    key: "addSplitTime",
    value: function addSplitTime() {
      var element = document.createElement("li");
      element.innerText = this.format(this.times);
      splitTimesList.appendChild(element);
    }
  }, {
    key: "clearSplitTimes",
    value: function clearSplitTimes() {
      splitTimesList.innerHTML = "";
    }
  }]);

  return Stopwatch;
}();

var stopwatch = new Stopwatch(document.querySelector(".stopwatch"));
var startButton = document.getElementById("start");
startButton.addEventListener("click", function () {
  return stopwatch.start();
});
var stopButton = document.getElementById("stop");
stopButton.addEventListener("click", function () {
  return stopwatch.stop();
});
var resetButton = document.getElementById("reset");
resetButton.addEventListener("click", function () {
  return stopwatch.reset();
});
var splitTimesList = document.getElementById("results");