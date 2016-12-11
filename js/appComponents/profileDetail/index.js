
import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Button, Icon, Card, CardItem, Text, Thumbnail } from 'native-base';
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
          <Grid style={{marginTop: 50, marginLeft: 20}}>
              <Col><Image style={{width: 100, height: 100}} source={swiper2}/></Col>
              <Col><Image style={{width: 100, height: 100}} source={swiper3}/></Col>
              <Col><Image style={{width: 100, height: 100}} source={swiper4}/></Col>
          </Grid>
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
