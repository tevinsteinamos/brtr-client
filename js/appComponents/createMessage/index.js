
import React, { Component } from 'react';
import { Image, AsyncStorage, BackAndroid, Alert } from 'react-native';
import { Col, Grid } from 'react-native-easy-grid';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
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
    List,
    ListItem,
    Input,
    InputGroup,
    Picker,
    Textarea
} from 'native-base';
import { addMessage } from '../../actions/createMessageItem';
import myTheme from '../../themes/base-theme';
import styles from './styles';
import ArizTheme from '../../themes/additemtheme'
import {getItemsByUserId} from '../../actions/items';
import decode from 'jwt-decode'
import FooterNav from '../footer'
const Item = Picker.Item;

class CreateMessage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            tab1: false,
            tab2: false,
            tab3: false,
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
        this.props.getItemsByUserId(this.props.token, this.props.dataUser.id)
    }


    onCreateMessage() {
        let title = this.state.title.trim()
        let body = this.state.body.trim()
        let item = this.props.route.ItemId
        let itemBarter = this.state.itemBarter
        let token = this.props.token

        if (!title || !body || !item) {
          Alert.alert(
              'Error Barter Item',
              'Title and Message Body should be filled',
              [
                  {text: 'OK'},
              ]
          )
        } else {
          if (itemBarter == 'key0' || item == 'key0') {
            Alert.alert(
                'Error Barter Item',
                'Please select Item to barter',
                [
                    {text: 'OK'},
                ]
            )
          } else {
            this.props.addMessage(title, body, item, itemBarter, token, this.props.navigator)
            this.setState({
                title: '',
                body: '',
            })
          }
        }
    }


    selectItem() {
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
        const {navigator, items, route} = this.props
        return (
            <Container theme={myTheme} style={styles.container}>

                <Header>
                    <Button transparent>
                        <Text style={{color:'black'}}>...</Text>
                    </Button>
                    <Title style={{alignSelf: 'center', color: '#6CF9C8'}}>CREATE MESSAGE</Title>
                    <Button transparent>
                        <Text style={{color:'black'}}>...</Text>
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
                                        style={{color: '#FFFFFF', fontSize: 17}}
                                        placeholder='Title'/>
                                </InputGroup>
                            </Col>
                        </Grid>

                        <Grid  style={{marginTop: 0}}>
                            <Col>
                                <List>
                                    <ListItem
                                        style={{marginLeft: 30, marginRight: 30}}
                                        theme={ArizTheme}
                                        borderType='underline'>
                                        <Textarea
                                            onChangeText={(body) => this.setState({body: body})}
                                            value={this.state.body}
                                            style={{paddingBottom:20, color: '#FFFFFF', fontSize: 17}}
                                            placeholder="Message"/>
                                    </ListItem>
                                </List>
                            </Col>
                        </Grid>

                        <Grid style={{marginTop: 20}}>
                              <Col>
                                  {this.selectItem()}
                              </Col>

                        </Grid>




                        <Button
                            onPress={this.onCreateMessage.bind(this)}
                            bordered
                            style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20 , width: 280, borderRadius: 0, borderColor:'#2effd0', height: 50, paddingTop: 0}}>
                            <Text style={{color: '#FFFFFF'}}>
                                SEND BARTER REQUEST
                            </Text>
                        </Button>
                      </List>


                </Content>

                <Footer>
                    <FooterNav navigator={navigator} tab1={true} tab2={false} tab3={false}/>
                </Footer>
            </Container>
        );
    }
}

function bindAction(dispatch) {
    return {
        updateItem: (id, CategoryId, name, description, photo, material, dimension, color, token) => dispatch(updateItem(id, CategoryId, name, description, photo, material, dimension, color, token)),
        getItemsByUserId: (token, id) => dispatch(getItemsByUserId(token, id)),
        addMessage: (title, body, item, itemBarter, token, navigator) => dispatch(addMessage(title, body, item, itemBarter, token, navigator)),
    };
}

const mapStateToProps = state => ({
    items: state.items
});

export default connect(mapStateToProps, bindAction)(CreateMessage);
