
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Button, Icon, List, ListItem, InputGroup, Input, Picker, Text, Thumbnail } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import styles from './styles';
import ArizTheme from '../../themes/custom-theme'

const Item = Picker.Item;
const camera = require('../../../img/camera.png');

class RegisterPage extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedItem: undefined,
      selected1: 'key0',
      results: {
        items: [],
      },
    };
  }
  onValueChange(value: string) {
    this.setState({
      selected1: value,
    });
  }

  render() {
    return (
      <Container style={styles.container}>

        <Content>
          <TouchableOpacity>
            <Thumbnail size={80} source={camera} style={{ alignSelf: 'center', marginTop: 20, marginBottom: 10 }} />
          </TouchableOpacity>
          <List style={{marginTop: 40, marginLeft: 30, marginRight: 60}} theme={ArizTheme}>
            <ListItem>
              <InputGroup >
                <Input placeholder="Username" style={{color: '#FFFFFF'}}/>
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Input placeholder="Email" style={{color: '#FFFFFF'}}/>
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Input placeholder="Password" secureTextEntry style={{color: '#FFFFFF'}}/>
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Input placeholder="Confirm Password" secureTextEntry style={{color: '#FFFFFF'}}/>
              </InputGroup>
            </ListItem>
          </List>
          <Button bordered style={{ alignSelf: 'center', marginTop: 40, marginBottom: 20 , width: 220, borderRadius: 0, borderColor:'#2effd0', height: 50}} onPress={()=>alert('Register process begin !')}><Text style={{color: '#FFFFFF'}}>SIGN UP</Text></Button>
          <Text style={{textAlign: 'center',color: '#FFFFFF', fontSize: 14}}>Already have an account ? <Text style={{color: '#2effd0', fontSize: 12}} onPress={()=>alert('Go to Sign in page')}>Sign In !</Text></Text>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(RegisterPage);
