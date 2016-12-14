
import React, { Component } from 'react';
import { Image, AsyncStorage } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { connect } from 'react-redux';
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

import {getCategories} from '../../actions/categories';
import { openDrawer } from '../../actions/drawer';
import myTheme from '../../themes/base-theme';
import styles from './styles';
const star_button = require('../../../img/star_button.png');


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tab1: true,
            tab2: false,
            tab3: false,
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

    componentWillMount() {
        this._loadInitialState().done();
    }

    _loadInitialState = async () => {
        try {
            var value = await AsyncStorage.getItem("myKey");
            if (value !== null){
                this.props.getCategories(value)
                this._appendMessage('Recovered selection from disk: ' + value);
            } else {
                console.log("else")
                this._appendMessage('Initialized with no selection on disk.');
            }
        } catch (error) {
            console.log("catch: ", error)
            this._appendMessage('AsyncStorage error: ' + error.message);
        }
    }

    _appendMessage = (message) => {
        this.setState({messages: this.state.messages.concat(message)});
    };

    render() {
        const {navigator, categories} = this.props
        console.log("categori di home: ", categories)
        // console.log("categori 0: ", categories[0].name)
        return (
            <Container theme={myTheme} style={styles.container}>

                <Header>
                    <Title style={{alignSelf: 'center'}}>BRTR</Title>
                    <Button transparent onPress={() => this.props.navigator.push({id: 'searchItem'})}>
                        <Icon name="ios-search" />
                    </Button>
                    <Button transparent onPress={() => this.props.navigator.push({id: 'listMessage'})}>
                        <Icon name="ios-mail" />
                    </Button>
                </Header>

                <Content>

                    <Card
                        style={{ flex: 0, backgroundColor: 'black', borderWidth: 0 }}>

                        <Grid>
                            <Col>
                                <CardItem
                                    style={{borderBottomWidth: 0}}
                                    onPress={() => this.props.navigator.push({id: 'listItemCategory', CategoryId: (categories[0]) ? categories[0].id : ''})}>
                                    <Image
                                        style={{
                                    resizeMode: 'cover',
                                    width: null,
                                    opacity: 0.6
                                }}
                                        source={require('../../../img/category/automotive.jpg')}>
                                        <View style={{paddingLeft: 10}}>
                                            <H2 style={{color: 'white'}}>{(categories[0]) ? categories[0].name : ''}</H2>
                                        </View>
                                    </Image>
                                </CardItem>
                            </Col>
                            <Col>
                                <CardItem
                                    style={{borderBottomWidth: 0}}
                                    onPress={() => this.props.navigator.push({id: 'listItemCategory', CategoryId: (categories[1]) ? categories[1].id : ''})}>
                                    <Image
                                        style={{
                                    resizeMode: 'cover',
                                    width: null,
                                    opacity: 0.6
                                }}//
                                        source={require('../../../img/category/books.jpg')}>
                                        <View style={{paddingLeft: 10}}>
                                            <H2 style={{color: 'white'}}>{(categories[1]) ? categories[1].name : ''}</H2>
                                        </View>
                                    </Image>
                                </CardItem>
                            </Col>
                        </Grid>

                        <Grid>
                            <Col>
                                <CardItem
                                    style={{borderBottomWidth: 0}}
                                    onPress={() => this.props.navigator.push({id: 'listItemCategory', CategoryId: (categories[2]) ? categories[2].id : ''})}>
                                    <Image
                                        style={{
                                    resizeMode: 'cover',
                                    width: null,
                                    opacity: 0.6,
                                }}
                                        source={require('../../../img/category/cloth.jpg')}>
                                        <View style={{paddingLeft: 10}}>
                                            <H2 style={{color: 'white'}}>{(categories[2]) ? categories[2].name : ''}</H2>
                                        </View>
                                    </Image>
                                </CardItem>
                            </Col>
                        </Grid>

                        <Grid>
                            <Col>
                                <CardItem
                                    style={{borderBottomWidth: 0}}
                                    onPress={() => this.props.navigator.push({id: 'listItemCategory', CategoryId: (categories[3]) ? categories[3].id : ''})}>
                                    <Image
                                        style={{
                                    resizeMode: 'cover',
                                    width: null,
                                    opacity: 0.6
                                }}
                                        source={require('../../../img/category/electronic.jpg')}>
                                        <View style={{paddingLeft: 10}}>
                                            <H2 style={{color: 'white'}}>{(categories[3]) ? categories[3].name : ''}</H2>
                                        </View>
                                    </Image>
                                </CardItem>
                            </Col>
                            <Col>
                                <CardItem
                                    style={{borderBottomWidth: 0}}
                                    onPress={() => this.props.navigator.push({id: 'listItemCategory', CategoryId: (categories[4]) ? categories[4].id : ''})}>
                                    <Image
                                        style={{
                                    resizeMode: 'cover',
                                    width: null,
                                    opacity: 0.6
                                }}
                                        source={require('../../../img/category/home-tools.jpg')}>
                                        <View style={{paddingLeft: 10}}>
                                            <H2 style={{color: 'white'}}>{(categories[4]) ? categories[4].name : ''}</H2>
                                        </View>
                                    </Image>
                                </CardItem>
                            </Col>
                        </Grid>

                        <Grid>
                            <Col>
                                <CardItem
                                    style={{borderBottomWidth: 0}}
                                    onPress={() => this.props.navigator.push({id: 'listItemCategory', CategoryId: (categories[6]) ? categories[6].id : ''})}>
                                    <Image
                                        style={{
                                    resizeMode: 'cover',
                                    width: null,
                                    opacity: 0.6
                                }}
                                        source={require('../../../img/category/sport.jpg')}>
                                        <View style={{paddingLeft: 10}}>
                                            <H2 style={{color: 'white'}}>{(categories[6]) ? categories[6].name : ''}</H2>
                                        </View>
                                    </Image>
                                </CardItem>
                            </Col>
                        </Grid>

                        <Grid>
                            <Col>
                                <CardItem
                                    style={{borderBottomWidth: 0}}
                                    onPress={() => this.props.navigator.push({id: 'listItemCategory', CategoryId: (categories[7]) ? categories[7].id : ''})}>
                                    <Image
                                        style={{
                                    resizeMode: 'cover',
                                    width: null,
                                    opacity: 0.6
                                }}
                                        source={require('../../../img/category/toys.jpg')}>
                                        <View style={{paddingLeft: 10}}>
                                            <H2 style={{color: 'white'}}>{(categories[7]) ? categories[7].name : ''}</H2>
                                        </View>
                                    </Image>
                                </CardItem>
                            </Col>
                            <Col>
                                <CardItem
                                    style={{borderBottomWidth: 0}}
                                    onPress={() => this.props.navigator.push({id: 'listItemCategory', CategoryId: (categories[5]) ? categories[5].id : ''})}>
                                    <Image
                                        style={{
                                    resizeMode: 'cover',
                                    width: null,
                                    opacity: 0.6
                                }}
                                        source={require('../../../img/category/others.jpg')}>
                                        <View style={{paddingLeft: 10}}>
                                            <H2 style={{color: 'white'}}>{(categories[5]) ? categories[5].name : ''}</H2>
                                        </View>
                                    </Image>
                                </CardItem>
                            </Col>
                        </Grid>

                    </Card>
                </Content>

                <Footer>
                    <FooterTab>
                        <Button
                            active={this.state.tab1} onPress={() => navigator.replace({id: 'home'})}>
                            Feed
                        </Button>
                        <Button active={this.state.tab2} onPress={() => navigator.replace({id: 'addItem'})} >
                            Add Item
                        </Button>
                        <Button active={this.state.tab3} onPress={() => navigator.replace({id: 'profileDetail'})} >
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
        openDrawer: () => dispatch(openDrawer()),
        getCategories: (token) => dispatch(getCategories(token)),
    };
}

const mapStateToProps = state => ({
    navigation: state.cardNavigation,
    categories: state.categories
});

export default connect(mapStateToProps, bindAction)(Home);
