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
        const pad0 = this.pad0;
        const { miliseconds, seconds, minutes } = times;

        return `${pad0(minutes)}:${pad0(seconds)}:${pad0(Math.floor(miliseconds))}`;
    }

    pad0(value) {
        let result = value.toString();
        return result.length < 2 ? "0" + result : result;
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
        if (this.state.running) this.calculate();
    }

    calculate() {
        const { times } = this.state;

        this.setState({
            times: {
                ...times,
                miliseconds: (times.miliseconds += 1)
            }
        });

        if (times.miliseconds >= 100) {
            this.setState({
                times: {
                    ...times,
                    seconds: (times.seconds += 1),
                    miliseconds: 0
                }
            });
        }

        if (times.seconds >= 60) {
            this.setState({
                times: {
                    ...times,
                    minutes: (times.minutes += 1),
                    seconds: 0
                }
            });
        }
    }

    reset = () => {
        this.setState(
            {
                times: { minutes: 0, seconds: 0, miliseconds: 0 },
                splitTimes: []
            },
            this.stop
        );
    };

    stop = () => {
        const { times } = this.state;

        this.setState({
            running: false
        });

        clearInterval(this.watch);
        if (times.miliseconds || times.seconds || times.minutes) this.addSplitTime(this.format(times));
    };

    addSplitTime(times) {
        this.setState({
            splitTimes: [...this.state.splitTimes, times]
        });
    }

    render() {
        const { times, splitTimes } = this.state;

        return (
            <div>
                <Counter time={this.format(times)} start={this.start} stop={this.stop} reset={this.reset} />
                <SplitTimes splitTimes={splitTimes} />
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
