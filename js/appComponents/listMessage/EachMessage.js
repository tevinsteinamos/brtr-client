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
import moment from 'moment'

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
      const {items, title, itemMessageId, navigator, activeUser} = this.props
      console.log('each item : ', items);
      console.log('each title : ', title);
      console.log('each itemmsg : ', itemMessageId);
      console.log('active user : ', activeUser);
      if (activeUser.id == items.Item.User.id) {
        return (
            <ListItem style={styles.noBottomBorder} onPress={() => navigator.push({id: 'messageDetail', itemMessageId: itemMessageId, title: title})}>
              <Thumbnail square size={90} source={{uri: items.Item2.User.avatar}} />
              <H3 style={styles.text}>{items.title}</H3>
              <Text note style={styles.text}>From <Text style={styles.name}>{items.Item2.User.username}</Text></Text>
              <Text style={{color: '#fff'}}>{moment(items.createdAt).fromNow()}</Text>
            </ListItem>
        );
      } else if (activeUser.id == items.Item2.User.id){
        return (
            <ListItem style={styles.noBottomBorder} onPress={() => navigator.push({id: 'messageDetail', itemMessageId: itemMessageId, title: title})}>
              <Thumbnail square size={90} source={{uri: items.Item.User.avatar}} />
              <H3 style={styles.text}>{items.title}</H3>
              <Text note style={styles.text}>To <Text style={styles.name}>{items.Item.User.username}</Text></Text>
              <Text style={{color: '#fff'}}>{moment(items.createdAt).fromNow()}</Text>
            </ListItem>
        );
      } else {
        return (
            <ListItem style={styles.noBottomBorder} onPress={() => navigator.push({id: 'messageDetail', itemMessageId: itemMessageId, title: title})}>
              <Thumbnail square size={90} source={{uri: items.Item.User.avatar}} />
              <H3 style={styles.text}>I'M DIZZY</H3>
              <Text note style={styles.text}>To <Text style={styles.name}>{items.Item.User.username}</Text></Text>
              <Text style={{color: '#fff'}}>{moment(items.createdAt).fromNow()}</Text>
            </ListItem>
        );
      }
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
