
import React, { Component } from 'react';
import { BackAndroid, StatusBar, NavigationExperimental, AsyncStorage, Navigator } from 'react-native';

import { closeDrawer } from './actions/drawer';

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


// import Home from './components/home/';
import Anatomy from './components/anatomy/';
import NHBadge from './components/badge/';
import NHButton from './components/button/';
import NHCard from './components/card/';
import NHCardImage from './components/card/card-image';
import NHCardShowcase from './components/card/card-showcase';
import NHCardList from './components/card/card-list';
import NHCardHeaderAndFooter from './components/card/card-header-and-footer';
import NHCheckbox from './components/checkbox/';
import NHDeckSwiper from './components/deckswiper/';
import NHForm from './components/form/';
import NHIcon from './components/icon/';
import NHInputGroup from './components/inputgroup/';
import NHLayout from './components/layout/';
import NHList from './components/list/';
import NHBasicList from './components/list/basic-list';
import NHListDivider from './components/list/list-divider';
import NHListIcon from './components/list/list-icon';
import NHListAvatar from './components/list/list-avatar';
import NHListThumbnail from './components/list/list-thumbnail';
import NHPicker from './components/picker/';
import NHRadio from './components/radio/';
import NHSearchbar from './components/searchbar/';
import NHSpinner from './components/spinner/';
import NHTabs from './components/tabs/';
import NHThumbnail from './components/thumbnail/';
import NHTypography from './components/typography/';
import SplashPage from './components/splashscreen/';
import SideBar from './components/sidebar';
import statusBarColor from './themes/base-theme';
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
            case 'splashscreen':
                return <SplashPage />;
            case 'anatomy':
                return <Anatomy />;
            case 'badge':
                return <NHBadge />;
            case 'button':
                return <NHButton />;
            case 'card':
                return <NHCard />;
            case 'cardImage':
                return <NHCardImage />;
            case 'cardShowcase':
                return <NHCardShowcase />;
            case 'cardList':
                return <NHCardList />;
            case 'cardHeaderAndFooter':
                return <NHCardHeaderAndFooter />;
            case 'checkbox':
                return <NHCheckbox />;
            case 'deckswiper':
                return <NHDeckSwiper />;
            case 'form':
                return <NHForm />;
            case 'icon':
                return <NHIcon />;
            case 'inputgroup':
                return <NHInputGroup />;
            case 'layout':
                return <NHLayout />;
            case 'list':
                return <NHList />;
            case 'basicList':
                return <NHBasicList />;
            case 'listDivider':
                return <NHListDivider />;
            case 'listIcon':
                return <NHListIcon />;
            case 'listAvatar':
                return <NHListAvatar />;
            case 'listThumbnail':
                return <NHListThumbnail />;
            case 'picker':
                return <NHPicker />;
            case 'radio':
                return <NHRadio />;
            case 'searchbar':
                return <NHSearchbar />;
            case 'spinner':
                return <NHSpinner />;
            case 'tabs':
                return <NHTabs />;
            case 'thumbnail':
                return <NHThumbnail />;
            case 'typography':
                return <NHTypography />;

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

    closeDrawer() {
        if (this.props.drawerState === 'opened') {
            this.props.closeDrawer();
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
