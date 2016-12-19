
import React, { Component } from 'react';
import { BackAndroid, TouchableOpacity, Image, Alert } from 'react-native';
import { connect } from 'react-redux';
import {
    Container,
    Content, Button, Icon, List, ListItem, InputGroup, Input, Text,
} from 'native-base';
import ArizTheme from '../../themes/custom-theme';
import myTheme from '../../themes/base-theme';

import styles from './styles';
import {forgetPassword} from '../../actions/forgetPassword'
const barter_logo = require('../../../img/barter_logo.png');

class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            valid: true,
            notif: false
        };
    }

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', () => {
            this.props.navigator.pop()
            return true
        });
    }

    onVerifEmail() {
        let validateEmail = (value) => {
            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return regex.test(value)
        }
        let email = this.state.email.trim()
        if (!email) {
            return
        } else {
            if (validateEmail(email)) {
                forgetPassword(email)
                this.setState({notif: true})
                this.setState({email:''})
            } else {
                this.setState({valid: false})
                Alert.alert(
                    'Email Verification Failed',
                    "Please insert a correct email address to continue",
                    [
                        {text: 'OK', onPress: () => this.setState({valid: true})},
                    ]
                )
                return
            }
        }
    }

    returnValid() {
        this.setState({valid: true})
    }

    render() {
        const {navigator} = this.props
        if (this.state.valid) {
            if (this.state.notif) {
                return (
                    <Container style={styles.container} theme={myTheme}>
                        <Content>
                            <Image source={barter_logo} style={{ alignSelf: 'center', marginTop: 80, marginBottom: 40}} />
                            <Text
                                style={{
                        textAlign: 'center',
                        color: '#FFFFFF',
                        fontSize: 14,
                       margin: 15}}>
                                An email confirmation has been sent to your email! Please check for further information.
                            </Text>
                            <Button
                                onPress={()=> navigator.pop()}
                                bordered
                                style={{ alignSelf: 'center', marginTop: 40, marginBottom: 20 , width: 220, borderRadius: 0, borderColor:'#2effd0', height: 50, paddingTop: 0}}>
                                <Text style={{color: '#FFFFFF'}}>
                                    BACK
                                </Text>
                            </Button>
                        </Content>
                    </Container>
                );
            } else {
                return (
                    <Container style={styles.container} theme={myTheme}>
                        <Content>
                            <Image source={barter_logo} style={{ alignSelf: 'center', marginTop: 80, marginBottom: 40 }} />
                            <List style={{marginLeft: 45, marginRight: 60}} theme={ArizTheme}>
                                <ListItem >
                                    <InputGroup >
                                        <Input
                                            onChangeText={(email) => this.setState({email})}
                                            placeholder="Enter your email address" style={{color: '#FFFFFF'}}
                                            value={this.state.email}/>
                                    </InputGroup>
                                </ListItem>
                            </List>
                            <Button
                                onPress={this.onVerifEmail.bind(this)}
                                bordered
                                style={{ alignSelf: 'center', marginTop: 40, marginBottom: 20 , width: 220, borderRadius: 0, borderColor:'#2effd0', height: 50, paddingTop: 0}}>
                                <Text style={{color: '#FFFFFF'}}>
                                    NEXT
                                </Text>
                            </Button>

                            <Text
                                style={{
                        textAlign: 'center',
                        color: '#FFFFFF',
                        fontSize: 13,
                      marginTop: 25}}>
                                Remember your password now?
                                <Text style={{color: '#2effd0', fontSize: 13}}
                                      onPress={()=> navigator.pop()}>  Sign In !</Text></Text>

                        </Content>
                    </Container>
                );
            }
        } else {
            return (
                <Container style={styles.container}>
                    <Content>
                        <TouchableOpacity>
                            <Image source={barter_logo} style={{ alignSelf: 'center', marginTop: 20, marginBottom: 10 }} />
                        </TouchableOpacity>
                        <List style={{marginTop: 40, marginLeft: 30, marginRight: 60}} theme={ArizTheme}>
                            <ListItem >
                                <InputGroup iconRight error disabled>
                                    <Icon name='ios-close-circle' style={{color:'red'}} onPress={this.returnValid.bind(this)}/>
                                    <Input style={{color: 'white'}} value={this.state.email}/>
                                </InputGroup>
                            </ListItem>
                        </List>

                        <Button
                            onPress={this.returnValid.bind(this)}
                            bordered
                            style={{ alignSelf: 'center', marginTop: 40, marginBottom: 20 , width: 220, borderRadius: 0, borderColor:'#2effd0', height: 50, paddingTop: 0}}>
                            <Text style={{color: '#FFFFFF'}}>
                                NEXT
                            </Text>
                        </Button>

                        <Text
                            style={{
                                textAlign: 'center',
                                color: '#FFFFFF',
                                fontSize: 14,
                                marginTop: 25}}>
                                Suddenly remember your password ?
                            <Text
                                style={{color: '#2effd0', fontSize: 12}}
                                onPress={()=> navigator.pop()}>  Let's go Sign In !
                            </Text>
                        </Text>

                        </Content>
                </Container>
            );
        }
    }
}

export default LoginPage
