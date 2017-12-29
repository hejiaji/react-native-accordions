import React from 'react';
import PropTypes from 'prop-types';

import {
  View,
  TouchableHighlight,
} from 'react-native';

import Collasible from '../Collapsible/collasible';

class Accordion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSection: null,
    };
  }

  toggleSection(index) {
    const activeSection = this.state.activeSection === index ? null : index;
    this.setState({ activeSection });
  }

  render() {
    const { sections, underlayColor, renderHeader, renderContent } = this.props;
    return (
      <View>
        {
          sections.map((section, index) =>
            <View key={index}>
              <TouchableHighlight
                onPress={() => this.toggleSection(index)}
                underlayColor={underlayColor}
              >
                {
                  renderHeader(section, index, this.state.activeSection === index)
                }
              </TouchableHighlight>
              <Collasible collapsed={this.state.activeSection !== index}>
                { renderContent(section, index, this.state.activeSection === index) }
              </Collasible>
            </View>
          )
        }
      </View>
    );
  }
}

Accordion.propTypes = {
  renderHeader: PropTypes.func,
  renderContent: PropTypes.func,
  sections: PropTypes.array,
  underlayColor: PropTypes.string,
};

Accordion.defaultProps = {
  underlayColor: 'black',
};

export default Accordion;

