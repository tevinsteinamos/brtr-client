
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
    FooterTab,
    Card,
    CardItem,
    View,
    Spinner,
    Input,
    InputGroup
} from 'native-base';

import myTheme from '../../themes/base-theme';
import styles from './styles';
import SearchResult from './searchResult'
import {searchProcess} from '../../actions/searchItem'

class SearchItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tab1: false,
            tab2: false,
            tab3: false,
            searchInput: ''
        };
    }

    componentWillMount() {
        BackAndroid.addEventListener('hardwareBackPress', () => {
            this.props.navigator.pop()
            return true
        });
    }

    async searchProcessInput(text){
      try {
        var value = await AsyncStorage.getItem("myKey");
        if (value !== null){
          this.setState({searchInput: text})
          this.props.searchProcess(value, text)
        } else {

        }
      } catch (error) {

      }
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
      const {item, navigator} = this.props
        let ItemNodes = item.map((data)=> {
          return(
              <SearchResult key={data.id} items={data} navigator={navigator}/>
          )
        })
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
                        {ItemNodes}
                      </Card>
                  </Content>


              </Container>
          );
    }
}

function bindAction(dispatch) {
    return {
        searchProcess: (token, text) => dispatch(searchProcess(token, text))
    };
}

const mapStateToProps = state => ({
    item: state.searchItem
});

export default connect(mapStateToProps, bindAction)(SearchItem);
