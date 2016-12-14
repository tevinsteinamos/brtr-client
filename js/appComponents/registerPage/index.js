
import React, { Component } from 'react';
import { TouchableOpacity, Alert, Image } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Button, Icon, List, ListItem, InputGroup, Input, Picker, Text, Thumbnail } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import styles from './styles';
import ArizTheme from '../../themes/custom-theme'
import {registerUser} from '../../actions/auth'

const Item = Picker.Item;
const barter_logo = require('../../../img/barter_logo.png');
import navigateTo from '../../actions/bottomNav';

class RegisterPage extends Component {

    static propTypes = {
        navigateTo: React.PropTypes.func,
    }

    navigateTo(route) {
        this.props.navigateTo(route, 'registerPage');
    }

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
        }

        if (password !== confirmPassword) {
            Alert.alert(
                'Register Fail',
                "Password doesn't match",
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ]
            )
            return
        }

        this.props.registerUser(username, password, email, confirmPassword)
        this.setState({
            username: '',
            password: '',
            email: '',
            confirmPassword: ''
        })
    }

    render() {
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
                        onPress={()=>this.navigateTo('loginPage')}>   Sign In !</Text></Text>
              </Content>
            </Container>
        );
    }
}

function bindAction(dispatch) {
    return {
        navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
        registerUser: (username, password, email, confirmPassword) => dispatch(registerUser(username, password, email, confirmPassword)),
    };
}

const mapStateToProps = state => ({
    navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(RegisterPage);
