
import React, { Component } from 'react';
import { BackAndroid, Image, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Icon,
    Footer,
    FooterTab,
    List,
    Spinner
} from 'native-base';

import {getItemsByCategoryId} from '../../actions/categoryId';
import myTheme from '../../themes/base-theme';
import styles from './styles';

import DataItemCategory from './DataItemCategory'

class ListItemCategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tab1: false,
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
        BackAndroid.addEventListener('hardwareBackPress', () => {
            this.props.navigator.pop()
            return true
        });
        this._loadInitialState().done();
    }

    _loadInitialState = async () => {
        try {
            var value = await AsyncStorage.getItem("myKey");
            if (value !== null){
                this.props.getItemsByCategoryId(value, this.props.route.CategoryId)
                this._appendMessage('Recovered selection from disk: ' + value);
            } else {
                this._appendMessage('Initialized with no selection on disk.');
            }
        } catch (error) {
            this._appendMessage('AsyncStorage error: ' + error.message);
        }
    }

    _appendMessage = (message) => {
        this.setState({messages: this.state.messages.concat(message)});
    };

    render() {
        const {navigator, route, items, loading} = this.props

        let ItemCategoryNodes = items.map(function (item) {
            return(
                <DataItemCategory navigator={navigator} key={item.id} items={item} />
            )
        })

        // if (loading) {
        //     return(
        //         <Container theme={myTheme} style={styles.container}>
        //             <Content>
        //                 <Spinner color='green' />
        //             </Content>
        //         </Container>
        //     )
        // }
        // else {
            return (
                <Container theme={myTheme} style={styles.container}>

                    <Header>
                        <Title
                            style={{alignSelf: 'center', color: '#6CF9C8'}}>{this.props.route.CategoryName.toUpperCase()}</Title>
                        <Button transparent onPress={() => this.props.navigator.push({id: 'searchItem'})}>
                            <Icon name="ios-search"/>
                        </Button>
                        <Button transparent onPress={() => this.props.navigator.push({id: 'listMessage'})}>
                            <Icon name="ios-mail"/>
                        </Button>
                    </Header>

                    <Content>
                        <List>
                            {ItemCategoryNodes}
                        </List>
                    </Content>

                    <Footer>
                        <FooterTab>
                            <Button
                                active={this.state.tab1} onPress={() => navigator.replace({id: 'home'})}>
                                <Icon name='md-home'/>
                            </Button>
                            <Button active={this.state.tab2} onPress={() => navigator.replace({id: 'addItem'})}>

                                <Icon name='md-add-circle'/>
                            </Button>
                            <Button active={this.state.tab3} onPress={() => navigator.replace({id: 'profileDetail'})}>

                                <Icon name='ios-person'/>
                            </Button>
                        </FooterTab>
                    </Footer>
                </Container>
            );
        // }
    }
}

function bindAction(dispatch) {
    return {
        getItemsByCategoryId: (token, id) => dispatch(getItemsByCategoryId(token, id)),
    };
}

const mapStateToProps = state => ({
    items: state.categoryId,
    loading: state.loading
});

export default connect(mapStateToProps, bindAction)(ListItemCategory);
