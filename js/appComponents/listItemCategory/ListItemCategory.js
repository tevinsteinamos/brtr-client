
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
    Spinner,
    Text
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

    componentDidMount() {
        this.props.getItemsByCategoryId(this.props.token, this.props.route.CategoryId)
    }

    render() {
        const {navigator, route, items, loading} = this.props

        let ItemCategoryNodes = items.map(function (item) {
            return(
                <DataItemCategory navigator={navigator} key={item.id} items={item} />
            )
        })

        return (
            <Container theme={myTheme} style={styles.container}>

                <Header>
                    <Title
                        style={{alignSelf: 'center', color: '#6CF9C8'}}>{this.props.route.CategoryName.toUpperCase()}</Title>
                    <Button transparent>
                        <Text style={{color:'black'}}>...</Text>
                    </Button>
                    <Button transparent>
                        <Text style={{color:'black'}}>...</Text>
                    </Button>
                </Header>

                <Content>
                    <List>
                        {ItemCategoryNodes}
                    </List>
                </Content>

            </Container>
        );
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
