
import React, { Component } from 'react';
import { BackAndroid, Image, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    List,
    Icon,
    Spinner,
    Text
} from 'native-base';

import {getItemsByCategoryId} from '../../actions/categoryId';
import myTheme from '../../themes/base-theme';
import styles from './styles';

import DataItemCategory from './DataItemCategory'

class ListItemCategory extends Component {

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', () => {
            this.props.navigator.pop()
            return true
        });
        this.props.getItemsByCategoryId(this.props.token, this.props.route.CategoryId)
    }

    render() {
        const {navigator, items} = this.props

        let ItemCategoryNodes = items.map(function (item) {
            return(
                <DataItemCategory navigator={navigator} key={item.id} items={item} />
            )
        })

        if (items.length === 0) {
            return (
                <Container style={styles.container}>
                    <Content>
                        <Spinner color='green' />
                    </Content>
                </Container>
            )
        }
        else {
            return (
                <Container theme={myTheme} style={styles.container}>

                    <Header>
                        <Title
                            style={{alignSelf: 'center', color: '#6CF9C8'}}>{this.props.route.CategoryName.toUpperCase()}</Title>
                        <Button transparent onPress={() => navigator.pop()}>
                            <Icon name='ios-arrow-back'/>
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
            )
        }
    }
}

function bindAction(dispatch) {
    return {
        getItemsByCategoryId: (token, id) => dispatch(getItemsByCategoryId(token, id)),
    };
}

const mapStateToProps = state => ({
    items: state.categoryId,
});

export default connect(mapStateToProps, bindAction)(ListItemCategory);
