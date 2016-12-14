
import React, { Component } from 'react';
import { BackAndroid, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Button, Icon, List, ListItem, InputGroup, Input, Picker, Text, Thumbnail, H1, H2, H3 } from 'native-base';
import ArizTheme from '../../themes/custom-theme'

import { openDrawer } from '../../actions/drawer';
import styles from './styles';
import navigateTo from '../../actions/bottomNav';
import {loginUser} from '../../actions/auth';
import {forgetPassword} from '../../actions/forgetPassword'

const Item = Picker.Item;
const camera = require('../../../img/camera.png');
const barter_logo = require('../../../img/barter_logo.png');

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
            email: '',
            valid: true,
            notif: false
        };
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
          console.log(validateEmail(email));
          if (validateEmail(email)) {
            console.log('func comp forgetPassword : ', email);
            forgetPassword(email)
            this.setState({notif: true})
            this.setState({email:''})
          } else {
            this.setState({valid: false})
            console.log('email wrong format');
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
              <Container style={styles.container}>
                <Content>
                  <TouchableOpacity>
                    <Image source={barter_logo} style={{ alignSelf: 'center', marginTop: 20, marginBottom: 10 }} />
                  </TouchableOpacity>
                  <Text
                      style={{
                        textAlign: 'center',
                        color: '#FFFFFF',
                        fontSize: 14,
                      marginTop: 25, margin: 15}}>
                    An Email confirmation has been send to your email. Please check it for further information.
                    </Text>
                    <Button
                        onPress={()=> navigator.pop()}
                        bordered
                        style={{ alignSelf: 'center', marginTop: 40, marginBottom: 20 , width: 220, borderRadius: 0, borderColor:'#2effd0', height: 50}}>
                      <Text style={{color: '#FFFFFF'}}>
                        BACK
                      </Text>
                    </Button>
                </Content>
              </Container>
          );
        } else {
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
                            onChangeText={(email) => this.setState({email})}
                            placeholder="Enter your email address" style={{color: '#FFFFFF'}}
                            value={this.state.email}/>
                      </InputGroup>
                    </ListItem>
                  </List>
                  <Button
                      onPress={this.onVerifEmail.bind(this)}
                      bordered
                      style={{ alignSelf: 'center', marginTop: 40, marginBottom: 20 , width: 220, borderRadius: 0, borderColor:'#2effd0', height: 50}}>
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
                    <Text style={{color: '#2effd0', fontSize: 12}}
                          onPress={()=> navigator.pop()}>  Let's go Sign In !</Text></Text>

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
                    <H3 style={{color: 'white', alignSelf: 'center', margin: 5}}> Wrong Email Format </H3>
                </List>

                <Button
                    onPress={this.returnValid.bind(this)}
                    bordered
                    style={{ alignSelf: 'center', marginTop: 40, marginBottom: 20 , width: 220, borderRadius: 0, borderColor:'#2effd0', height: 50}}>
                  <Text style={{color: '#FFFFFF'}}>
                    OK
                  </Text>
                </Button>

                <Text
                    style={{
                      textAlign: 'center',
                      color: '#FFFFFF',
                      fontSize: 14,
                    marginTop: 25}}>
                  Suddenly remember your password ?
                  <Text style={{color: '#2effd0', fontSize: 12}}
                        onPress={()=> navigator.pop()}>  Let's go Sign In !</Text></Text>

              </Content>
            </Container>
        );
      }
    }
}

function bindAction(dispatch) {
    return {
        navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute))
        // sendEmail: (email) => dispatch(sendEmail(email)),
    };
}

const mapStateToProps = state => ({
    navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(LoginPage);
