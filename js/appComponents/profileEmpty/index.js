
import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Button, Icon, Card, CardItem, Text, Thumbnail, Picker } from 'native-base';
import { Grid, Col } from 'react-native-easy-grid';


import styles from './styles';
import ArizTheme from '../../themes/prof-empty-theme.js'
const logo = require('../../../img/logo.png');
const cardImage = require('../../../img/drawer-cover.png');
const camera = require('../../../img/camera.png');
const swiper2 = require('../../../img/swiper-2.png');
const swiper3 = require('../../../img/swiper-3.png');
const swiper4 = require('../../../img/swiper-4.png');


const {
  replaceAt,
} = actions;

class ProfileEmpty extends Component {

  static propTypes = {
    replaceAt: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
    selectedItem: undefined,
    selected1: 'key1',
    results: {
      items: [],
    },

  }

  onValueChange(value: string) {
    this.setState({
      selected1: value,
    });
  }


  replaceAt(route) {
    this.props.replaceAt('cardShowcase', { key: route }, this.props.navigation.key);
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header theme={ArizTheme}>
          <Button transparent onPress={() => this.replaceAt('card')}>
            <Icon name="ios-arrow-back" />
          </Button>

          <Title style={{alignSelf: 'center', marginRight: 17}}>EDIT PROFILE</Title>
        </Header>

        <Content>
          <Image style={{ alignSelf: 'center'}} source={camera} />
          <Text style={{color: '#fff', alignSelf: 'center', fontSize: 20, fontStyle: 'normal'}}>Metta Wangsa</Text>

          <Text style={{color: '#fff', alignSelf: 'center', fontSize: 20, fontStyle: 'normal'}}>I am Interested in</Text>
          <Picker
            iosHeader="Select one"
            mode="dropdown"
            selectedValue={this.state.selected1}
            onValueChange={this.onValueChange.bind(this)} // eslint-disable-line
            style={{ marginLeft: (Platform.OS === 'android') ? 0 : -25 }}
          >
            <Item label="Wallet" value="key0" />
            <Item label="ATM Card" value="key1" />
            <Item label="Debit Card" value="key2" />
            <Item label="Credit Card" value="key3" />
            <Item label="Net Banking" value="key4" />
          </Picker>



        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(ProfileEmpty);
