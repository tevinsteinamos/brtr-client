
import React, { Component } from 'react';
import { TouchableOpacity, Alert, Image, BackAndroid } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Button, Icon, List, ListItem, InputGroup, Input, Picker, Text, Thumbnail } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import styles from './styles';
import ArizTheme from '../../themes/custom-theme'
import myTheme from '../../themes/base-theme';
import {registerUser} from '../../actions/auth'

const Item = Picker.Item;
const barter_logo = require('../../../img/barter_logo.png');

class RegisterPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            confirmPassword: '',
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

    componentWillMount() {
        BackAndroid.addEventListener('hardwareBackPress', () => {
            this.props.navigator.pop()
            return true
        });
    }
    onRegisterUser(e) {
        e.preventDefault()
        let username = this.state.username.trim()
        let password = this.state.password.trim()
        let email = this.state.email.trim()
        let confirmPassword = this.state.confirmPassword.trim()
        if (!username || !password || !email || !confirmPassword) {
            Alert.alert(
                'Register Fail',
                'All fields must not empty',
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ]
            )
        } else {
            let validateEmail = (value) => {
                let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return regex.test(value)
            }
            let email = this.state.email.trim()
            console.log(validateEmail(email));
            if (validateEmail(email)) {
                if (password !== confirmPassword) {
                    Alert.alert(
                        'Register Fail',
                        "Confirm Password doesn't match",
                        [
                            {text: 'OK', onPress: () => console.log('OK Pressed')},
                        ]
                    )
                } else {
                    this.props.registerUser(username, password, email, confirmPassword, this.props.navigator)
                    this.setState({
                        username: '',
                        password: '',
                        email: '',
                        confirmPassword: ''
                    })
                }
            } else {
                this.setState({valid: false})
                Alert.alert(
                    'Register Fail',
                    "Please insert a correct email address to continue",
                    [
                        {text: 'OK', onPress: () => this.setState({valid: true})},
                    ]
                )
                console.log('email wrong format');
            }
        }
    }

    render() {
        const {navigator, status} = this.props
        console.log('user register page: ', status);
        let warningError
        if (status.status == false) {
            warningError = <Text style={{fontSize:14, marginLeft: 25, color: '#d9534f'}} >Username or email has been registered</Text>
        } else {
            warningError = <Text></Text>
        }
        return (
            <Container style={styles.container} theme={myTheme}>

                <Content>
                    <Image source={barter_logo} style={{ alignSelf: 'center', marginTop: 60, marginBottom: 70, width: 65, height: 55 }} />
                    <List style={{ marginLeft: 45, marginRight: 60}} theme={ArizTheme}>
                        {warningError}
                        <ListItem>
                            <InputGroup >
                                <Input
                                    onChangeText={(username) => this.setState({username})}
                                    placeholder="Username" style={{color: '#FFFFFF'}}/>
                            </InputGroup>
                        </ListItem>
                        <ListItem>
                            <InputGroup>
                                <Input
                                    onChangeText={(email) => this.setState({email})}
                                    placeholder="Email" style={{color: '#FFFFFF'}}/>
                            </InputGroup>
                        </ListItem>
                        <ListItem>
                            <InputGroup>
                                <Input
                                    onChangeText={(password) => this.setState({password})}
                                    placeholder="Password" secureTextEntry style={{color: '#FFFFFF'}}/>
                            </InputGroup>
                        </ListItem>
                        <ListItem>
                            <InputGroup>
                                <Input
                                    onChangeText={(confirmPassword) => this.setState({confirmPassword})}
                                    placeholder="Confirm Password" secureTextEntry style={{color: '#FFFFFF'}}/>
                            </InputGroup>
                        </ListItem>
                    </List>
                    <Button
                        bordered style={{
                      alignSelf: 'center',
                      marginTop: 40,
                      marginBottom: 20 ,
                      width: 220,
                      borderRadius: 0,
                      borderColor:'#2effd0',
                      height: 50,
                      paddingTop: 0
                }}
                        onPress={this.onRegisterUser.bind(this)}><Text style={{color: '#FFFFFF'}}>SIGN UP</Text></Button>
                    <Text
                        style={{
                      textAlign: 'center',
                      color: '#FFFFFF',
                      fontSize: 13}}>
                        Already have an account ?
                        <Text style={{color: '#2effd0', fontSize: 13}}
                              onPress={()=>navigator.replace({id: 'loginPage'})}>   Sign In !</Text></Text>
                </Content>
            </Container>
        );
    }
}

function bindAction(dispatch) {
    return {
        registerUser: (username, password, email, confirmPassword, navigator) => dispatch(registerUser(username, password, email, confirmPassword, navigator)),
    };
}

const mapStateToProps = state => ({
    navigation: state.cardNavigation,
    status: state.auth
});

export default connect(mapStateToProps, bindAction)(RegisterPage);
