
import React, { Component } from 'react';
import { BackAndroid, Image, AsyncStorage, Platform, Alert } from 'react-native';
import { Col, Grid } from 'react-native-easy-grid';
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
    Input,
    InputGroup,
    Picker,
    Spinner,
} from 'native-base';

const Item = Picker.Item;

import myTheme from '../../themes/base-theme';
import styles from './styles';
import ArizTheme from '../../themes/additemtheme'
import {addItem} from '../../actions/items';
import {updateItem} from '../../actions/items';
import {getItemsById} from '../../actions/itemId';
import uploader from '../../helper/uploader'
import {getCategories} from '../../actions/categories';


import decode from 'jwt-decode'

let ItemIdFrom = 0

var ImagePicker = require('react-native-image-picker');

// More info on all the options is below in the README...just some common use cases shown here
var options = {
    title: 'Select Avatar',
    customButtons: [
        {name: 'fb', title: 'Choose Photo from Facebook'},
    ],
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

class AddItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tab1: false,
            tab2: true,
            tab3: false,
            dataUser: {},
            messages: [],
            avatarSource: (this.props.route.ItemId) ? this.props.itemId.photo : '',
            token: '',
            name: (this.props.route.ItemId) ? this.props.itemId.name : '',
            description: (this.props.route.ItemId) ? this.props.itemId.description : '',
            dimension: (this.props.route.ItemId) ? this.props.itemId.dimension : '',
            material: (this.props.route.ItemId) ? this.props.itemId.material : '',
            photo: '',
            color: (this.props.route.ItemId) ? this.props.itemId.color : '',
            category: (this.props.route.ItemId) ? this.props.itemId.CategoryId : 'key0',
            results: {
                items: []
            }
        };
    }

    onValueChange (value: string) {
        console.log("valueeeeee: ", value);
        this.setState({
            category : value
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
                this.setState({token: value});
                this.setState({dataUser: decode(value)});
                this.props.getCategories(value)
                console.log("ini props route: ", typeof this.props.route.ItemId)
                if (this.props.route.ItemId) {
                    console.log("masuk======================")
                    this.props.getItemsById(value, this.props.route.ItemId)
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

    uploadImage() {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                // You can display the image using either data...
                // const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

                // or a reference to the platform specific asset location
                // if (Platform.OS === 'ios') {
                //     const source = {uri: response.uri.replace('file://', ''), isStatic: true};
                // } else {
                //     const source = {uri: response.uri, isStatic: true};
                // }
                const source = {uri: response.uri, isStatic: true};

                uploader(source, (res)=> {
                    console.log("ini respon awS3: ", res)
                    this.setState({
                        avatarSource: res.postResponse.location
                    });
                })

            }
        });
    }


    onAddItem(e) {
        console.log("cklick add item")
        e.preventDefault()
        let name = this.state.name.trim()
        let description = this.state.description.trim()
        let dimension = this.state.dimension.trim()
        let material = this.state.material.trim()
        let photo = this.state.avatarSource
        let category = this.state.category
        let color = this.state.color.trim()


        if (!name || !category || !description || !dimension || !material || !color || !photo) {
            console.log("kosong")
            Alert.alert(
                'Add Item Fail',
                'All fields should be filled',
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ]
            )
        }
        else {
            this.props.addItem(category, name, description, photo, material, dimension, color, this.state.token, this.props.navigator)
            this.setState({
                name: '',
                description: '',
                dimension: '',
                material: '',
                photo: '',
                color: '',
                avatarSource: '',
                category: '',
            })
        }
    }

    onUpdateItem(e) {
        console.log("cklick update item")
        e.preventDefault()
        let name = this.state.name.trim()
        let description = this.state.description.trim()
        let dimension = this.state.dimension.trim()
        let material = this.state.material.trim()
        let photo = this.state.avatarSource
        let category = this.state.category
        let color = this.state.color.trim()

        console.log('CategoryId : ', category);
        console.log('this.state.category : ', this.state.category);
        console.log('name : ', name);
        console.log('description : ', description);
        console.log('photo : ', photo);
        console.log('material : ', material);
        console.log('dimension : ', dimension);
        console.log('color : ', color);


        if (!name || category==='key0' || !description || !dimension || !material || !color || !photo) {
            console.log("kosong")
            Alert.alert(
                'Update Item Fail',
                'All fields should be filled',
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ]
            )
        }
        else {
            this.props.updateItem(this.props.route.ItemId, category, name, description, photo, material, dimension, color, this.state.token, this.props.navigator)
            this.setState({
                name: '',
                description: '',
                dimension: '',
                material: '',
                photo: '',
                size: '',
                color: '',
                avatarSource: '',
                category: '',
            })
        }
    }

    render() {
        const {navigator, route, itemId, categories, loading} = this.props
        console.log("ini props di add item: ", this.props)
        console.log("ini item di add item: ", itemId)
        console.log("ini image di add item: ", this.state.avatarSource)

        let title
        let actionButton

        if (route.ItemId) {
            title = <Title style={{alignSelf: 'center', color: '#6CF9C8'}}>Edit Item</Title>
            actionButton =
                <Button
                    onPress={this.onUpdateItem.bind(this)}
                    bordered
                    style={{ alignSelf: 'center', marginTop: -10, marginBottom: 30 , width: 280, borderRadius: 0, borderColor:'#2effd0', height: 50, paddingTop: 0}}>
                    <Text style={{color: '#FFFFFF'}}>
                        Update Item
                    </Text>
                </Button>
        }
        else {
            title = <Title style={{alignSelf: 'center', color:'#6CF9C8'}}>New Item</Title>
            actionButton =
                <Button
                    onPress={this.onAddItem.bind(this)}
                    bordered
                    style={{ alignSelf: 'center', marginTop: -10, marginBottom: 30 , width: 280, borderRadius: 0, borderColor:'#2effd0', height: 50, paddingTop: 0}}>
                    <Text style={{color: '#FFFFFF'}}>
                        Add Item
                    </Text>
                </Button>
        }

        return (
            <Container theme={myTheme} style={styles.container}>

                <Header>
                    {title}
                    <Button transparent onPress={() => this.props.navigator.push({id: 'searchItem'})}>
                        <Icon name="ios-search" />
                    </Button>
                    <Button transparent onPress={() => this.props.navigator.push({id: 'listMessage'})}>
                        <Icon name="ios-mail" />
                    </Button>
                </Header>

                <Content>

                    <Card style={{ flex: 0, backgroundColor: '#1E1E1E', borderWidth: 0 }}>
                        <Grid>
                            <Col>
                                <CardItem
                                    style={{borderBottomWidth: 0, marginTop: 30, marginBottom: 30}}
                                    onPress={this.uploadImage.bind(this)}
                                >
                                    <Image
                                        style={{resizeMode: 'cover',  alignSelf: 'center', width: 200, height: 200 }}
                                        source={(this.state.avatarSource) ? {uri: this.state.avatarSource} : require('../../../img/placeholder.png')}
                                    />
                                </CardItem>

                            </Col>
                        </Grid>

                        <Grid style={{marginTop: 170}}>
                            <Col>

                                <Picker
                                    style={{marginLeft: 40, marginRight: 40, color: '#8B8F95', borderColor: '#2effd0', borderRadius: 1}}
                                    iosHeader="Select one"
                                    mode="dropdown"
                                    selectedValue={this.state.category}
                                    onValueChange={this.onValueChange.bind(this)}
                                    theme={myTheme}
                                >
                                    <Item label="Select Category" value={this.state.category || 'key0'} />
                                    <Item label={(categories[0]) ? categories[0].name : ''} value={(categories[0]) ? categories[0].id : ''} />
                                    <Item label={(categories[1]) ? categories[1].name : ''} value={(categories[1]) ? categories[1].id : ''} />
                                    <Item label={(categories[2]) ? categories[2].name : ''} value={(categories[2]) ? categories[2].id : ''} />
                                    <Item label={(categories[3]) ? categories[3].name : ''} value={(categories[3]) ? categories[3].id : ''} />
                                    <Item label={(categories[4]) ? categories[4].name : ''} value={(categories[4]) ? categories[4].id : ''} />
                                    <Item label={(categories[6]) ? categories[6].name : ''} value={(categories[6]) ? categories[6].id : ''} />
                                    <Item label={(categories[7]) ? categories[7].name : ''} value={(categories[7]) ? categories[7].id : ''} />
                                    <Item label={(categories[5]) ? categories[5].name : ''} value={(categories[5]) ? categories[5].id : ''} />
                                </Picker>
                            </Col>
                        </Grid>

                        <Grid style={{marginTop: -20}}>
                            <Col>
                                <InputGroup
                                    style={{marginLeft: 40, marginRight: 40}}
                                    borderType='underline'
                                    theme={ArizTheme}
                                >
                                    <Input
                                        onChangeText={(name) => this.setState({name: name})}
                                        value={this.state.name}
                                        style={{color: '#FFFFFF'}}
                                        placeholder="Item Title"
                                    />
                                </InputGroup>
                            </Col>
                        </Grid>

                        <Grid style={{marginTop: -30}}>
                            <Col>
                                <InputGroup
                                    style={{marginLeft: 40, marginRight: 40}}
                                    theme={ArizTheme} borderType='underline'>
                                    <Input
                                        onChangeText={(description) => this.setState({description: description})}
                                        value={this.state.description}
                                        style={{color: '#FFFFFF'}}
                                        placeholder="Description"/>
                                </InputGroup>
                            </Col>
                        </Grid>

                        <Grid style={{marginTop: -30}}>
                            <Col>
                                <InputGroup
                                    style={{marginLeft: 40, marginRight: 40}}
                                    theme={ArizTheme} borderType='underline'>
                                    <Input
                                        onChangeText={(material) => this.setState({material: material})}
                                        value={this.state.material}
                                        style={{color: '#FFFFFF'}}
                                        placeholder="Material"/>
                                </InputGroup>
                            </Col>
                        </Grid>

                        <Grid style={{marginTop: -30}}>
                            <Col>
                                <InputGroup
                                    theme={ArizTheme} style={{marginLeft: 40, marginRight: 40}} borderType='underline'>
                                    <Input
                                        onChangeText={(dimension) => this.setState({dimension: dimension})}
                                        value={this.state.dimension}
                                        style={{color: '#FFFFFF'}}
                                        placeholder="Dimension/size"/>

                                </InputGroup>
                            </Col>
                        </Grid>

                        <Grid style={{marginTop: -30}}>
                            <Col>
                                <InputGroup
                                    style={{marginLeft: 40, marginRight: 40}}
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
                            active={this.state.tab1} onPress={() => navigator.replace({id: 'home'})}>
                            <Icon name='md-home' />
                        </Button>
                        <Button active={this.state.tab2} onPress={() => navigator.replace({id: 'addItem'})} >
                            <Icon name='md-add-circle' />
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
        addItem: (CategoryId, name, description, photo, material, dimension, color, token, navigator) => dispatch(addItem(CategoryId, name, description, photo, material, dimension, color, token, navigator)),
        updateItem: (id, CategoryId, name, description, photo, material, dimension, color, token, navigator) => dispatch(updateItem(id, CategoryId, name, description, photo, material, dimension, color, token, navigator)),
        getItemsById: (token, ItemId) => dispatch(getItemsById(token, ItemId)),
        getCategories: (token) => dispatch(getCategories(token)),
    };
}

const mapStateToProps = state => ({
    itemId: state.itemId,
    categories: state.categories,
    loading: state.loading
});

export default connect(mapStateToProps, bindAction)(AddItem);
