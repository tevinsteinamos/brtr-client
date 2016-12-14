
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
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
import {getMessages, addMessage} from '../../actions/messageDetail';

class messageDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      body: ''
    }
  }

  onValueChange(value){
    this.setState({
      body: value
    })
  }
  
  onAddMessage = async (e) => {
      try {
          var value = await AsyncStorage.getItem("myKey");
          if (value !== null){
              this.props.addMessage(value,this.state.body,this.props.route.itemMessageId)
              this.setState({
                body: ''
              })
          } else {
              console.log("else")
          }
      } catch (error) {
          console.log("catch: ", error)
      }
  }

  componentWillMount() {
    this._loadInitialState().done();
  }

  _loadInitialState = async () => {
        try {
            var value = await AsyncStorage.getItem("myKey");
            if (value !== null){
                let itemMessageId = this.props.route.itemMessageId
                console.log('itemmessageid: ' + itemMessageId)
                this.props.getMessages(value,itemMessageId)
            } else {
                console.log("else")
            }
        } catch (error) {
            console.log("catch: ", error)
        }
    }

  render() {
    var {messages} = this.props
    console.log('messages: ' + messages)
    var title = this.props.route.title
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
                    <Title style={{alignSelf: 'center'}}>{title}</Title>
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
                <Icon name='ios-send' style={{color: '#6CF9C8'}} onPress={this.onAddMessage.bind(this)}/>
                <Input returnKeyType='send' value={this.state.body} placeholder='Type your message here..' style={styles.text} onChangeText={(body) => this.setState({body: body})}></Input>
            </InputGroup>
          </Footer>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    getMessages: (token,id) => dispatch(getMessages(token, id)),
    addMessage: (token,body,itemMessageId) => dispatch(addMessage(token,body,itemMessageId))
  };
}

const mapStateToProps = state => ({
  messages: state.messageDetail
});

export default connect(mapStateToProps, bindAction)(messageDetail);
