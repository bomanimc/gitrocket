import react from 'react';
import styled from 'styled-components';
import {keyframes} from 'styled-components';

exports.middleware = (store) => (next) => (action) => {
  if ('SESSION_ADD_DATA' === action.type) {
    const { data } = action;
    if (detectPushCommand(data)) {
      store.dispatch({
        type: 'PUSH_MODE_TOGGLE'
      });
    }
    next(action);
  } else {
    next(action);
  }
};

// This function performs regex matching on expected shell output for git push result being input
// at the command line. Currently it supports output from bash, zsh, fish, cmd and powershell.
function detectPushCommand(data) {
  const patterns = [
    'To *.git',
    'zsh: command not found: wow',
  ];
  return new RegExp('(' + patterns.join(')|(') + ')').test(data)
}

exports.reduceUI = (state, action) => {
  switch (action.type) {
    case 'PUSH_MODE_TOGGLE':
      return state.set('rocketState', (state.rocketState + 1) || 1);
  }
  return state;
};

const passProps = (uid, parentProps, props) => {
  return Object.assign(props, {
    rocketState: parentProps.rocketState
  });
}

exports.mapTermsState = (state, map) => {
  return Object.assign(map, {
    rocketState: state.ui.rocketState
  });
};

exports.getTermGroupProps = passProps;
exports.getTermProps = passProps;

