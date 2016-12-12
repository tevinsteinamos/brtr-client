
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Button, Icon, List, ListItem, Text, Thumbnail } from 'native-base';

import styles from './styles';

const pratik = require('../../../img/contacts/pratik.png');
const sanket = require('../../../img/contacts/sanket.png');
const megha = require('../../../img/contacts/megha.png');
const atul = require('../../../img/contacts/atul.png');
const saurabh = require('../../../img/contacts/saurabh.png');
const varun = require('../../../img/contacts/varun.png');
import myTheme from '../../themes/base-theme';

const {
  replaceAt,
} = actions;

class NHListAvatar extends Component {

  static propTypes = {
    replaceAt: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  replaceAt(route) {
    this.props.replaceAt('listAvatar', { key: route }, this.props.navigation.key);
  }

  render() {
    return (
      <Container theme={myTheme} style={styles.container}>
          <Header>
                    <Title style={{alignSelf: 'center'}}>BRTR</Title>
                    <Button transparent onPress={() => this.replaceAt('searchItem')}>
                        <Icon name="ios-search" />
                    </Button>
                    <Button transparent onPress={() => this.replaceAt('listMessage')}>
                        <Icon name="ios-mail" />
                    </Button>
                </Header>

        <Content>
          <List>
            <ListItem>
              <Thumbnail source={pratik} />
              <Text style={styles.text}>Gua mau barter dong!</Text>
              <Text>By <Text style={styles.name}>Tevin Amos</Text></Text>
              <Text note>Doing what you like will always keep you happy . .</Text>
            </ListItem>
            <ListItem>
              <Thumbnail source={sanket} />
              <Text>Kumar Sanket</Text>
              <Text note>Life is one time offer! Use it well</Text>
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
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(NHListAvatar);
