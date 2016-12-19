
import React, { Component } from 'react';
import { Image, AsyncStorage, BackAndroid } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
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
    Card,
    CardItem,
    View,
    Spinner
} from 'native-base';

import {getCategories} from '../../actions/categories';
import { openDrawer } from '../../actions/drawer';
import myTheme from '../../themes/base-theme';
import styles from './styles';
import FooterNav from '../footer'


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tab1: true,
            tab2: false,
            tab3: false,
            messages: [],
            token: ''
        };
    }

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', () => {
            return false
        });
        this.props.getCategories(this.props.token)
    }


    render() {
        const {navigator, categories} = this.props
        if (categories.length === 0) {
            return (
                <Container style={styles.container}>
                    <Content>
                        <Spinner color='green' />
                    </Content>
                </Container>
            );
        }
        else {
            return (
                <Container theme={myTheme} style={styles.container}>

                    <Header>
                        <Title style={{alignSelf: 'center', color: '#6CF9C8'}}>B R T R</Title>
                        <Button transparent onPress={() => this.props.navigator.push({id: 'searchItem'})}>
                            <Icon name="ios-search"/>
                        </Button>
                        <Button transparent onPress={() => this.props.navigator.push({id: 'listMessage'})}>
                            <Icon name="ios-mail"/>
                        </Button>
                    </Header>

                    <Content>

                        <Card
                            style={{ flex: 0, backgroundColor: 'black', borderWidth: 0 }}>

                            <Grid>
                                <Col>
                                    <CardItem
                                        style={{borderBottomWidth: 0}}
                                        onPress={() => this.props.navigator.push({id: 'listItemCategory', CategoryId: (categories[0]) ? categories[0].id : '', CategoryName: (categories[0]) ? categories[0].name : ''})}>
                                        <Image
                                            style={{
                                    resizeMode: 'cover',
                                    width: null,
                                    opacity: 0.6
                                }}
                                            source={require('../../../img/category/automotive.jpg')}>
                                            <View style={{paddingLeft: 15, paddingTop: 10}}>
                                                <Text
                                                    style={styles.text}>{(categories[0]) ? categories[0].name : ''}</Text>
                                            </View>
                                        </Image>
                                    </CardItem>
                                </Col>
                                <Col>
                                    <CardItem
                                        style={{borderBottomWidth: 0}}
                                        onPress={() => this.props.navigator.push({id: 'listItemCategory', CategoryId: (categories[1]) ? categories[1].id : '', CategoryName: (categories[1]) ? categories[1].name : ''})}>
                                        <Image
                                            style={{
                                    resizeMode: 'cover',
                                    width: null,
                                    opacity: 0.6
                                }}
                                            source={require('../../../img/category/books.jpg')}>
                                            <View style={{paddingLeft: 15, paddingTop: 10}}>
                                                <Text
                                                    style={styles.text}>{(categories[1]) ? categories[1].name : ''}</Text>
                                            </View>
                                        </Image>
                                    </CardItem>
                                </Col>
                            </Grid>

                            <Grid>
                                <Col>
                                    <CardItem
                                        style={{borderBottomWidth: 0}}
                                        onPress={() => this.props.navigator.push({id: 'listItemCategory', CategoryId: (categories[2]) ? categories[2].id : '', CategoryName: (categories[2]) ? categories[2].name : ''})}>
                                        <Image
                                            style={{
                                    resizeMode: 'cover',
                                    width: null,
                                    opacity: 0.6,
                                }}
                                            source={require('../../../img/category/cloth.jpg')}>
                                            <View style={{paddingLeft: 15, paddingTop: 10}}>
                                                <Text
                                                    style={styles.text}>{(categories[2]) ? categories[2].name : ''}</Text>
                                            </View>
                                        </Image>
                                    </CardItem>
                                </Col>
                            </Grid>

                            <Grid>
                                <Col>
                                    <CardItem
                                        style={{borderBottomWidth: 0}}
                                        onPress={() => {
                                        this.setState({loading: true})
                                        this.props.navigator.push({id: 'listItemCategory', CategoryId: (categories[3]) ? categories[3].id : '', CategoryName: (categories[3]) ? categories[3].name : ''})
                                    }}>
                                        <Image
                                            style={{
                                    resizeMode: 'cover',
                                    width: null,
                                    opacity: 0.6
                                }}
                                            source={require('../../../img/category/electronic.jpg')}>
                                            <View style={{paddingLeft: 15, paddingTop: 10}}>
                                                <Text
                                                    style={styles.text}>{(categories[3]) ? categories[3].name : ''}</Text>
                                            </View>
                                        </Image>
                                    </CardItem>
                                </Col>
                                <Col>
                                    <CardItem
                                        style={{borderBottomWidth: 0}}
                                        onPress={() => this.props.navigator.push({id: 'listItemCategory', CategoryId: (categories[4]) ? categories[4].id : '', CategoryName: (categories[4]) ? categories[4].name : ''})}>
                                        <Image
                                            style={{
                                    resizeMode: 'cover',
                                    width: null,
                                    opacity: 0.6
                                }}
                                            source={require('../../../img/category/home-tools.jpg')}>
                                            <View style={{paddingLeft: 15, paddingTop: 10}}>
                                                <Text
                                                    style={styles.text}>{(categories[4]) ? categories[4].name : ''}</Text>
                                            </View>
                                        </Image>
                                    </CardItem>
                                </Col>
                            </Grid>

                            <Grid>
                                <Col>
                                    <CardItem
                                        style={{borderBottomWidth: 0}}
                                        onPress={() => this.props.navigator.push({id: 'listItemCategory', CategoryId: (categories[6]) ? categories[6].id : '', CategoryName: (categories[6]) ? categories[6].name : ''})}>
                                        <Image
                                            style={{
                                    resizeMode: 'cover',
                                    width: null,
                                    opacity: 0.6
                                }}
                                            source={require('../../../img/category/sport.jpg')}>
                                            <View style={{paddingLeft: 15, paddingTop: 10}}>
                                                <Text
                                                    style={styles.text}>{(categories[6]) ? categories[6].name : ''}</Text>
                                            </View>
                                        </Image>
                                    </CardItem>
                                </Col>
                            </Grid>

                            <Grid>
                                <Col>
                                    <CardItem
                                        style={{borderBottomWidth: 0}}
                                        onPress={() => this.props.navigator.push({id: 'listItemCategory', CategoryId: (categories[7]) ? categories[7].id : '', CategoryName: (categories[7]) ? categories[7].name : ''})}>
                                        <Image
                                            style={{
                                    resizeMode: 'cover',
                                    width: null,
                                    opacity: 0.6
                                }}
                                            source={require('../../../img/category/toys.jpg')}>
                                            <View style={{paddingLeft: 15, paddingTop: 10}}>
                                                <Text
                                                    style={styles.text}>{(categories[7]) ? categories[7].name : ''}</Text>
                                            </View>
                                        </Image>
                                    </CardItem>
                                </Col>
                                <Col>
                                    <CardItem
                                        style={{borderBottomWidth: 0}}
                                        onPress={() => this.props.navigator.push({id: 'listItemCategory', CategoryId: (categories[5]) ? categories[5].id : '', CategoryName: (categories[5]) ? categories[5].name : ''})}>
                                        <Image
                                            style={{
                                    resizeMode: 'cover',
                                    width: null,
                                    opacity: 0.6
                                }}
                                            source={require('../../../img/category/others.jpg')}>
                                            <View style={{paddingLeft: 15, paddingTop: 10}}>
                                                <Text
                                                    style={styles.text}>{(categories[5]) ? categories[5].name : ''}</Text>
                                            </View>
                                        </Image>
                                    </CardItem>
                                </Col>
                            </Grid>

                        </Card>
                    </Content>

                    <Footer>
                        <FooterNav navigator={navigator} tab1={true} tab2={false} tab3={false}/>
                    </Footer>
                </Container>
            );
        }
    }
}

function bindAction(dispatch) {
    return {
        openDrawer: () => dispatch(openDrawer()),
        getCategories: (token) => dispatch(getCategories(token)),
    };
}

const mapStateToProps = state => ({
    categories: state.categories,
    loading: state.loading
});

export default connect(mapStateToProps, bindAction)(Home);
