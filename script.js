class Stopwatch extends React.Component {
    constructor() {
        super();
        this.state = {
            running: false,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            },
            splitTimes: []
        };
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

    start = () => {
        if (!this.state.running) {
            this.setState({
                running: true
            });
            this.watch = setInterval(() => this.step(), 10);
        }
    };

    step() {
        if (!this.state.running) return;
        this.calculate();
    }

    calculate() {
        this.setState({
            times: {
                ...this.state.times,
                miliseconds: (this.state.times.miliseconds += 1)
            }
        });

        if (this.state.times.miliseconds >= 100) {
            this.setState({
                times: {
                    ...this.state.times,
                    seconds: (this.state.times.seconds += 1),
                    miliseconds: 0
                }
            });
        }

        if (this.state.times.seconds >= 60) {
            this.setState({
                times: {
                    ...this.state.times,
                    minutes: (this.state.times.minutes += 1),
                    seconds: 0
                }
            });
        }
    }

    reset = () => {
        this.setState({
            times: { minutes: 0, seconds: 0, miliseconds: 0 },
            splitTimes: []
        });
        this.stop();
    };

    stop = () => {
        this.setState({
            running: false
        });
        clearInterval(this.watch);
        if (this.state.times.miliseconds || this.state.times.seconds || this.state.times.minutes)
            this.addSplitTime(this.format(this.state.times));
    };

    addSplitTime(times) {
        this.setState({
            splitTimes: [...this.state.splitTimes, times]
        });
    }

    render() {
        return (
            <div>
                <Counter time={this.format(this.state.times)} start={this.start} stop={this.stop} reset={this.reset} />
                <SplitTimes splitTimes={this.state.splitTimes} />
            </div>
        );
    }
}

class SplitTimes extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="header">Split times</div>
                <ul className="results">
                    {this.props.splitTimes.map((splitTime, index) => (
                        <li key={index}>{splitTime}</li>
                    ))}
                </ul>
            </div>
        );
    }

    static propTypes = {
        splitTimes: React.PropTypes.array.isRequired
    };
}

class Counter extends React.Component {
    render() {
        const { time, start, stop, reset } = this.props;

        return (
            <div className="container">
                <div className="time">{time}</div>
                <nav className="controls">
                    <span className="button" onClick={start}>
                        Start
                    </span>
                    <span className="button" onClick={stop}>
                        Stop
                    </span>
                    <span className="button reset" onClick={reset}>
                        Reset
                    </span>
                </nav>
            </div>
        );
    }

    static propTypes = {
        time: React.PropTypes.string.isRequired,
        start: React.PropTypes.func.isRequired,
        stop: React.PropTypes.func.isRequired,
        reset: React.PropTypes.func.isRequired
    };
}

const stopwatchContainer = document.getElementById("stopwatch");
ReactDOM.render(<Stopwatch />, stopwatchContainer);
