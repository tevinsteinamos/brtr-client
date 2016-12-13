
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Button, Icon, List, ListItem, Text, Thumbnail, H3 } from 'native-base';

import styles from './styles';

import myTheme from '../../themes/base-theme';
import navigateTo from '../../actions/bottomNav';

const pratik = require('../../../img/contacts/pratik.png');
const sanket = require('../../../img/contacts/sanket.png');
const megha = require('../../../img/contacts/megha.png');
const atul = require('../../../img/contacts/atul.png');
const saurabh = require('../../../img/contacts/saurabh.png');
const varun = require('../../../img/contacts/varun.png');

const {
  replaceAt,
} = actions;

class listMessage extends Component {

  static propTypes = {
    replaceAt: React.PropTypes.func,
    navigateTo: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  navigateTo(route) {
        this.props.navigateTo(route, 'listMessage');
    }

  render() {
    return (
      <Container theme={myTheme} style={styles.container}>
          <Header>
                    <Title style={{alignSelf: 'center', color: '#6CF9C8'}}>BRTR</Title>
                    <Button transparent onPress={() => this.replaceAt('searchItem')}>
                        <Icon name="ios-search" />
                    </Button>
                    <Button transparent>
                        <Icon style={{color: '#6CF9C8'}} name="ios-mail" />
                    </Button>
                </Header>

        <Content>
          <List>
            <ListItem style={styles.noBottomBorder} onPress={() => this.navigateTo('messageDetail')}>
              <Thumbnail square size={90} source={pratik} />
              <H3 style={styles.text}>Gua mau barter dong!</H3>
              <Text note style={styles.text}>By <Text style={styles.name}>Tevin Amos</Text></Text>
              <Text style={styles.text}>Doing what you like will always keep you happy . .</Text>
            </ListItem>
            <ListItem style={styles.noBottomBorder}>
              <Thumbnail square size={90} source={sanket} />
              <H3 style={styles.text}>Gua jg mau dong!</H3>
              <Text note style={styles.text}>By <Text style={styles.name}>Tevin Amos</Text></Text>
              <Text style={styles.text}>Doing what you like will always keep you happy . .</Text>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute))
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(listMessage);
