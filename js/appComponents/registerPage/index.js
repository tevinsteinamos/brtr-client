
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Button, Icon, List, ListItem, InputGroup, Input, Picker, Text, Thumbnail } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import styles from './styles';

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
          <List style={{marginTop: 40, marginLeft: 30, marginRight: 60}}>
            <ListItem>
              <InputGroup >
                <Input placeholder="Username" />
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Input placeholder="Email" />
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Input placeholder="Password" secureTextEntry />
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Input placeholder="Confirm Password" secureTextEntry />
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup >
                <Input placeholder="Avatar" />
              </InputGroup>
            </ListItem>
          </List>
          <Button bordered info style={{ alignSelf: 'center', marginTop: 40, marginBottom: 20 , width: 220, borderRadius: 0}}>SIGN UP</Button>
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