exports.decorateTerm = (Term, { React, notify }) => {
  const launch = keyframes`
    0%   { top: 110%; display: block; }
    100% { top: -10%; display: block; }
  `;

  // Markup and CSS for this section is adapted from Kevin Boudot's Pen at 
  // https://codepen.io/kevinboudot/pen/EaQeNL
  const wiggling = keyframes`
    0% {
      transform: translate3d(0px, 0px, 0);
    }
    50% {
      transform: translate3d(0px, -4px, 0);
    }
    100% {
      transform: translate3d(0px, 0px, 0);
    }
  `;

  const vrouming = keyframes`
    0% {
      transform: translate3d(0px, 0, 0);
    }
    50% {
      transform: translate3d(5px, 0, 0);
    }
    100% {
      transform: translate3d(0px, 0, 0);
    }
  `;

  const wasting = keyframes`
    0% {
      transform: translate3d(0px, 0, 0);
    }
    100% {
      transform: translate3d(-40px, -5px, 0);
    }
  `;
  const wasting2 = keyframes`
    0% {
      transform: translate3d(0px, 0, 0);
    }
    100% {
      transform: translate3d(-40px, 5px, 0);
    }
  `;

  const Rocket = styled.div`
    display: ${props => props.display ? 'block' : 'none'};
    position: absolute;
    left: calc(100% - 60px);
    top: 110%;
    transform: rotate(-90deg);
    animation: ${launch} 5s cubic-bezier(.81,.13,.89,.6);
  `;

  const RocketSpan = styled.i`
    display: block;
    width: 65px;
    height: 20px;
    background-color: #d11c40;
    position: absolute;
    border-bottom-right-radius: 100%;
    border-top-right-radius: 100%;
    border-left: 3px solid #5b595d;
    border-right: 3px solid #D11C40;
    animation: ${wiggling} 300ms infinite;
    animation-timing-function: ease-out;

    :before, :after {
    	content: '';
    	position: absolute;
    	display: block;
    	width: 51%;
    	top:50%;
    	height: 50%;
    	background-color: #a71732;
    }

    :before{
    	right: 0;
    	border-bottom-right-radius: 100%;
    }

    :after{
    	left: -3px;
    	border-left: 3px solid #444244;
    }
  `;

  const Fin = styled.i`
    display: block;
    position: absolute;
    left: -4px;
    width: 10px;
    height: 10px;
    background-color: #7f0e27;
    border-left: 3px solid #D11C40;

    :before {
      content: '';
      position: absolute;
      left: 5px;
      width: 10px;
      height: 100%;
      background-color: #7f0e27;
      bottom: 0;
    }
  `;

  const FinTop = Fin.extend`
    top: -10px;
    transform: skew(35deg, 0deg);

    :before {
  		transform: skew(40deg, 0deg);
    }
  `;

  const FinBottom = Fin.extend`
    bottom: -10px;
    transform: skew(-35deg, 0deg);

    :before {
  		transform: skew(-40deg, 0deg);
    }
  `;

  const Fire = styled.i`
    position: absolute;
    display: block;
    left: -33px;
    width: 30px;
    height: 100%;
    overflow: hidden;

    :before {
      position: absolute;
    	content: '';
    	display: block;
    	width: 220px;
    	height: 20px;
    	left: 0;
    	top:0;
    	border-radius: 100%;
    	background-color: #f45224;
    	animation: ${vrouming} 200ms infinite;
    }

    :after {
      position: absolute;
    	content: '';
    	display: block;
    	width: 220px;
    	height: 10px;
    	left: 10px;
    	top: 5px;
    	border-radius: 100%;
    	background-color: #ffedd5;
    	animation: ${vrouming} 200ms infinite;
    }
  `;

  const Wastes = styled.i`
    position: absolute;
    left: -53px;
    top: -10px;
    width: 50px;
    height: 200%;

    i {
    	position: absolute;
    	width: 3px;
    	right: 0;
    	height: 1px;
    	background-color: rgba(255, 255, 255, 0.5);
    }

    i:nth-child(1){
    	top: 15px;
  		animation: ${wasting} 500ms infinite 100ms;
    }

    i:nth-child(2){
    	top: 17px;
  		animation: ${wasting2} 500ms infinite 200ms;
    }

    i:nth-child(3){
    	top: 19px;
  		animation: ${wasting} 500ms infinite 300ms;
    }

    i:nth-child(4){
    	top: 21px;
  		animation: ${wasting2} 500ms infinite 400ms;
    }

    i:nth-child(5){
    	top: 23px;
    	animation: ${wasting} 500ms infinite 100ms;
    }
  `;

  class GitRocket extends React.Component {
    constructor() {
      super();

      this.state = {
        display: false,
      };
    }

    whichAnimationEvent(element){
      let t;

      var animations = {
        "animation"      : "animationend",
        "OAnimation"     : "oAnimationEnd",
        "MozAnimation"   : "animationend",
        "WebkitAnimation": "webkitAnimationEnd"
      }

      for (t in animations) {
        if (element.style[t] !== undefined){
          return animations[t];
        }
      }
    }

    componentWillReceiveProps(nextProps) {
      if ((nextProps.rocketState > this.props.rocketState) || (nextProps.rocketState != undefined && this.props.rocketState == undefined)) {
        this.setState({
          display: true
        });
      }
      return nextProps;
    }

    render() {
      return(
        <Rocket id="rocket" display={this.state.display}>
          <RocketSpan>
            <FinTop />
            <FinBottom />
            <Fire />
            <Wastes>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
            </Wastes>
          </RocketSpan>
        </Rocket>
      );
    }

    componentDidMount() {
      let rocket = document.getElementById("rocket");
      let animationEvent = this.whichAnimationEvent(rocket);
      rocket.addEventListener(animationEvent, function() {
        console.log("DONE");
        this.setState({
          display: false
        });
      }.bind(this));
    }
  }

  // Define and return our higher order component.
  return class extends React.Component {
    constructor (props, context) {
      super(props, context);

      this._onTerminal = this._onTerminal.bind(this);
      this._div = null;
      this._observer = null;
    }

    _onTerminal (term) {
      if (this.props.onTerminal) this.props.onTerminal(term);
      this._div = term.div_;
      this._window = term.document_.defaultView;
    }

    render () {
      return (
        <div style={{width: '100%', height: '100%', position: 'relative'}}>
          {React.createElement(Term, Object.assign({}, this.props, {
            onTerminal: this._onTerminal
          }))}
          <GitRocket rocketState={this.props.rocketState} />
        </div>
      );
    }
  }
};
