
import React, { Component } from 'react';
import { BackAndroid, Image, AsyncStorage, Alert } from 'react-native';
import { connect } from 'react-redux';
import {
    Container,
    Header,
    Title,
    Content,
    Text,
    Button,
    Icon,
    Footer,
    FooterTab,
    Card,
    CardItem,
    Input,
    InputGroup,
} from 'native-base';

import {updateProfile} from '../../actions/updateProfile';
import uploader from '../../helper/uploader'
var ImagePicker = require('react-native-image-picker');

var options = {
    title: 'Select Avatar',
    customButtons: [
        {name: 'fb', title: 'Choose Photo from Facebook'},
    ],
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

import styles from './styles';
import ArizTheme from '../../themes/additemtheme'
import myTheme from '../../themes/base-theme';
import decode from 'jwt-decode'

class ProfileDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tab1: false,
            tab2: false,
            tab3: true,
            dataUser: {},
            messages: [],
            avatarSource: this.props.route.avatar,
            newPassword: '',
            token: ''
        };
    }


    componentDidMount() {
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


    logoutUser = async() => {
        try {
            await AsyncStorage.removeItem("myKey");
            this.props.navigator.replace({id: 'loginPage'})
        } catch (error) {

        }
    }

    uploadImage() {
        ImagePicker.showImagePicker(options, (response) => {

            if (response.didCancel) {

            }
            else if (response.error) {

            }
            else if (response.customButton) {

            }
            else {
                const source = {uri: response.uri, isStatic: true};
                uploader(source, (res)=> {
                    this.setState({
                        avatarSource: res.postResponse.location
                    });
                })

            }
        });
    }

    saveProfile(e) {
        e.preventDefault()
        let newPassword = this.state.newPassword
        if (newPassword) {
            newPassword = this.state.newPassword.trim()
        }
        let photo = this.state.avatarSource
        if (!photo) {
          Alert.alert(
              'Change Password Failed',
              'Please add an avatar to proceed changing password',
              [
                  {text: 'OK'},
              ]
          )
        }

        this.props.updateProfile(newPassword, photo, this.state.token, this.props.navigator)
        this.setState({
            newPassword: '',
            photo: '',
        })
    }


    render() {
        const {navigator} = this.props

        return (
            <Container theme={myTheme} style={styles.container}>
                <Header>
                    <Button transparent onPress={() => navigator.pop()}>
                        <Icon name="ios-arrow-back" />
                    </Button>
                    <Title style={{alignSelf: 'center'}}>BRTR</Title>
                    <Button transparent>
                        <Text style={{color: 'black'}}>Back</Text>
                    </Button>

                </Header>

                <Content>
                    <Card style={{ flex: 0, backgroundColor: '#2c2c2c', borderWidth: 0 }}>
                        <CardItem
                            style={{borderBottomWidth: 0}}
                            onPress={this.uploadImage.bind(this)}>
                            <Image
                                style={{resizeMode: 'cover',  alignSelf: 'center', width: 200, height: 200 }}
                                source={(this.state.avatarSource) ? {uri: this.state.avatarSource} : require('../../../img/img-placeholder.png')}
                            />
                        </CardItem>
                    </Card>

                    <InputGroup
                        style={{marginTop:50, marginLeft: 30, marginRight: 30}}
                        theme={ArizTheme} borderType='underline'>
                        <Input
                            onChangeText={(newPassword) => this.setState({newPassword: newPassword})}
                            value={this.state.newPassword}
                            style={{color: '#FFFFFF'}}
                            placeholder="New Password"
                            secureTextEntry/>
                    </InputGroup>

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
                        onPress={this.saveProfile.bind(this)}>
                        <Text style={{color: '#FFFFFF'}}>SAVE</Text>
                    </Button>

                </Content>

                <Footer>
                    <FooterTab>
                        <Button
                            active={this.state.tab1} onPress={() => navigator.replace({id: 'home'})}>
                            <Icon name='md-home' />
                        </Button>
                        <Button active={this.state.tab2} onPress={() => navigator.replace({id: 'addItem'})} >

                            <Icon name='md-add-circle' />
                        </Button>
                        <Button active={this.state.tab3} onPress={() => navigator.replace({id: 'profileDetail'})} >

                            <Icon name='ios-person' />
                        </Button>
                    </FooterTab>
                </Footer>

            </Container>
        )
    }
}

function bindAction(dispatch) {
    return {
        updateProfile: (newPassword, photo, token, navigator) => dispatch(updateProfile(newPassword, photo, token, navigator)),
    };
}

export default connect(null, bindAction)(ProfileDetail);
