
import React, { Component } from 'react';
import { AsyncStorage, BackAndroid } from 'react-native';
import { connect } from 'react-redux';
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Icon,
    Card,
    CardItem,
    Text,
    Thumbnail,
    InputGroup,
    Input,
    Footer,
    Spinner
} from 'native-base';

import styles from './styles';
import moment from 'moment';
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
                if (this.state.body) {
                    this.props.addMessage(value, this.state.body, this.props.route.itemMessageId, this.props.dataUser, Date.now().toString())
                    this.setState({
                        body: ''
                    })
                }
            } else {
            }
        } catch (error) {
        }
    }

    componentWillMount() {
        BackAndroid.addEventListener('hardwareBackPress', () => {
            this.props.navigator.pop()
            return true
        });
        this.props.getMessages(this.props.token, this.props.route.itemMessageId)
    }

    render() {
        var {navigator, messages, token} = this.props
        var title = this.props.route.title
        var showMessages = messages.map((message,index) => {
            if(messages[index]){
                return (
                    <CardItem
                        onPress={() => navigator.push({id: 'profileDetail', UserId: messages[index].User.id})}
                        key={messages[index].id || messages[index].TempMessageId} style={styles.noBottomBorder}>

                        <Thumbnail
                            source={(messages[index].User.avatar) ? {uri: messages[index].User.avatar} : require('../../../img/img-placeholder.png')} />

                        <Text style={styles.text}>{messages[index].body}</Text>
                        <Text note>{moment(messages[index].createdAt).fromNow()}</Text>
                    </CardItem>
                )
            }else{
                return(
                    <ListItem style={styles.noBottomBorder}>
                        <Text>No data found..</Text>
                    </ListItem>
                )
            }
        })

        if (messages.length === 0) {
            return (
                <Container style={styles.container}>
                    <Content>
                        <Spinner color='green' />
                    </Content>
                </Container>
            )
        }
        else {
            return (
                <Container theme={myTheme} style={styles.container}>
                    <Header>
                        <Title style={{alignSelf: 'center'}}>{title}</Title>
                        <Button transparent onPress={() => navigator.pop()}>
                            <Icon name='ios-arrow-back'/>
                        </Button>
                        <Button transparent>
                            <Icon onPress={() => {this.props.getMessages(token, this.props.route.itemMessageId)}}
                                  name="ios-refresh"/>
                        </Button>
                    </Header>

                    <Content>
                        <Card style={{ flex: 0, backgroundColor: '#1E1E1E', borderWidth: 0 }}>
                            {showMessages}
                        </Card>
                    </Content>
                    <Footer>
                        <InputGroup style={styles.noBottomBorder} iconRight>
                            <Icon name='ios-send' style={{color: '#6CF9C8'}} onPress={this.onAddMessage.bind(this)}/>
                            <Input returnKeyType='send' value={this.state.body} placeholder='Type your message here..'
                                   style={styles.text} onChangeText={(body) => this.setState({body: body})}></Input>
                        </InputGroup>
                    </Footer>
                </Container>
            )
        }
    }
}

function bindAction(dispatch) {
    return {
        getMessages: (token,id) => dispatch(getMessages(token, id)),
        addMessage: (token,body,itemMessageId, User, dateTemp) => dispatch(addMessage(token,body,itemMessageId, User, dateTemp))
    };
}

const mapStateToProps = state => ({
    messages: state.messageDetail
});

export default connect(mapStateToProps, bindAction)(messageDetail);
