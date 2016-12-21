
import React, { Component } from 'react';
import { Image, AsyncStorage, BackAndroid, View } from 'react-native';
import { connect } from 'react-redux';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {
    Container,
    Header,
    Title,
    Content,
    Text,
    Button,
    Icon,
    Card,
    Spinner,
    Input,
    InputGroup,
    CardItem
} from 'native-base';

import myTheme from '../../themes/base-theme';
import styles from './styles';
import SearchResult from './searchResult'
import {searchProcess, clearSearchItem} from '../../actions/searchItem'

class SearchItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchInput: ''
        };
    }

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', () => {
            this.props.navigator.pop()
            return true
        });
        this.props.clearSearchItem()
    }

    searchProcessInput(text){
        this.setState({searchInput: text})
        this.props.searchProcess(this.props.token, text)
    }


    render() {
        const {item, navigator} = this.props
        let showSearch
        let ItemNodes = item.map((data)=> {
            return(
                <SearchResult key={data.id} items={data} navigator={navigator}/>
            )
        })

        if (item.length === 0 && this.state.searchInput ) {
            showSearch =
                <Container style={styles.container}>
                    <Content>
                        <Spinner color='green' />
                    </Content>
                </Container>
        }
        else if (item.length >= 1){
            if (item[0].finish === true) {
                showSearch =
                    <Grid>
                        <Col>
                            <CardItem
                                style={{borderBottomWidth: 0, marginBottom: 10}}
                            >
                                <Text style={{color: '#fff', alignSelf: 'center'}}>No Items Found</Text>
                            </CardItem>
                        </Col>
                    </Grid>
            }
            else {
                showSearch = ItemNodes
            }
        }
        return (
            <Container theme={myTheme} style={styles.container}>

                <Header>
                    <Title style={{alignSelf: 'center', color:'#6CF9C8'}}>SEARCH ITEM</Title>
                    <Button transparent onPress={() => navigator.pop()}>
                        <Icon name='ios-arrow-back'/>
                    </Button>
                    <Button transparent >
                        <Text style={{color: 'black'}}>...</Text>
                    </Button>
                </Header>

                <Content>
                    <InputGroup style={styles.noBottomBorder} iconRight>

                        <Input returnKeyType='send' placeholder='Type here to search item...' style={styles.text} onChangeText={(event) => this.searchProcessInput(event)}></Input>
                    </InputGroup>

                    <Card style={{ flex: 0, backgroundColor: 'black', borderWidth: 0 }}>
                        {showSearch}
                    </Card>
                </Content>


            </Container>
        );
    }
}

function bindAction(dispatch) {
    return {
        searchProcess: (token, text) => dispatch(searchProcess(token, text)),
        clearSearchItem: () => dispatch(clearSearchItem())
    };
}

const mapStateToProps = state => ({
    item: state.searchItem
});

export default connect(mapStateToProps, bindAction)(SearchItem);
