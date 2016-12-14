
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
    Item,
    Textarea
} from 'native-base';

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
        this.setState({
            itemBarter : value
        });
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
                let item = this.props.navigation.routes[this.props.navigation.routes.length - 1].data
                this.setState({item: item})
                this.props.getItemsByUserId(value)
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


    onCreateMessage(e) {
        console.log("cklick add item")
        e.preventDefault()
        let title = this.state.title.trim()
        let body = this.state.body.trim()
        let item = this.state.item
        let itemBarter = this.state.itemBarter
        let token = this.state.token
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

    // let ItemNodes = [<Item label="test1" value="key0" />, <Item label="test2" value="key1" />]
    //     this.props.items.map(function (item) {
    //     ItemNodes.push(<Item label={item.name} value={item.id} />)
    // })
    return (
        <Picker
            style={{marginLeft: 30, marginRight: 30, color: 'white'}}
            iosHeader="Select one"
            mode="dropdown"
            selectedValue={this.state.itemBarter}
            onValueChange={this.onValueChange.bind(this)} >
            {
                this.props.items.map(function (item) {
                 return (<Item label={item.name} value={item.id} />)
            })
            }
        </Picker>
    )
}


    render() {
        const {navigator, items} = this.props
        console.log("ini props di create message: ", this.props)
        console.log("ini item di create message: ", items)
        console.log("ini kiriman item id: ", this.state.item)
        console.log("ini item barder: ", this.state.itemBarter)

        return (
            <Container theme={myTheme} style={styles.container}>

                <Header>
                    Create Message
                    <Button transparent onPress={() => this.navigateTo('ListItem')}>
                        <Icon name="ios-search" />
                    </Button>
                    <Button transparent onPress={() => this.navigateTo('listMessage')}>
                        <Icon name="ios-mail" />
                    </Button>
                </Header>

                <Content>

                    <Card style={{ flex: 0, backgroundColor: '#444444', borderWidth: 0 }}>
                      <Grid>
                            <Col>
                                {this.selectItem()}
                            </Col>
                      </Grid>

                        <Grid>
                            <Col>
                                <InputGroup
                                    style={{marginLeft: 30, marginRight: 30}}
                                    theme={ArizTheme}
                                    borderType='underline'
                                >
                                    <Input
                                        onChangeText={(title) => this.setState({title: title})}
                                        value={this.state.title}
                                        style={{color: '#FFFFFF'}}
                                        placeholder="Message Title"/>
                                </InputGroup>
                            </Col>
                        </Grid>

                        <Grid>
                            <Col>
                                <List>
                                    <ListItem
                                        style={{marginLeft: 30, marginRight: 30}}
                                        theme={ArizTheme}
                                        borderType='underline'
                                    >
                                        <Textarea
                                            onChangeText={(body) => this.setState({body: body})}
                                            value={this.state.body}
                                            style={{height: 100, color: '#FFFFFF'}}
                                            placeholder="Message Body"
                                        />
                                    </ListItem>
                                </List>
                            </Col>
                        </Grid>



                        <Button
                            onPress={this.onCreateMessage.bind(this)}
                            bordered
                            style={{ alignSelf: 'center', marginTop: 40, marginBottom: 20 , width: 220, borderRadius: 0, borderColor:'#2effd0', height: 50}}>
                            <Text style={{color: '#FFFFFF'}}>
                                Create Message
                            </Text>
                        </Button>



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
        updateItem: (id, CategoryId, name, description, photo, material, dimension, color, token) => dispatch(updateItem(id, CategoryId, name, description, photo, material, dimension, color, token)),
        getItemsByUserId: (token) => dispatch(getItemsByUserId(token)),
        addMessage: (title, body, item, itemBarter, token) => dispatch(addMessage(title, body, item, itemBarter, token)),
    };
}

const mapStateToProps = state => ({
    items: state.items
});

export default connect(mapStateToProps, bindAction)(CreateMessage);
