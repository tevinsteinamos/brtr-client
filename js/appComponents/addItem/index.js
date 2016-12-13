
import React, { Component } from 'react';
import { Image, AsyncStorage } from 'react-native';
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
    View,
    List,
    ListItem,
    Input,
    InputGroup,
    Picker,
    Item
} from 'native-base';

import navigateTo from '../../actions/sideBarNav';
import { openDrawer } from '../../actions/drawer';
import myTheme from '../../themes/base-theme';
import styles from './styles';
import ArizTheme from '../../themes/additemtheme'
import FooterTheme from '../../themes/prof-empty-theme'
const star_button = require('../../../img/star_button.png');

import {addItem} from '../../actions/items';
import {updateItem} from '../../actions/items';
import {getItemsById} from '../../actions/itemId';
import DataCategories from './DataCategories'


import decode from 'jwt-decode'

const {
    replaceAt,
} = actions;

let ItemIdFrom = 0

class AddItem extends Component {

    static propTypes = {
        openDrawer: React.PropTypes.func,
        navigateTo: React.PropTypes.func,
        replaceAt: React.PropTypes.func,
        navigation: React.PropTypes.shape({
            key: React.PropTypes.string,
        }),
    }

    replaceAt(route) {
        this.props.replaceAt('AddItem', { key: route }, this.props.navigation.key);
    }

    constructor(props) {
        super(props);
        this.state = {
            tab1: false,
            tab2: true,
            tab3: false,
            dataUser: {},
            messages: [],
            token: '',
            name: '' || this.props.itemId.name,
            description: '' || this.props.itemId.description,
            dimension: '' || this.props.itemId.dimension,
            material: '' || this.props.itemId.material,
            photo: '' || this.props.itemId.photo,
            color: '' || this.props.itemId.color,
            results: {
                items: []
            }
        };
    }

    onValueChange (value: string) {
        this.setState({
            selected1 : value
        });
    }


    navigateTo(route) {
        this.props.navigateTo(route, 'addItem');
    }


    componentDidMount() {
        this._loadInitialState().done();
    }


