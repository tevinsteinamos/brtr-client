
import React, { Component } from 'react';
import { Image, AsyncStorage } from 'react-native';
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
    View,
    Input,
    InputGroup
} from 'native-base';

import navigateTo from '../../actions/sideBarNav';
import { openDrawer } from '../../actions/drawer';
import myTheme from '../../themes/base-theme';
import styles from './styles';
import decode from 'jwt-decode'

import SearchResult from './searchResult'

import {searchProcess} from '../../actions/searchItem'

class SearchItem extends Component {

    static propTypes = {
        openDrawer: React.PropTypes.func,
        navigateTo: React.PropTypes.func,
    }

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

    navigateTo(route) {
        this.props.navigateTo(route, 'SearchItem');
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
      const {item} = this.props
        let ItemNodes = item.map((data)=> {
          return(
              <SearchResult key={data.id} items={data} />
          )
        })
          return (
              <Container theme={myTheme} style={styles.container}>

                  <Header>
                      <Title style={{alignSelf: 'center'}}>Search Item</Title>
                      <Button transparent onPress={() => this.navigateTo('SearchItem')}>
                          Back
                      </Button>
                      <Button transparent onPress={() => this.navigateTo('listAvatar')}>
                          <Icon name="ios-mail" />
                      </Button>
                  </Header>

                  <Content>
                      <InputGroup borderType='regular' >
                          <Icon name='ios-search' style={{color:'#384850'}}/>
                          <Input placeholder='Type your text here' onChangeText={(event) => this.searchProcessInput(event)}/>
                      </InputGroup>
                      <Card>
                        {ItemNodes}
                      </Card>
                  </Content>

                  <Footer>
                      <FooterTab>
                          <Button
                              onPress={() => this.navigateTo('Home')} >
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
        searchProcess: (token, text) => dispatch(searchProcess(token, text))
    };
}

const mapStateToProps = state => ({
    navigation: state.cardNavigation,
    item: state.searchItem
});

export default connect(mapStateToProps, bindAction)(SearchItem);

// if (item.length === 0) {
//   console.log('wrong');
//   return (
//       <Container theme={myTheme} style={styles.container}>
//
//           <Header>
//               <Title style={{alignSelf: 'center'}}>Search Item</Title>
//               <Button transparent onPress={() => this.navigateTo('SearchItem')}>
//                   Back
//               </Button>
//               <Button transparent onPress={() => this.navigateTo('listAvatar')}>
//                   <Icon name="ios-mail" />
//               </Button>
//           </Header>
//
//           <Content>
//               <InputGroup borderType='regular' >
//                   <Icon name='ios-search' style={{color:'#384850'}}/>
//                   <Input placeholder='Type your text here' onChangeText={(event) => this.searchProcessInput(event)}/>
//               </InputGroup>
//               <Card>
//                 <CardItem>No data found !</CardItem>
//               </Card>
//           </Content>
//
//           <Footer>
//               <FooterTab>
//                   <Button
//                       onPress={() => this.navigateTo('Home')} >
//                       Feed
//                   </Button>
//                   <Button active={this.state.tab2} onPress={() => this.toggleTab2()} >
//                       Add Item
//                   </Button>
//                   <Button active={this.state.tab3} onPress={() => this.toggleTab3()} >
//                       Profile
//                   </Button>
//               </FooterTab>
//           </Footer>
//       </Container>
//   );
// } else {
  // }
