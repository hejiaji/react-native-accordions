import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import Accordion from 'react-native-accordions';

import HeaderIcon from './components/HeaderIcon/headerIcon';
import BandageIcon from './images/bandaged/bandaged.png';
import CallIcon from './images/call/call.png';
import DislikeIcon from './images/dislike/dislike.png';
import LikeIcon from './images/like/like.png';
import FistIcon from './images/fist/fist.png';

const icons = [BandageIcon, CallIcon, DislikeIcon, LikeIcon, FistIcon];

const data = [{
  title: 'Section1',
  icons,
}, {
  title: 'Section2',
  icons,
}, {
  title: 'Section3',
  icons,
}];

const LOREM_IPSUM = 'Lorem ipsum dolor sit amet, ius ad pertinax oportere accommodare, an vix civibus corrumpit referrentur. Te nam case ludus inciderint,';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ccc',
  },
  headerText: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 10,
    color: '#333',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    padding: 10,
    borderColor: '#ccc',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  thumb: {
    width: 64,
    height: 64,
    flexBasis: 64,
  },
  text: {
    flexShrink: 1,
  }
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.renderHeader = this.renderHeader.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }

  renderHeader(section, index, isActive) {
    const direction = isActive ? 'up' : 'down';
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.title}</Text>
        {
           <HeaderIcon direction={direction} />
        }
      </View>
    );
  }

  renderContent(section, index) {
    return (
      section.icons.map((icon, key) => (
        <View key={key} style={styles.content}>
          <Image style={styles.thumb} source={icon} />
          <Text style={styles.text}>Row{index +1} {LOREM_IPSUM}</Text>
        </View>
      ))
    );
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Accordion
          sections={data}
          renderHeader={this.renderHeader}
          renderContent={this.renderContent}
        />
      </ScrollView>
    );
  }
}

