import React, {PropTypes} from 'react';

import './Rate.css';

const SIZE = 300;

const Rate = props => {
  return (
    <div
      className="Rate"
      style={{width: SIZE, height: SIZE}}
      onMouseMove={e => handleHighlight(e, props.onHighlight)}
    >
      <div className="Rate-circle" style={{width: SIZE, height: SIZE}} />
      {props.steps.map((step, i) => (
        <div className="Rate-step" style={getStepStyle(step, props.steps, i)} />
      ))}
      {props.highlightValue !== null &&
        <div
          className="Rate-current"
          style={getCircleStyle(
            props.highlightValue,
            SIZE / 2 / props.steps.length / 2
          )}
        />}
    </div>
  );
};

function handleHighlight(event, cb) {
  event.persist();
  const box = event.currentTarget.getBoundingClientRect();
  const x = event.clientX - box.left - SIZE / 2;
  const y = event.clientY - box.top - SIZE / 2;
  const radius = Math.round(Math.sqrt(x * x + y * y));

  if (radius <= SIZE / 2) {
    cb(radius / (SIZE / 2));
  }
}

Rate.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
      label: PropTypes.string,
      color: PropTypes.string,
    })
  ),
  highlightValue: PropTypes.number,
  onHighlight: PropTypes.func,
};

function getStepStyle(step, steps, index) {
  const value = 1 / steps.length * (index + 1);
  return getCircleStyle(value);
}

function getCircleStyle(value, minRadius = 0) {
  const radius = Math.max(Math.round(SIZE / 2 * value), minRadius);
  const pos = SIZE / 2 - radius;
  const ret = {
    width: radius * 2,
    height: radius * 2,
    top: pos,
    left: pos,
  };
  return ret;
}

class RateContainer extends React.Component {
  state = {
    highlightValue: null,
  };

  render() {
    return (
      <Rate
        steps={this.props.steps}
        highlightValue={this.state.highlightValue}
        onHighlight={this._handleHighlight}
      />
    );
  }

  _handleHighlight = value => {
    this.setState({highlightValue: value});
  };
}

export default RateContainer;
