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

  class Rocket extends React.Component {
    constructor() {
      super();

      this.rocketStyle = {
        position: 'absolute',
        width: '20px',
        height: '20px',
        right: '5%',
        bottom: '5%',
        borderRadius: '50%',
        backgroundColor: 'red',
        display: 'none',
      };

      this.animationStyle = {
        animationName: 'launch',
        animationTimingFunction: 'linear',
        animationDuration: '2s',
        animationDelay: '0.0s',
        animationIterationCount: 1,
        animationDirection: 'normal',
        animationFillMode: 'forwards',
        display: 'block',
      };

      this.state = {
        animation: {},
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
          animation: this.animationStyle
        });
      }
      return nextProps;
    }

    render() {
      let styleSheet = document.styleSheets[0];
      const keyframes = `
        @-webkit-keyframes launch {
          0%   { top: 110%; display: block; }
          100% { top: -10%; display: block; }
        }
      `;
      styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

      const mergedStyles = Object.assign({}, this.rocketStyle, this.state.animation);

      return(
        React.createElement('div', {style: mergedStyles, id: "rocket"})
      );
    }

    componentDidMount() {
      let rocket = document.getElementById("rocket");
      let animationEvent = this.whichAnimationEvent(rocket);
      rocket.addEventListener(animationEvent, function() {
        console.log("DONE");
        this.setState({
          animation: {}
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
      const children = [];

      children.push(React.createElement(Term, Object.assign({}, this.props, {
        onTerminal: this._onTerminal
      })));

      children.push(
        React.createElement(Rocket, {rocketState: this.props.rocketState})
      );

      return React.createElement('div', {style: {width: '100%', height: '100%', position: 'relative'}}, children);
    }

  }
};
