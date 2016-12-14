
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Button, Icon, List, ListItem, Text, Thumbnail, H3 } from 'native-base';
import { Image, AsyncStorage, BackAndroid } from 'react-native';

import styles from './styles';

import myTheme from '../../themes/base-theme';
import navigateTo from '../../actions/bottomNav';

const pratik = require('../../../img/contacts/pratik.png');
const sanket = require('../../../img/contacts/sanket.png');
const megha = require('../../../img/contacts/megha.png');
const atul = require('../../../img/contacts/atul.png');
const saurabh = require('../../../img/contacts/saurabh.png');
const varun = require('../../../img/contacts/varun.png');
import EachMessage from './EachMessage'

import {listMessageProcess} from '../../actions/listMessage'

import decode from 'jwt-decode'



class listMessage extends Component {

  static propTypes = {
    replaceAt: React.PropTypes.func,
    navigateTo: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    })
  }

  constructor(props) {
      super(props);
      this.state = {
          tab1: false,
          tab2: true,
          tab3: false,
          dataUser: {},
          token: '',
          messages: []
      };
  }

    componentWillMount() {
        BackAndroid.addEventListener('hardwareBackPress', () => {
            this.props.navigator.pop()
            return true
        });
        this._loadInitialState().done();
    }

    _loadInitialState = async () => {
      try {
          var value = await AsyncStorage.getItem("myKey");
          console.log("value: ", value)
          if (value !== null){
              this.setState({token: value});
              this.setState({dataUser: decode(value)});
              if (value) {
                this.props.listMessageProcess(value)
              }
              this._appendMessage('Recovered selection from disk: ' + value);
          } else {
              console.log("else")
              this._appendMessage('Initialized with no selection on disk.');
          }
      } catch (error) {
          console.log("catch")
          this._appendMessage('AsyncStorage error: ' + error.message);
      }
    }

    _appendMessage = (message) => {
        this.setState({messages: this.state.messages.concat(message)});
    };

  render() {
    const {item, navigator} = this.props
    console.log('item lis : ', item);
    console.log('user : ', this.state.dataUser);
    let ItemNodes = item.map((data)=> {
      if (this.state.dataUser.id == data.Item.UserId || this.state.dataUser.id == data.Item2.UserId) {
        console.log('user detected : ', data);
        return(
            <EachMessage key={data.id} items={data} title={data.title} itemMessageId={data.id} navigator={navigator} activeUser={this.state.dataUser}/>
        )
      } else {
      }
    })

    return (
      <Container theme={myTheme} style={styles.container}>
          <Header>
                    <Title style={{alignSelf: 'center', color: '#6CF9C8'}}>M E S S A G E S</Title>
                    <Button transparent onPress={() => navigator.pop()}>
                        <Icon name="ios-arrow-back" />
                    </Button>
                    <Button transparent>
                        <Icon style={{color: '#6CF9C8'}} name="ios-mail" />
                    </Button>
                </Header>

        <Content>
          <List>
            {ItemNodes}
          </List>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    listMessageProcess: (token) => dispatch(listMessageProcess(token)),
  };
}

const mapStateToProps = state => ({
  item: state.listMessage
});

export default connect(mapStateToProps, bindAction)(listMessage);
