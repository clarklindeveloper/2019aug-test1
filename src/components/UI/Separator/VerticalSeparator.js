import React, { Component } from 'react';
import classes from './VerticalSeparator.module.scss';

class VerticalSeparator extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        className={[
          classes.VerticalSeparator,
          classes[this.props.style],
          this.props.children ? classes.WithChildren : null,
        ].join(' ')}>
        {this.props.children ? (
          <React.Fragment>
            <div className={classes.DividerLine}></div>
            <div className={classes.CenterElement}>{this.props.children}</div>
            <div className={classes.DividerLine}></div>
          </React.Fragment>
        ) : null}
      </div>
    );
  }
}

export default VerticalSeparator;