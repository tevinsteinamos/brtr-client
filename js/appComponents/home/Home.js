
import React, { Component } from 'react';
import { Image } from 'react-native';
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

import navigateTo from '../../actions/sideBarNav';
import { openDrawer } from '../../actions/drawer';
import myTheme from '../../themes/base-theme';
import styles from './styles';

class Home extends Component {

    static propTypes = {
        openDrawer: React.PropTypes.func,
        navigateTo: React.PropTypes.func,
    }

    constructor(props) {
        super(props);
        this.state = {
            tab1: true,
            tab2: false,
            tab3: false,
        };
    }

    navigateTo(route) {
        this.props.navigateTo(route, 'home');
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
        return (
            <Container theme={myTheme} style={styles.container}>

                <Header>
                    <Title style={{alignSelf: 'center'}}>BRTR</Title>
                    <Button transparent onPress={() => this.navigateTo('SearchItem')}>
                        <Icon name="ios-search" />
                    </Button>
                    <Button transparent onPress={() => this.navigateTo('listAvatar')}>
                        <Icon name="ios-mail" />
                    </Button>
                </Header>

                <Content>

                    <Card style={{ flex: 0, backgroundColor: 'black', borderWidth: 0 }}>

                        <Grid>
                            <Col>
                                <CardItem onPress={() => this.navigateTo('ListItem')}>
                                    <Image
                                        style={{
                                    resizeMode: 'cover',
                                    width: null,
                                    opacity: 0.6
                                }}
                                        source={require('../../../img/category/automotive.jpg')}>
                                        <View>
                                            <H1 style={{color: 'white'}}>Automotive</H1>
                                        </View>
                                    </Image>
                                </CardItem>
                            </Col>
                            <Col>
                                <CardItem onPress={() => this.navigateTo('ListItem')}>
                                    <Image
                                        style={{
                                    resizeMode: 'cover',
                                    width: null,
                                    opacity: 0.6
                                }}
                                        source={require('../../../img/category/automotive.jpg')}>
                                        <View>
                                            <H1 style={{color: 'white'}}>Automotive</H1>
                                        </View>
                                    </Image>
                                </CardItem>
                            </Col>
                        </Grid>

                        <Grid>
                            <Col>
                                <CardItem onPress={() => this.navigateTo('ListItem')}>
                                    <Image
                                        style={{
                                    resizeMode: 'cover',
                                    width: null,
                                    opacity: 0.6
                                }}
                                        source={require('../../../img/category/automotive.jpg')}>
                                        <View>
                                            <H1 style={{color: 'white'}}>Automotive</H1>
                                        </View>
                                    </Image>
                                </CardItem>
                            </Col>
                            <Col>
                                <CardItem onPress={() => this.navigateTo('ListItem')}>
                                    <Image
                                        style={{
                                    resizeMode: 'cover',
                                    width: null,
                                    opacity: 0.6
                                }}
                                        source={require('../../../img/category/automotive.jpg')}>
                                        <View>
                                            <H1 style={{color: 'white'}}>Automotive</H1>
                                        </View>
                                    </Image>
                                </CardItem>
                            </Col>
                        </Grid>

                        <Grid>
                            <Col>
                                <CardItem onPress={() => this.navigateTo('ListItem')}>
                                    <Image
                                        style={{
                                    resizeMode: 'cover',
                                    width: null,
                                    opacity: 0.6
                                }}
                                        source={require('../../../img/category/automotive.jpg')}>
                                        <View>
                                            <H1 style={{color: 'white'}}>Automotive</H1>
                                        </View>
                                    </Image>
                                </CardItem>
                            </Col>
                            <Col>
                                <CardItem onPress={() => this.navigateTo('ListItem')}>
                                    <Image
                                        style={{
                                    resizeMode: 'cover',
                                    width: null,
                                    opacity: 0.6
                                }}
                                        source={require('../../../img/category/automotive.jpg')}>
                                        <View>
                                            <H1 style={{color: 'white'}}>Automotive</H1>
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
                            active={this.state.tab1} >
                            Feed
                        </Button>
                        <Button active={this.state.tab2} onPress={() => this.toggleTab2()} >
                            Add Item
                        </Button>
                        <Button active={this.state.tab3} onPress={() => this.toggleTab3()} >
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
        navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
    };
}

const mapStateToProps = state => ({
    navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(Home);
