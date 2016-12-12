
import React, { Component } from 'react';
import { Image, AsyncStorage, Alert } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
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
    View
} from 'native-base';

import navigateTo from '../../actions/bottomNav';
import { openDrawer } from '../../actions/drawer';
import myTheme from '../../themes/base-theme';
import styles from './styles';

import decode from 'jwt-decode'

import {getItemsById} from '../../actions/itemId';
import {deleteItem} from '../../actions/items';

const {
    replaceAt,
} = actions;

class ItemDetail extends Component {

    static propTypes = {
        openDrawer: React.PropTypes.func,
        navigateTo: React.PropTypes.func,
        replaceAt: React.PropTypes.func,
        navigation: React.PropTypes.shape({
            key: React.PropTypes.string,
        }),
    }

    replaceAt(route) {
        this.props.replaceAt('ItemDetail', { key: route }, this.props.navigation.key);
    }

    constructor(props) {
        super(props);
        this.state = {
            tab1: false,
            tab2: false,
            tab3: false,
            token: '',
            dataUser: {},
            messages: []
        };
    }

    navigateTo(route) {
        this.props.navigateTo(route, 'ItemDetail');
    }

    toggleTab1() {
        this.setState({
            tab1: true,
            tab2: false,
            tab3: false,
        });
    }

    toggleTab2() {
        this.setState({
            tab1: false,
            tab2: true,
            tab3: false,
        });
    }

    toggleTab3() {
        this.setState({
            tab1: false,
            tab2: false,
            tab3: true,
        });
    }

    componentDidMount() {
        this._loadInitialState().done();
    }

    _loadInitialState = async () => {
        try {
            var value = await AsyncStorage.getItem("myKey");
            console.log("value token di item detail: ", value)
            if (value !== null){
                let ItemId = this.props.navigation.routes[this.props.navigation.routes.length - 1].data
                console.log("dapet item id: ", ItemId)
                this.setState({token: value});
                this.setState({dataUser: decode(value)});
                this.props.getItemsById(value, ItemId)

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

    onDeleteItem() {
        Alert.alert(
            'Delete This Item?',
            null,
            [
                {text: 'OK', onPress: () => {
                    this.props.deleteItem(this.props.itemId.id, this.state.token)
                }},
                {text: 'Cancel', onPress: () => {
                    // console.log('Cancel Pressed!')
                }},
            ]
        )
    }

    render() {
        const {itemId} = this.props
        console.log('>>>> item detail props: ', this.props)
        console.log('>>>> item detail: ', itemId)
        console.log('>>>> item detail User: ', itemId.User)


        let actionButton
        let editButton
        if (itemId.User) {
            if (itemId.User.id === this.state.dataUser.id) {
                actionButton = <Button
                    onPress={this.onDeleteItem.bind(this)}
                    block danger> Delete </Button>
                editButton = <Button transparent onPress={() => this.navigateTo('editItem')}>
                    Edit
                </Button>
            }
            else {
                actionButton = <Button block success> Barter </Button>
                editButton = ''
            }
        }

        return (
            <Container theme={myTheme} style={styles.container}>

                <Header>
                    <Title style={{alignSelf: 'center'}}>Item Detail</Title>
                    <Button transparent onPress={() => this.navigateTo('ListItem')}>
                        <Icon name="ios-search" />
                    </Button>
                    {editButton}
                </Header>

                <Content>

                    <Card style={{ flex: 0, backgroundColor: '#444444', borderWidth: 0 }}>
                        <CardItem>
                            <H1 style={{color: 'white', paddingBottom: 5}}>{itemId.name}</H1>
                            <Text note>{(itemId.User) ? itemId.User.username : ''}</Text>
                        </CardItem>

                        <CardItem>
                            <Text style={styles.textColor}>
                                {itemId.description}
                            </Text>
                        </CardItem>

                        <CardItem>
                            <Image
                                style={{ resizeMode: 'cover', width: null }}
                                source={{uri: itemId.photo}} />
                        </CardItem>

                        <CardItem>
                            <H3 style={styles.textColor}>Dimension</H3>
                            <Text style={styles.textColor}>{itemId.dimension}</Text>
                        </CardItem>

                        <Grid>
                            <Col>
                                <CardItem>
                                    <H3 style={styles.textColor}>Material</H3>
                                    <Text style={styles.textColor}>{itemId.material}</Text>
                                </CardItem>
                            </Col>
                            <Col>
                                <CardItem>
                                    <H3 style={styles.textColor}>Color</H3>
                                    <Text style={styles.textColor}>{itemId.color}</Text>
                                </CardItem>
                            </Col>
                        </Grid>

                        <CardItem>
                            {actionButton}
                        </CardItem>



                    </Card>
                </Content>

                <Footer>
                    <FooterTab>
                        <Button
                            active={this.state.tab1} onPress={() => this.navigateTo('home')}>
                            Feed
                        </Button>
                        <Button active={this.state.tab2} onPress={() => this.navigateTo('addItem')} >
                            Add Item
                        </Button>
                        <Button active={this.state.tab3} onPress={() => this.navigateTo('profileDetail')} >
                            Profile
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

function bindAction(dispatch) {
    return {
        navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
        getItemsById: (token, ItemId) => dispatch(getItemsById(token, ItemId)),
        deleteItem: (id, token) => dispatch(deleteItem(id, token)),
    };
}

const mapStateToProps = state => ({
    navigation: state.cardNavigation,
    // item: state.items
    itemId: state.itemId
});

export default connect(mapStateToProps, bindAction)(ItemDetail);
