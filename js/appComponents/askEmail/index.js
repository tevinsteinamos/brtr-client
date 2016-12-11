
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Button, Icon, List, ListItem, InputGroup, Input, Picker, Text, Thumbnail } from 'native-base';
import ArizTheme from '../../themes/custom-theme'

import { openDrawer } from '../../actions/drawer';
import styles from './styles';
import navigateTo from '../../actions/bottomNav';
import {loginUser} from '../../actions/auth';

const Item = Picker.Item;
const camera = require('../../../img/camera.png');

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
            email: ''
        };
    }

    onVerifEmail(e) {
        e.preventDefault()
        let email = this.state.email.trim()
        if (!email) {
            return
        } else {
          // this.props.sendEmail(email)
          alert(`Send successfully to email ${email}`)
        }
    }

    render() {
        return (
            <Container style={styles.container}>

              <Content>
                <TouchableOpacity>
                  <Thumbnail size={80} source={camera} style={{ alignSelf: 'center', marginTop: 20, marginBottom: 10 }} />
                </TouchableOpacity>
                <List style={{marginTop: 40, marginLeft: 30, marginRight: 60}} theme={ArizTheme}>
                  <ListItem >
                    <InputGroup >
                      <Input
                          onChangeText={(email) => this.setState({email})}
                          placeholder="email" style={{color: '#FFFFFF'}}/>
                    </InputGroup>
                  </ListItem>
                </List>
                <Button
                    onPress={this.onVerifEmail.bind(this)}
                    bordered
                    style={{ alignSelf: 'center', marginTop: 40, marginBottom: 20 , width: 220, borderRadius: 0, borderColor:'#2effd0', height: 50}}>
                  <Text style={{color: '#FFFFFF'}}>
                    SEND
                  </Text>
                </Button>
              </Content>
            </Container>
        );
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
