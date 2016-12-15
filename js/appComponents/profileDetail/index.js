
import React, { Component } from 'react';
import { BackAndroid, Image, AsyncStorage } from 'react-native';
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
    List,
    Spinner
} from 'native-base';

import {getItemsByUserId} from '../../actions/items';
import {getUserById} from '../../actions/getUserById';
import myTheme from '../../themes/base-theme';
import styles from './styles';

import decode from 'jwt-decode'

import DataItems from './DataItems'


class ProfileDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tab1: false,
            tab2: false,
            tab3: true,
            dataUser: {},
            messages: [],
            loading: (!this.props.loading) ? this.props.loading : true
        };
    }


    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', () => {
            // this.props.navigator.pop()
            return false
        });
        this._loadInitialState().done();
    }

    _loadInitialState = async () => {
        try {
            var value = await AsyncStorage.getItem("myKey");
            this.setState({dataUser: decode(value)})
            if (value !== null){

                if (this.props.route.UserId) {

                    this.props.getItemsByUserId(value, this.props.route.UserId)
                    this.props.getUserById(value, this.props.route.UserId)
                    if (this.props.route.UserId === this.state.dataUser.id) {
                        this.setState({tab3: true})
                    }
                    else {
                        this.setState({tab3: false})
                    }
                }
                else {
                    this.props.getItemsByUserId(value, this.state.dataUser.id)
                    this.props.getUserById(value, this.state.dataUser.id)
                }

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


    render() {
        const {navigator, items, user, loading} = this.props
        console.log(this.state.loading)
        let buttonLogout

        if(this.props.route.UserId) {
            if(this.props.route.UserId === this.state.dataUser.id) {
                buttonLogout =
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
                        onPress={this.logoutUser.bind(this)}><Text style={{color: '#FFFFFF'}}>LOGOUT</Text>
                    </Button>
            }
            else {
                buttonLogout =
                    <Button transparent>
                        <Text></Text>
                    </Button>
            }
        }
        else {
            buttonLogout =
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
                onPress={this.logoutUser.bind(this)}><Text style={{color: '#FFFFFF'}}>LOGOUT</Text>
            </Button>
        }


        let ItemNodes = items.map(function (item) {
            return(
                <DataItems navigator={navigator} key={item.id} items={item} />
            )
        })

        if(this.state.loading) {
            return(
                <Container theme={myTheme} style={styles.container}>
                    <Content>
                        <Spinner color='green' />
                    </Content>
                </Container>
            )
        }
        else {
            return (
                <Container theme={myTheme} style={styles.container}>
                    <Header>
                        <Title style={{alignSelf: 'center', color: '#6CF9C8'}}>
                            {(this.props.route.UserId) ? ((this.props.route.UserId === this.state.dataUser.id) ? 'MY PROFILE' : `${user.username} PROFILE` ) : 'MY PROFILE'}
                        </Title>
                        <Button transparent onPress={() => this.props.navigator.push({id: 'searchItem'})}>
                            <Icon name="ios-search"/>
                        </Button>
                        <Button transparent
                                onPress={() => this.props.navigator.push({id: 'editProfile', avatar: user.avatar})}>
                            <Icon name="ios-settings"/>
                        </Button>
                    </Header>

                    <Content>
                        <Card style={{ flex: 0, backgroundColor: '#1E1E1E', borderWidth: 0 }}>
                            <CardItem
                                style={{borderBottomWidth: 0}}
                            >
                                <Image
                                    style={{resizeMode: 'cover',  alignSelf: 'center', width: 200, height: 200 }}
                                    source={(user.avatar) ? {uri: user.avatar} : require('../../../img/img-placeholder.png')}
                                />
                            </CardItem>
                        </Card>
                        <Text
                            style={{
                            color: '#fff',
                            alignSelf: 'center',
                            fontSize: 20,
                            fontStyle: 'normal',
                            marginBottom: 20}}>
                            {user.username}
                        </Text>

                        {buttonLogout}

                        <Text
                            style={{
                            color: '#fff',
                             alignSelf: 'center',
                             fontSize: 20,
                             fontStyle: 'normal',
                             marginTop: 20,
                             marginBottom: 20
                        }}>
                        </Text>

                        <List>
                            {ItemNodes}
                        </List>
                    </Content>

                    <Footer>
                        <FooterTab>
                            <Button
                                active={this.state.tab1} onPress={() => navigator.replace({id: 'home'})}>
                                <Icon name='md-home'/>
                            </Button>
                            <Button active={this.state.tab2} onPress={() => navigator.replace({id: 'addItem'})}>

                                <Icon name='md-add-circle'/>
                            </Button>
                            <Button active={this.state.tab3} onPress={() => navigator.replace({id: 'profileDetail'})}>

                                <Icon name='ios-person'/>
                            </Button>
                        </FooterTab>
                    </Footer>

                </Container>
            );
        }
    }
}

function bindAction(dispatch) {
    return {
        getItemsByUserId: (token, id) => dispatch(getItemsByUserId(token, id)),
        getUserById: (token, id) => dispatch(getUserById(token, id)),
    };
}

const mapStateToProps = state => ({
    items: state.items,
    user: state.getUserById,
    loading: state.loading
});

export default connect(mapStateToProps, bindAction)(ProfileDetail);
