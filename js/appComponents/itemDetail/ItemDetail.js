
import React, { Component } from 'react';
import { BackAndroid, Image, AsyncStorage, Alert } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { connect } from 'react-redux';
import {
    Container,
    Header,
    Title,
    Content,
    Text, H3, H1,
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
            'Delete This Item?',
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
        const {navigator, route, itemId, loading} = this.props
        let actionButton
        let deleteButton
        if (itemId.User) {
            if (itemId.User.id === this.state.dataUser.id) {
                actionButton = <Button transparent onPress={() => navigator.push({id: 'addItem', ItemId: itemId.id})}>
                    <Icon name="md-create" />
                </Button>
                deleteButton = <Button
                    onPress={this.onDeleteItem.bind(this)}
                    block danger> Remove Item </Button>
            }
            else {
                actionButton = <Button transparent
                    onPress={() => navigator.push({id: 'createMessage', ItemId: itemId.id})}
                    block success> <Icon name="md-swap" /> </Button>
                deleteButton = <Text></Text>
            }
        }

        if (loading) {
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
                        <Title style={{alignSelf: 'center', color: '#6CF9C8'}}>{itemId.name}</Title>
                        <Button transparent onPress={() => navigator.push({id: 'searchItem'})}>
                            <Icon name="ios-search"/>
                        </Button>
                        {actionButton}
                    </Header>

                    <Content>

                        <Card style={{ flex: 0, backgroundColor: '#1E1E1E', borderWidth: 0 }}>
                            <CardItem>
                                <H1 style={{color: 'white', paddingBottom: 10}}>{itemId.name}</H1>
                                <ListItem
                                    onPress={() => navigator.push({id: 'profileDetail', UserId: itemId.User.id})}
                                    style={{borderBottomWidth: 0}}>
                                    <Thumbnail
                                        source={(itemId.User) ? ((itemId.User.avatar) ? {uri: itemId.User.avatar} : require('../../../img/img-placeholder.png')) : require('../../../img/img-placeholder.png')}/>
                                    <Text
                                        note>
                                        {(itemId.User) ? itemId.User.username : ''}
                                    </Text>
                                </ListItem>
                            </CardItem>

                            <CardItem>
                                <Text style={styles.textColor}>
                                    {itemId.description}
                                </Text>
                            </CardItem>

                            <CardItem>
                                <Image
                                    style={{ resizeMode: 'cover', width: null }}
                                    source={{uri: itemId.photo}}/>
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
}

function bindAction(dispatch) {
    return {
        getItemsById: (token, ItemId) => dispatch(getItemsById(token, ItemId)),
        deleteItem: (id, token, navigator) => dispatch(deleteItem(id, token, navigator)),
    };
}

const mapStateToProps = state => ({
    itemId: state.itemId,
    loading: state.loading
});

export default connect(mapStateToProps, bindAction)(ItemDetail);
