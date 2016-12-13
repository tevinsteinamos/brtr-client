
import React, { Component } from 'react';
import { TouchableOpacity, AsyncStorage, Image } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Button, Icon, List, ListItem, InputGroup, Input, Picker, Text, Thumbnail } from 'native-base';
import ArizTheme from '../../themes/custom-theme'

import { openDrawer } from '../../actions/drawer';
import styles from './styles';
import navigateTo from '../../actions/bottomNav';
import {loginUser} from '../../actions/auth';

const Item = Picker.Item;
const barter_logo = require('../../../img/barter_logo.png');

import decode from 'jwt-decode'

class LoginPage extends Component {

    static propTypes = {
        navigateTo: React.PropTypes.func,
    }

    navigateTo(route) {
        this.props.navigateTo(route, 'loginPage');
    }

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            messages: [],
            selectedItem: undefined,
            selected1: 'key0',
            results: {
                items: [],
            },
        };
    }
    onValueChange(value: string) {
        this.setState({
            selected1: value,
        });
    }

    onLoginUser(e) {
        e.preventDefault()
        console.log('login');
        let username = this.state.username.trim()
        let password = this.state.password.trim()
        if (!username || !password) {
          console.log('empty');
            return
        } else {
          console.log(username);
          console.log(password);
          this.props.loginUser(username, password)
          this.setState({
              username: '',
              password: ''
          })

        }
    }

    componentDidMount() {
        this._loadInitialState().done();
    }
    _loadInitialState = async () => {
        try {
            var value = await AsyncStorage.getItem("myKey");
            console.log("value: ", value)
            if (value !== null){
                this.navigateTo('loginPage')
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

    componentDidMount() {
        this._loadInitialState().done();
    }

    _loadInitialState = async () => {
        try {
            var value = await AsyncStorage.getItem("myKey");
            console.log("value: ", value)
            if (value !== null){
                // this.navigateTo('home')
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
        return (
            <Container style={styles.container}>

              <Content>
                <TouchableOpacity>
                  <Image source={barter_logo} style={{ alignSelf: 'center', marginTop: 20, marginBottom: 10 }} />
                </TouchableOpacity>
                <List style={{marginTop: 40, marginLeft: 30, marginRight: 60}} theme={ArizTheme}>
                  <ListItem >
                    <InputGroup >
                      <Input
                          onChangeText={(username) => this.setState({username})}
                          placeholder="Username" style={{color: '#FFFFFF'}}/>
                    </InputGroup>
                  </ListItem>
                  <ListItem>
                    <InputGroup>
                      <Input
                          onChangeText={(password) => this.setState({password})}
                          placeholder="Password" style={{color: '#FFFFFF'}} secureTextEntry />
                    </InputGroup>
                  </ListItem>
                  <Text style={{fontSize:14, marginLeft: 25, color: '#2effd0'}} onPress={()=>alert('Got to Forgot password page')}>Forgot Password ?</Text>
                </List>
                <Button
                    onPress={this.onLoginUser.bind(this)}
                    bordered
                    style={{ alignSelf: 'center', marginTop: 40, marginBottom: 20 , width: 220, borderRadius: 0, borderColor:'#2effd0', height: 50}}>
                  <Text style={{color: '#FFFFFF'}}>
                    SIGN IN
                  </Text>
                </Button>
                <Text
                    style={{textAlign: 'center',color: '#FFFFFF', fontSize: 14}}>
                  Don't have an account yet?
                  <Text style={{color: '#2effd0', fontSize: 12}}
                        onPress={() => this.navigateTo('registerPage')}>   Sign Up !
                  </Text>
                </Text>
              </Content>
            </Container>
        );
    }
}

function bindAction(dispatch) {
    return {
        navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
        loginUser: (username, password) => dispatch(loginUser(username, password)),
    };
}

const mapStateToProps = state => ({
    navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(LoginPage);