    _loadInitialState = async () => {
        try {
            var value = await AsyncStorage.getItem("myKey");
            console.log("value: ", value)
            if (value !== null){
                this.setState({token: value});
                this.setState({dataUser: decode(value)});
                ItemIdFrom = this.props.navigation.routes[this.props.navigation.routes.length - 1].data
                console.log("item id yg dikirim: ", ItemIdFrom)
                if (ItemIdFrom) {
                    this.props.getItemsById(value, ItemIdFrom)
                }
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


    onAddItem(e) {
        console.log("cklick add item")
        e.preventDefault()
        let name = this.state.name.trim()
        let description = this.state.description.trim()
        let dimension = this.state.dimension.trim()
        let material = this.state.material.trim()
        let photo = this.state.photo.trim()
        let color = this.state.color.trim()
        if (!name || !description || !dimension || !material || !color) {
            console.log("kosong")
            return
        }

        this.props.addItem(758, name, description, photo, material, dimension, color, this.state.token)
        this.setState({
            name: '',
            description: '',
            dimension: '',
            material: '',
            photo: '',
            color: '',
        })
    }

    onUpdateItem(e) {
        console.log("cklick update item")
        e.preventDefault()
        let name = this.state.name.trim()
        let description = this.state.description.trim()
        let dimension = this.state.dimension.trim()
        let material = this.state.material.trim()
        let photo = this.state.photo.trim()
        let color = this.state.color.trim()
        if (!name || !description || !dimension || !material || !color) {
            console.log("kosong")
            return
        }

        this.props.updateItem(ItemIdFrom, 758, name, description, photo, material, dimension, color, this.state.token)
        this.setState({
            name: '',
            description: '',
            dimension: '',
            material: '',
            photo: '',
            size: '',
            color: '',
        })
    }

    render() {
        const {itemId} = this.props
        console.log("ini props di add item: ", this.props)
        console.log("ini item di add item: ", itemId)

        let title
        let actionButton

        if (ItemIdFrom) {
            title = <Title style={{alignSelf: 'center'}}>Edit Item {(itemId) ? itemId.name : ''}</Title>
            actionButton =
                <Button
                    onPress={this.onUpdateItem.bind(this)}
                    bordered
                    style={{ alignSelf: 'center', marginTop: 40, marginBottom: 20 , width: 220, borderRadius: 0, borderColor:'#2effd0', height: 50}}>
                    <Text style={{color: '#FFFFFF'}}>
                        Update Item
                    </Text>
                </Button>
        }
        else {
            title = <Title style={{alignSelf: 'center'}}>Add New Item</Title>
            actionButton =
                <Button
                    onPress={this.onAddItem.bind(this)}
                    bordered
                    style={{ alignSelf: 'center', marginTop: 40, marginBottom: 20 , width: 220, borderRadius: 0, borderColor:'#2effd0', height: 50}}>
                    <Text style={{color: '#FFFFFF'}}>
                        Save Item
                    </Text>
                </Button>
        }

        return (
            <Container theme={myTheme} style={styles.container}>

                <Header>
                    {title}
                    <Button transparent onPress={() => this.navigateTo('ListItem')}>
                        <Icon name="ios-search" />
                    </Button>
                    <Button transparent onPress={() => this.navigateTo('listAvatar')}>
                        <Icon name="ios-mail" />
                    </Button>
                </Header>

                <Content>

                    <Card style={{ flex: 0, backgroundColor: '#444444', borderWidth: 0 }}>
                      <Grid>
                            <Col>
                              <Icon barterColor name="ios-add-circle-outline" onPress={()=> alert('upload an image')}
                                     style={{ fontSize: 150, alignSelf: 'center', color:'#2effd0' }}
                                     />
                            </Col>
                      </Grid>

                        <Grid style={{marginTop: 90}}>
                            <Col>
                                <InputGroup
                                    style={{marginLeft: 30, marginRight: 30}}
                                    theme={ArizTheme}
                                    borderType='underline'
                                >
                                    <Input
                                        onChangeText={(name) => this.setState({name: name})}
                                        value={this.state.name}
                                        style={{color: '#FFFFFF'}}
                                        placeholder="Item Title"/>
                                </InputGroup>
                            </Col>
                        </Grid>

                        <Grid>
                            <Col>
                                <InputGroup
                                    style={{marginLeft: 30, marginRight: 30}}
                                    theme={ArizTheme} borderType='underline'>
                                    <Input
                                        onChangeText={(description) => this.setState({description: description})}
                                        value={this.state.description}
                                        style={{color: '#FFFFFF'}}
                                        placeholder="Description"/>
                                </InputGroup>
                            </Col>
                        </Grid>

                        <Grid >
                            <Col>
                                <Picker
                                    style={{marginLeft: 30, marginRight: 15, color: 'white'}}
                                    iosHeader="Select one"
                                    mode="dropdown"
                                    selectedValue={this.state.selected1}
                                    onValueChange={this.onValueChange.bind(this)} >
                                    <Item label="Select Category" value="key0" />
                                    <Item label="Female" value="key1" />
                                    <Item label="Other" value="key2" />
                                </Picker>
                            </Col>
                            <Col>
                                <InputGroup
                                    style={{marginLeft: 15, marginRight: 30}}
                                    theme={ArizTheme} borderType='underline'>
                                    <Input
                                        onChangeText={(material) => this.setState({material: material})}
                                        value={this.state.material}
                                        style={{color: '#FFFFFF'}}
                                        placeholder="Material"/>
                                </InputGroup>
                            </Col>

                        </Grid>

                        <Grid style={{marginTop: 40}}>
                            <Col>
                                <InputGroup
                                    style={{marginLeft: 30, marginRight: 15}}
                                    theme={ArizTheme} borderType='underline'>
                                    <Input
                                        onChangeText={(dimension) => this.setState({dimension: dimension})}
                                        value={this.state.dimension}
                                        style={{color: '#FFFFFF'}}
                                        placeholder="Dimension"/>
                                </InputGroup>
                            </Col>
                            <Col>
                                <InputGroup
                                    style={{marginLeft: 15, marginRight: 30}}
                                    theme={ArizTheme} borderType='underline'>
                                    <Input
                                        onChangeText={(color) => this.setState({color: color})}
                                        value={this.state.color}
                                        style={{color: '#FFFFFF'}}
                                        placeholder="Color"/>
                                </InputGroup>
                            </Col>
                        </Grid>

                        {actionButton}



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
        addItem: (CategoryId, name, description, photo, material, dimension, color, token) => dispatch(addItem(CategoryId, name, description, photo, material, dimension, color, token)),
        updateItem: (id, CategoryId, name, description, photo, material, dimension, color, token) => dispatch(updateItem(id, CategoryId, name, description, photo, material, dimension, color, token)),
        getItemsById: (token, ItemId) => dispatch(getItemsById(token, ItemId)),
    };
}

const mapStateToProps = state => ({
    navigation: state.cardNavigation,
    itemId: state.itemId
});

export default connect(mapStateToProps, bindAction)(AddItem);
