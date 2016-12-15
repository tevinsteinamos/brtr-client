
import React, { Component } from 'react';
import { TouchableOpacity, AsyncStorage, Image, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Container,
    Content, Button,
    List,
    ListItem, InputGroup, Input,
    Text } from 'native-base';
import ArizTheme from '../../themes/custom-theme'
import myTheme from '../../themes/base-theme';
import styles from './styles';
import {loginUser, userLoginNormalize} from '../../actions/auth';
const barter_logo = require('../../../img/barter_logo.png');

class LoginPage extends Component {

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

    onLoginUser() {
        let username = this.state.username.trim()
        let password = this.state.password.trim()
        if (!username || !password) {
            Alert.alert(
                'Login Failed',
                'All field must be filled',
                [
                    {text: 'OK'},
                ]
            )
        } else {
            this.props.loginUser(username, password, this.props.navigator)
        }
    }

    componentDidMount() {
        this._loadInitialState().done();
    }


    _loadInitialState = async () => {
        try {
            var value = await AsyncStorage.getItem("myKey");
            if (value !== null){
                this.props.navigator.replace({id: 'home'});
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
        userLoginNormalize()
        const {navigator, user, state} =  this.props
        let inputUsername
        let inputPassword
        let warningError

        if (user.user == false) {
            warningError = <Text style={{fontSize:14, marginLeft: 25, color: '#d9534f'}} >Wrong Username or Password</Text>
            inputUsername =
                <ListItem>
                    <InputGroup>
                        <Input
                            onChangeText={(username) => this.setState({username})}
                            placeholder="Username" style={{color: '#FFFFFF'}}/>
                    </InputGroup>
                </ListItem>
            inputPassword =
                <ListItem>
                    <InputGroup>
                        <Input
                            onChangeText={(password) => this.setState({password})}
                            placeholder="Password" style={{color: '#FFFFFF'}} secureTextEntry />
                    </InputGroup>
                </ListItem>
        } else {
            warningError = <Text></Text>
            inputUsername =
                <ListItem >
                    <InputGroup >
                        <Input
                            onChangeText={(username) => this.setState({username})}
                            placeholder="Username" style={{color: '#FFFFFF'}}/>
                    </InputGroup>
                </ListItem>
            inputPassword =
                <ListItem>
                    <InputGroup>
                        <Input
                            onChangeText={(password) => this.setState({password})}
                            placeholder="Password" style={{color: '#FFFFFF'}} secureTextEntry />
                    </InputGroup>
                </ListItem>
        }
        return (
            <Container style={styles.container} theme={myTheme}>

                <Content
                    keyboardShouldPersistTaps={true}
                >
                    <Image source={barter_logo} style={{ alignSelf: 'center', marginTop: 80, marginBottom: 40 }} />
                    <List style={{ marginLeft: 45, marginRight: 60}} theme={ArizTheme}>
                        {warningError}
                        {inputUsername}
                        {inputPassword}
                        <Text style={{fontSize:14, marginLeft: 25, color: '#68696C'}} onPress={()=>navigator.push({id: 'askEmail'})}>Forgot Password?</Text>
                    </List>
                    <Button
                        onPress={this.onLoginUser.bind(this)}
                        bordered
                        style={{ alignSelf: 'center', marginTop: 40, marginBottom: 20 , width: 220, borderRadius: 0, borderColor:'#2effd0', height: 50, paddingTop: 0}}>
                        <Text style={{color: '#FFFFFF'}}>
                            SIGN IN
                        </Text>
                    </Button>
                    <Text
                        style={{textAlign: 'center',color: '#FFFFFF', fontSize: 13}}>
                        Don't have an account yet?
                        <Text style={{color: '#2effd0', fontSize: 13}}
                              onPress={() => this.props.navigator.push({id: 'registerPage'})}>   Sign Up !
                        </Text>
                    </Text>
                </Content>
            </Container>
        );
    }
}

function bindAction(dispatch) {
    return {
        loginUser: (username, password, navigator) => dispatch(loginUser(username, password, navigator)),
    };
}

const mapStateToProps = state => ({
    user: state.auth
});


export default connect(mapStateToProps, bindAction)(LoginPage);
