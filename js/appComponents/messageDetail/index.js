
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  List,
  ListItem,
  Text,
  Thumbnail,
  H3,
  InputGroup,
  Input,
  Footer,
  FooterTab
} from 'native-base';

import styles from './styles';

import myTheme from '../../themes/base-theme';
import navigateTo from '../../actions/bottomNav';
import {getMessages} from '../../actions/messageDetail';

const pratik = require('../../../img/contacts/pratik.png');
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

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this._loadInitialState().done();
  }

  _loadInitialState = async () => {
        try {
            var value = await AsyncStorage.getItem("myKey");
            if (value !== null){
                let ItemMessageId = this.props.navigation.routes[this.props.navigation.routes.length - 1].data
                console.log('itemmessageid: ' + ItemMessageId)
                this.props.getMessages(value,1)
            } else {
                console.log("else")
                this._appendMessage('Initialized with no selection on disk.');
            }
        } catch (error) {
            console.log("catch: ", error)
            this._appendMessage('AsyncStorage error: ' + error.message);
        }
    }

  navigateTo(route, data) {
    this.props.navigateTo(route, 'home', data);
  }

  render() {
    var {messages} = this.props
    console.log('messages: ' + messages)
    // var title = this.props.navigation.routes[this.props.navigation.routes.length - 1].data2
    var showMessages = messages.map((message,index) => {
      console.log(messages[index])

      if(messages[index]){
        return (
          <ListItem key={messages[index].id} style={styles.noBottomBorder}>
            <Thumbnail source={{uri: messages[index].User.avatar}} />
            <Text style={styles.text}>{messages[index].body}</Text>
            <Text note>At: {messages[index].createdAt}</Text>
          </ListItem>
          )
      }else{
        return(
          <ListItem style={styles.noBottomBorder}>
            <Text>No data found..</Text>
          </ListItem>
          )
      }
    })
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
            {showMessages}
          </List>
        </Content>
        <Footer>
            <InputGroup style={styles.noBottomBorder} iconRight>
                <Icon name='ios-send' style={{color: '#6CF9C8'}} />
                <Input returnKeyType='send' placeholder='Type your message here..' style={styles.text}></Input>
            </InputGroup>
          </Footer>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
    getMessages: (token,id) => dispatch(getMessages(token, id))
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  messages: state.messageDetail
});

export default connect(mapStateToProps, bindAction)(messageDetail);
