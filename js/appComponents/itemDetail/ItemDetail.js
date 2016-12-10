
import React, { Component } from 'react';
import { Image } from 'react-native';
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
    View
} from 'native-base';

import navigateTo from '../../actions/sideBarNav';
import { openDrawer } from '../../actions/drawer';
import myTheme from '../../themes/base-theme';
import styles from './styles';

const {
    replaceAt,
} = actions;

class ItemDetail extends Component {

    static propTypes = {
        openDrawer: React.PropTypes.func,
        navigateTo: React.PropTypes.func,
        replaceAt: React.PropTypes.func,
        navigation: React.PropTypes.shape({
            key: React.PropTypes.string,
        }),
    }

    replaceAt(route) {
        this.props.replaceAt('ItemDetail', { key: route }, this.props.navigation.key);
    }

    constructor(props) {
        super(props);
        this.state = {
            tab1: false,
            tab2: false,
            tab3: false,
        };
    }

    navigateTo(route) {
        this.props.navigateTo(route, 'ItemDetail');
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
                    <Title style={{alignSelf: 'center'}}>Item Detail</Title>
                    <Button transparent onPress={() => this.navigateTo('ListItem')}>
                        <Icon name="ios-search" />
                    </Button>
                    <Button transparent onPress={() => this.navigateTo('listAvatar')}>
                        <Icon name="ios-mail" />
                    </Button>
                </Header>

                <Content>

                    <Card style={{ flex: 0, backgroundColor: '#444444', borderWidth: 0 }}>
                        <CardItem>
                            <H1 style={{color: 'white', paddingBottom: 5}}>Floral Coffe Mug</H1>
                            <Text note>by Metta Wangsa</Text>
                        </CardItem>

                        <CardItem>
                            <Text style={styles.textColor}>
                                Have only been used a few times.
                                There are some invisible coffe stains.
                                It's comfy. Willing to trade with any stuff that's worth
                            </Text>
                        </CardItem>

                        <CardItem>
                            <Image
                                style={{ resizeMode: 'cover', width: null }}
                                source={require('../../../img/category/automotive.jpg')} />
                        </CardItem>

                        <CardItem>
                            <H3 style={styles.textColor}>Size</H3>
                            <Text style={styles.textColor}>300 ML</Text>
                        </CardItem>

                        <Grid>
                            <Col>
                                <CardItem>
                                    <H3 style={styles.textColor}>Material</H3>
                                    <Text style={styles.textColor}>Glass</Text>
                                </CardItem>
                            </Col>
                            <Col>
                                <CardItem>
                                    <H3 style={styles.textColor}>Location</H3>
                                    <Text style={styles.textColor}>Jakarta, ID</Text>
                                </CardItem>
                            </Col>
                        </Grid>

                        <CardItem>
                            <Button block success> Barter </Button>
                        </CardItem>



                    </Card>
                </Content>

                <Footer>
                    <FooterTab>
                        <Button
                            onPress={() => this.replaceAt('home')} >
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
        navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
        replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
    };
}

const mapStateToProps = state => ({
    navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(ItemDetail);
