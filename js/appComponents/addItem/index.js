
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
const camera = require('../../../img/camera.png');

const {
    replaceAt,
} = actions;

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
            tab2: false,
            tab3: false,
            name: '',
            description: '',
            dimension: '',
            material: '',
            photo: '',
            color: '',
            size: 'key1',
            results: {
                items: []
            }
        };
    }

    onValueChange (value: string) {
        this.setState({
            size : value
        });
    }


    navigateTo(route) {
        this.props.navigateTo(route, 'AddItem');
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
                    <Title style={{alignSelf: 'center'}}>Add New Item</Title>
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
                        </Col>
                        <Col>
                      <Text style={{color: '#fff', marginLeft: 20}}>ITEM NAME</Text>
                              <InputGroup theme={ArizTheme} borderType='underline'>
                                <Input
                                    onChangeText={(e) => this.setState({name: e})}
                                    style={{color: '#FFFFFF'}}/>
                              </InputGroup>
                            </Col>
                            <Col>
                            </Col>
                          </Grid>
                          <Grid>
                          <Col>
                          </Col>
                          <Col>
                            <Text note>by Metta Wangsa</Text>
                          </Col>
                            <Col>
                            </Col>
</Grid>
                              <Grid>
                                <Col>
                                </Col>
                                <Col>
                              <Text style={{color: '#fff', marginLeft: 20}}>DESCRIPTION</Text>
                          <InputGroup theme={ArizTheme} borderType='underline'>
                            <Input
                                onChangeText={(e) => this.setState({description: e})}
                                style={{color: '#FFFFFF'}}/>
                          </InputGroup>
                        </Col>
                        <Col>
                        </Col>
                      </Grid>
                      <CardItem>
<Grid>
  <Col>
                            <Image onPress={()=> alert('upload an image')}
                                style={{ width: 150, height: 150, alignSelf: 'center' }}
                                source={camera} />
                                <Text style={{alignSelf: 'center'}} note>Upload an Image</Text>
</Col>
</Grid>
</CardItem>
                        <Grid>
                            <Col>
                              <CardItem>
                    <Text style={{color: '#fff', marginLeft: 20}}>SIZE</Text>
                    <Picker
                        iosHeader="Select one"
                        mode="dropdown"
                        selectedValue={this.state.size}
                        onValueChange={this.onValueChange.bind(this)}>
                        <Item label="S" value="key0" />
                        <Item label="M" value="key1" />
                        <Item label="L" value="key2" />
                        <Item label="XL" value="key3" />
                   </Picker>
                 </CardItem>
                            </Col>
                            <Col>
                                <CardItem>
                                  <Text style={{color: '#fff', marginLeft: 20, marginBottom: 9}}>MATERIAL</Text>
                                  <InputGroup theme={ArizTheme} borderType='underline'>
                                    <Input
                                        onChangeText={(e) => this.setState({material: e})}
                                        style={{color: '#FFFFFF'}}/>
                                  </InputGroup>
                                </CardItem>
                            </Col>

                        </Grid>

<Grid style={{marginTop: 40}}>
  <Col>
                                <Text style={{color: '#fff', marginLeft: 20}}>DIMENSION</Text>
                                <InputGroup theme={ArizTheme} borderType='underline'>
                                  <Input
                                      onChangeText={(e) => this.setState({dimension: e})}
                                      style={{color: '#FFFFFF'}}/>
                                </InputGroup>
</Col>
<Col>
                                  <Text style={{color: '#fff', marginLeft: 20}}>COLOR</Text>
                                  <InputGroup theme={ArizTheme} borderType='underline'>
                                    <Input
                                        onChangeText={(e) => this.setState({color: e})}
                                        style={{color: '#FFFFFF'}}/>
                                  </InputGroup>
                                </Col>
                              </Grid>

                          <Button
                              onPress={()=> alert('Item saved !')}
                              bordered
                              style={{ alignSelf: 'center', marginTop: 40, marginBottom: 20 , width: 220, borderRadius: 0, borderColor:'#2effd0', height: 50}}>
                            <Text style={{color: '#FFFFFF'}}>
                              SAVE ITEM
                            </Text>
                          </Button>



                    </Card>
                </Content>

                <Footer theme={FooterTheme}>
                    <FooterTab theme={FooterTheme}>
                        <Button
                            onPress={() => this.replaceAt('home')} >
                            Feed
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

export default connect(mapStateToProps, bindAction)(AddItem);
