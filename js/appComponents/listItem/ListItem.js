
import React, { Component } from 'react';
import { Image, BackAndroid } from 'react-native';
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

import myTheme from '../../themes/base-theme';
import styles from './styles';

class ListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tab1: false,
            tab2: false,
            tab3: false,
        };
    }

    componentWillMount() {
        BackAndroid.addEventListener('hardwareBackPress', () => {
            this.props.navigator.pop()
            return true
        });
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

    render() {
        const {navigator} = this.props
        return (
            <Container theme={myTheme} style={styles.container}>

                <Header>
                    <Title style={{alignSelf: 'center'}}>List Item By Category</Title>
                    <Button transparent onPress={() => navigator.push({id: 'SearchItem'})}>
                        <Icon name="ios-search" />
                    </Button>
                    <Button transparent onPress={() => navigator.push({id: 'listMessage'})}>
                        <Icon name="ios-mail" />
                    </Button>
                </Header>

                <Content>

                    <Card style={{ flex: 0, backgroundColor: 'black', borderWidth: 0 }}>
                        <CardItem onPress={() => navigator.push({id: 'ItemDetail'})}>
                            <Image
                                style={{
                                    resizeMode: 'cover',
                                    width: null,
                                    opacity: 0.6
                                }}
                                source={require('../../../img/category/automotive.jpg')}>
                                <View style={{paddingLeft: 10}}>
                                    <H1 style={{color: 'white'}}>Blue Modern Mug</H1>
                                    <Text style={styles.textColor} note>by <Text style={{color: '#2EFFD0'}}>Tevin Amos</Text></Text>
                                </View>
                            </Image>
                        </CardItem>

                        <CardItem onPress={() => this.navigateTo('ItemDetail')}>
                            <Image
                                style={{
                                    resizeMode: 'cover',
                                    width: null,
                                    opacity: 0.6
                                }}
                                source={require('../../../img/category/automotive.jpg')}>
                                <View style={{paddingLeft: 10}}>
                                    <H1 style={{color: 'white'}}>Blue Modern Mug</H1>
                                    <Text style={styles.textColor} note>by <Text style={{color: '#2EFFD0'}}>Tevin Amos</Text></Text>
                                </View>
                            </Image>
                        </CardItem>

                        <CardItem onPress={() => this.navigateTo('ItemDetail')}>
                            <Image
                                style={{
                                    resizeMode: 'cover',
                                    width: null,
                                    opacity: 0.6
                                }}
                                source={require('../../../img/category/automotive.jpg')}>
                                <View style={{paddingLeft: 10}}>
                                    <H1 style={{color: 'white'}}>Blue Modern Mug</H1>
                                    <Text style={styles.textColor} note>by <Text style={{color: '#2EFFD0'}}>Tevin Amos</Text></Text>
                                </View>
                            </Image>
                        </CardItem>

                        <CardItem onPress={() => this.navigateTo('ItemDetail')}>
                            <Image
                                style={{
                                    resizeMode: 'cover',
                                    width: null,
                                    opacity: 0.6
                                }}
                                source={require('../../../img/category/automotive.jpg')}>
                                <View style={{paddingLeft: 10}}>
                                    <H1 style={{color: 'white'}}>Blue Modern Mug</H1>
                                    <Text style={styles.textColor} note>by <Text style={{color: '#2EFFD0'}}>Tevin Amos</Text></Text>
                                </View>
                            </Image>
                        </CardItem>

                        <CardItem onPress={() => this.navigateTo('ItemDetail')}>
                            <Image
                                style={{
                                    resizeMode: 'cover',
                                    width: null,
                                    opacity: 0.6
                                }}
                                source={require('../../../img/category/automotive.jpg')}>
                                <View style={{paddingLeft: 10}}>
                                    <H1 style={{color: 'white'}}>Blue Modern Mug</H1>
                                    <Text style={styles.textColor} note>by <Text style={{color: '#2EFFD0'}}>Tevin Amos</Text></Text>
                                </View>
                            </Image>
                        </CardItem>

                        <CardItem onPress={() => this.navigateTo('ItemDetail')}>
                            <Image
                                style={{
                                    resizeMode: 'cover',
                                    width: null,
                                    opacity: 0.6
                                }}
                                source={require('../../../img/category/automotive.jpg')}>
                                <View style={{paddingLeft: 10}}>
                                    <H1 style={{color: 'white'}}>Blue Modern Mug</H1>
                                    <Text style={styles.textColor} note>by <Text style={{color: '#2EFFD0'}}>Tevin Amos</Text></Text>
                                </View>
                            </Image>
                        </CardItem>
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
                        <Button active={this.state.tab3} onPress={() => navigator.replace({id: 'profileDetail'})} >
                            
                            <Icon name='ios-person' />
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
        navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
    };
}

const mapStateToProps = state => ({
    navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(ListItem);
