import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
} from 'react-native';

import arrowUp from '../../images/arrowUp/arrowUp.png';
import arrowDown from '../../images/arrowDown/arrowDown.png';

export default function HeaderIcon(props) {
  const { style } = props;

  return (
    <View style={style}>
      {
        props.direction === 'up'
          ? <Image source={arrowUp} />
          : <Image source={arrowDown} />
      }
    </View>
  );
}

HeaderIcon.propTypes = {
  style: PropTypes.number,
  direction: PropTypes.string,
};

