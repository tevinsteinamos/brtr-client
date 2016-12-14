
import React, { Component } from 'react';
import { TouchableOpacity, Alert, Image, BackAndroid } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Button, Icon, List, ListItem, InputGroup, Input, Picker, Text, Thumbnail } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import styles from './styles';
import ArizTheme from '../../themes/custom-theme'
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
            return
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
                        "Password doesn't match",
                        [
                            {text: 'OK', onPress: () => console.log('OK Pressed')},
                        ]
                    )
                    return
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
                    'Email Verification Failed',
                    "Please insert a correct email address to continue",
                    [
                        {text: 'OK', onPress: () => this.setState({valid: true})},
                    ]
                )
                console.log('email wrong format');
                return
              }
        }
    }

    render() {
      const {navigator} = this.props
        return (
            <Container style={styles.container}>

              <Content>
                <TouchableOpacity>
                  <Image source={barter_logo} style={{ alignSelf: 'center', marginTop: 20, marginBottom: 10 }} />
                </TouchableOpacity>
                <List style={{marginTop: 40, marginLeft: 30, marginRight: 60}} theme={ArizTheme}>
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
                      height: 50
                }}
                    onPress={this.onRegisterUser.bind(this)}><Text style={{color: '#FFFFFF'}}>SIGN UP</Text></Button>
                <Text
                    style={{
                      textAlign: 'center',
                      color: '#FFFFFF',
                      fontSize: 14}}>
                  Already have an account ?
                  <Text style={{color: '#2effd0', fontSize: 12}}
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
});

export default connect(mapStateToProps, bindAction)(RegisterPage);
