/* eslint no-underscore-dangle: 0 */
/* eslint react/no-multi-comp: 0 */

import PropTypes from 'prop-types';
import { Rocket, RocketSpan, FinTop, FinBottom, Fire, Wastes } from './styledElements';

// This function performs regex matching on expected shell output for git push result being input
// at the command line. Currently it supports output from bash, zsh, fish, cmd and powershell.
function detectPushCommand(data) {
  const patterns = [
    'To *.git',
  ];
  return new RegExp(`(${patterns.join(')|(')})`).test(data);
}

exports.middleware = store => next => (action) => {
  if (action.type === 'SESSION_ADD_DATA') {
    const { data } = action;
    if (detectPushCommand(data)) {
      store.dispatch({
        type: 'PUSH_MODE_TOGGLE',
      });
    }
    next(action);
  } else {
    next(action);
  }
};

exports.reduceUI = (state, action) => {
  switch (action.type) {
    case 'PUSH_MODE_TOGGLE':
      return state.set('rocketState', (state.rocketState + 1) || 1);
    default:
      return state;
  }
};

const passProps = (uid, parentProps, props) => Object.assign(props, {
  rocketState: parentProps.rocketState,
});

exports.mapTermsState = (state, map) => Object.assign(map, {
  rocketState: state.ui.rocketState,
});

exports.getTermGroupProps = passProps;
exports.getTermProps = passProps;

exports.decorateTerm = (Term, { React }) => {
  class GitRocket extends React.Component {
    constructor() {
      super();

      this.state = {
        display: false,
      };
    }

    componentDidMount() {
      const rocket = document.getElementById('rocket');
      rocket.addEventListener('animationend', () => {
        this.setState({
          display: false,
        });
      });
    }

    componentWillReceiveProps(nextProps) {
      if ((nextProps.rocketState > this.props.rocketState) ||
          (nextProps.rocketState !== undefined &&
            this.props.rocketState === undefined)) {
        this.setState({
          display: true,
        });
      }
      return nextProps;
    }

    render() {
      return (
        // Markup and styling for this section is adapted from Kevin Boudot's
        // Pen at https://codepen.io/kevinboudot/pen/EaQeNL
        <Rocket id="rocket" display={this.state.display}>
          <RocketSpan>
            <FinTop />
            <FinBottom />
            <Fire />
            <Wastes>
              <i />
              <i />
              <i />
              <i />
              <i />
            </Wastes>
          </RocketSpan>
        </Rocket>
      );
    }
  }

  // Define and return our higher order component.
  class HOCTerm extends React.Component {
    constructor(props, context) {
      super(props, context);

      this._onTerminal = this._onTerminal.bind(this);
      this._div = null;
      this._observer = null;
    }

    _onTerminal(term) {
      if (this.props.onTerminal) this.props.onTerminal(term);
      this._div = term.div_;
      this._window = term.document_.defaultView;
    }

    render() {
      return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          {React.createElement(Term, Object.assign({}, this.props, {
            onTerminal: this._onTerminal,
          }))}
          <GitRocket rocketState={this.props.rocketState} />
        </div>
      );
    }
  }

  GitRocket.propTypes = {
    rocketState: PropTypes.number.isRequired,
  };

  HOCTerm.propTypes = {
    onTerminal: PropTypes.func.isRequired,
    rocketState: PropTypes.number.isRequired,
  };

  return HOCTerm;
};
