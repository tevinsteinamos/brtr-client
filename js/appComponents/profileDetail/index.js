
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
} from 'native-base';
import {getItemsByUserId} from '../../actions/items';
import {getUserById} from '../../actions/getUserById';
import myTheme from '../../themes/base-theme';
import styles from './styles';
import DataItems from './DataItems'
import FooterNav from '../footer'

class ProfileDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tab1: false,
            tab2: false,
            tab3: true,
            loading: (!this.props.loading) ? this.props.loading : true
        };
    }


    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', () => {
            this.props.navigator.pop()
            return true
        });
        if(this.props.route.UserId) {
            this.setState({tab3: false})
            this.props.getItemsByUserId(this.props.token, this.props.route.UserId)
            this.props.getUserById(this.props.token, this.props.route.UserId, navigator)
        }
        else {
            this.setState({tab3: true})
            this.props.getItemsByUserId(this.props.token, this.props.dataUser.id)
            this.props.getUserById(this.props.token, this.props.dataUser.id, navigator)
        }

    }

    logoutUser = async() => {
        try {
            await AsyncStorage.removeItem("myKey");
            this.props.navigator.replace({id: 'loginPage'})
        } catch (error) {

        }
    }


    render() {
        const {navigator, items, user, route, dataUser, token, loading} = this.props
        let buttonLogout

        if(route.UserId) {
            if(route.UserId === dataUser.id) {
                buttonLogout =
                    <Button transparent onPress={this.logoutUser.bind(this)}>
                        <Icon name="ios-exit" />
                    </Button>
                buttonEditProfile =
                    <Button transparent onPress={() => this.props.navigator.push({id: 'editProfile', avatar: user.avatar})}>
                        <Icon name="ios-settings" />
                    </Button>
            }
            else {
                buttonLogout =
                    <Button transparent>
                        <Text style={{color:'black'}}>...</Text>
                    </Button>
                buttonEditProfile = 
                    <Button transparent>
                        <Text style={{color:'black'}}>...</Text>
                    </Button>
            }
        }
        else {
            buttonLogout =
                <Button transparent onPress={this.logoutUser.bind(this)}>
                        <Icon name="ios-exit" />
                    </Button>
            buttonEditProfile = 
                <Button transparent onPress={() => navigator.push({id: 'editProfile', avatar: user.avatar})}>
                    <Icon name="ios-settings" />
                </Button>
        }


        let ItemNodes = items.map(function (item) {
            return(
                <DataItems navigator={navigator} key={item.id} items={item} />
            )
        })


        return (
            <Container theme={myTheme} style={styles.container}>
                <Header>
                    <Title style={{alignSelf: 'center', color: '#6CF9C8'}}>
                        {(this.props.route.UserId) ? ((this.props.route.UserId === dataUser.id) ? 'MY PROFILE' : `${user.username}` ) : 'MY PROFILE'}
                    </Title>
                    {buttonEditProfile}
                    {buttonLogout}
                </Header>

                <Content>
                    <Card style={{ flex: 0, backgroundColor: '#1E1E1E', borderWidth: 0 }}>
                        <CardItem
                            style={{borderBottomWidth: 0, marginTop: 20}}
                        >
                            <Image
                                style={{resizeMode: 'cover',  alignSelf: 'center', width: 200, height: 200, borderRadius: 200, borderWidth: 2, borderColor: '#6CF9C8' }}
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
                            marginBottom: 20,
                            marginTop: 20,
                            color: '#6CF9C8'}}>
                        {user.username}
                    </Text>

                      <List>
                        {ItemNodes}
                      </List>
                </Content>

                <Footer>
                    <FooterNav navigator={navigator} route={route} tab1={false} tab2={false} tab3={true}/>
                </Footer>

            </Container>
        );
    }
}

function bindAction(dispatch) {
    return {
        getItemsByUserId: (token, id) => dispatch(getItemsByUserId(token, id)),
        getUserById: (token, id, navigator) => dispatch(getUserById(token, id, navigator)),
    };
}

const mapStateToProps = state => ({
    items: state.items,
    user: state.getUserById
});

export default connect(mapStateToProps, bindAction)(ProfileDetail);
