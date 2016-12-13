
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Button, Icon, List, ListItem, Text, Thumbnail, H3, InputGroup, Input, Footer, FooterTab } from 'native-base';

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

class messageDetail extends Component {

  static propTypes = {
    replaceAt: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
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
            <ListItem style={styles.noBottomBorder}>
              <Thumbnail source={pratik} />
              <Text style={styles.text}>Oke jadi gini mas..</Text>
              <Text note>At: 12/04/12</Text>
            </ListItem>
            <ListItem style={styles.noBottomBorder}>
              <Text style={styles.text}>Ya ada apa ya?</Text>
              <Text note>At: 12/04/12</Text>
              <Thumbnail iconRight source={varun} />
            </ListItem>
            <ListItem style={styles.noBottomBorder}>
              <Text style={styles.text}>Woi bales lah elahhhh</Text>
              <Text note>At: 12/04/12</Text>
              <Thumbnail iconRight source={varun} />
            </ListItem>
            <ListItem style={styles.noBottomBorder}>
              <Thumbnail source={pratik} />
              <Text style={styles.text}>Oke jadi gini mas..</Text>
              <Text note>At: 12/04/12</Text>
            </ListItem>
            <ListItem style={styles.noBottomBorder}>
              <Text style={styles.text}>Ya ada apa ya?</Text>
              <Text note>At: 12/04/12</Text>
              <Thumbnail iconRight source={varun} />
            </ListItem>
            <ListItem style={styles.noBottomBorder}>
              <Text style={styles.text}>Woi bales lah elahhhh</Text>
              <Text note>At: 12/04/12</Text>
              <Thumbnail iconRight source={varun} />
            </ListItem>
          </List>
        </Content>
        <Footer>
            <InputGroup borderType='regular' iconRight>
                <Icon name='ios-swap' style={{color: '#6CF9C8'}} />
                <Input placeholder='Type your message here..' style={styles.text}></Input>
            </InputGroup>
          </Footer>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key))
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(messageDetail);
