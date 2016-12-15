
import React, { Component } from 'react';
import { BackAndroid, AsyncStorage, Navigator } from 'react-native';

import Home from './appComponents/home/Home'
import ListItem from './appComponents/listItem/ListItem'
import ListItemCategory from './appComponents/listItemCategory/ListItemCategory'
import ItemDetail from './appComponents/itemDetail/ItemDetail'
import SearchItem from './appComponents/searchItem/SearchItem'
import ProfileEmpty from './appComponents/profileEmpty'
import ProfileDetail from './appComponents/profileDetail'
import AddItem from './appComponents/addItem'
import AskEmail from './appComponents/askEmail'
import CodeEmail from './appComponents/codeEmail'
import ListMessage from './appComponents/listMessage'
import MessageDetail from './appComponents/messageDetail'
import CreateMessage from './appComponents/createMessage'
import EditProfile from './appComponents/editProfile'
import LoginPage from './appComponents/loginPage';
import RegisterPage from './appComponents/registerPage';


import decode from 'jwt-decode'


class AppNavigator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataUser: {},
            messages: [],
            token: ''
        }
    }

    componentWillMount() {
        BackAndroid.addEventListener('hardwareBackPress', () => {
            this.props.navigator.pop()
            return true
        });
        this._loadInitialState().done();
    }

    _loadInitialState = async () => {
        try {
            let token = await AsyncStorage.getItem("myKey");
            console.log("token: ", token)
            if (token !== null){
                this.setState({token: token})
                this.setState({dataUser: decode(token)});
                this._appendMessage('Recovered selection from disk: ' + token);
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



    renderScene(route, navigator) {
        var routeId = route.id;
        switch (routeId) {
            case 'home':
                return <Home navigator={navigator}/>;
            case 'authPage':
                return <AuthPage navigator={navigator}/>;
            case 'loginPage':
                return <LoginPage navigator={navigator}/>;
            case 'registerPage':
                return <RegisterPage navigator={navigator}/>;
            case 'itemDetail':
                return <ItemDetail navigator={navigator} route={route}/>;
            case 'listItem':
                return <ListItem navigator={navigator}/>;
            case 'listItemCategory':
                return <ListItemCategory navigator={navigator} route={route}/>;
            case 'searchItem':
                return <SearchItem navigator={navigator}/>;
            case 'profileEmpty':
                return <ProfileEmpty navigator={navigator}/>;
            case 'profileDetail':
                return <ProfileDetail navigator={navigator} route={route}/>;
            case 'addItem':
                return <AddItem navigator={navigator} route={route}/>;
            case 'askEmail':
                return <AskEmail navigator={navigator}/>;
            case 'codeEmail':
                return <CodeEmail navigator={navigator}/>;
            case 'listMessage':
                return <ListMessage navigator={navigator} route={route}/>
            case 'messageDetail':
                return <MessageDetail navigator={navigator} route={route}/>
            case 'createMessage':
                return <CreateMessage navigator={navigator} route={route}/>
            case 'editProfile':
                return <EditProfile navigator={navigator} route={route}/>;

            default :
                return this.noRoute(navigator);
        }
    }

    render() {

        return (
            <Navigator
                initialRoute={{id: 'loginPage'}}
                renderScene={this.renderScene.bind(this)}
                configureScene={(route) => {
                        if (route.sceneConfig) {
                            return route.sceneConfig;
                        }
                        return Navigator.SceneConfigs.FloatFromRight;
                    }}
            />
        );
    }

    noRoute(navigator) {
        return (
            <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
                <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
                                  onPress={() => navigator.pop()}>
                    <Text style={{color: 'red', fontWeight: 'bold'}}>Back To Home</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default AppNavigator
