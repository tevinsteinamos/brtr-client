
import React, { Component } from 'react';
import { Image, AsyncStorage, BackAndroid } from 'react-native';
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
    List,
    ListItem,
    Thumbnail,
    View,
    Input,
    InputGroup
} from 'native-base';

import myTheme from '../../themes/base-theme';
import styles from './styles';
import decode from 'jwt-decode'

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

    async searchProcessInput(text){
      try {
        var value = await AsyncStorage.getItem("myKey");
        if (value !== null){
          this.setState({searchInput: text})
          this.props.searchProcess(value, text)
        } else {
            console.log("else")
        }
      } catch (error) {
          console.log("catch error: ", error)
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

    componentDidMount() {
      BackAndroid.addEventListener('hardwareBackPress', () => {
        this.props.navigator.pop()
        return true
      })
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
                      <Title style={{alignSelf: 'center'}}>Search Item</Title>
                      <Button transparent onPress={() => navigator.pop()}>
                          <Icon name='ios-arrow-back'/>
                      </Button>
                      <Button transparent onPress={() => navigator.push({id : 'listMessage'})}>
                          <Icon name="ios-mail" />
                      </Button>
                  </Header>

                  <Content>
                      <InputGroup style={styles.noBottomBorder} iconRight>
                          <Icon name='ios-search' style={{color: '#6CF9C8'}} />
                          <Input returnKeyType='send' placeholder='Type here to search item...' style={styles.text} onChangeText={(event) => this.searchProcessInput(event)}></Input>
                      </InputGroup>

                      <List>
                        {ItemNodes}
                      </List>
                  </Content>

                  <Footer>
                      <FooterTab>
                          <Button active={this.state.tab1} onPress={() => navigator.replace('home')} >
                              Feed
                          </Button>
                          <Button active={this.state.tab2} onPress={() => navigator.replace('addItem')} >
                              Add Item
                          </Button>
                          <Button active={this.state.tab3} onPress={() => navigator.replace('profileDetail')} >
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
        searchProcess: (token, text) => dispatch(searchProcess(token, text))
    };
}

const mapStateToProps = state => ({
    item: state.searchItem
});

export default connect(mapStateToProps, bindAction)(SearchItem);
