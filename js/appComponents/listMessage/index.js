
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import {
    Container, Header, Title, Content, Button, Icon,
    List,
} from 'native-base';
import { Image, AsyncStorage, BackAndroid } from 'react-native';

import styles from './styles';

import myTheme from '../../themes/base-theme';
import EachMessage from './EachMessage'
import {listMessageProcess} from '../../actions/listMessage'
import decode from 'jwt-decode'

class listMessage extends Component {

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
            if (value !== null){
                this.setState({token: value});
                this.setState({dataUser: decode(value)});
                if (value) {
                    this.props.listMessageProcess(value)
                }
                this._appendMessage('Recovered selection from disk: ' + value);
            } else {
                this._appendMessage('Initialized with no selection on disk.');
            }
        } catch (error) {
            this._appendMessage('AsyncStorage error: ' + error.message);
        }
    }

    _appendMessage = (message) => {
        this.setState({messages: this.state.messages.concat(message)});
    };

    render() {
        const {item, navigator} = this.props
        let ItemNodes = item.map((data)=> {
            if (this.state.dataUser.id == data.Item.UserId || this.state.dataUser.id == data.Item2.UserId) {
                return(
                    <EachMessage key={data.id} items={data} title={data.title} itemMessageId={data.id} navigator={navigator} activeUser={this.state.dataUser}/>
                )
            } else {
            }
        })

        return (
            <Container theme={myTheme} style={styles.container}>
                <Header>
                    <Title style={{alignSelf: 'center', color: '#6CF9C8'}}>MESSAGES</Title>
                    <Button transparent onPress={() => navigator.pop()}>
                        <Icon name="ios-arrow-back" />
                    </Button>
                    <Button transparent onPress={() => this.props.listMessageProcess(this.state.token)}>
                        <Icon name="ios-refresh" />
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
