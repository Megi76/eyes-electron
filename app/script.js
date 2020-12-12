import React from 'react';
import { render } from 'react-dom';

const formatTime = (time) => { 
  const m = Math.floor(time/60);
  const s = time%60;
  return `${addZero(m)}:${addZero(s)}`;
};

const addZero = (number) => {
  if (number < 10) {
    return '0' + number;
  }

  return number;
}

var audioElement = new Audio('sounds/bell.wav');

class App extends React.Component {

  state = {
    status: 'off',
    time: 0,
    timer: null,
  };

  step = () => {
    this.setState({
      ...this.state,
      time: this.state.time - 1,
    })

    if (this.state.time === 0 && this.state.status === 'work') {
      audioElement.play(),
      this.setState({
        ...this.state,
        status: 'rest',
        time: 20,
      })
    } else if (this.state.time === 0 && this.state.status === 'rest') {
      audioElement.play(),
      this.setState({
        ...this.state,
        status: 'work',
        time: 1200,
      })
    }
  }

  startTimer = () => {
    this.setState({
      timer: setInterval(this.step, 1000),
      time: 1200,
      status: 'work'
    })
  }

  stopTimer = () => {

    clearInterval(this.state.timer);

    this.setState({
      ...this.state,
      time: 0,
      status: 'off'
    });
  };

  closeApp = () => {
    window.close();
  }

  render() {
    const {status} = this.state;


    return (
      <div>
        <h1>Protect your eyes</h1>
        {(status === 'off') &&  <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away. This app will help you track your time and inform you when it's time to rest.</p> }
         {(status === 'work') && <img src="./images/work.png" />}
         {(status === 'rest') && <img src="./images/rest.png" />}
         {(status !== 'off') && <div className="timer"> {formatTime(this.state.time)} </div>}
         {(status === 'off') && <button className="btn" onClick={this.startTimer}>Start</button>}
         {(status !== 'off') && <button className="btn" onClick={this.stopTimer}>Stop</button>}
         <button className="btn btn-close" onClick={this.closeApp}>X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));