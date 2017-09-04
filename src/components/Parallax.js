import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    withScrollPosition,
    withObserver,
    withViewportProgress,
    withBounds,
} from '../hoc';
import { scaleBetween, compose } from '../utils';

class Parallax extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        progress: PropTypes.number.isRequired,
        x: PropTypes.array,
        y: PropTypes.array,
        // @TODO: these should also be available
        // scale
        // rotation
        // opacity
        // tag
    };

    scaleValues() {
        const { progress, x: _x, y: _y } = this.props;

        // @TODO: allow numbers with units and parse to determine

        // Only scale a value if one exists
        const hasX = typeof _x !== 'undefined';
        const hasY = typeof _y !== 'undefined';

        let x = 0;
        let y = 0;

        if (hasX) {
            x = scaleBetween(progress, _x[0], _x[1], 1, 0);
        }
        if (hasY) {
            y = scaleBetween(progress, _y[0], _y[1], 1, 0);
        }

        return { x, y };
    }

    getTransform() {
        const { x, y } = this.scaleValues();
        return `translate3d(${x}px, ${y}px, 0)`;
    }

    render() {
        const { children } = this.props;

        const style = {
            transform: this.getTransform(),
        };

        return (
            <div style={style}>
                {children}
            </div>
        );
    }
}

// Compose together all HOCs
// The order of which is important since some
// rely on props provided by the others.

const enhancements = compose(
    withBounds,
    withObserver,
    withScrollPosition,
    withViewportProgress
);

export default enhancements(Parallax);