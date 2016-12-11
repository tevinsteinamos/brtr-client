
import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Button, Icon, Card, CardItem, Text, Thumbnail, Footer, FooterTab } from 'native-base';
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

class ProfileDetail extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
    navigateTo: React.PropTypes.func,
    replaceAt: React.PropTypes.func,
    navigation: React.PropTypes.shape({
        key: React.PropTypes.string,
    }),

  }

  constructor(props) {
      super(props);
      this.state = {
          tab1: false,
          tab2: false,
          tab3: false,
      };
  }


  replaceAt(route) {
    this.props.replaceAt('cardShowcase', { key: route }, this.props.navigation.key);
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header theme={ArizTheme}>
          <Button transparent onPress={() => this.replaceAt('home')}>
            <Icon name="ios-arrow-back" />
          </Button>

          <Title style={{alignSelf: 'center', marginRight: 10}}>BRTR</Title>
          <Button transparent onPress={() => this.replaceAt('card')}>
            EDIT
          </Button>

        </Header>

        <Content>
          <Image style={{ alignSelf: 'center'}} source={camera} />
          <Text style={{color: '#fff', alignSelf: 'center', fontSize: 20, fontStyle: 'normal', marginBottom: 20}}>Metta Wangsa</Text>
          <Text style={{color: '#fff', alignSelf: 'center', fontSize: 20, fontStyle: 'normal', marginTop: 20}}>Items up for BARTER : </Text>
          <Grid style={{marginTop: 20, marginLeft: 20}}>
              <Col><Image style={{width: 100, height: 100}} source={swiper2}/></Col>
              <Col><Image style={{width: 100, height: 100}} source={swiper3}/></Col>
              <Col><Image style={{width: 100, height: 100}} source={swiper4}/></Col>
          </Grid>
        </Content>

        <Footer theme={ArizTheme}>
            <FooterTab theme={ArizTheme}>
                <Button
                    onPress={() => this.replaceAt('home')} textStyle={{fontSize: 20}}>
                    Feed
                </Button>
                <Button active={this.state.tab2} onPress={() => this.toggleTab2()} textStyle={{fontSize: 20}}>
                    Add Item
                </Button>
                <Button active={this.state.tab3} onPress={() => this.toggleTab3()} textStyle={{fontSize: 20}}>
                    Profile
                </Button>
            </FooterTab>
        </Footer>

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

export default connect(mapStateToProps, bindAction)(ProfileDetail);
