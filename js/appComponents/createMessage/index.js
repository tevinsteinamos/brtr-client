
import React, { Component } from 'react';
import { Image, AsyncStorage, BackAndroid } from 'react-native';
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
    Textarea
} from 'native-base';

const Item = Picker.Item;

import { addMessage } from '../../actions/createMessageItem';
import myTheme from '../../themes/base-theme';
import styles from './styles';
import ArizTheme from '../../themes/additemtheme'
import FooterTheme from '../../themes/prof-empty-theme'
const star_button = require('../../../img/star_button.png');


import {getItemsByUserId} from '../../actions/items';
import decode from 'jwt-decode'



class CreateMessage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            tab1: false,
            tab2: false,
            tab3: false,
            dataUser: {},
            messages: [],
            token: '',
            title: '',
            body: '' ,
            item: '',
            itemBarter: 'key0',
            results: {
                items: []
            }
        };
    }

    onValueChange (value) {
      console.log('onValueChange : ', value);
        this.setState({
            itemBarter : value
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
            console.log("value: ", value)
            if (value !== null){
                this.setState({token: value})
                this.props.getItemsByUserId(value)
                this._appendMessage('Recovered selection from disk: ' + value);
            } else {
                console.log("else")
                this._appendMessage('Initialized with no selection on disk.');
            }
        } catch (error) {
            console.log("catch : ", error)
            this._appendMessage('AsyncStorage error: ' + error.message);
        }
    }

    _appendMessage = (message) => {
        this.setState({messages: this.state.messages.concat(message)});
    };


    onCreateMessage() {
        let title = this.state.title.trim()
        let body = this.state.body.trim()
        let item = this.props.items[0].id
        let itemBarter = this.state.itemBarter
        let token = this.state.token
        console.log('nav view : ', this.props.navigator);
        if (!title || !body || !item || !itemBarter) {
            console.log("kosong")
            return
        }

        this.props.addMessage(title, body, item, itemBarter, token, this.props.navigator)
        this.setState({
            title: '',
            body: '',
        })
    }


    selectItem() {
        console.log('selectItem / picker : ', this.state.itemBarter);
        if (this.props.items.length !== 0) {
            if (this.props.items[0].id !== 'key0')
                this.props.items.unshift({id:'key0', name:'Tap to Select Item'})
        }
        return (
            <Picker
                style={{marginLeft: 30, marginRight: 30, color: 'white'}}
                iosHeader="Select one"
                mode="dropdown"
                selectedValue={this.state.itemBarter}
                onValueChange={this.onValueChange.bind(this)} >
                {
                    this.props.items.map(function (item) {
                        return (<Item key={item.id} label={item.name} value={item.id} />)
                    })
                }
            </Picker>
        )
}


    render() {
        const {navigator, items} = this.props
        console.log("ini props di create message: ", this.props)
        console.log("ini item di create message: ", items)
        console.log("ini item barder: ", this.state.itemBarter)
        console.log("cklick add item : ", this.props.items)

        return (
            <Container theme={myTheme} style={styles.container}>

                <Header>
                    <Button transparent onPress={() => this.navigateTo('ListItem')}>
                        <Icon name="ios-search" />
                    </Button>
                    <Title style={{alignSelf: 'center'}}>Create Message</Title>
                    <Button transparent onPress={() => this.navigateTo('listMessage')}>
                        <Icon name="ios-mail" />
                    </Button>
                </Header>

                <Content>
                      <List>
                        <Grid style={{marginTop: 20}}>
                            <Col>
                                <InputGroup
                                    style={{marginLeft: 30, marginRight: 30}}
                                    theme={ArizTheme}
                                    borderType='underline'>
                                    <Input
                                        onChangeText={(title) => this.setState({title: title})}
                                        value={this.state.title}
                                        style={{color: '#FFFFFF'}}
                                        placeholder='Title'/>
                                </InputGroup>
                            </Col>
                        </Grid>

                        <Grid  style={{marginTop: 20}}>
                            <Col>
                                <List>
                                    <ListItem
                                        style={{marginLeft: 30, marginRight: 30}}
                                        theme={ArizTheme}
                                        borderType='underline'>
                                        <Textarea
                                            onChangeText={(body) => this.setState({body: body})}
                                            value={this.state.body}
                                            style={{paddingTop: 5, paddingBottom:5, color: '#FFFFFF'}}
                                            placeholder="Message"/>
                                    </ListItem>
                                </List>
                            </Col>
                        </Grid>

                        <Grid style={{marginTop: 40}}>
                              <Col>
                                  {this.selectItem()}
                              </Col>

                        </Grid>




                        <Button
                            onPress={this.onCreateMessage.bind(this)}
                            bordered
                            style={{ alignSelf: 'center', marginTop: 80, marginBottom: 20 , width: 220, borderRadius: 0, borderColor:'#2effd0', height: 50}}>
                            <Text style={{color: '#FFFFFF'}}>
                                Send Barter Request
                            </Text>
                        </Button>
                      </List>


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
        updateItem: (id, CategoryId, name, description, photo, material, dimension, color, token) => dispatch(updateItem(id, CategoryId, name, description, photo, material, dimension, color, token)),
        getItemsByUserId: (token) => dispatch(getItemsByUserId(token)),
        addMessage: (title, body, item, itemBarter, token, navigator) => dispatch(addMessage(title, body, item, itemBarter, token, navigator)),
    };
}

const mapStateToProps = state => ({
    items: state.items
});

export default connect(mapStateToProps, bindAction)(CreateMessage);
