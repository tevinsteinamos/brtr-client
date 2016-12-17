import React, { Component } from 'react';
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
    View,
    Spinner,
    Tabs
} from 'native-base';
import ScrollableTabView from 'react-native-scrollable-tab-view'
import Home from '../home/Home';
import AddItem from '../addItem';
import ProfileDetail from '../searchItem/SearchItem';

export default class TabsExample extends Component {
    render() {
        return (
            <Container>
                <Header>
                    <Title style={{alignSelf: 'center', color: '#6CF9C8'}}>B R T R</Title>
                    <Button transparent onPress={() => this.props.navigator.push({id: 'searchItem'})}>
                        <Icon name="ios-search" />
                    </Button>
                    <Button transparent onPress={() => this.props.navigator.push({id: 'listMessage'})}>
                        <Icon name="ios-mail" />
                    </Button>
                </Header>
                <Content>
                    <ScrollableTabView>
                        <Home tabLabel='Home' navigator={navigator} token={this.props.token} dataUser={this.props.dataUser} />
                        <ProfileDetail tabLabel='Profile Detail' navigator={navigator} token={this.props.token} dataUser={this.props.dataUser} />
                    </ScrollableTabView>
                </Content>
            </Container>
        );
    }
}