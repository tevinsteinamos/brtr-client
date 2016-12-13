import React, { Component } from 'react';
import { Image, AsyncStorage } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { connect } from 'react-redux';
import {
    Container,
    Header,
    Title,
    Content,
    Text, H3, H2, H1,
    Button,
    Icon,
    Footer,
    FooterTab,
    Card,
    CardItem,
    Thumbnail,
    View,
    Input,
    InputGroup,
    List,
    ListItem
} from 'native-base';

import navigateTo from '../../actions/sideBarNav';
import { openDrawer } from '../../actions/drawer';
import myTheme from '../../themes/base-theme';
import styles from './styles';
import decode from 'jwt-decode'


class EachMessage extends Component {
  static propTypes = {
      openDrawer: React.PropTypes.func,
      navigateTo: React.PropTypes.func,
      navigation: React.PropTypes.shape({
          key: React.PropTypes.string,
      }),

  }

  navigateTo(route, data, data2) {
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ini kirim id: ", data)
      this.props.navigateTo(route, 'listMessage', data, data2);
  }

  render() {
      const {items, title, itemMessageId} = this.props
      console.log('each item : ', items);
      console.log('each title : ', title);
      console.log('each itemmsg : ', itemMessageId);

      return (
          <ListItem style={styles.noBottomBorder} onPress={() => this.navigateTo('messageDetail', itemMessageId, title)}>
            <Thumbnail square size={90} source={{uri: items.Item.User.avatar}} />
            <H3 style={styles.text}>{items.Item.name}</H3>
            <Text note style={styles.text}>By <Text style={styles.name}>{items.Item.User.username}</Text></Text>
            <Text style={{color: '#fff'}}>{items.Item.description}</Text>
          </ListItem>

      );
  }
}

function bindAction(dispatch) {
    return {
        openDrawer: () => dispatch(openDrawer()),
        navigateTo: (route, homeRoute, data, data2) => dispatch(navigateTo(route, homeRoute, data, data2)),
    };
}

const mapStateToProps = state => ({
    navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(EachMessage);
