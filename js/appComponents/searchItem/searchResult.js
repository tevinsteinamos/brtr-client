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
    InputGroup
} from 'native-base';

import navigateTo from '../../actions/sideBarNav';
import { openDrawer } from '../../actions/drawer';
import myTheme from '../../themes/base-theme';
import styles from './styles';
import decode from 'jwt-decode'

class SearchResult extends Component {
  static propTypes = {
      openDrawer: React.PropTypes.func,
      navigateTo: React.PropTypes.func,
      navigation: React.PropTypes.shape({
          key: React.PropTypes.string,
      }),

  }

  navigateTo(route, data) {
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ini kirim id: ", data)
      this.props.navigateTo(route, 'itemDetail', data);
  }

  render() {
      const {items} = this.props
      return (
          <CardItem onPress={() => this.navigateTo('itemDetail', items.id)}>
              <Image
                  style={{
              resizeMode: 'cover',
              width: null,
              opacity: 0.6
          }}
                  source={{uri: items.photo}}>
                  <View style={{paddingLeft: 10}}>
                      <H1 style={{color: 'black'}}>{items.name}</H1>
                  </View>
              </Image>

          </CardItem>
      );
  }
}

function bindAction(dispatch) {
    return {
        openDrawer: () => dispatch(openDrawer()),
        navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
    };
}

const mapStateToProps = state => ({
    navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(SearchResult);
