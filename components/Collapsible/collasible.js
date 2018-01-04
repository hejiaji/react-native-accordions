import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, Easing, View } from 'react-native';


class Collapsible extends Component {
  constructor(props) {
    super(props);
    this.state = {
      measured: false,
      translateValue: new Animated.Value(0),
      contentHeight: 0,
      animating: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.collapsed !== this.props.collapsed) {
      this.toggleCollapsed(nextProps.collapsed);
    }
  }

  measureContentHeight(callback) {
    this.setState(
      {
        measured: false,
      },
      () => {
        requestAnimationFrame(() => {
          this.refs.content.measure((x, y, width, height) => {
            this.setState(
              {
                measured: true,
                contentHeight: height,
              },
              () => callback()
            );
          });
        });
      }
    );
  }

  toggleCollapsed(collapsed) {
    if (collapsed) {
      this.transitionToHeight(collapsed);
    } else {
      this.measureContentHeight(() => {
        this.transitionToHeight(collapsed);
      });
    }
  }

  transitionToHeight(collapsed) {
    if (this._animation) {
      this._animation.stop();
    }
    this.setState({ animating: true });
    if (collapsed) {
      this._animation = Animated.timing(this.state.translateValue, {
        toValue: 0,
        duration: 195,
        easing: Easing.bezier(0.4, 0.0, 1, 1),
      }).start(() => this.setState({ animating:false }));
    } else {
      this._animation = Animated.timing(this.state.translateValue, {
        toValue: 1,
        duration: 225,
        easing: Easing.bezier(0.0, 0.0, 0.2, 1),
      }).start(() => this.setState({ animating:false }));
    }
  }

  render() {
    const { collapsed } = this.props;
    const { measured, contentHeight, animating } = this.state;
    const hasKnownHeight = measured || collapsed;
    const containerStyle = hasKnownHeight && {
        overflow: 'hidden',
        height: this.state.translateValue.interpolate(
          { inputRange: [0, 1], outputRange: [0, contentHeight] }
        ),
      };
    const contentStyle = {};
    if (!hasKnownHeight) {
      contentStyle.position = 'absolute';
      contentStyle.opacity = 0;
    }
    return (
      <Animated.View style={containerStyle}>
        <View ref="content" style={contentStyle}
          onLayout={(event) => {
            !animating && this.setState({ contentHeight: event.nativeEvent.layout.height });
          }}
        >
          {this.props.children}
        </View>
      </Animated.View>
    );
  }
}

Collapsible.propTypes = {
  collapsed: PropTypes.bool,
  children: PropTypes.node,
};

Collapsible.defaultProps = {
  collapsed: true,
};

export default Collapsible;