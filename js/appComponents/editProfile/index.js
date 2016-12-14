
import React, { Component } from 'react';
import { BackAndroid, Image, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import {
    Container,
    Header,
    Title,
    Content,
    Text, H3, H2, H1,
    Button,
    Icon,
    Footer,
    FooterTab,
    Card,
    CardItem,
    Thumbnail,
    View,
    ListItem,
    Input,
    InputGroup,
} from 'native-base';
import { Grid, Col } from 'react-native-easy-grid';

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
const logo = require('../../../img/logo.png');
const cardImage = require('../../../img/drawer-cover.png');
const camera = require('../../../img/camera.png');
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
            console.log("value: ", value)
            if (value !== null){
                this.setState({token: value});
                this.setState({dataUser: decode(value)});
                this._appendMessage('Recovered selection from disk: ' + value);
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


    logoutUser = async() => {
        try {
            await AsyncStorage.removeItem("myKey");
            this.props.navigator.replace({id: 'loginPage'})
        } catch (error) {
            console.log("err")
        }
    }

    uploadImage() {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                const source = {uri: response.uri, isStatic: true};

                uploader(source, (res)=> {
                    console.log("ini respon awS3: ", res)
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

        console.log("photo state: ", photo)
        if (!photo) {
            console.log("kosong")
            return
        }

        this.props.updateProfile(newPassword, photo, this.state.token, this.props.navigator)
        this.setState({
            newPassword: '',
            photo: '',
        })
    }


    render() {
        const {navigator} = this.props
        console.log("ini photo state di profile: ", this.state.avatarSource)

        return (
            <Container theme={myTheme} style={styles.container}>
                <Header>
                    <Title style={{alignSelf: 'center'}}>BRTR</Title>
                    <Button transparent onPress={() => navigator.pop()}>
                        Back
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
                            Feed
                        </Button>
                        <Button active={this.state.tab2} onPress={() => navigator.replace({id: 'addItem'})} >
                            Add Item
                        </Button>
                        <Button active={this.state.tab3} onPress={() => navigator.replace({id: 'profileDetail'})} >
                            Profile
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
