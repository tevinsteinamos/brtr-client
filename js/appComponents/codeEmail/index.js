
import React, { Component } from 'react';
import { TouchableOpacity, BackAndroid } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Button, Icon, List, ListItem, InputGroup, Input, Picker, Text, Thumbnail } from 'native-base';
import ArizTheme from '../../themes/custom-theme'
import myTheme from '../../themes/base-theme';

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

    componentWillMount() {
        BackAndroid.addEventListener('hardwareBackPress', () => {
            this.props.navigator.pop()
            return true
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            code: ''
        };
    }

    onVerifCode(e) {
        e.preventDefault()
        let code = this.state.code.trim()
        if (!code) {
            return
        } else {
          // this.props.sendCode(code)
          alert(`Code ${code} verified`)
        }
    }

    render() {
        return (
            <Container style={styles.container} theme={myTheme}>

              <Content>
                  <Thumbnail size={80} source={camera} style={{ alignSelf: 'center', marginTop: 20, marginBottom: 10 }} />
                <Text style={{color: '#fff', textAlign: 'center', marginTop: 30}}>
                  Enter the code from the email we just send you
                </Text>
                <List style={{marginTop: 40, marginLeft: 30, marginRight: 60}} theme={ArizTheme}>
                  <ListItem >
                    <InputGroup >
                      <Input
                          onChangeText={(code) => this.setState({code})}
                          placeholder="Verify code from email" style={{color: '#FFFFFF'}}/>
                    </InputGroup>
                  </ListItem>
                </List>
                <Button
                    onPress={this.onVerifCode.bind(this)}
                    bordered
                    style={{ alignSelf: 'center', marginTop: 40, marginBottom: 20 , width: 220, borderRadius: 0, borderColor:'#2effd0', height: 50, paddingTop: 0}}>
                  <Text style={{color: '#FFFFFF'}}>
                    VERIFY
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
                        onPress={()=>this.navigateTo('loginPage')}>  Let's go Sign In !</Text></Text>

              </Content>
            </Container>
        );
    }
}

function bindAction(dispatch) {
    return {
        navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute))
        // sendCode: (code) => dispatch(sendCode(code)),
    };
}

const mapStateToProps = state => ({
    navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(LoginPage);
