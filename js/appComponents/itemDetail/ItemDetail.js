
import React, { Component } from 'react';
import { BackAndroid, Image, AsyncStorage, Alert } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { connect } from 'react-redux';
import {
    Container,
    Header,
    Title,
    Content,
    Text, H3, H1, H2,
    Button,
    Icon,
    Footer,
    FooterTab,
    Card,
    CardItem,
    Thumbnail,
    ListItem,
    Spinner
} from 'native-base';

import myTheme from '../../themes/base-theme';
import styles from './styles';

import decode from 'jwt-decode'

import {getItemsById} from '../../actions/itemId';
import {deleteItem} from '../../actions/items';

class ItemDetail extends Component {

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
                this.props.getItemsById(value, this.props.route.ItemId)

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

    onDeleteItem() {
        Alert.alert(
            'Are you sure you want to remove this item?',
            null,
            [
                {text: 'OK', onPress: () => {
                    this.props.deleteItem(this.props.itemId.id, this.state.token, this.props.navigator)
                }},
                {text: 'Cancel', onPress: () => {

                }},
            ]
        )
    }



    render() {
        const {navigator, route, itemId} = this.props
        let actionButton
        let deleteButton
        if (itemId.User) {
            if (itemId.User.id === this.state.dataUser.id) {
                actionButton = <Button transparent onPress={() => navigator.push({id: 'addItem', ItemId: itemId.id})}>
                    <Icon name="md-create" />
                </Button>
                deleteButton = <Button
                        onPress={this.onDeleteItem.bind(this)}
                        bordered
                        style={{ alignSelf: 'center', marginBottom: 20 , width: 280, borderRadius: 0, borderColor:'#2effd0', height: 50, paddingTop: 0}}>
                        <Text style={{color: '#FFFFFF'}}>
                            I HAVE BARTERED THIS ITEM
                        </Text>
                    </Button>
            }
            else {
                actionButton = <Button transparent
                                       onPress={() => navigator.push({id: 'createMessage', ItemId: itemId.id})}
                                       block success> <Icon name="md-swap" /> </Button>
                deleteButton = <Text></Text>
            }
        }

        
        return (
            <Container theme={myTheme} style={styles.container}>

                <Header>
                    <Title style={{alignSelf: 'center', color: '#6CF9C8'}}>{itemId.name}</Title>
                    <Button transparent onPress={() => navigator.push({id: 'searchItem'})}>
                        <Icon name="ios-search"/>
                    </Button>
                    {actionButton}
                </Header>

                <Content>

                    <Card style={{ flex: 0, backgroundColor: '#000', borderWidth: 0 }}>
                        <CardItem style={{borderBottomWidth: 0}}>
                            <H1 style={{color: 'white', marginBottom: 10, marginLeft: 10}}>{itemId.name}</H1>
                            <ListItem
                                onPress={() => navigator.push({id: 'profileDetail', UserId: itemId.User.id})}
                                style={{borderBottomWidth: 0, marginBottom: -15}}>
                                <Thumbnail
                                    source={(itemId.User) ? ((itemId.User.avatar) ? {uri: itemId.User.avatar} : require('../../../img/img-placeholder.png')) : require('../../../img/img-placeholder.png')}/>
                                <H3 style={{color: '#8B8F95'}}>
                                    by {(itemId.User) ? itemId.User.username : ''}
                                </H3>
                            </ListItem>
                        </CardItem>

                        <CardItem style={{borderBottomWidth: 0, marginLeft: 10, marginBottom: 10}}>
                            <Text style={styles.textColor}>
                                {itemId.description}
                            </Text>
                        </CardItem>

                        <CardItem style={{borderBottomWidth: 0, marginBottom: 10}}>
                            <Image
                                style={{ resizeMode: 'cover', width: null }}
                                source={{uri: itemId.photo}}/>
                        </CardItem>

                        <CardItem style={{borderBottomWidth: 0, marginLeft: 10}}>
                            <Text style={{color: 'white'}}>Dimension/size <H2 style={styles.textColor}>{itemId.dimension}</H2></Text>
                        </CardItem>

                        <Grid style={{marginLeft: 10}}>
                            <Col>
                                <CardItem style={{borderBottomWidth: 0}}>
                                    <Text style={{color: 'white'}}>Material</Text>
                                    <H2 style={styles.textColor}>{itemId.material}</H2>
                                </CardItem>
                            </Col>
                            <Col>
                                <CardItem style={{borderBottomWidth: 0}}>
                                    <Text style={{color: 'white'}}>Color</Text>
                                    <H2 style={styles.textColor}>{itemId.color}</H2>
                                </CardItem>
                            </Col>
                        </Grid>

                        <CardItem style={{borderBottomWidth: 0, marginTop: 10}}>
                            {deleteButton}
                        </CardItem>


                    </Card>
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

function bindAction(dispatch) {
    return {
        getItemsById: (token, ItemId) => dispatch(getItemsById(token, ItemId)),
        deleteItem: (id, token, navigator) => dispatch(deleteItem(id, token, navigator)),
    };
}

const mapStateToProps = state => ({
    itemId: state.itemId
});

export default connect(mapStateToProps, bindAction)(ItemDetail);
