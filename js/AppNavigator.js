
import React, { Component } from 'react';
import { Navigator } from 'react-native';

import Home from './appComponents/home/Home'
// import Home from './appComponents/tab'
import ListItem from './appComponents/listItem/ListItem'
import ListItemCategory from './appComponents/listItemCategory/ListItemCategory'
import ItemDetail from './appComponents/itemDetail/ItemDetail'
import SearchItem from './appComponents/searchItem/SearchItem'
import ProfileDetail from './appComponents/profileDetail'
import AddItem from './appComponents/addItem'
import AskEmail from './appComponents/askEmail'
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
            token: '',
            dataUser: '',
            messages: ''
        }
    }

    renderScene(route, navigator) {
        var routeId = route.id;
        switch (routeId) {
            case 'addItem':
                return <AddItem navigator={navigator} route={route} token={this.props.token} dataUser={this.props.dataUser}/>;
            case 'createMessage':
                return <CreateMessage navigator={navigator} route={route} token={this.props.token} dataUser={this.props.dataUser}/>
            case 'home':
                return <Home navigator={navigator} token={this.props.token} dataUser={this.props.dataUser}/>;
            case 'itemDetail':
                return <ItemDetail navigator={navigator} route={route} token={this.props.token} dataUser={this.props.dataUser}/>;
            case 'loginPage':
                return <LoginPage navigator={navigator}/>;
            case 'registerPage':
                return <RegisterPage navigator={navigator}/>;
            case 'listItemCategory':
                return <ListItemCategory navigator={navigator} route={route} token={this.props.token} dataUser={this.props.dataUser}/>;
            case 'searchItem':
                return <SearchItem navigator={navigator} token={this.props.token} dataUser={this.props.dataUser}/>;
            case 'profileDetail':
                return <ProfileDetail navigator={navigator} route={route} token={this.props.token} dataUser={this.props.dataUser}/>;
            case 'askEmail':
                return <AskEmail navigator={navigator}/>;
            case 'listMessage':
                return <ListMessage navigator={navigator} route={route} token={this.props.token} dataUser={this.props.dataUser}/>
            case 'messageDetail':
                return <MessageDetail navigator={navigator} route={route} token={this.props.token} dataUser={this.props.dataUser}/>
            case 'editProfile':
                return <EditProfile navigator={navigator} route={route} token={this.props.token} dataUser={this.props.dataUser}/>;

            default :
                return this.noRoute(navigator);
        }
    }

    render() {
        const {token, dataUser} = this.props
        return (
            <Navigator
                initialRoute={{id: (token) ? 'home' : 'loginPage'}}
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
