"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Stopwatch =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Stopwatch, _React$Component);

  function Stopwatch() {
    var _this;

    _classCallCheck(this, Stopwatch);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Stopwatch).call(this));

    _defineProperty(_assertThisInitialized(_this), "start", function () {
      if (!_this.state.running) {
        _this.setState({
          running: true
        });

        _this.watch = setInterval(function () {
          return _this.step();
        }, 10);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "reset", function () {
      _this.setState({
        times: {
          minutes: 0,
          seconds: 0,
          miliseconds: 0
        },
        splitTimes: []
      });

      _this.stop();
    });

    _defineProperty(_assertThisInitialized(_this), "stop", function () {
      _this.setState({
        running: false
      });

      clearInterval(_this.watch);
      if (_this.state.times.miliseconds || _this.state.times.seconds || _this.state.times.minutes) _this.addSplitTime(_this.format(_this.state.times));
    });

    _this.state = {
      running: false,
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      },
      splitTimes: []
    };
    return _this;
  }

  _createClass(Stopwatch, [{
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
    key: "step",
    value: function step() {
      if (!this.state.running) return;
      this.calculate();
    }
  }, {
    key: "calculate",
    value: function calculate() {
      this.setState({
        times: _objectSpread({}, this.state.times, {
          miliseconds: this.state.times.miliseconds += 1
        })
      });

      if (this.state.times.miliseconds >= 100) {
        this.setState({
          times: _objectSpread({}, this.state.times, {
            seconds: this.state.times.seconds += 1,
            miliseconds: 0
          })
        });
      }

      if (this.state.times.seconds >= 60) {
        this.setState({
          times: _objectSpread({}, this.state.times, {
            minutes: this.state.times.minutes += 1,
            seconds: 0
          })
        });
      }
    }
  }, {
    key: "addSplitTime",
    value: function addSplitTime(times) {
      this.setState({
        splitTimes: [].concat(_toConsumableArray(this.state.splitTimes), [times])
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("div", null, React.createElement(Counter, {
        time: this.format(this.state.times),
        start: this.start,
        stop: this.stop,
        reset: this.reset
      }), React.createElement(SplitTimes, {
        splitTimes: this.state.splitTimes
      }));
    }
  }]);

  return Stopwatch;
}(React.Component);

var SplitTimes =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(SplitTimes, _React$Component2);

  function SplitTimes() {
    _classCallCheck(this, SplitTimes);

    return _possibleConstructorReturn(this, _getPrototypeOf(SplitTimes).apply(this, arguments));
  }

  _createClass(SplitTimes, [{
    key: "render",
    value: function render() {
      return React.createElement("div", {
        className: "container"
      }, React.createElement("div", {
        className: "header"
      }, "Split times"), React.createElement("ul", {
        className: "results"
      }, this.props.splitTimes.map(function (splitTime, index) {
        return React.createElement("li", {
          key: index
        }, splitTime);
      })));
    }
  }]);

  return SplitTimes;
}(React.Component);

_defineProperty(SplitTimes, "propTypes", {
  splitTimes: React.PropTypes.array.isRequired
});

var Counter =
/*#__PURE__*/
function (_React$Component3) {
  _inherits(Counter, _React$Component3);

  function Counter() {
    _classCallCheck(this, Counter);

    return _possibleConstructorReturn(this, _getPrototypeOf(Counter).apply(this, arguments));
  }

  _createClass(Counter, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          time = _this$props.time,
          start = _this$props.start,
          stop = _this$props.stop,
          reset = _this$props.reset;
      return React.createElement("div", {
        className: "container"
      }, React.createElement("div", {
        className: "time"
      }, time), React.createElement("nav", {
        className: "controls"
      }, React.createElement("span", {
        className: "button",
        onClick: start
      }, "Start"), React.createElement("span", {
        className: "button",
        onClick: stop
      }, "Stop"), React.createElement("span", {
        className: "button reset",
        onClick: reset
      }, "Reset")));
    }
  }]);

  return Counter;
}(React.Component);

_defineProperty(Counter, "propTypes", {
  time: React.PropTypes.string.isRequired,
  start: React.PropTypes.func.isRequired,
  stop: React.PropTypes.func.isRequired,
  reset: React.PropTypes.func.isRequired
});

var stopwatchContainer = document.getElementById("stopwatch");
ReactDOM.render(React.createElement(Stopwatch, null), stopwatchContainer);
